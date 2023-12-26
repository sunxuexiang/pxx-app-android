import { Store, msg } from 'plume2';
import { Map, fromJS } from 'immutable';
import * as _ from 'wmkit/common/util';
import FormRegexUtil from 'wmkit/form/form-regex';
import { Alert } from 'wmkit/modal/alert';

import {
  getTradeDetail,
  getReturnOrderList,
  addSnapshot,
  getSnapshot,
  getReturnWays,
  getReturnReasons,
  addApply,
  fetchReturnDetail,
  addRefundApply
} from './webapi';
import ReturnsActor from './actor/return-actor';
import { checkedAllPriceQL } from './ql';

export default class AppStore extends Store {
  constructor(props) {
    super(props);
  }

  bindActor() {
    return [new ReturnsActor()];
  }

  init = async (tid) => {
    let { context } = await getTradeDetail(tid);
    let returnOrderListRes = await getReturnOrderList(tid);
    let tradeDetail = context || {};
    // 已完结订单，则为退货申请，否则认为是退款申请
    let isReturn =
      tradeDetail['tradeState'].flowState == 'COMPLETED' ? true : false;
    //订单里原来的所有商品信息
    let originTradeItems = fromJS([]);
    // 退货原因
    let returnReasonList;
    // 退货申请，设置商品可退数量
    if (isReturn) {
      originTradeItems = fromJS(tradeDetail['tradeItems']);
      // 只展示有可退商品的信息
      tradeDetail['tradeItems'] = tradeDetail['tradeItems'].filter(
        (v) => v.canReturnNum > 0
      );
      if (tradeDetail['gifts']) {
        // 只展示有可退数量的赠品信息
        tradeDetail['gifts'] = tradeDetail['gifts'].filter(
          (v) => v.canReturnNum > 0
        );
        // 默认赠品退货数量为0
        tradeDetail['gifts'].forEach((v) => {
          v.num = 0; //初始化默认的退货数量
        });
      }
      // 默认退货数量为0
      tradeDetail['tradeItems'].forEach((v) => {
        v.skuBuyNum = v.num; //初始化下订时购买的数量
        v.price = v.splitPrice / v.num; //初始化每个商品的均摊平均价格
        v.skuPoint = _.addZeroFloor((v.points || 0) / v.num); //初始化每个商品的均摊平均积分(向下截取小数点后两位)
        v.num = v.canReturnNum; //初始化默认的退货数量
      });
    } else {
      // 退款申请，获取退款原因列表
      let { context } = await getReturnReasons();
      returnReasonList = context || [];

      returnReasonList = returnReasonList.map((v) => {
        for (let k in v) {
          return {
            id: k,
            name: v[k]
          };
        }
      });
    }

    this.transaction(() => {
      this.dispatch('return: init', {
        tid: tid,
        tradeMarketings: fromJS(tradeDetail['tradeMarketings']),
        gifts: fromJS(tradeDetail['gifts']),
        totalPrice: tradeDetail['tradePrice']['totalPrice'],
        tradePoints: tradeDetail['tradePrice']['points'] || 0,
        originTradeItems: originTradeItems,
        returnOrderList: fromJS(returnOrderListRes.context),
        isReturn: isReturn
      });
      this.dispatch('return: sku: init', tradeDetail['tradeItems']);

      if (!isReturn) {
        this.dispatch('return: apply: init', {
          returnReasonList: returnReasonList,
          returnWayList: []
        });
      }
    });
  };

  /**
   * 退货商品全选
   * @param checked
   */
  checkAll = (checked) => {
    this.transaction(() => {
      // 1.全选退货商品
      this.dispatch('return: checkAll', checked);
      // 2.判断是否需要勾选赠品,以及赠品数量
      this._setReturnGifts();
    });
  };

  /**
   * 退货商品单选
   * @param skuId
   */
  checkOne = (skuId) => {
    this.transaction(() => {
      // 1.标记勾选的退货商品
      this.dispatch('return: checkOne', skuId);
      // 2.判断是否需要勾选赠品,以及赠品数量
      this._setReturnGifts();
    });
  };

