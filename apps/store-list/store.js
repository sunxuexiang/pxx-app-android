import { Store } from 'plume2';

import FilterStore from './actor/filter-actor';

export default class AppStore extends Store {
  bindActor() {
    return [new FilterStore()];
  }

  /**
   * 初始化搜索条件
   */
  init = (queryString) => {
    this.transaction(() => {
      this.dispatch('filter:keywords', queryString); //搜索关键字
      this.dispatch('filter:initialEnd');
    });
  };

  /**
   * 修改是否自营
   */
  changeCompanyType = (companyType) => {
    this.dispatch('filter:companyType', companyType);
  };

  /**
   * 修改省份筛选信息
   */
  changeProvOption = (provinceIds) => {
    this.dispatch('filter:provOption', provinceIds);
  };

  /**
   * 修改城市筛选信息
   */
  changeCityOption = (cityIds) => {
    this.dispatch('filter:cityOption', cityIds);
  };

  /**
   * 筛选打开收起
   */
  clickFilter = (visible) => {
    this.dispatch('filter:visible', visible);
  };
}
