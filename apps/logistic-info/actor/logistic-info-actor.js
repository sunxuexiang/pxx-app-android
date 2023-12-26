import { Actor, Action } from 'plume2';

export default class LogisticsInfoActor extends Actor {
  defaultState() {
    return {
      //是否检索到物流信息，有为true,无为false
      result: true,
      detail: [],
      goodList: {
        deliveryTime: '',
        logistics: {
          logisticCompanyName: '',
          logisticNo: '',
          logisticStandardCode: ''
        },
        logisticsCompanyInfo: {}
      }
    };
  }

  @Action('logistics:init')
  init(state, res) {
    return state.set('detail', res);
  }

  @Action('logistics:info')
  info(state, params) {
    return state
      .setIn(
        ['goodList', 'logistics', 'logisticCompanyName'],
        params.logistics.logisticCompanyName
      )
      .setIn(
        ['goodList', 'logistics', 'logisticNo'],
        params.logistics.logisticNo
      )
      .setIn(
        ['goodList', 'logistics', 'logisticStandardCode'],
        params.logistics.logisticStandardCode
      )
      .setIn(['goodList', 'deliveryTime'], params.deliverTime)
      .setIn(['goodList', 'logisticsCompanyInfo'], params.logisticsCompanyInfo);
  }

  @Action('logistics:result')
  result(state) {
    return state.set('result', false);
  }
}
