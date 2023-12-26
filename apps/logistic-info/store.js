import { Store } from 'plume2';
import LogisticsInfoActor from './actor/logistic-info-actor';
import * as webApi from './webapi';
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
  init = async id => {
    const code = this.state()
      .getIn(['goodList', 'logistics'])
      .toJS().logisticStandardCode;
    const res = await webApi.fetchDeliveryDetail(code, id);
    if (res.length > 0) {
      this.dispatch('logistics:init', res);
    } else {
      //显示图片tips
      this.dispatch('logistics:result');
    }
  };

  /**
   * 获取快递公司基本信息
   * @param id
   * @returns {Promise<void>}
   */
  fetchBasicInfo = async (orderId, id, type) => {
    const res = await webApi.fetchCompanyInfo(orderId, id, type);
    if (res.code == 'K-000000') {
      this.dispatch('logistics:info', res.context);
      this.init(res.context.logistics.logisticNo);
    }
  };
}
