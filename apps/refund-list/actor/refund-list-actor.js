import { Action, Actor } from 'plume2';

/**
 * Created by bail on 2017/9/14.
 */
export default class RefundListActor extends Actor {
  defaultState() {
    return {
      key: 'all', //tab-key,默认查询所有状态的退单
      toRefresh: () => {} //放入state,为了分页组件局部刷新
    };
  }

  /**
   * 切换tab状态
   */
  @Action('tab:change')
  init(state, key) {
    return state.set('key', key);
  }

  /**
   * 保存WmListView控件的初始化方法,用于刷新
   */
  @Action('tab:save:refresh')
  initToRefresh(state, _init) {
    return state.set('toRefresh', _init);
  }
}
