import { fromJS } from 'immutable';
import { Action, Actor } from 'plume2';

export default class PayDetailActor extends Actor {
  defaultState() {
    return {
      payDetail: {} //付款记录
    };
  }

  /**
   * 设置付款记录
   */
  @Action('pay-detail-actor:set')
  setPayDetail(state, pay) {
    return state.set('payDetail', fromJS(pay));
  }
}
