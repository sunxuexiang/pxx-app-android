import { Actor, Action } from 'plume2';
import actionType from '../action-type';
export default class IndexActor extends Actor {
  defaultState() {
    return {
      id: '', // 后台用于授信超时校验的id
      phone: '', // 手机号
      code: '' //验证码
    };
  }

  /**
   * 初始化
   */
  @Action(actionType.INIT)
  init(state, id) {
    return state.set('id', id);
  }

  /**
   * 改变手机号
   */
  @Action(actionType.CHANGE_PHONE)
  changePhone(state, phone) {
    return state.set('phone', phone);
  }

  /**
   * 改变验证码
   */
  @Action(actionType.CHANGE_CODE)
  changeCode(state, code) {
    return state.set('code', code);
  }
}
