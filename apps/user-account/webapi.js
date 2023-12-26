/**
 * Created by feitingting on 2017/9/12.
 */
import Fetch from 'wmkit/fetch';

/**
 * 获取会员的银行账户信息列表
 * @returns {IAsyncResult}
 */
export const fetchAccountList = () => {
  return Fetch('/customer/accountList', {
    method: 'GET'
  });
};

/**
 * 删除指定银行账号
 * @param accountId
 * @returns {boolean}
 */
export const deleteAccountById = (accountId) => {
  return Fetch('/customer/account/' + accountId, {
    method: 'DELETE'
  });
};
