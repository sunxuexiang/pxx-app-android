import Fetch from 'wmkit/fetch';

/**
 * 获取增值税专用发票
 * @returns {Promise<Result<TResult>>}
 */
export const fetchVATInvoice = (companyInfoId) => {
  return Fetch(`/customer/invoiceInfo/${companyInfoId}`);
};

/**
 * 获取普通发票的开票项目
 * @returns {Promise<Result<TResult>>}
 */
export const fetchProjects = (companyInfoId) => {
  return Fetch(`/account/invoiceProjects/${companyInfoId}`);
};
