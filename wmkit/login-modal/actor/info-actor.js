import { Actor, Action } from 'plume2';
export default class InfoActor extends Actor {
  defaultState() {
    return {
      customerDetail: {
        customerId: '',
        customerName: '',
        provinceId: '',
        cityId: '',
        areaId: '',
        customerAddress: '',
        contactName: '',
        contactPhone: ''
      }
    };
  }

  //监听会员详情属性值
  @Action('change:customerDetailField')
  changeCustomerDetailField(state, { field, value }) {
    return state.setIn(['customerDetail', field], value);
  }

  //获取省市区
  @Action('detail:area')
  getArea(state, area) {
    const [provinceId, cityId, areaId] = area;
    return state
      .setIn(['customerDetail', 'provinceId'], provinceId)
      .setIn(['customerDetail', 'cityId'], cityId)
      .setIn(['customerDetail', 'areaId'], areaId);
  }

  @Action('modal:detail:customer')
  modalDetail(state) {
    return state
      .setIn(['customerDetail', 'customerName'], '')
      .setIn(['customerDetail', 'provinceId'], '')
      .setIn(['customerDetail', 'cityId'], '')
      .setIn(['customerDetail', 'areaId'], '')
      .setIn(['customerDetail', 'customerAddress'], '')
      .setIn(['customerDetail', 'contactName'], '')
      .setIn(['customerDetail', 'contactPhone'], '');
  }
}
