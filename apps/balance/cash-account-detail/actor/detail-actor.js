import { Actor, Action, IMap } from 'plume2';

export default class DetailActor extends Actor {
  defaultState() {
    return {
      // Tab类型 0: 全部, 1: 收入, 2: 支出
      tabType: '0',
      // 是否重新加载
      toRefresh: false
    };
  }

  /**
   * 设置tab
   */
  @Action('account:detail:field:change')
  topActive(state: IMap, { field, value }) {
    return state.set(field, value);
  }
}
