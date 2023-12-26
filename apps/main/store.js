import { Store, msg } from 'plume2';

import * as webApi from './webapi';
import GoodsActor from './actor/goods-actor';
import { cache } from 'wmkit/cache';
import { config } from 'wmkit/config';

import { fromJS } from 'immutable';
import {PermissionsAndroid, Platform} from 'react-native';
import { AsyncStorage } from 'react-native';
import { getBeforeAddress, setChooseCity } from '../../wmkit/ware-house/matchWare';
import * as FindArea from '../../wmkit/area/area';
import { Geolocation } from 'react-native-baidu-map';
import OpenSettings from '@wanmi/react-native-open-settings';
import { openSettings } from 'react-native-permissions';

export default class AppStore extends Store {
  constructor(props) {
    super(props);
  }

  bindActor() {
    return [new GoodsActor()];
  }

  setData = (field, value) => {
    this.dispatch('set:state', { field, value });
  };

  /**
   * 初始化数据
   */
  init = async () => {
    this.setPrewords();
    if(window.token){
      let res = await Promise.all([
        webApi.messagePage({
          pageSize: 10,
          pageNum: 0
        }),
        getBeforeAddress()
      ]);
      let message = null;
      if (
        res[0].code === config.SUCCESS_CODE
      ) {
        message = res[0];
      } else {
        msg.emit('app:tip', res[0].message);
      }
      let cityName = '';
      if(res[1] && res[1].length !=0){
        const cityId=res[1][0].cityId;
        cityName=FindArea.findCity(cityId);
        // const provinceName=FindArea.findProviceName(addressList[0].provinceId);
        await setChooseCity(cityId);
      }else{
        this.dispatch('set:state',{field:'modalVisible',value: true});
      }
      this.transaction(() => {
        this.setData('noticeNum', message?.context?.noticeNum);
        this.setData('preferentialNum', message?.context?.preferentialNum);
        this.dispatch('set:state', { field: 'cityInfo', value: cityName });
      });
    }else{
      await this.getGeolocation();
    }
  };

  /**
   * 设置预置词
   *
   */
  setPrewords = async () => {
    const result = await webApi.getPresetSearchTerms();
    if (result.code === config.SUCCESS_CODE) {
      let preWords = result?.context?.presetSearchTermsVO || [];

      this.dispatch('search:bar:setPre', preWords);
    } else {
      msg.emit('app:tip', result.message);
    }
  };

  /**
   * 刷新状态控制
   */
  loading = (flag) => {
    this.dispatch('goodsActor: loading', flag);
  };

  /**
   * 检查更新
   * 新旧版本对比
   * 相同不提示
   * 不同：
   * 查询本次版本是否不再提醒
   * 是：不提醒
   * 否：提醒
   */
  upgradeSetting = async () => {
    return new Promise((resolve) => {
      webApi.fetchUpgradeInfo().then((res) => {
        const { code, context } = res;
        if (code == config.SUCCESS_CODE) {
          if (context) {
            // 新版本号和旧版本号不一样，则提示更新
            if (Platform.OS === 'android' && config.CURRENT_VERSION !== context.latestVersion) {
              // 从缓存读取本次版本是否不再提醒
              AsyncStorage.getItem(cache.DO_NOT_NOTICE_AGAIN, (err, result) => {
                if (result) {
                  // 缓存中不再提醒的版本
                  let cacheVersion = JSON.parse(result).cacheVersion;
                  // 最新版本不是不再提醒版本
                  if (context.latestVersion != cacheVersion) {
                    this.showUpgradeModal(context);
                    // 删除已过去的版本
                    AsyncStorage.setItem(
                      cache.DO_NOT_NOTICE_AGAIN,
                      JSON.stringify({ cacheVersion: '' })
                    );
                    resolve(true);
                  }else{
                    resolve(false);
                  }
                } else {
                  this.showUpgradeModal(context);
                  resolve(true);
                }
              });
            }else{
              resolve(false);
            }
          }else{
            resolve(false);
          }
        }else{
          resolve(false);
        }
      });
    });
  };

  /**
   * 显示升级提醒弹框
   * @param context
   */
  showUpgradeModal = (context) => {
    let upgradeDesc = context.upgradeDesc
      ? context.upgradeDesc.replace(/\n/g, '<br/>')
      : '无';
    let params = {
      upgradeInfo: fromJS(context),
      modalVisible: true,
      upgradeDesc: upgradeDesc
    };
    msg.emit('upgrade-modal:visible', params);
  };

  /**
   * 显示隐私政策
   * @param
   */
  showPrivacyPolicyModal = async () => {
    //从缓存查看是否同意
    return new Promise((resolve) => {
      AsyncStorage.getItem(cache.AGREE_PRIVATECY_POLICY, (err, result) => {
        if(!result){
          let params = {
            showPrivacyModal: true
          };
          msg.emit('privacy-policy-modal:visible', params);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  };

  /**
   * 关闭弹框
   */
  setModalVisible=()=>{
    this.dispatch('set:state',{field:'modalVisible',value: false});
  };

  /**
   * 关闭弹框
   */
  setGeolocationVisible=()=>{
    this.dispatch('set:state',{field:'geolocationVisible',value: false});
  };

  openSettings() {
    this.setGeolocationVisible();
    return Platform.OS === 'ios'
      ? openSettings()
      : OpenSettings.openSettings();
  }

  getGeolocation = async () => {
    // 对于 Android 需要自行根据需要申请权限
    if (Platform.OS === 'android') {
      const grants = await PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION , PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION]);
      const granted = grants[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION];
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        this.dispatch('set:state',{field:'geolocationVisible',value: true});
        return;
      } else{
        this.dispatch('set:state',{field:'geolocationVisible',value: false});
      }

      const gpsGrant = grants[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION];
      if(gpsGrant !== PermissionsAndroid.RESULTS.GRANTED){
        this.dispatch('set:state',{field:'geolocationVisible',value: true});
        return;
      } else{
        this.dispatch('set:state',{field:'geolocationVisible',value: false});
      }
    }
    Geolocation.getCurrentPosition().then( async (data) => {
      const cityId = FindArea.findCityCode(data.city);
      this.dispatch('set:state', { field: 'cityInfo', value: data.city });
      if(cityId){
        await setChooseCity(cityId);
      }
    });
  };
}