  /**
   * 修改sku数量
   * @param skuId
   * @param skuNum
   */
  changeNum = ({ skuId, skuNum }) => {
    this.transaction(() => {
      // 1.修改退货商品数量
      this.dispatch('return: changeNum', { skuId, skuNum });
      // 2.判断是否更新勾选的赠品,以及赠品数量(若修改数量的sku已被勾选,则计算并更新赠品数量)
      const skuIndex = this.state()
        .get('skus')
        .findIndex(
          (item) => item.get('skuId') == skuId && item.get('skuChecked')
        );
      if (skuIndex > -1) {
        this._setReturnGifts();
      }
    });
  };

  /**
   * 设置退货赠品数量
   */
  _setReturnGifts = () => {
    const tradeState = this.state();
    const tradeMarketings = tradeState.get('tradeMarketings');
    if (tradeMarketings && tradeMarketings.size > 0) {
      const giftMarketings = tradeMarketings.filter(
        (tradeMarketing) => tradeMarketing.get('marketingType') == 2
      ); //找到满赠活动
      if (giftMarketings && giftMarketings.size > 0) {
        const tradeItems = tradeState.get('originTradeItems'); //订单中的所有商品
        const giftItems = tradeState.get('gifts'); //订单中的赠品
        const comReturnOrders = tradeState.get('returnOrderList'); //该订单之前已完成的退单list(分批退单的场景)
        let comReturnSkus = fromJS({}); //已经退的商品汇总(根据skuId汇总所有商品的数量)
        const currReturnSkus = tradeState
          .get('skus')
          .filter((item) => item.get('skuChecked')); //本次勾选需要退的商品汇总
        let allReturnGifts = fromJS({}); //可能需要退的赠品汇总
        let comReturnGifts = fromJS({}); //已经退的赠品汇总

        // 1.汇总已经退的商品与赠品
        comReturnOrders.forEach((reOrder) => {
          reOrder.get('returnItems').forEach((returnItem) => {
            const currItem = comReturnSkus.get(returnItem.get('skuId'));
            if (currItem) {
              comReturnSkus = comReturnSkus.set(
                returnItem.get('skuId'),
                currItem.set('num', currItem.get('num') + returnItem.get('num'))
              );
            } else {
              comReturnSkus = comReturnSkus.set(
                returnItem.get('skuId'),
                returnItem
              );
            }
          });

          if (reOrder.get('returnGifts')) {
            reOrder.get('returnGifts').forEach((returnGift) => {
              const currGiftItemNum = comReturnGifts.get(
                returnGift.get('skuId')
              );
              if (currGiftItemNum) {
                comReturnGifts = comReturnGifts.set(
                  returnGift.get('skuId'),
                  currGiftItemNum + returnGift.get('num')
                );
              } else {
                comReturnGifts = comReturnGifts.set(
                  returnGift.get('skuId'),
                  returnGift.get('num')
                );
              }
            });
          }
        });

        // 2.遍历满赠营销活动list,验证每个活动对应的剩余商品(购买数量或金额-已退的总数或总金额)是否还满足满赠等级的条件
        //   PS: 已退的总数或总金额分为两部分: a.该订单关联的所有已完成的退单的商品 b.本次用户准备退货的商品
        giftMarketings.forEach((giftMarketing) => {
          if (4 == giftMarketing.get('subType')) {
            const leftSkuAmount = giftMarketing
              .get('skuIds')
              .map((skuId) => {
                const skuItem = tradeItems.get(
                  tradeItems.findIndex((item) => item.get('skuId') == skuId)
                );
                const comReSkuCount = comReturnSkus.get(skuId)
                  ? comReturnSkus.get(skuId).get('num')
                  : 0;
                const indexTmp = currReturnSkus.findIndex(
                  (item) => item.get('skuId') == skuId
                );
                const currReSkuCount =
                  indexTmp > -1 ? currReturnSkus.get(indexTmp).get('num') : 0;
                return (
                  skuItem.get('levelPrice') *
                  (skuItem.get('deliveredNum') - comReSkuCount - currReSkuCount)
                ); //某商品的发货商品价格 - 已退商品价格 - 当前准备退的商品价格
              })
              .reduce((sum, x) => sum + x, 0); //剩余商品价格汇总

            // 3.若不满足满赠条件,则退该活动的所有赠品,汇总到所有的退货赠品数量中(若满足满赠条件,则无需退赠品)
            if (
              leftSkuAmount < giftMarketing.get('giftLevel').get('fullAmount')
            ) {
              allReturnGifts = this._setReturnGiftsMap(
                allReturnGifts,
                giftMarketing
              );
            }
          } else if (5 == giftMarketing.get('subType')) {
            const leftSkuCount = giftMarketing
              .get('skuIds')
              .map((skuId) => {
                const skuItem = tradeItems.get(
                  tradeItems.findIndex((item) => item.get('skuId') == skuId)
                );
                const comReSkuCount = comReturnSkus.get(skuId)
                  ? comReturnSkus.get(skuId).get('num')
                  : 0;
                const indexTmp = currReturnSkus.findIndex(
                  (item) => item.get('skuId') == skuId
                );
                const currReSkuCount =
                  indexTmp > -1 ? currReturnSkus.get(indexTmp).get('num') : 0;
                return (
                  skuItem.get('deliveredNum') - comReSkuCount - currReSkuCount
                ); //某商品的发货商品数 - 已退商品数 - 当前准备退的商品数
              })
              .reduce((sum, x) => sum + x, 0); //剩余商品数量汇总

            // 3.若不满足满赠条件,则退该活动的所有赠品,汇总到所有的退货赠品数量中(若满足满赠条件,则无需退赠品)
            if (
              leftSkuCount < giftMarketing.get('giftLevel').get('fullCount')
            ) {
              allReturnGifts = this._setReturnGiftsMap(
                allReturnGifts,
                giftMarketing
              );
            }
          }  else if (6 == giftMarketing.get('subType')) {
            const leftSkuCount = giftMarketing
              .get('skuIds')
              .map((skuId) => {
                const skuItem = tradeItems.get(
                  tradeItems.findIndex((item) => item.get('skuId') == skuId)
                );
                const comReSkuCount = comReturnSkus.get(skuId)
                  ? comReturnSkus.get(skuId).get('num')
                  : 0;
                const indexTmp = currReturnSkus.findIndex(
                  (item) => item.get('skuId') == skuId
                );
                const currReSkuCount =
                  indexTmp > -1 ? currReturnSkus.get(indexTmp).get('num') : 0;
                return (
                  skuItem.get('deliveredNum') - comReSkuCount - currReSkuCount
                ); //某商品的发货商品数 - 已退商品数 - 当前准备退的商品数
              })
              .reduce((sum, x) => sum + x, 0); //剩余商品数量汇总

            // 3.若不满足满赠条件,则退该活动的所有赠品,汇总到所有的退货赠品数量中(若满足满赠条件,则无需退赠品)
            if (
              leftSkuCount < giftMarketing.get('giftLevel').get('fullCount')
            ) {
              allReturnGifts = this._setReturnGiftsMap(
                allReturnGifts,
                giftMarketing
              );
            }
          }
        });

        // 4.设置具体的退单赠品信息
        this._updateReturnGift(giftItems, allReturnGifts, comReturnGifts);
      }
    }
  };

