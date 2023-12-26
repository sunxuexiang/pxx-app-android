import { Store, msg } from 'plume2';
import { config } from 'wmkit/config';
import FormRegexUtil from 'wmkit/form/form-regex';

import IndexActor from './actor/index';
import actionType from './action-type';
import * as webapi from './webapi';
import { loginCallBack } from '../login/store';

export default class AppStore extends Store {
  bindActor() {
    return [new IndexActor()];
  }

  /**
   * 初始化
   */
  init = (id) => {
    this.dispatch(actionType.INIT, id);
  };

  /**
   * 改变手机号
   */
  changePhone = (phone) => {
    this.dispatch(actionType.CHANGE_PHONE, phone);
  };

  /**
   * 改变验证码
   */
  changeCode = (code) => {
    this.dispatch(actionType.CHANGE_CODE, code);
  };

  /**
   * 发送验证码
   */
  sendCode = async () => {
    const res = await webapi.sendCode({
      id: this.state().get('id'),
      phone: this.state().get('phone')
    });
    if (res.code != config.SUCCESS_CODE) {
      msg.emit('app:tip', res.message);
      return Promise.reject(res.message);
    }
  };

  /**
   * 绑定
   */
  bind = async () => {
    // 1.验证手机号、验证码
    if (
      !FormRegexUtil(this.state().get('phone'), '手机号码', {
        required: true,
        regexType: 'mobile'
      }) ||
      !FormRegexUtil(this.state().get('code'), '验证码', { required: true })
    ) {
      return;
    }
    // 2.调用绑定接口
    const res = await webapi.weChatBind({
      id: this.state().get('id'),
      phone: this.state().get('phone'),
      verifyCode: this.state().get('code')
    });
    // 3.根据不同结果进行处理
    if (res.code == config.SUCCESS_CODE) {
      loginCallBack(res.context);
    } else {
      msg.emit('app:tip', res.message);
    }
  };
}
