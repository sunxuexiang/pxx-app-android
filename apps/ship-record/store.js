import { Store, msg } from 'plume2';

import { Confirm } from 'wmkit/modal/confirm';

import RecordActor from './actor/record-actor';
import * as webApi from './webapi';

export default class AppStore extends Store {
  bindActor() {
    return [new RecordActor()];
  }

  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  init = async (id, type) => {
    const res = await webApi.fetchAllDeliverys(id, type);
    if (res.code == 'K-000000') {
      this.dispatch('record:init', res.context.tradeDeliver);
      this.dispatch('record:type', type);
      msg.emit('order:refresh');
    }
    if (res.context.status == 'DELIVERED') {
      this.transaction(() => {
        this.dispatch('record:deliveryStatus', true);
        this.dispatch('record:logisticsCompanyInfo', res.context.logisticsCompanyInfo);
      });
    }
  };

  orderId = (id) => {
    this.dispatch('record:orderId', id);
  };

  onConfirm = async (id) => {
    Confirm({
      title: '确认收货',
      text: '确认已收到全部货品？',
      cancelText: '取消',
      okText: '确定',
      okFn: () => this.confirmReceive(id)
    });
  };

  confirmReceive = async (id) => {
    const { code } = await webApi.confirmReceiveAll(id);
    if (code == 'K-000000') {
      msg.emit('app:tip', '收货成功！');
      this.dispatch('record:deliveryStatus', false);
      msg.emit('order:refresh');
    } else {
      msg.emit('app:tip', '操作失败,记录不存在');
    }
  };
}
