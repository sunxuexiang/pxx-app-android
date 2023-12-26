import { Store } from 'plume2';

import { config } from 'wmkit/config';

import RegisterAgreementActor from './actor/register-agreement-actor';
import * as webApi from './webapi';

export default class AppStore extends Store {
  bindActor() {
    return [new RegisterAgreementActor()];
  }

  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  /**
   * 初始化协议
   * @returns {Promise<void>}
   */
  init = async () => {
    const res = await webApi.getSiteInfo();
    if (res.code == config.SUCCESS_CODE) {
      this.dispatch('agreement:getContent', res.context.registerContent);
    }
  };
}
