import { Action, Actor } from 'plume2';

export default class InquiryActor extends Actor {
  defaultState() {
    return {
      aliChatUrl: '' // 阿里云聊天窗口地址
    };
  }

  /**
   * 初始化url
   */
  @Action('aliChat:aliChatUrl')
  initUrl(state, aliChatUrl) {
    return state.set('aliChatUrl', aliChatUrl);
  }
}
