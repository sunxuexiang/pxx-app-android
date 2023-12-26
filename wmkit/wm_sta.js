/**
 * pv/uv收集埋点
 * Created by bail on 2017/9/26.
 */
import AsyncStorage from '@react-native-community/async-storage';
import { cache } from './cache';
import { config } from './config';
import DeviceInfo from 'react-native-device-info';
const sendHost = config.PV_UV_HOST;
const sendUrl = '/wm.gif';
const clientType = 'APP';

function getSendId(callback) {
  let sendId = null;
  AsyncStorage.getItem(cache.LOGIN_DATA, (err, result) => {
    if (result) {
      sendId = JSON.parse(result).customerId; //获取userId
    } else {
      sendId = DeviceInfo.getUniqueId(); //userId不存在,获取设备号
    }
    callback(sendId); //回调传输数据
  });
}

function myAjaxPost(dataStr) {
  fetch(sendHost + sendUrl + dataStr, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

export const myPvUvStatis = function (url, skuId, shopId) {
  getSendId(function (sendId) {
    myAjaxPost(
      '?id=' +
      sendId +
      '&url=' +
      url +
      '&clientType=' +
      clientType +
      '&skuId=' +
      (skuId || '') +
      '&shopId=' +
      (shopId || '')
    );
  });
};
