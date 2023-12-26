import Fetch from 'wmkit/fetch';
/**
 * 获取订单商品列表
 * @returns {Promise<Result<TResult>>}
 */
export const fetchWillBuyGoodsList = () => {
  return Fetch('/trade/purchase');
};
