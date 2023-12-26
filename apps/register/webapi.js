/**
 * Created by feitingting on 2017/7/11.
 */
import Fetch from 'wmkit/fetch';

/**
 * 登录系统
 * @param   account,passwordFetch
 * @returns
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
 * 获取登录页logo
 * @returns {Promise<Result<T>>}
 */
export const fetchBaseConfig = () => {
  return Fetch('/system/baseConfig', {
    method: 'GET'
  });
};

/**
 * 验证token
 * @returns {Promise<Result<T>>}
 */
export const isLogin = () => {
  return Fetch('/login', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + (window.token ? ' ' + window.token : '')
    }
  });
};

/**
 * 获取wechat授权信息
 */
export const wechatOpenId = (code) => {
  return Fetch(`/pay/getWxOpenId/${code}`);
};

/**
 * 获取wechat appid
 */
export const wxAppId = () => {
  return Fetch('/pay/getWxConfig', {
    method: 'GET'
  });
};

/**
 * 获取微信授权登录开关
 */
export const fetchWxLoginStatus = () => {
  return Fetch('/third/login/wechat/status/APP');
};

//获取微信授权的appId
export const getAuthAppId = () => {
  return Fetch('/third/login/wechat/set/detail/APP');
};

/**
 * 微信登录接口
 * @param {} params
 */
export const wechatAuth = (params) => {
  params.channel = 'app';
  return Fetch('/third/login/wechat/auth', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};

/**
 * 验证码登录  发送验证码
 * @type {Promise<AsyncResult<T>>}
 */
export const sendCode = (mobile, showLogin) => {
  return showLogin
    ? Fetch(`/login/verification/${mobile}`, {
        method: 'POST'
      })
    : Fetch(`/checkSmsByRegister/web/modal/${mobile}`, {
        method: 'POST'
      });
};

export const sendEnterpriseRegisterCode = (tel,uuid,patchca) => {
  return Fetch('/checkSmsByRegister', {
    method: 'POST',
    body: JSON.stringify({
      customerAccount: tel,
      patchca: patchca,
      uuid: uuid
    })
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
 * 弹框注册，不携带图形验证码
 * @param account
 * @param telCode
 * @param password
 */
export const registerModal = (account, telCode, password) => {
  return Fetch('/register/modal', {
    method: 'POST',
    body: JSON.stringify({
      customerAccount: account,
      customerPassword: password,
      verifyCode: telCode
    })
  });
};

/**
 * 完善账户信息
 * @param params
 */
export const doPerfect = (params = {}) => {
  return Fetch('/perfect', {
    method: 'POST',
    body: JSON.stringify({
      ...params
    })
  });
};


/**
 * 注册验证
 * @param {string} mobile
 * @param {string} code
 * @param fromPage
 * @returns {Promise<Result<any>>}
 */
export const checkRegister = (mobile, code,fromPage) => {
    return Fetch('/register/check', {
        method: 'POST',
        body: JSON.stringify({
            customerAccount: mobile,
            verifyCode: code,
            fromPage:fromPage
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

/**
 *
 * @param params
 */
export const doRegisterEnterprise = (params = {}) =>{
  return Fetch('/registerEnterprise', {
    method: 'POST',
    body: JSON.stringify({
      ...params
    })
  });
};

/**
 * 获取注册限制
 */
export const getRegisterLimitType = () =>
  Fetch('/getRegisterLimitType', { method: 'POST' });


/**
 * 校验员工是否存在
 */
export const validateEmployeeExist = (jobNo) => {
  return Fetch('/employeeJobNoExist',{
    method: 'POST',
    body: JSON.stringify({
      jobNo:jobNo
    })
  });
};
