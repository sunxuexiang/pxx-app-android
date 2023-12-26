import Fetch from 'wmkit/fetch';

/**
 * 查询领券中心优惠券列表
 */
export const listCouponCenter = (couponCateId, couponType) => {
  return Fetch('/coupon-info/center', {
    method: 'POST',
    body: JSON.stringify({
      couponCateId: couponCateId,
      couponType: couponType
    })
  });
};
/**
 * 查询优惠券分类列表
 */
export const listCouponCate = () => {
  return Fetch('/coupon-cate/list', {
    method: 'GET'
  });
};

/**
 * 领取优惠券
 */
export const fetchCoupon = (couponInfoId, couponActivityId) => {
  return Fetch('/coupon-code/fetch-coupon', {
    method: 'POST',
    body: JSON.stringify({
      couponInfoId: couponInfoId,
      couponActivityId: couponActivityId
    })
  });
};
