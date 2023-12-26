import Fetch from 'wmkit/fetch';

/**
 * 批量加入购物车
 */
export const purchase = (buyGoodsInfos) => {
  return Fetch('/site/batchAdd', {
    method: 'POST',
    body: JSON.stringify({ goodsInfos: buyGoodsInfos.toJS() })
  });
};

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

export const saveGoodsLack = (request) => {
  return Fetch('/stockout/saveAll', {
    method: 'POST',
    body: JSON.stringify({
      ...request
    })
  });
};


