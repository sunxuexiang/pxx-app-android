import { msg, Store } from 'plume2';
import AsyncStorage from '@react-native-community/async-storage';
import { fromJS } from 'immutable';
import * as VAS from 'wmkit/vas';
import { myPvUvStatis } from 'wmkit/wm_sta';
import { config } from 'wmkit/config';
import * as WMkit from 'wmkit/kit';
import { cache } from 'wmkit/cache';
import * as _ from 'wmkit/common/util';

import StoreMainActor from './actor/store-main-actor';
import GoodsActor from './actor/goods-actor';
import * as webApi from './webapi';
import * as evaluateWebapi from 'wmkit/biz/evaluateIs-show-webapi';

export default class AppStore extends Store {
  bindActor() {
    return [new StoreMainActor(), new GoodsActor()];
  }

  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  payAttention = () => {
    this.dispatch('store:liked');
  };

  /**
   * 初始化
   */
  init = async (id) => {
    let params;
    //暂无二级气泡弹框
    // this.getMenuList();
    if (WMkit.isLoginOrNotOpen()) {
      params = {
        id: id,
        esGoodsInfoDTOList: null,
        sortFlag: 1
      };
    } else {
      let esGoodsInfoDTOList = await AsyncStorage.getItem(cache.PURCHASE_CACHE);
      esGoodsInfoDTOList = JSON.parse(esGoodsInfoDTOList) || [];
      params = {
        id: id,
        esGoodsInfoDTOList: esGoodsInfoDTOList,
        sortFlag: 1
      };
    }
    // 查询平台评价开关配置
    this.basicRules();
    //查询增值服务信息
    this._initVAS();

    const skuRes = await webApi.fetchSkusForMain(params);
    const storeRes = await webApi.fetchStoreInfo(id);
    const evluateRes = await evaluateWebapi.isShow();
    const {
      data: { configOrder }
    } = await webApi.hasMagicIndex(id);
    let viewData = Array.isArray(configOrder)
      ? configOrder
      : configOrder.children;
    viewData = viewData ? viewData : [];
    this.dispatch('set:show:magic:box', viewData.length != 0);

    this.transaction(() => {
      if (skuRes.code == config.SUCCESS_CODE) {
        this.dispatch(
          'goods: init',
          fromJS(skuRes.context.esGoodsInfoPage.content)
        );
        this.dispatch(
          'goods: setAppointmentSaleVOList',
          skuRes.context.appointmentSaleVOList
        );
        this.dispatch(
          'goods: setBookingSaleVOList',
          skuRes.context.bookingSaleVOList
        );
      }
      if (storeRes.code == config.SUCCESS_CODE) {
        if (storeRes.context.storeResponseState !== 0) {
          /**
           * 店铺响应状态
           * * OPENING: 0、正常
           * * CLOSED: 1、关店
           * * EXPIRE: 2、过期
           * * NONEXISTENT: 3、不存在
           */
          msg.emit('store-close:visible', true);
        }
        /**店铺pv/uv埋点*/
        myPvUvStatis('StoreMain', null, storeRes.context.companyInfoId);
        this.dispatch('store: info: init', fromJS(storeRes.context));
      } else {
      }
      this.dispatch('goodsActor:isShow', evluateRes);
      this.dispatch('store: loading', false);
      this._checkOnlineService(id);
    });
    //查询进店优惠券信息
    if (WMkit.isLogin()) {
      let customerId = await WMkit.getUserId();
      const couponRes = await webApi.fetchStoreCoupon(id, customerId);
      if (couponRes.code == 'K-000000') {
        _.showRegisterModel(couponRes.context);
      }
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

  /**
   * 查询平台评价开关配置
   * @returns {Promise<void>}
   */
  basicRules = async () => {
    // 评价开关是否打开
    const eFlag = await webApi.commentConfig();
    if (eFlag.code == config.SUCCESS_CODE) {
      this.dispatch('store:isShow', eFlag.context.evaluate);
    }
  };

  /**
   * 关注
   */
  follow = async (id) => {
    const res = await webApi.follow(id);
    if (res.code == config.SUCCESS_CODE) {
      this.init(id);
    } else {
      msg.emit('app:tip', res.message);
    }
  };

  /**
   * 取消关注
   */
  unfollow = async (id) => {
    const res = await webApi.unfollow(id);
    if (res.code == config.SUCCESS_CODE) {
      this.init(id);
    } else {
      msg.emit('app:tip', res.message);
    }
  };

  /**
   * 刷新状态控制
   */
  refresh = () => {
    this.dispatch('store: refresh');
  };

  /**
   * 刷新skus
   */
  refreshSku = async (id) => {
    let params;
    if (WMkit.isLoginOrNotOpen()) {
      params = {
        id: id,
        esGoodsInfoDTOList: null
      };
    } else {
      let esGoodsInfoDTOList = await AsyncStorage.getItem(cache.PURCHASE_CACHE);
      esGoodsInfoDTOList = JSON.parse(esGoodsInfoDTOList) || [];
      params = {
        id: id,
        esGoodsInfoDTOList: esGoodsInfoDTOList
      };
    }
    const skuRes = await webApi.fetchSkusForMain(params);
    if (skuRes.code == config.SUCCESS_CODE) {
      this.dispatch(
        'goods: init',
        fromJS(skuRes.context.esGoodsInfoPage.content)
      );
    }
  };

  /**
   * 检查客服是否开启
   */
  _checkOnlineService = async (storeId) => {
    const { code, context, message } = await webApi.onLineServiceList(storeId);

    if (code === config.SUCCESS_CODE) {
      this.dispatch('serviceFlag:setFlag', context);
    } else {
      msg.emit('app:tip', message);
    }
  };

  changeShowShare = () => {
    this.dispatch('goods-list:changeShowShare');
  };

  saveCheckedSku = (sku) => {
    this.dispatch('goods-list:saveCheckedSku', fromJS(sku));
  };

  changeAddSelfShop = (value) => {
    this.dispatch('goods-list:changeAddSelfShop', value);
  };

  /**
   * 分享赚分享
   */
  toggleShareModal = () => {
    this.dispatch('goods-list:toggleShareVisible');
  };
  /*
    二级导航
  */
  getMenuList = async () => {
    const result = await webApi.getByMain(0);
    // console.log(result, 'getMenuList result');
    this.dispatch(
      'goods-list:nav',
      result.context ? result.context.hoverNavMobileVO.navItems : []
    );
  };
  handClick = (isMenuBoxFlag) => {
    this.dispatch('goods-list:changeFlag', isMenuBoxFlag);
  };
}
