import Fetch from 'wmkit/fetch';

/**
 * 会员中心 修改绑定手机号 给新号码发送验证码
 * @param customerAccount
 * @returns {Promise<Result<ReturnResult>>}
 */
export const sendCode = (customerAccount) => {
  return Fetch(`/customer/newCustomerVerified/${customerAccount}`, {
    method: 'POST'
  });
};

/**
 * 会员中心 修改绑定手机号 验证新号码发送的验证码
 * @param tel
 * @param code
 * @returns {Promise<Result<TResult>>}
 */
export const testCode = (oldVerifyCode, tel, code) => {
  return Fetch('/customer/newMobileCode', {
    method: 'POST',
    body: JSON.stringify({
      oldVerifyCode: oldVerifyCode,
      customerAccount: tel,
      verifyCode: code
    })
  });
};
