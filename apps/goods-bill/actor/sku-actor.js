import { Action, Actor } from 'plume2';
import { fromJS } from 'immutable';

export default class SkuActor extends Actor {
  defaultState() {
    return {
      orderSkus: [], //待购买商品
      isSelf: false, //是否是自营商品
      gifts: [], //赠品
      isFlashSale: false //是否是抢购商品
    };
  }

  /**
   * 存储待购买商品集合
   * @param state
   * @param orderSkus
   * @returns {Map<string, V>}
   */
  @Action('sku: list: fetch')
  fetchOrderSkus(state, { skus, isSelf, gifts }) {
    return state
      .set('orderSkus', fromJS(skus))
      .set('isSelf', isSelf)
      .set('gifts', gifts);
  }

  @Action('sku:list:isFlashSale')
  setIsFlashSale(state, flag) {
    return state
      .set('isFlashSale', flag);
  }
}
