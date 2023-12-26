import { Actor, Action } from 'plume2';

export default class StoreMainActor extends Actor {
  defaultState() {
    return {
      //关注状态
      liked: false,
      // 店铺信息
      store: {},
      // 加载中...
      loading: true,
      // 刷新
      refreshState: false,
      // 在线客服是否开启
      serviceFlag: false,
      // 是否显示魔方
      showMagicBox: false
    };
  }

  /**
   * 点击关注
   */
  @Action('store:liked')
  change(state) {
    return state.set('liked', !state.get('liked'));
  }

  /**
   * 店铺信息初始化
   * @param state
   * @param store
   */
  @Action('store: info: init')
  infoInit(state, store) {
    return state.set('store', store);
  }

  /**
   * 店铺加载中
   * @param state
   * @param visible
   */
  @Action('store: loading')
  load(state, visible) {
    return state.set('loading', visible);
  }

  /**
   * 店铺刷新
   * @param state
   */
  @Action('store: refresh')
  refresh(state) {
    return state.set('refreshState', !state.get('refreshState'));
  }

  /**
   * 检查客服是否开启
   */
  @Action('serviceFlag:setFlag')
  getList(state, data) {
    const flag = data != null;
    return state.set('serviceFlag', flag);
  }

  /**
   * 设置是否显示魔方
   */
  @Action('set:show:magic:box')
  setShowMagicBox(state, flag) {
    return state.set('showMagicBox', flag);
  }
}
