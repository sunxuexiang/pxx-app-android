import Fetch from 'wmkit/fetch';

/**
 * 查询银联企业支付配置
 */
export const queryUnionB2bConfig = () => {
  return Fetch('/pay/queryUnionB2bConfig/');
};
