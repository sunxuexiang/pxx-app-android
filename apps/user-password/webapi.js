import Fetch from 'wmkit/fetch';

export const sendCode = (tel, isForgetPassword) => {
  return Fetch('/checkSmsByForgot', {
    method: 'POST',
    body: JSON.stringify({
      customerAccount: tel,
      isForgetPassword: isForgetPassword
    })
  });
};

export const testCode = (tel, code, isForgetPassword) => {
  return Fetch('/validateSmsByForgot', {
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
