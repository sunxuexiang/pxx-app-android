import { Actor, Action } from 'plume2';

export default class RecordActor extends Actor {
  defaultState() {
    return {
      tradeDilivery: [],
      orderId: '',
      status: '',
      deliveryStatus: false,
      type: '0',
      logisticsCompanyInfo: null
    };
  }

  /**
   * 获取发货详情，初始化页面
   * @param state
   * @param params
   * @returns {Map<string, V>}
   */
  @Action('record:init')
  init(state, params) {
    return state.set('tradeDilivery', params);
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
   * 判断是否是客户订单物流信息标记
   * @param state
   * @param status
   */
  @Action('record:type')
  deliveryType(state, status) {
    return state.set('type', status);
  }

  /**
   * 设置物流公司信息
   * @param {} state 
   * @param {*} logisticsCompanyInfo 
   */
  @Action('record:logisticsCompanyInfo')
  SetLogisticsCompanyInfo(state, logisticsCompanyInfo) {
    return state.set('logisticsCompanyInfo', logisticsCompanyInfo);
  }
}
