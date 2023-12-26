import Fetch from 'wmkit/fetch';
import * as WMkit from 'wmkit/kit';

/**
 * 查询商品详情
 * @param id 商品详情id
 * @returns {*}
 */
export const init = (id) => {
  const isLoginOrNotOpen = WMkit.isLoginOrNotOpen();
  return isLoginOrNotOpen
    ? Fetch(`/goods/spu/${id}`)
    : Fetch(`/goods/unLogin/spu/${id}`);
};
/**
 * 检查开店礼包有效状态
 * @param id
 * @returns {Promise<Result<TResult>>}
 */
export const verify = async (id) => {
  return Fetch(`/distribute/verify/storeBags/sku/${id}`);
};

/**
 * 立即购买
 */
export const immediateBuy = (id) => {
  return Fetch('/trade/store-bags-buy', {
    method: 'POST',
    body: JSON.stringify({
      goodsInfoId: id
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
