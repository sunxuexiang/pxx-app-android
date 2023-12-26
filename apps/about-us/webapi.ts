import Fetch from 'wmkit/fetch';

/**
 * 获取关于我们
 * @type {Promise<AsyncResult<T>>}
 */
export const fetchAboutUsContext = () => {
  return Fetch('/mobile-setting/get-about-us');
};
