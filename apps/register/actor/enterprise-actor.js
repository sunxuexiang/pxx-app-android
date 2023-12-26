import { Actor, Action } from 'plume2';
export default class EnterpriseActor extends Actor {
  defaultState() {
    return {
      //是否购买了企业购服务
      iepFlag:true
    };
  }

  /**
   * 设置是否显示企业购服务
   */
  @Action('enterprise:iepFlag')
  setWxFlag(state, flag) {
    return state.set('iepFlag', flag);
  }
}
