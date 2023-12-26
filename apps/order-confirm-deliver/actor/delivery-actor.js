import { Action, Actor } from 'plume2';
import { fromJS } from 'immutable';

export default class DeliveryActor extends Actor {
  defaultState() {
    return {
      //平台物流公司列表
      companyList: fromJS([]),

      //平台物流收货站点
      acceptSiteAddr: '',

      //是否已添加自建物流
      isAddPersonalSite: false,

      //自建物流信息
      personalSite: fromJS({
        id: '',
        logisticsName: '',
        logisticsPhone: '',
        logisticsAddress: '',
        receivingPoint: '',
      }),

      //搜索关键词
      searchKey: '',

      //选择的平台物流公司
      selectedItem: null,

      //是否显示添加自建物流弹框
      showModal: false,
      loading: false,
      homeDeliverLogisticsContent: null,
      //是否显示搜索弹框
      showSearchModal: false,
      pageCurrent:0,
      newList:fromJS([])
    };
  }

  /**
   * 更改任意字段值
   * @param {plume2.IMap} state
   * @param {any} field
   * @param {any} value
   * @returns {plume2.IMap}
   */
  @Action('order: field: change')
  changeFieldValue(state, { field, value }) {
    return state.set(field, fromJS(value));
  }

  @Action('order: deliver: set')
  deliverSiteSet(state, { key, value }) {
    return state.setIn(['personalSite', key], fromJS(value));
  }

  /**
   * 给物流文案赋值
   * @param state
   * @param homeDeliverLogisticsContent
   * @returns {*}
   */
  @Action('deliverActor: setHomeDeliverLogisticsContent')
  setHomeDeliverLogisticsContent(state, homeDeliverLogisticsContent){
    return state.set('homeDeliverLogisticsContent', homeDeliverLogisticsContent);
  }

  @Action('deliver: page: change')
  changePageCurrent(state, pageCurrent) {
    return state.set('pageCurrent', pageCurrent);
  }
  @Action('deliver: newList')
  changeNewList(state, newList) {
    return state.set('newList', fromJS(newList));
  }
}
