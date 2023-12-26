import { Action, Actor } from 'plume2';

export default class CateActor extends Actor {
  defaultState() {
    return {
      // 数据源
      cateList: [],
      // 选中的一级分类
      index: 0,
      // 加载loading
      loadingVisible: false,
      //预搜索词
      preKeywords:''
    };
  }

  /**
   * 数据初始化
   * @param state
   * @param cateList
   * @returns {Map<string, V>}
   */
  @Action('cateActor:init')
  cateInit(state, cateList) {
    return state.set('cateList', cateList);
  }

  /**
   * 更新选中的一级分类
   * @param state
   * @param index
   * @returns {Map<string, number>}
   */
  @Action('cateActor:index')
  index(state, index) {
    return state.set('index', index);
  }

  /**
   * 初始化预搜索词
   * @param state
   * @param preKeywords
   * @returns {*}
   */
  @Action('searcher:setPre')
  initPreWord(state, preKeywords) {
    return state.set('preKeywords', preKeywords);
  }

  /**
  * 加载loading
  */
 @Action('set: loadingVisible')
 loadingVisible(state, loading) {
   return state.set('loadingVisible', loading);
 }
}
