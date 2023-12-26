import { Action, Actor } from 'plume2';
import { fromJS } from 'immutable';

export default class CouponActor extends Actor {
  defaultState() {
    return {
      // 优惠券列表
      couponList: [],
      // 优惠券类别列表
      couponTypeList: [],
      // 优惠券分类列表
      couponCateList: [],
      //优惠券分类已选定位
      activedKey: null,
      //下拉菜单的显示隐藏
      showDrapMenu: false,
      //分类弹层的显示隐藏
      showCateMask: false,
      // 是否初始化解析参数完毕
      initialEnd: false
    };
  }

  /**
   * 下拉菜单的显示隐藏
   */
  @Action('change: drapmenu')
  changeDrapMenu(state) {
    return state.set('showDrapMenu', !state.get('showDrapMenu'));
  }

  /**
   * 下拉菜单的显示隐藏
   */
  @Action('change: catemask')
  changeCateMask(state) {
    return state.set('showCateMask', !state.get('showCateMask'));
  }

  /**
   * 优惠券tab页签切换分类
   * @param state
   * @param index
   * @returns {*}
   */
  @Action('coupon: tab: change')
  setCouponCate(state, index) {
    return state.set('couponCateId', index);
  }

  /**
   * 优惠券类型选择
   * @param state
   * @param index
   * @returns {*}
   */
  @Action('coupon: type: change')
  setCouponType(state, index) {
    return state.set('couponType', index);
  }

  /**
   * 优惠券列表
   * @param state
   * @param index
   * @returns {*}
   */
  @Action('coupon: list')
  setCouponList(state, index) {
    return state.set('couponList', index);
  }

  /**
   * 优惠券分类列表
   * @param state
   * @param index
   * @returns {*}
   */
  @Action('couponcates: list')
  setCouponCateList(state, index) {
    return state.set('couponCateList', fromJS(index));
  }

  /**
   *优惠券分类已选定位
   */
  @Action('change: actived-key')
  changeActivedKey(state, index) {
    return state.set('activedKey', index);
  }

  /**
   * 解析参数完毕
   */
  @Action('coupon: list: initial: end')
  initialEnd(state) {
    return state.set('initialEnd', true);
  }
}
