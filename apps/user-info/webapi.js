import Fetch from 'wmkit/fetch';

/**
 * 会员基本信息
 * @returns
 */
export const fetchCustomerBase = () => {
  return Fetch('/customer/customerBase');
};

/**
 * 修改会员基本信息
 * @returns
 */
export const updateCustomerBase = (customer) => {
  return Fetch('/customer/customerBase', {
    method: 'PUT',
    body: JSON.stringify(customer)
  });
};

/**
 * 查询完善信息可获得成长值和积分
 * @returns
 */
export const getGrowthValueAndPoint = () => {
  return Fetch('/customer/getGrowthValueAndPoint');
};

/**
 * 获取积分设置
 */
export const basicRules = () => {
  return Fetch('/pointsConfig');
};

/**
 * 查询成长值是否开启
 */
export const growthValueIsOpen = () => {
  return Fetch('/growthValue/isOpen');
};
