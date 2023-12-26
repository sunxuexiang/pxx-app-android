/**
 * Created by chenpeng on 2017/7/5.
 */
import Fetch from 'wmkit/fetch';

/**
 * 查询用户默认地址信息
 * @returns {Promise<AsyncResult<TResult>>}
 */
export const fetchCustomerDefaultAddr = () => {
  return Fetch('/customer/addressinfo');
};

/**
 * 获取订单商品列表
 * @returns {Promise<Result<TResult>>}
 */
export const getExchangeItem = (params) => {
  return Fetch('/pointsTrade/getExchangeItem', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};

/**
 * 提交
 * @param params
 * @returns {Promise<Result<T>>}
 */
export const commit = (params) => {
  return Fetch('/pointsTrade/commit', {
    method: 'POST',
    body: JSON.stringify(params)
  });
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
 * 校验会员支付密码是否可用
 * @param payPassword
 */
export const isPayPwdValid = () => {
  return Fetch('/isPayPwdValid', {
    method: 'POST'
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
