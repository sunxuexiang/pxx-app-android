import Fetch from 'wmkit/fetch';

/**
 * 查询app分享配置
 */
export function getAppShareSetting() {
  return Fetch('/mobile-setting/get-app-share-setting');
}

/**
 * 我的会员中心
 */
export const fetchCustomerCenterInfo = () => {
  return Fetch('/customer/customerCenter');
};

/**
 * 检查更新
 */
export const fetchUpgradeInfo = () => {
  return Fetch('/mobile-setting/get-app-upgrade-setting');
};
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
