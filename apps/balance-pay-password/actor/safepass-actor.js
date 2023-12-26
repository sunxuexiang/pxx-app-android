/**
 * Created by feitingting on 2017/7/20.
 */
import { Actor, Action } from 'plume2';
export default class SafePassActor extends Actor {
  defaultState() {
    return {
      mobile: '',
      code: '',
      //是否忘记密码，true:忘记， false:设置 默认false
      forget: false
    };
  }

  /**
   * 手机号码状态值
   * @param state
   * @param mobile
   */
  @Action('paypass:mobile')
  getMobile(state, mobile: string) {
    return state.set('mobile', mobile);
  }

  /**
   * 验证码状态值
   * @param state
   * @param code
   */
  @Action('paypass:code')
  getCode(state, code: string) {
    return state.set('code', code);
  }

  @Action('paypass:type')
  setType(state, type) {
    return state.set('forget', type ? true : false);
  }
}
