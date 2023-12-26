import { Action, Actor } from 'plume2';
import { fromJS } from 'immutable';

export default class StoreActor extends Actor {
  defaultState() {
    return {
      // 详细说明弹层初始化状态
      detailState: false,
      //详细说明文字内容
      detailList: null,
      // 商品列表
      goodsList: [],
      picture: ''
    };
  }
  /**
   * 详细说明弹层显示
   */
  @Action('InvitActor:changeDetail')
  changeDetail(state, val) {
    return state.set('detailState', val);
  }

  /**
   * 详细说明文字内容
   */
  @Action('InvitActor:getDetailData')
  getDetailData(state, val) {
    return state.set('detailList', val);
  }

  /**
   * 详细说明图片
   */
  @Action('InvitActor:getDetailImg')
  getDetailImg(state, val) {
    return state.set('picture', val);
  }

  /**
   * 商品列表
   */
  @Action('InvitActor:getGoodsList')
  getGoodsList(state, val) {
    return state.set('goodsList', fromJS(val));
  }
}
