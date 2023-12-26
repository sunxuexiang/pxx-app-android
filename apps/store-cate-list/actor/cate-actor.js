import { Action, Actor } from 'plume2';

export default class CateActor extends Actor {
  defaultState() {
    return {
      // 店铺Id
      storeId: null,
      // 数据源
      cateList: []
    };
  }

  /**
   * 数据初始化
   * @param state
   * @param cateList
   * @returns {Map<string, V>}
   */
  @Action('cateActor:init')
  cateInit(state, { cateList, storeId }) {
    return state.set('cateList', cateList).set('storeId', storeId);
  }
}
