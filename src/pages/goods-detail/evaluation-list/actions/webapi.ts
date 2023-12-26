import { Fetch, WMkit } from 'wmkit/index';

/**
 * 商品评价点赞
 * @param customergoodsevaluatepraise
 */
export const addCustomerGoodsEvaluatePraise = (customergoodsevaluatepraise) => {
  return Fetch('/customergoodsevaluatepraise/add', {
    method: 'POST',
    body: JSON.stringify(customergoodsevaluatepraise)
  });
};
