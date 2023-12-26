/**
 * Created by hht on 2017/9/4.
 */
import { msg, Store } from 'plume2';
import * as webapi from './webapi';
import IepActor from './actor/iep-actor';
import { config } from '../../wmkit';

export default class AppStore extends Store {
  bindActor() {
    return [new IepActor()];
  }

  init = async () => {
    const { code, message ,context } = await webapi.fetchIepInfo();
    if (code == config.SUCCESS_CODE) {
      this.dispatch('iep:getIepInfo',context ? context.enterpriseInfoVO : {});
    } else {
      msg.emit('app:tip', message);
    }
  };

  updateIepInfo = async ()=>{
    const { code, message } = await webapi.updateIepInfo(this.state().get('iepInfo'))
    if (code == config.SUCCESS_CODE) {
      msg.emit('app:tip', '保存成功');
    } else {
      msg.emit('app:tip', message);
    }
  }

  setIepInfo = (key, value) => {
    this.dispatch('iep:setIepInfo',{key, value});
  }


}
