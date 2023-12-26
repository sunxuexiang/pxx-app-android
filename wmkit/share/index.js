import { NativeModules, Platform, Linking } from 'react-native';
import { msg } from 'plume2';
import AsyncStorage from '@react-native-community/async-storage';
import { Confirm } from 'wmkit/modal/confirm';
import { suffixForShare } from 'wmkit/oss-util';
import { cache } from 'wmkit/cache';
import * as WMkit from 'wmkit/kit';
import { shareGoods } from './webapi';

/**
 * 分享到朋友圈
 * @param {*} goods
 *  url: goods.url,
    title: goods.title,
    description: goods.desc,
    imgUrl: goods.imgUrl
 */
export const shareToMoments = (goods) => {
  _shareForWeixin(goods, 'shareToMoments');
};

/**
 * 分享到朋友
 * @param {*} goods
 *  url: goods.url,
    title: goods.title,
    description: goods.desc,
    imgUrl: goods.imgUrl
 */
export const shareToFriends = (goods) => {
  _shareForWeixin(goods, 'shareToFriends');
};

/**
 * 分享到朋友圈
 * @param {*} imgSrc
 */
export const shareImageToMoments = (imgSrc) => {
  _shareImageForWeixin(imgSrc, 'shareImageToMoments');
};

/**
 * 分享到朋友
 * @param {*} imgSrc
 */
export const shareImageToFriends = (imgSrc) => {
  _shareImageForWeixin(imgSrc, 'shareImageToFriends');
};

/**
 * 微信分享base方法
 * @param {*} goods
 * @param {*} shareType 分享类型枚举
 */
const _shareForWeixin = (goods, shareType) => {
  let manager;
  if (Platform.OS === 'ios') {
    manager = NativeModules.WeixinManager;
  } else if (Platform.OS === 'android') {
    manager = NativeModules.WeixinModule;
  }
  if (!manager) return;

  let url = goods.url;
  AsyncStorage.getItem(cache.LOGIN_DATA, (err, result) => {
    if (result) {
      const shareUserId = JSON.parse(result).customerId;
      if (url.indexOf('?') > -1) {
        url = url + '&shareUserId=' + shareUserId;
      } else {
        url = url + '?shareUserId=' + shareUserId;
      }
    }
    let shareFunction;
    if (shareType == 'shareToMoments') {
      shareFunction = manager.shareToMoments;
    } else if (shareType == 'shareToFriends') {
      shareFunction = manager.shareToFriends;
    }
    if (!shareFunction) return;
    try {
      shareFunction(
        {
          url: url,
          title: goods.title,
          description: goods.description,
          imgUrl: goods.imgUrl ? suffixForShare(goods.imgUrl) : ''
        },
        (message, _result) => {
          if (message === '未安装微信') {
            if (Platform.OS === 'ios') {
              Confirm({
                title: '分享',
                text: '抱歉，您的设备暂未安装手机微信，请安装后再分享',
                cancelText: '取消',
                okText: '现在安装',
                okFn: () =>
                  Linking.openURL(
                    'https://itunes.apple.com/cn/app/%E5%BE%AE%E4%BF%A1/id414478124?mt=8'
                  )
              });
            } else {
              msg.emit('app:tip', '抱歉，您未安装微信客户端无法分享');
            }
          }
          if (WMkit.isLogin()) {
            shareGoods();
          }
        }
      );
    } catch (e) {
      console.log('出错了……', e);
    }
  });
};

/**
 * 微信分享base方法
 * @param {*} imgSrc
 * @param {*} shareType 分享类型枚举
 */
const _shareImageForWeixin = (imgSrc, shareType) => {
  let manager;
  if (Platform.OS === 'ios') {
    manager = NativeModules.WeixinManager;
  } else if (Platform.OS === 'android') {
    manager = NativeModules.WeixinModule;
  }
  if (!manager) return;

  let shareFunction;
  if (shareType == 'shareImageToMoments') {
    shareFunction = manager.shareImageToMoments;
  } else if (shareType == 'shareImageToFriends') {
    shareFunction = manager.shareImageToFriends;
  }
  if (!shareFunction) return;

  shareFunction({ imgObject: imgSrc }, (message, _result) => {
    if (message === '未安装微信') {
      if (Platform.OS === 'ios') {
        Confirm({
          title: '分享',
          text: '抱歉，您的设备暂未安装手机微信，请安装后再分享',
          cancelText: '取消',
          okText: '现在安装',
          okFn: () =>
            Linking.openURL(
              'https://itunes.apple.com/cn/app/%E5%BE%AE%E4%BF%A1/id414478124?mt=8'
            )
        });
      } else {
        SimpleTip('抱歉，您未安装微信客户端无法分享');
      }
    }
  });
};
