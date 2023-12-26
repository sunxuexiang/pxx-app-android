import { Actor, Action } from 'plume2';
import actionType from '../action-type';
export default class IndexActor extends Actor {
  defaultState() {
    return {
      wxFlag: '', // 微信授权登录开启状态
      accountName: '' // 账号名称
    };
  }

  /**
   * 设置微信授权登录开启状态
   */
  @Action(actionType.SET_WX_FLAG)
  setWxFlag(state, flag) {
    return state.set('wxFlag', flag);
  }

  /**
   * 设置账号名称
   */
  @Action(actionType.SET_ACCOUNT_NAME)
  setAccountName(state, accountName) {
    return state.set('accountName', accountName);
  }
}
