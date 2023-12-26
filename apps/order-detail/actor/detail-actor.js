import { Action, Actor } from 'plume2';
import { fromJS } from 'immutable';
import { _, Const } from 'wmkit';

export default class DetailActor extends Actor {
  defaultState() {
    return {
      tid: '',
      defaultAddr: {}, //默认地址
      detail: {}, //订单详情
      skus: [], // 商品清单
      sortEnclosures: [],
      enclosures: [],
      annexMaskShow: false,
      pointConfig: fromJS({}), //积分配置
      isPresale: true, //是否预售
      isBookingSaleGoods: false, //是否定金预售
      coupons: [], // 优惠券列表
      couponPageInfo: null, // 使用优惠券页信息
      commonCodeId: null, // 使用的平台优惠券
      couponTotal: 0, // 优惠券优惠总额
      totalPoint: 0, //会员总积分
      showPoint: false, //打开积分按钮
      usePoint: 0, //使用积分数
      usePointExtra: 0, //使用积分抵扣金额
      integralInput: '', //输入值
      useStatus: {
        selectCoupon: {}
      },
      isPayBalance: false,
      goodsTotalPrice: 0, //商品总价
      discountsTotalPrice: 0, //优惠总价
      totalDeliveryPrice: 0, //配送费用总价
      loadingVisible: false, //加载动画
      goodsTotalNum:0,
    };
  }

  /**
   * 初始化订单
   */
  @Action('detail-actor:init')
  init(state, res) {
    return state.update('detail', (detail) => detail.merge(res));
  }
  /**
   * 初始化附件数组
   */
  @Action('change:initEnclosures')
  initEnclosures(state, value) {
    return state.set('enclosures', value);
  }
  /**
   * 初始化id
   */
  @Action('detail-actor:tid')
  initTid(state, tid) {
    return state.set('tid', tid);
  }

  /**
   * 附件预览显示隐藏
   */
  @Action('change:changeAnnexMask')
  changeAnnexMask(state) {
    return state.set('annexMaskShow', !state.get('annexMaskShow'));
  }
  /**
   * 附件预览显示隐藏
   */
  @Action('change:newImage')
  newImage(state, value) {
    return state.set('sortEnclosures', value);
  }

  /**
   * 初始化积分设置
   */
  @Action('detail-actor:initpointConfig')
  initPointSet(state, pointConfig) {
    return state.set('pointConfig', pointConfig);
  }

  /**
   * 初始化预售
   */
  @Action('detail-actor:initPresale')
  initPresale(state, res) {
    const {
      tradeState,
      tradePrice,
      isBookingSaleGoods,
      bookingType,
      couponCodes
    } = res;
    return state
      .set('isBookingSaleGoods', isBookingSaleGoods && bookingType == 1)
      .set('isPresale', isBookingSaleGoods)
      .set('coupons', fromJS(couponCodes))
      .set(
        'isPayBalance',
        tradeState.payState == 'PAID_EARNEST' && tradeState.flowState == 'AUDIT'
      ) //是否已创建支付尾款订单
      .set('goodsTotalPrice', tradePrice.goodsPrice)
      .set('usePoint', tradePrice.points || 0)
      .set('couponTotal', tradePrice.couponPrice ||0);
  }

  /**
   * 切换是否使用积分
   * @param state
   */
  @Action('detail-actor:changeSwitch')
  changeSwitch(state) {
    //切换时重置订单总额
    const totalPrice = _.add(
      _.sub(state.get('goodsTotalPrice'), state.get('discountsTotalPrice')),
      state.get('totalDeliveryPrice')
    );
    state = state.set('totalPrice', totalPrice);
    return state
      .set('showPoint', !state.get('showPoint'))
      .set('usePoint', 0)
      .set('usePointExtra', 0)
      .set('integralInput', '');
  }

