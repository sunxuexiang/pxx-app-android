import Fetch from 'wmkit/fetch';

/**
 * 根据分类id查询商品属性
 * @param params
 */
export const queryProps = (cateId) => Fetch(`/goods/props/${cateId}`);

/**
 * 分销员添加分销商品
 */
export const addDistributorGoods = (goodsId, goodsInfoId, storeId) => {
  return Fetch('/distributor-goods/add', {
    method: 'POST',
    body: JSON.stringify({
      goodsId: goodsId,
      goodsInfoId: goodsInfoId,
      storeId: storeId
    })
  });
};

/**
 * 删除分销商品
 */
export const delDistributorGoods = (goodsInfoId) => {
  return Fetch('/distributor-goods/delete', {
    method: 'POST',
    body: JSON.stringify({ goodsInfoId: goodsInfoId })
  });
};
