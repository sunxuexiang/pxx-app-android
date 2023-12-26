/**
 * Created by feitingting on 2017/7/20.
 */
import Fetch from 'wmkit/fetch';

export const updatePass = (
  customerId,
  vertiCode,
  password,
  isForgetPassword
) => {
  return Fetch('/passwordByForgot', {
    method: 'POST',
    body: JSON.stringify({
      customerId: customerId,
      verifyCode: vertiCode,
      customerPassword: password,
      isForgetPassword: isForgetPassword
    })
  });
};
