import { Store, msg } from 'plume2';
import { Confirm } from 'wmkit/modal/confirm';
import { config } from 'wmkit/config';
import CashActor from './actor/actor';
import * as webapi from './webapi';

export default class AppStore extends Store {
  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  bindActor() {
    return [new CashActor()];
  }

  /**
   * 初始化
   */
  init = async () => {
    const data = await webapi.init();
    if (data.code == config.SUCCESS_CODE) {
      const wxFlag = data.context.wxFlag;
      this.transaction(() => {
        this.dispatch('show:no:bind:tip', wxFlag);
        this.dispatch('show:loading', true);
      });
    } else {
      Confirm({
        text: data.message,
        okBtn: '确定',
        okFn: () => msg.emit('router: goToNext', { routeName: 'BalanceHome' })
      });
    }
  };
}
