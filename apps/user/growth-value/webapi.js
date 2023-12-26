import Fetch from 'wmkit/fetch';
/**
 * 获取等级列表
 */
export const getRightsList = () => {
  return Fetch('/customer/level/rightsList');
};


/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return Fetch('/customer/level/rights');
};


/**
 * 获取规则
 */
export const basicRules = () => {
  return Fetch('/customer/growthValue/introduction');
};