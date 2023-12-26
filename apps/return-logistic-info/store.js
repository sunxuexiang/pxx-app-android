import { Store } from 'plume2';
import LogisticsInfoActor from './actor/logistic-info-actor';
import * as webapi from './webapi';

export default class AppStore extends Store {
  bindActor() {
    return [new LogisticsInfoActor()];
  }

  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  /**
   * 获取跟踪到的物流信息
   * @param id
   * @returns {Promise<void>}
   */
  init = async (id) => {
    const code = this.state().getIn(['companyInfo', 'code']);
    const res = await webapi.fetchDeliveryDetail(code, id);
    if (res.length > 0) {
      this.dispatch('logistics:init', res);
    } else {
      this.dispatch('logistics:result');
    }
  };

  /**
   * 获取快递公司基本信息
   * @param id
   * @returns {Promise<void>}
   */
  fetchBasicInfo = async (rid) => {
    const res = await webapi.fetchCompanyInfo(rid);
    if (res.code == 'K-000000' && res.context) {
      this.dispatch('logistics:info', res.context);
      this.init(res.context.no);
    } else {
      this.dispatch('logistics:result');
    }
  };
}
