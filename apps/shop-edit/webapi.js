import Fetch from 'wmkit/fetch';

/**
 * 删除分销商品
 */
export const delCommodityDistribution = (goodsInfoId: String) => {
  return Fetch('/distributor-goods/delete', {
    method: 'POST',
    body: JSON.stringify({ goodsInfoId: goodsInfoId })
  });
};

/**
 * 商品排序
 */
export const changeSort = (goodsInfos) => {
  return Fetch('/distributor-goods/modify-sequence', {
    method: 'POST',
    body: JSON.stringify({ distributorGoodsInfoDTOList: goodsInfos })
  });
};

export const shopSkuList = () => {
    return Fetch('/goods/shop/sku-list', {
        method: 'POST',
        body: JSON.stringify({ pageNum: 0 ,pageSize : 500})
    });
};
