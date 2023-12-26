import Fetch from 'wmkit/fetch';

/**
 * 会员中心查询会员绑定的手机号
 * @returns {Promise<Result>}
 */
export const findCustomerMobile = () => {
  return Fetch('/customer/customerMobile');
};

/**
 * 会员中心 修改绑定手机号 给原号码发送验证码
 * @param customerAccount
 * @returns {Promise<Result>}
 */
export const sendCode = (customerAccount) => {
  return Fetch(`/customer/customerVerified/${customerAccount}`, {
    method: 'POST'
  });
};

/**
 * 会员中心 修改绑定手机号 验证原号码发送的验证码
 * @param tel
 * @param code
 * @returns {Promise<Result<TResult>>}
 */
export const testCode = (tel, code) => {
  return Fetch('/customer/oldMobileCode', {
    method: 'POST',
    body: JSON.stringify({
      customerAccount: tel,
      verifyCode: code
    })
  });
};
