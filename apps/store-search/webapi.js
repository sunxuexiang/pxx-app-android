import * as WMkit from 'wmkit/kit';
import Fetch from 'wmkit/fetch';

/**
 * 获取用户的搜索历史
 * @returns {Promise<Result<any>>}
 */
export const getHistory = (id) => {
  return Fetch(`/goods/store/history/${id}`, {
    method: 'GET'
  });
};

/**
 * 添加一条搜索历史
 * @param queryString
 * @returns {Promise<Result<any>>}
 */
export const addHistory = ({ queryString, storeId }) => {
  return Fetch(`/goods/store/history/${storeId}`, {
    method: 'POST',
    body: JSON.stringify({ keyword: queryString })
  });
};

/**
 * 清空搜索历史
 * @returns {Promise<Result<any>>}
 */
export const clearHistory = (id) => {
  return Fetch(`/goods/store/history/${id}`, {
    method: 'DELETE'
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
