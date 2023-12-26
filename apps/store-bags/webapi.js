import Fetch from 'wmkit/fetch';

/**
 * 获取开店礼包信息
 */
export const storeBags = () => {
  return Fetch('/distribute/storeBags', {
    method: 'POST'
  });
};
