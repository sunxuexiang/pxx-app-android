import { Action, Actor } from 'plume2';

import { fromJS } from 'immutable';

export default class PayMentActor extends Actor {
  defaultState() {
    return {
      payOptions: [{ id: '1', name: '线下支付' }], // 可用的支付方式列表 [0：在线支付   1：线下转账]
      payType: -1 //支付方式 0：在线支付   1：线下转账
    };
  }

  /**
   * 选择支付方式
   * @param state
   * @param payId 支付方式id
   * @returns {Map<string, string>}
   */
  @Action('payment: type')
  choosePayType(state, payId) {
    return state.set('payType', payId);
  }

  /**
   * 更新可用支付方式列表 [0线上, 1线下]
   */
  @Action('payment: init')
  init(state, payOptions) {
    return state.set('payOptions', fromJS(payOptions));
  }
}
