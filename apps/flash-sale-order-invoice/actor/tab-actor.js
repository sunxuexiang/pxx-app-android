import { Action, Actor } from 'plume2';

export default class TabActor extends Actor {
  defaultState() {
    return {
      key: '' //tab-key
    };
  }

  /**
   * 初始化tab项
   * @param state
   * @param key
   * @returns {Map<string, string>}
   */
  @Action('tab:init')
  init(state, key) {
    return state.set('key', key);
  }
}
