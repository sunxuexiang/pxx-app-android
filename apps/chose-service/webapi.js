import Fetch from 'wmkit/fetch';

/**
 * 获取在线客服详情
 */
export const onLineServiceList = (storeId) => {
  return Fetch(`/customerService/qq/detail/${storeId}/2`);
};
