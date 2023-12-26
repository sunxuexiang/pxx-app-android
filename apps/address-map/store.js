import { msg, Store } from 'plume2';
import AddressMapActor from './actor/address-map';
import { Geolocation } from 'react-native-baidu-map';
import { FindArea } from 'wmkit';

export default class AppStore extends Store {
  bindActor() {
    return [new AddressMapActor()];
  }

  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  init =(addressId,lat,lng,consigneeName, consigneeNumber,isDefaltAddress)=>{
    this.transaction(()=>{
      this.dispatch('set: field : value',{field:'addressId',value:addressId});
      this.dispatch('set: field : value',{field:'consigneeName',value:consigneeName});
      this.dispatch('set: field : value',{field:'consigneeNumber',value:consigneeNumber});
      this.dispatch('set: field : value',{field:'isDefaltAddress',value:isDefaltAddress});
    })
    if(lat !=0 && lng !=0){
      const center={
        latitude: lat,
        longitude: lng
      }
      Geolocation.reverseGeoCode(lat, lng).then((res)=>{
        const provinceId = FindArea.findProviceCode(res.province);
        const cityId = FindArea.findCityCode(res.city);
        const areaId = FindArea.findAreaCode(res.district);
        this.transaction(()=>{
          this.dispatch('set: field : value',{field:'provinceId',value:provinceId});
          this.dispatch('set: field : value',{field:'cityId',value:cityId});
          this.dispatch('set: field : value',{field:'areaId',value:areaId});
        })
      })
      this.dispatch('set: field : value',{field:'center',value:center});
      const params = {
        longitude: lng,
        latitude: lat,
      };
      this.getAroundAddress(params);
    } else {
      Geolocation.getCurrentPosition().then( data=>{
        const center={
          latitude: data.latitude,
          longitude: data.longitude
        };
        const params = {
          longitude: data.longitude,
          latitude: data.latitude,
        };
        this.getAroundAddress(params);
        this.dispatch('set: field : value',{field:'center',value:center});
        Geolocation.reverseGeoCode(data.latitude, data.longitude).then((res)=>{
          const provinceId = FindArea.findProviceCode(res.province);
          const cityId = FindArea.findCityCode(res.city);
          const areaId = FindArea.findAreaCode(res.district);
          this.transaction(()=>{
            this.dispatch('set: field : value',{field:'provinceId',value:provinceId});
            this.dispatch('set: field : value',{field:'cityId',value:cityId});
            this.dispatch('set: field : value',{field:'areaId',value:areaId});
          });
        })
      });
    }
  }

  reloadMap =(data)=>{
    const center={
      longitude: data.longitude,
      latitude: data.latitude,
    };
    this.dispatch('set: field : value',{field:'center',value:center});
  }

  getAroundAddress= async(point)=>{
    const lng = point.longitude;
    const lat = point.latitude;
    //处理跨域请求添加指定回调函数callback=showLocation 和 jsoncallback= ?
    const url = 'https://api.map.baidu.com/geocoder/v2/?ak=G5cMUfuwGMGFNEevXjBDR9cNls8m8KpQ&output=json&pois=1&location='+ lat +',' + lng;
    fetch(url,{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
    }).then((response)=>response.json())
      .then((responseJson) => {
        this.dispatch('set: field : value',{field:'aroundAddressList',value:responseJson.result.pois});
      })
  };

  setKeyWord=(value)=>{
    this.dispatch('set: field : value',{field:'keyWord',value:value});
  };

  changeArea =(area)=>{
    this.dispatch('set: area', area);
    const [provinceId, cityId, areaId] = area;
    const city = FindArea.addressInfo(provinceId, cityId);
    const addr = FindArea.findArea(areaId);
    const url = 'https://api.map.baidu.com/geocoder?address='+ addr +'&output=json&key=37492c0ee6f924cb5e934fa08c6b1676&city='+city;
    fetch(url).then((response)=>response.json())
      .then(async (res) => {
      if(res.status === 'OK'){
        const location = res.result.location;
        const data = {
          longitude: location.lng,
          latitude: location.lat,
        };
        this.reloadMap(data);
        await this.getAroundAddress(data);
      }
    });
  };

  goSearch =()=>{
    const keyWord=this.state().get('keyWord');
    const provinceId = this.state().get('provinceId');
    const cityId = this.state().get('cityId');
    const city = FindArea.addressInfo(provinceId, cityId);
    const url = 'https://api.map.baidu.com/geocoder?address='+ keyWord +'&output=json&key=37492c0ee6f924cb5e934fa08c6b1676&city='+city;
    fetch(url).then((response)=>response.json())
      .then(async (res) => {
        if(res.status === 'OK'){
          if(res.result && res.result.length < 1){
            msg.emit('app:tip', '未查询到相关地点!');
            return;
          }
          const location = res.result.location;
          const data = {
            longitude: location.lng,
            latitude: location.lat,
          };
          this.reloadMap(data);
          await this.getAroundAddress(data);
        }
      });
  };

  chooseAddress = (address)=>{
    let addressId=this.state().get('addressId');
    let consigneeNumber=this.state().get('consigneeNumber');
    let consigneeName=this.state().get('consigneeName');
    let isDefaltAddress=this.state().get('isDefaltAddress');
    msg.emit('router: replace', {
      routeName: 'UserAddressEdit',
      addressId: addressId,
      consigneeName: consigneeName,
      consigneeNumber: consigneeNumber,
      isDefaltAddress:isDefaltAddress,
      lat: address.point.y,
      lng: address.point.x,
      name: address.name,
      addr: address.addr,
    });
  }
}
