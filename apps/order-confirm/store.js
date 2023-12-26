import { Store, msg } from 'plume2';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import { Alert } from 'wmkit/modal/alert';
import * as FindArea from 'wmkit/area/area';
import { cache } from 'wmkit/cache';
import { config } from 'wmkit/config';
import { Const } from 'wmkit/const';
import FormRegexUtil from 'wmkit/form/form-regex';
import { Confirm } from 'wmkit/modal/confirm';
import * as WMkit from 'wmkit/kit';
import * as _ from 'wmkit/common/util';
import ValidConst from 'wmkit/validate';
import { fromJS } from 'immutable';

import OrderConfirmActor from './actor/order-confirm-actor';
import * as webApi from './webapi';
import * as api from '../../wmkit/delivery-address/webapi';
import * as WareUtils from '../../wmkit/ware-house/matchWare';
import { setChooseCity } from '../../wmkit/ware-house/matchWare';
import { getMatchFlag } from '../../wmkit/ware-house/matchWare';
//封装一个数组排序方法
function compare(key, desc) {
  //key:  用于排序的数组的key值
  //desc： 布尔值，为true是升序排序，false是降序排序
  return function (a, b) {
    let value1 = a[key];
    let value2 = b[key];
    if (desc == true) {
      // 升序排列
      return value1 - value2;
    } else {
      // 降序排列
      return value2 - value1;
    }
  };
}
export default class AppStore extends Store {
  freightFunc = WMkit.delayFunc(() => {
    this._calcFreight();
  }, 500);

  bindActor() {
    return [new OrderConfirmActor()];
  }

  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  /**
   * 选择支付方式
   * @param payId
   */
  onSelectPayInfo = (params) => {
    const { storeId, payId } = params;
    if (storeId) {
      const orderConfirm = this.state().get('orderConfirm');
      const index = orderConfirm.findIndex((f) => f.get('storeId') == storeId);
      const payType = orderConfirm.getIn([index, 'payType']);
      if (payId == payType) return;
    }
    this.dispatch('order-confirm-actor: payment', { payId, storeId });
  };

  /**
   * 切换是否使用单独的发票收货地址
   * @param status
   */
  onSwitchSperator = (status) => {
    this.dispatch('order-confirm-actor:switchSperator', status);
  };

  /**
   * 选择支付方式
   * @param payId
   */
  onSelectPayInfo = (params) => {
    const { storeId, payId } = params;
    if (storeId) {
      const orderConfirm = this.state().get('orderConfirm');
      const index = orderConfirm.findIndex((f) => f.get('storeId') == storeId);
      const payType = orderConfirm.getIn([index, 'payType']);
      if (payId == payType) return;
    }
    this.dispatch('order-confirm-actor: payment', { payId, storeId });
  };

  /**
   * 设置配送方式
   */
   onSelectDeliveryType = (storeId, deliveryType, openModal = true) => {
    //存储缓存
    AsyncStorage.setItem(
      cache.ORDER_CONFIRM_DELIVERY_WAY,
      JSON.stringify({
        deliveryType: deliveryType
      })
    );
    this.dispatch('order-confirm-actor: deliverWay', { storeId, deliveryType });
    if (deliveryType == 2 || deliveryType == 3) {
      this.onSelectBooking(storeId, false);
    }
    this.setDeliveryWay(storeId, deliveryType);
    if (openModal && (deliveryType == 2 || deliveryType == 4)) {
      this.openModel(storeId, true);
    }
    // 计算运费
    this._calcFreight();
  };

  /**
   * 设置预约发货
   */
  onSelectBooking = (storeId, bookingDeliveryFlag) => {
    this.dispatch('order-confirm-actor: booking', {
      storeId,
      bookingDeliveryFlag
    });
    if (!bookingDeliveryFlag) {
      this.onSelectBookingDate(storeId, '');
    }
  };

  /**
   * 设置预约发货时间
   */
  onSelectBookingDate = (storeId, bookingDate) => {
    this.dispatch('order-confirm-actor: bookingDate', { storeId, bookingDate });
  };

