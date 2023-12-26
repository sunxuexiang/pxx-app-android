import { Store, msg } from 'plume2';
import { fromJS } from 'immutable';
import { config } from 'wmkit/config';
import * as webApi from './webapi';
import GuideInvitesActor from './actor/guide-invites'
import AsyncStorage from '@react-native-community/async-storage';
import { cache } from 'wmkit/cache';

export default class AppStore extends Store {
  bindActor() {
    return [
      new GuideInvitesActor(),
    ];
  }

  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  init = async(employeeId) => {
    this.fetchBaseConfig();
    this.queryPurchaseCount(employeeId)
    this.queryBuyerByPhone();
  }

  //查询是否为员工
  queryBuyerByPhone = async () => {
    const loginData = await AsyncStorage.getItem(cache.LOGIN_DATA);
    const contactPhone = JSON.parse(loginData).customerDetail.contactPhone;
    const { code, context, message } = await webApi.queryBuyerByPhone(contactPhone);
    if (code === config.SUCCESS_CODE) {
      if (context) {
        this.dispatch('guide:jobNo', context.jobNo);
      }
    } else {
      msg.emit('app:tip', message);
    }
  }

  queryPurchaseCount = async (employeeId) => {
    const { code, context, message } = await webApi.queryPurchaseCount(employeeId);
    if (code === config.SUCCESS_CODE) {
      this.dispatch('guide:today', context.todayInvitationSummaryVO);
      this.dispatch('guide:month', context.monthInvitationSummaryVO);
      this.dispatch('guide:total', context.totalInvitationSummaryVO);
    } else {
      msg.emit('app:tip', message);
    }
  };
  /**
   * 获取h5地址，用于分享
   */
  fetchBaseConfig = async () => {
    const { code, context, message } = await webApi.fetchBaseConfig();
    if (code === config.SUCCESS_CODE) {
      this.dispatch('goods-detail:getH5Url', context.mobileWebsite);
    } else {
      msg.emit('app:tip', message);
    }
  };

  
}
