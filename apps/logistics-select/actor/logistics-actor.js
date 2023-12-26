import { fromJS } from 'immutable';
import { Action, Actor } from 'plume2';

export default class LogisticsActor extends Actor {
  defaultState() {
    return {
      logisticsList: []
    };
  }

  /**
   * 初始化物流公司列表
   */
  @Action('logisticsActor:init')
  init(state, logisticsList) {
    return state.set('logisticsList', fromJS(logisticsList));
  }
}
