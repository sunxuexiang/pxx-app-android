import {
  NativeModules,
  Platform,
  Linking,
  DeviceEventEmitter,
  NativeEventEmitter
} from 'react-native';
import { msg } from 'plume2';

import { Confirm } from 'wmkit/modal/confirm';

/**
 * 微信授信登录，引导用户到确认授权页面
 */
export const wxLogin = () => {
  return getCode('snsapi_userinfo');
};

/**
 * app提现，提现时要拿到openId
 * 静默授权，不用弹窗确认授权
 */
export const wxBeforeDrawCash = () => {
  return getCode('snsapi_base');
};

/**
 * 微信授权第一步，用户同意授权，获取code
 * code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期。
 * @param scope
 * @returns {Promise<T>}
 */
export const getCode = (scope) => {
  const state = Math.random().toString(); // state先用随机数简单处理
  return new Promise((resolve, reject) => {
    // 1.获取微信manager模块，这块可以考虑和分享公用
    let manager, emitter;
    if (Platform.OS === 'ios') {
      manager = NativeModules.WeixinManager;
      emitter = new NativeEventEmitter(NativeModules.WXEventManager);
      emitter = emitter.addListener('wxAuthResp', (resp) => {
        // msg.emit('app:tip', JSON.stringify(resp));
        if (state === resp.state) {
          resolve(resp);
          emitter.remove();
        }
      });
    } else if (Platform.OS === 'android') {
      manager = NativeModules.WeixinModule;
      emitter = DeviceEventEmitter.addListener('wxAuthResp', (resp) => {
        // msg.emit('app:tip', JSON.stringify(resp));
        if (state === resp.state) {
          resolve(resp);
          emitter.remove();
        }
      });
    }
    if (!manager) return;

    // 2.调用接口，发起授信登录(WeixinModule.quickLogin)
    manager.quickLogin(
      {
        state: state,
        scope: scope
      },
      (message, _result) => {
        if (message === '未安装微信') {
          if (Platform.OS === 'ios') {
            Confirm({
              title: '微信登录',
              text: '抱歉，您的设备暂未安装手机微信，请安装后再使用微信登录',
              cancelText: '取消',
              okText: '现在安装',
              okFn: () =>
                Linking.openURL(
                  'https://itunes.apple.com/cn/app/%E5%BE%AE%E4%BF%A1/id414478124?mt=8'
                )
            });
          } else {
            msg.emit('app:tip', '抱歉，您未安装微信客户端无法微信登录');
          }
          reject({});
        }
      }
    );
  }).catch((_err) => {});
};
