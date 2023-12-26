import { Action, Actor } from 'plume2';
import { noop } from 'wmkit/noop';
import { fromJS } from 'immutable';
export default class FormActor extends Actor {
  defaultState() {
    return {
      // 列表数据
      form: {
        couponType: null, //优惠券类型
        couponCateId: null //优惠券分类
      },
      toRefresh: noop,
      // 状态变化的优惠券
      couponStateChanged: {}
    };
  }

  /**
   * 设置列表数据
   */
  @Action('coupon: list: form: set')
  setFormCouponCateId(state, { filed, value }) {
    return state.setIn(['form', filed], value);
  }

  @Action('coupon: list: torefresh')
  toRefresh(state, toRefresh) {
    return state.set('toRefresh', toRefresh);
  }

  /**
   * 设置状态变化的优惠券
   */
  @Action('coupon: list: coupon-state: changed')
  setCouponStateChanged(state, { filed, value }) {
    return state.setIn(['couponStateChanged', filed], fromJS(value));
  }

  /**
   * 设置列表数据
   */
  @Action('coupon: list: coupon-state: clear')
  clearCouponStateChanged(state) {
    return state.set('couponStateChanged', fromJS({}));
  }
}
