/**
 * Created by feitingting on 2017/7/20.
 */
import { Actor, Action } from 'plume2';

export default class SafePassNextActor extends Actor {
  defaultState() {
    return {
      password: '',
      isShowpwd: false,
      isLogin: false
    };
  }

  /**
   * 设置新密码
   * @param state
   * @param value
   */
  @Action('safepassnext:newpass')
  getPass(state, value) {
    return state.set('password', value);
  }

  /**
   * 是否显示密码
   * @param state
   * @param showpass
   */
  @Action('safepassnext:showpass')
  showpass(state, showpass) {
    return state.set('isShowpwd', !showpass);
  }

  @Action('safepassnext:isLogin')
  isLogin(state, login) {
    return state.set('isLogin', login);
  }
}
