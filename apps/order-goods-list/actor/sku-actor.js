import { Action, Actor } from 'plume2';
import { fromJS } from 'immutable';

export default class SkuActor extends Actor {
  defaultState() {
    return {
      skus: [], //商品集合
      // 是否是自营店铺
      isSelf: false,
      gifts: [] //赠品集合
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
   * 设置是否自营
   */
  @Action('detail-actor:setIsSelf')
  setIsSelf(state, param) {
    return state.set('isSelf', param);
  }

  /**
   * 设置赠品清单
   */
  @Action('detail-actor:setGifts')
  setGifts(state, param) {
    return state.set('gifts', fromJS(param));
  }
}
