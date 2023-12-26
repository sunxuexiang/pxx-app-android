import Fetch from 'wmkit/fetch';

/**
 * 查询登录用户关联账号的状态
 * 是否第三方微信登录过
 * @returns {Promise<Result>}
 *
 */
export const init = () => {
  return Fetch('/third/login/linked-account-flags');
};
