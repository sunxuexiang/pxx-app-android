import { Store, msg } from 'plume2';
import AsyncStorage from '@react-native-community/async-storage';
import { cache, config } from 'wmkit';
import DeliveryActor from './actor/delivery-actor';
import * as api from './webapi';
import FormRegexUtil from 'wmkit/form/form-regex';

export default class AppStore extends Store {
  bindActor() {
    return [new DeliveryActor()];
  }

  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  init = async()=>{
    let deliverSite = await AsyncStorage.getItem(cache.DELIVER_SITE);
    deliverSite = (deliverSite && JSON.parse(deliverSite)) || null;
    // 校验物流公司是否存在
    if(deliverSite && deliverSite.id != 'default') {
      const res = await api.getLogisticsCompanyById(deliverSite.id);
      // 物流公司不存在
      if (res.code == config.SUCCESS_CODE) {
        // 物流公司不存在
        if (!res.context) {
          deliverSite = null;
        }
      }
    }
    // 获取最新的物流公司
    if (!deliverSite) {
      const flag = deliverSite && deliverSite.insertFlag;
      const usedDeliverSite = await this.getUsedCompanyList();
      if(!usedDeliverSite || (usedDeliverSite && !usedDeliverSite.id)) {
        deliverSite = null;
      } else {
        deliverSite = usedDeliverSite;
      }
      deliverSite.insertFlag = flag || '';
    }
    //自建物流
    const isAddPersonalSite = deliverSite && !deliverSite.id;
    //用户选中的平台物流
    const isSelectBossSite = deliverSite && deliverSite.id;
    //拒绝使用物流
    const refuseSite = deliverSite.insertFlag === -1;
    this.transaction(() => {
      this.dispatch('order: field: change', { field: 'companyList', value: !isAddPersonalSite ? [deliverSite] : [] });
      this.dispatch('order: field: change', { field: 'acceptSiteAddr', value: (isSelectBossSite && deliverSite.receivingPoint) || '' });
      this.dispatch('order: field: change', { field: 'isAddPersonalSite', value: isAddPersonalSite });
      this.dispatch('order: field: change', { field: 'searchKey', value: deliverSite.logisticsName ? ((deliverSite.logisticsName || '') + (deliverSite.logisticsPhone ? '-' : '') + (deliverSite.logisticsPhone || '')) : '' });
      this.dispatch('order: field: change', { field: 'selectedItem', value: deliverSite || null });
      this.dispatch('order: deliver: set', { key: 'id', value: '' });
      this.dispatch('order: deliver: set', { key: 'logisticsName', value: (isAddPersonalSite && deliverSite.logisticsName) || '' });
      this.dispatch('order: deliver: set', { key: 'logisticsPhone', value: (isAddPersonalSite && deliverSite.logisticsPhone) || '' });
      this.dispatch('order: deliver: set', { key: 'logisticsAddress', value: '' });
      this.dispatch('order: deliver: set', { key: 'receivingPoint', value: (isAddPersonalSite && deliverSite.receivingPoint) || '' });
    });
  };

  homeDeliver = async()=> {
    let homeDeliver = await api.getHomeDeliveryList();
    this.dispatch('deliverActor: setHomeDeliverLogisticsContent',homeDeliver.context && homeDeliver.context.homeDeliveryVOList[0].logisticsContent);
  };

  //获取最新下单的物流公司
  getUsedCompanyList = async() => {
    const loginData = await AsyncStorage.getItem(cache.LOGIN_DATA);
    const customerId = JSON.parse(loginData).customerId;
    const result = await api.getByCustomerId(customerId);
    const data = result.context || null;
    return data && data.logisticsInfoVO ? data.logisticsInfoVO : null;
  }

  //获取平台物流公司
  logisticscompany = async(searchKey) => {
    const result = await api.logisticscompany({logisticsName: searchKey});
    this.dispatch('deliver: page: change', 0);
    this.dispatch('deliver: newList',[])
    this.changeFieldValue({ field: 'loading', value: false });
    if(result.code == config.SUCCESS_CODE){
      const data = result.context || null;
      this.dispatch('order: field: change', { field: 'companyList', value: data && data.logisticsCompanyVOList ? [{logisticsName:'由超级大白鲸代选物流',logisticsAddress:'由超级大白鲸代选物流',id:"default"}].concat(data.logisticsCompanyVOList) : [] });
      this.dispatch('deliver: newList', [{logisticsName:'由超级大白鲸代选物流',logisticsAddress:'由超级大白鲸代选物流',id:"default"}].concat(data.logisticsCompanyVOList).splice(0,50));
    }
  }

