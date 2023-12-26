import { Store, msg } from 'plume2';
import IndexActor from './actor/index';
import { config, cache, Confirm } from 'wmkit';
import * as webapi from './webapi';
import AsyncStorage from '@react-native-community/async-storage';

export default class AppStore extends Store {
  bindActor() {
    return [new IndexActor()];
  }
  constructor(props) {
    super(props);
  }

  /**
   * 初始化
   */
  init = async () => {
    const loginData = await AsyncStorage.getItem(cache.LOGIN_DATA);
    const customerAccount = JSON.parse(loginData).accountName;
    this.dispatch('info: setCustomerAccount',customerAccount);

    const res = await webapi.queryChildsByParentId();
    if (res.code == config.SUCCESS_CODE) {
      this.dispatch('info: childAccountList', res.context.customerVOList);
    } else {
      msg.emit('app:tip', res.message);
    }
  };


  /**
   * 解除绑定
   * @param tid 订单号
   */
  releaseChildConfirm = (customerId) => {
    Confirm({
      title: '解除绑定',
      text: '您确定要解除绑定?',
      okFn: () => this.releaseBindCustomers(customerId),
      okText: '确定',
      cancelText: '取消'
    });
  };

  releaseBindCustomers = async (customerId) => {
    const res = await webapi.releaseBindCustomers(customerId);
    if(res.code ==  config.SUCCESS_CODE){
      await this.init();
    }else{
      msg.emit('app:tip', res.message);
    }
  }


}
