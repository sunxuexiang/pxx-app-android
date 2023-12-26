import { Actor, Action } from 'plume2';
import { fromJS } from 'immutable';

export default class CouponActor extends Actor {
  defaultState() {
    return {
      // 优惠券列表
      couponInfos: [],
      // 优惠券标签
      couponLabels: [],
      // 用户获取状态 -- <优惠券活动Id，<优惠券Id, 领取状态>>
      fetchStatus: []
    };
  }

  /**
   * 设置键值
   * @param {*} state
   * @param {*} { field, value }
   * @returns
   * @memberof CouponActor
   */
  @Action('detail: coupon: filed: value')
  fieldValue(state, { field, value }) {
    return state.set(field, fromJS(value));
  }
}
