import Fetch from 'wmkit/fetch';

/**
 * 获取卖家账号
 */
export const fetchSellerAccounts = () => {
  return Fetch('/account/offlineValidAccounts');
};