  /**
   * 确认订单初始化
   * @returns {Promise<void>}
   */
  confirmInit = async () => {
    //加载中
    this.changeLoadingVisible(true); // 选中的物流公司
    let deliverSite = await AsyncStorage.getItem(cache.DELIVER_SITE);
    
    deliverSite = (deliverSite && JSON.parse(deliverSite)) || null;
      if(deliverSite && deliverSite.id != 'default') {
      const res = await webApi.getLogisticsCompanyById(deliverSite.id);
      // 物流公司不存在
      if (res.code == config.SUCCESS_CODE) {
        // 物流公司不存在
        if (!res.context) {
          deliverSite = null;
        }
      }
    }
    await this.getPayOptions();
    //初始化积分信息
    await this.initPointConfig();

    //初始化商品信息
    const storeRes = await webApi.fetchWillBuyGoodsList();
    const { context } = await webApi.fetchCustomerCenterInfo();

    if (storeRes.code == 'K-000000') {
      this.dispatch(
        'set: logisticsAddress',
        (deliverSite && (`${deliverSite.logisticsName || ''}${deliverSite.logisticsPhone || ''}${deliverSite.logisticsAddress || ''}`)) || ''
      );
      this.dispatch('order-confirm: stores: fetch', storeRes.context);
      this.dispatch('order-confirm: price: fetch', {
        // discountsTotalOrderPrice: storeRes.context.discountsTotalOrderPrice,
        // subType: storeRes.context.subType,
        totalPrice: storeRes.context.totalPrice,
        goodsTotalPrice: storeRes.context.goodsTotalPrice,
        discountsTotalPrice: storeRes.context.discountsTotalPrice,
        totalBuyPoint: storeRes.context.totalBuyPoint
      });
      // 是否是开店礼包商品
      this.dispatch(
        'order-confirm-actor: storeBagsFlag',
        storeRes.context.storeBagsFlag == 1
      );

      //预售
      const { tradeConfirmItems } = storeRes.context;
      this.dispatch('order-confirm: presale: fetch', {
        isBookingSaleGoods:
          tradeConfirmItems[0].tradeItems[0].isBookingSaleGoods &&
          tradeConfirmItems[0].tradeItems[0].bookingType == 1, //预售定金
        isPresale: tradeConfirmItems[0].tradeItems[0].isBookingSaleGoods,
        tailNoticeMobile: context.customerName
      });
    } else {
      this.clearSessionStorage();
      msg.emit('app:tip', storeRes.message+',自动跳转至订单列表');
      msg.emit('router: goToNext', { routeName: 'OrderList', orderPay: true });
      // Alert({
      //   text: storeRes.message,
      //   fnText: '确定',
      //   fn: () =>
      // });
    }

    //自提点
    this._pickUpInit();
    const purchaseAddress = await AsyncStorage.getItem(cache.PURCHASE_ADDRESS);
    let addr;
    if (purchaseAddress) {
      //选择地址页面
      const { defaultAddr } = JSON.parse(purchaseAddress);
      addr = defaultAddr;
    }
    //跳转返回初始化
    if (await AsyncStorage.getItem(cache.ORDER_CONFIRM)) {
      //选择地址页面
      const { defaultAddr, orderConfirm } = JSON.parse(
        await AsyncStorage.getItem(cache.ORDER_CONFIRM)
      );
      this.dispatch('order-confirm-actor: back: init', {
        defaultAddr,
        orderConfirm
      });
      this.freightFunc();
    } else if (addr && addr.deliveryAddressId) {
      this.dispatch('order-confirm: init', storeRes.context);
      this.dispatch('order-confirm-actor: addr: fetch', addr);
      this.freightFunc();
      this.onSelectPayInfo({});
    } else {
      this.dispatch('order-confirm: init', storeRes.context);
      await this.initDefaultAddress();
      this.onSelectPayInfo({});
    }
    let couponPageInfo = null;
    // 使用优惠券页返回初始化
    if (await AsyncStorage.getItem(cache.ORDER_CONFIRM_COUPON)) {
      // 选择优惠券页
      couponPageInfo = JSON.parse(
        await AsyncStorage.getItem(cache.ORDER_CONFIRM_COUPON)
      );
      this.dispatch('set:coupon:page:info', fromJS(couponPageInfo));
      AsyncStorage.removeItem(cache.ORDER_CONFIRM_COUPON);
    } else {
      // 初始化页面默认选中最大面值的优惠券
      //过滤可用优惠券
      let canUseCoupons = storeRes.context.couponCodes.filter(
        (item) => item.status == 0
      );
      if (canUseCoupons.length > 0) {
        // 排序获取面值最大优惠券
        const canUseCouponsList = canUseCoupons.sort(
          compare('denomination', false)
        );
        canUseCouponsList.map((item) => {
          item.chosen = false;
        });
        canUseCouponsList[0].chosen = true;
        // 2.2.构建店铺优惠券
        let stores = fromJS([]);
        canUseCouponsList
          .filter((coupon) => coupon.platformFlag != 1)
          .forEach((coupon) => {
            const index = stores.findIndex(
              (store) => store.get('storeId') == coupon.storeId
            );
            if (index == -1) {
              stores = stores.push(
                fromJS({
                  storeId: coupon.storeId,
                  storeName: coupon.storeName,
                  coupons: [coupon]
                })
              );
            } else {
              stores = stores.updateIn([index, 'coupons'], (coupons) =>
                coupons.push(coupon)
              );
            }
          });

        // 2.3.重新排序店铺
        let sortedStores = fromJS([]);
        const orderConfirm = this.state().get('orderConfirm');
        const storeIds = orderConfirm.map((item) => item.get('storeId'));
        storeIds.toJS().forEach((storeId) => {
          stores.toJS().forEach((item) => {
            if(item.storeId == storeId) {
              sortedStores = sortedStores.push(fromJS(item))
            }
          })
        });
        const res = await webApi.checkoutCoupons([
          canUseCouponsList[0].couponCodeId
        ]);
        if (res.code == config.SUCCESS_CODE) {
          const {
            unreachedIds,
            couponTotalPrice,
            checkGoodsInfos
          } = res.context;
          couponPageInfo = {
            unreachedIds: fromJS(unreachedIds),
            checkGoodsInfos: fromJS(checkGoodsInfos),
            couponTotalPrice,
            enableCoupons: {
              stores: sortedStores,
              commonCoupons: canUseCouponsList.filter(
                (item) => item.platformFlag == 1
              )
            }
          };
          this.dispatch('set:coupon:page:info', fromJS(couponPageInfo));
        }
      }
    }
    // 跳转后处理优惠券信息
    this.dispatch('calc:coupon:info');
    this.fetchInvoiceSwitch(
      storeRes.context.tradeConfirmItems.map((m) => m.supplier.supplierId)
    );
    this.initTotalPoint();
    await WMkit.setIsDistributor();
    const isDistributor = WMkit.isDistributor();
    this.dispatch('order-confirm-actor:setIsDistributor', isDistributor);
    if (await AsyncStorage.getItem(cache.ORDER_POINT)) {
      const { usePoint, integralInput, deductionAmount } = JSON.parse(
        await AsyncStorage.getItem(cache.ORDER_POINT)
      );
      //如果选择了优惠券并且抵扣之后的金额大于订单支付最大金额(不包括运送费)
      if (
        couponPageInfo &&
        _.sub(couponPageInfo.couponTotalPrice, deductionAmount) > 0
      ) {
        AsyncStorage.removeItem(cache.ORDER_POINT);
      } else {
        this.dispatch('order-confirm-actor:changeSwitch');
        this.dispatch('order-confirm-actor:setUsePoint', {
          usePoint,
          integralInput
        });
      }
    }
    // 支付配送页返回初始化
    if (await AsyncStorage.getItem(cache.ORDER_CONFIRM_PAYTYPE)) {
      const { payType } = JSON.parse(
        await AsyncStorage.getItem(cache.ORDER_CONFIRM_PAYTYPE)
      );
      this.dispatch('order-confirm-actor:set-pay-type', payType);
      AsyncStorage.removeItem(cache.ORDER_CONFIRM_PAYTYPE);
    }

    api.doInitAddressList().then((res) => {
      let { context } = res;
      let list = context.filter((item) => item.chooseFlag);
      if (list.length == 0) {
        list = context.filter(
          (item) => item.isDefaltAddress && item.isDefaltAddress == 1
        );
        if (list.length != 0) {
          context = list;
        }
      } else {
        context = list;
      }
      if (context.length != 0) {
        context.map((n) => {
          const { provinceId, cityId, areaId, deliveryAddress } = n;
          n.addressInfo =
            FindArea.addressInfo(provinceId, cityId, areaId) + deliveryAddress;
          return n;
        });
      }
      this.dispatch('order-confirm-actor: addr: fetch', context[0]);
      this._homeDelivery(context[0]);
    })
    //跳转到选择物流信息页面备注和附件数据消失
    let filesAndRmk=await AsyncStorage.getItem(cache.CONFIRM_ORDER_FILE_RMK);
    filesAndRmk=filesAndRmk&&JSON.parse(filesAndRmk)||null;
    if(filesAndRmk){
      this.dispatch('order-confirm-actor: remark', { remark:filesAndRmk.rmk, storeId:filesAndRmk.storeId });
      this.dispatch('order-confirm-actor: prev',{image:fromJS(filesAndRmk.orderFiles||[]),storeId:filesAndRmk.storeId})
    }
    this.clearSessionStorage();
    //加载中
    this.changeLoadingVisible(false);
  };
  async _orderMarketing(){
  const goodsTotalNum = this.state().get('goodsTotalNum')
  const totalPrice = this.state().get('totalPrice')
  const totalDeliveryPrice = this.state().get('totalDeliveryPrice')
    const request = {totalPrice: totalPrice - totalDeliveryPrice, goodsTotalNum};
    const res = await webApi.orderMarketing(request)
    if(res.context==null){
      return
    }
    this.dispatch('order-confirm: subType: fetch', res.context);
  }
  /**
   * 自提点初始化
   */
  _pickUpInit = async () => {
    //初始化自提配送方式
    const pickUpRes = await webApi.queryPickUpStoresLimit();
    if (pickUpRes.code == config.SUCCESS_CODE) {
      const list = this.state()
        .get('orderConfirm')
        .toJS()
        .map((v) => {
          const data = {
            storeId: v.storeId,
            pickUpList: pickUpRes.context.wareHouseStore[v.storeId]
          };
          return data;
        });
      this.dispatch('order-confirm-actor: pickUpMessage', list);
      let pickUpSelect = {};
      let pickUpSelectShow = {};
      this.state()
        .get('orderConfirm')
        .toJS()
        .map((v) => {
          if (pickUpRes.context.wareHouseStore[v.storeId].size != 0) {
            if (
              pickUpRes.context.wareHouseStore[v.storeId][0].stockOutFlag == 0
            ) {
              pickUpSelect[v.storeId] =
                pickUpRes.context.wareHouseStore[v.storeId][0].wareId;
              pickUpSelectShow[v.storeId] =
                pickUpRes.context.wareHouseStore[v.storeId][0];
            }
          }
        });
      this.dispatch('order-confirm-actor: pickUpSelect', {
        pickUpSelect,
        pickUpSelectShow
      });
    }
  };

