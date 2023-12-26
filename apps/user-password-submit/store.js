/**
 * Created by feitingting on 2017/7/20.
 */
import { Store, msg } from 'plume2';
import { Keyboard } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as webapi from './webapi';
import SafePassNextActor from './actor/safepass-next-actor';
import { cache } from 'wmkit/cache';
import * as WMkit from 'wmkit/kit';
export default class AppStore extends Store {
  bindActor() {
    return [new SafePassNextActor()];
  }

  init = () => {
    WMkit.isLogin().then((result) => {
      if (result) {
        this.dispatch('safepassnext:isLogin', result);
      }
    });
  };

  getNewPass = (pass) => {
    this.dispatch('safepassnext:newpass', pass);
  };

  showPass = () => {
    this.dispatch('safepassnext:showpass', this.state().get('isShowpwd'));
  };

  /**
   * 修改密码
   * @returns {Promise.<void>}
   */
  updatePass = async () => {
    // 收起键盘
    Keyboard.dismiss();

    const newpass = this.state().get('password');
    const vertiCode = await AsyncStorage.getItem(cache.FORGET_CODE);
    const customerId = await AsyncStorage.getItem(cache.CUSTOMER_ID);
    if (WMkit.testPass(newpass)) {
      const { code, message } = await webapi.updatePass(
        customerId,
        vertiCode,
        newpass,
        !this.state().get('isLogin')
      );
      if (code == 'K-000000') {
        //清除token
        WMkit.logout();
        msg.emit('app:tip', '密码修改成功！');
        setTimeout(() => {
          msg.emit('router: goToNext', { routeName: 'Main' });
        }, 1000);
      } else {
        msg.emit('app:tip', message);
      }
    }
  };
}
