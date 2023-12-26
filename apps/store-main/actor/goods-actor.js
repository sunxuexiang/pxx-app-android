import { Action, Actor } from 'plume2';
import { fromJS } from 'immutable';

export default class GoodsActor extends Actor {
  defaultState() {
    return {
      // 首页sku集合
      skus: [],
      //分享赚弹框
      showShare: false,
      checkedSku: fromJS({}),
      //是否加入店铺
      addSelfShop: true,
      //分享赚--图文分享弹窗
      shareModalVisible: false,
      //是否展示评价相关信息
      // 评价开关
      isShow: false,
      // 企业购服务开关
      iepSwitch: false,
      // 企业够配置信息
      iepInfo: {},
      //二级气泡弹窗
      isMenuBoxFlag: false,
      menuList: [],
      //预约列表
      appointmentSaleVOList: [],
      //预售列表
      bookingSaleVOList:[]
    };
  }

  /**
   * 首页商品初始化
   */
  @Action('goods: init')
  skuInit(state, skus) {
    return state.set('skus', skus);
  }

  @Action('goodsActor:isShow')
  setIsShow(state, flag) {
    return state.set('isShow', flag);
  }

  @Action('store:isShow')
  setIsShow(state, flag) {
    return state.set('isShow', flag);
  }

  @Action('goods-list:changeShowShare')
  changeShowShare(state) {
    return state.set('showShare', !state.get('showShare'));
  }

  @Action('goods-list:saveCheckedSku')
  saveCheckedSku(state, sku) {
    return state.set('checkedSku', sku);
  }

  @Action('goods-list:changeAddSelfShop')
  changeAddSelfShop(state, value) {
    return state.set('addSelfShop', value);
  }

  @Action('goods-list:toggleShareVisible')
  toggleShareVisible(state) {
    return state.set('shareModalVisible', !state.get('shareModalVisible'));
  }

  /**
   * 企业购信息
   * @param state
   * @param context
   * @returns {any}
   */
  @Action('goods-list:iep-info')
  setIepInfo(state, context) {
    return state.set('iepInfo', context);
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
   * 气泡弹窗导航
   *
   */
  @Action('goods-list:nav')
  showModel(state,menuList){
    return state.set('menuList',menuList)
  }

  @Action('goods-list:changeFlag')
  filterChange(state,flag){
    return state.set('isMenuBoxFlag',flag)
  }

  @Action('goods: setAppointmentSaleVOList')
  setAppointmentSaleVOList(state, appointmentSaleVOList) {
    return state.set('appointmentSaleVOList', appointmentSaleVOList);
  }

  @Action('goods: setBookingSaleVOList')
  setBookingSaleVOList(state, bookingSaleVOList) {
    return state.set('bookingSaleVOList', bookingSaleVOList);
  }
}
