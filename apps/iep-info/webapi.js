import Fetch from 'wmkit/fetch';

/**
 * 查询公司信息
 * @returns
 */
export const fetchIepInfo = () => {
  return Fetch('/enterpriseInfo');
};

/**
 * 修改公司信息
 * @returns
 */
export const updateIepInfo = (params) => {
  return Fetch('/enterpriseInfo', {
    method: 'PUT',
    body: JSON.stringify(params)
  });
};
