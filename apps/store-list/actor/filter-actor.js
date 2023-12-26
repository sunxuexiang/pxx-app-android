import { Actor, Action } from 'plume2';

export default class FilterActor extends Actor {
  defaultState() {
    return {
      initialEnd: false, // 是否初始化解析参数完毕,防止一次空搜索条件的查询
      visible: false, // 筛选是否显示
      keywords: '', // 搜索关键字（店铺名称、商家名称）
      companyType: null, //是否平台自营 0、平台自营 1、第三方商家
      provinceIds: [], // 多选的省份
      cityIds: [] // 多选的城市
    };
  }

  /**
   * 筛选展开收起
   */
  @Action('filter:visible')
  filterClick(state, visible) {
    return state.set('visible', visible);
  }

  /**
   * 初始化搜索内容
   */
  @Action('filter:keywords')
  initKeywords(state, keywords) {
    return state.set('keywords', keywords);
  }

  /**
   * 修改是否自营
   */
  @Action('filter:companyType')
  changeCompanyType(state, companyType) {
    return state.set('companyType', companyType);
  }

  /**
   * 设置选中的省份搜索项
   */
  @Action('filter:provOption')
  setProvince(state, provinceIds) {
    return state.set('provinceIds', provinceIds);
  }

  /**
   * 设置选中的城市搜索项
   */
  @Action('filter:cityOption')
  setCity(state, cityIds) {
    return state.set('cityIds', cityIds);
  }

  /**
   * 初始化搜索项完毕
   */
  @Action('filter:initialEnd')
  initialEnd(state) {
    return state.set('initialEnd', true);
  }
}
