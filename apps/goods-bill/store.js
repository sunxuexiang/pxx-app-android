import { msg, Store } from 'plume2';
import SkuActor from './actor/sku-actor';
import * as webApi from './webapi';
import { Alert } from 'wmkit/modal/alert';

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
  fetchWillBuyGoodsList = async (storeId,isFlashSale) => {
    const skuRes = await webApi.fetchWillBuyGoodsList();
    if (skuRes.code == 'K-000000') {
      const store = skuRes.context.tradeConfirmItems.filter(
        f => f.supplier.storeId == storeId
      )[0];
      this.transaction(() => {
        this.dispatch('sku:list:isFlashSale',isFlashSale);
        this.dispatch('sku: list: fetch', {
          skus: store.tradeItems,
          isSelf: store.supplier.isSelf,
          gifts: store.gifts
        });
      });
    } else {
      Alert({
        text: skuRes.message || '',
        fn: () => msg.emit('router: goToNext', { routeName: 'PurchaseOrder' })
      });
    }
  };
}
