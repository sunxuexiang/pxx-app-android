import Fetch from 'wmkit/fetch';

/**
 * 订单详情
 */
export const fetchOrderDetail = tid => {
  return Fetch(`/trade/${tid}`);
};