  _homeDelivery = async (address) => {
    const matchFlag = await getMatchFlag();
    let delivery = [];
    if (matchFlag) {
      const wareStr = await AsyncStorage.getItem(cache.MATCH_WARE_STORE);
      let request = {};
      request.customerDeliveryAddressId = address && address.deliveryAddressId;
      request.wareId = JSON.parse(wareStr).wareId;
      let res = { code: 'K-000001' };
      if (address) {
        res = await webApi.checkDeliveryHomeFlag(request);
      }
      if (res.code == config.SUCCESS_CODE) {
        if (res.context.flag == 0) {
          delivery = [
            { id: '1', name: '第三方物流' },
            { id: '2', name: '快递到家(收费)' }
          ];
        } else {
          delivery = [
            { id: '4', name: '免费店配(五件起)' },
            { id: '2', name: '快递到家(收费)' }
          ];
        }
      } else {
        delivery = [
          { id: '1', name: '第三方物流' },
          { id: '2', name: '快递到家(收费)' },
          { id: '4', name: '免费店配(五件起)' }
        ];
      }
    } else {
      delivery = [{ id: '', name: '' }];
      // this.dispatch('order: init: storesOnlyPickUp');
    }
    const param = await AsyncStorage.getItem(cache.ORDER_CONFIRM_DELIVERY_WAY);
    let isExit = false;
    let deliveryType;
    if (param) {
      deliveryType = JSON.parse(param).deliveryType;
      isExit = delivery.some((item) => {
        return item.id == deliveryType;
      });
    }

    this.onSelectDeliveryType(
      this.state().get('stores').get(0).get('supplier').get('storeId'),
      isExit ? deliveryType : delivery[0].id,
      false
    );
    const homeDelivery = await webApi.getHomeDeliveryList();
    let homeDeliveryVO = homeDelivery.context.homeDeliveryVOList[0];
    let homeDeliverContent = homeDeliveryVO.content;
    let homeDeliverExpressContent = homeDeliveryVO.expressContent;
    let homeDeliverPickSelfContent = homeDeliveryVO.pickSelfContent;
    this.dispatch('order-confirm-actor: homeDelivery', {
      homeDeliverContent,
      homeDeliverExpressContent,
      homeDeliverPickSelfContent
    });
    this.dispatch('order-confirm-actor: delivery', { delivery });
  };

