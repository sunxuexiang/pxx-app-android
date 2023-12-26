import Fetch from 'wmkit/fetch';

/**
 * 立即兑换优惠券
 */
export const doFetchCoupon = (pointsCouponId) => {
  return Fetch(`/pointsMall/fetchPointsCoupon/${pointsCouponId}`, {
    method: 'POST'
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

/**
 * 获取会员信息
 */
export const getCustomerInfo = () => {
  return Fetch('/pointsMall/customerInfo');
};

/**
 * 单个查询积分优惠券
 */
export function getCouponById(id) {
  return Fetch(`/pointsMall/coupon/${id}`, {
    method: 'GET'
  });
}

