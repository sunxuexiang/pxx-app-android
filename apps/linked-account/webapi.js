import Fetch from 'wmkit/fetch';

/**
 * 获取绑定状态
 */
export const queryLinkedAccountFlags = () => {
  // return Promise.resolve({
  //   code: 'K-000000',
  //   context: {
  //     wxFlag: true,
  //     qqFlag: true,
  //     weiboFlag: true
  //   }
  // });
  return Fetch('/third/login/linked-account-flags');
};

/**
 * 微信绑定
 */
export const wxBind = (params) => {
  return Fetch('/third/login/wechat/bind', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};

/**
 * 微信解绑
 */
export const thirdUnbind = (thirdLoginType) => {
  return Fetch(`/third/login/remove/bind/${thirdLoginType}`, {
    method: 'DELETE'
  });
  // return Promise.resolve({
  //   code: 'K-000000',
  //   context: {}
  // });
};
