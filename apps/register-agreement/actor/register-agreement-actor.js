import { Action, Actor } from 'plume2';

export default class RegisterAgreementActor extends Actor {
  defaultState() {
    return {
      //商品详情
      agreementString: ''
    };
  }

  /**
   * 获取协议内容
   * @param state
   * @param content
   * @returns {any}
   */
  @Action('agreement:getContent')
  getContent(state, content) {
    return state.set('agreementString', content);
  }
}
