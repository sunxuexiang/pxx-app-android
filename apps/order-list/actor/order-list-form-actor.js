/**
 * Created by chenpeng on 2017/7/18.
 */
import { Action, Actor } from 'plume2';
import { fromJS, List } from 'immutable';

export default class FormActor extends Actor {
  defaultState() {
    return {
      // 列表数据
      form: {
        flowState: '', //订单流程状态
        payState: '', //订单付款状态
        keywords: '' //搜索内容
      },
      orders: [], //订单列表
      toRefresh: () => {},
      serverTime: 0,
      queryString: '', //搜索内容
      orderListType: 0, //订单显示类型
      // 积分总开关
      pointsIsOpen: false,
      deliveryStatus: true,  //自提订单确认收货按钮
      loadingStatus: true
    };
  }
  @Action('goodSkeleton:show')
  goodSkeleton(state, flag) {
    return state.set('loadingStatus', flag);
  }

  /**
   * 设置列表数据
   */
  @Action('order-list-form:setForm')
  setForm(state, params) {
    return state.set('form', fromJS(params));
  }

  /**
   * 更新订单数据
   */
  @Action('order-list-form:setOrders')
  updateOrders(state, params) {
    return state.update('orders', (value) => {
      return value.push(...params);
    });
  }

  /**
   * 切换tab时清除订单数据
   */
  @Action('order-list-form:clearOrders')
  clearOrders(state) {
    return state.set('orders', List());
  }

  @Action('order-list:toRefresh')
  toRefresh(state, toRefresh) {
    return state.set('toRefresh', toRefresh);
  }

  @Action('order-list-form:serverTime')
  serverTime(state, time) {
    return state.set('serverTime', time);
  }

  @Action('order-list:orderListType')
  orderListType(state, params) {
    return state.set('orderListType', params);
  }

  /**
   * 积分值开关
   */
  @Action('order:list:pointsIsOpen')
  pointsIsOpen(state) {
    return state.set('pointsIsOpen', true);
  }

  /**
   * 自提订单确认收货按钮
   */
  @Action('order:list:deliveryStatus')
  deliveryStatus(state) {
    return state.set('deliveryStatus', false);
  }
}
