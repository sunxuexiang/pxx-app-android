import AsyncStorage from '@react-native-community/async-storage';
import { msg, Store } from 'plume2';
import FormRegexUtil from 'wmkit/form/form-regex';
import { cache } from 'wmkit/cache';
import { config } from 'wmkit/config';

import { fromJS } from 'immutable';

import * as webapi from './webapi';
import AddressEditActor from './actor/address-edit-actor';
import { addressInfo,findProviceCode,findCityCode,findAreaCode } from '../../wmkit/area/area';
import { Geolocation } from 'react-native-baidu-map';

export default class AppStore extends Store {
  bindActor() {
    return [new AddressEditActor()];
  }

  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  /**
   * 初始化地址
   * @returns {Promise<void>}
   */
  init = async (addressId,lat,lng,name,addr,consigneeName, consigneeNumber,isDefaltAddress) => {
    if (addressId) {
      const address = await webapi.findAddressById(addressId);
      this.transaction(() => {
        this.dispatch('address: fetch', {addressInfo:address.context,addressId:addressId});
        const provinceId=address.context.provinceId;
        const cityId=address.context.cityId;
        const areaId=address.context.areaId;
        const info=addressInfo(provinceId,cityId,areaId);
        this.dispatch('set: provinceCity',info);
      });
    }

    if (lat && lng){
      //处理跨域请求添加指定回调函数callback=showLocation 和 jsoncallback= ?
      const url = 'https://api.map.baidu.com/geocoder/v2/?ak=G5cMUfuwGMGFNEevXjBDR9cNls8m8KpQ&output=json&pois=1&location='+ lat +',' + lng;
      fetch(url,{
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
        },
      }).then((response)=>response.json())
        .then((responseJson)=>{
            const province=responseJson.result.addressComponent.province;
            const city=responseJson.result.addressComponent.city;
            const area=responseJson.result.addressComponent.district;
          const provinceId=findProviceCode(province);
          const cityId=findCityCode(city);
          const areaId=findAreaCode(area);
          const address= this.state().get('address').toJS();
          address.provinceId=provinceId;
          address.cityId=cityId;
          address.areaId=areaId;
          address.lat=lat;
          address.lng=lng;
          address.consigneeName=consigneeName;
          address.consigneeNumber=consigneeNumber;
          address.isDefaltAddress=isDefaltAddress;
          if (addr.indexOf(province + city + area) != -1) {
              addr = addr.replace(province + city + area, '');
          } else if (addr.indexOf(city + area) != -1) {
              addr = addr.replace(city + area, '');
          } else if (addr.indexOf(province + area) != -1) {
              addr = addr.replace(province + area, '');
          }
          address.deliveryAddress=addr+'('+name+')';
          this.transaction(()=>{
            this.dispatch('address: fetch',
              {addressInfo:address,addressId:addressId});
            this.dispatch('set: provinceCity',
              responseJson.result.addressComponent.province + responseJson.result.addressComponent.city + responseJson.result.addressComponent.district);
          })
        })
    }
  };

  /**
   * 新增收货地址
   */
  saveAddress = async (addressId) => {
    const address = this.state().get('address');
    let flag = FormRegexUtil(address.get('consigneeName'), '收货人', {
      required: true,
      minLength: 2,
      maxLength: 15
    });
    if (!flag) return;
    flag = FormRegexUtil(address.get('consigneeNumber'), '手机号码', {
      required: true,
      regexType: 'mobile'
    });
    if (!flag) return;
    flag = FormRegexUtil(address.get('provinceId'), '所在地区', {
      required: true
    });
    if (!flag) return;
    flag = FormRegexUtil(address.get('deliveryAddress'), '详细地址', {
      required: true,
      minLength: 5,
      maxLength: 60
    });
    if (!flag) return;
    if (addressId != -1) {
      const { code, message, context } = await webapi.editAddress(address);
      this.messageByResult(code, message, context);
    } else {
      this.dispatch('btn:changeCanSubmit');
      const { code, message, context } = await webapi.saveAddress(address);
      this.messageByResult(code, message, context);
    }
  };

  /**
   * 操作结果的处理
   * @param res
   */
  async messageByResult(code, message, context) {
    if (code === config.SUCCESS_CODE) {
      msg.emit('app:tip', '保存成功！');
      //跳转返回初始化
      const params = await AsyncStorage.getItem(cache.ORDER_CONFIRM);
      if (params) {
        //选择地址页面
        let { defaultAddr, orderConfirm, comeFrom, pointsOrderConfirm } = JSON.parse(params);
        if (comeFrom == 'firstAddress') {
          await AsyncStorage.setItem(
            cache.ORDER_CONFIRM,
            JSON.stringify({
              defaultAddr: context,
              orderConfirm,
              comeFrom: comeFrom
            })
          );
          msg.emit('router: replace', { routeName: 'OrderConfirm' });
          return;
        }else if(comeFrom == 'firstPointsAddress'){
          await AsyncStorage.setItem(
            cache.ORDER_CONFIRM,
            JSON.stringify({
              defaultAddr: context,
              pointsOrderConfirm,
              comeFrom: comeFrom
            })
          );
          const params = {
            pointsGoodsId: pointsOrderConfirm.pointsGoodsId,
            num: pointsOrderConfirm.num
          };
          msg.emit('router: replace', {
            routeName: 'PointsOrderConfirm',
            params: params
          });
          return;
        } else if(comeFrom == 'firstFlashSaleAddress'){
          await AsyncStorage.setItem(
            cache.ORDER_CONFIRM,
            JSON.stringify({
              defaultAddr: context,
              orderConfirm,
              comeFrom: comeFrom
            })
          );
          msg.emit('router: replace', { routeName: 'FlashSaleOrderConfirm' });
          return;
        } else if ((comeFrom || '').startsWith('firstDefaultInvoiceAddr_')) {
          const storeId = comeFrom.substr(comeFrom.indexOf('_') + 1);
          comeFrom = 'invoice';
          orderConfirm = fromJS(orderConfirm)
            .map((m) => {
              if (m.get('storeId') == storeId) {
                m = m.set('defaultInvoiceAddr', context);
              }
              return m;
            })
            .toJS();
          await AsyncStorage.setItem(
            cache.ORDER_CONFIRM,
            JSON.stringify({
              defaultAddr: context,
              orderConfirm,
              comeFrom: comeFrom
            })
          );
          msg.emit('router: replace', { routeName: 'OrderConfirm' });
          return;
        } else {
          let firstAddress = defaultAddr;
          if (defaultAddr.deliveryAddressId == context.deliveryAddressId) {
            firstAddress = context;
          }
          orderConfirm = orderConfirm && fromJS(orderConfirm)
            .map((m) => {
              if (
                m.getIn(['defaultInvoiceAddr', 'deliveryAddressId']) ==
                context.deliveryAddressId
              ) {
                m = m.set('defaultInvoiceAddr', context);
              }
              return m;
            })
            .toJS();
          await AsyncStorage.setItem(
            cache.ORDER_CONFIRM,
            JSON.stringify({
              defaultAddr: firstAddress,
              orderConfirm,
              pointsOrderConfirm,
              comeFrom: comeFrom
            })
          );
        }
      }
      // 通知地址列表刷新
      msg.emit('address-list:refresh');
      // 返回上一页
      msg.emit('router: goToNext', { routeName: 'UserReceiveAddress' });
    } else {
      msg.emit('app:tip', message);
    }
  }

  /**
   * 改变收货人单条信息
   * @param key
   * @param value
   */
  onChange = (key, value) => {
    this.dispatch('address:changeValue', { key: key, value: value });
  };

  /**
   * 地址选择
   * @param value
   */
  getArea = () => {
    const addressId=this.state().getIn(['address','deliveryAddressId']);
    const consigneeName=this.state().getIn(['address','consigneeName']);
    const consigneeNumber=this.state().getIn(['address','consigneeNumber']);
    const isDefaltAddress=this.state().getIn(['address','isDefaltAddress']);
    const lat=this.state().getIn(['address','lat']);
    const lng=this.state().getIn(['address','lng']);
    msg.emit('router: goToNext',
      { routeName: 'AddressMap',
        addressId: addressId,
        consigneeName: consigneeName,
        consigneeNumber: consigneeNumber,
        isDefaltAddress:isDefaltAddress,
        lat: lat,
        lng: lng });
  };
}
