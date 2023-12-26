import { Store, msg } from 'plume2';
import * as _ from 'wmkit/common/util';
import * as webApi from './webapi';
import SkuActor from './actor/sku-actor';

export default class AppStore extends Store {
  bindActor() {
    return [new SkuActor()];
  }

  constructor(props) {
    super(props);
    if (__DEV__) {
      //debug
      window._store = this;
    }
  }

  /**
   * 退单商品初始化
   */
  init = async (rid) => {
    const skuRes = await webApi.fetchReturnDetail(rid);
    if (skuRes.code == 'K-000000') {
      this.dispatch('sku: list: fetch', skuRes.context.returnItems);
      this.dispatch('gift: list: fetch', skuRes.context.returnGifts);
    } else {
      msg.emit('app:tip', skuRes.message);
    }

    this.dispatch('sku: list: loadingEnd');
  };
}
