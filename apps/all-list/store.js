import { fromJS } from 'immutable';
import { Store } from 'plume2';
import CateActor from './actor/cate-actor';
import * as Api from './webapi';
import * as webapi from '../search/webapi';

export default class AppStore extends Store {
  bindActor() {
    return [new CateActor()];
  }

  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  /**
   * 初始化分类数据
   */
  init = cateId => {
    //加载中
    this.changeLoadingVisible(true);
    Api.getAllCates().then(res => {
      //取消加载中
      this.changeLoadingVisible(false);
      const context = fromJS(res).get('context');
      let cateList = fromJS(JSON.parse(context) || []);

      // 过滤掉默认分类
      cateList = cateList.filter(cate => cate.get('isDefault') === 'NO');

      this.dispatch('cateActor:init', cateList);

      //如果传入catId则计算index
      if (cateId == undefined) return;
      let cateFilter = cate => {
        if (cate.get('cateId') == cateId) return true;
        if (
          cate.get('goodsCateList').size != 0 &&
          cate.get('goodsCateList').filter(cateFilter).size != 0
        )
          return true;
        return false;
      };
      for (let i = 0; i < cateList.size; i++) {
        if (cateFilter(cateList.get(i))) {
          this.dispatch('cateActor:index', i);
          break;
        }
      }
    });
    this._setPrewords();
  };
  /**
   * 设置预置词
   *
   */
  _setPrewords = async () => {
    const result = await webapi.getPresetSearchTerms();
    let preWords =
      result?.context?.presetSearchTermsVO[0]?.presetSearchKeyword || '';
    this.dispatch('searcher:setPre', preWords);
  };
  /**
   * 更新选中的一级分类
   * @param index
   */
  changeIndex = index => {
    this.dispatch('cateActor:index', index);
  };

  //改变加载中状态
  changeLoadingVisible = (status) => {
    this.dispatch('set: loadingVisible', status);
  };
}
