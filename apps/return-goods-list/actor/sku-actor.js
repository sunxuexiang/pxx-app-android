import { Action, Actor } from 'plume2';

export default class SkuActor extends Actor {
  defaultState() {
    return {
      returnSkus: [], // 退单商品
      returnGifts: [], //退单赠品
      isSelf: false,
      loading: true
    };
  }

  /**
   * 退单商品集合
   * @param state
   * @param orderSkus
   * @returns {Map<string, V>}
   */
  @Action('sku: list: fetch')
  fetchOrderSkus(state, returnSkus) {
    return state.set('returnSkus', returnSkus);
  }

  /**
   * 退单赠品
   */
  @Action('gift: list: fetch')
  fetchOrderGifts(state, returnGifts) {
    return state.set('returnGifts', returnGifts);
  }

  /**
   * 加载结束
   * @param state
   * @returns {*}
   */
  @Action('sku: list: loadingEnd')
  loadingEnd(state) {
    return state.set('loading', false);
  }
}
