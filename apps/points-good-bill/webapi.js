import Fetch from 'wmkit/fetch';
/**
 * 获取订单商品列表
 * @returns {Promise<Result<TResult>>}
 */
export const getExchangeItem = (params) => {
  return Fetch('/pointsTrade/getExchangeItem', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};
