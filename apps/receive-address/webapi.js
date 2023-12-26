import Fetch from 'wmkit/fetch';

/**
 * 获取用户收货地址列表
 * @returns {Promise<Result>}
 */
export const fetchAddresses = () => {
  return Fetch('/customer/addressList');
};

/**
 * 设为默认收货地址
 * @param addressId
 * @returns {Promise<Result>}
 */
export const setDefault = (addressId) => {
  return Fetch(`/customer/defaultAddress/${addressId}`, {
    method: 'POST'
  });
};

/**
 * 删除地址
 * @param addressId
 * @returns {Promise<Result>}
 */
export const deleteAddress = (addressId) => {
  return Fetch(`/customer/addressInfo/${addressId}`, {
    method: 'DELETE'
  });
};

/**
 * 查询用户默认地址信息
 * @returns {Promise<AsyncResult<TResult>>}
 */
export const fetchCustomerDefaultAddr = () => {
  return Fetch('/customer/addressinfo');
};
