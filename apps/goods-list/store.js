import { msg, Store } from 'plume2';
import { fromJS } from 'immutable';

import { config } from 'wmkit/config';
import * as WMkit from 'wmkit/kit';
import * as VAS from 'wmkit/vas';
import AsyncStorage from '@react-native-community/async-storage';
import * as evaluateWebapi from 'wmkit/biz/evaluateIs-show-webapi';

import * as webApi from './webapi';
import GoodsActor from './actor/goods-actor';
import GoodsTabActor from './actor/goods-tab-actor';

export default class AppStore extends Store {
  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  bindActor() {
    return [new GoodsActor(), new GoodsTabActor()];
  }

  /**
   * 初始化数据
   */
  init = async ({ cateId, cateName, queryString, showGoBack }) => {
    const { code, context } = await webApi.queryGoodsShowType();
    const getReduced = await webApi.getReduced();
    AsyncStorage.setItem('getReduced',JSON.stringify(getReduced.context))
    this.getMenuList();
    if (code == config.SUCCESS_CODE) {
      // 查询平台评价开关配置
      this.basicRules();
      const isDistributor = WMkit.isDistributor();
      this.dispatch('goods-list:setIsDistributor', isDistributor);
      // goodsShowType(0:sku列表,1:spu列表)  imageShowType(0:小图,1:大图)
      const { goodsShowType, imageShowType } = context;
      let params = {};
      let props = [];
      if (cateId) {
        params['selectedCate'] = { cateId, cateName };
        props = await this._getProps(cateId);
      }
      if (queryString) {
        params['queryString'] = queryString;
      }

      this.dispatch('goods-list:showGoBack', showGoBack);

      //查询是否展示评价相关信息
      const evacontext = await evaluateWebapi.isShow();
      this.transaction(() => {
        this.dispatch('goodsActor:isShow', evacontext);
        this.dispatch('goodsActor:changeGoodsShowType', goodsShowType); // sku/spu视图模式
        this.dispatch('goodsActor:changeImageShowType', imageShowType == 0); // 小图/大图模式
        this.dispatch('goods-list:props', fromJS(props));
        this.dispatch('goods-list:searchParams', fromJS(params));
        this.dispatch('goods-list:initialEnd');
        if (cateName != null && cateName != undefined && cateName != '') {
          this.dispatch('goods-list:setCateId', { cateId, cateName });
        }
      });
    }
    // 增值服务信息
    this._initVAS();
  };

  // 判断骨架屏是否展示
  isSkeletonShow = (flag) => {
    this.dispatch('goodSkeleton:show', flag);
  };

  // 判断下一页loading是否展示
  isNextPageLoading = (flag) => {
    this.dispatch('nextPageLoading:show', flag);
  };

  /**
   * 增值服务信息
   */
  _initVAS = async () => {
    // 企业购业务-开关|配置信息
    this.dispatch('goods-list:iep-info', fromJS(await VAS.fetchIepInfo()));
    this.dispatch('goods-list:setIepSwitch', await VAS.checkIepAuth());
  };

  /*
    二级导航
  */
  getMenuList = async () => {
    // 二级气泡弹框
    // const result = await webApi.getByMain(1);
    // console.log(result, '999');
    this.dispatch(
      'goodsActor:nav', []
    );
  };

  handClick = (isMenuBoxFlag) => {
    this.dispatch('goodsActor:changeFlag', isMenuBoxFlag);
  };
  /**
   * 查询平台评价开关配置
   * @returns {Promise<void>}
   */
  basicRules = async () => {
    // 评价开关是否打开
    const eFlag = await webApi.commentConfig();
    if (eFlag.code == config.SUCCESS_CODE) {
      this.dispatch('goods:isShow', eFlag.context.evaluate);
    }
  };

  /**
   * 根据分类id查询属性与属性值
   */
  _getProps = async (cateId) => {
    // 查询该分类的属性信息
    const propsRes = await webApi.queryProps(cateId);
    if (propsRes.code == config.SUCCESS_CODE) {
      propsRes.context.forEach((prop) => {
        prop.goodsPropDetails.push({
          detailId: 0,
          propId: prop.propId,
          detailName: '其他'
        });
      });
      return propsRes.context;
    }
    return [];
  };

  /**
   * 显示遮罩
   */
  openShade = (tabName) => {
    this.dispatch('goods-list:openShade', tabName);
  };

  /**
   * 隐藏遮罩
   */
  closeShade = () => {
    this.dispatch('goods-list:closeShade');
  };

