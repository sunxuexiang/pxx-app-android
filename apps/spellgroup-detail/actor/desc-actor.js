import { Actor, Action } from 'plume2';

export default class DescActor extends Actor {
  defaultState() {
    return {
      // 商品详情内容
      descData: '',
      // 是否已从后台获取商品详情
      gotDescData: false
    };
  }

  @Action('desc:data')
  descData(state, data) {
    return state.set('descData', data).set('gotDescData', true);
  }
}