  //添加自建物流
  addPersonalCompany = async() => {
    const personalSite = this.state().get('personalSite').toJS();
    if (!FormRegexUtil(personalSite.logisticsName, '物流公司名称', {
      required: true,
      minLength: 1,
      maxLength: 100
    })) {
      return false;
    }
    if (!FormRegexUtil(personalSite.logisticsPhone, '物流公司电话', {
      required: true,
      minLength: 11,
      maxLength: 15
    })) {
      return false;
    }
    if (!FormRegexUtil(personalSite.receivingPoint, '收货站点', {
      maxLength: 200
    })) {
      return false;
    }
      this.transaction(() => {
        this.dispatch('order: field: change', { field: 'companyList', value: [] });
        this.dispatch('order: field: change', { field: 'acceptSiteAddr', value: '' });
        this.dispatch('order: field: change', { field: 'isAddPersonalSite', value: true });
        this.dispatch('order: field: change', { field: 'searchKey', value: '' });
        this.dispatch('order: field: change', { field: 'selectedItem', value: null });
        this.dispatch('order: field: change', { field: 'showModal', value: false });
      });
    // } else {
    //   msg.emit('app:tip', result.message);
    // }
  }

  delLogisticscompany = async () => {
    this.clearPersonalSite();
    // const personalSite = this.state().get('personalSite').toJS();
    // if (personalSite.id) {
    //   const result = await api.delLogisticscompany(personalSite.id);
    //   if(result.code == config.SUCCESS_CODE){
    //     this.clearPersonalSite();
    //   } else {
    //     msg.emit('app:tip', result.message);
    //   }
    // }
  }

  clearPersonalSite = () => {
    this.dispatch('order: field: change', { field: 'personalSite', value: {
      id: '',
      logisticsName: '',
      logisticsPhone: '',
      logisticsAddress: '',
      receivingPoint: '',
    } });
    this.dispatch('order: field: change', { field: 'isAddPersonalSite', value: false });
    this.dispatch('order: field: change', { field: 'searchKey', value: '' });
  }


  handleConfirm = async () => {
    let { companyList, isAddPersonalSite, personalSite, selectedItem, acceptSiteAddr} = this.state().toJS();
    //自建物流 insertFlag = 1
    if (isAddPersonalSite) {
      personalSite.insertFlag = 1;
      await AsyncStorage.setItem(cache.DELIVER_SITE, JSON.stringify(personalSite));
    } else {
      //选择平台物流 insertFlag = 0
      if (selectedItem && selectedItem.id) {
        if (!FormRegexUtil(acceptSiteAddr, '收货站点', {
          maxLength: 200
        })) {
          return false;
        }
        await AsyncStorage.setItem(cache.DELIVER_SITE, JSON.stringify({
          id: selectedItem.id,
          logisticsName: selectedItem.logisticsName || '',
          logisticsPhone: selectedItem.logisticsPhone || '',
          logisticsAddress: selectedItem.id == 'default' ? '' : (selectedItem.logisticsAddress || ''),
          receivingPoint: acceptSiteAddr || '',
          insertFlag: 0
        }));
      } else {
        msg.emit('app:tip', "请选择物流公司");
        return;
        // //不选择平台物流也不自建物流--选择了不需要物流 insertFlag = -1
        // await AsyncStorage.setItem(cache.DELIVER_SITE, JSON.stringify({
        //   id: '',
        //   logisticsName: '',
        //   logisticsPhone: '',
        //   logisticsAddress: '',
        //   receivingPoint: '',
        //   insertFlag: -1,
        // }));
      }
    }
    msg.emit('router: back');
  }


  /**
   * 修改任意字段值
   * @param {any} field 字段名
   * @param {any} value 值
   */
  changeFieldValue = ({ field, value }) => {
    this.dispatch('order: field: change', { field, value });
  };

  deliverSiteSet = (key, value) => {
    this.dispatch('order: deliver: set', { key, value });
  };

  changePageCurrent = (pageCurrent) => {
    this.dispatch('deliver: page: change', pageCurrent);
    const {companyList,newList} = this.state().toJS();
    const spliceList = companyList.splice(pageCurrent * 50,50)
    let list = newList.concat(spliceList)
    this.dispatch('deliver: newList', list);
  };
}
