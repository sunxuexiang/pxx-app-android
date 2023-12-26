import { Store } from 'plume2';

import * as webapi from './webapi';
import EmailActor from './actor/email-actor';

export default class AppStore extends Store {
  constructor(props) {
    super(props);
  }

  bindActor() {
    return [new EmailActor()];
  }

  init = async () => {
    const { context } = await webapi.queryUnionB2bConfig();
    if (context.payGateway.isOpen == 1) {
      this.dispatch('email:list:show', true);
    }
  };
}
