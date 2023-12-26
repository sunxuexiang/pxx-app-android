import Fetch from 'wmkit/fetch';

/**
 * 通过ID查询收货地址
 * @param addressId
 * @returns {IAsyncResult}
 */
export const findAddressById = (addressId) => {
  return Fetch(`/customer/address/${addressId}`, {
    method: 'GET'
  });
};

/**
 * 新增收货地址
 * @param address
 * @returns {IAsyncResult}
 */
export const saveAddress = (address) => {
  return Fetch('/customer/address', {
    method: 'POST',
    body: JSON.stringify(address)
  });
};

/**
 * 修改收货地址
 * @param address
 * @returns {IAsyncResult}
 */
export const editAddress = (address) => {
  return Fetch('/customer/addressInfo', {
    method: 'PUT',
    body: JSON.stringify(address)
  });
};