  /**
   * 计算运费
   */
  _calcFreight = () => {
    //1.组装收货地址
    const defaultAddr = this.state().get('defaultAddr');
    if (!defaultAddr || !defaultAddr.get('provinceId')) {
      return;
    }
    let consignee = {
      provinceId: defaultAddr.get('provinceId'),
      cityId: defaultAddr.get('cityId')
    };
    const orderConfirm = this.state().get('orderConfirm');

    let checkGoodsInfos = this.state().getIn([
      'couponPageInfo',
      'checkGoodsInfos'
    ]);

    //2.组装完整的请求参数(用于计算运费)
    const tradeParamsList = this.state()
      .get('stores')
      .map((st, i) => {
        const amountList = st.get('discountsPrice');
        let amountTotal = 0;
        if (amountList && amountList.size) {
          amountTotal = amountList.reduce(
            (a, b) => _.add(a, b.get('amount')),
            0
          );
        }

        if (checkGoodsInfos) {
          st = st.update('tradeItems', (skus) => {
            return skus.map((sku) => {
              const checkGoodsInfo = checkGoodsInfos.find(
                (item) => item.get('goodsInfoId') == sku.get('skuId')
              );
              if (checkGoodsInfo === undefined) {
                return;
              }
              // 优惠总价追加优惠券金额
              amountTotal = _.add(
                amountTotal,
                _.sub(sku.get('splitPrice'), checkGoodsInfo.get('splitPrice'))
              );
              // sku修改为优惠券后的均摊价
              return sku.set('splitPrice', checkGoodsInfo.get('splitPrice'));
            });
          });
        }

        return {
          supplier: {
            storeId: st.get('supplier').get('storeId'),
            freightTemplateType: st.get('supplier').get('freightTemplateType')
          },
          consignee,
          deliverWay: orderConfirm.get(i).get('deliverWay'),
          tradePrice: {
            totalPrice: _.sub(
              st.get('tradePrice').get('goodsPrice'),
              amountTotal
            )
          },
          oldTradeItems: st.get('tradeItems').toJS(),
          oldGifts: st.get('gifts') ? st.get('gifts').toJS() : [],
          // 是否是秒杀
          isSeckill: false
        };
      });
    //3.根据返回的各店铺运费结果,更新状态
    webApi.fetchFreight(tradeParamsList).then((r) => {
      if (this.state().get('grouponFreeDelivery')) {
        // 如果拼团活动是包邮活动
        r.context.map((item) => (item.deliveryPrice = 0));
      }
      this.dispatch('order-confirm-actor:changeDeliverFee', r.context);
      this._orderMarketing()
    });
  };

  /**
   * 清除SessionStorage
   */
  clearSessionStorage = () => {
    AsyncStorage.removeItem(cache.ORDER_CONFIRM);
    AsyncStorage.removeItem(cache.ORDER_CONFIRM_COUPON);
    AsyncStorage.removeItem(cache.ORDER_POINT);
    AsyncStorage.removeItem(cache.CONFIRM_ORDER_FILE_RMK);
  };

