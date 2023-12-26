import { Actor, Action } from 'plume2';

export default class SafeMobileActor extends Actor {
  defaultState() {
    return {
      mobile: '',
      code: '',
      //新手机号是否验证通过
      isValid: false
    };
  }

  /**
   * 新手机号是否验证通过
   * @param state
   * @param value
   */
  @Action('mobile:isValid')
  getIsValid(state, value) {
    return state.set('isValid', value);
  }

  /**
   * 获取手机号码
   * @param state
   * @param mobile
   */
  @Action('mobile:newMobile')
  getMobile(state, mobile) {
    return state.set('mobile', mobile);
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
