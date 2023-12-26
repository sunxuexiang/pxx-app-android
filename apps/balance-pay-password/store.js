import { msg, Store } from 'plume2';
import AsyncStorage from '@react-native-community/async-storage';
import { fromJS } from 'immutable';
import { Alert } from 'wmkit/modal/alert';
import { cache } from 'wmkit/cache';
import { config } from 'wmkit/config';
import * as WMkit from 'wmkit/kit';

import * as webapi from './webapi';
import SafepassActor from './actor/safepass-actor';

export default class AppStore extends Store {
  bindActor() {
    return [new SafepassActor()];
  }

  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  /**
   * 初始化，判断当前是否是登录状态
   * 登录，修改密码，查询当前手机号，否则，忘记密码
   * @returns {Promise<void>}
   */
  init = async (type) => {
    if (WMkit.isLogin()) {
      const res = await webapi.findCustomerMobile();
      if (res.code == config.SUCCESS_CODE) {
        this.dispatch(
          'paypass:mobile',
          fromJS(res.context).get('customerAccount')
        );
        this.dispatch('paypass:type', type);
      }
    }
  };

  /**
   * 验证码变更
   * @param value
   */
  getCode = (value) => {
    this.dispatch('paypass:code', value);
  };

  /**
   * 发送验证码
   * @returns {Promise<*>}
   */
  sendCode = async () => {
    const mobile = this.state().get('mobile');
    const forget = this.state().get('forget');
    return webapi.sendCode(mobile, forget).then((res) => {
      const { code, message } = res;
      if (code == config.SUCCESS_CODE) {
        msg.emit('app:tip', '验证码已发送，请注意查收！');
      } else {
        msg.emit('app:tip', message);
        return Promise.reject(message);
      }
    });
  };

  /**
   * 点击下一步时，验证发送的验证码
   * @returns {Promise<boolean>}
   */
  doNext = async () => {
    const mobile = this.state().get('mobile');
    const verticode = this.state().get('code');
    const forget = this.state().get('forget');
    if (WMkit.testTel(mobile)) {
      if (WMkit.testVerificationCode(verticode)) {
        const { code, message, context } = await webapi.testCode(
          mobile,
          verticode,
          forget
        );
        if (code == config.SUCCESS_CODE) {
          //验证码校验成功，跳转到下一个页面
          msg.emit('router: replace', {
            routeName: 'PayPasswordNext',
            forget: forget
          });
          //验证码和customerId写入localstorage
          AsyncStorage.setItem(cache.PAY_OLD_VERIFY_CODE, verticode);
          AsyncStorage.setItem(cache.CUSTOMER_ID, context);
        } else {
          Alert({
            text: message
          });
          return false;
        }
      }
    }
  };
}
