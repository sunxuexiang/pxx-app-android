import Fetch from 'wmkit/fetch';

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
 * 获取登录页logo
 * @returns {Promise<Result<T>>}
 */
export const fetchBaseConfig = () => {
  return Fetch('/system/baseConfig', {
    method: 'GET'
  });
};
