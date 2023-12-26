/**
 * Created by hht on 2017/9/4.
 */

import { Store, msg } from 'plume2';
import AsyncStorage from '@react-native-community/async-storage';
import { cache } from 'wmkit/cache';
import { config } from 'wmkit/config';

import * as webapi from './webapi';
import UserCenterActor from './actor/user-center-actor';

export default class AppStore extends Store {
  bindActor() {
    return [new UserCenterActor()];
  }

  constructor(props) {
    super(props);
  }

  setData = (field, value) => {
    this.dispatch('set:state', { field, value });
  };

  /**
   * 会员中心初始化数据
   */
  init = async () => {
    const { context, code, message } = await webapi.fetchCustomerCenterInfo();
    if (code == config.SUCCESS_CODE) {
      this.dispatch('userCenter:init', context);
    } else {
      msg.emit('app:tip', message);
      //token过期或者校验错误,将token清除
      AsyncStorage.setItem(cache.LOGIN_DATA, '');
      window.token = '';
    }

    this.initOnLineSerivce();
    this.handleAliConsult();
    this.growthValueIsOpen();
    this.basicRules();
    this.isShow();
    this.messageInit();
    // this.initLogisticsLog();
    this.setSignFlag();
    this.queryBuyerByPhone();
    const res1 = await webapi.count();
    const res2 = await webapi.storeFollowNum();
    const res3 = await webapi.statistics();
    const res4 = await webapi.listMyCouponList();
    this.dispatch('userCenter:setGoodsFollowNum', res1.context);
    this.dispatch('userCenter:setStoreFollowNum', res2.context);
    this.dispatch(
      'userCenter:accountBalanceTotal',
      res3.context.accountBalanceTotal
    );
    this.dispatch('userCenter:unUseCount', res4.context.unUseCount);

    const res5 =await webapi.getOrderTrade();
    this.dispatch('userCenter:setOrderTrade', res5.context);

  };

  //查询是否为员工
  queryBuyerByPhone = async () => {
    const loginData = await AsyncStorage.getItem(cache.LOGIN_DATA);
    const contactPhone = JSON.parse(loginData).customerDetail.contactPhone;
    const { code, context, message } = await webapi.queryBuyerByPhone(contactPhone);
    if (code === config.SUCCESS_CODE) {
      if (context) {
        this.dispatch('flied: commonChange', {key:'isInvites',value:true});
        this.dispatch('flied: commonChange', {key:'employeeId',value:context.employeeId});
        this.dispatch('flied: commonChange', {key:'jobNo',value:context.jobNo});
      }
    } else {
      msg.emit('app:tip', message);
    }
  }

  /**
   * 获取订单物流信息
   * @returns {Promise<void>}
   */
  initLogisticsLog = async () => {
    const { code, context, message } = await webapi.initLogisticsLog();
    if (code === config.SUCCESS_CODE) {
      this.dispatch('logisticsLog:init', context);
    } else {
      msg.emit('app:tip', message);
    }
  };

  /**
   * 查询在线QQ客服
   * @returns {Promise<void>}
   */
  initOnLineSerivce = async () => {
    const { code, context, message } = await webapi.onLineServiceList();
    if (code === config.SUCCESS_CODE) {
      this.dispatch('serviceList:getList', context);
    } else {
      msg.emit('app:tip', message);
    }
  };

  /**
   * 查询是否已签到
   */
  setSignFlag = async () => {
    const { code, context, message } = await webapi.getCustomerInfo();
    if (code === config.SUCCESS_CODE) {
      this.dispatch('set:signFlag', context.signFlag);
    } else {
      msg.emit('app:tip', message);
    }
  };

  /**
   *点击咨询按钮获取阿里云客服url
   */
  handleAliConsult = async () => {
    // 获取登录信息
    const loginData = await AsyncStorage.getItem(cache.LOGIN_DATA);
    if (!loginData) {
      return null;
    }
    const customerId = JSON.parse(loginData).customerId;
    const customerName = JSON.parse(loginData).customerDetail.customerName;

    const res = await webapi.getAliyunChatUrl(customerId, customerName);
    this.dispatch('aliChat:aliUrl', res.context);
    return res.context;
  };

  //分页查询app消息
  messageInit = async () => {
    const { code, context, message } = await webapi.messagePage({
      pageSize: 10,
      pageNum: 0
    });
    if (code === config.SUCCESS_CODE) {
      this.setData('noticeNum', context.noticeNum);
      this.setData('preferentialNum', context.preferentialNum);
    } else {
      msg.emit('app:tip', message);
    }
  };

  /**
   * 查询成长值配置
   * @returns {Promise<void>}
   */
  growthValueIsOpen = async () => {
    let res = await webapi.growthValueIsOpen();
    if (res && res.code == config.SUCCESS_CODE && res.context.open) {
      this.dispatch('userInfo:growthValueIsOpen');
    }
  };

  /**
   * 查询平台积分和评价开关配置
   * @returns {Promise<void>}
   */
  basicRules = async () => {
    // 积分开关是否打开
    let res = await webapi.basicRules();
    if (res && res.code === config.SUCCESS_CODE && res.context.status === 1)
      this.dispatch('userInfo:pointsIsOpen');

    // 评价开关是否打开
    const eFlag = await webapi.commentConfig();
    if (eFlag.code == config.SUCCESS_CODE && eFlag.context.evaluate) {
      this.dispatch('userInfo:evaluateIsOpen');
    }
  };

  /**
   * 目前没有弹框
   * @returns {Promise<void>}
   */
    // fetchModal = async (applicationPageName) => {
    //   let res = await webapi.pageManagementAndPopupAdministrationList({
    //     applicationPageName: applicationPageName
    //   });
    //   this.dispatch('userCenter:fetchModal', res.context.popupAdministrationVOS);
    // };

  isShow = async () => {
    let res = await webapi.isShow();
    if (res && res.code === config.SUCCESS_CODE) {
      this.dispatch('userCenter:isEvaluateShow', res.context.evaluate);
    }
  };
}
