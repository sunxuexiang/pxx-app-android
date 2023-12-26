import Fetch from 'wmkit/fetch';

/**
 * 获取导航栏数据
 * @param params
 * @returns {Promise<IAsyncResult<T>>}
 */
export const queryTabBarConfig = () => {
  return Fetch('/navigationconfig/get', {
    method: 'GET'
  });
};
