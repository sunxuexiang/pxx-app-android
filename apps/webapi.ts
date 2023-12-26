import Fetch from 'wmkit/fetch';

/**
 * 上传设备的deviceToken
 */
export const addToken = (params) => {
  return Fetch('/umengConfig/addToken', {
    method: 'get',
    body: JSON.stringify(params)
  });
};