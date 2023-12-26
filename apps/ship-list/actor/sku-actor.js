import { Action, Actor } from 'plume2';

export default class SkuActor extends Actor {
  defaultState() {
    return {
      //商品详情
      goodList: {
        deliveryTime: '',
        logistics: {
          logisticCompanyName: '',
          logisticNo: ''
        },
        shippingItems: [],
        giftItemList: []
      }
    };
  }

  /**
   * 获取快递公司基本信息及商品基本信息
   * @param state
   * @param params
   * @returns {any}
   */
  @Action('list:goodItems')
  goodItems(state, params) {
    return state
      .setIn(
        ['goodList', 'logistics', 'logisticCompanyName'],
        params.logistics.logisticCompanyName
      )
      .setIn(
        ['goodList', 'logistics', 'logisticNo'],
        params.logistics.logisticNo
      )
      .setIn(['goodList', 'shippingItems'], params.shippingItems)
      .setIn(['goodList', 'giftItemList'], params.giftItemList)
      .setIn(['goodList', 'deliveryTime'], params.deliverTime);
  }
}
