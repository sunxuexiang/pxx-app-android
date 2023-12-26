import Fetch from 'wmkit/fetch';

/**
 * 获取微信授权登录开启状态
 */
export const fetchWxLoginStatus = () => {
  return Fetch('/third/login/wechat/status/APP');
};
