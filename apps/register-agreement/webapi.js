/**
 * Created by hht on 2018/5/3.
 */
import Fetch from 'wmkit/fetch';

/**
 * 获取平台站点信息
 * @type {Promise<AsyncResult<T>>}
 */
export const getSiteInfo = () => {
  return Fetch('/system/baseConfig');
};
