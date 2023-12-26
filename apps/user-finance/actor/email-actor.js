import { Action, Actor } from 'plume2';

export default class EmailActor extends Actor {
  defaultState() {
    return {
      // 是否展示财务邮箱列表
      showEmailList: false
    };
  }

  /**
   * 修改财务邮箱是否展示
   */
  @Action('email:list:show')
  showEmailList(state, flag) {
    return state.set('showEmailList', flag);
  }
}
