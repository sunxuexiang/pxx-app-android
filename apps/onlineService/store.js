import { msg, Store } from 'plume2';
import { config } from 'wmkit/config';
import * as webApi from './webapi';
import aliChatActor from './actor/alichat-actor';

export default class AppStore extends Store {

  bindActor() {
    return [new aliChatActor()];
  }

  /**
   * 获取阿里云聊天窗url
   */
  init = async (aliChatUrl) => {
    this.dispatch('aliChat:aliChatUrl', aliChatUrl);
  };

}
