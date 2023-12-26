import { Action, Actor } from 'plume2';

export default class LoginActor extends Actor {
  defaultState() {
    return {
      storeId: null,
      form: {}
    };
  }

  /**
   * 修改storeId
   */
  @Action('formActor: changeStoreId')
  changeStoreId(state, storeId) {
    return state.set('storeId', storeId);
  }

  /**
   * 修改form field
   */
  @Action('formActor: changeForm')
  changeForm(state, logisticsForm) {
    return state.update('form', form => form.mergeDeep(logisticsForm));
  }
}
