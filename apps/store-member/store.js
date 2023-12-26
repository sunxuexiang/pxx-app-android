/**
 * Created by chenpeng on 2017/12/20.
 */
import { Store, msg } from 'plume2';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { myPvUvStatis } from 'wmkit/wm_sta';
import { config } from 'wmkit/config';
import { Confirm } from 'wmkit/modal/confirm';
import { cache } from 'wmkit/cache';

import * as webApi from './webapi';
import StoreMemActor from './actor/store-mem-actor';

export default class AppStore extends Store {
  bindActor() {
    return [new StoreMemActor()];
  }

  constructor(props) {
    super(props);
    if (__DEV__) {
      window._store = this;
    }
  }

  /**
   * 初始化
   * @param storeId
   * @returns {Promise.<void>}
   */
  init = async (storeId) => {
    //登录信息
    AsyncStorage.getItem(cache.LOGIN_DATA, (err, result) => {
      if (result) {
        this.dispatch(
          'store-member-actor:setCustomerName',
          JSON.parse(result).customerDetail.customerName
        );
      }
    });

    //店铺的会员等级与折扣信息
    const res = await webApi.storeMember(storeId);

    if (res.code === config.SUCCESS_CODE) {
      /**店铺pv/uv埋点*/
      myPvUvStatis('StoreMember', null, res.context.store.companyInfoId);

      this.dispatch('store-member-actor:init', res.context);
    } else {
      msg.emit('store-close:visible', true);
    }
  };

  /**
   * 联系商家
   * @param mobile
   */
  contact = (mobile) => {
    Confirm({
      text: '拨打电话: ' + mobile,
      cancelText: '取消',
      okText: '确认',
      okFn: () => {
        const telUrl = 'tel:' + mobile;

        Linking.canOpenURL(telUrl)
          .then((supported) => {
            if (!supported) {
              msg.emit('app:tip', `Can't handle url: ${telUrl}`);
            } else {
              return Linking.openURL(telUrl);
            }
          })
          .catch((err) => console.error('An error occurred', err));
      }
    });
  };
}
