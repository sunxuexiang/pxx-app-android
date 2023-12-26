/**
 * Created by feitingting on 2017/7/17.
 */
import AsyncStorage from '@react-native-community/async-storage';
import { Store, msg } from 'plume2';

import * as WMkit from 'wmkit/kit';
import { cache } from 'wmkit/cache';
import * as _ from 'wmkit/common/util';

import DetailActor from './actor/detail-actor';
import * as webapi from './webapi';

/**校验名称和联系人*/
function _testName(name) {
  if (name == '') {
    msg.emit('app:tip', '请填写名称');
    return false;
  } else if (name.length < 2 || name.length > 15) {
    msg.emit('app:tip', '名称为2-15个字符');
    return false;
  }
  return true;
}

function _testContact(contact) {
  if (contact == '') {
    msg.emit('app:tip', '请填写常用联系人');
    return false;
  } else if (contact.length < 2 || contact.length > 15) {
    msg.emit('app:tip', '联系人名称为2-15个字符');
    return false;
  }
  return true;
}

/**校验地址详情*/
function _testAddress(address) {
  if (address == '') {
    msg.emit('app:tip', '请填写详细地址');
    return false;
  } else if (address.length < 5 || address.length > 60) {
    msg.emit('app:tip', '地址长度为5-60个字符');
    return false;
  }
  return true;
}

export default class AppStore extends Store {
  bindActor() {
    return [new DetailActor()];
  }

  /**
   * 初始化，查询会员基本信息
   * @returns {Promise<void>}
   */
  init = async (id) => {
    const res = await AsyncStorage.getItem(cache.PENDING_AND_REFUSED);
    this.dispatch('detail:customerId', id);
    this.transaction(() => {
      //如果存在，更改用户ID的状态值
      this.dispatch('detail:customer', JSON.parse(res).customerDetail);
      this.dispatch('detail:checked', JSON.parse(res).checkState);
    });
  };

  /**
   * 完善信息
   * @returns {Promise.<boolean>}
   */
  doPerfect = async () => {
    const customer = this.state()
      .get('customerDetail')
      .toJS();
    /**先校验必填项*/
    if (
      _testName(customer.customerName) &&
      _testContact(customer.contactName) &&
      WMkit.testTel(customer.contactPhone)
    ) {
      //不为空，且不是不限
      if (customer.provinceId) {
        if (!_testAddress(customer.customerAddress)) {
          return false;
        }
      }
      if (customer.customerAddress != '') {
        //未选择省份或者选择不限时，都视为未选择
        if (customer.provinceId == '' || customer.provinceId == null) {
          msg.emit('app:tip', '请选择所在地区');
          return false;
        }
      }
      if(customer.birthDay === '') {
        customer.birthDay = null;
      }
      if(customer.gender === '') {
        customer.gender = null;
      }
      const { code, message, context } = await webapi.doPerfect(customer);
      if (code == 'K-000000') {
        //清除缓存
        AsyncStorage.removeItem(cache.PENDING_AND_REFUSED);
        //是否直接可以登录 0 否 1 是
        if (!context.isLoginFlag) {
          msg.emit('app:tip', '提交成功，将会尽快为您审核');
          msg.emit('router: replace', {
            routeName: 'ImproveResult'
          });
          _.showRegisterModel(context.couponResponse, false);
        } else {
          //直接跳转到主页
          AsyncStorage.setItem(cache.LOGIN_DATA, JSON.stringify(context));
          window.token = context.token;
          msg.emit('app:tip', '登录成功');
          msg.emit('router: goToNext', { routeName: 'Main' });
          _.showRegisterModel(context.couponResponse, true);
        }
      } else {
        msg.emit('app:tip', message);
        return false;
      }
    }
  };

  /**
   * 倒计时每次事件减1秒
   */
  setTime = () => {
    const time = this.state().get('minutes');
    this.dispatch('detail:time', time - 1);
  };

  getCompanyName = (name) => {
    this.dispatch('detail:companyName', name);
  };

  getAddressDetail = (address) => {
    this.dispatch('detail:address', address);
  };

  getContact = (contact) => {
    this.dispatch('detail:contact', contact);
  };

  getContactTel = (tel) => {
    this.dispatch('detail:contactTel', tel);
  };

  getArea = (value) => {
    this.dispatch('detail:area', value);
  };

  getGender = (name) => {
    this.dispatch('detail:gender', name[0]);
  };

  getBirthDay = (name) => {
    this.dispatch('detail:birthDay', name);
  };
}
