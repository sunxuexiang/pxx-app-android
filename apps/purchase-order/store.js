import { PermissionsAndroid, Platform, Permissions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { msg, Store } from 'plume2';
import { fromJS, List } from 'immutable';

import { Confirm } from 'wmkit/modal/confirm';
import { config } from 'wmkit/config';
import { cache } from 'wmkit/cache';
import * as _ from 'wmkit/common/util';
import * as WMkit from 'wmkit/kit';
import * as VAS from 'wmkit/vas';
import { delPurchase, putPurchase, putSkuMarketingCache } from 'wmkit/biz/purchase-front';
import EditActor from './actors/edit-actor';
import SkuActor from './actors/sku-actor';
import SpuActor from './actors/spu-actor';
import StoreInfoActor from './actors/storeInfo-actor';
import LoadingActor from './actors/loading-actor';
import IntervalPriceActor from './actors/intervalPrice-actor';
import MarketingActor from './actors/marketing-actor';
import * as webapi from './webapi';
import * as webApi from '../goods-detail/webapi';
import { getBeforeAddress, setChooseCity } from '../../wmkit/ware-house/matchWare';
import * as FindArea from '../../wmkit/area/area';
import { Geolocation } from 'react-native-baidu-map';
import OpenSettings from '@wanmi/react-native-open-settings';

export default class AppStore extends Store {
  bindActor() {
    return [
      new EditActor(),
      new SkuActor(),
      new SpuActor(),
      new StoreInfoActor(),
      new IntervalPriceActor(),
      new LoadingActor(),
      new MarketingActor()
    ];
  }

  constructor(props) {
    super(props);
    //debug
    window._store = this;
  }

  //action
  init = async (pageNum = 0) => {
    this.changeLoadingVisible(true);
    // 是否已登录
    this.dispatch('purchase:setLoginFlag', !!window.token);
    // 勾选的sku
    let skuIds = [];
    // 初始化地址
    this.initDefaultAddress();
    this.state().get('checkItemList') &&
      this.state()
        .get('checkItemList')
        .forEach((sku) => {
          if (sku.get('checked')) {
            skuIds.push(sku.get('goodsInfoId'));
          }
        });
    if (skuIds.length == 0 && this.state().get('getPriceInfoFlag')) {
      this.dispatch('purchaseOrder: setGetPriceInfo', false);
    }
    let purInfo;
    let totalPages = 0;
    //初始化购物车
    if (WMkit.isLoginOrNotOpen()) {
      let { pageSize } = this.state().toJS();
      const { context, code, message } = await webapi.fetchPurchaseOrder({
        pageNum,
        pageSize,
        goodsInfoIds: skuIds,
        isRefresh: true
      });
      if (code !== config.SUCCESS_CODE) {
        msg.emit('app:tip', message);
        return;
      }
      let numSkus = {};
      purInfo = context;
      const checkItemList = purInfo.purchaseGoodsInfos;
      purInfo.goodsInfoPage && purInfo.goodsInfoPage.content.map((info) => {
        if (info.isCheck == 1 && info.stock > 0 && info.goodsStatus == 0) {
          info.checked = true;
        }
      });
      checkItemList && checkItemList.map((info) => {
        numSkus[info.goodsInfoId] = info.buyCount;
        if (info.isCheck == 1 && info.stock > 0 && info.goodsStatus == 0) {
          info.checked = true;
        }
      });
      totalPages = purInfo.goodsInfoPage ? purInfo.goodsInfoPage.totalPages : 0;
      this.transaction(() => {
        this.dispatch('change:numSkus', numSkus);
        this.dispatch('purchase:checkItemList', checkItemList || []);
      });
    } else {
      const purCache = await AsyncStorage.getItem(cache.PURCHASE_CACHE);
      const skuMarArr =
        JSON.parse(await AsyncStorage.getItem(cache.SKU_MARKETING_CACHE)) || [];
      if (purCache) {
        const purArr = JSON.parse(purCache);
        const { context, code, message } = await webapi.fetchPurchaseFromCache(
          purArr,
          skuIds,
          skuMarArr
        );
        if (code !== config.SUCCESS_CODE) {
          msg.emit('app:tip', message);
          return;
        }
        purInfo = context;
        purInfo = {
          ...context,
          goodsInfoPage: {
            content: purInfo.goodsInfos
          },
          goodsPage: {
            content: purInfo.goodses
          }
        }
        if (purInfo.goodsInfos.length > 0) {
          totalPages = 1;
        }
        // 将后端过滤后的信息 覆盖 前端缓存,保持数据一致
        const cacheTmp = purInfo.goodsInfos.map((info) => {
          return {
            goodsInfoId: info.goodsInfoId,
            goodsNum: info.buyCount,
            invalid: info.goodsStatus == 2
          };
        });
        AsyncStorage.setItem(
          cache.PURCHASE_CACHE,
          JSON.stringify(cacheTmp || [])
        );
        AsyncStorage.setItem(
          cache.SKU_MARKETING_CACHE,
          JSON.stringify(purInfo.goodsMarketings || [])
        );
      } else {
        purInfo = {
          companyInfos: [],
          goodsInfos: [],
          goodsIntervalPrices: [],
          goodses: [],
          stores: []
        };
      }
    }
    this._markettingInit(purInfo, skuIds);
    this.changeLoadingVisible(false);
    this.dispatch('purchase: loading', false);
    this.dispatch('set: loadingVisible', false);
    this.dispatch('purchaseOrder: setPageNum', pageNum);
    this.dispatch('purchaseOrder: setTotalPages', totalPages);
  };

  //赠品信息处理
  _markettingInit = (purInfo, skuIds, _type) => {
    // 赠品详细信息，格式{goodsInfoId: goodsInfo}
    const selectedMarketingGifts = this.getDefaultGift(purInfo.giftList);

    let storeMarketingMap =
      (purInfo.storeMarketingMap && fromJS(purInfo.storeMarketingMap)) ||
      fromJS({});
    let goodsMarketings =
      (purInfo.goodsMarketings && fromJS(purInfo.goodsMarketings)) || List();

    // sku营销
    let skuMarketingDict = this.getSkuMarketingDict(storeMarketingMap);

    const count = purInfo.goodsInfoPage ? purInfo.goodsInfoPage.content.length : 0;
    msg.emit('router: setParams', {
      _changeEdit: this.change,
      purchaseNum: count,
      buttonName:
        count === 0 ? '' : this.state().get('edit') ? '完成' : '移除商品'
    });
    this.transaction(() => {
      this.dispatch('purchase:skus', purInfo.goodsInfoPage ? purInfo.goodsInfoPage.content : []);
      this.dispatch('purchase:showDistributeCommission', purInfo.selfBuying);
      this.dispatch(
        'purchase:distributeCommission',
        purInfo.distributeCommission
      );

      this.dispatch('purchase:marketing:init', {storeMarketingMap, giftList: purInfo.giftList, goodsMarketings, selectedMarketingGifts, skuMarketingDict});
      this.dispatch('purchaseOrder: spus', purInfo.goodsPage ? purInfo.goodsPage.content : []);
      this.dispatch('purchase: intervalPrice', purInfo.goodsIntervalPrices);
      this.dispatch('purchase:stores', purInfo.stores);
      this.dispatch('purchaseOrder: setBottomPrice', {
        totalPrice: purInfo.totalPrice,
        tradePrice: purInfo.tradePrice,
        discountPrice: purInfo.discountPrice,
        totalBuyPoint: purInfo.totalBuyPoint,
      });
    });
    if (skuIds.length > 0) {
      this.dispatch('purchaseOrder: setGetPriceInfo', true);
    }
    //选择营销不刷新角标
    if (_type != 'chooseSkuMarketing') {
      msg.emit('purchaseNum:refresh');
    }
  };

  handlePagination = async () => {
    this.dispatch('purchaseOrder: needScrollTop', false);
    let pageNum = this.state().get('pageNum');
    let pageSize = this.state().get('pageSize');
    let totalPages = this.state().get('totalPages');
    let spus = this.state().get('spus');
    let skus = this.state().get('skus');
    let checkItemList = this.state().get('checkItemList').toJS();
    if(totalPages > 0 && pageNum >= totalPages - 1) {
      return;
    }
    pageNum = pageNum + 1;
    // 勾选的sku
    let skuIds = [];
    skus &&
      skus.forEach((sku) => {
        if (sku.get('checked')) {
          skuIds.push(sku.get('goodsInfoId'));
        }
      });
    let purInfo = null;
    if (WMkit.isLoginOrNotOpen()) {
      const { context, code, message } = await webapi.fetchPurchaseOrder({
        pageNum: pageNum,
        pageSize: pageSize,
        goodsInfoIds: skuIds,
        isRefresh: false
      });
      if (code !== config.SUCCESS_CODE) {
        msg.emit('app:tip', message);
        return;
      }

      purInfo = context;
      purInfo.goodsInfoPage.content.map((info) => {
        const checkedItem = checkItemList.find((item) => item.goodsInfoId == info.goodsInfoId && item.checked);
        if (checkedItem && info.stock > 0) {
          info.checked = true;
        }
      });
    }
    this.transaction(() => {
      this.dispatch('purchaseOrder: setPageNum', pageNum);
      this.dispatch('purchaseOrder: spus', spus.toJS().concat( (purInfo && purInfo.goodsPage.content) || []));
      this.dispatch('purchase:skus', skus.toJS().concat( (purInfo && purInfo.goodsInfoPage.content) ||[]));
    });
  }

  /**
   * 初始化收货地址
   * @returns {Promise<void>}
   */
  initDefaultAddress = async () => {
    const purchaseAddress = await AsyncStorage.getItem(cache.PURCHASE_ADDRESS);
    let addr;
    if (purchaseAddress) {
      //选择地址页面
      const { defaultAddr } = JSON.parse(purchaseAddress);
      addr = defaultAddr;
    }
    // //跳转返回初始化
    if (addr && addr.deliveryAddressId) {
      this.dispatch('order-confirm-actor: addr: fetch', addr);
    } else {
      const addrRes = await webapi.fetchCustomerDefaultAddr();
      this.dispatch('order-confirm-actor: addr: fetch', addrRes.context);
    }
  };

  /**
   * 合并登录前,登陆后的购物车信息的回调函数-刷新购物车
   */
  mergePurchaseAndInit = async () => {
    await this.selectWareAddress();
    this.dispatch('purchaseOrder: needScrollTop', false);
    // 初始化购物车信息
    this.init();
  };

  /**
   * 修改购物车编辑状态
   */
  change = async () => {
    const edit = this.state().get('edit');
    // 若从编辑状态 -> 非编辑状态,需要将非正常状态的sku的选中状态去除
    if (edit) {
      //选中的sku
      const checkedSkus = this.state()
        .get('checkItemList')
        .filter((sku) => sku.get('checked'));
      //选中的可结算的sku
      const hasStockSku = checkedSkus.filter((sku) => sku.get('goodsStatus') == 0);
      //选中的可计算的skuId
      const skuIds = hasStockSku.map((sku) => sku.get('goodsInfoId'));
      //全部skuId
      const allSkuIds = this.state().get('checkItemList').map((sku) => sku.get('goodsInfoId'));
      this.transaction(() => {
        //全部sku设置成未选中
        this.dispatch('purchase:checkSpu', {
          skuIds: allSkuIds,
          checked: true
        });
        //选中的可计算的sku设置成选中
        this.dispatch('purchase:checkSpu', { skuIds, checked: false });
      });
    }
    edit
      ? msg.emit('router: setParams', { buttonName: '移除商品' })
      : msg.emit('router: setParams', { buttonName: '完成' });
    edit && this.changeMarketing();
    this.dispatch('purchaseOrder:edit', !edit);
  };

  /**
   * 选中sku
   * @param skuId
   */
  checkSku = async (skuId) => {
    this.changeLoadingVisible(true);
    this.dispatch('purchase:check', skuId);
    this.chooseSkuId(skuId);
    this.changeLoadingVisible(false);
  };

  chooseSkuId = (skuId) => {
    if (!WMkit.isLoginOrNotOpen()) {
      msg.emit('loginModal:toggleVisible', {
        callBack: () => {
          msg.emit('router: goToNext', { routeName: 'PurchaseOrder' });
        }
      });
    } else {
      const checkItemList = this.state().get('checkItemList');
      const filterGoods = checkItemList.filter(item=> item.get('goodsInfoId') == skuId);
      filterGoods.count() > 0 && this.checkGoodsStock(filterGoods);
      let numSkus = this.state().get('numSkus').toJS();
      this.dispatch('purchase:skuNum', { skuId: skuId, number: numSkus[skuId] });
      // 更新营销、结算信息
      this.changeMarketing();
    }
  };

  /**
   * 选中所有
   * @param {*} checked 点击前的选中状态
   */
  checkAll = async (checked) => {
    if (!WMkit.isLoginOrNotOpen()) {
      msg.emit('loginModal:toggleVisible', {
        callBack: () => {
          msg.emit('router: goToNext', { routeName: 'PurchaseOrder' });
        }
      });
      return;
    }
    this.changeLoadingVisible(true);
    this.dispatch('purchase:checkAll', {
      checked,
      edit: this.state().get('edit')
    });
    //选中的可结算的sku
    if (!checked) {
      const checkItemList = this.state().get('checkItemList');
      const filterGoods = checkItemList.filter(sku=> sku.get('checked'));
      this.checkGoodsStock(filterGoods);
    }
    // 更新营销、结算信息
    this.changeMarketing();
    this.changeLoadingVisible(false);
  };

  checkGoodsStock = async(goodsStockAry) => {
    if (this.state().get('edit')) return;
    let numSkus = this.state().get('numSkus').toJS();
    let checkStockAry = [];
    goodsStockAry.map(item=>{
      if (item.get('goodsStatus') == 0) {
        checkStockAry.push({skuId: item.get('goodsInfoId'), byCount: numSkus[item.get('goodsInfoId')]});
      }
    })
    const {code ,context} = await webapi.getGoodsStockByCateId(checkStockAry);
    if (code == config.SUCCESS_CODE) {
      this.dispatch('purchase:outStockGoodsList', context.goodsInfos);
      this.dispatch('purchase:isShowOutStock', context.goodsInfos.length > 0);
      this.dispatch('purchase:isConfirmClick', false);  //全选单选弹窗
    }
  }

  /**
   * 修改商品数量
   * @param skuNum
   * @param skuId
   * @returns {Promise<void>}
   */
  changeSkuNum = async (skuNum, skuId, _stock) => {
    if (!skuNum) {
      return;
    }
    if (skuNum == _stock) {
      msg.emit('app:tip', `该商品剩余库存${_stock}件`);
    }
    let numSkus = this.state().get('numSkus').toJS();
    numSkus[skuId] = skuNum;
    this.dispatch('change:numSkus', numSkus);
    // this.dispatch('purchase:skuNum', { skuId: skuId, number: skuNum });
    setTimeout(() => {
      if (WMkit.isLoginOrNotOpen()) {
        // 更新营销、结算信息
        this.changeMarketing();
      }
    }, 0);

    if (WMkit.isLoginOrNotOpen()) {
      const { code, message } = await webapi.changeSkuNum(skuNum, skuId);
      if (code == config.SUCCESS_CODE) {
        msg.emit('purchaseNum:refresh');
      } else if (code === 'K-050121') {
        msg.emit('app:tip', '购物车容量达到100种上限！');
      } else {
        msg.emit('app:tip', '修改失败！请重试');
      }
    } else {
      const res = await putPurchase(skuId, skuNum);
      if (res) {
        msg.emit('purchaseNum:refresh');
      } else {
        msg.emit('app:tip', '修改失败！请重试');
      }
    }
  };

  /**
   * 清除失效商品
   * @returns {Promise<void>}
   */
  cleanInvalidGoods = async () => {
    if (WMkit.isLoginOrNotOpen()) {
      const { message, code } = await webapi.cleanInvalidGoods();
      if (code !== config.SUCCESS_CODE) {
        msg.emit('app:tip', message);
        return;
      }
    } else {
      const purArr = JSON.parse(
        await AsyncStorage.getItem(cache.PURCHASE_CACHE)
      );
      if (purArr) {
        const skuIds = purArr
          .filter((sku) => sku.invalid)
          .map((sku) => sku.goodsInfoId);
        if (!(await delPurchase(skuIds))) {
          msg.emit('app:tip', '操作失败');
          return;
        }
      }
    }

    msg.emit('app:tip', '清空失效商品成功');
    //更新购物车全局数量
    msg.emit('purchaseNum:refresh');
    this.dispatch('purchaseOrder: needScrollTop', true);
    this.init();
  };

  /**
   * 删除购物车商品
   */
  deletePurchase = async () => {
    //获取所有选中的商品
    const skuIds = this.state()
      .get('checkItemList')
      .filter((sku) => sku.get('checked') && sku.get('goodsStatus') !== 2)
      .map((sku) => sku.get('goodsInfoId'));
    if (skuIds.count() == 0) {
      msg.emit('app:tip', '请选择要删除的商品');
      return;
    }
    this.deleteSku(skuIds.toJS());

  };

  // 删除sku
  deleteSku = async (skuIds) => {
    if (WMkit.isLoginOrNotOpen()) {
      const { code } = await webapi.deletePurchaseCount(skuIds);
      if (code !== config.SUCCESS_CODE) {
        msg.emit('app:tip', '删除失败，请重试！');
        return;
      }
    } else {
      const flag = await delPurchase(skuIds);
      if (!flag) {
        msg.emit('app:tip', '删除失败，请重试！');
        return;
      }
    }

    msg.emit('app:tip', '删除成功！');
    this.dispatch('purchaseOrder: needScrollTop', true);
    this.init();
    //更新购物车全局数量
    msg.emit('purchaseNum:refresh');
  }

  /**
   * 移入收藏夹
   * @returns {Promise<void>}
   */
  addToFollow = async () => {
    if (WMkit.isLoginOrNotOpen()) {
      //获取所有选中的商品
      const skuIds = this.state()
        .get('checkItemList')
        .filter(
          (sku) =>
            sku.get('checked') 
            // sku.get('delFlag') === 0 &&
            // sku.get('isCheck') === 1
        )
        .map((sku) => sku.get('goodsInfoId'));
      if (skuIds.count() == 0) {
        msg.emit('app:tip', '请选择要移入收藏夹的商品');
        return;
      }

      const { code, message } = await webapi.addToFollow(skuIds.toJS());
      if (code === config.SUCCESS_CODE) {
        msg.emit('app:tip', '商品已移入收藏，请在我的收藏中查看');
        this.dispatch('purchaseOrder: needScrollTop', true);
        this.init();
        //更新购物车全局数量
        msg.emit('purchaseNum:refresh');
      } else {
        msg.emit('app:tip', message);
      }
    } else {
      msg.emit('loginModal:toggleVisible', {
        callBack: this.mergePurchaseAndInit
      });
    }
  };

  /**
   * 判断sku列表中是否包含指定的sku(以goodsInfoId为标准)
   */
  hasSku(skuList, key) {
    let flag = false;
    if (skuList.length != 0) {
      flag = skuList.some((sku) => {
        if (sku.get('goodsInfoId') == key.get('goodsInfoId')) {
          return true;
        }
      });
    }
    return flag;
  }

  /**
   * 去下单
   * @returns {Promise<void>}
   */
  toConfirm = async (isTipClick) => {
    let numSkus = this.state().get('numSkus').toJS();
    if (WMkit.isLoginOrNotOpen()) {
      const { goodsMarketings, skuMarketingDict, selectedMarketingGifts } = this.state().toJS();
      isTipClick && (await this.toPressConfirm());
      const checkItemList = this.state()
        .get('checkItemList')
        .filter((sku) => {
          //缺货状态显示
          return sku.get('goodsStatus') === 0 && sku.get('checked');
        });
      let skuList = new Array();

      checkItemList.forEach((sku) => {
        skuList.push({
          skuId: sku.get('goodsInfoId'),
          num: numSkus[sku.get('goodsInfoId')],
          erpSkuNo: sku.get('erpGoodsInfoNo'),
        });
      });

      let tradeMarketingList = new Array();

      let storeMarketingMap = this.state().get('storeMarketingMap');

      skuList.forEach((sku) => {
        let goodsInfoId = sku.skuId;

        // 商品参与的营销列表
        const goodsMarketingList = goodsMarketings && goodsMarketings.filter((item) => goodsInfoId == item.goodsInfoId);
        if (goodsMarketingList && goodsMarketingList.length > 0) {
          // 商品当前使用的营销
          let marketing = skuMarketingDict.filter((skuDic) => {
            let checked = goodsMarketingList.some(
              (goodsMarketingRele) => goodsMarketingRele.marketingId === skuDic.marketingId,
            );
            return skuDic.goodsInfoIdList.indexOf(goodsInfoId) > -1 && checked;
          })[0];
          // 营销请求参数列表，一个营销一条数据
          let tradeMarketings = tradeMarketingList.filter(
            (tradeMarketing) =>
              tradeMarketing['marketingId'] === marketing.marketingId
          );

          if (tradeMarketings.length > 0) {
            tradeMarketings[0]['skuIds'].push(goodsInfoId);
          } else {
            let marketingLevelId = '';
            let giftSkuIds = new Array();

            // 满赠营销
            if (marketing.marketingType === 2) {
              // 获取领取赠品的等级及领取的赠品
              selectedMarketingGifts.forEach((selectedMarketingGift) => {
                if (selectedMarketingGift.marketingId === marketing.marketingId) {
                  marketingLevelId = selectedMarketingGift.giftLevelId;
                  giftSkuIds.push(selectedMarketingGift.goodsInfoId);
                }
              });
            } else if (marketing.marketingType === 0) {
              // 满减
              storeMarketingMap
                .get(marketing.storeId.toString())
                .forEach((v) => {
                  // 满足满减营销
                  if (
                    v.get('marketingId') === marketing.marketingId &&
                    v.get('lack') === 0
                  ) {
                    marketingLevelId = v.getIn([
                      'fullReductionLevel',
                      'reductionLevelId'
                    ]);
                  }
                });
            } else if (marketing.marketingType === 1) {
              // 满折
              storeMarketingMap
                .get(marketing.storeId.toString())
                .forEach((v) => {
                  // 满足满折营销
                  if (
                    v.get('marketingId') === marketing.marketingId &&
                    v.get('lack') === 0
                  ) {
                    marketingLevelId = v.getIn([
                      'fullDiscountLevel',
                      'discountLevelId'
                    ]);
                  }
                });
            } else if (marketing.marketingType === 3) {
              // N件N元
              storeMarketingMap
                .get(marketing.storeId.toString())
                .forEach((v) => {
                  if (
                    v.get('marketingId') === marketing.marketingId &&
                    v.get('lack') === 0
                  ) {
                    marketingLevelId = v.getIn([
                      'buyoutPriceLevel',
                      'reductionLevelId'
                    ]);
                  }
                });
            } else if (marketing.marketingType === 4) {
              // 第N件N折
              storeMarketingMap
                .get(marketing.storeId.toString())
                .forEach((v) => {
                  if (
                    v.get('marketingId') === marketing.marketingId &&
                    v.get('lack') === 0
                  ) {
                    marketingLevelId = v.getIn([
                      'halfPriceSecondPieceLevel',
                      'id'
                    ]);
                  }
                });
            }

            if (marketingLevelId !== '') {
              let tradeMarketing = {
                marketingId: marketing.marketingId,
                marketingLevelId: marketingLevelId,
                skuIds: [goodsInfoId],
                giftSkuIds: giftSkuIds
              };

              tradeMarketingList.push(tradeMarketing);
            }
          }
        }
      });

      //点底部结算
      if (!isTipClick){
        let checkStockAry = [];
        checkItemList.map(item=>{
          checkStockAry.push({skuId: item.get('goodsInfoId'), byCount: numSkus[item.get('goodsInfoId')]});
        })
        const {code ,context} = await webapi.getGoodsStockByCateId(checkStockAry);
        if (code == config.SUCCESS_CODE && context.goodsInfos.length > 0) {
          this.dispatch('purchase:outStockGoodsList', context.goodsInfos);
          this.dispatch('purchase:isShowOutStock', context.goodsInfos.length > 0);
          this.dispatch('purchase:isConfirmClick', true);  //结算弹窗
          return
        }
      }
      this.changeLoadingVisible(true);

      if (isTipClick || this.state().get('outStockGoodsList').size == 0) {
        await this.confirm(checkItemList, skuList, tradeMarketingList, false);
      }
    } else {
      msg.emit('loginModal:toggleVisible', {
        callBack: this.mergePurchaseAndInit
      });
    }
    this.changeLoadingVisible(false);
  };

  confirm = async (checkItemList, skuList, tradeMarketingList, forceConfirm) => {
    const { code, message } = await webapi.toConfirm(
      skuList,
      tradeMarketingList,
      forceConfirm
    );

    if (code === config.SUCCESS_CODE) {
      window.y = '';
      msg.emit('router: goToNext', { routeName: 'OrderConfirm' });
    } else {
      if (code === 'K-999999') {
        Confirm({
          title: '优惠失效提醒',
          text: message,
          okText: '继续下单',
          cancelText: '重新下单',
          okFn: async () => {
            this.confirm(checkItemList, skuList, tradeMarketingList, true);
          },
          cancelFn: () => {
            // 更新营销、结算信息
            this.changeMarketing();
          }
        });
      } else if (code === 'K-600009') {
        Confirm({
          okText: '确定',
          text: '很抱歉，预约活动已失效，请修改后重新提交！',
          okFn: () => {
            // 更新营销、结算信息
            this.changeMarketing();
          }
        });
      } else if (code === 'K-600017') {
        Confirm({
          okText: '确定',
          text: '很抱歉，您的订单中包含预约中商品，请修改后重新提交！',
          okFn: () => {
            // 更新营销、结算信息
            this.changeMarketing();
          }
        });
      } else if (code ==='K-050137'){
        Confirm({
          okText: '确定',
          text: '很抱歉，您的订单中包含缺货商品，请修改后重新提交！',
          okFn: () => {
            this.dispatch('purchaseOrder: needScrollTop', false);
            // 更新营销、结算信息
            this.init();
          }
        });
      }else {
        Confirm({
          okText: '确定',
          text: message,
          okFn: () => {
            // 更新营销、结算信息
            this.changeMarketing();
          }
        });
      }
    }
  };

  /**
   * 校验sku数量 规则如下, 少于限定 更新限定 大于起订跟库存，显示起订跟库存
   * @param skuNum
   * @param skuId
   * @returns {string}
   */
  validSku = (skuId) => {
    let msgArray = List.of();
    const sku = this.state()
      .get('skus')
      .find((sku) => sku.get('goodsInfoId') === skuId);
    if(!sku) {
      return '';
    }
    //购买数量
    const skuNum = sku.get('buyCount');
    //起售数量
    const min = sku.get('count');
    //最大可购数量
    const max = sku.get('maxCount') || sku.get('maxCount') === 0 ? sku.get('maxCount') : Infinity;
    //库存
    const stock = sku.get('stock');

    //没有库存，商品失效都不做check
    if (
      stock === 0 ||
      sku.get('delFlag') === 1 ||
      sku.get('addedFlag') === 0 ||
      stock < min
    ) {
      return '';
    }

    if (min && skuNum < min) {
      msgArray = msgArray.push(`${min}起订`);
    }
    //当大于可购跟库存 取可购跟库存最小值
    if (((max || max === 0) && skuNum > max) || skuNum >= stock) {
      //可购跟库存最小值
      const maxNum = Math.min(max, stock);
      if (maxNum === max) {
        msgArray = msgArray.push(`可购${maxNum || 0}`);
      } else {
        msgArray = msgArray.push(`库存${stock}`);
      }
    }
    return msgArray.count() > 0 ? msgArray.join('|') : ''
  };

  /**
   * 显示弹框
   * @param state
   */
  showModal = (param) => {
    this.dispatch('purchase:popover:open', param);
    msg.emit('app:bottomVisible', { key: 'PurchaseOrder', visible: false });
  };

  /**
   * 关闭弹框
   * @param state
   */
  closeModal = () => {
    this.dispatch('purchase:popover:close');
    msg.emit('app:bottomVisible', { key: 'PurchaseOrder', visible: true });
  };

  /**
   * 领取赠品
   */
  chooseGift = (selectedMarketingGifts) => {
    this.dispatch('purchase:selectedMarketingGifts', selectedMarketingGifts);
  };

  /**
   * 用户在购物车中选择sku准备参加的营销活动
   * @param goodsInfoId skuId
   * @param marketingId 营销活动id
   */
  chooseSkuMarketing = async (goodsInfoId, marketingId) => {
    if (WMkit.isLoginOrNotOpen()) {
      const { code, message } = await webapi.modifyGoodsMarketing(
        goodsInfoId,
        marketingId
      );
      if (code == config.SUCCESS_CODE) {
        this.dispatch('purchaseOrder: needScrollTop', false);
        // 更新营销、结算信息
        this.init();
      } else {
        msg.emit('app:tip', message);
      }
    } else {
      // 未登录时,在前端存储,用户针对sku选择的营销活动信息
      if (await putSkuMarketingCache(goodsInfoId, marketingId)) {
        this.dispatch('purchaseOrder: needScrollTop', false);
        // 更新营销、结算信息
        this.init();
      } else {
        msg.emit('app:tip', '操作失败');
      }
    }
  };

  /**
   * 领券弹窗的显示隐藏
   * @param state
   */
  changeCoupon = async (storeSpus) => {
    let code = '';
    if (!this.state().get('couponShow')) {
      code = await this.setGoodInfoIds(storeSpus);
    }
    const couponShow = this.state().get('couponShow');
    if (couponShow || code === config.SUCCESS_CODE) {
      this.dispatch('change:changeCoupon');
      msg.emit('app:bottomVisible', {
        key: 'PurchaseOrder',
        visible: couponShow
      });
    }
    //如果是关闭优惠券弹窗
    if (storeSpus == null) {
      this.dispatch('purchaseOrder: needScrollTop', false);
      this.init();
    }
  };

  /**
   * 设置查询优惠券的参数
   * @param storeSpus
   */
  setGoodInfoIds = async (storeSpus) => {
    const skus = this.state().get('skus');
    let goodsInfoIds = skus
      .filter(
        (sku) =>
          sku.get('goodsStatus') !== 2 && storeSpus.includes(sku.get('goodsId'))
      )
      .map((sku) => sku.get('goodsInfoId'));

    this.dispatch('purchase: coupon: goodInfoIds', goodsInfoIds);
    let code = await this.showCouponList();
    return new Promise((resolve) => {
      resolve(code);
    });
  };

  /**
   * 查询购物车中各店铺所选商品可领取的优惠券
   * @param storeId
   * @returns {Promise<void>}
   */
  showCouponList = async () => {
    let goodsInfoIds = this.state().get('goodsInfoIds');

    const { context, code, message } = await webapi.fetchCouponForGoodsList(
      goodsInfoIds
    );
    if (code == config.SUCCESS_CODE) {
      this.dispatch('purchase: coupon: list', context);
    } else {
      msg.emit('app:tip', message);
    }
    return new Promise((resolve) => {
      resolve(code);
    });
  };

  /**
   * 领取优惠券
   * @param couponId
   * @param activityId
   * @returns {Promise<void>}
   */
  receiveCoupon = async (couponId, activityId) => {
    if (WMkit.isLoginOrNotOpen()) {
      const { code, message } = await webApi.receiveCoupon(
        couponId,
        activityId
      );
      if (code === config.SUCCESS_CODE) {
        this.showCouponList();
      } else {
        msg.emit('app:tip', message);
      }
    } else {
      this.dispatch('change:changeCoupon');
      msg.emit('app:bottomVisible', { key: 'PurchaseOrder', visible: true });
      msg.emit('loginModal:toggleVisible', {
        callBack: this.mergePurchaseAndInit
      });
    }
  };

  /**
   * 存储SessionStorage
   * @param comeFrom 来自哪里
   */
  saveSessionStorage = (comeFrom) => {
    const { defaultAddr } = this.state().toJS();
    AsyncStorage.setItem(
      cache.PURCHASE_ADDRESS,
      JSON.stringify({
        defaultAddr,
        comeFrom
      })
    );
  };

  //批发销售类型下的规格弹框
  changeWholesaleVisible = (value) => {
    this.dispatch('spu:changeWholesaleVisible', value);
  };

  //零售销售弹框显示隐藏
  changeRetailSaleVisible = (value) => {
    this.dispatch('spu:changeRetailSaleVisible', value);
  };

  findGoodsDetails = async (skuId, pointsGoodsId) => {
    let spuRes = await webApi.init(skuId, pointsGoodsId);
    if (spuRes.code === config.SUCCESS_CODE) {
      spuRes.context.skuId = skuId;
      spuRes.context.pointsGoodsId = pointsGoodsId;
      this.transaction(() => {
        this.dispatch('spu:goods-detail', spuRes.context);
        this.dispatch('spu:changeRetailSaleVisible', true);
      });
    }
  };

  //零售类型弹框操作重新渲染页面
  changeSpecVisibleAndRender = (goodsInfo, pointsGoods) => {
    if (!goodsInfo.isEmpty()) {
      this.dispatch('spu:closeAndRenderRetail', {
        goodsInfo,
        pointsGoods
      });
    }
  };

  /**
   * 增值服务信息
   */
  _initVAS = async () => {
    // 企业购业务-开关|配置信息
    this.dispatch('goods-list:iep-info', fromJS(await VAS.fetchIepInfo()));
    this.dispatch('goods-list:setIepSwitch', await VAS.checkIepAuth());
  };

  //切换规格
  onSkuChange = async (sku, goodsInfoId) => {
    this.findGoodsDetails(sku.get('goodsInfoId'));
    //存储选中的规格id
    this.dispatch('spu:goodsInfoId', goodsInfoId);
  };

  //改变加载中状态
  changeLoadingVisible = (status) => {
    this.dispatch('set: loadingVisible', status);
  };

  /**
   * 初始化地址
   */
  selectWareAddress = async () => {
    if (window.token) {
      const addressList = await getBeforeAddress();
      if (addressList.length != 0) {
        addressList.map(n => {
          const { provinceId, cityId, areaId, deliveryAddress } = n;
          n.addressInfo = FindArea.addressInfo(provinceId, cityId, areaId) + deliveryAddress;
          return n;
        });
        this.dispatch('set:state', { field: 'cityInfo', value: addressList[0].addressInfo });
        await setChooseCity(addressList[0].cityId);
      } else {
        this.dispatch('set:state', { field: 'cityInfo', value: '' });
        this.dispatch('set:state', { field: 'addressModalVisible', value: true });
      }
    } else {
      await this.getGeolocation();
    }
  };

  openSettings() {
    this.setGeolocationVisible();
    return Platform.OS === 'ios'
      ? Permissions.openSettings()
      : OpenSettings.openSettings();
  }

  /**
   * 关闭弹框
   */
  setGeolocationVisible=()=>{
    this.dispatch('set:state',{field:'geolocationVisible',value: false});
  };

  /**
   * 获取当前位置
   * @returns {Promise<void>}
   */
  getGeolocation = async () => {
    // 对于 Android 需要自行根据需要申请权限
    if (Platform.OS === 'android') {
      const grants = await PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION , PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION]);
      const granted = grants[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION];
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        this.dispatch('set:state',{field:'geolocationVisible',value: true});
        return;
      } else{
        this.dispatch('set:state',{field:'geolocationVisible',value: false});
      }

      const gpsGrant = grants[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION];
      if(gpsGrant !== PermissionsAndroid.RESULTS.GRANTED){
        this.dispatch('set:state',{field:'geolocationVisible',value: true});
        return;
      } else{
        this.dispatch('set:state',{field:'geolocationVisible',value: false});
      }
    }

    Geolocation.getCurrentPosition().then((data) => {
      const cityId = FindArea.findCityCode(data.city);
      this.dispatch('set:state', { field: 'cityInfo', value: data.province + data.city });
      setChooseCity(cityId);
    });
  };

  /**
   * 关闭弹框
   */
  setModalVisible=()=>{
    this.dispatch('set:state',{field:'addressModalVisible',value: false});
  };
  setTipVisible = () => {
    this.dispatch('purchase:isShowOutStock', false);
  };

  toPressConfirm = async() => {
    const outStockGoodsList = this.state().get('outStockGoodsList');
    let param = [];
    outStockGoodsList.map((item) => {
      param.push({goodsInfoId: item.get('goodsInfoId'), stock: item.get('stock')});
    });
    await webapi.batchEdit(param);
    await this.init();
    this.setTipVisible();
    this.dispatch('purchase:outStockGoodsList', []);
  };

  /**
   * 更新营销信息
   */
  changeMarketing = async () => {
    const { goodsMarketings, skuMarketingDict , checkItemList, intervalPrices, numSkus} = this.state().toJS();
    const checkedSkuList = checkItemList && checkItemList.length > 0 ? checkItemList.filter(sku => sku.checked) : [];
    const checkSkuIds = checkedSkuList && checkedSkuList.length > 0 ? checkedSkuList.map(sku => sku.goodsInfoId) : [];
    let goodsMarketingList = [];
    let marketingMap = fromJS({});
    goodsMarketings && goodsMarketings.map((goodsMarketingRele) => {
      goodsMarketingList.push({
        goodsInfoId: goodsMarketingRele.goodsInfoId,
        marketingId: goodsMarketingRele.marketingId,
      });
      let marketingList = [];
      skuMarketingDict && skuMarketingDict.map((dicItem) => {
        if (
          dicItem.marketingId == goodsMarketingRele.marketingId &&
          dicItem.goodsInfoIdList.indexOf(goodsMarketingRele.goodsInfoId) > -1
        ) {
          marketingList.push({
            marketingType: dicItem.marketingType,
          });
        }
      });
      marketingMap = marketingMap.set(goodsMarketingRele.goodsInfoId, fromJS(marketingList));
    });
    let goodsInfoList = [];
    checkItemList.map((info) => {
      goodsInfoList.push({
        goodsInfoId: info.goodsInfoId,
        marketPrice: info.marketPrice,
        priceType: info.priceType,
        buyCount: numSkus[info.goodsInfoId],
        salePrice: info.salePrice,
        vipPrice: info.vipPrice,
        distributionCommission: info.distributionCommission,
      });
    });
    const params = {
      goodsMarketingDTOList: goodsMarketingList,
      goodsMarketingMap: marketingMap.toJS(),
      goodsIntervalPrices: intervalPrices,
      goodsInfos: goodsInfoList,
      goodsInfoIdList: checkSkuIds,
      wareId: 1,
    };
    const {code, context, message} = await webapi.getStoreMarketings(params);
    if(code == config.SUCCESS_CODE) {
      const purInfo = context;
      this.dispatch('purchaseOrder: giftList', purInfo.giftList);
      const selectedMarketingGifts = this.getDefaultGift(purInfo.giftList);
      this.dispatch('purchase:selectedMarketingGifts', selectedMarketingGifts);
      let storeMarketingMap =
        (purInfo.storeMarketingMap && fromJS(purInfo.storeMarketingMap)) ||
        fromJS({});
      this.dispatch('purchase:storeMarketingMap', storeMarketingMap);
      this.dispatch(
        'purchase:distributeCommission',
        purInfo.distributeCommission
      );
      this.dispatch('purchaseOrder: setBottomPrice', {
        totalPrice: purInfo.totalPrice,
        tradePrice: purInfo.tradePrice,
        discountPrice: purInfo.discountPrice,
        totalBuyPoint: purInfo.totalBuyPoint,
      });
    } else {
      msg.emit('app:tip', message);
    }
  };

  // 组装营销信息
  getSkuMarketingDict = (storeMarketingMap) => {
    let skuDicList = [];
    storeMarketingMap &&
      storeMarketingMap.forEach((activityList) => {
        activityList = activityList.toJS();
        activityList.map((activityItem) => {
          let title = '';
          // 满赠
          if (activityItem.marketingType === 2) {
            activityItem.fullGiftLevelList.map((level, index) => {
              if (index === 0) {
                title += '满';
              } else {
                title += '，';
              }

              // 满金额
              if (activityItem.subType === 4) {
                title += level.fullAmount + '元';
              } else if (activityItem.subType === 5) {
                // 满数量
                title += level.fullCount + '件';
              } else if (activityItem.subType === 6) {
                //  满订单
                title += level.fullCount + '件';
              }
            });

            title += '获赠品，赠完为止';
          } else if (activityItem.marketingType === 0) {
            activityItem.fullReductionLevelList.map((level, index) => {
              if (index === 0) {
                title += '满';
              } else {
                title += '，';
              }

              // 满金额
              if (activityItem.subType === 0) {
                title += level.fullAmount + '元';
              } else if (activityItem.subType === 1) {
                // 满数量
                title += level.fullCount + '件';
              }

              title += '减' + level.reduction + '元';
            });
          } else if (activityItem.marketingType === 1) {
            activityItem.fullDiscountLevelList.map((level, index) => {
              if (index === 0) {
                title += '满';
              } else {
                title += '，';
              }

              // 满金额
              if (activityItem.subType === 2) {
                title += level.fullAmount + '元';
              } else if (activityItem.subType === 3) {
                // 满数量
                title += level.fullCount + '件';
              }

              title += '享' + _.mul(level.discount, 10) + '折';
            });
          }
          skuDicList.push({
            marketingId: activityItem.marketingId,
            marketingType: activityItem.marketingType,
            alllevelDesc: title,
            goodsInfoIdList: activityItem.goodsInfoIds,
            storeId: activityItem.storeId,
          });
        });
      });
    return skuDicList;
  }
  // 默认赠品
  getDefaultGift = (giftList) => {
    const { selectedMarketingGifts } = this.state().toJS();
    // 默认选中赠品
    let marketingGoodsList = [];
    giftList &&
      giftList.length > 0 &&
      giftList.map((activityItem) => {
        // 满赠活动
        if (activityItem.marketingType == 2 && activityItem.lack <= 0) {
          let marketGiftList = [];
          // 遍历店铺活动等级
          activityItem.fullGiftLevelList.map((level) => {
            const disabled =
              activityItem.subType === 4
                ? level.fullAmount > activityItem.totalAmount
                : level.fullCount > activityItem.totalCount;
            if (disabled) {
              return;
            }
            if (level.giftLevelId != activityItem.fullGiftLevel.giftLevelId) {
              return;
            }
            // giftType: 0 赠全部 1 赠1件
            if (level.giftType == 1 && marketGiftList.length > 0) {
              return;
            }
            // 遍历活动的赠品
            level.fullGiftDetailList.map((gift, i) => {
              const giftInfo = gift.giftGoodsInfoVO;
              // 排除缺货、失效赠品
              if (!giftInfo || giftInfo.goodsStatus > 0) {
                return;
              }
              // giftType: 0 赠全部 1 赠1件
              if (level.giftType == 1) {
                if (marketGiftList.length > 0) {
                  return;
                }
                let alGiftList = selectedMarketingGifts && selectedMarketingGifts.filter(item => item.marketingId == gift.marketingId && item.giftLevelId == gift.giftLevelId);
                // 已选列表中存在同级的赠品
                if (alGiftList && alGiftList.length > 0) {
                  alGiftList.map(item => {
                    item.goodsNum = gift.productNum;
                  });
                  marketGiftList = marketGiftList.concat(alGiftList);
                  marketingGoodsList = marketingGoodsList.concat(alGiftList);
                  return;
                }
              }
              giftInfo.goodsNum = gift.productNum;
              giftInfo.storeId = activityItem.storeId;
              giftInfo.giftLevelId = gift.giftLevelId;
              giftInfo.marketingId = gift.marketingId;
              giftInfo.giftDetailId = gift.giftDetailId;
              marketGiftList.push(giftInfo);
              marketingGoodsList.push(giftInfo);
            });
          });
        }
      });
    return marketingGoodsList;
  };
  marketingInit = (goodsInfoId) => {
    const { goodsMarketings, skuMarketingDict } = this.state().toJS();
    // 商品正在参与的营销列表
    const goodsActMarketings = goodsMarketings && goodsMarketings.filter((item) => goodsInfoId == item.goodsInfoId);
    // 商品参与的所有营销列表
    let goodsAllMarketings = skuMarketingDict && skuMarketingDict.filter((dicItem) => dicItem.goodsInfoIdList.indexOf(goodsInfoId) > -1);
    let selectedMarketing = null;
    skuMarketingDict && skuMarketingDict.map((skuDic) => {
      let checked = goodsActMarketings && goodsActMarketings.some(
        (goodsMarketingRele) => goodsMarketingRele.marketingId === skuDic.marketingId,
      );
      if (checked) {
        selectedMarketing = skuDic;
      }
    });
    return {
      selectedMarketing,
      hasMarketing: goodsAllMarketings && goodsAllMarketings.length > 0,
      hasManyMarketing: goodsAllMarketings && goodsAllMarketings.length > 1,
    };
  };
}
