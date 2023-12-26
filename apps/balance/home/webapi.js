import Fetch from 'wmkit/fetch';

/**
 * 获取余额页面详情
 * @returns {Promise<Result<TResult>>}
 *
 */
export const init = () => {
  return Fetch('/customer/funds/statistics');
};
