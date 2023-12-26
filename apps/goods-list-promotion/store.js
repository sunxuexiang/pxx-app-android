import AsyncStorage from '@react-native-community/async-storage';
import { msg, Store } from 'plume2';
import { fromJS } from 'immutable';

import { Alert } from 'wmkit/modal/alert';
import { cache } from 'wmkit/cache';
import { config } from 'wmkit/config';
import { Confirm } from 'wmkit/modal/confirm';
import * as WMkit from 'wmkit/kit';

import { putSkuMarketingCache } from 'wmkit/biz/purchase-front';
import * as evaluateWebapi from 'wmkit/biz/evaluateIs-show-webapi';

import GoodsActor from './actor/goods-actor';
import GoodsTabActor from './actor/goods-tab-actor';
import MarketingActor from './actor/marketing-actor';
import * as webApi from './webapi';

export default class AppStore extends Store {
  constructor(props) {
    super(props);
  }

  bindActor() {
    return [new GoodsActor(), new GoodsTabActor(), new MarketingActor()];
  }

  /**
   * 初始化数据
   */
  init = async (marketingId,subType) => {
    const result = evaluateWebapi.isShow();
    this.transaction(() => {
      this.dispatch('goodsActor: marketingId', marketingId);
      this.dispatch('goodsActor: subType',subType);
      this.dispatch('goodsActor: isShow', result);
    });
    this.queryGoodsMarketingList();
  };

  /**
   * 查询商品信息
   */
  query = (result) => {
    const { code, context, message } = result;
    if (code == 'K-000000') {
      if (this.state().get('drawFilter')) {
        this.dispatch('goods-list:drawFilter');
        this.dispatch('goodsActor: cates', context.cateList);
        this.dispatch('goodsActor: brands', context.brands);
      }
      this.dispatch('goodsActor: goods', context.esGoodsInfoPage.content);
      this.getMarketingById();
      this.calcMarketing();
    } else {
      Confirm({
        text: message,
        okFn: () => msg.emit('router: goToNext', { routeName: 'Main' }),
        okText: '确定'
      });
    }
  };

  /**
   * 获取购物车商品选择的营销
   * @returns {Promise<void>}
   */
  queryGoodsMarketingList = async () => {
    if (WMkit.isLoginOrNotOpen()) {
      const { code, context, message } = await webApi.queryGoodsMarketingList();

      if (code == config.SUCCESS_CODE) {
        this.dispatch('goodsActor: goodsMarketing', context);
      } else {
        Alert({ text: message });
      }
    } else {
      const goodsMarketingList = JSON.parse(
        await AsyncStorage.getItem(cache.SKU_MARKETING_CACHE)
      );
      this.dispatch('goodsActor: goodsMarketing', goodsMarketingList);
    }
  };

  /**
   * 修改商品选择的营销
   * @param goodsInfoId
   * @param marketingId
   * @returns {Promise<void>}
   */
  modifyGoodsMarketing = async (goodsInfoId, marketingId) => {
    if (WMkit.isLoginOrNotOpen()) {
      const { code, message } = await webApi.modifyGoodsMarketing(
        goodsInfoId,
        marketingId
      );

      if (code == config.SUCCESS_CODE) {
        this.queryGoodsMarketingList();
      } else {
        Alert({ text: message });
      }
    } else {
      // 未登录时,在前端存储,用户针对sku选择的营销活动信息
      if (await putSkuMarketingCache(goodsInfoId, marketingId)) {
        this.queryGoodsMarketingList();
      } else {
        Alert({ text: '操作失败' });
      }
    }
  };

  /**
   * 修改购买数量
   * @param goodsInfoId
   * @param marketingId
   * @param oldNum
   * @param newNum
   * @returns {Promise<void>}
   */
  changeGoodsNum = async (goodsInfoId, marketingId, oldNum, newNum) => {
    if (newNum > 0) {
      await this.modifyGoodsMarketing(goodsInfoId, marketingId);
    }

    this.calcMarketing();
  };

  /**
   * 获取营销信息
   */
  getMarketingById = async () => {
    const marketingId = this.state().get('marketingId');
    const { code, context } = await webApi.getMarketingById(marketingId);
    if (code == 'K-000000') {
      this.dispatch('marketing: detail', context);
      this.dispatch('marketing: type', context.marketingType);
      this.dispatch('marketing: overlap', context.isOverlap);
    }
  };

