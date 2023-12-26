import { msg, Store } from 'plume2';
import AsyncStorage from '@react-native-community/async-storage';
import { config } from 'wmkit/config';
import { cache } from 'wmkit/cache';
import * as webapi from './webapi';
import ListActor from './actor/list-actor';

export default class AppStore extends Store {
  bindActor() {
    return [new ListActor()];
  }

  constructor(props) {
    super(props);

    if (__DEV__) {
      //debug
      window._store = this;
    }
  }

  /**
   * 初始化地址列表
   * @returns {Promise<void>}
   */
  init = async () => {
    const addresses = await webapi.fetchAddresses();
    this.transaction(() => {
      this.dispatch('address-list:list', addresses.context);
      this.dispatch('address-list:loading', false);
    });
  };

  /**
   * 设为默认收货地址
   */
  setDefault = async (addressId) => {
    const { code, message } = await webapi.setDefault(addressId);
    if (code !== config.SUCCESS_CODE) {
      msg.emit('app:tip', message);
    } else {
      msg.emit('app:tip', message);
      this.init();
    }
  };

  /**
   * 删除收货地址
   */
  deleteAddress = async (addressId) => {
    const res = await webapi.deleteAddress(addressId);
    if (res.code !== config.SUCCESS_CODE) {
      msg.emit('app:tip', res.message);
    } else {
      if (
        (await AsyncStorage.getItem(cache.ORDER_CONFIRM)) &&
        JSON.parse(await AsyncStorage.getItem(cache.ORDER_CONFIRM))
      ) {
        const {
          defaultAddr,
          deliverWay,
          payType,
          buyerRemark,
          orderConfirm,
          pointsOrderConfirm,
          invoice,
          enclosures,
          defaultInvoiceAddr,
          VATInvoice,
          sperator
        } = JSON.parse(await AsyncStorage.getItem(cache.ORDER_CONFIRM));
        if (
          (defaultAddr && defaultAddr.deliveryAddressId == addressId) ||
          (defaultInvoiceAddr &&
            defaultInvoiceAddr.deliveryAddressId == addressId)
        ) {
          let firstAddress = defaultAddr;
          let secondAddress = defaultInvoiceAddr;
          const { context } = await webapi.fetchCustomerDefaultAddr();
          if (firstAddress && firstAddress.deliveryAddressId == addressId) {
            firstAddress = context || {};
          }
          if (secondAddress && secondAddress.deliveryAddressId == addressId) {
            secondAddress = context || {};
          }
          AsyncStorage.setItem(
            cache.ORDER_CONFIRM,
            JSON.stringify({
              defaultAddr: firstAddress,
              deliverWay,
              payType,
              buyerRemark,
              orderConfirm,
              pointsOrderConfirm,
              invoice,
              enclosures,
              defaultInvoiceAddr: secondAddress,
              VATInvoice,
              sperator
            })
          );
        }
      }

      // 更新purchaseAddress
      const purchaseAddress = await AsyncStorage.getItem(
        cache.PURCHASE_ADDRESS
      );
      if (purchaseAddress) {
        const { defaultAddr } = JSON.parse(purchaseAddress);
        if (addressId === defaultAddr && defaultAddr.deliveryAddressId) {
          AsyncStorage.removeItem(cache.PURCHASE_ADDRESS);
        }
      }
      await this.init();
      msg.emit('app:tip', res.message);
    }
  };

  /**
   * 重新加载
   */
  refresh = () => {
    this.dispatch('address-list: refreshState');
  };
}
