import { Store, msg } from 'plume2';
import { fromJS } from 'immutable';
import { myPvUvStatis } from 'wmkit/wm_sta';
import { config } from 'wmkit/config';
import { Alert } from 'wmkit/modal/alert';
import { cache } from 'wmkit/cache';
import * as WMkit from 'wmkit/kit';
import { Confirm } from 'wmkit/modal/confirm';

import * as webApi from './webapi';
import DescActor from './actor/desc-actor';
import GoodsActor from './actor/goods-actor';
import CouponActor from './actor/coupon-actor';
import AsyncStorage from '@react-native-community/async-storage';

export default class AppStore extends Store {
  bindActor() {
    return [new DescActor(), new GoodsActor(), new CouponActor()];
  }

  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  //;;;;;;;;;;;;;action;;;;;;;;;;;;;;;;;;;;;;;
  init = async (goodsId, skuId) => {
    //检查这个店铺是否是有效状态
    const status = await webApi.fetchShopStatus();
    if (!status.context) {
      Confirm({
        text: '该店铺已失效，不可在店铺内购买商品',
        okText: '确定',
        okFn: () =>
          msg.emit('router: goToNext', {
            routeName: 'UserCenter'
          })
      });
      return;
    }
    const loginData = await AsyncStorage.getItem(cache.LOGIN_DATA);
    const customerId = JSON.parse(loginData).customerId;
    let spuRes = await webApi.init(customerId, goodsId, skuId);

    if (spuRes.code === config.SUCCESS_CODE) {
      spuRes.context.skuId = skuId;
      /**商品详情pv/uv埋点*/
      myPvUvStatis('GoodsDetail', skuId, spuRes.context.goods.companyInfoId);
      //无内容的storeGoodsTabs需要过滤出来
      let storeGoodsTabs = [];
      spuRes.context.storeGoodsTabs.map((v) => {
        if (
          spuRes.context.goodsTabRelas.length > 0 &&
          spuRes.context.goodsTabRelas.find((item) => item.tabId == v.tabId) &&
          spuRes.context.goodsTabRelas.find((item) => item.tabId == v.tabId)
            .tabDetail
        ) {
          storeGoodsTabs.push(v);
        }
      });
      //批发类型按照以往逻辑取第一个显示状态，零售类型则是按照列表页点选进来的sku进行展示
      let saleType = spuRes.context.goods.saleType;
      if (WMkit.isLoginOrNotOpen()) {
        const followRes = await webApi.fetchFollow(
          saleType == 0 ? spuRes.context.goodsInfos[0].goodsInfoId : skuId
        );
        if (followRes.code == config.SUCCESS_CODE) {
          this.dispatch(
            'goods-detail: follow',
            followRes.context.goodsInfos.totalElements > 0
          );
        }
      }
      // 购物车数量
      this.updatePurchaseCount();
      let couponLabels = [];
      //优惠券信息,批发模式，所有sku的优惠券去重
      if (saleType == 0) {
        spuRes.context.goodsInfos.map((goodsInfo) => {
          goodsInfo.couponLabels.map((coupon) => {
            if (
              couponLabels.find(
                (item) => item.couponInfoId == coupon.couponInfoId
              )
            ) {
              return;
            } else {
              couponLabels.push(coupon);
            }
          });
        });
      } else {
        couponLabels = spuRes.context.goodsInfos.find(
          (goodsInfo) => goodsInfo.goodsInfoId == skuId
        ).couponLabels;
      }
      this.transaction(() => {
        this.dispatch('goods-detail: info', spuRes.context);
        this.dispatch('desc:data', spuRes.context.goods.goodsDetail);
        this.dispatch('detail: coupon: filed: value', {
          field: 'couponLabels',
          value: couponLabels
        });
        //图文详情tab
        this.dispatch('goods-detail:storeGoodsTabs', storeGoodsTabs);
        //tab关联内容
        if (spuRes.context.goodsTabRelas) {
          this.dispatch(
            'goods-detail:storeGoodsTabContent',
            spuRes.context.goodsTabRelas
          );
        }
        this._initProps(spuRes.context.goods.cateId);
        this._initBrand(spuRes.context.goods.brandId);
        this.dispatch('goods-detail: loading');
      });
      //查询店铺信息
      const storeRes = await webApi.findStore(
        spuRes.context.goodsInfos[0].storeId
      );
      if (storeRes.code == config.SUCCESS_CODE) {
        this.dispatch('goodsDetail:initStore', storeRes.context);
      }
      if (storeRes.code != 'K-000000') {
        msg.emit('store-close:visible', true);
      }
      this._checkOnlineService(storeRes.context.storeId);
      this.fetchBaseConfig();
      //获取小程序二维码信息
      this.getSkuQrCode(skuId);
    } else {
      msg.emit('router: replace', {
        routeName: 'GoodsEmpty'
      });
    }
  };

