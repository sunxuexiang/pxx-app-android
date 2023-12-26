/**
 * Created by cl on 2019/4/15.
 */
import { Store, msg } from 'plume2';
import { Keyboard } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { config } from 'wmkit/config';
import { cache } from 'wmkit/cache';
import * as WMkit from 'wmkit/kit';
import * as webapi from './webapi';
import SafepassNextActor from './actor/safepass-next-actor';

export default class AppStore extends Store {
  bindActor() {
    return [new SafepassNextActor()];
  }

  constructor(props) {
    super(props);
    //debug
    window._store = this;
  }

  /**
   * 初始化方法，保存是否是修改密码标识
   * @param forget
   */
  init = (forget) => {
    this.dispatch('paypassnext:init', forget);
  };

  /**
   * 新密码赋值
   * @param pass
   */
  getNewPass = (pass: string) => {
    this.dispatch('paypassnext:newpass', pass);
  };

  /**
   * 是否显示密码
   */
  showPwd = () => {
    this.dispatch('paypassnext:showpass', this.state().get('isShowpwd'));
  };

  /**
   * 保存设置密码
   * @returns {Promise<void>}
   */
  updatePass = async () => {
    // 收起键盘
    Keyboard.dismiss();
    const newpass = this.state().get('password');
    const forget = this.state().get('forget');
    const vertiCode = await AsyncStorage.getItem(cache.PAY_OLD_VERIFY_CODE);
    const customerId = await AsyncStorage.getItem(cache.CUSTOMER_ID);
    if (WMkit.testPass(newpass)) {
      const { code, message } = await webapi.updatePass(
        customerId,
        vertiCode,
        newpass,
        forget
      );
      if (code == config.SUCCESS_CODE) {
        msg.emit('app:tip', '设置成功！');
        setTimeout(() => {
          // msg.emit('router: goToNext', { routeName: 'UserSafe' });
          msg.emit('router: back');
        }, 1000);
      } else {
        msg.emit('app:tip', message);
      }
    }
  };
}