  /**
   * 设置选中的类目信息
   */
  setCateId = async (cateId, cateName) => {
    const props = await this._getProps(cateId);
    this.transaction(() => {
      this.dispatch('goods-list:props', fromJS(props));
      this.dispatch(
        'goods-list:searchParams',
        fromJS({ selectedCate: { cateId, cateName }, queryString: '' })
      );
      this.dispatch('goods-list:clearFilters');
      // 设置筛选项状态为待重绘
      this.dispatch('goods-list:drawFilter', true);
      this.closeShade();
    });
  };

  /**
   * 设置排序
   */
  setSort = (type) => {
    let newType = type;
    let newSort = '';
    const sortType = this.state().get('sortType');

    // 是否切换排序类型？
    if (newType !== sortType.get('type')) {
      if (newType === 'default') {
        newSort = '';
      } else if (newType === 'composite') {
        newSort = 'desc';
      } else if (newType === 'dateTime') {
        newSort = 'desc';
      } else if (newType === 'price') {
        newSort = 'asc';
      } else if (newType === 'salesNum') {
        newSort = 'desc';
      } else if (newType === 'evaluateNum') {
        newSort = 'desc';
      } else if (newType === 'praise') {
        newSort = 'desc';
      } else if (newType === 'collection') {
        newSort = 'desc';
      }
    } else if (newType !== 'default') {
      // 同一种排序类型，切换升降顺序，默认排序无顺序

      if (sortType.get('sort') === 'asc') {
        newSort = 'desc';
      } else if (sortType.get('sort') === 'desc') {
        newSort = 'asc';
      }
    }

    this.dispatch('goods-list:setSort', { type: newType, sort: newSort });
    this.closeShade();
  };

  /**
   * 切换商品列表视图模式
   */
  changeLayout = () => {
    this.dispatch('goodsActor:changeLayout');
  };

  /**
   * 切换批发类型-规格选择框显示与否
   */
  changeWholesaleVisible = (value) => {
    // msg.emit('app:bottomVisible', { key: 'GoodsList', visible: !value });
    this.dispatch('goodsActor:changeWholesaleVisible', value);
  };

  /**
   * 切换零售类型-规格选择框显示与否
   */
  changeRetailVisible = (value) => {
    // msg.emit('app:bottomVisible', { key: 'GoodsList', visible: !value });
    this.dispatch('goodsActor:changeRetailVisible', value);
  };

  /**
   * 根据skuId查询spu相关信息,并打开对应销售类型的规格选择弹框
   * @param skuId
   */
  querySpuAndOpenSpec = async (skuId) => {
    const { code, context, message } = await webApi.querySpu(skuId);
    if (code === config.SUCCESS_CODE) {
      let goodsInfos = context.goodsInfos;
      if (goodsInfos && goodsInfos.length > 0) {
        context.skuId = skuId;
        this.transaction(() => {
          this.dispatch('goodsActor:setSpuContext', context);
          if (context.goods.saleType === 0) {
            this.changeWholesaleVisible(true);
          } else {
            this.changeRetailVisible(true);
          }
        });
      } else {
        msg.emit('app:tip', '该商品已失效,请刷新列表');
      }
    } else {
      msg.emit('app:tip', message);
    }
  };

  /**
   * 商品列表ListView查询得到的数据返回处理
   * @param data
   */
  handleDataReached = (data) => {
    if (data.code !== config.SUCCESS_CODE) {
      return;
    }

    const { goodsList } = data.context;
    this.dispatch('goods-list:isNotEmpty', !!goodsList);

    // 是否需要重绘筛选项
    if (this.state().get('drawFilter')) {
      // 设置状态为已重绘
      this.dispatch('goods-list:drawFilter', false);

      // 搜索结果对应的品牌聚合结果
      let { brands } = data.context;

      this.dispatch('goods-list:initFilter', fromJS({ brands }));
    }
  };

  // 品牌和属性筛选条件选中变化
  handleFilterChange = (
    selectSelfCompany,
    selectedBrandIds,
    goodsProps,
    brandExpanded,
    expandProp,
    selectShareProfits,
    isIep,
    pointsUsageFlag
  ) => {
    this.dispatch('goods-list:filterChange', {
      selectSelfCompany,
      selectedBrandIds,
      goodsProps,
      brandExpanded,
      expandProp,
      selectShareProfits,
      isIep,
      pointsUsageFlag
    });
  };

  changeShowShare = () => {
    this.dispatch('goods-list:changeShowShare');
  };

  saveCheckedSku = (sku) => {
    this.dispatch('goods-list:saveCheckedSku', fromJS(sku));
  };

  changeAddSelfShop = (value) => {
    this.dispatch('goods-list:changeAddSelfShop', value);
  };

  /**
   * 分享赚分享
   */
  toggleShareModal = () => {
    this.dispatch('goods-list:toggleShareVisible');
  };

  setQueryString = (queryString) => {
    this.dispatch('goods-list:queryString', queryString);
  };
}
