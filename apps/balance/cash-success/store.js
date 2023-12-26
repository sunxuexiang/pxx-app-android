import { Store } from 'plume2';

export default class AppStore extends Store {
  /**
   * 初始化数据
   */
  init = async () => {};

  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  bindActor() {
    return [];
  }
}
