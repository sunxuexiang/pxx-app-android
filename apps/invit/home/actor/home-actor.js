import { Action, Actor } from 'plume2';
import { List, fromJS } from 'immutable';

export default class HomeActor extends Actor {
  defaultState() {
    return {
      // 详细说明状态
      detailVisible: false,
      // 邀请好友状态
      invitPop: false,
      // 是否分销员
      isDistributor: false,
      //详细说明富文本内容
      detailList: [],
      picture: '',
      totalNum: 0,
      miniProgramCode: '', // 小程序码
      friends: [], // 已邀请好友
      setting: fromJS({}),
      dSetting: fromJS({}),
      //邀请注册吗
      inviteCode: ''
    };
  }

  /**
   * 详细说明弹窗显示隐藏
   */
  @Action('homeActor:changeLayout')
  changeLayout(state, val) {
    return state.set('detailVisible', val);
  }

  /**
   * 邀请好友pop显示隐藏
   */
  @Action('homeActor:invitPop')
  invitPop(state, val) {
    return state.set('invitPop', val);
  }

  /**
   * 获取详细说明内容
   */
  @Action('InvitActor:getDetailData')
  getDetailData(state, val) {
    return state.set('detailList', val);
  }

  /**
   * 初始化分销配置信息
   * @param state
   * @param setting
   */
  @Action('InvitActor:initDistributionSetting')
  initDistributionSetting(state, res) {
    return state.set('setting', fromJS(res));
  }

  /**
   * 更新已邀请好友信息
   * @param {IMap} state
   * @param {Array<any>} params
   * @returns {any}
   */
  @Action('InvitActor:setFriends')
  updateFriends(state: IMap, params: Array<any>) {
    return state.update('friends', (value: List<any>) => {
      return value.push(...params);
    });
  }

  /**
   * 更新已邀请总人数
   * @param state
   * @param totalNum
   */
  @Action('InvitActor:setTotalNum')
  setTotalNum(state, totalNum) {
    return state.set('totalNum', totalNum);
  }

  /**
   * 当前用户是否分销员
   * @param state
   * @param isDistributor
   */
  @Action('InvitActor:isDistributor')
  isDistributor(state, isDistributor) {
    return state.set('isDistributor', isDistributor);
  }

  /**
   * 分销设置信息
   * @param state
   * @param res
   */
  @Action('distributeActor:setting')
  DistributionSetting(state, res) {
    return state.set('dSetting', fromJS(res));
  }

  @Action('homeActor:inviteCode')
  inviteCode(state, code) {
    return state.set('inviteCode', code);
  }
}