  /**
   * 更新商品详情中的购物车数量
   */
  updatePurchaseCount = () => {
    if (WMkit.isLoginOrNotOpen()) {
      webApi.fetchPurchaseCount().then((res) => {
        if (res.code === config.SUCCESS_CODE) {
          const purchaseNum = res.context || 0;
          this.dispatch('goods-detail: purchase: count', purchaseNum);
        }
      });
    } else {
      AsyncStorage.getItem(cache.PURCHASE_CACHE).then((res) => {
        const purCache = JSON.parse(res) || [];
        this.dispatch('goods-detail: purchase: count', purCache.length);
      });
    }
  };

  /**
   * 初始化属性信息
   */
  _initProps = async (cateId) => {
    if (cateId) {
      const goodsPropsRes = await webApi.fetchPropList(cateId);
      if (goodsPropsRes.code == config.SUCCESS_CODE) {
        this.dispatch('goods-detail:props', fromJS(goodsPropsRes.context));
      }
    }
  };

  /**
   * 初始化品牌信息
   */
  _initBrand = async (brandId) => {
    if (brandId) {
      const { code, context } = await webApi.fetchBrand(brandId);
      if (code == config.SUCCESS_CODE) {
        this.dispatch('goods-detail:brand', fromJS(context));
      }
    }
  };

  /**
   * 移除/加入 收藏
   * @param status
   * @param id
   */
  changeFollow = async (status, id) => {
    let res = {};
    if (status) {
      res = await webApi.intoFollow(id);
    } else {
      res = await webApi.outFollow(id);
    }
    if (res.code == 'K-000000') {
      this.dispatch('goods-detail: follow', status);
    } else {
      msg.emit('app:tip', res.message);
    }
  };

  /**
   * 改变商品数量
   * @param num
   */
  changeNum = (num) => {
    this.dispatch('goods-detail: change: num', num);
  };

  /**
   * 加入购物车
   * @param id
   * @param num
   * @param stock
   */
  purchase = async (id, num, stock) => {
    if (num > stock) {
      msg.emit('app:tip', '库存' + stock);
      return;
    } else {
      const { code, message } = await webApi.purchase(id, num);
      if (code == 'K-000000') {
        msg.emit('app:tip', '加入成功');
        const purchaseCount = await webApi.fetchPurchaseCount();
        let count = 0;
        if (purchaseCount.code == 'K-000000') {
          count = purchaseCount.context;
        }
        this.dispatch('goods-detail: purchase: count', count);
      } else {
        msg.emit('app:tip', message);
      }
    }
  };

  /**
   * 弹框的显示或隐藏
   * @param state
   */
  showModal = () => {
    this.dispatch('goods-detail:modal');
  };

  /**
   * 关闭弹框
   * @param state
   */
  closeModal = () => {
    this.dispatch('goods-detail:modal:close');
  };

  /**
   * 查看赠品详情
   */
  marketingDetail = async (id) => {
    this.showModal();
    if (!id) return;
    const { code, message, context } = await webApi.fetchMarketingDetail(id);
    if (code == 'K-000000') {
      this.dispatch('goods-detail:marketing', context);
    } else {
      Alert({
        text: message
      });
    }
  };

  /*
    分享弹层显示隐藏
  */
  changeShareModal = () => {
    this.dispatch('goods-detail:changeShareModal');
  };

  /**
   * 分享赚分享
   */
  toggleShareModal = () => {
    this.dispatch('goods-detail:toggleShareVisible');
  };

  /**
   * 图文分享弹窗显示隐藏
   */
  changeImgShareModal = () => {
    this.dispatch('goods-detail:changeImgShareModal');
  };

