import Fetch from 'wmkit/fetch';

/**
 * 获取全部分类信息
 * @type {Promise<AsyncResult<T>>}
 */
export const getAllCates = () => {
  return Fetch('/goods/allGoodsCates');
};
