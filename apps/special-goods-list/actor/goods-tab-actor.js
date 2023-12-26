import { Action, Actor } from 'plume2';
import { fromJS, List, Map } from 'immutable';

export default class GoodsTabActor extends Actor {
  defaultState() {
    return {
      // 选中的tab
      tabName: '',
      // 选中的类目
      selectedCate: {
        cateId: 0,
        cateName: '分类'
      },
      // 排序选项
      sortType: {
        type: '',
        sort: ''
      },
      // 筛选tab里的商城服务-自营商品筛选项
      selectSelfCompany: false,
      // 筛选tab里的商城服务-只看分享赚筛选项
      selectShareProfits: false,
      // 筛选tab里的品牌列表
      brandList: [],
      // 选中的品牌编号列表
      selectedBrandIds: [],
      brandExpanded: false, // 品牌筛选项是否全部展开？
      // 搜索关键字
      queryString: '',
      // 是否初始化解析参数完毕
      initialEnd: false,
      // 是否需要重绘品牌筛选项
      drawFilter: true,
      // 列表是否不为空 true 不为空 false 为空
      isNotEmpty: true,
      // 是否需要展示返回按钮，从全部分类页面和搜索页进入的话需要
      showGoBack: false,
      // 商品属性
      goodsProps: [],
      // 展开对应属性，结构如{propId: '1', expand: true}
      expandProp: {},
      isDistributor: true,
      // 企业购服务开关
      iepSwitch: false,
      // 企业购筛选项
      isIep: false
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
   * 初始化品牌筛选项
   */
  @Action('goods-list:initFilter')
  initBrand(state, filters) {
    return state.set('brandList', filters.get('brands'));
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
   * 品牌,属性筛选项选中内容变更
   */
  @Action('goods-list:filterChange')
  filterChange(
    state,
    {
      selectSelfCompany,
      selectedBrandIds,
      goodsProps,
      brandExpanded,
      expandProp,
      selectShareProfits,
      isIep

    }
  ) {
    return state.withMutations((state) => {
      state
        .set('selectSelfCompany', selectSelfCompany)
        .set('selectedBrandIds', selectedBrandIds)
        .set('goodsProps', goodsProps)
        .set('brandExpanded', brandExpanded)
        .set('expandProp', expandProp)
        .set('selectShareProfits', selectShareProfits)
        .set('isIep', isIep);
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
   * 清空选中的 自营/属性/品牌信息
   */
  @Action('goods-list:clearFilters')
  clearFilters(state) {
    return state.withMutations((state) => {
      state
        .set('selectSelfCompany', false)
        .set('selectedBrandIds', List())
        .set('brandExpanded', Map())
        .set('expandProp', Map());
    });
  }

  /**
   * 设置商品属性
   */
  @Action('goods-list:props')
  setGoodsProps(state, goodsProps) {
    return state.set('goodsProps', goodsProps);
  }

  @Action('goods-list:setIsDistributor')
  setIsDistributor(state, isDistributor) {
    return state.set('isDistributor', isDistributor);
  }

  @Action('goods-list:setIepSwitch')
  setIepSwitch(state, iepSwitch) {
    return state.set('iepSwitch', iepSwitch);
  }

  @Action('goods-list:queryString')
  setQueryString(state, queryString) {
    return state.set('queryString', queryString);
  }
}
