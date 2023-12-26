import Fetch from 'wmkit/fetch';

/**
 * 获取分销员的基本信息
 */
export const queryDistributeInfo = () =>
  Fetch('/distribute/distributor-info', { method: 'GET' });

export const queryDistributeSetting = () =>
  Fetch('/distribute/setting-invitor', { method: 'GET' });

export const fetchDistributionSetting = (param) => {
  return Fetch('/distribute/setting', {
    method: 'POST',
    body: JSON.stringify({
      inviteeId: param
    })
  });
};

/**
 * 生成小程序码
 * @param {string}
 * @returns {Promise<Result<any>>}
 */
export const getShopShareCode = (params = {}) => {
  return Fetch('/distribution/miniProgram-code/distributionMiniProgramQrCode', {
    method: 'POST',
    body: JSON.stringify({ ...params })
  });
};
