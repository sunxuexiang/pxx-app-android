import { Actor, Action } from 'plume2';

export default class OrderListTopActor extends Actor {
  defaultState() {
    return {
      // 选中的tab key
      key: ''
    };
  }

  /**
   * 设置tab
   */
  @Action('top:active')
  topActive(state, key) {
    return state.set('key', key);
  }
}