  /**
   * 检查客服是否开启
   */
  _checkOnlineService = async (storeId) => {
    const { code, context, message } = await webApi.onLineServiceList(storeId);

    if (code === config.SUCCESS_CODE) {
      this.dispatch('goods-detail:setServiceFlag', context);
    } else {
      msg.emit('app:tip', message);
    }
  };

  /**
   * 获取h5地址，用于分享
   */
  fetchBaseConfig = async () => {
    const { code, context, message } = await webApi.fetchBaseConfig();
    if (code === config.SUCCESS_CODE) {
      this.dispatch('goods-detail:getH5Url', context.mobileWebsite);
      this.dispatch(
        'goods-detail:getLogo',
        context.pcLogo ? JSON.parse(context.pcLogo)[0] : { url: '' }
      );
    } else {
      msg.emit('app:tip', message);
    }
  };
  /**
   * 领券弹窗的显示隐藏
   * @param state
   */
  changeCoupon = async () => {
    let code = '';
    const couponShow = this.state().get('couponShow');
    if (!couponShow) {
      code = await this.fetchCouponInfos();
    }
    if (couponShow || code === config.SUCCESS_CODE) {
      this.dispatch('change:changeCoupon');
    }
  };

  /**
   * 查询优惠券信息
   */
  fetchCouponInfos = async () => {
    const saleType = this.state().getIn(['goods', 'saleType']);
    let res;
    if (saleType === 0) {
      const skuIds = this.state()
        .get('goodsInfos')
        .map((info) => info.get('goodsInfoId'))
        .toJS();
      res = await webApi.fetchCouponInfosBySkuList(skuIds);
    } else {
      const goodsInfoId = this.state().getIn(['goodsInfo', 'goodsInfoId']);
      res = await webApi.fetchCouponInfos(goodsInfoId);
    }
    const { code, context, message } = res;
    if (code === config.SUCCESS_CODE) {
      this.dispatch('detail: coupon: filed: value', {
        field: 'couponInfos',
        value: context.couponViews
      });
    } else {
      msg.emit('app:tip', message);
    }
    return new Promise((resolve) => {
      resolve(code);
    });
  };

  /**
   * 领取优惠券
   */
  receiveCoupon = async (couponId, activityId) => {
    const { code, message } = await webApi.receiveCoupon(couponId, activityId);
    if (code !== config.SUCCESS_CODE) {
      msg.emit('app:tip', message);
    }
    this.fetchCouponInfos();
  };

  startPlay = () => {
    this.dispatch('goods-detail:startPlay');
  };

  //关闭视频
  closeVideo = () => {
    this.dispatch('goods-detail:closeVideo');
  };

  //视频暂停
  pauseVideo = () => {
    this.dispatch('goods-detail:pauseVideo');
  };

  //视频播放
  playVideo = () => {
    this.dispatch('goods-detail:playVideo');
  };

  //图文详情tab切换
  changeTabKey = (index) => {
    this.dispatch('goods-detail:changeTabKey', index);
  };

  //批发销售类型下的规格弹框
  changeWholesaleVisible = (value) => {
    this.dispatch('goods-detail:changeWholesaleVisible', value);
  };

  //零售销售弹框显示隐藏
  changeRetailSaleVisible = (value) => {
    this.dispatch('goods-detail:changeRetailSaleVisible', value);
  };

  //零售类型弹框操作重新渲染页面
  changeSpecVisibleAndRender = (goodsInfo) => {
    if (!goodsInfo.isEmpty()) {
      this.dispatch('goods-detail:closeAndRenderRetail', goodsInfo);
      this.dispatch('goods-detail:pauseVideo');
      this.dispatch('goods-detail:closeVideo');
      //优惠券根据实际的sku重置
      this.dispatch('detail: coupon: filed: value', {
        field: 'couponLabels',
        value: goodsInfo.get('couponLabels').toJS()
      });
    }
  };

  //关闭优惠券弹框
  closeCouponModal = () => {
    this.dispatch('change:changeCoupon');
  };

  //获取小程序二维码地址
  getSkuQrCode = async (skuId) => {
    const loginData = await AsyncStorage.getItem(cache.LOGIN_DATA);
    const shareUserId = loginData ? loginData.customerId : null;
    const res = await webApi.getSkuQrCode(skuId, shareUserId);
    if (res.code == config.SUCCESS_CODE) {
      this.dispatch('goods-detail:skuQrCode', res.context);
    }
  };
}
