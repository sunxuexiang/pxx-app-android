import Fetch from 'wmkit/fetch';

/**
 * 查询商品列表数据
 * @param params
 */
export const query = (params) =>
  Fetch('/goods/skus', {
    method: 'POST',
    body: JSON.stringify(params)
  });

/**
 * 根据营销id查询该营销信息
 *
 * @param marketingId
 * @returns {Promise<Result<any>>}
 */
export const getMarketingById = (marketingId) => {
  return Fetch(`/marketing/${marketingId}`);
};

/**
 * 未登录时,计算购物车中参加同种营销的商品列表/总额/优惠
 *
 * @param marketingId
 * @returns {Promise<Result<any>>}
 */
export const calcMarketingByMarketingIdFront = (marketingId, req) => {
  return Fetch(`/site/${marketingId}/calcMarketingByMarketingIdFront`, {
    method: 'POST',
    body: JSON.stringify(req)
  });
};



/**
 * 计算购物车中参加同种营销的商品列表/总额/优惠
 *
 * @param marketingId
 * @returns {Promise<Result<any>>}
 */
export const calcMarketingByMarketingId = (marketingId) => {
  return Fetch(`/site/${marketingId}/calcMarketingByMarketingId`);
};

/**
 * 获取购物车商品选择的营销
 *
 * @param marketingId
 * @returns {Promise<Result<any>>}
 */
export const queryGoodsMarketingList = () => {
  return Fetch('/site/goodsMarketing');
};


/**
 * 修改商品选择的营销
 * @param {string} goodsInfoId
 * @param {number} marketingId
 * @returns {Promise<Result<any>>}
 */
export const modifyGoodsMarketing = (
  goodsInfoId: string,
  marketingId: number
) => {
  return Fetch(`/site/goodsMarketing/${goodsInfoId}/${marketingId}`, {
    method: 'PUT'
  });
};