  /**
   * 不满足满赠条件时,需要退的所有赠品
   * @param allReturnGifts 可能需要退的赠品汇总
   * @param giftMarketing 某个满赠营销活动
   * @return allReturnGifts 返回 不满足满赠条件,满赠营销活动中所有需要退的赠品信息,形如{'sku001':3,'sku002':1}
   */
  _setReturnGiftsMap = (allReturnGifts, giftMarketing) => {
    // 不满足满赠条件,则退该活动的所有赠品,汇总到所有的退货赠品数量中
    giftMarketing
      .get('giftLevel')
      .get('fullGiftDetailList')
      .forEach((gift) => {
        let currGiftItemCount = allReturnGifts.get(gift.get('productId'));
        if (currGiftItemCount) {
          allReturnGifts = allReturnGifts.set(
            gift.get('productId'),
            currGiftItemCount + gift.get('productNum')
          );
        } else {
          allReturnGifts = allReturnGifts.set(
            gift.get('productId'),
            gift.get('productNum')
          );
        }
      });
    return allReturnGifts;
  };

  /**
   * 更新具体的退单赠品数量信息
   * @param giftItems 订单中可退的赠品
   * @param allReturnGifts 不满足满赠条件,满赠营销活动中所有需要退的赠品信息
   * @param comReturnGifts 所有已完成退单中的退掉的赠品信息
   */
  _updateReturnGift(giftItems, allReturnGifts, comReturnGifts) {
    // 本次退单的退货赠品总数: 每个商品所有退货赠品数量 - 之前所有退单中已经退掉的赠品总数
    //   PS: 为了保证退单中赠品顺序与订单中的赠品顺序一致,遍历订单赠品,依次计算得出本次退单需要退的赠品list
    const newGiftItems = giftItems.map((tradeItem) => {
      let readyGiftItemNum = allReturnGifts.get(tradeItem.get('skuId')) || 0; //准备退的数量
      const totalNum = tradeItem.get('deliveredNum') || 0; //发货总数
      readyGiftItemNum =
        readyGiftItemNum < totalNum ? readyGiftItemNum : totalNum;
      const comGiftItemNum = comReturnGifts.get(tradeItem.get('skuId')) || 0; //之前已完成退单已经退掉的数量
      const currNum = readyGiftItemNum - comGiftItemNum;
      if (currNum > 0) {
        return tradeItem.set('num', currNum).set('giftChecked', true); //设置退的赠品数量,并勾选赠品
      } else {
        return tradeItem.set('num', 0).set('giftChecked', false);
      }
    });
    this.dispatch('return: updateGifts', newGiftItems);
  }

