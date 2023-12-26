import Fetch from 'wmkit/fetch';

/**
 * 取消
 */
export const cancel = (rid, reason) => {
  return Fetch(`/return/cancel/${rid}?reason=${reason}`, {
    method: 'POST'
  });
};
