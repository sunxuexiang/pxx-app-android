import { Action, Actor, IMap } from 'plume2';
import { fromJS } from 'immutable';
export default class DetailActor extends Actor {
  defaultState() {
    return {
      visible: false,
      // 提现详情信息
      drawCashDetail: fromJS({}),
      drawCashId: '',
      headImgUrl: ''
    };
  }

  /**
   * 初始化提现单详情
   */
  @Action('draw:cash:detail:fetch')
  init(state: IMap, res) {
    return state.set('drawCashDetail', fromJS(res));
  }

  /**
   * 微信头像
   */
  @Action('draw:cash:detail:head:img')
  setHeadImgUrl(state, headImgUrl) {
    return state.set('headImgUrl', headImgUrl);
  }

  /**
   * 提示框是否显示
   */
  @Action('CashActor:LayerShow')
  tipLayerShow(state, val) {
    return state.set('visible', val);
  }

  /**
   *
   * @param state
   * @param val
   */
  @Action('draw:cash:detail:set:id')
  setDrawCashId(state, val) {
    return state.set('drawCashId', val);
  }
}
