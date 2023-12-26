import { Actor, Action } from 'plume2';
import { fromJS } from 'immutable';

export default class GoodsTabActor extends Actor {
  defaultState() {
    return {
      // 店铺Id
      storeId: null,
      // 选中的tab
      tabName: '',
      // 选中的类目
      selectedCate: {
        storeCateIds: [],
        cateName: '分类'
      },
      // 排序选项
      sortType: {
        type: '',
        sort: ''
      },
      // 筛选tab里的商城服务-自营商品筛选项
      selectSelfCompany: false,
      // 筛选tab里的品牌列表
      brandList: [],
      // 选中的品牌编号列表
      selectedBrandIds: [],
      brandExpanded: false, // 品牌筛选项是否全部展开？
      // 筛选tab里的规格列表
      specs: [],
      specsExpanded: {}, // 规格筛选项是否展开 map
      // 筛选tab里的规格对应的规格值信息，结构如{specId: '1', vals: [val1, val2, val3]}
      specDetails: {},
      // 筛选tab里选中规格值编号，结构如{specId: '1', vals: [val1, val2, val3]}
      selectedSpecDetails: {},
      // 搜索关键字
      queryString: '',
      // 是否初始化解析参数完毕
      initialEnd: false,
      // 是否需要重绘品牌／规格筛选项
      drawFilter: true,
      // 列表是否不为空 true 不为空 false 为空
      isNotEmpty: true,
      // 是否需要展示返回按钮，从全部分类页面和搜索页进入的话需要
      showGoBack: false
    };
  }

  /**
   * 解析参数完毕
   */
  @Action('goods-list:initialEnd')
  initialEnd(state) {
    return state.set('initialEnd', true);
  }

  /**
   * 是否需要展示返回按钮
   */
  @Action('goods-list:showGoBack')
  showGoBack(state, showGoBack) {
    return state.set('showGoBack', showGoBack);
  }

  /**
   * 搜素条件修改
   */
  @Action('goods-list:searchParams')
  searchParams(state, params) {
    return state.mergeDeep(params);
  }

  /**
   * 显示遮罩
   */
  @Action('goods-list:openShade')
  openShade(state, tabName) {
    return state.set('tabName', tabName);
  }

  /**
   * 隐藏遮罩
   */
  @Action('goods-list:closeShade')
  closeShade(state) {
    return state.set('tabName', '');
  }

  @Action('goods-list:drawFilter')
  drawFilter(state, drawFilter) {
    return state.set('drawFilter', drawFilter);
  }

  /**
   * 初始化品牌规格筛选项
   */
  @Action('goods-list:initFilter')
  initBrand(state, filters) {
    return state
      .set('brandList', filters.get('brands'))
      .set('specs', filters.get('goodsSpecs'))
      .set('specDetails', filters.get('goodsSpecDetails'));
  }

  /**
   * 设置选中类目
   */
  @Action('goods-list:setCateId')
  setCateId(state, { cateId, cateName }) {
    return state.set('selectedCate', fromJS({ cateId, cateName }));
  }

  /**
   * 设置排序
   */
  @Action('goods-list:setSort')
  setSort(state, { type, sort }) {
    return state
      .setIn(['sortType', 'type'], type)
      .setIn(['sortType', 'sort'], sort);
  }

  /**
   * 品牌规格筛选项选中内容变更
   */
  @Action('goods-list:filterChange')
  filterChange(
    state,
    {
      selectSelfCompany,
      selectedBrandIds,
      selectedSpecDetails,
      brandExpanded,
      specsExpanded
    }
  ) {
    return state.withMutations((state) => {
      state
        .set('selectSelfCompany', selectSelfCompany)
        .set('selectedBrandIds', selectedBrandIds)
        .set('selectedSpecDetails', selectedSpecDetails)
        .set('brandExpanded', brandExpanded)
        .set('specsExpanded', specsExpanded);
    });
  }

  /**
   * 列表是否不为空 true 不为空  false 为空
   */
  @Action('goods-list:isNotEmpty')
  isNotEmpty(state, isNotEmpty) {
    return state.set('isNotEmpty', isNotEmpty);
  }

  /**
   * 更新品牌筛选项的展开状态
   */
  @Action('goods-list:brandExpanded')
  brandExpanded(state, brandExpanded) {
    return state.set('brandExpanded', brandExpanded);
  }

  /**
   * 更新规格筛选项的展开状态
   */
  @Action('goods-list:specExpanded')
  specExpanded(state, { specId, expanded }) {
    let specs = state.get('specs');
    const index = specs.findIndex(
      (spec) => spec.get('specId').toString() === specId.toString()
    );
    return state.setIn(['specs', index, 'expanded'], expanded);
  }
}
