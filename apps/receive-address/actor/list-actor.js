import { fromJS } from 'immutable';
import { Actor, Action } from 'plume2';

/**
 * 地址列表数据源
 */
export default class ListActor extends Actor {
  defaultState() {
    return {
      // 收货地址列表
      addressList: [],
      // 是否显示添加按钮
      showAdd: false,
      // 查询数据中
      loading: true,
      // 刷新
      refreshState: false
    };
  }

  /**
   * 修改loading
   * @param state
   * @param loading
   */
  @Action('address-list:loading')
  loading(state, loading) {
    return state.set('loading', loading);
  }

  /**
   * 地址列表赋值
   * @param state
   * @param addressList
   * @returns {Immutable.Map<string, >}
   */
  @Action('address-list:list')
  list(state, addressList) {
    if (fromJS(addressList).count() >= 20) {
      state = state.set('showAdd', true);
    } else {
      state = state.set('showAdd', false);
    }

    return state.set('addressList', fromJS(addressList));
  }

  /**
   * 修改refreshState
   * @param state
   * @param loading
   */
  @Action('address-list: refreshState')
  refresh(state) {
    return state.set('refreshState', !state.get('refreshState'));
  }
}
