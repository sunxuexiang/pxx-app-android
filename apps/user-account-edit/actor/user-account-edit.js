/**
 * Created by feitingting on 2017/9/12.
 */
import { Actor, Action } from 'plume2';

export default class UserAccountEditActor extends Actor {
  defaultState() {
    return {
      account: {
        customerAccountId: '',
        customerBankName: '',
        customerAccountName: '',
        customerAccountNo: ''
      }
    };
  }

  /**
   * 表单输入框状态值统一处理
   * @param state
   * @param res
   * @returns {List.<T>|List<T>|Map.<K, V>|Map<K, V>|Cursor|*}
   */
  @Action('accountEdit:setValue')
  setValue(state, res) {
    return state.setIn(['account', res.key], res.value);
  }

  /**
   * 账号详情
   * @param state
   * @param res
   * @returns {Map<string, V>}
   */
  @Action('customer:account')
  accountList(state, res) {
    return state.set('account', res);
  }

  @Action('customer:accountId')
  accountId(state, id) {
    return state.setIn(['account', 'customerAccountId'], id);
  }
}
