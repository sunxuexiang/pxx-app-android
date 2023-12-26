import { Action, Actor } from 'plume2';
export default class DetailActor extends Actor {
  defaultState() {
    return {
      // 是否绑定过微信
      isBindWeChat: false,
      // 页面加载标志
      loading: null
    };
  }

  /**
   * 提示框是否显示
   */
  @Action('show:no:bind:tip')
  tipLayerShow(state, val) {
    return state.set('isBindWeChat', val);
  }

  /**
   * 页面加载标志
   */
  @Action('show:loading')
  loading(state, val) {
    return state.set('loading', val);
  }
}
