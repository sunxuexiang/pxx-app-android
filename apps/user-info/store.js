/**
 * Created by hht on 2017/9/4.
 */
import { msg, Store } from 'plume2';

import { Confirm } from 'wmkit/modal/confirm';
import { config } from 'wmkit/config';
import FormRegexUtil from 'wmkit/form/form-regex';
import * as WMkit from 'wmkit/kit';

import * as webapi from './webapi';
import UserActor from './actor/user-actor';

export default class AppStore extends Store {
  bindActor() {
    return [new UserActor()];
  }

  init = async () => {
    this.fetchUserInfo();
    // 查询积分总开关
    this.basicRules();
    // 查询成长值总开关
    this.growthValueIsOpen();
  };

  /**
   * 获取用户信息
   * @returns {Promise.<void>}
   */
  fetchUserInfo = async () => {
    const { code, context, message } = await webapi.fetchCustomerBase();
    if (code == config.SUCCESS_CODE) {
      this.dispatch('user:getUserInfo', context);
    } else {
      msg.emit('app:tip', message);
    }
    const growthInitRes = await webapi.getGrowthValueAndPoint();
    let text = '赢';
    let flag = false;
    if (growthInitRes.code === config.SUCCESS_CODE) {
      this.dispatch('user:initGrowthValues', growthInitRes.context);
      if (
        growthInitRes.context.growthFlag &&
        growthInitRes.context.growthValue > 0
      ) {
        flag = flag || true;
        text += growthInitRes.context.growthValue + '成长值 ';
      }
      if (growthInitRes.context.pointFlag && growthInitRes.context.point > 0) {
        flag = flag || true;
        text += growthInitRes.context.point + '积分';
      }
    }
    if (
      (!context.areaId ||
        !context.customerAddress ||
        !context.birthDay ||
        (context.gender != 0 && context.gender != 1)) &&
      flag
    ) {
      // Confirm({
      //   title: '完善账户信息',
      //   text: text,
      //   okText: '现在就去',
      //   okFn: function() {
      //     msg.emit('router: goToNext', { routeName: 'UserInfo' });
      //   }
      // });
      this.dispatch('user:rewardFlag', true);
    }
  };

  /**
   * 组装用户信息
   * @param key
   * @param value
   */
  setUserInfo = (key, value) => {
    if (key == 'area') {
      this.transaction(() => {
        this.dispatch('user:setUserInfo', {
          key: ['userInfo', 'provinceId'],
          value: value[0]
        });
        this.dispatch('user:setUserInfo', {
          key: ['userInfo', 'cityId'],
          value: value[1]
        });
        this.dispatch('user:setUserInfo', {
          key: ['userInfo', 'areaId'],
          value: value[2]
        });
      });
    } else {
      if (key == 'gender') {
        value = Number(value[0]);
      }
      this.dispatch('user:setUserInfo', {
        key: ['userInfo', key],
        value: value
      });
    }
  };

  /**
   * 提交
   * @returns {Promise.<void>}
   */
  updateUserInfo = async () => {
    const customer = this.state().get('userInfo');
    if (
      !FormRegexUtil(customer.get('customerName').trim(), '客户名称', {
        required: true,
        minLength: 2,
        maxLength: 15
      })
    )
      return;
    if (
      !FormRegexUtil(customer.get('contactName').trim(), '联系人', {
        required: true,
        minLength: 2,
        maxLength: 15
      })
    )
      return;
    if (
      !FormRegexUtil(customer.get('contactPhone'), '联系电话', {
        required: true,
        regexType: 'mobile'
      })
    )
      return;
    //所在地区和详细地址不是必填，但如果填写所在地区，则详细地址不能为空，反之亦然
    if (customer.get('provinceId')) {
      if (customer.get('customerAddress').trim().length == 0) {
        msg.emit('app:tip', '请填写详细地址！');
        return;
      } else if (
        customer.get('customerAddress').length < 5 ||
        customer.get('customerAddress').length > 60
      ) {
        msg.emit('app:tip', '地址长度为5-60个字符！');
        return;
      }
    } else {
      if (
        customer.get('customerAddress') &&
        customer.get('customerAddress').length > 0
      ) {
        msg.emit('app:tip', '请填写所在地区！');
        return;
      }
    }
    const { code, message } = await webapi.updateCustomerBase(customer);
    if (code == config.SUCCESS_CODE) {
      msg.emit('app:tip', '操作成功！');
      // msg.emit('router: back');
    } else {
      msg.emit('app:tip', message);
    }

    const growthValues = this.state().get('growthValues');
    let text = '';
    let displayFlag = false;
    if (growthValues.get('growthFlag') && growthValues.get('growthValue') > 0) {
      displayFlag = displayFlag || true;
      text += growthValues.get('growthValue') + '成长值 ';
    }
    if (growthValues.get('pointFlag') && growthValues.get('point') > 0) {
      displayFlag = displayFlag || true;
      text += growthValues.get('point') + '积分即将到账';
    }
    if (
      customer.get('areaId') &&
      customer.get('customerAddress') &&
      customer.get('birthDay') &&
      (customer.get('gender') == 0 || customer.get('gender') == 1) &&
      this.state().get('rewardFlag') &&
      displayFlag
    ) {
      Confirm({
        title: '您已完善账户信息',
        text: text,
        okText: '去看看',
        okFn: function () {
          msg.emit('router: goToNext', { routeName: 'UserCenter' });
        }
      });
    }
  };

  logOut = () => {
    WMkit.logout();
    if (WMkit.isLoginOrNotOpen()) {
      msg.emit('router: goToNext', { routeName: 'Main' });
    } else {
      msg.emit('router: goToNext', { routeName: 'UserCenter' });
    }
  };

  openGiftModal = (flag) => {
    this.dispatch('user:giftModalShow', flag);
  };

  /**
   * 查询平台积分开关配置
   * @returns {Promise<void>}
   */
  basicRules = async () => {
    // 积分开关是否打开
    let res = await webapi.basicRules();
    if (res && res.code === config.SUCCESS_CODE && res.context.status === 1)
      this.dispatch('user:info:pointsIsOpen');
  };

  /**
   * 查询成长值配置
   * @returns {Promise<void>}
   */
  growthValueIsOpen = async () => {
    let res = await webapi.growthValueIsOpen();
    if (res && res.code == config.SUCCESS_CODE && res.context.open) {
      this.dispatch('user:info:growthValueIsOpen');
    }
  };
}
