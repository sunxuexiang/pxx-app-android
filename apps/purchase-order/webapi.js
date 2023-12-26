import * as WMkit from 'wmkit/kit';
import Fetch from 'wmkit/fetch';

/**
 * 查询购物车
 * @returns
 */
export const fetchPurchaseOrder = (params) => {
  return Fetch('/site/view/purchases', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};

/**
 * 查询库存
 * @returns
 */
export const getGoodsStockByCateId = (skuIds) => {
  return Fetch('/goods/findGoodsInfoStock', {
    method: 'POST',
    body: JSON.stringify({
      goodsInfo: skuIds
    })
  });
};

/**
 * 更新购物车库存
 * @param num
 * @param skuId
 */
export const batchEdit = (param) => {
  return Fetch('/site/purchaseList', {
    method: 'PUT',
    body: JSON.stringify({
      goodsInfos: param,
    })
  });
};

/**
 * 查询未登录时,购物车缓存信息
 * @param arr 购物车缓存信息[{skuId, num}]
 * @param skuIds 用户勾选的skuIds
 * @param skuMarArr 用户针对各sku选择的营销活动
 */
export const fetchPurchaseFromCache = (arr, skuIds, skuMarArr) => {
  return Fetch('/site/front/purchases', {
    method: 'POST',
    body: JSON.stringify({ goodsInfoDTOList: arr, goodsInfoIds: skuIds, goodsMarketingDTOList: skuMarArr })
  });
};

/**
 * 更新购物车数量
 * @param num
 * @param skuId
 */
export const changeSkuNum = (num, skuId) => {
  return Fetch('/site/purchase', {
    method: 'PUT',
    body: JSON.stringify({
      goodsNum: num,
      goodsInfoId: skuId,
      //不校验库存
      verifyStock: false
    })
  });
};

/**
 * 清除失效商品
 * @returns {Promise<Result<T>>}
 */
export const cleanInvalidGoods = () => {
  return Fetch('/site/clearLoseGoods', {
    method: 'DELETE',
    body: JSON.stringify({})
  });
};

/**
 * 查询购物车数量
 */
export const fetchPurchaseCount = () => {
  return Fetch('/site/countGoods');
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

/**
 * 移入收藏夹
 * @param skuIds
 * @returns {Promise<Result<T>>}
 */
export const addToFollow = (skuIds) => {
  return Fetch('/site/addFollow', {
    method: 'PUT',
    body: JSON.stringify({
      goodsInfoIds: skuIds
    })
  });
};

/**
 * 去下单
 * @param skus
 * @returns {Promise<Result<T>>}
 */
export const toConfirm = (skus, tradeMarketingList, forceConfirm) => {
  return Fetch('/trade/confirm', {
    method: 'PUT',
    body: JSON.stringify({
      tradeItems: skus,
      tradeMarketingList: tradeMarketingList,
      forceConfirm: forceConfirm
    })
  });
};

/**
 * 修改商品选择的营销
 * @param goodsInfoId
 * @param marketingId
 * @returns {*}
 */
export const modifyGoodsMarketing = (
  goodsInfoId: string,
  marketingId: number
) => {
  return Fetch(`/site/goodsMarketing/${goodsInfoId}/${marketingId}`, {
    method: 'PUT'
  });
};

/**
 * 查询购物车中各店铺所选商品可领取的优惠券
 * @returns
 */
export const fetchCouponForGoodsList = (goodsInfoIds) => {
  return Fetch(WMkit.isLoginOrNotOpen() ? '/coupon-info/goods-list/forApp' : '/coupon-info/front/goods-list/forApp', {
    method: 'POST',
    body: JSON.stringify({goodsInfoIds:goodsInfoIds})
  });
};

/**
 * 领取优惠券
 * @param {*} couponId 优惠券Id
 * @param {*} activityId 活动Id
 */
export const receiveCoupon = (couponId, activityId) => {
  return Fetch('/coupon-code/fetch-coupon', {
    method: 'POST',
    body: JSON.stringify({
      couponInfoId: couponId,
      couponActivityId: activityId
    })
  });
};

/**
 *
 * 查询会员中心主页面数据
 *
 */
export const findCustomerCenterInfo = () => {
  return Fetch('/customer/customerCenter', {
    method: 'GET'
  });
};

/**
 * 查询用户默认地址信息
 * @returns {Promise<AsyncResult<TResult>>}
 */
export const fetchCustomerDefaultAddr = () => {
  return Fetch('/customer/addressinfo', { method: 'GET' });
};


/**
 * 领取优惠券
 * @param {*} couponId 优惠券Id
 * @param {*} activityId 活动Id
 */
export const getStoreMarketings = (params) => {
  return Fetch('/site/store/marketing', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};
