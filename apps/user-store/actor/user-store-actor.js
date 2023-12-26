/**
 * Created by hht on 2017/9/4.
 */
import { Action, Actor } from 'plume2';
import { fromJS } from 'immutable';
import { Alert } from 'react-native';

export default class UserStoreActor extends Actor {
  defaultState() {
    return {
      goodsJson: {},
      checkedItems: [],
      checkAll: false,
      isEdit: false,
      hasInvalid: false,
      purchaseCount: 0,
      followCount: 0,
      toRefresh: false,
      //评价相关信息是否展示
      isShow: false,
      iepSwitch: false,
      iepCustomerFlag: 0,
      checkedSku: fromJS({}),
      loadingStatus: true,
    };
  }

  @Action('goodSkeleton:show')
  goodSkeleton(state,flag){
    return state.set('loadingStatus',flag)
  }

  /**
   * 初始化数据
   * @param state
   * @param customer
   * @returns {Map<string, V>}
   */
  @Action('userStore:getGoodsList')
  init(state, content) {
    if (content && content['goodsInfos']) {
      return state
        .set('goodsJson', fromJS(content['goodsInfos']))
        .set('followCount', content['goodsInfos']['content'].length);
    } else {
      return state
        .set('goodsJson', fromJS([]))
        .set('followCount', 0);
    }
  }

  @Action('userStore:setRefresh')
  setRefresh(state, content) {
    return state.set('toRefresh', content);
  }

  /**
   * 变化编辑状态
   * @param state
   * @param customer
   * @returns {Map<string, V>}
   */
  @Action('userStore:changeEditStatus')
  changeEditStatus(state, content) {
    return state.set('isEdit', content);
  }

  /**
   * 获取购物车数量
   * @param state
   * @param content
   */
  @Action('userStore:getPurchaseCount')
  getPurchaseCount(state, content) {
    return state.set('purchaseCount', content);
  }

  /**
   * 获取是否有失效商品
   * @param state
   * @param content
   */
  @Action('userStore:ifHasInvalid')
  ifHasInvalid(state, content) {
    return state.set('hasInvalid', content);
  }

  /**
   * 修改checkAll的状态
   * @param state
   * @param content
   */
  @Action('userStore:checkAllStatus')
  checkAllStatus(state, content) {
    return state.set('checkAll', content);
  }

  /**
   * 勾选商品方法
   * @param state
   * @param content
   */
  @Action('userStore:setCheckedItems')
  setCheckedItems(state, content) {
    return state.set('checkedItems', fromJS(content));
  }

  @Action('userStore:isShow')
  setIsShow(state, flag) {
    return state.set('isShow', flag);
  }

  /**
   * 企业购鉴权
   * @param state
   * @param iepSwitch
   * @returns {*}
   */
  @Action('goods-list:setIepSwitch')
  setIepSwitch(state, iepSwitch) {
    return state.set('iepSwitch', iepSwitch);
  }

  /**
   * 设置是否为企业购会员
   * @param state
   * @param iepCustomer
   * @returns {*}
   */
  @Action('customer:setCustomerType')
  setCustomerType(state, iepCustomerFlag) {
    return state.set('iepCustomerFlag', iepCustomerFlag);
  }

  @Action('user-store:saveCheckedSku')
  saveCheckedSku(state, sku) {
    return state.set('checkedSku', sku);
  }
}
