import AsyncStorage from '@react-native-community/async-storage';
import {
  Store,
  msg
} from 'plume2';
import {
  fromJS
} from 'immutable';
import LogisticsActor from './actor/logistics-actor';
import { cache } from 'wmkit/cache';

import {
  fetchLogisticCompany
} from './webapi';

export default class AppStore extends Store {
  bindActor() {
    return [new LogisticsActor()];
  }

  constructor(props) {
    super(props);
  }

  init = async storeId => {
    const {
      context
    } = await fetchLogisticCompany();
    this.dispatch('logisticsActor:init', context);
  };

  /**
   * 保存添加的物流公司
   */
  save = expressName => {
    if (!expressName || !expressName.trim()) {
      msg.emit('app:tip', '请填写物流公司名称');
      return;
    }

    if (expressName.trim().length > 10) {
      msg.emit('app:tip', '物流公司名称不能超过10个字符');
      return;
    }

    this.chooseCompany(
      fromJS({
        expressName: expressName,
        expressCode: ''
      })
    );
  };

  /**
   * 选择物流公司
   */
  chooseCompany = async logistic => {
    let logisticInfo = await AsyncStorage.getItem(cache.LOGISTICS_INFO);
    logisticInfo = JSON.parse(logisticInfo);

    logisticInfo.expressName = logistic
      .get('expressName');
    logisticInfo.expressCode = logistic
      .get('expressCode');

    await AsyncStorage.setItem(
      cache.LOGISTICS_INFO,
      JSON.stringify(logisticInfo)
    );

    // 更新填写物流页的物流信息
    msg.emit('router: refreshRoute', {
      routeName: 'LogisticsInput'
    });
    // 返回填写物流页面
    msg.emit('router: back');
  };
}