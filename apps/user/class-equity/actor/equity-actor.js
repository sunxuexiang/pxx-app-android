import { Action, Actor } from 'plume2';
import { fromJS } from 'immutable';

export default class EquityActor extends Actor {
  defaultState() {
    return {
      // 等级数据
      levelList: [],
      //当前的等级
      currentLevel: 1,
      //列表数据
      equityList: [],

      isLastOne: false, //是否是最高等级
      headerGradeList: [],// 头部滑动区域使用的等级列表数据
      gradeList: [],
      levelInfo: {}, //等级信息栏
      atPresentEquityNum: null,
      isDomComplete: false
      // atPresentEquity:[]//权益列表
    };
  }

  /**
   * 获取等级数据
   */
  @Action('get: levelData')
  changeCateMask(state, val) {
    return state.set('levelList', fromJS(val));
  }

  /**
   * 当前等级
   */
  @Action('get: currentData')
  currentData(state, val) {
    return state.set('currentLevel', val);
  }

  /**
   * 列表数据
   */
  @Action('get: equityList')
  equityList(state, val) {
    return state.set('equityList', fromJS(val));
  }

  /**
   * 是不是最高等级
   */
  @Action('equity: isLastOne')
  isLastOne(state) {
    return state.set('isLastOne', true);
  }

  /**
   * 等级列表
   */
  @Action('equity: gradeList')
  setGradeList(state, gradeList) {
    return state.set(
      'headerGradeList',
      gradeList.map((g) => {
        return fromJS({
          customerLevelName: g.get('customerLevelName'),
          rankBadgeImg: g.get('rankBadgeImg')
        });
      })
    ).set('gradeList', gradeList);
  }

  /**
   * 等级列表
   */
  @Action('equity: levelInfo')
  levelInfo(state, levelInfo) {
    return state.set('levelInfo', levelInfo);
  }

  /**
   * 当前轮播是第几个
   */
  @Action('equity: atPresentEquityNum')
  atPresentEquityNum(state, atPresentEquityNum) {
    return state.set('atPresentEquityNum', atPresentEquityNum);
  }

  /**
   * 当前轮播是第几个
   */
  @Action('equity: isDomComplete')
  isDomComplete(state) {
    return state.set('isDomComplete', true);
  }
}
