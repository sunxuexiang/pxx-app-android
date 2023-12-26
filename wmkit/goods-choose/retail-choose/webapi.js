import Fetch from 'wmkit/fetch';

/**
 * 单个sku加入购物车
 */
export const purchaseSingle = (buyGoodsInfo) => {
  return Fetch('/site/purchase', {
    method: 'POST',
    body: JSON.stringify({
      goodsInfoId: buyGoodsInfo.get('goodsInfoId'),
      goodsNum: buyGoodsInfo.get('num')
    })
  });
};

export const purchaseBatch = (buyGoodsInfos) => {
 return Fetch('/site/batchAdd', {
   method: 'POST',
   body: JSON.stringify({
    goodsInfos: buyGoodsInfos
   })
 });
};
/**
 * 立刻抢购
 */
export const rushToBuyFlashSaleGoods = (flashSaleGoodsId, num) => {
  return Fetch('/flashsale/rushToBuyFlashSaleGoods', {
    method: 'POST',
    body: JSON.stringify({
      flashSaleGoodsId: flashSaleGoodsId,
      flashSaleGoodsNum: num
    })
  });
};

/**
 * 删除购物车
 * @returns {Promise<Result<T>>}
 */
export const deletePurchaseCount = (skuIds) => {
  return Fetch('/site/purchase', {
    method: 'DELETE',
    body: JSON.stringify({
      goodsInfoIds: skuIds
    })
  });
};
//到货通知
export const saveGoodsLack = (request) => {
  return Fetch('/stockout/saveAll', {
    method: 'POST',
    body: JSON.stringify({
      ...request
    })
  });
};
