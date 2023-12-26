import { Actor, Action } from 'plume2';

export default class RecordActor extends Actor {
  defaultState() {
    return {
     /* tradeDilivery: [],
      orderId: '',
      status: '',
      deliveryStatus: false,
      type: '0'*/
      pickUpRecord:{},
      address:'',
      order:{},
      orderId: ''
    };
  }

  /**
   * 获取自提详情，初始化页面
   * @param state
   * @param params
   * @returns {Map<string, V>}
   */
  @Action('record:init')
  init(state, params) {
    return state.set('pickUpRecord', params);
  }

  /**
   * 获取订单详情
   * @param state
   * @param params
   * @returns {Map<string, V>}
   */
  @Action('record:order')
  initOrder(state, params) {
    return state.set('order', params);
  }

  /**
   * 根据订单的发货状态决定是否显示确认收货按钮(全部发货时方可显示)
   * @param state
   * @param status
   * @returns {Map<string, boolean>}
   */
  @Action('record:deliveryStatus')
  deliveryStatus(state, status) {
    return state.set('deliveryStatus', status);
  }

  /**
   * 获取订单ID
   */
  @Action('record:orderId')
  orderId(state, id) {
    return state.set('orderId', id);
  }

  /**
   * 地址初始话
   * @param state
   * @param status
   */
  @Action('record:address')
  deliveryType(state, status) {
    return state.set('address', status);
  }
}
