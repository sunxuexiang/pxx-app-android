import {  Store,msg } from 'plume2';
import * as _ from 'wmkit/common/util';
import * as WMkit from 'wmkit/kit';
import { cache } from 'wmkit/cache';
import { config } from 'wmkit/config';

import AsyncStorage from '@react-native-community/async-storage';
import { fromJS } from 'immutable';

import * as webapi from './webapi';
import { mergePurchase } from 'wmkit/biz/purchase-front';
import RegisterActor from './actor/register-actor';

export default class AppStore extends Store {

  bindActor() {
    return [new RegisterActor()];
  }

  getRegisterLimitType = async () => {
    const { code, context } = await webapi.getRegisterLimitType();
    if (code == 'K-000000') {
      this.dispatch('set:reisterLimitType', context);
      if (!fromJS(context).get('openFlag')) {
        this.submit();
      }
    }
  };

  submit = () => {
    const openFlag = this.state().get('openFlag');
    const inviteCode = this.state().get('inviteCode');
    const reisterLimitType = this.state().get('reisterLimitType');
    if (
      openFlag &&
      reisterLimitType == 1 &&
      !WMkit.testInviteCode(inviteCode)
    ) {
      return;
    }
    if (openFlag && inviteCode && !WMkit.testInviteCode(inviteCode)) {
      return;
    }
    let registerInfo = window.registerInfo;
    const fromPage = registerInfo.fromPage;
      registerInfo.inviteCode = inviteCode;
    if (fromPage) {
      this.registerModal(registerInfo);
    } else {
      this.register(registerInfo);
    }
  };

  /**
   * 注册页面-注册
   * @param registerInfo
   * @returns {Promise<void>}
   */
  register = async (registerInfo) => {
      const { code, message, context } = await webapi.register(
          registerInfo.customerAccount,
          registerInfo.customerPassword,
          registerInfo.verifyCode,
          registerInfo.inviteCode
      );
      if (code == 'K-000000') {
          WMkit.logout();
          window.registerInfo = null;
          //清除本地缓存的审核未通过的或者正在审核中的账户信息
          await AsyncStorage.removeItem(cache.PENDING_AND_REFUSED);
          const customerId = context.customerId;
          //是否直接可以登录 0 否 1 是
          if (!context.isLoginFlag) {
              msg.emit('app:tip', '注册成功，请完善账户信息');
              //跳转至完善账户信息页面
              setTimeout(() => {
                  msg.emit('router: goToNext', {
                      routeName: 'ImproveInformation',
                      customerId
                  });
              }, 1000);
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
  };

  /**
   * 弹窗注册-注册
   * @param registerInfo
   * @returns {Promise<void>}
   */
  registerModal = async (registerInfo) => {
      const { code, message, context } = await webapi.registerModal(
          registerInfo.customerAccount,
          registerInfo.customerPassword,
          registerInfo.verifyCode,
          registerInfo.inviteCode
      );
      if (code == config.SUCCESS_CODE) {
          //清除本地缓存的审核未通过的或者正在审核中的账户信息
          await AsyncStorage.removeItem(cache.PENDING_AND_REFUSED);
          window.registerInfo = null;
          const customerId = context.customerId;
          //是否直接可以登录 0 否 1 是
          if (!context.isLoginFlag) {
              msg.emit('app:tip', '注册成功，请完善账户信息');
              // //清数据
              // this.dispatch('modal:detail:customer');
              // //存储customerId
              // this.dispatch('change:customerDetailField', {
              //     field: 'customerId',
              //     value: context.customerId
              // });
              // //显示完善信息的弹框
              // this.dispatch('show:showImproveInfo');
              setTimeout(() => {
                  msg.emit('router: goToNext', {
                      routeName: 'ImproveInformation',
                      customerId
                  });
              }, 1000);
          } else {
              //存储token
              window.token = context.token;
              AsyncStorage.setItem(cache.LOGIN_DATA, JSON.stringify(context));
              // b.登陆成功,需要合并登录前和登陆后的购物车,传入回调函数
              mergePurchase(this.state().get('callBack'));
              // c.登陆成功,关闭弹框
              msg.emit('app:tip', '登录成功');

              msg.emit('router: goToNext', { routeName: 'Main' });
              _.showRegisterModel(context.couponResponse, true);
          }
      } else {
          msg.emit('app:tip', message);
      }
  };

  setInviteCode = (inviteCode) => {
    this.dispatch('set:inviteCode', inviteCode);
  };
}