  /**
   * 存储SessionStorage
   * @param comeFrom 来自哪里
   */
  saveSessionStorage = (comeFrom) => {
    const { defaultAddr, orderConfirm, couponPageInfo } = this.state().toJS();
    AsyncStorage.setItem(
      cache.ORDER_CONFIRM,
      JSON.stringify({
        defaultAddr,
        orderConfirm,
        comeFrom
      })
    );
    AsyncStorage.setItem(
      cache.ORDER_CONFIRM_COUPON,
      JSON.stringify(couponPageInfo)
    );
    this.savePayType();
    this.savePointCache();
  };

  /**
   * 保存买家备注
   * @param remark
   */
  saveBuyerRemark = ({ remark, storeId }) => {
    this.dispatch('order-confirm-actor: remark', { remark, storeId });
  };

  /**
   * 初始化收货地址
   * @returns {Promise<void>}
   */
  initDefaultAddress = async () => {
    const addrRes = await webApi.fetchCustomerDefaultAddr();
    this.dispatch('order-confirm-actor: addr: fetch', addrRes.context);
    this.freightFunc();
  };

  /**
   * 提交订单
   * @returns {Promise<void>}
   */
  submit = async (forceCommit) => {
    const {
      defaultAddr,
      orderConfirm,
      commonCodeId,
      usePoint,
      integralInput,
      payType,
      isBookingSaleGoods,
      tailNoticeMobile,
      isCommit,
      stores,
      deliveryWaysId,
      pickUpSelect
    } = this.state().toJS();
    let storeCommitInfoList = [];

    if (!defaultAddr || !defaultAddr.deliveryAddressId) {
      msg.emit('app:tip', '请选择收货地址!');
      return;
    }

    if (isBookingSaleGoods && !tailNoticeMobile) {
      msg.emit('app:tip', '请填写尾款手机号!');
      return;
    }

    if (isBookingSaleGoods && !ValidConst.phone.test(tailNoticeMobile)) {
      msg.emit('app:tip', '请检查尾款手机号!');
      return;
    }

    if (isBookingSaleGoods && !isCommit) {
      msg.emit('app:tip', '请同意支付定金!');
      return;
    }

    const addrDetail =
      FindArea.addressInfo(
        defaultAddr ? defaultAddr.provinceId : '',
        defaultAddr ? defaultAddr.cityId : '',
        defaultAddr ? defaultAddr.areaId : ''
      ) + (defaultAddr ? defaultAddr.deliveryAddress : '');
    let deliverSite = await AsyncStorage.getItem(cache.DELIVER_SITE);
    deliverSite = (deliverSite && JSON.parse(deliverSite)) || null;
    //验证:如果是自提方式验证是否已选择
    for (const i in stores) {
      const storeId = stores[i].supplier.storeId;
      const tradeItems = stores[i].tradeItems;
      const gifts = stores[i].gifts;
      //每个店铺购买商品件数
      let totalNum = 0;
      tradeItems.forEach((tradeItem) => {
        totalNum += tradeItem.num;
      });
      if (gifts != '') {
        gifts.forEach((gift) => {
          totalNum += gift.num;
        });
      }
      for (const i in orderConfirm) {
        let o = orderConfirm[i];
        if (o.bookingDeliveryFlag) {
          if (!o.bookingDate) {
            msg.emit('app:tip', '请选择预约发货时间');
            return;
          }
        }
        if (o.deliverWay == '3') {
          if (!pickUpSelect[storeId]) {
            msg.emit('app:tip', '请选择自提地址');
            return;
          }
        }
        if (o.deliverWay == '1') {
          if (!deliverSite) {
            this.dispatch('change:addressNameShow', true);
            msg.emit('app:tip', '请选择物流公司');
            return;
          }
          if (totalNum < 5) {
            msg.emit('app:tip', '第三方物流起送数量不得少于5件');
            return;
          }
        }
        if (o.deliverWay == '4') {
          if (totalNum < 5) {
            msg.emit('app:tip', '免费店配起送数量不得少于5件');
            return;
          }
        }
        if (o.deliverWay == '') {
          msg.emit('app:tip', '该地址不支持配送，请重新选择！');
          return;
        }
      }
    }

    orderConfirm.forEach((o, i) => {
      if (
        !FormRegexUtil(o.buyerRemark.trim(), `订单${i}订单备注`, {
          minLength: 0
        })
      ) {
        return;
      }
      if (o.payType === -1) {
        msg.emit('app:tip', '请选择支付方式!');
        return;
      }
      if (
        o.invoice.type != -1 &&
        o.sperator &&
        (!o.defaultInvoiceAddr || !o.defaultInvoiceAddr.deliveryAddressId)
      ) {
        msg.emit('app:tip', '请选择发票收货地址!');
        return;
      }
      const deliveryAddress = defaultAddr ? addrDetail : '';
      const invoiceAddrDetail = o.defaultInvoiceAddr
        ? FindArea.addressInfo(
          o.defaultInvoiceAddr ? o.defaultInvoiceAddr.provinceId : '',
          o.defaultInvoiceAddr ? o.defaultInvoiceAddr.cityId : '',
          o.defaultInvoiceAddr ? o.defaultInvoiceAddr.areaId : ''
        ) + (o.defaultInvoiceAddr ? o.defaultInvoiceAddr.deliveryAddress : '')
        : '';

      storeCommitInfoList.push({
        storeId: o.storeId, // 店铺Id
        payType: payType, //支付类型，必传
        invoiceType: o.invoice.type, //开票类型，必传 0：普通发票 1：增值税专用发票 -1：无
        generalInvoice:
          o.invoice.type == 0
            ? {
              flag: o.invoice.flag,
              title: o.invoice.title,
              identification: o.invoice.identification
            }
            : {}, //普通发票与增票参数至少一项必传
        specialInvoice:
          o.invoice.type == 1
            ? {
              id: o.VATInvoice.customerInvoiceId
            }
            : {}, //增值税专用发票与普票至少一项必传
        specialInvoiceAddress: o.sperator, //是否单独的收货地址
        invoiceAddressId:
          o.invoice.type != '-1' && o.sperator
            ? o.defaultInvoiceAddr.deliveryAddressId
            : defaultAddr.deliveryAddressId, //发票的收货地址ID,必传
        invoiceAddressDetail:
          o.invoice.type != '-1' && o.sperator
            ? invoiceAddrDetail
            : deliveryAddress, //收货地址详细信息（不包含省市区）
        invoiceAddressUpdateTime:
          o.invoice.type != '-1' && o.sperator
            ? o.defaultInvoiceAddr.updateTime
              ? moment(o.defaultInvoiceAddr.updateTime).format(
                Const.SECONDS_FORMAT
              )
              : null
            : defaultAddr.updateTime
              ? moment(defaultAddr.updateTime).format(Const.SECONDS_FORMAT)
              : null,
        invoiceProjectId: o.invoice.type != '-1' ? o.invoice.projectKey : '', //开票项目id，必传
        invoiceProjectName: o.invoice.type != '-1' ? o.invoice.projectName : '', //开票项目名称，必传
        invoiceProjectUpdateTime: o.invoice.projectUpdateTime
          ? moment(o.invoice.projectUpdateTime).format(Const.SECONDS_FORMAT)
          : null, //开票项目修改时间
        buyerRemark: o.buyerRemark, //订单备注
        encloses: o.enclosures
          .filter((v) => v.status == 'done')
          .map((v) => v.image)
          .join(','), //附件, 逗号隔开
        deliverWay: o.deliverWay, //配送方式，默认快递
        bookingDate:
          (o.deliverWay == 1 || o.deliverWay == 4) && o.bookingDeliveryFlag
            ? o.bookingDate
            : null, //预约发货时间
        wareId: o.deliverWay == 3 ? pickUpSelect[o.storeId] : null,
        couponCodeId: o.couponCodeId, // 选择的店铺优惠券id
        logisticsInfo: {
          id:
            (deliverSite && deliverSite.id && deliverSite.id != 'default')?deliverSite.id:
            '',
          logisticsCompanyName:
            (deliverSite &&
              deliverSite.logisticsName &&
              deliverSite.id != 'default') ?deliverSite.logisticsName:
            '',
          logisticsCompanyPhone:
            (deliverSite &&
              deliverSite.logisticsPhone &&
              deliverSite.id != 'default') ?deliverSite.logisticsPhone:
            '',
          logisticsAddress:
            (deliverSite &&
              deliverSite.logisticsAddress &&
              deliverSite.id != 'default') ?deliverSite.logisticsAddress:
            '',
          receivingPoint:
            (deliverSite &&
              deliverSite.receivingPoint &&
              deliverSite.id != 'default') ?deliverSite.receivingPoint:
            '',
          insertFlag:
            deliverSite &&
              deliverSite.insertFlag != -1 &&
              deliverSite.id != 'default'
              ? deliverSite.insertFlag
              : ''
        }
      });
    });
    if (integralInput && integralInput != '') {
      let reg = /^\d+$/;
      if (!reg.test(integralInput)) {
        msg.emit('app:tip', '请填写正确的积分!');
        return;
      }
    }
    let cityCode = await WareUtils.queryChooseCity();
    let params = {
      consigneeId: defaultAddr.deliveryAddressId, //收货地址id，必传
      consigneeAddress: addrDetail, //收货地址详细信息(包含省市区)，必传
      consigneeUpdateTime: defaultAddr.updateTime
        ? moment(defaultAddr.updateTime).format(Const.SECONDS_FORMAT)
        : null, //收货地址修改时间
      storeCommitInfoList,
      commonCodeId,
      // 需要校验营销活动
      forceCommit,
      cityCode,
      //订单来源
      orderSource: 'APP',
      isBookingSaleGoods,
      tailNoticeMobile
    };
    if (_.sub(usePoint, 0) > 0) {
      params['points'] = usePoint;
    }
    const { code, message, context } = await webApi.commit(params);
    if (code == 'K-000000') {
      AsyncStorage.removeItem(cache.DELIVER_SITE);
      AsyncStorage.removeItem(cache.ORDER_CONFIRM_DELIVERY_WAY);
      //下单成功,清除
      this.clearSessionStorage();
      //更新购物车角标
      msg.emit('purchaseNum:refresh');
      // 0元订单直接支付
      const totalPrice = context.map((i) => i.price).reduce((a, b) => a + b, 0);
      if (totalPrice == 0) {
        // 0元订单且订单审核状态为不需要审核时直接跳转支付成功页
        let directPayFlag =
          context && context[0].tradeState.auditState == 'CHECKED';
        if (directPayFlag) {
          const res = await webApi.defaultPayBatch(
            context.map((item) => item.tid)
          );
          if (res.code == 'K-000000') {
            //跳转到支付成功页
            msg.emit('router: goToNext', {
              routeName: 'PaySuccess',
              tid: null,
              parentTid: context[0].parentTid,
              payType: 'online'
            });
          } else {
            Alert({ text: res.message });
          }
          return;
        }
      }

      // 当选择在线支付，且每个单子都为已审核、先款后货时，进行合并支付
      const payType = this.state().get('payType');
      let directPayFlag = true;
      if (
        payType == 0 &&
        this.state().get('payOptions').size > 1 &&
        context &&
        context.length > 0
      ) {
        for (let i = 0; i < context.length; i++) {
          if (
            context[i].tradeState.auditState !== 'CHECKED' ||
            context[i].paymentOrder !== 'PAY_FIRST'
          ) {
            directPayFlag = false;
            break;
          }
        }
        if (directPayFlag) {
          msg.emit('router: replace', {
            routeName: 'PayOrder',
            results: context
          });
          return;
        }
      }

      msg.emit('router: replace', {
        routeName: 'OrderSuccess',
        results: context
      });
    } else if (code == 'K-999999') {
      Confirm({
        text: message,
        cancelText: '重新下单',
        okText: '继续下单',
        okFn: () => this.submit(true),
        cancelFn: () =>
          msg.emit('router: goToNext', { routeName: 'PurchaseOrder' })
      });
    } else if (code == 'K-600018' || code == 'K-600019' || code == 'K-600010') {
      Alert({
        text: message,
        fnText: '确定',
        fn: () => msg.emit('router: back')
      });
    } else if (code == 'K-031407') {
      const cityCode = await WareUtils.queryChooseCity();
      await setChooseCity(cityCode);
      Confirm({
        title: '',
        text: message,
        okText: '确定',
        okFn: async () => { }
      });
    } else if (code === 'K-050509') {
      Alert({
        text: '订单推送异常，请稍后重试',
        fnText: '确定',
        fn: () => msg.emit('router: back')
      });
    } else if (code === 'K-050510') {
      Alert({
        text: '网络请求超时，请稍后重试',
        fnText: '确定',
        fn: () => msg.emit('router: back')
      });
    } else if (code === 'K-050137') {
      //目前只针对单店铺情况
      const storeId = stores[0].supplier.storeId;
      const wareStr = await AsyncStorage.getItem(cache.MATCH_WARE_STORE);
      let wareId =
        deliveryWaysId[storeId] === '3'
          ? pickUpSelect[storeId]
          : JSON.parse(wareStr).wareId;
      const result = await webApi.listStockOutGroupByStoreId(wareId, storeId);
      let stockOut = result.context.stockOutGroupByStoreId.stockOut;
      if (stockOut) {
        this.dispatch('check-stock:init', result.context);
        this.dispatch('check-stock-wareId:init', { wareId, storeId });
      }
    } else {
      Alert({
        text: message,
        fnText: '确定',
        fn: () => msg.emit('router: goToNext', { routeName: 'PurchaseOrder' })
      });
    }
  };
  setCloseTipVisible = () => {
    this.dispatch('check-stock:close', false);
  };
  updateUnStock = async () => {
    const { stores, deliveryWaysId, pickUpSelect } = this.state().toJS();
    const storeId = stores[0].supplier.storeId;
    const wareStr = await AsyncStorage.getItem(cache.MATCH_WARE_STORE);
    let realWareId =
      deliveryWaysId[storeId] === '3'
        ? pickUpSelect[storeId]
        : JSON.parse(wareStr).wareId;
    let cityCode = await WareUtils.queryChooseCity();
    let param = {
      realWareId,
      storeId,
      cityCode,
      wareId: realWareId
    };
    await webApi.updateUnstock(param);
    this.setCloseTipVisible;
    await this.submit(true);
  };

