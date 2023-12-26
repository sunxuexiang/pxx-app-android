import AsyncStorage from '@react-native-community/async-storage';
import { Store, msg } from 'plume2';
import * as webapi from './webapi';
import { cache } from 'wmkit/cache';
import * as WMkit from 'wmkit/kit';
import { config } from 'wmkit/config';

import SafeMobileActor from './actor/safe-mobile-actor';

export default class AppStore extends Store {
  bindActor() {
    return [new SafeMobileActor()];
  }
  constructor(props) {
    super(props);
  }

  /**
   * 初始化原绑定手机号
   * @returns {Promise<void>}
   */
  init = async () => {
    const res = await webapi.findCustomerMobile();
    if (res.code == config.SUCCESS_CODE) {
      this.dispatch('mobile:init', res.context);
    }
  };

  /**
   * 获取验证码
   * @param value
   */
  getCode = (value) => {
    this.dispatch('mobile:code', value);
  };

  /**
   * 发送验证码
   * @returns {Promise<Result<ReturnResult>>}
   */
  sendCode = () => {
    const mobile = this.state().get('mobile');
    return webapi.sendCode(mobile).then((res) => {
      const { code, message } = res;
      if (code == config.SUCCESS_CODE) {
        this.dispatch('mobile:isValid', true);
        msg.emit('app:tip', '验证码已发送，请注意查收');
      } else {
        msg.emit('app:tip', message);
        return Promise.reject(message);
      }
    });
  };

  /**
   * 下一步 验证输入的验证码对不对
   * @returns {Promise<boolean>}
   */
  doNext = async () => {
    const mobile = this.state().get('mobile');
    const verifiedCode = this.state().get('code');
    if (WMkit.testTel(mobile)) {
      if (verifiedCode == '') {
        msg.emit('app:tip', '请填写验证码');
      } else {
        const res = await webapi.testCode(mobile, verifiedCode);
        if (res.code == 'K-000000') {
          //验证码校验成功，跳转到下一步页面
          msg.emit('router: goToNext', { routeName: 'UserPhoneSubmit' });
          AsyncStorage.setItem(cache.OLD_VERIFY_CODE, res.context);
        } else {
          msg.emit('app:tip', res.message);
        }
      }
    }
  };
}
