import { Action, Actor, IMap } from 'plume2';
import { fromJS } from 'immutable';

export default class ShopIndexActor extends Actor {
  defaultState() {
    return {
      // 分享店铺弹层初始化状态
      invitState: false,
      baseInfo: fromJS({}),
      shareVisible: false,
      //当前的分享赚sku
      checkedSku: fromJS({}),
      //分销员信息
      customerInfo: fromJS({}),
      //分销设置
      settingInfo: fromJS({}),
      //分享店铺码
      shopShareCode: '',
      showShare: false,
      shareModalVisible: false
    };
  }

  /**
   * 分享店铺弹层显示
   */
  @Action('InvitActor:changeInvitState')
  changeInvitState(state) {
    return state.set('invitState', !state.get('invitState'));
  }

  /**
   * 分销员基本信息
   */
  @Action('InvitActor:baseInfo')
  setBaseInfo(state, { customerInfo, settingInfo }) {
    return state
      .setIn(['baseInfo', 'customerName'], customerInfo.get('customerName'))
      .setIn(['baseInfo', 'shopName'], settingInfo.get('shopName'))
      .setIn(['baseInfo', 'headImg'], customerInfo.get('headImg'))
      .setIn(
        ['baseInfo', 'distributorName'],
        settingInfo.get('distributorName')
      )
      .set('customerInfo', customerInfo)
      .set('settingInfo', settingInfo);
  }

  @Action('InvitActor:changeShareVisible')
  changeShareVisible(state, result) {
    return state.set('shareVisible', result);
  }

  @Action('InvitActor:shopShareImg')
  shopShareImg(state, img) {
    return state.setIn(['baseInfo', 'shopShareImg'], img);
  }

  @Action('InvitActor:shopShareCode')
  shopShareCode(state, code) {
    return state.set('shopShareCode', code);
  }

  @Action('shop-index:changeShowShare')
  changeShowShare(state) {
    return state.set('showShare', !state.get('showShare'));
  }

  @Action('shop-index:saveCheckedSku')
  saveCheckedSku(state, sku) {
    return state.set('checkedSku', sku);
  }

  @Action('shop-index:toggleShareVisible')
  toggleShareVisible(state) {
    return state.set('shareModalVisible', !state.get('shareModalVisible'));
  }
}