  /**
   * 上传附件
   */
  addImage = ({ image, storeId }) => {
    this.dispatch('order-confirm-actor: addImage', { image, storeId });
  };

  /**
   * 删除附件
   */
  removeImage = ({ index, storeId }) => {
    this.dispatch('order-confirm-actor: removeImage', { index, storeId });
  };

  /**
   * 获取可用支付选项
   */
  getPayOptions = async () => {
    const { code, context } = await webApi.fetchOnlinePayStatus();
    if (code === config.SUCCESS_CODE && context == true) {
      const data = [
        { id: '0', name: '在线支付' },
        { id: '1', name: '线下支付' }
      ];
      this.dispatch('order-confirm-actor: options', fromJS(data));
    }
  };

  /**
   * 查询是否支持开票
   */
  fetchInvoiceSwitch = async (companyInfoIds) => {
    const { code, message, context } = await webApi.fetchInvoiceSwitch(
      companyInfoIds
    );
    if (code == 'K-000000') {
      this.dispatch('order-confirm-actor: invoice: switch', fromJS(context));
    } else {
      message.error(message);
    }
  };
  /**
   * 改变附件弹窗的显示隐藏，对图片对象重新排序
   */
  changeAnnexMask = (index, storeId) => {
    this.dispatch('change:changeAnnexMask', { index, storeId });
  };

