import { Store, msg } from 'plume2';
import { fromJS } from 'immutable';

import { config } from 'wmkit/config';

import * as webApi from './webapi';
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
    return [new GoodsTabActor()];
  }

  /**
   * 初始化数据
   */
  init = async ({ cateId, cateName, queryString, showGoBack }) => {
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

    this.transaction(() => {
      // this.dispatch('goodsActor:changeGoodsShowType', goodsShowType); // sku/spu视图模式
      // this.dispatch('goodsActor:changeImageShowType', imageShowType == 0); // 小图/大图模式
      this.dispatch('goods-list:props', fromJS(props));
      this.dispatch('goods-list:searchParams', fromJS(params));
      this.dispatch('goods-list:initialEnd');
      if (cateName != null && cateName != undefined && cateName != '') {
        this.dispatch('goods-list:setCateId', { cateId, cateName });
      }
    });
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
      } else if (newType === 'dateTime') {
        newSort = 'desc';
      }
    } else if (newType !== 'default') {
      // 同一种排序类型，切换升降顺序，默认、最新、销量排序无顺序
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

  /**
   * 添加分销员商品
   */
  addDistributorGoods = async (goodsId, goodsInfoId, storeId) => {
    const res = await webApi.addDistributorGoods(goodsId, goodsInfoId, storeId);
    if (res.code == config.SUCCESS_CODE) {
      msg.emit('app:tip', '添加成功');
      return Promise.resolve();
    }
    return Promise.reject();
  };

  /**
   * 删除分销员商品
   */
  delDistributorGoods = async (goodsInfoId) => {
    const res = await webApi.delDistributorGoods(goodsInfoId);
    if (res.code == config.SUCCESS_CODE) {
      msg.emit('app:tip', '删除成功');
      return Promise.resolve();
    }
    return Promise.reject();
  };

  // 品牌和属性筛选条件选中变化
  handleFilterChange = (
    selectSelfCompany,
    selectHideGoods,
    selectedBrandIds,
    goodsProps,
    brandExpanded,
    expandProp
  ) => {
    this.dispatch('goods-list:filterChange', {
      selectSelfCompany,
      selectHideGoods,
      selectedBrandIds,
      goodsProps,
      brandExpanded,
      expandProp
    });
  };
}
