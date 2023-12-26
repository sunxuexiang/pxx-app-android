/**
 * Created by hht on 2017/9/13.
 */
import { NativeModules, Platform } from 'react-native';

import { msg, Store } from 'plume2';

import { Alert } from 'wmkit/modal/alert';
import { config } from 'wmkit/config';
import { Confirm } from 'wmkit/modal/confirm';
import * as WMkit from 'wmkit/kit';

import PayOrderActor from './actor/pay-order-actor';
import * as webapi from './webapi';
import {
  checkCustomerPayPwd,
  getLoginCustomerInfo
} from '../balance/cash-form/webapi';

export default class AppStore extends Store {
  bindActor() {
    return [new PayOrderActor()];
  }

  constructor(props) {
    super(props);
    //debug
    window._store = this;
  }

  init = async (tradeId, results) => {
    if (tradeId) {
      // 单笔订单支付，查询订单信息放入trade对象
      await this.getTradeInfo(tradeId);
    } else {
      // 合并支付，将订单合并信息放入trade对象
      this.dispatch('payOrder:getTradeInfo', {
        parentTid: results[0].parentTid,
        orderTimeOut: results[0].orderTimeOut,
        tid:results[0].tid,
        price: results.reduce((a, b) => a + b.price, 0)
      });
    }
    this.getPayChannel();
    this._fetchBalance();
  };

  /**
   * 获取支付详情
   * @param tradeId
   * @returns {Promise.<void>}
   */
  getTradeInfo = async (tradeId) => {
    const { code, context, message } = await webapi.fetchOrder(tradeId);
    if (code == config.SUCCESS_CODE) {
      this.dispatch('payOrder:getTradeInfo', context);
    } else {
      msg.emit('app:tip', message);
    }
  };

  /**
   * 获取支付渠道
   * @returns {Promise.<void>}
   */
  getPayChannel = async () => {
    const { code, context, message } = await webapi.fetchPayItems();
    if (code == config.SUCCESS_CODE) {
      this.dispatch('payOrder:getPayChannel', context);
    } else {
      msg.emit('app:tip', message);
    }
  };

  _fetchBalance = async () => {
    const data = await webapi.fetchBalance();
    this.dispatch('balance:pay:setBalance', data.context.withdrawAmountTotal);
  };

