import AsyncStorage from '@react-native-community/async-storage';
import { Store, msg } from 'plume2';
import { config } from 'wmkit/config';
import { cache } from 'wmkit/cache';
import * as WMkit from 'wmkit/kit';

import * as webapi from './webapi';
import SafeMobileActor from './actor/safe-mobile-actor';

export default class AppStore extends Store {
  bindActor() {
    return [new SafeMobileActor()];
  }

  constructor(props) {
    super(props);
  }

  /**
   * 获取手机号码
   * @param value
   */
  getMobile = (value) => {
    this.dispatch('mobile:newMobile', value);
  };

  /**
   * 获取验证码
   * @param value
   */
  getCode = (value) => {
    this.dispatch('mobile:code', value);
  };

  /**
   * 发送验证码给新手机号码
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
   * 提交 验证输入的验证码对不对
   * @returns {Promise<boolean>}
   */
  changeMobile = async () => {
    const mobile = this.state().get('mobile');
    const verifiedCode = this.state().get('code');
    const oldCode = await AsyncStorage.getItem(cache.OLD_VERIFY_CODE);
    if (WMkit.testTel(mobile)) {
      if (verifiedCode == '') {
        msg.emit('app:tip', '请填写验证码');
        return false;
      } else {
        const { code, message } = await webapi.testCode(
          oldCode,
          mobile,
          verifiedCode
        );
        if (code == config.SUCCESS_CODE) {
          WMkit.logout();
          msg.emit('app:tip', '修改绑定手机号成功');
          setTimeout(() => {
            msg.emit('router: goToNext', { routeName: 'Main' });
          }, 1000);
        } else {
          msg.emit('app:tip', message);
        }
      }
    }
  };
}
