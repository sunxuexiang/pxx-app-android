/**
 * Created by qiaokang on 2019/3/11.
 */
import Fetch from 'wmkit/fetch';

/**
 * 查询分销配置信息
 * @returns {Promise<Result<any>>}
 */
export const getDistributionSetting = () => {
  return Fetch('/customer/get-distribution-setting', {
    method: 'GET'
  });
};

/**
 * 获取分销设置和邀请人的信息
 */
export const fetchInvitorInfo = () => {
  return Fetch('/distribute/setting-invitor');
};

/**
 * 生成小程序码
 * @param {string} inviteeId
 * @returns {Promise<Result<any>>}
 */
export const getInviteNewCode = (params = {}) => {
  return Fetch('/distribution/miniProgram-code/distributionMiniProgramQrCode', {
    method: 'POST',
    body: JSON.stringify({ ...params })
  });
};
