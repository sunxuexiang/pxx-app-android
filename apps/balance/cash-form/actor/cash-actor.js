import { Action, Actor } from 'plume2';

export default class CashActor extends Actor {
  defaultState() {
    return {
      // 我的余额，提现金额
      myBalance: 0,
      // 我的今日已提现金额
      alreadyDrawCash: 0,
      // 支付密码输入框是否显示
      pwdModalVisible: false,
      // 提现内容
      customerDrawCashInfo: {
        drawCashAccountName: '',
        drawCashSum: 0,
        drawCashRemark: '',
        //支付密码
        payPasssword: ''
      },
      // 支付密码
      payPassword: '',
      // 支付密码错误冻结后是否已过30分钟
      checkPayPwdRes: true,
      // 支付密码错误次数
      payPwdErrorTime: 0,
      // 绑定的微信昵称
      nickName: '',
      // 绑定的微信头像
      headImgUrl: ''
    };
  }

  /**
   * 获取提现金额数
   */
  @Action('cash:form:money')
  getMoney(state, val) {
    return state.set('myBalance', val);
  }

  /**
   * 我的今日已提现金额
   */
  @Action('cash:form:draw:money')
  getDrawMoney(state, val) {
    return state.set('alreadyDrawCash', val);
  }

  /**
   * 修改提现内容
   */
  @Action('cash:form:draw:info')
  changeCustomerDrawCashInfo(state, changeValue) {
    return state.setIn(
      ['customerDrawCashInfo', changeValue['key']],
      changeValue['value']
    );
  }

  /**
   * 支付密码输入框是否显示
   */
  @Action('cash:form:modal:visible')
  passWordShow(state, val) {
    return state.set('pwdModalVisible', val);
  }

  /**
   * 输入支付密码
   */
  @Action('cash:form:pwd:set')
  changePayPwd(state, val) {
    return state.set('payPassword', val);
  }

  /**
   * 支付密码错误冻结后是否已过30分钟
   */
  @Action('cash:form:pwd:error:flag')
  checkPayPwdRes(state, checkPayPwdRes) {
    return state.set('checkPayPwdRes', checkPayPwdRes);
  }

  /**
   * 支付密码错误次数
   */
  @Action('cash:form:pwd:error:time')
  countPayPwdTime(state, payPwdErrorTime) {
    return state.set('payPwdErrorTime', payPwdErrorTime);
  }

  /**
   * 绑定的微信昵称
   */
  @Action('cash:form:nickname')
  setNickname(state, nickName) {
    return state.set('nickName', nickName);
  }

  /**
   * 绑定的微信头像
   */
  @Action('cash:form:head:img')
  setHeadImgUrl(state, headImgUrl) {
    return state.set('headImgUrl', headImgUrl);
  }
}
