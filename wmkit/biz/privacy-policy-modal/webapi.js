import Fetch from 'wmkit/fetch';

/**
 * 获取用户协议
 * @returns {Promise<Result<T>>}
 */
export const fetchBaseConfig = () => {
  return Fetch('/system/baseConfig', {
    method: 'GET'
  });
};

/**
 * 查询隐私政策
 */
export const fetchPrivacyPolicyConfig = () => {
    return Fetch('/privacypolicy/queryPrivacyPolicy');
};

