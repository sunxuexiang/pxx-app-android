import Fetch from 'wmkit/fetch';

/**
 * 
 * @returns {Promise<Result<T>>}
 */
export const fetchBaseConfig = () => {
  return Fetch('/system/baseConfig', {
    method: 'GET'
  });
};

/**
 * 查询采购件数
 * @returns {Promise<Result<T>>}
 */
export const queryPurchaseCount = (employeeId) => {
  return Fetch(`/customer/queryPurchaseCount/${employeeId}`, {
    method: 'GET'
  });
};

/**
 * 查询是否为员工
 * @returns {Promise<Result<T>>}
 */
export const queryBuyerByPhone = (phone) => {
  return Fetch(`/customer/queryBuyerByPhone/${phone}`, {
    method: 'GET'
  });
};
