import { Store, msg } from 'plume2';
import { config } from 'wmkit/config';
import { cache } from 'wmkit/cache';
import * as WMkit from 'wmkit/kit';
import { Const } from 'wmkit/const';
import * as thirdLogin from 'wmkit/third-login';
import * as _ from 'wmkit/common/util';
import moment from 'moment';

import CashFormActor from './actor/cash-actor';
import {
  getMyBalance,
  addCustomerDrawCash,
  checkCustomerPayPwd,
  getLoginCustomerInfo,
  getLinkedAccountInfo,
  countDrawCashSumByCustId
} from './webapi';

export default class AppStore extends Store {
  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  bindActor() {
    return [new CashFormActor()];
  }

  /**
   * 初始化
   */
  init = async () => {
    // 查询余额信息
    const res = await getMyBalance();
    if (res.code == config.SUCCESS_CODE) {
      const withdrawAmountTotal =
        res.context.withdrawAmountTotal == null
          ? 0
          : res.context.withdrawAmountTotal;
      //获取可提现金额数
      this.dispatch('cash:form:money', withdrawAmountTotal);
    }

    // 查询会员当日已提现余额
    const drawRes = await countDrawCashSumByCustId();
    if (drawRes.code == config.SUCCESS_CODE) {
      //获取可提现金额数
      this.dispatch(
        'cash:form:draw:money',
        drawRes.context ? drawRes.context : 0
      );
    }

    // 查询支付密码相关信息
    const customerInfo = await getLoginCustomerInfo();
    let errorTime = 0;
    if (customerInfo.code == config.SUCCESS_CODE) {
      if (customerInfo.context.payErrorTime) {
        errorTime = customerInfo.context.payErrorTime;
      }
      // 支付密码错误次数
      this.dispatch('cash:form:pwd:error:time', errorTime);
      if (
        !customerInfo.context.payLockTime ||
        (customerInfo.context.payLockTime &&
          moment(
            moment(customerInfo.context.payLockTime).format(
              cache.SECONDS_FORMAT
            )
          )
            .add(30, 'm')
            .isBefore(moment(moment(Date.now()).format(cache.SECONDS_FORMAT))))
      ) {
        // 账号正常或者已过了30分钟的账户冻结时间
        this.dispatch('cash:form:pwd:error:flag', true);
      } else {
        this.dispatch('cash:form:pwd:error:flag', false);
      }
    }

    // 查询登录用户关联账号的信息
    const data = await getLinkedAccountInfo();
    if (data.code == config.SUCCESS_CODE) {
      const nickName = data.context.nickname;
      const headImgUrl = data.context.headimgurl;
      this.dispatch('cash:form:nickname', nickName);
      this.dispatch('cash:form:head:img', headImgUrl);
      this.dispatch('cash:form:draw:info', {
        key: 'drawCashAccountName',
        value: nickName
      });
    }
  };

  /**
   * 修改提现申请内容
   */
  changeCustomerDrawCashInfo = (key, value) => {
    this.dispatch('cash:form:draw:info', {
      key: key,
      value: value
    });
  };

  /**
   * 支付密码弹窗显/隐
   */
  payPwdModalVisible = (val) => {
    this.dispatch('cash:form:modal:visible', val);
  };

  /**
   * 提交提现申请下一步，显示支付密码输入框，输入支付密码
   * @private
   */
  drawNext = (drawCash) => {
    //检验账户可提现金额
    this.checkDrawCashSum(drawCash);

    // 弹出支付密码框
    this.payPwdModalVisible(true);
  };

  /**
   * 支付密码输入弹窗点击取消事件
   * @private
   */
  cancelPayPwdModal = () => {
    this.payPwdModalVisible(false);
    this.setPayPassword('');
  };

  /**
   * 输入支付密码
   * @param payPassword
   */
  setPayPassword = (payPassword) => {
    this.dispatch('cash:form:pwd:set', payPassword);
  };

  /**
   * 新增提现申请记录
   */
  addCustomerDrawCash = WMkit.onceFunc(async () => {
    let customerDrawCashInfo = this.state()
      .get('customerDrawCashInfo')
      .toJS();
    //检验当天提现金额是否超出限制
    if (!(await this.checkCountDrawCashSum(customerDrawCashInfo.drawCashSum))) {
      return;
    }

    //校验输入密码
    let checkPayPwd = await this.checkCustomerPayPwd();
    if (!checkPayPwd) {
      this.dispatch('cash:form:pwd:error:flag', false);
      await this.getLoginCustomerInfo();
      return;
    } else {
      this.dispatch('cash:form:pwd:error:flag', true);
    }

    //检验账户可提现金额
    this.checkDrawCashSum(customerDrawCashInfo.drawCashSum);

    // 新增提现记录需要拿到提现终端所对应的openId
    // const { code, appId, appSecret } = await thirdLogin.wxBeforeDrawCash();
    const { code } = await thirdLogin.wxLogin();
    // 换取access_token的票据
    customerDrawCashInfo.code = code;
    // 微信openId来源 0:PC 1:MOBILE 2:App
    customerDrawCashInfo.drawCashSource = 2;
    //传入passWord
    customerDrawCashInfo.payPassword = this.state().get('payPassword');
    // 新增提现记录
    const res = await addCustomerDrawCash(customerDrawCashInfo);
    if (res.code == config.SUCCESS_CODE) {
      const customerDrawCashVO = res.context.customerDrawCashVO;
      if (!WMkit.isLoginOrNotOpen()) {
        msg.emit('loginModal:toggleVisible', {
          callBack: () => {
            msg.emit('router: goToNext', {
              routeName: 'BalanceCashSuccess',
              drawCashId: customerDrawCashVO.drawCashId,
              drawCashNo: customerDrawCashVO.drawCashNo,
              drawCashSum: customerDrawCashVO.drawCashSum
            });
          }
        });
        // this.cancelPayPwdModal(false);
      } else {
        msg.emit('router: goToNext', {
          routeName: 'BalanceCashSuccess',
          drawCashId: customerDrawCashVO.drawCashId,
          drawCashNo: customerDrawCashVO.drawCashNo,
          drawCashSum: customerDrawCashVO.drawCashSum
        });
        // this.cancelPayPwdModal(false);
      }
    } else {
      msg.emit('app:tip', res.message);
    }
  }, null);

  /**
   * 检验当天提现金额是否超出限制
   */
  checkCountDrawCashSum = async (drawCashSum) => {
    //检验当天提现金额是否超出限制
    let res = await countDrawCashSumByCustId();
    if (res.code == config.SUCCESS_CODE) {
      if (res.context) {
        // 即将提现金额+已提现金额
        drawCashSum = _.add(drawCashSum, res.context);
      }
      if (drawCashSum > Const.MAX_DRAW_CASH) {
        msg.emit('app:tip', '提现金额超出当天最大提现金额');
        return false;
      } else {
        return true;
      }
    } else {
      msg.emit('app:tip', res.message);
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
   * 提现申请单提交时校验可提现余额
   * @param drawCashSum
   */
  checkDrawCashSum = async (drawCashSum) => {
    const res = await getMyBalance();
    if (res.code == config.SUCCESS_CODE) {
      const withdrawAmountTotal = res.context.withdrawAmountTotal;
      if (drawCashSum > withdrawAmountTotal) {
        msg.emit('app:tip', '余额不足，请修改提现金额！');
        return false;
      } else {
        return true;
      }
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
      this.dispatch('cash:form:pwd:error:time', errorTime);
    }
  };
}
