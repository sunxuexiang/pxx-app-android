import { Store, msg } from 'plume2';
import IndexActor from './actor/index';

import { config } from 'wmkit/config';
import { Confirm } from 'wmkit/modal/confirm';
import * as thirdLogin from 'wmkit/third-login';

import * as webapi from './webapi';
import actionType from './action-type';

export default class AppStore extends Store {
  bindActor() {
    return [new IndexActor()];
  }
  constructor(props) {
    super(props);
  }

  /**
   * 初始化
   */
  init = async () => {
    const res = await webapi.queryLinkedAccountFlags();
    if (res.code == config.SUCCESS_CODE) {
      this.dispatch(actionType.SET_WX_FLAG, res.context.wxFlag);
    } else {
      msg.emit('app:tip', res.message);
    }
  };

  /**
   * 绑定微信
   */
  wxBind = async () => {
    const { code, appId, appSecret } = await thirdLogin.wxLogin();
    const res = await webapi.wxBind({ code, appId, appSecret, type: 'app' });
    if (res.code == config.SUCCESS_CODE) {
      msg.emit('app:tip', '您已绑定成功');
      this.dispatch(actionType.SET_WX_FLAG, true);
    } else {
      msg.emit('app:tip', res.message);
    }
  };

  /**
   * 解绑微信
   */
  wxUnBind = () => {
    Confirm({
      title: '您是否要解除绑定？',
      text: '解除后将无法使用快捷登录',
      cancelText: '取消',
      okText: '解除',
      okFn: async () => {
        const res = await webapi.thirdUnbind('WECHAT');
        if (res.code == config.SUCCESS_CODE) {
          this.dispatch(actionType.SET_WX_FLAG, false);
          msg.emit('app:tip', '解除绑定成功');
        } else {
          msg.emit('app:tip', res.message);
        }
      }
    });
  };
}
