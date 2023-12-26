import Fetch from 'wmkit/fetch';

/**
 * 获取退款记录
 * @param id
 * @returns {Promise<Result<T>>}
 */
export const fetchAllRefundRecords = (id) => {
  return Fetch(`/return/refundOrder/${id}`, {
    method: 'GET'
  });
};

/**
 * 获取退单详情
 */
export const fetchReturnDetail = (rid) => {
  return Fetch(`/return/${rid}`, {
    method: 'POST'
  });
};

/**
 * 获取积分设置
 */
export const basicRules = () => {
  return Fetch('/pointsConfig');
};
