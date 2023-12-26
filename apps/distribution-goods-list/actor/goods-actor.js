import { Action, Actor } from 'plume2';
import { fromJS } from 'immutable';

export default class GoodsActor extends Actor {
  defaultState() {
    return {
      // 评价开关
      isShow: false,
      logo: '',
      //分享赚弹框
      showShare: false,
      //选中的sku
      checkedSku: fromJS({}),
      //是否加入到店铺
      addSelfShop: true,
      //图文分享弹框
      shareModalVisible: false
    };
  }

  @Action('goods:isShow')
  setIsShow(state, flag) {
    return state.set('isShow', flag);
  }

  /**
   * 获取商城logo，用于图片分享
   * @param {} state
   * @param {*} data
   */
  @Action('goods-detail:getLogo')
  getLogo(state, data) {
    return state.set('logo', data.url);
  }

  @Action('goods-list:changeShowShare')
  changeShowShare(state) {
    return state.set('showShare', !state.get('showShare'));
  }

  @Action('goods-list:saveCheckedSku')
  saveCheckedSku(state, sku) {
    return state.set('checkedSku', sku);
  }

  @Action('goods-list:changeAddSelfShop')
  changeAddSelfShop(state, value) {
    return state.set('addSelfShop', value);
  }

  @Action('goods-list:toggleShareVisible')
  toggleShareVisible(state) {
    return state.set('shareModalVisible', !state.get('shareModalVisible'));
  }
}
