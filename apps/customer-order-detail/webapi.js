import Fetch from 'wmkit/fetch';

/**
 * 订单详情
 */
export const fetchOrderDetail = (tid) => {
  return Fetch(`/trade/distribute/${tid}`);
};

/**
 * 取消订单
 */
export const cancelOrder = (tid) => {
  return Fetch(`/trade/cancel/${tid}`);
};

/**
 * 获取订单详情
 */
export const getTradeDetail = (tid) => {
  return Fetch(`/return/trade/${tid}`);
};

/**
 * 查询退单列表
 */
export const fetchOrderReturnList = (tid) => {
  return Fetch(`/return/findByTid/${tid}`);
};

/**
 * 0元订单支付
 */
export const defaultPaylOrder = (tid) => {
  return Fetch(`/trade/default/pay/${tid}`);
};
