import { Store, msg } from 'plume2';
import ServiceListActor from './actor/service-list-actor';
import { config } from 'wmkit/config';
import * as webapi from './webapi';

export default class AppStore extends Store {
  bindActor() {
    return [new ServiceListActor()];
  }
  constructor(props) {
    super(props);
  }

  init = async (storeId) => {
    if (!storeId) {
      storeId = 0;
    }
    const { code, context, message } = await webapi.onLineServiceList(storeId);

    if (code === config.SUCCESS_CODE) {
      this.dispatch('serviceList:getList', context);
    } else {
      msg.emit('app:tip', message);
    }
  };
}
