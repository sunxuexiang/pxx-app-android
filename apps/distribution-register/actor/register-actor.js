/**
 * Created by feitingting on 2017/7/13.
 */
import { Action, Actor } from 'plume2';
import { fromJS } from 'immutable';


export default class RegisterActor extends Actor {
  defaultState() {
    return {
      inviteCode: '', //邀请码
      reisterLimitType: 0, //注册限制，0：不限，1：邀请码
        openFlag:0, //是否开启社交分销,0:否，1：是
        //登录成功后的回调函数，作为全局state存储
        callBack: () => {},

    };
  }

  /**
   *设置邀请码
   * @param state
   * @param {string} inviteCode
   */
  @Action('set:inviteCode')
  setInviteCode(state, inviteCode) {
    return state.set('inviteCode', inviteCode);
  }

  /**
   * 注册限制，0：不限，1：邀请码
   * @param state
   * @param reisterLimitType
   */
  @Action('set:reisterLimitType')
  setReisterLimitType(state, data) {
    return state.set('reisterLimitType', fromJS(data).get('reisterLimitType')).set('openFlag', fromJS(data).get('openFlag'));
  }
}
