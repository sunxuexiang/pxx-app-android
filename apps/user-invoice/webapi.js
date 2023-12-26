import Fetch from 'wmkit/fetch';

/**
 * 查询会员的增票详情
 */
export const fetchCustomerInvoice = () => {
  return Fetch('/customer/invoice/');
};

/**
 * 新增会员增票
 */
export const insertCustomerInvoice = (invoiceBean) => {
  return Fetch('/customer/invoice/', {
    method: 'POST',
    body: JSON.stringify(invoiceBean)
  });
};

/**
 * 修改会员增票
 */
export const updateCustomerInvoice = (invoiceBean) => {
  return Fetch('/customer/invoice/', {
    method: 'PUT',
    body: JSON.stringify(invoiceBean)
  });
};

/**
 * 修改会员增票
 */
export const submitCustomerInvoice = (invoiceBean) => {
  if (invoiceBean.get('customerInvoiceId')) {
    return updateCustomerInvoice(invoiceBean);
  } else {
    return insertCustomerInvoice(invoiceBean);
  }
};
