import { Store } from 'plume2';

import { config } from 'wmkit/config';

import AboutUsActor from './actor/about-us-actor';
import * as webApi from './webapi';

export default class AppStore extends Store {
  bindActor() {
    return [new AboutUsActor()];
  }

  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  /**
   * 初始化关于我们
   * @returns {Promise<void>}
   */
  init = async () => {
    const res = await webApi.fetchAboutUsContext();
    const { code, context } = res;
    if (code == config.SUCCESS_CODE) {
      this.dispatch('about: us: context', context);
    }
  };
}
