import { Action, Actor } from 'plume2';
import { fromJS, List, Map } from 'immutable';

export default class GuideInvitesActor extends Actor {
  defaultState() {
    return {
      //获取h5-url，供分享
      h5Url: '',
      jobNo:'',
      today:fromJS({totalCount: 0, totalGoodsCount: 0, totalTradePrice: 0, tradeTotal: 0}),
      month:fromJS({totalCount: 0, totalGoodsCount: 0, totalTradePrice: 0, tradeTotal: 0}),
      total:fromJS({totalCount: 0, totalGoodsCount: 0, totalTradePrice: 0, tradeTotal: 0}),
    };
  }

  /**
   * 获取h5-url，供分享
   */
  @Action('goods-detail:getH5Url')
  getH5Url(state, data) {
    if (data) {
      data = data.endsWith('/') ? data.substring(0, data.length - 1) : data;
    }
    return state.set('h5Url', data);
  }
  
  @Action('guide:today')
  today(state, data) {
    return state.set('today', fromJS(data));
  }
  @Action('guide:month')
  month(state, data) {
    return state.set('month', fromJS(data));
  }
  @Action('guide:total')
  total(state, data) {
    return state.set('total', fromJS(data));
  }
  @Action('guide:jobNo')
  jobNo(state, data) {
    return state.set('jobNo', data);
  }
}
