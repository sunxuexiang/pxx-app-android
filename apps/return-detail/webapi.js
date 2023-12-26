import Fetch from 'wmkit/fetch';

/**
 * 获取退单详情
 */
export const fetchReturnDetail = (rid) => {
  return Fetch(`/return/${rid}`, {
    method: 'POST'
  });
};

/**
 * 取消
 */
export const cancel = (rid, reason) => {
  return Fetch(`/return/cancel/${rid}?reason=${reason}`, { method: 'POST' });
};

/**
 * 查询退款单
 * @param rid
 * @returns {Promise<IAsyncResult<T>>}
 */
export function fetchRefundOrderList(rid) {
  return Fetch(`/account/refundOrders/${rid}`);
}

/**
 * 获取积分设置
 */
export const basicRules = () => {
  return Fetch('/pointsConfig');
};
