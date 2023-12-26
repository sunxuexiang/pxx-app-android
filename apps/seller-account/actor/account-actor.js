import { fromJS } from 'immutable';
import { Action, Actor } from 'plume2';

export default class AcountActor extends Actor {
  defaultState() {
    return {
      accountList: []
    };
  }

  /**
   * 初始化收款账号列表
   */
  @Action('accountActor:init')
  init(state, accountList) {
    return state.set('accountList', fromJS(accountList));
  }
}
