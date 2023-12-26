/**
 * Created by hht on 2017/9/4.
 */
import { Actor, Action } from 'plume2';
import { fromJS } from 'immutable';

export default class IepActor extends Actor {
  defaultState() {
    return {
      iepInfo: {},
    };
  }

  /**
   * 初始化数据
   * @param state
   * @param customer
   * @returns {Map<string, V>}
   */
  @Action('iep:getIepInfo')
  init(state, content) {
    return state.set('iepInfo', fromJS(content));
  }

  /**
   * 用于store实现页面跳转
   * @param state
   * @param content
   */
  @Action('iep:setIepInfo')
  setIepInfo(state, content) {
    return state.setIn(['iepInfo',content['key']], content['value']);
  }

}
