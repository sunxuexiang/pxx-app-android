/**
 * Created by hht on 2017/9/13.
 */

import { Actor, Action } from 'plume2';

import { fromJS } from 'immutable';

export default class PayOrderActor extends Actor {
  defaultState() {
    return {
      trade: {},
      payChannelList: [],
      // 支付密码输入框是否显示
      pwdModalVisible: false,
      // 支付密码
      payPassword: '',
      // 支付密码错误冻结后是否已过30分钟
      checkPayPwdRes: true,
      // 支付密码错误次数
      payPwdErrorTime: 0,
      // 支付渠道
      channelItemId: 0,
      // 余额
      balance: 0
    };
  }

  @Action('payOrder:getTradeInfo')
  getTradeInfo(state, content) {
    return state.set('trade', fromJS(content));
  }

  @Action('payOrder:getPayChannel')
  getPayChannel(state, content) {
    return state.set('payChannelList', fromJS(content));
  }

  /**
   * 支付密码输入框是否显示
   */
  @Action('balance:pay:modal:visible')
  passWordShow(state, val) {
    return state.set('pwdModalVisible', val);
  }

  /**
   * 输入支付密码
   */
  @Action('balance:pay:pwd:set')
  changePayPwd(state, val) {
    return state.set('payPassword', val);
  }

  /**
   * 支付密码错误冻结后是否已过30分钟
   */
  @Action('balance:pay:pwd:error:flag')
  checkPayPwdRes(state, checkPayPwdRes) {
    return state.set('checkPayPwdRes', checkPayPwdRes);
  }

  /**
   * 支付密码错误次数
   */
  @Action('balance:pay:pwd:error:time')
  countPayPwdTime(state, payPwdErrorTime) {
    return state.set('payPwdErrorTime', payPwdErrorTime);
  }

  /**
   * 支付渠道
   */
  @Action('balance:pay:setChannelItemId')
  setChannelItemId(state, channelItemId) {
    return state.set('channelItemId', channelItemId);
  }

  /**
   * 设置用户可用余额
   */
  @Action('balance:pay:setBalance')
  setBalance(state, val) {
    return state.set('balance', val);
  }
}
