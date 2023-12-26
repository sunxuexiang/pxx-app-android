import { Store, msg } from 'plume2';
import { fromJS } from 'immutable';
import { config } from 'wmkit/config';
import { getPayOrder, getPayOrders } from './webapi';
import FormActor from './actor/form-actor';

export default class AppStore extends Store {
  bindActor() {
    return [new FormActor()];
  }

  /**
   * 初始化
   */
  init = async (tid, parentTid) => {
    // 根据参数获取付款记录
    let resPromise;
    if (tid) {
      resPromise = getPayOrder(tid);
    } else {
      resPromise = getPayOrders(parentTid);
    }
    let { code, context, message } = await resPromise;

    if (code === config.SUCCESS_CODE) {
      // 根据返回结果设置付款记录
      let payOrders;
      if (context.payOrders instanceof Array) {
        payOrders = context.payOrders;
      } else {
        payOrders = [context];
      }

      this.dispatch('formActor:setPayOrder', fromJS(payOrders));
    } else {
      msg.emit('app:tip', message);
    }
  };
}
