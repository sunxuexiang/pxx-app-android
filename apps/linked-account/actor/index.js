import { Actor, Action } from 'plume2';
import actionType from '../action-type';

export default class IndexActor extends Actor {
  defaultState() {
    return {
      wxFlag: null
    };
  }

  /**
   * 设置微信绑定状态
   */
  @Action(actionType.SET_WX_FLAG)
  setWxFlag(state, flag) {
    return state.set('wxFlag', flag);
  }
}
