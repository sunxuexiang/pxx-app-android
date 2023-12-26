import { Actor, Action } from 'plume2';
import { fromJS, Map } from 'immutable';
export default class StoreInfoActor extends Actor {
  defaultState() {
    return {
      //店铺列表
      stores: [],
      totalPrice: 0,
      tradePrice: 0,
      discountPrice: 0,
      //显示返利
      showDistributeCommission: false,
      //分销返利
      distributeCommission: 0,

      //查询优惠券的参数
      goodsInfoIds: [],
      //优惠券列表
      couponList: [],
      //店铺名称列表
      storeList: [],
      defaultAddr: {}, //默认地址
      //勾选商品后结算按钮可点击，同时也会请求相关营销数据，然后为相关营销变量赋值
      //此变量的作用是防止在勾选商品后，结算按钮可用，营销数据的请求还没有响应的情况下，点击结算确认订单，生成的快照中没有营销数据
      getPriceInfoFlag: false,
      purInfo: {},
      pageNum: 0,
      pageSize: 10,
      totalPages: 0,
      needScrollTop: false
    };
  }

  @Action('purchaseOrder: purInfo')
  purInfo(state, info) {
    return state.set('purInfo', info);
  }

  /**
   * 设置店铺列表
   * @param state
   * @param storeList
   * @returns {*}
   */
  @Action('purchase:stores')
  storeList(state, storeList) {
    return state.set('stores', fromJS(storeList));
  }

  /**
   * 设置底部价格
   * @param state
   * @param param
   * @returns {Immutable.Map<string, any>}
   */
  @Action('purchaseOrder: setBottomPrice')
  setBottomPrice(state, param) {
    return state
      .set('totalPrice', param.totalPrice)
      .set('tradePrice', param.tradePrice)
      .set('discountPrice', param.discountPrice)
      .set('totalBuyPoint', param.totalBuyPoint)
  }

  /**
   * 查询购物车中各店铺所选商品可领取的优惠券
   * @param state
   * @param context
   * @returns {*}
   */
  @Action('purchase: coupon: list')
  setCouponList(state, context) {
    return state
      .set('couponList', fromJS(context.couponViews))
      .set('storeList', fromJS(context.storeMap));
  }

  /**
   * 设置查询优惠券的参数
   * @param state
   * @param goodsInfoIds
   * @returns {*}
   */
  @Action('purchase: coupon: goodInfoIds')
  setGoodsInfoIds(state, goodsInfoIds) {
    return state.set('goodsInfoIds', goodsInfoIds);
  }

  /**
   * 设置是否显示分销返利
   * @param state
   * @param showDistributeCommissions
   * @returns {*}
   */
  @Action('purchase:showDistributeCommission')
  setShowDistributeCommission(state, showDistributeCommission) {
    return state.set('showDistributeCommission', showDistributeCommission);
  }

  /**
   * 设置分销返利
   * @param state
   * @param distributeCommissions
   * @returns {*}
   */
  @Action('purchase:distributeCommission')
  setDistributeCommission(state, distributeCommission) {
    return state.set('distributeCommission', distributeCommission);
  }

  /**
   * 存储会员默认地址,没有则获取第一个
   * @param state
   * @param addr
   * @returns {Map<string, V>}
   */
  @Action('order-confirm-actor: addr: fetch')
  saveAddr(state, addr) {
    return state.set('defaultAddr', fromJS(addr));
  }

  /**
   * 返回初始化
   * @param state
   * @param defaultAddr
   * @param orderConfirm
   * @returns { }
   */
  @Action('order-confirm-actor: back: init')
  backInit(state, { defaultAddr, orderConfirm }) {
    return state
      .set('defaultAddr', fromJS(defaultAddr))
      .set('orderConfirm', fromJS(orderConfirm));
  }

  @Action('purchaseOrder: setGetPriceInfo')
  setGetPriceInfo(state, v) {
    return state.set('getPriceInfoFlag', v);
  }

  @Action('purchaseOrder: setPageNum')
  setPageNum(state, pageNum) {
    return state.set('pageNum', pageNum);
  }

  @Action('purchaseOrder: setTotalPages')
  setTotalPages(state, totalPages) {
    return state.set('totalPages', totalPages);
  }

  @Action('purchaseOrder: needScrollTop')
  needScrollTop(state, needScrollTop) {
    return state.set('needScrollTop', needScrollTop);
  }
}
