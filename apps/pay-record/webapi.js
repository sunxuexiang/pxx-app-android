import Fetch from 'wmkit/fetch';

/**
 * 付款记录
 */
export const fetchPayDetail = (tid) => {
  return Fetch(`/trade/payOrder/${tid}`);
};

/**
 * 0元订单支付
 */
export const defaultPaylOrder = (tid: string) => {
  return Fetch(`/trade/default/pay/${tid}`);
};
