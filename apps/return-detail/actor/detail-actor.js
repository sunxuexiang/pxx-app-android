import { Action, Actor } from 'plume2';

export default class DetailActor extends Actor {
  defaultState() {
    return {
      detail: {},
      // 拒绝原因，拒绝收货、拒绝退款 或 审核驳回
      rejectReason: '',
      pointsIsOpen: false //积分是否打开
    };
  }

  /**
   * 退单详情初始化
   */
  @Action('order-return-detail:init')
  init(state, res) {
    return state.set('detail', res);
  }

  /**
   * 拒绝原因
   */
  @Action('order-return-detail:rejectReason')
  rejectReason(state, res) {
    return state.set('rejectReason', res);
  }

  /**
   * 是否积分关闭了
   */
  @Action('userInfo:pointsIsOpen')
  pointsIsOpen(state) {
    return state.set('pointsIsOpen', true);
  }
}
