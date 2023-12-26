import Fetch from 'wmkit/fetch';

/**
 * 获取等级列表
 */
export const getRightsList = () => {
  return Fetch('/customer/level/rightsList');
};

/**
 * 获取积分信息
 */
export const queryPointsInfo = () => {
  return Fetch('/customer/customerCenter');
};
/**
 * 获取积分是否开启
 */
export const basicRules = () => {
  return Fetch('/pointsConfig');
};

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return Fetch('/customer/level/rights');
};

/**
 * 获取热门兑换
 */
export const getHotExchange = () => {
  return Fetch('/pointsMall/hotExchange', {
    method: 'POST',
    body: JSON.stringify({
      pageSize: 15
    })
  });
};
