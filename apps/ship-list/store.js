import { Store } from 'plume2';
import SkuActor from './actor/sku-actor';
import * as webApi from './webapi';

export default class AppStore extends Store {
  bindActor() {
    return [new SkuActor()];
  }

  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  /**
   * 确认订单初始化
   * @returns {Promise<void>}
   */
  init = async (orderId, deliverId, type) => {
    const skuRes = await webApi.fetchAllGoods(orderId, deliverId, type);
    this.dispatch('list:goodItems', skuRes.context);
  };
}
