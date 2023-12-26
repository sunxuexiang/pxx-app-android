import Fetch from 'wmkit/fetch';

/**
 * 修改／增加 购物车数量
 * @param goodsInfoId
 * @param num
 */
export const purchaseNumChange = (goodsInfoId, num) =>
  Fetch('/site/purchase', {
    method: 'PUT',
    body: JSON.stringify({
      goodsInfoId: goodsInfoId,
      goodsNum: num
    })
  });

/**
 * 删除购物车
 * @param goodsInfoId
 */
export const purchaseDelete = (goodsInfoId) =>
  Fetch('/site/purchase', {
    method: 'DELETE',
    body: JSON.stringify({
      goodsInfoIds: [goodsInfoId]
    })
  });

/**
 * 查询购物车数量
 */
export const fetchPurchaseCount = () => {
  return Fetch('/site/countGoods');
};
