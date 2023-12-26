import { Action, Actor } from 'plume2';
import { fromJS } from 'immutable';

export default class AddressEditActor extends Actor {
  defaultState() {
    return {
      //收货地址列表
      address: {
        consigneeName: '',
        consigneeNumber: '',
        provinceId: '',
        cityId: '',
        areaId: '',
        deliveryAddress: '',
        isDefaltAddress: 0,
        lat: 0.0,
        lng: 0.0
      },
      canSubmit:true,
      addressId:'',
      provinceCity: '',
    };
  }

  /**
   * 存储会员收货地址
   * @param state
   * @param address
   * @returns {Map<string, V>}
   */
  @Action('address: fetch')
  init(state, { addressInfo, addressId}) {
    return state.set('address', fromJS(addressInfo)).set('addressId',addressId);
  }

  @Action('set: provinceCity')
  setAddressInfo(state, provinceCity) {
    return state.set('provinceCity', provinceCity);
  }

  @Action('address:area')
  getArea(state, area) {
    const [provinceId, cityId, areaId] = area;
    return state
      .setIn(['address', 'provinceId'], provinceId)
      .setIn(['address', 'cityId'], cityId)
      .setIn(['address', 'areaId'], areaId);
  }

  /**
   * 表单值改变
   * @param state
   * @param area
   * @returns {any}
   */
  @Action('address:changeValue')
  onChange(state, changeValue) {
    return state.setIn(['address', changeValue['key']], changeValue['value']);
  }
  @Action('btn:changeCanSubmit')
  changeCanSubmit(state) {
    return state.set('canSubmit', !state.get('canSubmit'));
  }
}