  /**
   * 退货方式
   * @param type
   */
  changeReturnType = (type) => {
    this.dispatch('return: changeType', type);
  };

  /**
   * 退货原因
   * @param reason
   */
  changeReturnReason = (reason) => {
    this.dispatch('return: changeReason', reason);
  };

  /**
   * 存储skus
   * @param skus
   */
  saveSkus = (skus) => {
    this.dispatch('return: sku: init', skus);
  };

  /**
   * 退货申请第二步，初始化页面
   */
  initApplyPage = async () => {
    let returnReasons = await getReturnReasons();
    let returnWays = await getReturnWays();

    let returnReasonList = returnReasons.context;
    let returnWayList = returnWays.context;
    returnReasonList = returnReasonList.map((v) => {
      for (let k in v) {
        return {
          id: k,
          name: v[k]
        };
      }
    });

    returnWayList = returnWayList.map((v) => {
      for (let k in v) {
        return {
          id: k,
          name: v[k]
        };
      }
    });

    let snapshotRes = await getSnapshot();

    let snapshot = snapshotRes.context;

    this.transaction(() => {
      this.dispatch('return: init', {
        tid: snapshot['tid'],
        totalPrice: snapshot['returnPrice']['totalPrice'],
        tradePoints: snapshot['returnPoints']['applyPoints'],
        isReturn: true
      });
      this.dispatch('return: sku: init', snapshot['returnItems']);
      this.dispatch('return: apply: init', {
        returnReasonList: returnReasonList,
        returnWayList: returnWayList
      });
    });
  };

  /**
   * 退货退款备注
   */
  changReturnRemark = (remark) => {
    this.dispatch('return: save: remark', remark);
  };

