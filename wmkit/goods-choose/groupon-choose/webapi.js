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

/**
 * 立即购买
 */
export const immediateBuy = (buyGoodsInfo, openGroupon, grouponNo) => {
  let params = {
    goodsInfoId: buyGoodsInfo.get('goodsInfoId'),
    buyCount: buyGoodsInfo.get('num'),
    openGroupon: openGroupon
  };
  return Fetch('/trade/groupon-buy', {
    method: 'POST',
    body: grouponNo
      ? JSON.stringify({
          ...params,
          grouponNo: grouponNo
        })
      : JSON.stringify(params)
  });
};

/**
 * 校验团信息
 * @param {} buyGoodsInfo
 * @param {*} openGroupon
 * @param {*} grouponNo
 */
export const immediateBuyValidate = (buyGoodsInfo, openGroupon, grouponNo) => {
  let params = {
    goodsInfoId: buyGoodsInfo.get('goodsInfoId'),
    buyCount: buyGoodsInfo.get('num'),
    openGroupon: openGroupon
  };
  return Fetch('/groupon/vaildateGrouponStatusForOpenOrJoin', {
    method: 'POST',
    body: grouponNo
      ? JSON.stringify({
          ...params,
          grouponNo: grouponNo
        })
      : JSON.stringify(params)
  });
};
