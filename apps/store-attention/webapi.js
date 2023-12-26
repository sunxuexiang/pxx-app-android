/**
 * Created by feitingting on 2017/12/19.
 */

import Fetch from 'wmkit/fetch';

/**
 * 查看关注的店铺列表
 * @param id
 * @returns {Promise<Result<T>>}
 */
export const fetchAllStoreFollows = (params) => {
  return Fetch('/store/storeFollows', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};

/**
 *
 * 取消店铺关注
 * @param params
 * @returns {IAsyncResult}
 */
export const cancelStoreAttention = (params) => {
  return Fetch('/store/storeFollow', {
    method: 'DELETE',
    body: JSON.stringify(params)
  });
};
