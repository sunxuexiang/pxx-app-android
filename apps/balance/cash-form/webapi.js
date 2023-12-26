import Fetch from 'wmkit/fetch';

/**
 * 获取余额详情
 * @returns {Promise<Result<TResult>>}
 */
export const getMyBalance = () => {
  return Fetch('/customer/funds/statistics');
};

/**
 * 校验输入支付密码
 * @param payPassword
 */
export const checkCustomerPayPwd = (payPassword) => {
  return Fetch('/checkCustomerPayPwd', {
    method: 'POST',
    body: JSON.stringify({ payPassword: payPassword })
  });
};

/**
 * 新增提现记录
 * @returns {Promise<Result<TResult>>}
 */
export const addCustomerDrawCash = (customerDrawCashInfo) => {
  return Fetch('/draw/cash/addCustomerDrawCash', {
    method: 'POST',
    body: JSON.stringify(customerDrawCashInfo)
  });
};

/**
 * 获取当前登陆人信息
 */
export const getLoginCustomerInfo = () => {
  return Fetch('/customer/getLoginCustomerInfo', {
    method: 'GET'
  });
};

/**
 * 获取当前登录人绑定微信账号信息
 * @returns {Promise<Result<TResult>>}
 *
 */
export const getLinkedAccountInfo = () => {
  return Fetch('/third/login/linked-account-flags');
};

/**
 * 获取当前登陆人当天提现金额
 */
export const countDrawCashSumByCustId = () => {
  return Fetch('/draw/cash/countDrawCashSumByCustId', {
    method: 'GET'
  });
};
