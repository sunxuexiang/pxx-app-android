import { Actor, Action } from 'plume2';
import { fromJS } from 'immutable';

export default class ServiceListActor extends Actor {
  defaultState() {
    return {
      serviceList: {}
    };
  }

  /**
   * 获取客服内容
   */
  @Action('serviceList:getList')
  getList(state, data) {
    return state.set('serviceList', fromJS(data));
  }
}
