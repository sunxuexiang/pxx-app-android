import { Actor, Action } from 'plume2';

export default class IndexActor extends Actor {
  defaultState() {
    return {
      childAccountList:[],
      customerAccount:''
    };
  }

  /**
   * 设置微信绑定状态
   */
  @Action('info: childAccountList')
  setChildList(state, childList) {
    return state.set('childAccountList', childList);
  }

  /**
   * 设置会员的账户
   */
  @Action('info: setCustomerAccount')
  setCustomerAccount(state, account) {
    return state.set('customerAccount',account);
  }

}
