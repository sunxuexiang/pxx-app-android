import { Actor, Action } from 'plume2';

export default class CouponActor extends Actor {
  defaultState() {
    return {
      //我的优惠券未使用总数
      unUseCount: 0,
      //我的优惠券已使用总数
      usedCount: 0,
      //我的优惠券已过期总数
      overDueCount: 0,

      //使用状态,0(未使用)，1(使用)，2(已过期)
      useStatus: 0,
      //优惠券类型 0通用券 1店铺券 2运费券
      couponType: null,
      //放入state,为了分页组件局部刷新
      toRefresh: false,

      //说明文档的显示隐藏
      showHelp: false,
      //下拉菜单的显示隐藏
      showDrapMenu: false,

      //优惠券说明
      couponDesc: ''
    };
  }

  /**
   * 初始化我的优惠券数据
   * @param state
   * @param context
   * @returns {*}
   */
  @Action('coupon: list')
  initList(state, context) {
    return state
      .set('unUseCount', context.unUseCount)
      .set('usedCount', context.usedCount)
      .set('overDueCount', context.overDueCount);
  }

  /**
   * 保存WmListView控件的初始化方法,用于刷新
   */
  @Action('coupon: list: refresh')
  initToRefresh(state, flag) {
    return state.set('toRefresh', flag);
  }

  /**
   * 我的优惠券tab页签切换
   * @param state
   * @param index
   * @returns {*}
   */
  @Action('coupon: tab: change')
  setUseStatus(state, index) {
    return state.set('useStatus', index);
  }

  /**
   * 我的优惠券优惠券类型选择
   * @param state
   * @param index
   * @returns {*}
   */
  @Action('coupon: type: change')
  setCouponType(state, index) {
    return state.set('couponType', index);
  }

  /**
   * 说明文档的显示隐藏
   */
  @Action('change:changeHelp')
  changeHelp(state) {
    return state.set('showHelp', !state.get('showHelp'));
  }

  /**
   * 下拉菜单的显示隐藏
   */
  @Action('change:changeDrapMenu')
  changeDrapMenu(state) {
    return state.set('showDrapMenu', !state.get('showDrapMenu'));
  }

  /**
   * 优惠券说明
   * @param state
   * @param desc
   * @returns {*}
   */
  @Action('coupon: desc')
  setCouponDesc(state, desc) {
    return state.set('couponDesc', desc);
  }
}
