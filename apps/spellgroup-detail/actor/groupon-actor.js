import { Actor, Action } from 'plume2';

import { fromJS } from 'immutable';

export default class GrouponActor extends Actor {
  defaultState() {
    return {
      grouponDetails: {},
      //拼团活动信息
      grouponActivity: {},
      // 正在参与的团信息
      tradeGroupon: {},
      //直接参团列表
      grouponInsts: [],
      //倒计时结束
      timeEnd: false,
      //开团按钮
      grouponDetailOptStatus: 0,
      //服务时间
      serverTime: 0,
      //参团弹框
      waitGroupModal: false,
      //团购时间是否结束
      loading: true,
      //保存上次的团号
      oldGroupNo: '',
      // 公告请求来的团信息
      grouponInst: {}
    };
  }

  /**
   * 团信息
    * @param grouponActivity
   * @param grouponInsts
   * @param openButton
   * @returns {IMap}
   */
  @Action('goods-detail: info')
  goodsDetail(
    state,
    {
      grouponDetails,
      grouponInstanceList
    }
  ) {
    //团活动、开团按钮按照spu维度计算（多个sku的团活动信息、开团信息一致）
    let grouponActivity = fromJS(grouponDetails).get('grouponActivity');
    let grouponDetailOptStatus = fromJS(grouponDetails).get(
      'grouponDetailOptStatus'
    );
    let tradeGroupon = fromJS(grouponDetails).get('tradeGroupon');
    return state
      .set('grouponDetails', fromJS(grouponDetails))
      .set('grouponInsts', fromJS(grouponInstanceList))
      .set('tradeGroupon', fromJS(tradeGroupon))
      .set('grouponActivity', grouponActivity)
      .set('grouponDetailOptStatus', grouponDetailOptStatus);
  }
  /**
  * 改变grouponDetailOptStatus
  * @param grouponDetailOptStatus
  * @returns {IMap}
  */
  @Action('goods-detail: change: grouponDetailOptStatus')
  changeGrouponDetailOptStatus(state, grouponDetailOptStatus) {
    return state.set('grouponDetailOptStatus', grouponDetailOptStatus);
  }
  /**
    * 获取服务时间
  */
  @Action('groupon:detail:serverTime')
  queryServerTime(state, result) {
    return state.set('serverTime', result);
  }
  // /**
  //   * 团购时间是否结束
  // */
  @Action('loading :end')
  loadingEnd(state) {
    return state.set('loading', false);
  }

  @Action('loading :start')
  loadingStart(state) {
    return state.set('loading', true);
  }
  /**
  * 参团弹窗
  */
  @Action('toggle :toggleWaitGroupModal')
  toggleWaitGroupModal(state) {
    return state.set('waitGroupModal', !state.get('waitGroupModal'));
  }

  @Action('groupon:notice:grouponInst')
  grouponInst(state, result) {
    return state.set('grouponInst', result);
  }
  @Action('groupon:notice:oldGroupNo')
  oldGroupNo(state, result) {
    return state.set('oldGroupNo', result);
  }
}
