import Fetch from 'wmkit/fetch';

/**
 * 发送验证码
 */
export const sendCode = ({ phone, id }) => {
  return Fetch(`/third/login/bind/sendCode/${phone}/${id}`);
};

/**
 * 绑定
 */
export const weChatBind = (params) => {
  params.channel = 'APP';
  return Fetch('/third/login/wechat/auth/bind', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};
