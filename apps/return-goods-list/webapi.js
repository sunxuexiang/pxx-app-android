import Fetch from 'wmkit/fetch';

/**
 * 获取退单详情
 */
export const fetchReturnDetail = (rid) => {
  return Fetch(`/return/${rid}`, {
    method: 'POST'
  });
};
