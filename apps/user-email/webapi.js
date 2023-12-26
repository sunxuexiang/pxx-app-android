import Fetch from 'wmkit/fetch';

/**
 * 查询会员的财务邮箱信息列表
 */
export const fetchCustomerEmailList = () => {
  return Fetch('/customer/emailList/', {
    method: 'GET'
  });
};

/**
 * 新增会员财务邮箱
 */
export const addCustomerEmail = (formData) => {
  return Fetch('/customer/email/', {
    method: 'POST',
    body: JSON.stringify(formData)
  });
};

/**
 * 修改会员财务邮箱
 */
export const updateCustomerEmail = (formData) => {
  return Fetch('/customer/email/', {
    method: 'PUT',
    body: JSON.stringify(formData)
  });
};

/**
 *
 * 删除会员财务邮箱
 */
export const deleteCustomerEmailById = (customerEmailId) => {
  return Fetch('/customer/email/' + customerEmailId, {
    method: 'DELETE'
  });
};
