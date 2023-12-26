import { Actor, Action, IMap } from 'plume2';

export default class IepSettingActor extends Actor {
  defaultState() {
    return {
      //企业购会员名称，logo
      iepInfo:{
        iepLogo: '',
        iepCustomerName: '',
        iepPriceName: ''
      },
      //是否购买了企业购增值服务
      checkEnterpriseEnable: false
    };
  }

  @Action('iepSetting:iepInfo')
  setStore(state: IMap, iepInfo) {
    return state.set('iepInfo', iepInfo);
  }

  @Action('iepSetting:enable')
  setCheckEnterpriseEnable(state: IMap, value) {
    return state.set('checkEnterpriseEnable', value);
  }
}
