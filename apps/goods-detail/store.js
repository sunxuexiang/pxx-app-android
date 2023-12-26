import { Store, msg } from 'plume2';
import { fromJS } from 'immutable';
import { config } from 'wmkit/config';
import { Alert } from 'wmkit/modal/alert';
import { cache } from 'wmkit/cache';
import * as WMkit from 'wmkit/kit';
import { myPvUvStatis } from 'wmkit/wm_sta';
import * as FindArea from 'wmkit/area/area'
import * as VAS from 'wmkit/vas';
import { VASConst } from '../../wmkit/VAS-Const';
import * as webApi from './webapi';
import DescActor from './actor/desc-actor';
import GoodsActor from './actor/goods-actor';
import CouponActor from './actor/coupon-actor';
import { PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as evaluateWebapi from 'wmkit/biz/evaluateIs-show-webapi';
import EvaluateActor from './actor/evaluate-actor';
import IEPsettingActor from './actor/iepsetting-actor';
import moment from 'moment';
import { getBeforeAddress, setChooseCity } from '../../wmkit/ware-house/matchWare';
import OpenSettings from '@wanmi/react-native-open-settings';
import { Geolocation } from 'react-native-baidu-map';
import { openSettings } from 'react-native-permissions';

export default class AppStore extends Store {
  bindActor() {
    return [
      new DescActor(),
      new GoodsActor(),
      new CouponActor(),
      new EvaluateActor(),
      new IEPsettingActor()
    ];
  }

  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  //;;;;;;;;;;;;;action;;;;;;;;;;;;;;;;;;;;;;;
  init = async (skuId, pointsGoodsId) => {
    this.dispatch('goodSkeleton:show', true);
    try {
      const getReduced = await webApi.getReduced();
      AsyncStorage.setItem('getReduced',JSON.stringify(getReduced.context))
      await this.selectWareAddress();
      let spuRes = await webApi.init(skuId, pointsGoodsId);
      //暂无二级气泡弹框
      // this.getMenuList();
      if (spuRes.code === config.SUCCESS_CODE) {
        skuId = this.checkGoodsInfo(skuId, spuRes.context.goodsInfos);
        // 增值服务信息
        this._initVAS();
        const isDistributor = WMkit.isDistributor();
        this.dispatch('goods-detail:setIsDistributor', isDistributor);
        await this._initFlashSaleGoods(spuRes.context.goods.goodsId);
        spuRes.context.skuId = skuId;
        //赋予积分商品id
        spuRes.context.pointsGoodsId = pointsGoodsId;
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
            goodsInfo.couponLabels &&
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
          let goodsinfo = spuRes.context.goodsInfos.find((goodsInfo) => {
            return goodsInfo.goodsInfoId == skuId;
          });
          if (goodsinfo) {
            couponLabels = goodsinfo.couponLabels;
          }
        }
        const evluateRes = await evaluateWebapi.isShow();

        this.transaction(() => {
          this.dispatch('goods-detail: info', spuRes.context);
          this.dispatch('desc:data', spuRes.context.goods.goodsDetail);
          this.dispatch('evaluateActor:isShow', evluateRes);
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
          this._initEvaluate(spuRes.context.goods.goodsId);

          this.dispatch('goodSkeleton:show', false);
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

        // await this.queryPreBuyTime(skuId);
        //判断商品是否预售中
        // await this.queryPresaleisInProgress(skuId);
        // await this.fetchRule();

        //  查询组合商品
        // this.searchSuitGoods(skuId);
      } else {
        msg.emit('router: replace', {
          routeName: 'GoodsEmpty',
          pointsGoodsId: pointsGoodsId
        });
      }

      this.checkIEP();
    } catch(e) {
      this.dispatch('goodSkeleton:show', false);
    }
  };

  /**
   * 校验商品是否失效，如果失效，取第一个有效的商品
   */
  checkGoodsInfo = (skuId, goodsInfos) => {
    let newId = skuId;
    let goodsInfo = fromJS(goodsInfos).find((item) => {
      return item.get('goodsInfoId') == skuId;
    });
    //如果根据这个sku没找到对应商品，取第一个非失效SKU
    if (!goodsInfo) {
      goodsInfo = fromJS(goodsInfos).find((item) => {
        return item.get('addedFlag') === 1;
      });
      //如果存在有效的商品，才取
      if(goodsInfo){
        newId = goodsInfo.get('goodsInfoId');
      }
    }
    return newId;
  }

  /**
   * 判断商品是否预售中
   */
  async queryPresaleisInProgress(id) {
    let result = await webApi.isInProgressBooking(id);
    console.log('queryPresaleisInProgress', result);
    this.dispatch('goodsDetail:bookingSaleVO', result.context.bookingSaleVO);
  }

  /**
   * 获取预约信息
   */
  async queryPreBuyTime(id) {
    let result = await webApi.isInProgress(id);
    if (WMkit.isLoginOrNotOpen()) {
      if (result.context.appointmentSaleVO) {
        this.isSubscriptionFlag(id);
      }
    }
    this.dispatch(
      'goodsDetail:appointmentSaleVO',
      result.context.appointmentSaleVO
    );
  }
  //判断用户是否预约
  async isSubscriptionFlag(skuId) {
    let res = await webApi.isSubscriptionFlag(skuId);
    this.dispatch('goodsDetail:subscriptionFlag', res.context);
  }

  //规则信息
  async fetchRule() {
    let res = await webApi.getRuleContentAll();
    this.dispatch('goodsDetail:ruleContent', res.context);
  }

  /**
   * 增值服务信息
   */
  _initVAS = async () => {
    // 企业购业务-开关|配置信息
    this.dispatch('goods-list:iep-info', fromJS(await VAS.fetchIepInfo()));
  };

  /**
   *查询组合商品
   */
  searchSuitGoods = async (skuId) => {
    let res1 = await webApi.getGoodsInfoShowSuitGoodsDetail(skuId);
    if (res1.code === config.SUCCESS_CODE) {
      this.dispatch(
        'marketingSuits:set',
        res1.context.marketingMoreGoodsInfoResponseList
      );
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
   * 初始化【评价信息
   * @param goodsId
   * @private
   */
  _initEvaluate = (goodsId) => {
    const isShow = this.state().get('isShow');
    if (isShow) {
      webApi.getEvaluateTop3(goodsId).then((res) => {
        if (res.code == config.SUCCESS_CODE) {
          this.dispatch('evaluateActor:top3Evaluate', res.context);
        }
      });
    }
  };

  /**
   * 初始化抢购信息
   * @param goodsId
   * @private
   */
  _initFlashSaleGoods = async (goodsId) => {
    const flashsaleGoods = await webApi.isFlashSale(goodsId);
    this.dispatch('goods-actor:flashsaleGoods', flashsaleGoods.context);
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

  //获取图片地址
  showBigImg = (data) => {
    this.dispatch('evaluateActor:findBigPicture', true);
    //图片地址
    this.dispatch('evaluateActor:bigImgIndex', data);
  };

  closeBigImg = () => this.dispatch('evaluateActor:findBigPicture', false);

  curIndex = (index) => this.dispatch('evaluateActor:changeIndex', index);

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

  /*
    二级导航
  */
  getMenuList = async () => {
    const result = await webApi.getByMain(2);
    this.dispatch(
      'goods=detail:nav',
      result.context ? result.context.hoverNavMobileVO.navItems : []
    );
  };

  handClick = (isMenuBoxFlag) => {
    this.dispatch('goods-detail:changeFlag',  isMenuBoxFlag );
  };
  /**
   * 图文分享弹窗显示隐藏
   */
  changeImgShareModal = () => {
    //普通分享
    this.dispatch('goods-detail:changeImgShareModal');
  };

  /**
   * 分享赚分享
   */
  toggleShareModal = () => {
    this.dispatch('goods-detail:toggleShareVisible');
  };

  /**
   * 检查客服是否开启
   */
  _checkOnlineService = async (storeId) => {
    const { code, context, message } = await webApi.onLineServiceList(storeId);
    if (code === config.SUCCESS_CODE) {
      let flag = context?.status == 1;
      flag = flag && context?.effectiveH5 == 1;
      this.dispatch('goods-detail:setServiceFlag', flag);
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
        .map((info) => {return info.get('goodsInfoId')});
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
  changeWholesaleVisible = (value, type) => {
    this.dispatch('goods-detail:changeWholesaleVisible', value);
    this.dispatch('goods-detail:isPay', type);
  };

  //零售销售弹框显示隐藏
  changeRetailSaleVisible = (value, type) => {
    this.dispatch('goods-detail:changeRetailSaleVisible', value);
    this.dispatch('goods-detail:isPay', type);
  };

  //零售类型弹框操作重新渲染页面
  changeSpecVisibleAndRender = async (goodsInfo, pointsGoods) => {
    if (!goodsInfo.isEmpty()) {
      this.dispatch('goods-detail:closeAndRenderRetail', {
        goodsInfo,
        pointsGoods
      });
      this.dispatch('goods-detail:pauseVideo');
      this.dispatch('goods-detail:closeVideo');
      //优惠券根据实际的sku重置
      this.dispatch('detail: coupon: filed: value', {
        field: 'couponLabels',
        value: goodsInfo.get('couponLabels').toJS()
      });
      const skuId = goodsInfo.get('goodsInfoId');
      this.searchSuitGoods(skuId);

      // await this.queryPreBuyTime(goodsInfo.get('goodsInfoId'));
      //判断商品是否预售中
      // await this.queryPresaleisInProgress(goodsInfo.get('goodsInfoId'));
      // await this.fetchRule();
      //app至于后台 在切换过规格信息之后不刷新
      AsyncStorage.setItem('changeSpecInfoFlag', '1');
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

  /**
   * 立刻抢购
   */
  rushToBuyingFlashSaleGoodsInfo = WMkit.onceFunc(
    async (flashSaleGoodsId, num) => {
      if (WMkit.isLoginOrNotOpen()) {
        let { code, message } = await webApi.rushToBuyFlashSaleGoods(
          flashSaleGoodsId,
          num
        );
        if (code == config.SUCCESS_CODE) {
          msg.emit('router: goToNext', {
            routeName: 'FlashSaleGoodsPanicBuying',
            flashSaleGoodsId: flashSaleGoodsId,
            flashSaleGoodsNum: num
          });
          window.y = '';
        } else if (code == 'K-140007') {
          msg.emit('app:tip', '抢购业务繁忙，稍后再试');
        } else {
          msg.emit('app:tip', message);
        }
      } else {
        //显示登录弹框
        msg.emit('router: goToNext', { routeName: 'Login' });
      }
    },
    1000
  );

  reload = () => {
    const goodsInfoId = this.state().getIn(['goodsInfo', 'goodsInfoId']);
    this.init(goodsInfoId);
  };

  changeAddSelfShop = (value) => {
    this.dispatch('goods-detail:changeAddSelfShop', value);
  };

  //积分商品规格弹框显示隐藏
  changePointsExchangeVisible = (value) => {
    this.dispatch('goodsDetail:changePointsExchangeVisible', value);
  };

  /**
   * 判断是否购买了企业购
   */
  checkIEP = async () => {
    // 存储是否有企业购增值服务
    const flag = await VAS.fetchVASStatus(VASConst.IEP);
    if (flag) {
      const res = await webApi.getIEPSetting();
      if (res && res.code === 'K-000000') {
        const iepCustomerName = res.context.iepSettingVO.enterpriseCustomerName;
        const iepLogoInfo = res.context.iepSettingVO.enterpriseCustomerLogo;
        const iepLogo = iepLogoInfo ? JSON.parse(iepLogoInfo) : [];
        const iepPriceName = res.context.iepSettingVO.enterprisePriceName;
        this.transaction(() => {
          this.dispatch('iepSetting:iepInfo', {
            iepLogo: iepLogo && iepLogo.length > 0 ? iepLogo[0].url : '',
            iepCustomerName: iepCustomerName,
            iepPriceName: iepPriceName
          });
          this.dispatch('iepSetting:enable', true);
        });
      }
    }
  };

  /**
   * 立即购买
   */
  didConfirm = async (goodsInfo) => {
    // debugger
    try {
      let skuList = [
        {
          skuId: goodsInfo.get('goodsInfoId'),
          num: goodsInfo.get('num')
        }
      ];

      const currentPreBuyStatus = this.state().get('currentPreBuyStatus');
      const appointmentSaleVO = this.state().get('appointmentSaleVO').toJS();

      const bookingSaleVO = this.state().get('bookingSaleVO').toJS();
      const buyPoint = goodsInfo.get('buyPoint');

      //如果是立即预约  currentPreBuyStatus 0立即预约，非0则立即抢购
      if (currentPreBuyStatus == '0') {
        const appointmentId = goodsInfo.get('appointmentSaleVO').get('id');
        const { code, message } = await this.rushToPreBuyGoodsInfo(
          appointmentId,
          appointmentSaleVO.appointmentSaleGood.goodsInfoId
        );
        let title = '预约成功，可前往我的-预约查看预约记录';
        if (code != config.SUCCESS_CODE) {
          title = message;
        }
        let appointmentStartTime = goodsInfo.get('appointmentSaleVO').get('appointmentStartTime');
        let appointmentEndTime = goodsInfo.get('appointmentSaleVO').get('appointmentEndTime');
        //如果预约开始时间在当前时间之前则代表预约中
        let isAppointmentStart = moment(appointmentStartTime).isBefore(new Date());
        let isAppointmentEnd = moment(new Date()).isBefore(appointmentEndTime);
        //预约中--预约成功
        if (isAppointmentStart && isAppointmentEnd) {
          //加入购物车
          await webApi.purchase(goodsInfo.get('goodsInfoId'), goodsInfo.get('num'));
        };
        this.changeRetailSaleVisible(false, false);
        msg.emit('app:tip', title);
      } else {
        if (appointmentSaleVO && appointmentSaleVO.id && !buyPoint) {
          // 预约
          skuList = [
            {
              skuId: goodsInfo.get('goodsInfoId'),
              num: goodsInfo.get('num'),
              appointmentSaleId: appointmentSaleVO.id,
              isAppointmentSaleGoods: true
            }
          ];
        } else if (bookingSaleVO && bookingSaleVO.id && !buyPoint) {
          // 预售
          let isBetween = false;
          const {
            bookingType,
            bookingStartTime,
            bookingEndTime,
            handSelStartTime,
            handSelEndTime
          } = bookingSaleVO;
          if (bookingType == 0) {
            isBetween = moment(new Date()).isBetween(
              bookingStartTime,
              bookingEndTime
            );
          }

          //定金支付起止时间内
          if (bookingType == 1) {
            isBetween = moment(new Date()).isBetween(
              handSelStartTime,
              handSelEndTime
            );
          }

          if (isBetween) {
            skuList = [
              {
                skuId: goodsInfo.get('goodsInfoId'),
                num: goodsInfo.get('num'),
                bookingSaleId: bookingSaleVO.id,
                isBookingSaleGoods: true
              }
            ];
          }
        }
        if (WMkit.isLoginOrNotOpen()) {
          const { code, message } = await webApi.toConfirm(skuList, [], false);
          if (code === config.SUCCESS_CODE) {
            window.y = '';
            // msg.emit('router: goToNext', { routeName: 'OrderConfirm' });
            msg.emit('router: goToNext', { routeName: 'OrderConfirm',skuId: goodsInfo.get('goodsInfoId') });
          } else if (code === 'K-999999') {
            msg.emit('app:tip', '优惠失效提醒');
          } else if (code === 'K-180001') {
            msg.emit('app:tip', '您没有预约购买资格');
          } else {
            msg.emit('app:tip', message);
        }
        }
      }
    } catch (e) {
      console.log('err', e);
      msg.emit('app:tip', '立即购买失败');
    }
  };

  /**
   * 立即预约
   */
  async rushToPreBuyGoodsInfo(appointmentSaleId, skuId) {
    let result;
    if (WMkit.isLoginOrNotOpen()) {
      try {
        const params = {
          appointmentSaleId,
          skuId
        };
        result = await webApi.rushToAppointmentGoods(params);
        this.isSubscriptionFlag(skuId);
      } catch (error) {
        console.log('err', error);
      }
    } else {
      msg.emit('loginModal:toggleVisible');
    }
    return result;
  }

  /**
   * 更新预约状态 0立即预约，1立即抢购
   */
  changeCurrentPreBuyStatus = (value) => {
    this.dispatch('goodsDetail:changeCurrentPreBuyStatus', value);
  };

  /**
   * 预约规则弹框的显示隐藏
   */
  changeAppointmentRuleVisible = () => {
    this.dispatch('good:appointment:rule:visible');
  };

  /**
   * 预售规则弹框的显示隐藏
   */
  changePreSaleRuleVisible = () => {
    this.dispatch('good:pre:sale:rule:visible');
  };


  /**
   * 初始化地址
   */
  selectWareAddress=async ()=>{
    const token = window.token;
    if(token){
      const addressList=await getBeforeAddress();
      if(addressList.length !=0){
        addressList.map(n => {
          const { provinceId, cityId, areaId, deliveryAddress } = n;
          n.addressInfo = FindArea.addressInfo(provinceId, cityId, areaId)+deliveryAddress;
          return n;
        });
        this.dispatch('goods-actor: addr: init', addressList[0].addressInfo);
        await setChooseCity(addressList[0].cityId);
      }else{
        this.dispatch('set:state',{field:'addressModalVisible',value: true});
      }
    }else{
      await this.getGeolocation();
    }
  };

  openSettings() {
    this.setGeolocationVisible();
    return Platform.OS === 'ios' ? openSettings() : OpenSettings.openSettings();
  }

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
    await Geolocation.getCurrentPosition().then( async (data) => {
      const cityId = FindArea.findCityCode(data.city);
      this.dispatch('goods-actor: addr: init', data.province + data.city);
      if(cityId){
        await setChooseCity(cityId);
      }
    }).catch(e => {
      
    });
  };

  /**
   * 关闭弹框
   */
  setModalVisible=()=>{
    this.dispatch('set:state',{field:'addressModalVisible',value: false});
  };

  /**
   * 关闭弹框
   */
  setGeolocationVisible=()=>{
    this.dispatch('detail: coupon: filed: value',{field:'geolocationVisible',value: false});
  };


  //特价销售类型下的规格弹框
  changeSpecialVisible = (value) => {
    this.dispatch('goods-detail:changeSpecialVisible', value);
  };

}
