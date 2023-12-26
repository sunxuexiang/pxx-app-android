/**
 * Created by hht on 2017/7/17.
 */
import { fromJS } from 'immutable';

import { Actor, Action } from 'plume2';

export default class UserInvoiceActor extends Actor {
  defaultState() {
    return {
      invoice: {},
      editStatus: false
    };
  }

  /**
   * 账号详情
   * @param state
   * @param res
   * @returns {Map<string, V>}
   */
  @Action('customer:invoice')
  getInvoiceBean(state, res) {
    return state.set('invoice', fromJS(res));
  }

  /**
   * 表单参数获取
   * @param state
   * @param res
   */
  @Action('invoiceEdit:setValue')
  setValue(state, res) {
    let invoiceBean = state.get('invoice').toJS();
    invoiceBean[res['key']] = res['value'];
    return state.set('invoice', fromJS(invoiceBean));
  }

  @Action('account:toEditStatus')
  toEditStatus(state) {
    return state.set('editStatus', true);
  }
}
