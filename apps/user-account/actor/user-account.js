/**
 * Created by feitingting on 2017/9/12.
 */
import { Actor, Action } from 'plume2';

export default class UserAccountActor extends Actor {
  defaultState() {
    return {
      accountList: [],
      refreshState: false
    };
  }

  /**
   * 获取银行账户列表
   * @param state
   * @param res
   */
  @Action('customer:accountList')
  accountList(state, res) {
    return state.set('accountList', res);
  }

  /**
   * 刷新银行账户列表
   * @param {*} state
   */
  @Action('customer: refresh')
  refresh(state) {
    return state.set('refreshState', !state.get('refreshState'));
  }
}
