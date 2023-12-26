import { Action, Actor } from 'plume2';
import { fromJS } from 'immutable';
import { MapTypes } from 'react-native-baidu-map';

export default class AddressMapActor extends Actor {
  defaultState() {
    return {
      keyWord: '',
      addressId: '',
      consigneeName: '',
      consigneeNumber: '',
      isDefaltAddress: 0,
      zoomControlsVisible: true,
      trafficEnabled: false,
      baiduHeatMapEnabled: false,
      mapType: MapTypes.NORMAL,
      zoom: 15,
      center: {
        longitude: 0.0,
        latitude: 0.0,
      },
      aroundAddressList: [],
      provinceId: '',
      cityId: '',
      areaId: '',
    };
  }

  /**
   * 设置 键值
   * @param state
   * @param field
   * @param value
   * @returns {*}
   */
  @Action('set: field : value')
  fieldValue(state, { field, value }) {
    return state.set(field, fromJS(value));
  }

  @Action('set: area')
  getArea(state, area) {
    const [provinceId, cityId, areaId] = area;
    return state
      .set('provinceId', provinceId)
      .set('cityId', cityId)
      .set('areaId', areaId);
  }
}
