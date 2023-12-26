/**
 * Created by feitingting on 2017/9/1.
 */
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { msg, Store } from 'plume2';

import * as _ from 'wmkit/common/util';
import { cache } from 'wmkit/cache';
import { config } from 'wmkit/config';
import * as thirdLogin from 'wmkit/third-login';
import * as WMkit from 'wmkit/kit';

import { mergePurchase } from 'wmkit/biz/purchase-front';
import LoginActor from './actor/login-actor';
import * as webapi from './webapi';

export default class AppStore extends Store {
  constructor(props) {
    super(props);
  }

  bindActor() {
    return [new LoginActor()];
  }

  setAccount = (value) => {
    this.transaction(() => {
      this.dispatch('login:enableButton');
      this.dispatch('login:account', value);
    });
  };

  setPass = (value) => {
    this.dispatch('login:pass', value);
  };

  /**
   * 页面初始化获取logo
   * @returns {Promise.<void>}
   */
  init = () => {
    // 1.获取pc logo
    webapi
      .fetchBaseConfig()
      .then((res) => {
        const { code, context } = res;
        if (code == config.SUCCESS_CODE) {
          this.dispatch(
            'login:init',
            context.pcLogo ? JSON.parse(context.pcLogo)[0] : { url: '' }
          );
        }
      })
      .catch((res) => {
        const { message } = res;
        msg.emit('app:tip', message);
      });

    // 2.获取授权登录状态
    webapi.fetchWxLoginStatus().then((res) => {
      const { code, context } = res;
      if (code === config.SUCCESS_CODE) {
        this.dispatch('login:wxFlag', context);
      }
    });
  };

  /**
   * 登录系统
   * @returns {Promise.<void>}
   */
  doLogin = async () => {
    // true：账号密码登录  false：验证码登录
    const isALogin = this.state().get('isALogin');
    let result = null;
    if (isALogin) {
      /**获取用户名和密码，并去除所有空格*/
      const account = this.state()
        .get('account')
        .trim();
      const password = this.state()
        .get('password')
        .trim();
      if (WMkit.testTel(account) && WMkit.testPass(password)) {
        const base64 = new WMkit.Base64();
        let encaccount = base64.urlEncode(account);
        let encpass = base64.urlEncode(password);
        const res = await webapi.login(
          encaccount,
          encpass
        );
        result = res;
      }
    } else {
      /**获取用户名和验证码，并去除所有空格*/
      const account = this.state()
        .get('account')
        .trim();
      const verificationCode = this.state()
        .get('verificationCode')
        .trim();
      if (
        WMkit.testTel(account) &&
        WMkit.testVerificationCode(verificationCode)
      ) {
        const res = await webapi.loginWithVerificationCode(
          account,
          verificationCode
        );
        result = res;
      }
    }
    const { context } = result;
    if (result.code == config.SUCCESS_CODE) {
      loginCallBack(context);
    } else if (result.code == 'K-010004') {
      //密码输错5次，按钮设灰色
      this.transaction(() => {
        this.dispatch('login:buttonstate');
        this.dispatch('login:buttonvalue', result.message);
      });
      msg.emit('app:tip', result.message);
      return;
    } else {
      msg.emit('app:tip', result.message);
      return;
    }
  };

  /**
   * 微信授信登录
   */
  wxLogin = async () => {
    const { code, appId, appSecret } = await thirdLogin.wxLogin();
    const res = await webapi.wechatAuth({ code, appId, appSecret });
    if (res.code == config.SUCCESS_CODE) {
      const { loginFlag, login, info } = res.context;
      if (loginFlag) {
        // 1.微信已经关联了账户，走正常登录流程
        loginCallBack(login);
      } else {
        // 2.微信还没有关联账户，跳填写手机号页
        msg.emit('router: goToNext', {
          routeName: 'WechatLogin',
          id: info.id
        });
      }
    } else {
      msg.emit('app:tip', res.message);
      return;
    }
  };

  /**
   * 明暗文切换
   */
  showPass = () => {
    const showpass = this.state().get('isShowpwd');
    this.dispatch('login:showPass', showpass);
  };

  /**
   * 忘记密码，清空token,页面跳转
   */
  forgetPass = () => {
    WMkit.logout();
    msg.emit('router: goToNext', { routeName: 'UserPassword' });
  };

  /*切换登录方式*/
  loginChange = () => {
    this.dispatch('login:loginChange');
  };

  /** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/
  /** ** ** ** ** ** ** ** ** ** ** ** ** * 验证码登录 * ** ** ** ** ** ** ** ** ** ** ** ** **/
  /** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/

  /**
   * 发送验证码给手机号码
   * @returns {Promise<Result<ReturnResult>>}
   */
  sendCode = (mobile) => {
    return webapi.sendCode(mobile).then((res) => {
      if (res.code === config.SUCCESS_CODE) {
        msg.emit('app:tip', '验证码已发送，请注意查收！');
      } else {
        msg.emit('app:tip', res.message);
        return Promise.reject(res.message);
      }
    });
  };

  /**
   * 输入验证码
   * @param code
   */
  setVerificationCode = (code) => {
    this.dispatch('login:verificationCode', code);
  };
}

/**
 * 登录后的通用逻辑(账户存在的情况下)
 */
export const loginCallBack = (context) => {

  /**
   * 切分支出去 是否是企业购
   * 企业购信息存在  并且状态不是 init普通会员或者 是审核通过的情况 走 完善信息页面
   */

  if (context.enterpriseCheckState && context.enterpriseCheckState !== 0 && context.enterpriseCheckState !== 2){
    msg.emit('router: goToNext', {
      routeName: 'ImproveIepInfo',
      customerId: context.customerId
    });
    return;
  }

  const customerId = context.customerId;
  //登录成功时，获取审核状态
  switch (context.checkState) {
    //待审核
    case 0:
      WMkit.logout();
      //将审核中的账户信息存入本地缓存
      AsyncStorage.setItem(
        cache.PENDING_AND_REFUSED,
        JSON.stringify(context)
      ).then(() => {
        //跳转至提交页面
        msg.emit('router: goToNext', {
          routeName: 'ImproveInformation',
          customerId
        });
        _.showRegisterModel(context.couponResponse, false);
      });
      break;
    //审核通过，成功登录，跳转至主页
    case 1:
      // 上传友盟设备devlceToken
      AsyncStorage.getItem('sbc@deviceToken').then((token)=>{
        webapi.addToken({devlceToken: token, platform: Platform.OS === 'ios'? 0 : 1});
      });

      // a.设置登陆后token以及登陆信息缓存
      window.token = context.token;
      AsyncStorage.setItem(cache.LOGIN_DATA, JSON.stringify(context));
      msg.emit('app:tip', '登录成功');
      // b.登陆成功,需要合并登录前和登陆后的购物车
      mergePurchase(null);
      // c.登陆成功,跳转拦截前的路由
      msg.emit('router: goToNext', { routeName: 'Main' });
      _.showRegisterModel(context.couponResponse, true);
      break;
    //审核未通过
    default:
      WMkit.logout();
      //将审核未通过的账户信息存入本地缓存
      AsyncStorage.setItem(
        cache.PENDING_AND_REFUSED,
        JSON.stringify(context)
      ).then(() => {
        msg.emit('router: goToNext', {
          routeName: 'ImproveInformation',
          customerId
        });
      });
  }
};
