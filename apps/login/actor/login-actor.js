/**
 * Created by feitingting on 2017/9/1.
 */
import { Actor, Action } from 'plume2';
export default class LoginActor extends Actor {
  defaultState() {
    return {
      buttonstate: false, //登录按钮是否禁用，默认不禁用
      account: '', //账号
      password: '', //密码
      isShowpwd: false, //是否显示密码
      pcLogo: '',
      buttonvalue: '',
      height: 180,
      isALogin: true,
      wxFlag: false, // 微信授权登录开关状态
      //验证码
      verificationCode: ''
    };
  }

  /**
   * 监听账号状态值
   * @param state
   * @param account
   */
  @Action('login:account')
  changeAccount(state, account) {
    return state.set('account', account);
  }

  /**
   * 监听密码状态值
   * @param state
   * @param pass
   */
  @Action('login:pass')
  changePass(state, pass) {
    return state.set('password', pass);
  }

  /**
   * 页面初始化
   * @param state
   * @param config
   */
  @Action('login:init')
  init(state, config) {
    return state
      .set('account', '')
      .set('password', '')
      .set('pcLogo', config.url);
  }

  /**
   * 设置微信授权登录状态
   */
  @Action('login:wxFlag')
  setWxFlag(state, flag) {
    return state.set('wxFlag', flag);
  }

  /**
   * 是否显示密码
   * @param state
   * @param showpass
   */
  @Action('login:showPass')
  showPass(state, showpass) {
    return state.set('isShowpwd', !showpass);
  }

  /**
   * 账号输入框改变时，登录按钮恢复可点击状态
   * @param state
   */
  @Action('login:enableButton')
  enableButton(state) {
    return state.set('buttonstate', false);
  }

  /**
   * 将按钮设为禁用
   * @param state
   * @param value
   */
  @Action('login:buttonstate')
  buttonstate(state) {
    return state.set('buttonstate', true);
  }

  /**
   * 按钮文本
   * @param state
   * @param value
   */
  @Action('login:buttonvalue')
  buttonValue(state, value) {
    return state.set('buttonvalue', value);
  }

  @Action('login:height')
  height(state, value) {
    return state.set('height', value);
  }
  /* 切换登录方式*/
  @Action('login:loginChange')
  loginChange(state) {
    return state.set('isALogin', !state.get('isALogin'));
  }

  /**
   * 监听验证码值
   * @param state
   * @param pass
   */
  @Action('login:verificationCode')
  changeVerifyCode(state, code: string) {
    return state.set('verificationCode', code);
  }
}