  /**
   * 计算购物车中参加同种营销的商品列表/总额/优惠
   *
   * @param marketingId
   * @returns {Promise<void>}
   */
  calcMarketing = async () => {
    let marketingId = this.state().get('marketingId');
    let res;
    if (WMkit.isLoginOrNotOpen()) {
      res = await webApi.calcMarketingByMarketingId(marketingId);
    } else {
      const goodsInfoDTOList =
        JSON.parse(await AsyncStorage.getItem(cache.PURCHASE_CACHE)) || [];
      const goodsInfoIds = goodsInfoDTOList.map((sku) => sku.goodsInfoId);
      const goodsMarketingDTOList =
        JSON.parse(await AsyncStorage.getItem(cache.SKU_MARKETING_CACHE)) || [];
      res = await webApi.calcMarketingByMarketingIdFront(marketingId, {
        goodsInfoDTOList,
        goodsInfoIds,
        goodsMarketingDTOList
      });
    }
    if (res && res.code == 'K-000000') {
      this.dispatch('marketing: calc', fromJS(res.context));
      // 赠品sku信息
      if (res.context['marketingType'] == 2) {
        this.dispatch('marketing: gift', res.context['giftGoodsInfoResponse']);
      }
    }
  };

  /**
   * 显示遮罩
   */
  openShade = (tabName) => {
    if (tabName == 'goodsCate') {
      this.dispatch('goodsActor: check: cates');
    } else if (tabName == 'goodsBrand') {
      this.dispatch('goodsActor: check: brands');
    }
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
  setCateId = (cateId, cateName) => {
    this.dispatch(
      'goods-list:searchParams',
      fromJS({ selectedCate: { cateId, cateName }, queryString: '' })
    );
    this.dispatch('goods-list:clearFilters');
    // 设置筛选项状态为待重绘
    this.dispatch('goods-list:drawFilter', true);
    this.closeShade();
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
  changeLayout = (layout) => {
    this.dispatch('goodsActor:changeLayout', layout);
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
      let { brands, goodsSpecs, goodsSpecDetails } = data.context;

      // 如果没有类目和关键字这两个大搜索条件，只展示品牌筛选条件，不展示规格
      const cateId = this.state()
        .get('selectedCate')
        .get('cateId');
      const queryString = this.state().get('queryString');
      if (!cateId && !queryString) {
        this.dispatch('goods-list:initFilter', fromJS({ brands }));
        return;
      }

      goodsSpecDetails = goodsSpecDetails || [];
      // list转map，方便取值
      goodsSpecDetails = fromJS(goodsSpecDetails).groupBy((detail) =>
        detail.get('specId').toString()
      );

      this.dispatch(
        'goods-list:initFilter',
        fromJS({ brands, goodsSpecs, goodsSpecDetails })
      );
    }
  };

  // 品牌和规格筛选条件选中变化
  handleFilterChange = (
    selectSelfCompany,
    selectedBrandIds,
    selectedSpecDetails,
    brandExpanded,
    specsExpanded
  ) => {
    this.dispatch('goods-list:filterChange', {
      selectSelfCompany,
      selectedBrandIds,
      selectedSpecDetails,
      brandExpanded,
      specsExpanded
    });
  };

  /**
   * 关闭/展示 赠品弹框
   */
  changeGiftShow = () => {
    this.dispatch('goodsActor: changeGiftShow');
  };

  /**
   * 选中分类
   */
  chooseCate = (cId) => {
    this.dispatch('goodsActor: choose: cate', cId);
  };

  /**
   * 选中分类
   */
  chooseBrand = (bId) => {
    this.dispatch('goodsActor: choose: brand', bId);
  };

  /**
   * 清除分类选中状态
   */
  clearCates = () => {
    this.dispatch('goodsActor: clear: cates');
  };

  /**
   * 清除品牌选中状态
   */
  clearBrands = () => {
    this.dispatch('goodsActor: clear: brands');
  };

  /**
   * 确认分类
   */
  okCates = () => {
    this.transaction(() => {
      this.dispatch('goodsActor: sure: cates');
      this.dispatch('goods-list:closeShade');
    });
  };

  /**
   * 确认品牌
   */
  okBrands = () => {
    this.transaction(() => {
      this.dispatch('goodsActor: sure: brands');
      this.dispatch('goods-list:closeShade');
    });
  };
}