  /**
   * 使用优惠券
   */
  useCoupons = () => {
    this.saveSessionStorage('coupon');
    const coupons = this.state().get('coupons');
    const couponPageInfo = this.state().get('couponPageInfo');
    const orderConfirm = this.state().get('orderConfirm');
    msg.emit('router: goToNext', {
      routeName: 'UseCoupon',
      coupons,
      couponPageInfo,
      storeIds: orderConfirm.map((item) => item.get('storeId'))
    });
  };
  savePointCache = () => {
    //当前按钮选中的状态的时候
    if (this.state().get('showPoint')) {
      //存储缓存
      AsyncStorage.setItem(
        cache.ORDER_POINT,
        JSON.stringify({
          usePoint: this.state().get('usePoint'),
          integralInput: this.state().get('integralInput'),
          deductionAmount: _.sub(
            this.state().get('totalPrice'),
            this.state().get('totalDeliveryPrice')
          )
        })
      );
    }
  };

  /**
   * 保存支付方式缓存
   */
  savePayType = () => {
    if (this.state().get('payType') != null) {
      //存储缓存
      AsyncStorage.setItem(
        cache.ORDER_CONFIRM_PAYTYPE,
        JSON.stringify({
          payType: this.state().get('payType'),
          openGroupon: this.state().get('openGroupon')
        })
      );
    }
  };

