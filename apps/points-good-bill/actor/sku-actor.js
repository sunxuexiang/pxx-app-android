import { Action, Actor } from 'plume2';
import { fromJS } from 'immutable';

export default class SkuActor extends Actor {
  defaultState() {
    return {
      orderSku: {}, //待购买商品
      isSelf: false //是否是自营商品
    };
  }

  /**
   * 存储待购买商品集合
   * @param state
   * @param orderSkus
   * @returns {Map<string, V>}
   */
  @Action('sku: fetch')
  fetchOrderSkus(state, { sku, isSelf }) {
    return state
      .set('orderSku', fromJS(sku))
      .set('isSelf', isSelf);
  }

}
