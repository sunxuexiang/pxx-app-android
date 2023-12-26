import Fetch from 'wmkit/fetch';

export const updateNum = (params = {}) => {
  return Fetch('/distribution/goods-matter/matter-recommend-num/', {
    method: 'POST',
    body: JSON.stringify({ ...params })
  });
};
