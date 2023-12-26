import Fetch from 'wmkit/fetch';

/**
 * 使用优惠券选择时的后台处理
 * @param 已勾选的店铺优惠券码id
 */
export const checkoutCoupons = (couponCodeIds) => {
  return Fetch('/coupon-code/checkout-coupons', {
    method: 'POST',
    body: JSON.stringify({
      couponCodeIds
    })
  });
};
