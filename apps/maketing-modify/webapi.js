import Fetch from 'wmkit/fetch';

/**
 * 查询缺货信息
 */
export const listStockOutGroupByStoreId = (wareId,storeId) =>
  Fetch(`/trade/listStockOutGroupByStoreId/${wareId}/${storeId}`, { method: 'GET' });