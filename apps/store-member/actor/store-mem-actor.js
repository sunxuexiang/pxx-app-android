/**
 * Created by chenpeng on 2017/12/20.
 */
import { Actor, Action } from 'plume2';

export default class StoreMemActor extends Actor {
  defaultState() {
    return {
      level: {}, //会员等级
      levelList: [], //店铺的会员体系
      store: {}, //店铺
      customerName: '' //客户名称
    };
  }

  /**
   * 初始化数据
   * @param state
   * @param params
   */
  @Action('store-member-actor:init')
  init(state, params) {
    return state.merge(params);
  }

  /**
   * 设置客户名称
   * @param state
   * @param param
   */
  @Action('store-member-actor:setCustomerName')
  setCustomerName(state, param) {
    return state.set('customerName', param);
  }
}
