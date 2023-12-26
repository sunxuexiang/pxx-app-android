/**
 * Created by feitingting on 2017/7/31.
 */
import { Store } from 'plume2';
import InvoiceActor from './actor/invoice-actor';
import * as webapi from './webapi';
export default class AppStore extends Store {
  bindActor() {
    return [new InvoiceActor()];
  }

  init = async id => {
    const res = await webapi.fetchInvoiceInfo(id);
    this.transaction(() => {
      //普票增票通用的状态值
      this.dispatch('invoice:common', res.context);
      //普通发票
      if (res.context.type == 0) {
        this.dispatch('invoice:general', res.context);
      } else {
        this.dispatch('invoice:special', res.context);
      }
    });
  };
}