  /**
   * 获取支付charge
   * @param channelItemId
   * @returns {Promise.<void>}
   */
  getPayCharge = async (channelItemId) => {
    //拼团订单，状态校验
    const result = await webapi.checkGrouponOrder(
      this.state().getIn(['trade', 'tid'])
    );
    const status = result.context.status;
    if (status == 0 || status == 2) {
      if (channelItemId == 13) {
        // 发送邮件,查询当前会员财务邮箱
        const res = await webapi.fetchCustomerEmailList();
        Confirm({
          title: '银联企业付款需在PC上进行完成',
          text: '系统会同时发送邮件至财务邮箱',
          cancelText: '更换支付方式',
          okText: '通知财务',
          // cancelFn:() => {
          // 	//跳转到定案中心
          // 	msg.emit('router: goToNext', {
          // 		routeName: 'OrderList'
          // 	});
          // },
          okFn: () => {
            // 判断财务邮箱数量
            if (res && res.context.length > 0) {
              // 已有财务邮箱，发送邮件，跳转订单列表
              const tradeId = this.state().getIn(['trade', 'tid']);
              webapi.doSendEmails(tradeId);
              msg.emit('router: goToNext', {
                routeName: 'OrderList'
              });
            } else {
              // 无邮箱，提示请维护邮箱，跳转财务邮箱维护页面
              Confirm({
                text: '请维护财务邮箱',
                okBtn: '确定',
                maskClose: false,
                okFn: () => {
                  msg.emit('router: goToNext', {
                    routeName: 'UserEmail'
                  });
                }
              });
            }
          }
        });
      } else if (channelItemId == 20) {
        //微信独立支付
        //调用微信支付统一下单接口，返回拉起微信所需参数
        const tid = this.state().getIn(['trade', 'tid']);
        const parentTid = this.state().getIn(['trade', 'parentTid']);
        //支付request
        const payRequest = {
          tid: tid,
          parentTid
        };
        const res = await webapi.getWXPayApp(payRequest);
        if (res.code == config.SUCCESS_CODE) {
          const context = res.context;
          if (__DEV__) {
            console.log('weixinPay------->payReq: ' + JSON.stringify(res));
          }
          //调用原生的
          let WeixinModule;
          if (Platform.OS === 'ios') {
            WeixinModule = NativeModules.WeixinManager;
          } else {
            WeixinModule = NativeModules.WeixinModule;
          }

          WeixinModule.addEvent(context, (err, result) => {
            if (__DEV__) {
              console.log('weixinPay------->', err, result);
            }
            if (err) {
              msg.emit('app:setAlertVisible', false); // 隐藏提示框
              msg.emit('app:tip', err);
            }
          });

          const msgContent = '请通过微信进行支付，支付完成前请不要重复提交';
          this._setAlertVisible(msgContent);
        }else if(res.code === 'K-100203'){
          msg.emit('app:tip', res.message);
          setTimeout(() => {
            msg.emit('router: goToNext', {
              routeName: 'OrderList'
            });
          }, 2000)
        } else {
          msg.emit('app:tip', res.message);
        }
      }
      //P++不用
      // else {
      //   const tid = this.state().getIn(['trade', 'tid']);
      //   const parentTid = this.state().getIn(['trade', 'parentTid']);
      //   // const { openid } = WMkit.wechatAuthInfo()
      //   //支付request
      //   const payRequest = {
      //     terminal: 2,
      //     tid: tid,
      //     parentTid,
      //     // successUrl: window.location.origin + `/pay-success/${tid}`,
      //     channelItemId: channelItemId
      //     // openId: openid
      //   };
      //   const { code, context, message } = await webapi.fetchCharge(payRequest);
      //   if (code == config.SUCCESS_CODE) {
      //     if (Platform.OS === 'ios') {
      //       NativeModules.PayManager.pay(JSON.stringify(context), (result) => {
      //         if (result == 'success') {
      //           msg.emit('router: goToNext', {
      //             routeName: 'PaySuccess',
      //             tid: tid,
      //             parentTid,
      //             payType: 'online'
      //           });
      //         }
      //       });
      //     } else {
      //       const { result } = await NativeModules.PayModule.pay(
      //         JSON.stringify(context)
      //       );
      //       if (result == 'success') {
      //         msg.emit('router: goToNext', {
      //           routeName: 'PaySuccess',
      //           tid: tid,
      //           parentTid,
      //           payType: 'online'
      //         });
      //       }
      //     }
      //   } else if (code == 'K-100208') {
      //     msg.emit('router: goToNext', {
      //       routeName: 'PaySuccess',
      //       tid: tid,
      //       parentTid,
      //       payType: 'online'
      //     });
      //   } else {
      //     msg.emit('app:tip', message);
      //   }
      // }
    } else if (
      status == 1 ||
      status == 3 ||
      status == 4 ||
      status == 5 ||
      status == 9
    ) {
      msg.emit('app:tip', '参数信息不正确，请检查参数！');
    } else if (status == 6) {
      msg.emit('app:tip', '拼团活动已失效！');
    } else if (status == 7) {
      msg.emit('app:tip', '存在同一个拼团营销活动处于待成团状态，不可开团！');
    } else if (status == 8) {
      msg.emit('app:tip', '已参同一团活动，不可再参团！');
    } else if (status == 10) {
      msg.emit('app:tip', '已超团结束时长24小时！');
    } else if (status == 11) {
      msg.emit('app:tip', '未达起购数！');
    } else if (status == 12) {
      msg.emit('app:tip', '超出限购数！');
    } else if (status == 13) {
      msg.emit('app:tip', '团长订单-/已作废！');
    }
  };

  zhifubaoPay = async (channelItemId) => {
    // const successUrl = window.location.origin + `/pay-success/${tid}`;
    const tid = this.state().getIn(['trade', 'tid']);
    const parentTid = this.state().getIn(['trade', 'parentTid']);
    //支付request
    const payRequest = {
      tid: tid,
      parentTid,
      terminal: 2,
      channelItemId: channelItemId
    };
    const { code, context, message } = await webapi.alipay(payRequest);

    if (__DEV__) {
      console.log('alipayPay------->payReq: ' + JSON.stringify(context));
    }
    if (code == config.SUCCESS_CODE) {
      //调用原生的
      const AlipayManager = NativeModules.AlipayManager;
      AlipayManager.addEvent(context, (err, result) => {
        if (__DEV__) {
          console.log('alipayPay------->', err, result);
        }

        if (err) {
          msg.emit('app:tip', err);
          return;
        }

        if (result && result.resultStatus === '9000') {
          // 支付成功
          // msg.emit('router: goToNext', {
          //   routeName: 'PaySuccess',
          //   tid: tid,
          //   payType: 'online'
          // });
        } else if (result && result.resultStatus === '6001') {
          // msg.emit('app:tip', '您已取消支付，请重新选择其他支付方式');
        }
      });

      const msgContent = '请通过支付宝进行支付，支付完成前请不要重复提交';
      this._setAlertVisible(msgContent);
    } else if (code === 'K-100208') {
      msg.emit('router: goToNext', {
        routeName: 'PaySuccess',
        tid: tid,
        parentTid,
        payType: 'online'
      });
    }else if(code == 'K-100203'){
      msg.emit('app:tip', message);
      setTimeout(() => {
        msg.emit('router: goToNext', {
          routeName: 'OrderList'
        });
      }, 2000)
    } else {
      msg.emit('app:tip', message);
    }
  };

