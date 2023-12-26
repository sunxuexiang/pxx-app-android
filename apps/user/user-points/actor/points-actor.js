import { Actor, Action } from 'plume2';

export default class PointsActor extends Actor {
  defaultState() {
    return {
      pointsValue: 0,
      pointsRule: '',
      layerVisible: false,
      //即将过期积分数据
      willExpirePointsData: {
        customerId: '',
        pointsExpireStatus: 0,
        pointsExpireDate: '',
        willExpirePoints: 0
      }
    };
  }

  @Action('points:value')
  pointsValue(state, pointsValue) {
    return state.set('pointsValue', pointsValue);
  }

  @Action('points:willExpire')
  willExpirePointsData(state, willExpirePointsData) {
    return state.set('willExpirePointsData', willExpirePointsData);
  }

  @Action('points:rule')
  pointsRule(state, pointsRule) {
    return state.set('pointsRule', pointsRule);
  }

  @Action('change: layerVisible')
  changeLayerVisible(state) {
    return state.set('layerVisible', !state.get('layerVisible'));
  }
}
