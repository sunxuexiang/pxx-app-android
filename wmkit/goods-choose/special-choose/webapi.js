import { Fetch } from 'wmkit';

/**
 * 批量加入购物车
 */
export const purchase = (buyGoodsInfos) => {
  return Fetch('/site/batchAdd', {
    method: 'POST',
    body: JSON.stringify({ goodsInfos: buyGoodsInfos.toJS() })
  });
};
/*
批量到货通知
 */
export const saveGoodsLack = (request) => {
  return Fetch('/stockout/saveAll', {
    method: 'POST',
    body: JSON.stringify({
      ...request
    })
  });
};
