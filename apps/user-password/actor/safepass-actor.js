/**
 * Created by feitingting on 2017/7/20.
 */
import { Actor, Action } from 'plume2';
export default class SafePassActor extends Actor {
  defaultState() {
    return {
      mobile: '',
      code: '',
      isLogin: false
    };
  }

  /**
   * 手机号码状态值
   * @param state
   * @param mobile
   */
  @Action('safepass:mobile')
  getMobile(state, mobile) {
    return state.set('mobile', mobile);
  }

  /**
   * 验证码状态值
   * @param state
   * @param code
   */
  @Action('safepass:code')
  getCode(state, code) {
    return state.set('code', code);
  }

  /**
   * 是否登录，决定是修改密码还是找回密码
   */
  @Action('safepass:isLogin')
  isLogin(state, login) {
    return state.set('isLogin', login);
  }
}
