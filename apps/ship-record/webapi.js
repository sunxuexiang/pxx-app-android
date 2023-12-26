import Fetch from 'wmkit/fetch';

/**
 * 根据订单号获取发货详情
 * @param id
 * @returns {Promise<Result<T>>}
 */
export const fetchAllDeliverys = (id, type) => {
  return Fetch(`/trade/deliverRecord/${id}/${type}`, {
    method: 'GET'
  });
};

/**
 * 确认收货
 * @param id
 * @returns {Promise<Result<T>>}
 */
export const confirmReceiveAll = (id) => {
  return Fetch(`/trade/receive/${id}`, {
    method: 'GET'
  });
};
