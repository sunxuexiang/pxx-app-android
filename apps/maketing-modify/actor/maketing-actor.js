import { Action, Actor } from 'plume2';
import { fromJS, List, Map } from 'immutable';

export default class GoodsTabActor extends Actor {
  defaultState() {
    return {
      // 优惠金额
      resultMoney: 0,
      //营销信息
      resultTradeMarketings:[],
      //赠品信息
      gift:[]
    };
  }

  @Action('flied: commonChange')
  commonChange(state, {key,value}) {
    return state.set(key, value);
  }
}
