/**
 * Created by chenpeng on 2017/12/18.
 */
import { Store, msg } from 'plume2';
import { fromJS } from 'immutable';
import { Confirm } from 'wmkit/modal/confirm';
import { myPvUvStatis } from 'wmkit/wm_sta';
import { cache } from 'wmkit/cache';
import { config } from 'wmkit/config';

import StoreActor from './actor/store-actor';
import TabActor from './actor/tab-actor';
import * as webApi from './webapi';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as evaluateWebapi from 'wmkit/biz/evaluateIs-show-webapi';

export default class AppStore extends Store {
  bindActor() {
    return [new StoreActor(), new TabActor()];
  }

  constructor(props) {
    super(props);
    if (__DEV__) {
      window._store = this;
    }
  }

  /**
   * 初始化
   * @returns {Promise.<void>}
   */
  init = async (storeId) => {
    const res = await webApi.archives(storeId);
    console.log(res,'v.resres')
    if (res.code === config.SUCCESS_CODE) {
      /**店铺pv/uv埋点*/
      myPvUvStatis('StoreFile', null, res.context.companyInfoId);

      this.dispatch('store-actor:set', fromJS(res.context || {}));
    } else {
      msg.emit('store-close:visible', true);
    }

    const evluateRes = await evaluateWebapi.isShow();
    this.dispatch('store-actor:isShow', evluateRes);

    this.initMember(storeId);
    let result;
    let data;

    //如果是自营
    if (res.context.companyType === 0) {
      result = await Promise.all([
        webApi.proprietaryGrowthValue(),
        webApi.proprietaryGradeList(),
        webApi.growthValueIsOpen()
      ]);
    } else {
      result = await Promise.all([
        webApi.thirdPartyConsumption(storeId),
        webApi.thirdPartyGradeList(storeId)
      ]);
    }
    //用户信息成长值or 消费多少笔
    if (
      result[0].code == config.SUCCESS_CODE &&
      result[1].code == config.SUCCESS_CODE
    ) {
      this.dispatch('userInfo:init', result[0].context);
      if (res.context.companyType === 0) {
        data = result[1].context.customerLevelVOList.map((value) => {
          return {
            customerLevelName: value.customerLevelName,
            customerLevelDiscount: value.customerLevelDiscount,
            growthValue: value.growthValue
          };
        });
        this.dispatch('member:levelList', fromJS(data));
      } else {
        data = result[1].context.storeLevelVOList.map((value) => {
          return {
            customerLevelName: value.levelName,
            customerLevelDiscount: value.discountRate,
            amountConditions: value.amountConditions,
            orderConditions: value.orderConditions
          };
        });
        this.dispatch('member:levelList', fromJS(data));
      }
    }
    //tab 会员后台打开或者 是第三方就 显示
    if (
      (result[2] &&
        result[2].code == config.SUCCESS_CODE &&
        result[2].context.open) ||
      !result[2]
    ) {
      this.dispatch('userInfo:growthValueIsOpen');
    }
  };

  /**
   * 切换tab
   * @param key
   */
  switchTab = (key) => {
    this.dispatch('tab-actor:setActiveKey', key);
  };

  /**
   * 初始化店铺会员、等级
   * @param storeId
   * @returns {Promise.<void>}
   */
  initMember = async (storeId) => {
    //登录信息
    AsyncStorage.getItem(cache.LOGIN_DATA, (err, result) => {
      if (result) {
        this.dispatch(
          'store-member-actor:setCustomerName',
          JSON.parse(result).customerDetail.customerName
        );
      }
    });

    //店铺的会员等级与折扣信息
    const res = await webApi.storeMember(storeId);

    if (res.code === config.SUCCESS_CODE) {
      this.dispatch('store-member-actor:init', res.context);
    }
  };

  /**
   * 联系商家
   * @param mobile
   */
  contact = () => {
    const mobile = this.state().getIn(['storeArchives', 'contactMobile']);
    Confirm({
      text: '拨打电话: ' + mobile,
      cancelText: '取消',
      okText: '确认',
      okFn: () => {
        const telUrl = 'tel:' + mobile;

        Linking.canOpenURL(telUrl)
          .then((supported) => {
            if (!supported) {
              msg.emit('app:tip', `Can't handle url: ${telUrl}`);
            } else {
              return Linking.openURL(telUrl);
            }
          })
          .catch((err) => console.error('An error occurred', err));
      }
    });
  };
  /**
   * 改变附件弹窗的显示隐藏，对图片对象重新排序
   */
  changeAnnexMask = (states, index) => {
    this.dispatch('change:changeAnnexMask', { states, index });
  };
}
