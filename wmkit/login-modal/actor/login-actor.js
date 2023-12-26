import { Actor, Action } from 'plume2';
export default class LoginActor extends Actor {
  defaultState() {
    return {
      isCheck:false,
      account: '', //账号
      password: '', //密码
      isShowpwd: false, //是否显示密码
      buttonstate: false, //登录按钮的disable值
      buttonvalue: '',
      pcLogo: '',
      accountChange: true,
      errorPress: false,
      isALogin: true,
      wxFlag: false, // 微信授权登录开关
      //验证码
      verificationCode: '',
      //弹框默认不显示
      modalVisible: false,
      //显示登录
      showLogin: true,
      //显示企业注册
      showEnterprise:false,
      //登录成功后的回调函数，作为全局state存储
      callBack: () => {},
      showImproveInfo: false,
      showEnterpriseMoreInfo:false,
      enterpriseCheckState:'',
      enterpriseCheckTip:'',
      enterpriseButtonFlag:true
    };
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
      .set('pcLogo', config.url)
      .set('showLogin', true)
      .set('isALogin', true)
      .set('showImproveInfo', false)
      .set('showEnterprise', false)
      .set('showEnterpriseMoreInfo',false);
  }

  /**
   * 设置微信授权登录开关
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
   * 监听账号状态值
   * @param state
   * @param account
   */
  @Action('login:account')
  changeAccount(state, account) {
    return state.set('account', account);
  }

  /**
   * 通过键码判断输入的账号内容是否是纯数字，若不是，则禁止输入
   * @param state
   * @param error
   */
  @Action('login:errorPress')
  errorPress(state, error) {
    return state.set('errorPress', error);
  }

  /**
   * 监听密码状态值
   * @param state
   * @param pass
   */
  @Action('login:password')
  changePsw(state, pass) {
    return state.set('password', pass);
  }

  /**
   * 监听账户状态是否变化，防止输入时值不变页面不重新渲染，主要是为了限制文本框的输入
   * @param state
   * @param change
   */
  @Action('login:accountChange')
  accountChange(state, change) {
    return state.set('accountChange', !change);
  }

  /**
   * 监听按钮状态，启用还是禁用
   * @param state
   */
  @Action('login:buttonstate')
  buttonState(state) {
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

  @Action('login:enableButton')
  enableButton(state) {
    return state.set('buttonstate', false);
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
  changeVerifyCode(state, code) {
    return state.set('verificationCode', code);
  }

  /**
   * 弹框显示隐藏
   * @param state
   * @param visible
   */
  @Action('loginModal:toggleVisible')
  toggleVisible(state, { visible, callBack }) {
    //回调为true的时候传入回调，为false不做任何操作
    if (callBack) {
      return state.set('modalVisible', visible).set('callBack', callBack);
    } else {
      return state.set('modalVisible', visible);
    }
  }

  @Action('loginModal:toggleLogin')
  toggleLogin(state) {
    return state.set('showLogin', !state.get('showLogin'));
  }

  @Action('loginModal:initPage')
  initPage(state) {
    return state.set('showLogin', true).set('isLogin', true).set('showEnterprise',false);
  }

  @Action('show:showImproveInfo')
  showImproveInfo(state) {
    return state.set('showImproveInfo', true);
  }

  @Action('loginModal:toggleLogin')
  toggleLogin(state) {
    return state.set('showLogin', !state.get('showLogin'));
  }

  @Action('loginModal:toggleEnterprise')
  toggleEnterprise(state) {
    return state.set('showEnterprise', !state.get('showEnterprise'));
  }

  @Action('loginModal:showEnterpriseMoreInfo')
  showEnterpriseMoreInfo(state) {
    return state.set('showEnterpriseMoreInfo', !state.get('showEnterpriseMoreInfo'));
  }

  //控制部分显示框的值变化
  @Action('field:loginActorValue')
  setLoginActorFieldValue(state, { field, value }) {
    return state.set(field, value);
  }
  // 改变多选
  @Action('login:isCheck')
  changeLoginCheck(state){
    return state.set('isCheck',!state.get('isCheck'))
  }
}
