/**
 * Created by feitingting on 2017/7/17.
 */
import Fetch from 'wmkit/fetch';

export const doPerfect = (params = {}) => {
  return Fetch('/perfect', {
    method: 'POST',
    body: JSON.stringify({
      ...params
    })
  });
};

export const getCustomerInfo = (customerId) => {
  return Fetch(`/enterprise/customer/${customerId}`, {
    method: 'GET'
  });
};

/**
 *
 * @param params
 */
export const doRegisterEnterprise = (params = {}) =>{
  return Fetch('/registerEnterprise', {
    method: 'POST',
    body: JSON.stringify({
      ...params
    })
  });
};

/**
 * 获取注册限制
 */
export const getRegisterLimitType = () =>
  Fetch('/getRegisterLimitType', { method: 'POST' });