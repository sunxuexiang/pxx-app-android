import { Store, msg } from 'plume2';
import { config } from 'wmkit/config';
import { Confirm } from 'wmkit/modal/confirm';

import DetailActor from './actor/detail-actor';

export default class AppStore extends Store {
  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  bindActor() {
    return [new DetailActor()];
  }

  /**
   * tab页签切换事件
   * @param tabType
   */
  onTabChange = (tabType) => {
    this.dispatch('account:detail:field:change', {
      field: 'tabType',
      value: tabType
    });
    this.initToRefresh(true);
  };

  /**
   * 对请求数据的处理
   * @param result
   */
  dealData = (result) => {
    const { code, context, message } = result;
    if (context && context['first']) {
      this.initToRefresh(false);
    }
    if (code != config.SUCCESS_CODE) {
      Confirm({
        text: message,
        okFn: () => msg.emit('router: goToNext', { routeName: 'UserCenter' }),
        okText: '确定'
      });
    }
  };

  /**
   * 存储wmlistview组件的初始化方法,用于刷新
   * @param _init
   */
  initToRefresh = (flag) => {
    this.dispatch('account:detail:field:change', {
      field: 'toRefresh',
      value: flag
    });
  };
}
