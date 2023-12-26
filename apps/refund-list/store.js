import { Store, msg } from 'plume2';
import * as webApi from './webapi';

import RefundListActor from './actor/refund-list-actor';

/**
 * Created by bail on 2017/9/14.
 */
export default class AppStore extends Store {
  constructor(props) {
    super(props);
  }

  bindActor() {
    return [new RefundListActor()];
  }

  /**
   * 切换tab
   * @param tabKey
   */
  onTabChange = (tabKey) => {
    this.dispatch('tab:change', tabKey);
  };

  /**
   * 存储wmlistview组件的初始化方法,用于刷新
   * @param _init
   */
  initToRefresh = (_init) => {
    this.dispatch('tab:save:refresh', _init);
  };

  /**
   * 取消退单
   * @param rid
   * @returns {Promise<TResult|TResult2|TResult1>}
   */
  cancel = async (rid) => {
    const { code, message } = await webApi.cancel(rid, '用户取消');
    if (code == 'K-000000') {
      msg.emit('app:tip', '成功取消退单');
      this.state().get('toRefresh')();
    } else {
      msg.emit('app:tip', message || '操作失败');
    }
  };
}
