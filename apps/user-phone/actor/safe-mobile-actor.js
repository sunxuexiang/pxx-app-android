import { Actor, Action } from 'plume2';
import { fromJS } from 'immutable';

export default class SafeMobileActor extends Actor {
  defaultState() {
    return {
      mobile: '',
      code: '',
      //手机号是否验证通过
      isValid: false
    };
  }

  /**
   * 新手机号是否验证通过
   * @param state
   * @param code
   */
  @Action('mobile:isValid')
  getIsValid(state, value) {
    return state.set('isValid', value);
  }

  /**
   * 初始化原绑定手机号
   * @param state
   * @param mobile
   */
  @Action('mobile:init')
  init(state, mobile) {
    return state.set('mobile', fromJS(mobile).get('customerAccount'));
  }

  /**
   * 获取验证码
   * @param state
   * @param code
   */
  @Action('mobile:code')
  getCode(state, code) {
    return state.set('code', code);
  }
}
