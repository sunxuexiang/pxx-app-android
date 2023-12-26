import { msg, Store } from 'plume2';
import { fromJS } from 'immutable';
import * as webapi from './webapi';
import StoreActor from './actor/store-actor';

export default class AppStore extends Store {
  bindActor() {
    return [new StoreActor()];
  }

  constructor(props) {
    super(props);
    if (__DEV__) {
      //debug
      window._store = this;
    }
  }

  init = () => {};


  /**
   * tab切换
   */
  tabActive = async (tabKey) => {
    this.dispatch('tab:history', tabKey);
    // 先清除搜索纪录，防止后端响应时间过长导致tab已切换，但是搜索内容还没切换
    this.dispatch('search:history', fromJS([]));
    this.getHistory();
    this.dispatch('search:queryString', '');
  };
}
