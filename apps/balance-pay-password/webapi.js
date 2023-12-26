import Fetch from 'wmkit/fetch';

/**
 * 发送验证码
 * @param tel
 * @param isForgetPassword
 */
export const sendCode = (tel: string, isForgetPassword: boolean) => {
  return Fetch('/app/verify/code', {
    method: 'POST',
    body: JSON.stringify({
      customerAccount: tel,
      isForgetPassword: isForgetPassword
    })
  });
};

/**
 * 验证验证码
 * @param tel
 * @param code
 * @param isForgetPassword
 */
export const testCode = (
  tel: string,
  code: string,
  isForgetPassword: boolean
) => {
  return Fetch('/app/validate/code', {
    method: 'POST',
    body: JSON.stringify({
      customerAccount: tel,
      verifyCode: code,
      isForgetPassword: isForgetPassword
    })
  });
};

/**
 * 会员中心查询会员绑定的手机号
 * @returns {Promise<Result<ReturnResult>>}
 */
export const findCustomerMobile = () => {
  return Fetch('/customer/customerMobile');
};