  /**
   * 检测可退数量(退货退款的第一步)
   * @param cb
   */
  returnSkuSecond = async (cb) => {
    const data = this.state();
    let param = Map();

    // tid
    param = param.set('tid', data.get('tid'));

    // 退货商品信息
    let tradeItems = data.get('skus');

    // 只保存退货商品数量大于0的商品
    tradeItems = tradeItems.filter(
      (item) => item.get('skuChecked') && item.get('num') > 0
    );

    // 如果所有商品的退货数量都为0
    if (tradeItems.size == 0) {
      msg.emit('app:tip', '请填写退货数量');
      return;
    }

    param = param.set('returnItems', tradeItems);
    const {price, points} = this.bigQuery(checkedAllPriceQL);
    param = param.set('returnPrice', {
      totalPrice: price
    });
    param = param.set('returnPoints', {
      applyPoints: Math.floor(points)
    });

    let result = await addSnapshot(param.toJS());

    if (result.code == 'K-000000') {
      // 创建成功，进入下一步
      cb();
    } else if (result.code == 'K-050001') {
      Alert({
        text: '存在不可退商品',
        fn: () => {
          this.init(data.get('tid'));
        }
      });
    } else {
      msg.emit('app:tip', result.message);
      return;
    }
  };

  /**
   * 提交申请(仅退款的提交 / 退货退款第二步)
   */
  applyReturns = async () => {
    const data = this.state();
    let param = Map();

    // tid
    param = param.set('tid', data.get('tid'));

    if (
      !FormRegexUtil(data.get('selectedReturnReason'), '退货原因', {
        required: true
      })
    ) {
      return;
    }

    // 退货原因
    param = param.set(
      'returnReason',
      Map().set(data.get('selectedReturnReason'), 0)
    );

    // 退货商品信息
    let tradeItems = data.get('skus');

    // 退单附件
    param = param.set(
      'images',
      data.get('images').map((v, i) => {
        // 上传成功的图片才保存
        if (v.get('status') == 'done') {
          return JSON.stringify({
            uid: i + 1,
            status: 'done',
            url: v.get('image')
          });
        }
      })
    );

    // 退货申请
    if (data.get('isReturn')) {

      if (!data.get('images')||(data.get('images')&&data.get('images').size<=0)) {
        msg.emit('app:tip', '请上传退单附件');
        return;
      }

      // 只保存退货商品数量大于0的商品
      tradeItems = tradeItems.filter((item) => item.get('num') > 0);

      // 如果所有商品的退货数量都为0
      if (tradeItems.size == 0) {
        msg.emit('app:tip', '请填写退货数量');
        return;
      }

      if (
        !FormRegexUtil(data.get('selectedReturnWay'), '退货方式', {
          required: true
        })
      ) {
        return;
      }

      // 退货方式
      param = param.set(
        'returnWay',
        Map().set(data.get('selectedReturnWay'), 0)
      );
    }

    if (
      !FormRegexUtil(data.get('description').trim(), '退货说明', {
        required: true,
        minLength: 1,
        maxLength: 100
      })
    ) {
      return;
    }

    // 退货说明
    param = param.set('description', data.get('description').trim());

    param = param.set('returnItems', tradeItems);

    const {price} = this.bigQuery(checkedAllPriceQL);
    // 退款金额，退货是商品总额，退款是应付金额
    let totalPrice = data.get('isReturn')
      ? price
      : data.get('totalPrice');

    param = param.set('returnPrice', {
      applyStatus: false,
      applyPrice: 0,
      totalPrice: totalPrice
    });

    let result;

    if (data.get('isReturn')) {
      result = await addApply(param.toJS());
    } else {
      result = await addRefundApply(param.toJS());
    }

    if (result.code == 'K-000000') {
      msg.emit('app:tip', '新增退单成功');
      msg.emit('router: goToNext', {
        routeName: 'ApplySuccess',
        rid: result.context
      });
    } else {
      msg.emit('app:tip', result.message);
      return;
    }
  };

  /**
   * 退货成功初始化
   * @param rid
   */
  returnsOkInit = async (rid) => {
    let returnOrderRes = await fetchReturnDetail(rid);
    let returnOrder = returnOrderRes.context;

    // 退单存在
    if (returnOrder) {
      this.dispatch('return: apply : result', returnOrder);
    } else {
      msg.emit('app:tip', '退单不存在');
      msg.emit('router: goToNext', {
        routeName: 'RefundList'
      });
    }
  };

  /**
   * 上传附件
   */
  addImage = (image) => {
    this.dispatch('return: apply : addImage', image);
  };

  /**
   * 删除附件
   */
  removeImage = (index) => {
    this.dispatch('return: apply : removeImage', index);
  };
}
