/**
 *
 * Created by hht on 2017/9/13.
 */
import Fetch from 'wmkit/fetch';

export const fetchOrder = (tid) => {
  return Fetch(`/trade/show/${tid}`);
};

/**
 * 获取支付对象
 */
export const fetchCharge = (payRequest) => {
  return Fetch('/pay/create', {
    method: 'POST',
    body: JSON.stringify(payRequest)
  });
};

/**
 * 获取可用支付项
 */
export const fetchPayItems = () => {
  return Fetch('/pay/items/APP');
};

/**
 * 获取用户余额
 */
export const fetchBalance = () => {
  return Fetch('/customer/funds/statistics');
};

/**
 * 订单付款记录
 */
export const fetchPayOrder = (tid) => {
  return Fetch(`/trade/payOrder/${tid}`);
};

/**
 * 查询会员的财务邮箱信息列表
 */
export const fetchCustomerEmailList = () => {
  return Fetch('/customer/emailList/', {
    method: 'GET'
  });
};

/**
 * 发送邮件
 */
export const doSendEmails = (tradeId) => {
  return Fetch(`/customer/email/sendToFinance/${tradeId}`, {
    method: 'POST'
  });
};

/**
 * 微信app支付,获取prepay_id
 * @param params
 */
export const getWXPayApp = (params) => {
  return Fetch('/pay/wxPayUnifiedorderForApp', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};

/**
 * APP支付宝
 */
export const alipay = (payRequest) => {
  return Fetch('/pay/app/aliPay/', {
    method: 'POST',
    body: JSON.stringify(payRequest)
  });
};

/**
 * 支付状态校验
 */
export const getPayState = (tid) => {
  return Fetch(`/pay/aliPay/check/${tid}`);
};

/**
 * 校验会员支付密码是否可用
 */
export const isPayPwdValid = () => {
  return Fetch('/isPayPwdValid', {
    method: 'POST'
  });
};

/**
 * 余额支付
 */
export const balancePay = (payMobileRequest) => {
  return Fetch('/pay/balancePay', {
    method: 'POST',
    body: JSON.stringify(payMobileRequest)
  });
};

/**
 * 验证拼团订单是否可支付
 * @param tid
 * @returns {Promise<Result<any>>}
 */
export const checkGrouponOrder = (tid) => {
  // 没有tid的情况直接不做校验
  if (!tid) return Promise.resolve({ context: { status: 0 } });
  return Fetch(`/groupon/order/check/${tid}`, {
    method: 'POST'
  });
};
