import * as WMkit from 'wmkit/kit';
import Fetch from 'wmkit/fetch';

/**
 * 查询商品详情
 * @param id 商品详情id
 * @returns {*}
 */
export const init = (id) => {
  const isLoginOrNotOpen = WMkit.isLoginOrNotOpen();
  return isLoginOrNotOpen
    ? Fetch(`/goods/groupon/goods-detail/spu/${id}`)
    : Fetch(`/goods/unLogin/groupon/goods-detail/spu/${id}`);
};

/**
 * 根据品牌id查询品牌详情
 * @param brandId
 */
export const fetchBrand = (brandId) =>
  Fetch(`/goods/goodsBrand/${brandId}`, { method: 'GET' });

/**
 * 根据分类id查询属性信息
 * @param cateId
 */
export const fetchPropList = (cateId) =>
  Fetch(`/goods/props/all/${cateId}`, { method: 'GET' });

/**
 * 查询商品是否被收藏
 * @param id
 * @returns {Promise<Result<TResult>>}
 */
export const fetchFollow = (id) => {
  return Fetch('/goods/goodsFollows', {
    method: 'POST',
    body: JSON.stringify({
      goodsInfoId: id
    })
  });
};

/**
 * 查询购物车数量
 * @returns {Promise<Result<T>>}
 */
export const fetchPurchaseCount = () => {
  return Fetch('/site/countGoods');
};

/**
 * 加入收藏
 * @param id
 */
export const intoFollow = (id) => {
  return Fetch('/goods/goodsFollow', {
    method: 'POST',
    body: JSON.stringify({
      goodsInfoId: id
    })
  });
};

/**
 * 移出收藏
 * @param id
 * @returns {Promise<Result<TResult>>}
 */
export const outFollow = (id) => {
  return Fetch('/goods/goodsFollow', {
    method: 'DELETE',
    body: JSON.stringify({
      goodsInfoIds: [id]
    })
  });
};

/**
 * 加入购物车
 * @param id
 * @param num
 * @returns {Promise<Result<TResult>>}
 */
export const purchase = (id, num) => {
  return Fetch('/site/purchase', {
    method: 'POST',
    body: JSON.stringify({
      goodsInfoId: id,
      goodsNum: num
    })
  });
};

/**
 * 获取店铺基本信息
 * @param id 店铺Id
 */
export const fetchStoreInfo = (id) => {
  const isLoginOrNotOpen = WMkit.isLoginOrNotOpen();
  const params = {
    storeId: id
  };
  return isLoginOrNotOpen
    ? Fetch('/store/storeInfo', {
      method: 'POST',
      body: JSON.stringify(params)
    })
    : Fetch('/store/unLogin/storeInfo', {
      method: 'POST',
      body: JSON.stringify(params)
    });
};

/**
 * 获取赠品详情
 * @param id
 */
export const fetchMarketingDetail = (id) => {
  return WMkit.isLoginOrNotOpen()
    ? Fetch(`/gift/${id}`)
    : Fetch(`/gift/unLogin/${id}`);
};

/**
 * 获取在线客服详情
 */
export const onLineServiceList = (storeId) => {
  return Fetch(`/customerService/qq/detail/${storeId}/2`);
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

/**
 * 获取spu详情
 */
export const initSpu = (id) => {
  const isLoginOrNotOpen = WMkit.isLoginOrNotOpen();
  return isLoginOrNotOpen
    ? Fetch(`/goods/spu/${id}`)
    : Fetch(`/goods/unLogin/spu/${id}`);
};

/**
 * 查询店铺信息
 */
export const findStore = async (storeId) => {
  const isLoginOrNotOpen = WMkit.isLoginOrNotOpen();
  return isLoginOrNotOpen
    ? Fetch('/store/storeInfo', {
      method: 'POST',
      body: JSON.stringify({
        storeId
      })
    })
    : Fetch('/store/unLogin/storeInfo', {
      method: 'POST',
      body: JSON.stringify({
        storeId
      })
    });
};

/**
 * 获取多个商品关联的优惠券信息
 * @param {*} goodsInfoId
 */
export const fetchCouponInfosBySkuList = (goodsInfoIdList) => {
  const url = WMkit.isLoginOrNotOpen()
    ? '/coupon-info/goods-list/forApp'
    : '/coupon-info/front/goods-list/forApp';
  return Fetch(url, {
    method: 'POST',
    body: JSON.stringify({goodsInfoIds: goodsInfoIdList})
  });
};

/**
 * 获取商品关联的优惠券信息
 * @param {*} goodsInfoId
 */
export const fetchCouponInfos = (goodsInfoId) => {
  const url = WMkit.isLoginOrNotOpen()
    ? `/coupon-info/goods-detail/${goodsInfoId}`
    : `/coupon-info/front/goods-detail/${goodsInfoId}`;
  return Fetch(url);
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
 * 获取sku小程序码
 * @param {} skuId
 * @param {} shareUserId 分享人Id
 */
export const getSkuQrCode = (skuId, shareUserId) => {
  return Fetch('/goods/getSkuQrCode', {
    method: 'POST',
    body: JSON.stringify({
      skuId: skuId,
      shareUserId: shareUserId
    })
  });
};
/**
 * 获取服务时间
 */
export const queryServerTime = () => {
  return Fetch('/system/queryServerTime');
};

/** 
 * 获取开团通知
 * */
export const getGrouponLatestInstanceByActivityId = (grouponActivityId) => {
  return Fetch('/groupon/latest/instance', {
    method: 'POST',
    body: JSON.stringify({
      grouponActivityId: grouponActivityId,
      //待成团
      grouponStatus: 1
    })
  });
};



