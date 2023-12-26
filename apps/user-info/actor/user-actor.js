/**
 * Created by hht on 2017/9/4.
 */
import { Actor, Action } from 'plume2';
import { fromJS } from 'immutable';

export default class UserStoreActor extends Actor {
  defaultState() {
    return {
      userInfo: {},
      rewardFlag: false,
      growthValues: {
        // 完善信息所得积分
        point: 0,
        // 完善信息送积分开关
        pointFlag: false,
        // 完善信息送成长值开关
        growthFlag: false,
        // 完善信息所得成长值
        growthValue: 0
      },
      giftModalShow: false,
      // 成长值总开关
      growthValueIsOpen: false,
      // 积分总开关
      pointsIsOpen: false
    };
  }

  /**
   * 初始化数据
   * @param state
   * @param customer
   * @returns {Map<string, V>}
   */
  @Action('user:getUserInfo')
  init(state, content) {
    return state.set('userInfo', fromJS(content));
  }

  /**
   * 用于store实现页面跳转
   * @param state
   * @param content
   */
  @Action('user:setUserInfo')
  setUserInfo(state, content) {
    return state.setIn(content['key'], content['value']);
  }

  @Action('user:rewardFlag')
  setRewardFlag(state, rewardFlag) {
    return state.set('rewardFlag', rewardFlag);
  }

  @Action('user:initGrowthValues')
  initGrowthValues(state, growthValues) {
    return state.set('growthValues', fromJS(growthValues));
  }

  @Action('user:giftModalShow')
  setGiftModalShow(state, flag) {
    return state.set('giftModalShow', flag);
  }

  /**
   * 积分值开关
   */
  @Action('user:info:pointsIsOpen')
  pointsIsOpen(state) {
    return state.set('pointsIsOpen', true);
  }

  /**
   * 成长值开关
   */
  @Action('user:info:growthValueIsOpen')
  growthValueIsOpen(state) {
    return state.set('growthValueIsOpen', true);
  }
}
