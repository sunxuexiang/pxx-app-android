import Fetch from 'wmkit/fetch';

/**
 * 登录系统
 * @param account
 * @param pass
 * @returns {*}
 */
export const login = (account, pass) => {
  return Fetch('/login', {
    method: 'POST',
    body: JSON.stringify({
      customerAccount: account,
      customerPassword: pass
    })
  });
};

/**
 * 微信授信登录
 */
export const wechatAuth = (params) => {
  params.channel = 'app';
  return Fetch('/third/login/wechat/auth', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};

/**
 * 获取登录页logo
 * @returns {Promise<Result<T>>}
 */
export const fetchBaseConfig = () => {
  return Fetch('/system/baseConfig', {
    method: 'GET'
  });
};

/**
 * 获取微信授权登录开启状态
 */
export const fetchWxLoginStatus = () => {
  return Fetch('/third/login/wechat/status/APP');
};

/**
 * 验证码登录  发送验证码
 * @type {Promise<AsyncResult<T>>}
 */
export const sendCode = (mobile) => {
  return Fetch(`/login/verification/${mobile}`, {
    method: 'POST'
  });
};

/**
 * 验证码登录系统
 * @param account
 * @param verificationCode
 * @returns {Promise<Result<T>>}
 */
export const loginWithVerificationCode = (account, verificationCode) => {
  return Fetch('/login/verification', {
    method: 'POST',
    body: JSON.stringify({
      customerAccount: account,
      verificationCode: verificationCode
    })
  });
};

/**
 * 上传设备的deviceToken
 */
export const addToken = (params) => {
  return Fetch('/umengConfig/addToken', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};
