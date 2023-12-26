import { Store, msg } from 'plume2';
import { Confirm } from 'wmkit/modal/confirm';
import { config } from 'wmkit/config';
import DetailActor from './actor/actor';
import { init } from './webapi';

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
   * 初始化
   */
  init = async () => {
    const data = await init();
    if (data.code == config.SUCCESS_CODE) {
      this.dispatch('set:amount', data.context);
    } else {
      Confirm({
        text: data.message,
        okBtn: '确定',
        okFn: () =>
          msg.emit('router: goToNext', {
            routeName: 'UserCenter'
          })
      });
    }
  };
}
