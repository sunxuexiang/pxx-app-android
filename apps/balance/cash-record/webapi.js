import Fetch from 'wmkit/fetch';

/**
 * 取消单个提现单
 * @returns {Promise<Result<TResult>>}
 */
export const sendCancel = (dcId: string) => {
  return Fetch(`/draw/cash/cancel/${dcId}`);
};
