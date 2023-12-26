import AsyncStorage from '@react-native-community/async-storage';
import { msg, Store } from 'plume2';
import moment from 'moment';

import { cache } from 'wmkit/cache';
import { config } from 'wmkit/config';
import { Const } from 'wmkit/const';
import FormRegexUtil from 'wmkit/form/form-regex';
import ValidConst from 'wmkit/validate';

import { deliver } from './webapi';
import FormActor from './actor/form-actor';

export default class AppStore extends Store {
  bindActor() {
    return [new FormActor()];
  }

  /**
   * 初始化
   */
  init = async (rid, storeId) => {
    if (!rid || !storeId) {
      return;
    }

    let logistic = await AsyncStorage.getItem(cache.LOGISTICS_INFO);
    let logisticsNo; // 物流单号
    let time = new Date(); // 发货时间
    let formatTime = moment(time).format(Const.DATE_FORMAT);
    let expressName; // 物流公司名称
    let expressCode; // 物流公司标准编码

    if (logistic) {
      logistic = JSON.parse(logistic);
      logisticsNo = logistic.logisticsNo;
      time = moment(logistic.time).toDate();
      formatTime = logistic.formatTime;
      expressName = logistic.expressName;
      expressCode = logistic.expressCode;
    }

    this.transaction(() => {
      this.dispatch('formActor: changeStoreId', storeId);
      this.dispatch('formActor: changeForm', {
        rid: rid,
        logisticsNo: logisticsNo,
        time: time,
        expressName: expressName,
        formatTime: formatTime,
        expressCode: expressCode
      });
    });

    // 删除，避免下次再进入时还存在
    AsyncStorage.removeItem(cache.LOGISTICS_INFO);
  };

  /**
   * 保存物流信息
   */
  save = async () => {
    const form = this.state().get('form');

    if (
      !FormRegexUtil(form.get('expressName'), '物流公司', { required: true }) ||
      !FormRegexUtil(form.get('logisticsNo'), '物流单号', { required: true }) ||
      !FormRegexUtil(form.get('time'), '发货时间', { required: true })
    ) {
      return;
    }

    // 校验物流单号
    const regex = ValidConst.logisticsNo;
    if (!regex.test(form.get('logisticsNo'))) {
      msg.emit('app:tip', '请输入正确的物流单号！');
      return false;
    }
    const params = {
      logisticCompanyCode: form.get('expressCode'),
      logisticCompany: form.get('expressName'),
      logisticNo: form.get('logisticsNo'),
      date: moment(new Date(form.get('time'))).format(Const.SECONDS_FORMAT)
    };

    const { code, message } = await deliver(form.get('rid'), params);

    if (code === config.SUCCESS_CODE) {
      msg.emit('app:tip', '添加成功');
      AsyncStorage.removeItem(cache.LOGISTICS_INFO);

      // 刷新退货列表页面和退单详情页面

      msg.emit('router: refreshRoutes', {
        routeNames: ['RefundList', 'ReturnDetail']
      });
      // 返回
      msg.emit('router: back');
    } else {
      msg.emit('app:tip', message);
    }
  };

  /**
   * 修改form
   */
  changeForm = form => {
    this.dispatch('formActor: changeForm', form);
  };

  /**
   * 选择物流公司
   */
  chooseCompany = () => {
    const form = this.state().get('form');

    let logistic = {
      rid: form.get('rid'),
      expressCode: form.get('expressCode'),
      time: form.get('time'),
      expressName: form.get('expressName'),
      formatTime: form.get('formatTime'),
      logisticsNo: form.get('logisticsNo')
    };

    AsyncStorage.setItem(cache.LOGISTICS_INFO, JSON.stringify(logistic));

    msg.emit('router: goToNext', {
      routeName: 'LogisticsSelect',
      storeId: this.state().get('storeId')
    });
  };
}
