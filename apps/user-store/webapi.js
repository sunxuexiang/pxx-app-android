import Fetch from 'wmkit/fetch';

/**
 * 获取用户关注列表
 * @type {Promise<AsyncResult<T>>}
 */
export const getGoodsFollowList = (current, pageSize) => {
  return Fetch('/goods/goodsFollows', {
    method: 'POST',
    body: JSON.stringify({
      pageSize: pageSize,
      sortFlag: 0,
      pageNum: current - 1
    })
  });
};

/**
 * 移除我的收藏
 * @param goodsInfoIds
 * @returns {Promise<Result<T>>}
 */
export const deleteGoodsFollow = (goodsInfoIds) => {
  return Fetch('/goods/goodsFollow', {
    method: 'DELETE',
    body: JSON.stringify({
      goodsInfoIds: goodsInfoIds
    })
  });
};

/**
 * 是否含有失效商品
 * @returns {Promise<Result<T>>}
 */
export const invalidGoodsFollow = () => {
  return Fetch('/goods/hasInvalidGoods');
};

/**
 * 清除失效商品
 * @returns {Promise<Result<T>>}
 */
export const deleteInvalidGoodsFollow = () => {
  return Fetch('/goods/goodsFollows', {
    method: 'DELETE'
  });
};

/**
 * 查询购物车数量
 */
export const fetchPurchaseCount = () => {
  return Fetch('/site/countGoods');
};
