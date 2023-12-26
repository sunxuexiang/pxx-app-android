/**
 * Created by hht on 2017/9/4.
 */
import { Actor, Action } from 'plume2';
import { fromJS } from 'immutable';

export default class SignActor extends Actor {
  defaultState() {
    return {
      userInfo: {},
      signPoint: 0,
      signRecordList: [],
      // 签到是否可以获取积分
      pointsFlag: false,
      //今天是否签到
      signFlag: false,
      // 签到是否可以获取成长值
      growthFlag: false,
      growthValue: 0,
      dayNumArr: [],
      // 成长值总开关
      growthValueIsOpen: false,
      // 积分总开关
      pointsIsOpen: false,
      // 热门兑换积分商品列表
      hotExchange: [],
    };
  }

  /**
   * 初始化数据
   * @param state
   * @param customer
   * @returns {Map<string, V>}
   */
  @Action('userInfo:set')
  init(state, content) {
    return state.set('userInfo', fromJS(content));
  }

  @Action('signPoint:set')
  initSignPoint(state, content) {
    return state.set('signPoint', content);
  }

  @Action('signRecord:list')
  initSignRecordList(state, content) {
    return state.set('signRecordList', content);
  }

  @Action('dayNumArr:set')
  setDayNumArr(state, content) {
    return state.set('dayNumArr', content);
  }

  @Action('pointsFlag: set')
  initPointsFlag(state, flag) {
    return state.set('pointsFlag', flag);
  }

  @Action('signFlag: change')
  setSignFlag(state, flag) {
    return state.set('signFlag', flag);
  }

  @Action('growthFlag: set')
  setGrowthFlag(state, flag) {
    return state.set('growthFlag', flag);
  }

  @Action('growthValue: set')
  setGrowthValue(state, content) {
    return state.set('growthValue', content);
  }

  /**
   * 积分值开关
   */
  @Action('sign:pointsIsOpen')
  pointsIsOpen(state) {
    return state.set('pointsIsOpen', true);
  }

  /**
   * 成长值开关
   */
  @Action('sign:growthValueIsOpen')
  growthValueIsOpen(state) {
    return state.set('growthValueIsOpen', true);
  }

  @Action('hotExchange:set')
  hotExchange(state, content) {
    return state.set('hotExchange', content);
  }
}
