import {Action, Actor} from 'plume2';

export default class GrowthActor extends Actor {
  defaultState() {
    return {
      layerVisible: false,
      isLastOne: false,
      levelInfo: {},
      basicRules: {}

    };
  }

  @Action('change: layerVisible')
  changeLayerVisible(state) {
    return state.set('layerVisible', !state.get('layerVisible'));
  }


  @Action('growth-value: basicRules')
  basicRules(state, basicRules) {
    return state.set('basicRules', basicRules);
  }


  /**
   * 是不是最高等级
   */
  @Action('growth-value: isLastOne')
  isLastOne(state) {
    return state.set('isLastOne', true);
  }

  /**
   * 等级列表
   */
  @Action('growth-value: levelInfo')
  levelInfo(state, levelInfo) {
    return state.set('levelInfo', levelInfo);
  }


}