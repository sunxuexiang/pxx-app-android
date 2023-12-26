import Fetch from 'wmkit/fetch';

/**
 * 根据运单号检索商品详情
 * @param id
 * @returns {Promise<Result<T>>}
 */
export const fetchAllGoods = (orderId, deliverId, type) => {
  return Fetch(`/trade/shipments/${orderId}/${deliverId}/${type}`, {
    method: 'GET'
  });
};
