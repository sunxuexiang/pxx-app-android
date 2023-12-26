import { Action, Actor } from 'plume2';

export default class LoginActor extends Actor {
  defaultState() {
    return {
      payOrder: {}
    };
  }

  /**
   * 修改提交form的内容
   */
  @Action('formActor:setPayOrder')
  setPayOrder(state, payOrder) {
    return state.set('payOrder', payOrder);
  }
}
