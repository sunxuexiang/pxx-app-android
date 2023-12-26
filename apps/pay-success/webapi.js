import Fetch from 'wmkit/fetch';

/**
 * 获取付款单信息
 */
export const getPayOrder = (tid) => {
  return Fetch(`/trade/payOrder/${tid}`);
};

/**
 * 批量订单付款记录
 */
export const getPayOrders = (parentTid) => {
  return Fetch(`/trade/payOrders/${parentTid}`);
};
