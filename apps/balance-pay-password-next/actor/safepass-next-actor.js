/**
 * Created by cl on 2019/4/15.
 */
import { Actor, Action } from 'plume2';

export default class SafePassNextActor extends Actor {
  defaultState() {
    return {
      password: '',
      isShowpwd: false,
      //是否忘记密码，默认否
      forget: false
    };
  }

  /**
   * 监听密码状态值
   * @param state
   */
  @Action('paypassnext:init')
  init(state, forget) {
    return state
      .set('password', '')
      .set('isShowpwd', false)
      .set('forget', forget ? true : false);
  }

  /**
   * 设置新密码
   * @param state
   * @param value
   */
  @Action('paypassnext:newpass')
  getPass(state, value: string) {
    return state.set('password', value);
  }

  /**
   * 是否显示密码
   * @param state
   * @param showpass
   */
  @Action('paypassnext:showpass')
  showpass(state, showpass: boolean) {
    return state.set('isShowpwd', !showpass);
  }
}
