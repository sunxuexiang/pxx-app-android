/**
 * Created by chenpeng on 2017/12/19.
 */
import { Actor, Action } from 'plume2';

export default class TabActor extends Actor {
  defaultState() {
    return {
      activeKey: 'archives'
    };
  }

  /**
   * 设置选中的 key
   * @param state
   * @param key
   */
  @Action('tab-actor:setActiveKey')
  setActiveKey(state, key) {
    return state.set('activeKey', key);
  }
}
