/**
 * Created by feitingting on 2017/9/12.
 */
import Fetch from 'wmkit/fetch';
/**
 * 新增银行账户
 * @param params
 * @returns {IAsyncResult}
 */
export const insertAccountInfo = (params) => {
  return Fetch('/customer/account', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};

/**
 * 修改银行账户
 * @param params
 * @returns {IAsyncResult}
 */
export const updateAccountInfo = (params) => {
  return Fetch('/customer/account', {
    method: 'PUT',
    body: JSON.stringify(params)
  });
};

/**
 * 根据账户编号查询账户基本情况
 * @param accountId
 * @returns {boolean}
 */
export const fetchAccountById = (accountId) => {
  return Fetch('/customer/account/' + accountId);
};
