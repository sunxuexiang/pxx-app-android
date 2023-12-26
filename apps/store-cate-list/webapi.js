import Fetch from 'wmkit/fetch';
import * as WMkit from 'wmkit/kit';

/**
 * 获取全部分类信息
 * @type {Promise<AsyncResult<T>>}
 */
export const getAllCates = (id) => {
  const params = {
    storeId: id
  };
  return Fetch('/storeCate', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};

/**
 * 获取店铺信息
 * @returns {Promise<Result<any>>}
 */
export const getStoreInfo = (id) => {
  return WMkit.isLoginOrNotOpen()
    ? Fetch('/store/storeInfo', {
        method: 'POST',
        body: JSON.stringify({ storeId: id })
      })
    : Fetch('/store/unLogin/storeInfo', {
        method: 'POST',
        body: JSON.stringify({ storeId: id })
      });
};
