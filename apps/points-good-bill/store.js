import { Store, msg } from 'plume2';
import SkuActor from './actor/sku-actor';
import * as webApi from './webapi';
import { Confirm } from 'wmkit/modal/confirm';

export default class AppStore extends Store {
  bindActor() {
    return [new SkuActor()];
  }

  constructor(props) {
    super(props);
    (window)._store = this;
  }

  /**
   * 确认订单初始化
   * @returns {Promise<void>}
   */
  getExchangeItem = async (params) => {
    const res = await webApi.getExchangeItem(params);
    if (res.code == 'K-000000') {
      const store = res.context.pointsTradeConfirmItem;
      this.dispatch('sku: fetch', {
        sku: store.tradeItem,
        isSelf: store.supplier.isSelf
      });
    } else {
      Confirm({
        text: res.message,
        okText: '确定',
        okFn: msg.emit('router: goToNext', {routeName: 'PointsMail'})
      });
    }
  };
}
