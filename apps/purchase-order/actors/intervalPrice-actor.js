import { Actor, Action } from 'plume2';
import { fromJS } from 'immutable';

/**
 * 区间价格
 */
export default class IntervalPriceActor extends Actor {
  defaultState() {
    return {
      //区间价格
      intervalPrices: []
    };
  }

  @Action('purchase: intervalPrice')
  interverPrice(state, intervalPrices) {
    return state.set('intervalPrices', fromJS(intervalPrices));
  }
}
