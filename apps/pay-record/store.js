import { Store, msg } from 'plume2';

import PayDetailActor from './actor/pay-detail-actor';
import { fetchPayDetail, defaultPaylOrder } from './webapi';

export default class AppStore extends Store {
  bindActor() {
    return [new PayDetailActor()];
  }

  /**
   * 初始化付款记录
   */
  init = async (tid) => {
    const res = await fetchPayDetail(tid);
    if (res.code == 'K-000000') {
      this.dispatch('pay-detail-actor:set', res.context);
      msg.emit('order:refresh');
    }
  };

  /**
   * 0元支付
   */
  defaultPay = async (tid) => {
    const res = await defaultPaylOrder(tid);
    if (res.code == 'K-000000') {
      //跳转到付款成功页
      msg.emit('router: goToNext', {
        routeName: 'PaySuccess',
        tid: tid,
        payType: 'online'
      });
    } else {
      msg.emit('app:tip', res.message);
    }
  };
}
