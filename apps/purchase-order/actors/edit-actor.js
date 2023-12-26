import { Actor, Action } from 'plume2';
import { fromJS } from 'immutable';

export default class EditActor extends Actor {
  defaultState() {
    return {
      edit: false,
      loginFlag: true,
      cityInfo: '',
      modalVisible: false,
      geolocationVisible: false,
      addressModalVisible: false,
    };
  }

  @Action('purchaseOrder:edit')
  changeEdit(state, edit) {
    return state.set('edit', edit);
  }

  /**
   * 设置是否登录
   */
  @Action('purchase:setLoginFlag')
  setLoginFlag(state, status) {
    return state.set('loginFlag', status);
  }

  @Action('set:state')
  setState(state, { field, value }) {
    return state.set(field, fromJS(value));
  }
}
