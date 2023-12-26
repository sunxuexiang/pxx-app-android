import { Action, Actor } from 'plume2';

export default class CenterMemberActor extends Actor {
  defaultState() {
    return {
      userInfo: {}, //用户信息
      gradeList: [], //等级列表
      nextGradeInfo: {}, //下一个等级
      isLastOne: false, //是否是最后一个
      notGetGradeList: [], //当前后面所有的等级。不与上面数据合并
      nowPossessGradeInfo: {}, //当前的等级信息
      pointsAvailable: 0, //积分 值
      pointsIsOpen: false,//积分是否打开
      hotExchange: []//积分兑换
    };
  }

  /**
   * 等级类表
   */
  @Action('member-center: gradeList')
  gradeList(state, gradeList) {
    return state.set('gradeList', gradeList);
  }

  @Action('member-center: nowPossessGradeInfo')
  nowPossessGradeInfo(state, nowPossessGradeInfo) {
    return state.set('nowPossessGradeInfo', nowPossessGradeInfo);
  }

  /**
   * 用户数据
   */
  @Action('member-center: userInfo')
  userInfo(state, userInfo) {
    return state.set('userInfo', userInfo);
  }

  /**
   * 下一个等级数据
   */
  @Action('member-center: nextGradeInfo')
  nextGradeInfo(state, nextGradeInfo) {
    return state.set('nextGradeInfo', nextGradeInfo);
  }

  /**
   * 是不是最高等级
   */
  @Action('member-center: isLastOne')
  isLastOne(state, isLastOne) {
    return state.set('isLastOne', isLastOne);
  }

  /**
   * 当前后面所有的等级数据
   */
  @Action('member-center: notGetGradeList')
  nextGradeList(state, notGetGradeList) {
    return state.set('notGetGradeList', notGetGradeList);
  }

  /**
   * 积分值
   */
  @Action('userInfo: pointsAvailable')
  pointsAvailable(state, pointsAvailable) {
    return state.set('pointsAvailable', pointsAvailable);
  }

  /**
   * 是否成长值关闭了
   */
  @Action('userInfo:pointsIsOpen')
  pointsIsOpen(state) {
    return state.set('pointsIsOpen', true);
  }

  /**
  * 积分兑换
  */
  @Action('member-center: hotExchange')
  hotExchange(state, hotExchange) {
    return state.set('hotExchange', hotExchange);
  }
}