  /**
   * 保存使用积分
   *
   * @param integralInput 输入的积分
   * @param pointWorth 积分转换单位
   */
  setUsePoint = (integralInput, maxPoint) => {
    // 使用的积分
    let usePoint = 0;
    if (integralInput != '') {
      let reg = /^\d+$/;
      if (!reg.test(integralInput)) {
        Alert({
          text: '请填写正确的积分'
        });
        this.dispatch('order-confirm-actor:setUsePoint', {
          usePoint,
          integralInput
        });
        return;
      }
    }
    usePoint = integralInput;
    // 如果大于最大限制，自动已最大计算
    if (integralInput > maxPoint) {
      usePoint = maxPoint;
      integralInput = maxPoint.toString();
    }
    this.dispatch('order-confirm-actor:setUsePoint', {
      usePoint,
      integralInput
    });
  };
  /**
   * 订单提交页切换是否使用积分
   */
  changeSwitch = (value: boolean) => {
    //如果关闭积分,清除缓存
    if (!value) {
      AsyncStorage.removeItem(cache.ORDER_POINT);
    }
    this.dispatch('order-confirm-actor:changeSwitch');
  };
  /**
   * 初始化积分余额
   */
  initPointConfig = async () => {
    const { code, context } = await webApi.fetchPointsConfig();
    if (code === config.SUCCESS_CODE) {
      this.dispatch('order-confirm-actor:initpointConfig', fromJS(context));
    }
  };

  /**
   * 初始化积分余额
   */
  initTotalPoint = async () => {
    const { code, context } = await webApi.fetchCustomerCenterInfo();
    if (code === config.SUCCESS_CODE) {
      this.dispatch(
        'order-confirm-actor:initTotalPoint',
        context.pointsAvailable
      );
    }
  };

  /**
   * 更新尾款手机号
   */
  saveTailNoticeMobile = ({ tailNoticeMobile }) => {
    this.dispatch('order-confirm-actor: tailNoticeMobile', {
      tailNoticeMobile
    });
  };

  /**
   * 定金支付同意按钮
   */
  changeIsCommit = () => {
    this.dispatch(
      'order-confirm-actor: isCommit',
      !this.state().get('isCommit')
    );
  };

  /**
   * 打开或关闭配送文案弹窗
   */
  openModel = (storeId, flag) => {
    let deliverModelIsShow = {};
    deliverModelIsShow[storeId] = flag;
    this.dispatch(
      'order-confirm-actor: setDeliverModelIsShow',
      deliverModelIsShow
    );
  };

  //设置配送方式
  setDeliveryWay = (storeId, val) => {
    let deliveryWaysId = {};
    deliveryWaysId[storeId] = val;
    this.dispatch('order-confirm-actor: setDeliveryWaysId', deliveryWaysId);
  };

  //改变加载中状态
  changeLoadingVisible = (status) => {
    this.dispatch('set: loadingVisible', status);
  };
  _selectPickUp = (storeId, item) => {
    let pickUpSelect = {},
      pickUpSelectShow = {};
    pickUpSelect[storeId] = item
      ? item.get('pickUpList').get(0).get('wareId')
      : '';
    pickUpSelectShow[storeId] = item
      ? item.get('pickUpList').get(0).toJS()
      : {};
    this.dispatch('order-confirm-actor: pickUpSelect', {
      pickUpSelect,
      pickUpSelectShow
    });
  };
}
