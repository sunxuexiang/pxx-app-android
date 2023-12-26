import { Store, msg } from 'plume2';
import { fromJS } from 'immutable';
import AsyncStorage from '@react-native-community/async-storage';

import ShopIndexActor from './actor/shop-index-actor';
import * as webapi from './webapi';
import { config } from 'wmkit/config';
import { cache } from 'wmkit/cache';
export default class AppStore extends Store {
  bindActor() {
    return [new ShopIndexActor()];
  }

  constructor(props) {
    super(props);
  }

  init = async () => {
    const res = await Promise.all([
      webapi.queryDistributeInfo(),
      webapi.queryDistributeSetting()
    ]);
    if (
      res[0].code == config.SUCCESS_CODE &&
      res[1].code == config.SUCCESS_CODE
    ) {
      this.dispatch('InvitActor:baseInfo', {
        customerInfo: fromJS(res[0].context).get('distributionCustomerVO'),
        settingInfo: fromJS(res[1].context).get('distributionSettingSimVO')
      });
    }
  };

  openShareVisible = async () => {
    //获取登录人id
    const loginData = await AsyncStorage.getItem(cache.LOGIN_DATA);
    //调用后台接口，生成分享店铺码
    const res = await webapi.getShopShareCode({
      tag: 'shop',
      inviteeId: JSON.parse(loginData).customerId
    });
    if (res.code == config.SUCCESS_CODE) {
      //存储小程序码的链接
      this.dispatch('InvitActor:shopShareCode', res.context);
      //弹窗打开
      this.dispatch('InvitActor:changeShareVisible', true);
    }
  };

  closeShareVisible = () => {
    this.dispatch('InvitActor:changeShareVisible', false);
  };

  fetchDistributionSetting = async () => {
    const loginData = await AsyncStorage.getItem(cache.LOGIN_DATA);
    const inviteeId = JSON.parse(loginData).customerId;
    if (inviteeId) {
      const { code, context, message } = await webapi.fetchDistributionSetting(
        inviteeId
      );
      //存储分享店铺的图片
      if (code == config.SUCCESS_CODE) {
        this.dispatch(
          'InvitActor:shopShareImg',
          context.distributionSettingSimVO.shopShareImg
        );
      }
    }
  };

  changeShowShare = () => {
    this.dispatch('shop-index:changeShowShare');
  };

  saveCheckedSku = (sku) => {
    this.dispatch('shop-index:saveCheckedSku', fromJS(sku));
  };

  /**
   * 分享赚分享
   */
  toggleShareModal = () => {
    this.dispatch('shop-index:toggleShareVisible');
  };
}
