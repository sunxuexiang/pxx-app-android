import { Store, msg } from 'plume2';
import { fromJS } from 'immutable';
import { config } from 'wmkit/config';
import * as webApi from './webapi';
import MarketingActor from './actor/maketing-actor'

export default class AppStore extends Store {
  bindActor() {
    return [
      new MarketingActor(),
    ];
  }

  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  init = async(wareId, storeId) => {
    const { code, context } = await webApi.listStockOutGroupByStoreId(wareId, storeId);
    if (code == config.SUCCESS_CODE) {
        this.dispatch('flied: commonChange', {key:'resultMoney',value:context.stockOutGroupByStoreId.resultMoney});
        this.dispatch('flied: commonChange', {key:'resultTradeMarketings',value:context.stockOutGroupByStoreId.resultTradeMarketings});
        this.dispatch('flied: commonChange', {key:'gift',value:context.stockOutGroupByStoreId.gift});
    }
  }

  
}
