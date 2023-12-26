import Fetch from 'wmkit/fetch';

/**
 * 获取订单详情
 */
export const getTradeDetail = tid => {
  return Fetch(`/return/trade/${tid}`);
};

/**
 * 查询退单列表
 */
export const fetchOrderReturnList = tid => {
  return Fetch(`/return/findByTid/${tid}`);
};

/**
 * 取消订单
 */
export const cancelOrder = tid => {
  return Fetch(`/trade/cancel/${tid}`);
};

/**
 * 判断改订单是否可申请退单
 */
export const isAbleReturn = tid => {
  return Fetch(`/return/returnable/${tid}`);
};

/**
 * 0元订单支付
 */
export const defaultPaylOrder = tid => {
  return Fetch(`/trade/default/pay/${tid}`);
};
