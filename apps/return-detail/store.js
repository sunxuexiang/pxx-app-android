import { fromJS } from 'immutable';
import { Store, msg } from 'plume2';
import * as webapi from './webapi';
import DetailActor from './actor/detail-actor';

export default class AppStore extends Store {
  bindActor() {
    return [new DetailActor()];
  }

  init = async (rid) => {
    const { context, message, code } = await webapi.fetchReturnDetail(rid);

    if (code == 'K-000000') {
      this.dispatch('order-return-detail:init', fromJS(context));
      const returnFlowState = this.state().getIn(['detail', 'returnFlowState']);

      if ('REJECT_RECEIVE' == returnFlowState || 'VOID' == returnFlowState) {
        // 拒绝收货 或者 审核驳回
        this.dispatch(
          'order-return-detail:rejectReason',
          this.state().getIn(['detail', 'rejectReason']) || ''
        );
      } else if ('REJECT_REFUND' == returnFlowState) {
        // 拒绝退款
        let res = await webapi.fetchRefundOrderList(rid);

        if (res.code == 'K-000000') {
          const result = fromJS(res.context);
          this.dispatch(
            'order-return-detail:rejectReason',
            result.get('refuseReason') || ''
          );
        }
      }
    } else {
      msg.emit('app:tip', message);
      history.replace('/refund-list');
    }
  };

  cancel = async (rid) => {
    const { message, code } = await webapi.cancel(rid, '用户取消');

    if (code == 'K-000000') {
      msg.emit('app:tip', '成功取消退单');
      // 刷新退货列表页面和退单详情页面
      msg.emit('router: refresh');
    } else {
      msg.emit('app:tip', message || '操作失败');
    }
  };

  basicRules = async () => {
    let res = await webapi.basicRules();
    if (res && res.code === 'K-000000' && res.context.status === 1)
      this.dispatch('userInfo:pointsIsOpen');
  };
}
