import { Fetch, WMkit } from 'wmkit';

/**
 * 获取商品默认展示方式
 *   spu 或者 sku列表
 *   大图 或者 小图
 * @returns {Promise<Result<TResult>>}
 */
export const queryGoodsShowType = () =>
  Fetch('/config/goodsDisplayDefault', { method: 'GET' });

/**
 * 根据skuId查询spu相关信息
 * @param id
 */
export const querySpu = async (id) => {
  const isLoginOrNotOpen = WMkit.isLoginOrNotOpen();
  return isLoginOrNotOpen
    ? Fetch(`/goods/spu/${id}`)
    : Fetch(`/goods/unLogin/spu/${id}`);
};

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
 * 根据分类id查询商品属性
 * @param params
 */
export const queryProps = (cateId) => Fetch(`/goods/props/${cateId}`);

/**
 * 获取商品评价是否开启
 */
export const commentConfig = () => {
  return Fetch('/systemGoodsEvaluateConfig/isGoodsEvaluate');
};
