import Fetch from 'wmkit/fetch';

/**
 * 获取客服数据
 * @returns {Promise<Result<any>>}
 */
export const sobotDetail = () => {
  return Fetch('/system/sobot/detail', {
    method: 'GET'
  });
};