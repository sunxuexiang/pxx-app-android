/**
 * Created by hht on 2017/9/4.
 */
import {msg, Store} from 'plume2';

import { config } from 'wmkit/config';

import AgreeActor from "./actor/agree-actor";
import * as webApi from "./webapi";
import RNExitApp from "react-native-exit-app";
import { AsyncStorage } from 'react-native';
import { cache } from '@/wmkit';

export default class AppStore extends Store {
  bindActor() {
    return [new AgreeActor()];
  }

  //初始化
  init = async (showPrivacyModal) => {
    this.dispatch('agree:showAgreement', false);
    this.dispatch('agree:showPrivacyModal', showPrivacyModal);
    const res = await Promise.all([
      webApi.fetchPrivacyPolicyConfig(),
      webApi.fetchBaseConfig(),
    ]);
    if (
      res[0].code == config.SUCCESS_CODE &&
      res[1].code == config.SUCCESS_CODE
    ){
      // 隐私政策
      this.dispatch('agree:privacyPolicyPop', res[0].context.privacyPolicyPop ? res[0].context.privacyPolicyPop : '');
      this.dispatch('agree:privacyPolicyContent', res[0].context.privacyPolicy ? res[0].context.privacyPolicy : '');
      this.dispatch('agree:privacyPolicyId', res[0].context.privacyPolicyId ? res[0].context.privacyPolicyId : '0');
      //用户协议
      this.dispatch('agree:registerContent', res[1].context);
    }else{
      msg.emit('app:tip', message);
    }
  };

  /**
   * 显示隐私协议
   */
  showPrivacyPolicy = (showFlag) => {
    //展示隐私政策协议
    this.dispatch('agree:showFlag', showFlag);
    //展示隐私政策页面
    this.dispatch('agree:showAgreement', true);
  };

  /**
   * 关闭协议页面
   */
  closeAgreement = () => {
    //展示隐私政策页面
    this.dispatch('agree:showAgreement', false);
  };


  /**
   * 拒绝
   */
  refuse = () => {
    RNExitApp.exitApp();
  };

  /**
   * 同意
   */
  readAndAgree = (privacyPolicyId) => {
    //隐藏隐私政策弹窗
    this.dispatch('agree:showPrivacyModal', false);
    msg.emit('upgradeSetting:show');
    // 记录存储在缓存中
    AsyncStorage.setItem(
      cache.AGREE_PRIVATECY_POLICY,
      JSON.stringify(privacyPolicyId)
    );
  };




}
