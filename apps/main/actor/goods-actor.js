import { Actor, Action } from 'plume2';
import { fromJS } from 'immutable';

export default class GoodsActor extends Actor {
  defaultState() {
    return {
      goodsList: [],
      advList: [],
      loading: true,
      // 消息数量
      noticeNum: 0,
      preferentialNum: 0,
      // 预置词
      preKeywords: [],

      // 城市
      cityInfo: '',
      modalVisible: false,
      geolocationVisible: false
    };
  }

  /**
   * 商品列表
   * @param state
   * @param res
   * @returns {Map<string, V>}
   */
  @Action('goodsActor:goodsList')
  goodsList(state, res) {
    return state.set('goodsList', fromJS(res));
  }

  /**
   * 广告列表
   * @param state
   * @param res
   * @returns {Map<string, V>}
   */
  @Action('goodsActor:advList')
  advList(state, res) {
    return state.set('advList', fromJS(res));
  }

  /**
   * loading
   * @param state
   * @param res
   * @returns {Map<string, V>}
   */
  @Action('goodsActor: loading')
  loading(state, flag) {
    return state.set('loading', flag);
  }

  @Action('set:state')
  setState(state, { field, value }) {
    return state.set(field, fromJS(value));
  }

  /**
   * 预置搜索词
   * @param state
   * @param preKeywords
   * @returns {*}
   */
  @Action('search:bar:setPre')
  initPreWord(state, preKeywords) {
    return state.set('preKeywords', preKeywords);
  }
}
