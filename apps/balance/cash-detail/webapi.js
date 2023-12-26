import Fetch from 'wmkit/fetch';

/**
 * 获取提现单详情
 * @returns {Promise<Result<TResult>>}
 */
export const init = (dcId: string) => {
  return Fetch(`/draw/cash/detail/${dcId}`);
};

/**
 * 取消单个提现单
 * @returns {Promise<Result<TResult>>}
 */
export const sendCancel = (dcId: string) => {
  return Fetch(`/draw/cash/cancel/${dcId}`);
};

/**
 * 获取当前登录人绑定微信账号信息
 * @returns {Promise<Result<TResult>>}
 *
 */
export const getLinkedAccountInfo = () => {
  return Fetch('/third/login/linked-account-flags');
};