  /**
   * 余额支付
   */
  balancePay = WMkit.onceFunc(async (tid, channelItemId) => {
    if (window.token) {
      //校验输入密码
      let checkPayPwd = await this.checkCustomerPayPwd();
      if (!checkPayPwd) {
        this.dispatch('balance:pay:pwd:error:flag', false);
        await this.getLoginCustomerInfo();
        return;
      } else {
        this.dispatch('balance:pay:pwd:error:flag', true);
      }
      let payPassword = this.state().get('payPassword');
      const parentTid = this.state().getIn(['trade', 'parentTid']);
      const payMobileRequest = {
        tid: tid,
        parentTid,
        channelItemId: channelItemId,
        payPassword:payPassword
      };
      const res = await webapi.balancePay(payMobileRequest);

      if (res && res.code == config.SUCCESS_CODE) {
        msg.emit('app:tip', '支付成功');
        // 1.关闭支付密码弹窗
        this.payPwdModalVisible(false, channelItemId);
        // 2.重置支付密码
        this.dispatch('balance:pay:pwd:set', '');
        msg.emit('router: goToNext', {
          routeName: 'PaySuccess',
          tid: tid,
          parentTid,
          payType: 'online'
        });
      }else if(res && res.code === 'K-100203'){
        msg.emit('app:tip', res.message);
        setTimeout(() => {
          msg.emit('router: goToNext', {
            routeName: 'OrderList'
          });
        }, 2000)
      } else {
        Alert({ text: res.message });
      }
    } else {
      Alert({ text: '请登录！' });
    }
  }, 3000);

  /**
   * 支付密码弹窗显/隐
   */
  payPwdModalVisible = (val, channelItemId) => {
    this.transaction(() => {
      this.dispatch('balance:pay:modal:visible', val);
      this.dispatch('balance:pay:setChannelItemId', channelItemId);
    });
  };

  /**
   * 支付密码输入弹窗点击取消事件
   * @private
   */
  cancelPayPwdModal = (channelItemId) => {
    this.payPwdModalVisible(false, channelItemId);
    this.setPayPassword('');
  };

  /**
   * 输入支付密码
   * @param payPassword
   */
  setPayPassword = (payPassword) => {
    this.dispatch('balance:pay:pwd:set', payPassword);
  };

  /**
   * 校验会员支付密码是否可用
   */
  isPayPwdValid = async () => {
    const res = await webapi.isPayPwdValid();
    if (res.code == 'K-000000') {
      return true;
    } else if (res.code == 'K-010206') {
      Confirm({
        text: '您还没有设置支付密码，暂时无法使用余额支付',
        okBtn: '设置支付密码',
        okFn: () =>
          msg.emit('router: goTo' + 'Next', {
            routeName: 'PayPassword',
            forget: true
          })
      });
      return false;
    } else if (res.code == 'K-010207') {
      Alert({
        text: res.message,
        time: 1000
      });
      return false;
    }
  };

  /**
   * 校验输入的支付密码
   * @param payPassword
   */
  checkCustomerPayPwd = async () => {
    let payPassword = this.state().get('payPassword');
    const res = await checkCustomerPayPwd(payPassword);
    if (res.code == config.SUCCESS_CODE) {
      return true;
    } else {
      msg.emit('app:tip', res.message);
      return false;
    }
  };

  /**
   * 获取当前登陆人信息
   */
  getLoginCustomerInfo = async () => {
    const res = await getLoginCustomerInfo();
    let errorTime = 0;
    if (res.code == config.SUCCESS_CODE) {
      if (res.context.payErrorTime) {
        errorTime = res.context.payErrorTime;
      }
      this.dispatch('balance:pay:pwd:error:time', errorTime);
    }
  };

  _setAlertVisible = (msgContent) => {
    setTimeout(() => {
      Confirm({
        title: '支付',
        text: msgContent,
        okText: '已支付完成',
        cancelText: '重新选择方式',
        okFn: () =>
          msg.emit('router: goToNext', {
            routeName: 'OrderList'
          })
      });
    }, 3000);
  };

  /**
   * 好友代付
   */
  handleFriendPay = (type, results) => {
    const tid = this.state().getIn(['trade', 'tid']);
    msg.emit('router: goToNext', { routeName: 'FriendPay', type, tid, results })
  }

}
