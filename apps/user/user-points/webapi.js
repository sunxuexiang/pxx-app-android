import Fetch from 'wmkit/fetch';
/**
 * 获取积分信息
 */
export const queryPointsInfo = () => {
  return Fetch('/customer/customerCenter');
};
/**
 * 获取规则
 */
export const basicRules = () => {
  return Fetch('/pointsConfig');
};

/**
 * 查询即将过期积分
 */
export const queryWillExpirePoints = () => {
  return Fetch('/customer/points/expire');
};

