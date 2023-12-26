import { Fetch } from 'wmkit';


/**
 * 查询父账户下面的子账户
 */
export const queryChildsByParentId = () => {
  return Fetch('/customer/queryChildsByParentId', {
    method: 'GET'
  });
};


/**
 * 解绑子账户
 */
export const releaseBindCustomers = (customerId) =>{
  return Fetch('/customer/releaseBindCustomers', {
    method: 'POST',
    body: JSON.stringify({
      customerId: customerId
    })
  });
};

/**
 * 会员基本信息
 * @returns
 */
export const fetchCustomerBase = () => {
  return Fetch('/customer/customerBase');
};

/**
 * 批量绑定子账户
 */
export const addCustomerRela = (childList) => {
  return Fetch('/customer/addCustomerRela',{
    method: 'POST',
    body: JSON.stringify({
      customerAccountList:childList
    })
  });
};

export const verifyCustomerRel = (customerAccountList) => {
  return Fetch('/customer/verifyCustomerRela',{
    method: 'POST',
    body: JSON.stringify({
      customerAccountList: customerAccountList
    })
  });
};