import Fetch from 'wmkit/fetch';

/**
 * 查询商品列表
 * @param params
 * @returns {Promise<IAsyncResult<T>>}
 */
export const fetchGoodsList = () => {
  return Fetch('/goods/skus', {
    method: 'POST',
    body: JSON.stringify({
      pageSize: 20,
      sortFlag: 0
    })
  });
};

/**
 * 获取广告
 * @param params
 * @returns {Promise<IAsyncResult<T>>}
 */
export const queryBaseConfig = () => {
  return Fetch('/system/baseConfig', {
    method: 'GET'
  });
};

/**
 * 分页查询app消息
 */
export const messagePage = (params) => {
  return Fetch('/appMessage/page', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};

/**
 * 检查更新
 */
export const fetchUpgradeInfo = () => {
  return Fetch('/mobile-setting/get-app-upgrade-setting');
};

/**
 * 查询预置搜索词
 */
export const getPresetSearchTerms = () => {
  return Fetch('/preset_search_terms/list', {
    method: 'POST'
  });
};


/**
 * 查询隐私政策
 */
export const fetchPrivacyPolicyConfig = () => {
  return Fetch('/privacypolicy/queryPrivacyPolicy');
};