/**
 * Created by chenpeng on 2017/12/19.
 */
import {Action, Actor} from 'plume2';
import {fromJS} from 'immutable';

export default class StoreActor extends Actor {
  defaultState() {
    return {
      //店铺档案
      storeArchives: {},
      //会员等级
      level: {},
      //店铺的会员体系
      levelList: [],
      sortEnclosures: [], //排序后的图片新数组
      annexMaskShow: false,

      userInfo:{},//用户信息
      growthValueIsOpen:false, //是否打开成长值
      //是否展示评价相关信息
      isShow: false
    };
  }

  @Action('store-actor:isShow')
  setIsShow(state, flag) {
    return state.set('isShow', flag);
  }

  /**
   * 设置店铺档案
   * @param state
   * @param store
   */
  @Action('store-actor:set')
  setStore(state, store) {
    return state.set('storeArchives', store);
  }

  /**
   * 初始化数据
   * @param state
   * @param params
   */
  @Action('store-member-actor:init')
  init(state, params) {
    state = state
      .set('level', params.level != null ? fromJS(params.level) : fromJS({}))
    return state;
  }

  /**
   * 设置客户名称
   * @param state
   * @param param
   */
  @Action('store-member-actor:setCustomerName')
  setCustomerName(state, param) {
    return state.set('customerName', param);
  }
  /**
   * 图片的显示隐藏,重新排序
   */
  @Action('change:changeAnnexMask')
  changeAnnexMask(state, { states, index }) {
    /*
      states:0 营业执照；1：经营资格；2：品牌经营资质
    */
    if (states != undefined) {
      let newFileList = state.getIn([
        'storeArchives',
        states == 1
          ? 'catePicList'
          : states == 2
            ? 'brandPicList'
            : 'businessLicence'
      ]);
      if (states == 0) {
        newFileList = newFileList.split();
      } else {
        newFileList = newFileList.toJS();
        newFileList = newFileList.splice(index).concat(newFileList);
      }
      return state
        .set('sortEnclosures', newFileList)
        .set('annexMaskShow', !state.get('annexMaskShow'));
    } else {
      return state.set('annexMaskShow', !state.get('annexMaskShow'));
    }
  }


  /**
   * 用户消费信息
   */
  @Action('userInfo:init')
  userInfo(state, res) {
    return state.set('userInfo', fromJS(res))
  }

  /**
   * 是否成长值关闭了
   */
  @Action('userInfo:growthValueIsOpen')
  growthValueIsOpen(state) {
    return state.set('growthValueIsOpen', true)
  }

  /**
   * 等级列表
   */
  @Action('member:levelList')
  levelList(state, levelList) {
    return state.set('levelList', levelList)
  }





}
