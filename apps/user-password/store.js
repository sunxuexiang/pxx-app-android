import AsyncStorage from '@react-native-community/async-storage';
import { Store, msg } from 'plume2';
import { fromJS } from 'immutable';
import { cache } from 'wmkit/cache';
import * as WMkit from 'wmkit/kit';

import * as webapi from './webapi';
import SafePassActor from './actor/safepass-actor';

export default class AppStore extends Store {
  bindActor() {
    return [new SafePassActor()];
  }

  /**
   * 初始化，判断当前是否是登录状态
   * 登录，修改密码，查询当前手机号，否则，忘记密码
   * @returns {Promise<void>}
   */
  init = async () => {
    WMkit.isLogin().then((result) => {
      if (result) {
        webapi.findCustomerMobile().then((res) => {
          if (res.code === 'K-000000') {
            this.transaction(() => {
              this.dispatch('safepass:isLogin', result);
              this.dispatch(
                'safepass:mobile',
                fromJS(res.context).get('customerAccount')
              );
            });
          }
        });
      }
    });
  };

  getMobile = (value) => {
    this.dispatch('safepass:mobile', value);
  };

  getCode = (value) => {
    this.dispatch('safepass:code', value);
  };

  sendCode = async () => {
    const mobile = this.state().get('mobile');
    return webapi.sendCode(mobile, !this.state().get('isLogin')).then((res) => {
      const { code, message } = res;
      if (code == 'K-000000') {
        msg.emit('app:tip', '验证码已发送，请注意查收！');
      } else {
        msg.emit('app:tip', message);
        return Promise.reject(message);
      }
    });
  };

  /**
   * 处理下一步
   * @returns {Promise.<boolean>}
   */
  doNext = async () => {
    const mobile = this.state().get('mobile');
    const verticode = this.state().get('code');
    if (WMkit.testTel(mobile)) {
      if (verticode == '') {
        msg.emit('app:tip', '请填写验证码');
        return false;
      } else {
        const { code, message, context } = await webapi.testCode(
          mobile,
          verticode,
          !this.state().get('isLogin')
        );
        if (code == 'K-000000') {
          //验证码校验成功，跳转至下一个页面
          msg.emit('router: goToNext', { routeName: 'UserPasswordSubmit' });
          //验证码和customerId写入本地缓存
          AsyncStorage.setItem(cache.FORGET_CODE, verticode);
          AsyncStorage.setItem(cache.CUSTOMER_ID, context);
        } else {
          msg.emit('app:tip', message);
          return false;
        }
      }
    }
  };
}
