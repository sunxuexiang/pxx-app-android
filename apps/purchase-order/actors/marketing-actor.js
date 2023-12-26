import { Actor, Action } from 'plume2';
import { fromJS, Map } from 'immutable';
export default class MarketingActor extends Actor {
  defaultState() {
    return {
      storeMarketingMap: fromJS({}),
      // 赠品列表
      giftList: fromJS([]),
      selectedMarketingGifts: fromJS([]),
      skuMarketingDict: fromJS({}),
      goodsMarketings: fromJS([]),
    };
  }

  @Action('set:state')
  setState(state, { field, value }) {
    return state.set(field, fromJS(value));
  }

  @Action('purchase:marketing:init')
  setState(state, params) {
    return state.
      set('storeMarketingMap', params.storeMarketingMap).
      set('giftList', fromJS(params.giftList)).
      set('goodsMarketings', params.goodsMarketings).
      set('selectedMarketingGifts', fromJS(params.selectedMarketingGifts)).
      set('skuMarketingDict', fromJS(params.skuMarketingDict));
  }


  /**
   * 设置店铺营销信息
   * @param {plume2. } state
   * @param storeList
   * @returns {plume2. }
   */
  @Action('purchase:storeMarketingMap')
  storeMarketingMap(state, storeMarketingMap) {
    return state.set('storeMarketingMap', storeMarketingMap);
  }

  @Action('purchaseOrder: giftList')
  giftList(state, giftList) {
    return state.set('giftList', fromJS(giftList));
  }

  /**
   * 选择的赠品
   * @param {plume2. } state
   * @param storeList
   * @returns {plume2. }
   */
  @Action('purchase:selectedMarketingGifts')
  selectedMarketingGift(state, selectedMarketingGifts) {
    return state.set('selectedMarketingGifts', fromJS(selectedMarketingGifts));
  }

}
