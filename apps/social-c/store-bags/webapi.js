import Fetch from 'wmkit/fetch';

/**
 * 获取用户的搜索历史
 * @returns {Promise<Result<any>>}
 */
export const getHistory = () => {
  return Fetch('/goods/history', {
    method: 'GET'
  });
};

/**
 * 添加一条搜索历史
 * @param queryString
 * @returns {Promise<Result<any>>}
 */
export const addHistory = (queryString) => {
  return Fetch('/goods/history', {
    method: 'POST',
    body: JSON.stringify({ keyword: queryString })
  });
};

/**
 * 清空搜索历史
 * @returns {Promise<Result<any>>}
 */
export const clearHistory = () => {
  return Fetch('/goods/history', {
    method: 'DELETE'
  });
};

/**
 * 获取 店铺 搜索历史
 */
export const getStoreHistory = () => {
  return Fetch('/store/history', {
    method: 'GET'
  });
};

/**
 * 添加一条 店铺 搜索历史
 */
export const addStoreHistory = (queryString) => {
  return Fetch('/store/history', {
    method: 'POST',
    body: JSON.stringify({ keyword: queryString })
  });
};

/**
 * 清空 店铺 搜索历史
 */
export const clearStoreHistory = () => {
  return Fetch('/store/history', {
    method: 'DELETE'
  });
};