  /**
   * 修改积分抵扣金额(使用两个,一个用来数值计算,一个用来切换时候默认值是空字符串,值都是一样的)
   *
   * @param state
   * @param usePoint
   * @returns {*}
   */
  @Action('detail-actor:setUsePoint')
  setUsePoint(state, { usePoint, integralInput }) {
    const usePointExtra = _.div(usePoint, Const.pointRatio);
    const detail = state.get('detail').toJS();

    //尾款价格
    const { tradePrice } = detail;
    const totalPrice = _.sub(
      _.add(
        _.sub(state.get('goodsTotalPrice'), state.get('discountsTotalPrice')),
        tradePrice.swellPrice
      ),
      usePointExtra
    );
    return state
      .set('totalPrice', totalPrice)
      .set('usePoint', usePoint)
      .set('usePointExtra', usePointExtra)
      .set('integralInput', integralInput);
  }

  /**
   * 初始化用户总积分
   *
   * @param state
   * @param totalPoint
   * @returns {*}
   */
  @Action('detail-actor:initTotalPoint')
  initTotalPoint(state, totalPoint) {
    return state.set('totalPoint', totalPoint);
  }

  /**
   * 接收使用订单页的数据
   */
  @Action('detail-actor:initTotalGoodsNum')
  initTotalGoodsNum(state, totalGoodsNum) {
    return state.set('goodsTotalNum', totalGoodsNum);
  }

  /**
   * 接收使用订单页的数据
   */
  @Action('set:coupon:page:info')
  setCouponPageInfo(state, pageInfo) {
    return state.set('couponPageInfo', pageInfo);
  }

  /**
   * 加载动画
   */
  @Action('set: loadingVisible')
  loadingVisible(state, loading) {
    return state.set('loadingVisible', loading);
  }

  /**
   * 根据优惠券页信息设置优惠券相关信息
   */
  @Action('calc:coupon:info')
  calcCouponInfo(state) {
    const pageInfo = state.get('couponPageInfo');
    if (!pageInfo) return state;

    // 设置平台券id
    const chosenCommon = pageInfo
      .getIn(['enableCoupons', 'commonCoupons'])
      .find((c) => c.get('chosen') == true);
    if (chosenCommon) {
      state = state.set('commonCodeId', chosenCommon.get('couponCodeId'));
    }

    const detail = state.get('detail').toJS();
    const { tradePrice } = detail;

    // 设置店铺券id
    const store = pageInfo
      .getIn(['enableCoupons', 'stores'])
      .find((store) => store.get('storeId') == detail.supplier.storeId);

    const chosenCoupon = store
      .get('coupons')
      .find((coupon) => coupon.get('chosen') == true);
    state = state.set('couponCodeId', null);
    if (chosenCoupon)
      state = state.set('couponCodeId', chosenCoupon.get('couponCodeId'));

    // 设置优惠总金额
    let couponTotalPrice = pageInfo.get('couponTotalPrice');
    if (couponTotalPrice) {
      const discountsPrice = state.get('discountsTotalPrice');
      const goodsTotalPrice = state.get('goodsTotalPrice');
      const usePoint = state.get('usePoint');

      //如果优惠券价格大于尾款价格，则直接失败尾款价格显示优惠价格，尾款显示0
      //计算尾款价格
      const price = _.sub(
        _.sub(goodsTotalPrice, tradePrice.swellPrice),
        _.div(usePoint, Const.pointRatio).toFixed(2)
      );
      console.log('debug99 price', price);

      if (couponTotalPrice > price) {
        //优惠价格设置为尾款
        couponTotalPrice = price;
      }

      state = state
        .set('couponTotal', couponTotalPrice)
        .set('discountsTotalPrice', discountsPrice + couponTotalPrice);
      // 先计算一次总价，如果有运费的话还会再计算一次
      state = state.set(
        'totalPrice',
        _.sub(
          _.sub(
            _.sub(
              state.get('goodsTotalPrice'),
              state.get('discountsTotalPrice')
            ),
            state.get('usePointExtra')
          ),
          tradePrice.swellPrice
        )
      );
    }
    return state;
  }
}
