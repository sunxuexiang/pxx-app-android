import { Action, Actor } from 'plume2';
import { fromJS } from 'immutable';

export default class ShopActor extends Actor {
  defaultState() {
    return {
      listView: true,
      shopSkuList: []
    };
  }
  /**
   * 点击显示隐藏
   */
  @Action('change:changeListView')
  changeList(state) {
    return state.set('listView', !state.get('listView'));
  }

  @Action('change:shopSkuList')
  setShopSkuList(state, res) {
    return state.set('shopSkuList', res.content);
  }

  @Action('shop-edit:shopSkuList')
  updateGoodsinfo(state, arr) {
    return state.set('shopSkuList', arr);
  }
}
