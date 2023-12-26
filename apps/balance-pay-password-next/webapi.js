/**
 * Created by cl on 2019/4/15.
 */
import Fetch from 'wmkit/fetch';

export const updatePass = (
  customerId: string,
  vertiCode: string,
  password: string,
  isForgetPassword: boolean
) => {
  return Fetch('/app/pay/pwd', {
    method: 'POST',
    body: JSON.stringify({
      customerId: customerId,
      verifyCode: vertiCode,
      customerPayPassword: password,
      isForgetPassword: isForgetPassword
    })
  });
};
