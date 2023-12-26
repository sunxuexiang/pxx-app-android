import { Action, Actor } from 'plume2';
import { fromJS } from 'immutable';
export default class DetailActor extends Actor {
  defaultState() {
    return {
      amount: fromJS({})
    };
  }

  /**
   * 根据返回的数据填充字段
   */
  @Action('set:amount')
  initData(state, val) {
    return state.set('amount', fromJS(val));
  }
}
