import { Fetch } from 'wmkit';

/**
 * 我的会员中心
 * @returns
 */
export const fetchCustomerInfo = () => {
  return Fetch('/customer/customerBase');
};

/**
 * 修改会员的企业信息
 * @param form
 */
export const modifyEnterpriseInfo = (form) => {
  return Fetch('/customer/modifyEnterpriseInfo',{
    method: 'POST',
    body: JSON.stringify(form)
  });
};

/**
 * 校验会员是否在工单中
 * @param param
 * @returns {Promise<*>}
 */
export const validateCustomerWorkOrder = (param) => {
  return Fetch('/workorder/validate/exist',{
    method: 'POST',
    body: JSON.stringify(param)
  });
};