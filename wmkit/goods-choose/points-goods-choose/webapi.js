import Fetch from 'wmkit/fetch';

/**
 * 立即兑换
 * @param pointsGoodsId
 */
export const exchange = (params) => {
  return Fetch('/pointsTrade/exchange', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};
