/**
 * Created by chenpeng on 2017/7/4.
 */
import { Store } from 'plume2';
import AsyncStorage from '@react-native-community/async-storage';

import { config } from 'wmkit/config';
import { cache } from 'wmkit/cache';
import PayMentActor from './actor/payment-actor';
import * as webApi from './webapi';

export default class AppStore extends Store {
  bindActor() {
    return [new PayMentActor()];
  }

  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  /**
   * 选择支付方式
   * @param payId
   */
  onSelectPayInfo = (params) => {
    const { payId } = params;
    if (payId == this.state().get('payType')) {
      return;
    }
    this.dispatch('payment: type', payId);
  };

  /**
   * 获取可用支付选项
   */
  init = async () => {
    const { payType, openGroupon } = JSON.parse(
      await AsyncStorage.getItem(cache.ORDER_CONFIRM_PAYTYPE)
    );
    if (payType != null) {
      const { code, context } = await webApi.fetchOnlinePayStatus();
      if (code === config.SUCCESS_CODE && context == true) {
        const data = [
          { id: '0', name: '在线支付' },
          { id: '1', name: '线下支付' }
        ];
        this.dispatch('payment: init', data);
        // 设置在线支付选中
        this.onSelectPayInfo({ payId: payType });
      } else {
        // 设置线下支付选中
        this.onSelectPayInfo({ payId: '1' });
      }
    }

    // 如果是拼团单，设置成在线支付
    if (openGroupon != null) {
      const data = [{ id: '0', name: '在线支付' }];
      this.dispatch('payment: init', data);
      this.onSelectPayInfo({ payId: '0' });
    }
  };
}
