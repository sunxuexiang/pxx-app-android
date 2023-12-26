import { Store, msg } from 'plume2';
import * as WMkit from 'wmkit/kit';
import { config } from 'wmkit/config';
import {Keyboard, Platform} from 'react-native'
import { fromJS } from 'immutable';
import SettingsActor from './actor/settings-actor';
import * as webapi from './webapi';

export default class AppStore extends Store {
  constructor(props) {
    super(props);
  }

  bindActor() {
    return [new SettingsActor()];
  }

  /**
   * 初始化
   */
  init = async () => {
    const res = await Promise.all([
      webapi.fetchCustomerCenterInfo(),
      webapi.getAppShareSetting(),
      webapi.fetchBaseConfig(),
      webapi.fetchPrivacyPolicyConfig()
    ]);
    //初始化隐私政策协议
    this.dispatch('agree:privacyPolicyContent', res[3].context && res[3].context.privacyPolicy ? res[3].context.privacyPolicy : '');
    // 注册协议
    this.dispatch('agree:registerContent', res[2].context && res[2].context.registerContent ? res[2].context.registerContent : '')
    if (
      res[0].code === config.SUCCESS_CODE &&
      res[1].code === config.SUCCESS_CODE
    ) {
      this.dispatch('init', {
        customer: fromJS(res[0].context),
        shareInfo: fromJS(res[1].context)
      });
    }
    //版本信息
    this.upgradeSetting();
  };

  /**
   * 检查更新
   */
  upgradeSetting = () => {
    webapi.fetchUpgradeInfo().then((res) => {
      const { code, context } = res;
      if (code == config.SUCCESS_CODE) {
        if (context) {
          context.oldVersion = context.latestVersion;
          context.dotShow = false;
          //新版本号和旧版本号不一样，则提示更新
          if (Platform.OS === 'android' && config.CURRENT_VERSION !== context.latestVersion) {
            context.oldVersion = config.CURRENT_VERSION;
            context.dotShow = true;
          }
          this.dispatch('set: upgrade: info', context);
        }
      }
    });
  };

  /**
   * 修改弹窗可见性
   */
  changeModelVisible = async (flag) => {
    this.dispatch('change:modal:visible', flag);
  };

  /**
   * 图文分享弹窗显示隐藏
   */
  changeImgShareVisible = (flag) => {
    this.dispatch('change:img:share:visible', flag);
  };

  /**
   * 退出账号
   */
  logout = () => {
    WMkit.logout();
    if(window.needLogin) {
      msg.emit('router: replace', {
        routeName: 'Login'
      });
    }else {
      msg.emit('router: back');
    }
  };
  // 切换用户注册协议
  userRegistrationAgreement = () => {
    Keyboard.dismiss();
    this.dispatch('loginModal:userRegistrationAgreement');
  }
  // 切换隐私政策登录显示
  toggleShowPrivacyPolicyAgreement = () => {
    Keyboard.dismiss();
    this.dispatch('loginModal:toggleShowPrivacyPolicyAgreement');
  };
}
