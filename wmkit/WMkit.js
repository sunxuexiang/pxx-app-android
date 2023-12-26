/**
 * Created by feitingting on 2017/9/2.
 */
import AsyncStorage from '@react-native-community/async-storage';
import { msg } from 'plume2';
import ValidConst from 'wmkit/validate';
import Fetch from 'wmkit/fetch';
import * as WMkit from 'wmkit/kit';

import { cache } from 'wmkit/cache';

/**
 * 退出登录
 */
export const logout = () => {
  window.token = '';
  AsyncStorage.removeItem(cache.LOGIN_DATA);
  AsyncStorage.removeItem(cache.IS_DISTRIBUTOR);
  window.isDistributor = '';
  msg.emit('purchaseNum:refresh');
};

/**
 * 公共手机号码校验
 * @param tel
 * @returns {boolean}
 */
export const testTel = (tel) => {
  const regex = ValidConst.phone;
  if (tel) {
    if (!regex.test(tel)) {
      msg.emit('app:tip', '无效的手机号');
      return false;
    } else {
      return true;
    }
  } else {
    msg.emit('app:tip', '请填写手机号');
    return false;
  }
};

/**
 * 公共密码校验
 * @param pass
 * @returns {boolean}
 */
export const testPass = (pass) => {
  const regex = /^[A-Za-z0-9]{6,16}$/;
  if (pass) {
    if (!regex.test(pass)) {
      msg.emit('app:tip', '密码仅限6-16位字母或数字');
      return false;
    } else {
      return true;
    }
  } else {
    msg.emit('app:tip', '请填写密码');
    return false;
  }
};

/**
 * 验证码校验方法
 * @param tel
 * @returns {boolean}
 */
export const testVerificationCode = (code: string) => {
  const regex = /^\d{6}$/;
  if (code) {
    if (!regex.test(code)) {
      msg.emit('app:tip', '验证码必须为6位数字');
      return false;
    } else {
      return true;
    }
  } else {
    msg.emit('app:tip', '请填写验证码');
    return false;
  }
};

/**
 * 登录时的账号校验（不校验规则）
 * @param pass
 */
export const testLoginPass = (pass) => {
  if (pass == '') {
    msg.emit('app:tip', '请填写密码');
    return false;
  } else {
    return true;
  }
};

/**
 * Base64加密
 */
export function Base64() {
  const _keyStr =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  const _keyStrUrl =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=';
  this.encode = function (input) {
    return encodebase(input, _keyStr);
  };

  // public method for decoding
  this.decode = function (input) {
    return decodebase(input, _keyStr);
  };

  this.urlEncode = function (input) {
    //将/号替换为_  将+号替换为-  后端采用 new String(Base64.getUrlDecoder().decode(encrypted.getBytes())) 进行解码
    return encodebase(input, _keyStrUrl);
  };

  this.urlDecode = function (input) {
    //将_号替换为/ 将-号替换为+
    return decodebase(input, _keyStrUrl);
  };

  const encodebase = (input, _keyStr) => {
    let output = '';
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    let i = 0;
    input = _utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output =
        output +
        _keyStr.charAt(enc1) +
        _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) +
        _keyStr.charAt(enc4);
    }
    return output;
  };

  const decodebase = (input, _keyStr) => {
    let output = '';
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;
    input = input.replace(/[^A-Za-z0-9+/=]/g, '');
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = _utf8_decode(output);
    return output;
  };

  // private method for UTF-8 encoding
  const _utf8_encode = (string) => {
    string = string.replace(/\r\n/g, '\n');
    let utftext = '';
    for (let n = 0; n < string.length; n++) {
      let c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  };

  // private method for UTF-8 decoding
  const _utf8_decode = (utftext) => {
    let string = '';
    let i = 0;
    let c,
      c2,
      c3 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if (c > 191 && c < 224) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(
          ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
        );
        i += 3;
      }
    }
    return string;
  };
}

/**
 * 防抖函数 - 延迟执行版
 *   场景介绍: 1.搜索框联想,等用户输入完毕后,延迟n秒后,检索出匹配的关键词
 * @param func 真正执行的业务函数
 * @param wait 延迟时间
 * @returns {()=>undefined}
 */
