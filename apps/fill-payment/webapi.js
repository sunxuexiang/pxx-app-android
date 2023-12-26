import Fetch from 'wmkit/fetch';

/**
 * 提交付款单
 */
export const applyAccount = payOrder => {
  return Fetch('/trade/pay/offline', {
    method: 'POST',
    body: JSON.stringify(payOrder)
  });
};
