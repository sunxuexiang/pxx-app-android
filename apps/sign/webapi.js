import Fetch from 'wmkit/fetch';

/**
 * 获取用户信息
 * @returns {*|Promise|Promise<unknown>|Promise<R>}
 */
export const getUserInfo = () => {
  return Fetch('/customer/signrecord/getUserInfo');
};

/**
 * 获取当月
 * @returns {*|Promise|Promise<unknown>|Promise<R>}
 */
export const getSignRecordList = () => {
  return Fetch('/customer/signrecord/listByMonth');
};

export const getSignPoint = () => {
  return Fetch('/customer/signrecord/getSignPoint');
};

/**
 * 签到
 * @returns {*|Promise|Promise<unknown>|Promise<R>}
 */
export const doSign = () => {
  return Fetch('/customer/signrecord/add/app');
};

/**
 * 获取积分设置
 */
export const pointsRules = () => {
  return Fetch('/pointsConfig');
};

/**
 * 查询成长值是否开启
 */
export const growthValueIsOpen = () => {
  return Fetch('/growthValue/isOpen');
};

//查询热门兑换
export const findHotExchange = (pageSize) => {
  return Fetch('/pointsMall/hotExchange', {
    method: 'POST',
    body: JSON.stringify({ pageSize: pageSize })
  });
};
