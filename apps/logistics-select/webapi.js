import Fetch from 'wmkit/fetch';

/**
 * 查询物流公司列表
 */
export const fetchLogisticCompany = () => {
  return Fetch('/boss/expressCompany');
};