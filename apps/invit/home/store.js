import AsyncStorage from '@react-native-community/async-storage';
import { Store, msg } from 'plume2';
import { fromJS } from 'immutable';

import { config } from 'wmkit/config';
import * as WMkit from 'wmkit/kit';
import { cache } from 'wmkit/cache';

import * as webapi from './webapi';
import HomeActor from './actor/home-actor';

export default class AppStore extends Store {
  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  bindActor() {
    return [new HomeActor()];
  }

  /**
   * 初始化数据
   */
  init = async () => {
    if (WMkit.isDistributor()) {
      // 当前用户是分销员
      this.dispatch('InvitActor:isDistributor', true);
    }

    // 查询分销配置信息
    const { code, context } = await webapi.getDistributionSetting();
    if (code == config.SUCCESS_CODE) {
      if (context) {
        let result = context;
        //1、分销大开关打开且邀新奖励开关打开2、小C身份且招募开关打开且为邀新升级类型，才能进入该页面
        if (
          result.openFlag &&
          (result.inviteFlag ||
            (!WMkit.isDistributor() && result.applyFlag && result.applyType))
        ) {
          this.dispatch('InvitActor:initDistributionSetting', context);
        }
      }
    }

    //查询分销设置信息
    const res = await webapi.fetchInvitorInfo();
    if (res.code == config.SUCCESS_CODE) {
      this.dispatch(
        'distributeActor:setting',
        res.context.distributionSettingSimVO
      );
    }
  };

  /**
   * 打开详细说明弹窗
   */
  openDetailLayout = (res) => {
    this.dispatch('homeActor:changeLayout', true);
    this.dispatch('InvitActor:getDetailData', res.ruleDesc);
  };

  /**
   * 关闭详细说明弹窗
   */
  closeDetailLayout = () => {
    this.dispatch('homeActor:changeLayout', false);
  };

  /**
   * 打开邀请好友弹窗
   */
  openInvitLayout = async () => {
    //获取登录人id
    const loginData = await AsyncStorage.getItem(cache.LOGIN_DATA);
    //调用后台接口，生成邀请码
    const res = await webapi.getInviteNewCode({
      tag: 'register',
      inviteeId: JSON.parse(loginData).customerId
    });
    if (res.code == config.SUCCESS_CODE) {
      //存储小程序码的链接
      this.dispatch('homeActor:inviteCode', res.context);
      this.dispatch('homeActor:invitPop', true);
    }
  };

  /**
   * 关闭邀请好友弹窗
   */
  closeInvitLayout = () => {
    this.dispatch('homeActor:invitPop', false);
  };
  /**
   * 设置邀请好友列表
   * @param res
   */
  fetchFriends = (res) => {
    if (res.context) {
      if (res.context.totalElements) {
        this.dispatch('InvitActor:setTotalNum', res.context.totalElements);
      }

      this.dispatch('InvitActor:setFriends', fromJS(res.context.content));
    }
  };
}
