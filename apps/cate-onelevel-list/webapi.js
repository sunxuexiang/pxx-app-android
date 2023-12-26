import Fetch from 'wmkit/fetch';
import * as WMkit from 'wmkit/kit';

/**
 * 查询购物车数量
 * @returns {Promise<Result<T>>}
 */
export const fetchPurchaseCount = () => {
  return Fetch('/site/countGoods');
};

/**
 * 查询轮播图
 */
export const bannerList = (id) => {
  return Fetch('/banneradmin/list', {
    method: 'POST',
    body: JSON.stringify({
      oneCateId: id
    })
  });
};
/**
 * 查询二三级分类
 */
export const allGoodsRootCate = (cateId) =>
  Fetch(`/goods/allGoodsRootCate/${cateId}`, { method: 'GET' });


/**
 * 获取商品默认展示方式
 *   spu 或者 sku列表
 *   大图 或者 小图
 * @returns {Promise<Result<TResult>>}
 */
export const queryGoodsShowType = () =>
  Fetch('/config/goodsDisplayDefault', { method: 'GET' });

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

export const getBrandByCateId = (cateId) => {
  return Fetch(`/goods/getBrandByCateId/${cateId}`);
};