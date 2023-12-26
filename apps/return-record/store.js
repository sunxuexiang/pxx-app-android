import { Store } from 'plume2';
import RefundRecordActor from './actor/refund-actor';
import * as webapi from './webapi';

export default class AppStore extends Store {
  bindActor() {
    return [new RefundRecordActor()];
  }

  init = async (id, returnFlowState) => {
    const res = await webapi.fetchAllRefundRecords(id);

    this.dispatch('refundrecord:returnFlowState', returnFlowState);
    if (res.code == 'K-000000') {
      this.dispatch('refundrecord:init', res.context);
    } else {
      //调取退款详情获得应退金额和退款方式，其他部分都为无
      const result = await webapi.fetchReturnDetail(id);
      if (result.code == 'K-000000') {
        this.dispatch('refundrecord:empty', result.context);
      }
    }
  };

  basicRules = async () => {
    let res = await webapi.basicRules();
    if (res && res.code === 'K-000000' && res.context.status === 1)
      this.dispatch('userInfo:pointsIsOpen');
  };
}
