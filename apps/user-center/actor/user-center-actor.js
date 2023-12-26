/**
 * Created by hht on 2017/9/4.
 */
import { Actor, Action } from 'plume2';
import { fromJS } from 'immutable';

export default class UserCenterActor extends Actor {
  defaultState() {
    return {
      //显示在会员中心的数据
      customer: {},
      // 在线客服
      serviceList: {},
      //是否打开成长值
      growthValueIsOpen: false,
      //积分是否打开
      pointsIsOpen: false,
      // 商品评价是否打开
      evaluateIsOpen: false,
      // 阿里云客服url
      aliUrl: '',

      // 消息数量
      noticeNum: 0,
      preferentialNum: 0,
      logisticsList: [], //物流
      goodsFollow: 0,
      storeFollow: 0,
      accountBalanceTotal: 0, //总余额
      unUseCount: 0, //未使用总张数,
      signFlag: false, //今日是否签到标志
      orderTrade:{},
      isInvites:false, //是否能导购邀新
      employeeId:'',
      jobNo:'' //员工编号
    };
  }

  @Action('flied: commonChange')
  commonChange(state, {key,value}) {
    return state.set(key, value);
  }

  /**
   * 初始化数据
   * @param state
   * @param customer
   * @returns {Map<string, V>}
   */
  @Action('userCenter:init')
  init(state, customer) {
    return state.set('customer', fromJS(customer));
  }

  /**
   *
   * 弹窗管理
   */
  @Action('userCenter:fetchModal')
  setFetchModal(state, fetchModal) {
    return state.set('fetchModal', fetchModal);
  }
  /**
   * 设置收藏商品数
   * @param state
   * @param num
   */
  @Action('userCenter:setGoodsFollowNum')
  setGoodsFollowNum(state, num) {
    return state.set('goodsFollow', num);
  }

  /**
   * 总余额
   * @param state
   * @param num
   */
  @Action('userCenter:accountBalanceTotal')
  accountBalanceTotal(state, num) {
    return state.set('accountBalanceTotal', num);
  }

  /**
   * 未使用总张数
   * @param state
   * @param num
   */
  @Action('userCenter:unUseCount')
  unUseCount(state, num) {
    return state.set('unUseCount', num);
  }

  /**
   * 商品评价是否开启
   * @param state
   * @param num
   */
  @Action('userCenter:isEvaluateShow')
  setIsEvaluateShow(state, isShow) {
    return state.set('isShow', isShow);
  }

  /**
   * 设置关注店铺数
   * @param state
   * @param num
   */
  @Action('userCenter:setStoreFollowNum')
  setStoreFollowNum(state, num) {
    return state.set('storeFollow', num);
  }

  /**
   * 获取客服内容
   */
  @Action('serviceList:getList')
  getList(state, data) {
    return state.set('serviceList', fromJS(data));
  }

  /**
   * 初始化阿里云客服url
   */
  @Action('aliChat:aliUrl')
  initUrl(state, aliUrl) {
    return state.set('aliUrl', aliUrl);
  }

  /**
   * 查询是否已签到
   */
  @Action('set:signFlag')
  setSignFlag(state, signFlag) {
    return state.set('signFlag', signFlag);
  }

  /**
   * 是否成长值关闭了
   */
  @Action('userInfo:growthValueIsOpen')
  growthValueIsOpen(state) {
    return state.set('growthValueIsOpen', true);
  }

  /**
   * 是否积分值关闭了
   */
  @Action('userInfo:pointsIsOpen')
  pointsIsOpen(state) {
    return state.set('pointsIsOpen', true);
  }

  /**
   * 评价是否打开
   */
  @Action('userInfo:evaluateIsOpen')
  evaluateIsOpen(state) {
    return state.set('evaluateIsOpen', true);
  }

  @Action('set:state')
  setState(state, { field, value }) {
    return state.set(field, fromJS(value));
  }

  /**
   * 获取订单物流信息
   */
  @Action('logisticsLog:init')
  logisticsLog(state, data) {
    console.log('logisticsLog data', data);
    const { logisticsList } = data;
    return state.set('logisticsList', fromJS(logisticsList));
  }
  /**
   * 设置
   */
  @Action('userCenter:setOrderTrade')
  setOrderTrade(state, data) {
    return state.set('orderTrade', data);
  }

}
