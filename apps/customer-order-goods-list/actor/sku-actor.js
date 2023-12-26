import { Action, Actor } from 'plume2';
import { fromJS } from 'immutable';

export default class SkuActor extends Actor {
  defaultState() {
    return {
      skus: [], //商品集合
      gifts: [], //赠品集合
      // 是否自购订单
      selfBuy: false
    };
  }

  /**
   * 设置商品清单
   */
  @Action('detail-actor:setSkus')
  setSkus(state, param) {
    return state.set('skus', fromJS(param));
  }

  /**
   * 设置赠品清单
   */
  @Action('detail-actor:setGifts')
  setGifts(state, param) {
    return state.set('gifts', fromJS(param));
  }

  /**
   * 是否自购订单
   */
  @Action('detail-actor:selfBuy')
  setSelfBuy(state, selfBuy) {
    return state.set('selfBuy', selfBuy);
  }
}
