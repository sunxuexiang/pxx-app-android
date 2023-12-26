import { Store, msg } from 'plume2';
import SkuActor from './actor/sku-actor';
import * as webApi from './webapi';
import { config } from 'wmkit/config';

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
   * 获取商品清单
   */
  getTradeSkus = async tid => {
    const res = await webApi.fetchOrderDetail(tid);
    if (res.code == config.SUCCESS_CODE) {
      this.dispatch('detail-actor:setSkus', res.context.tradeItems);
      this.dispatch('detail-actor:setGifts', res.context.gifts);
      msg.emit('order:refresh');
    }
  };
}