export function delayFunc(func, wait) {
  let timeout,
    context = null,
    args;
  wait = wait || 300;

  const later = function () {
    func.apply(context, args);
    timeout = context = args = null;
  };

  return function () {
    args = arguments;
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * 防抖函数 - 立即执行版
 *   场景例如: 确认下单,需要立即执行,但抛弃执行连续点击的后几次动作事件
 * @param func 真正执行的业务函数
 * @param wait n毫秒时间内只触发第一次
 * @returns {()=>undefined}
 */
export function onceFunc(func, wait) {
  let timeout,
    context = null,
    args;
  wait = wait || 800;

  const later = function () {
    timeout = context = args = null;
  };

  return function () {
    if (timeout) {
      clearTimeout(timeout);
    } else {
      args = arguments;
      func.apply(context, args);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * 判断是否登录
 * @returns {boolean}
 */
export const isLogin = async () => {
  if (window.token) {
    return true;
  } else {
    return new Promise((resolve) => {
      AsyncStorage.getItem(cache.LOGIN_DATA, (err, result) => {
        if (result) {
          window.token = JSON.parse(result).token;
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
};

/**
 * 已登录 或 没有开放访问
 *   反之 未登录 且 开放访问
 * @returns {boolean}
 */
const isLoginOrNotOpen = (): boolean => {
  return window.token || window.needLogin;
  // return false;
};

const WMkit = {
  isLoginOrNotOpen
};

export { WMkit };

/**
 * 需要登录但未登录时
 * @param url
 * @private
 */
export const dealNotLogin = (url) => {
  if (!WMkit.isLoginOrNotOpen()) {
    msg.emit('loginModal:toggleVisible', {
      callBack: () => {
        msg.emit('router: goToNext', { routeName: url });
      }
    });
  } else {
    msg.emit('router: goToNext', { routeName: url });
  }
};

/**
 * 公共方法（验证token的有效性）
 * @returns {Promise.<void>}
 */
export const testToken = async () => {
  //token存在时，更新token
  if (window.token) {
    let res = await Fetch('/login', {
      method: 'GET'
    });
    //token非法且不是因为网络原因，强制退出登录
    if (res.code != 'K-000000' && res.code != 'S-000002') {
      msg.emit('app:tip', res.message);
      //强制退出登录
      WMkit.logout();
    } else {
      window.token = res.context;
    }
  }
};

/**
 * 当前登陆人是否是小B
 */
export const isDistributor = () => {
  const distirbutor = window.isDistributor;
  const flag =
    (window.token !== '' || window.token !== undefined) && distirbutor == '1';
  if (overtime && (window.token !== '' || window.token !== undefined)) {
    setIsDistributor().then((_res) => {
      overtime = false;
      setTimeout(() => (overtime = true), 1000 * 3);
    });
  }
  return flag;
};
let overtime = true;
/**
 * 是否以小B身份登录(同时满足：当前登录用户是分销员、邀请人id为空)
 */
export const isDistributorLogin = (): boolean => {
  return isDistributor();
};
/**
 * 查询并缓存是否分销员字段
 */
export const setIsDistributor = () => {
  // return Fetch('/distribute/check/loginIsDistributor').then((res) => {
  //   if (res.code == 'K-000000') {
  //     window.isDistributor = res.context ? '1' : '0';
  //     AsyncStorage.setItem(cache.IS_DISTRIBUTOR, res.context ? '1' : '0');
  //     AsyncStorage.getItem(cache.LOGIN_DATA, (err, result) => {
  //       if (result) {
  //         let loginData = JSON.parse(result);
  //         loginData.customerDetail.isDistributor = res.context ? 1 : 0;
  //         AsyncStorage.setItem(cache.LOGIN_DATA, JSON.stringify(loginData));
  //       }
  //     });
  //   }
  // });
  window.isDistributor = 0;
  AsyncStorage.setItem(cache.IS_DISTRIBUTOR, '0');
};

/**
 * 验证邀请码
 * @param inviteCode
 * @returns {boolean}
 */
export const testInviteCode = (inviteCode: string) => {
  const regex = /^[A-Z0-9]{8}$/;
  if (inviteCode) {
    if (!regex.test(inviteCode)) {
      msg.emit('app:tip', '请填写正确的邀请码');
      return false;
    } else {
      return true;
    }
  } else {
    msg.emit('app:tip', '请填写邀请码');
    return false;
  }
};

/**
 * 获取服务时间
 */
export const queryServerTime = () => {
  return Fetch('/system/queryServerTime');
};

/**
 * 获取登陆人id
 */
export const getUserId = async () => {
  const loginData = await AsyncStorage.getItem(cache.LOGIN_DATA);
  return JSON.parse(loginData).customerId;
};
