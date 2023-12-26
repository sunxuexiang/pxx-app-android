import { Actor, Action } from 'plume2';

export default class OrderListTopActor extends Actor {
  defaultState() {
    return {
      // 选中的tab key
      key: '',
      showCateMask: false
    };
  }

  /**
   * 设置tab
   */
  @Action('top:active')
  topActive(state, key) {
    return state.set('key', key);
  }

  @Action('top:changeCateMask')
  changeCateMask(state, param) {
    return state.set('showCateMask', param)
  }

}
