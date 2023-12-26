import { msg, Store } from 'plume2';
import { fromJS } from 'immutable';

import * as VAS from 'wmkit/vas';
import { config } from 'wmkit/config';

import * as evaluateWebapi from 'wmkit/biz/evaluateIs-show-webapi';

import GoodsActor from './actor/goods-actor';
import GoodsTabActor from './actor/goods-tab-actor';
import * as webApi from './webapi';

export default class AppStore extends Store {
  constructor(props) {
    super(props);
  }

  bindActor() {
    return [new GoodsActor(), new GoodsTabActor()];
  }

  /**
   * 初始化数据
   */
  init = async ({
    storeId,
    storeCateId,
    cateName,
    queryString,
    showGoBack
  }) => {
    const { code, context } = await webApi.queryGoodsShowType();
    if (code == config.SUCCESS_CODE) {
      //是否展示评价、销量相关信息
      const evaRes = await evaluateWebapi.isShow();
      //增值服务配置信息
      this._initVAS();
      // goodsShowType(0:sku列表,1:spu列表)  imageShowType(0:小图,1:大图)
      const { goodsShowType, imageShowType } = context;
      let params = { storeId };
      if (storeCateId) {
        params['selectedCate'] = { storeCateId: [storeCateId], cateName };
      }
      if (queryString) {
        params['queryString'] = queryString;
      }

      this.dispatch('goods-list:showGoBack', showGoBack);

      this.transaction(() => {
        this.dispatch('goodsActor:changeGoodsShowType', goodsShowType); // sku/spu视图模式
        this.dispatch('goodsActor:changeImageShowType', imageShowType == 0); // 小图/大图模式
        this.dispatch('goods-list:searchParams', fromJS(params));
        this.dispatch('goods-list:initialEnd');
        this.dispatch('goodsActor:isShow', evaRes);
      });
    }


  };

  /**
   * 增值服务信息
   */
  _initVAS = async () => {
    // 企业购业务-开关|配置信息
    this.dispatch('goods-list:iep-info', fromJS(await VAS.fetchIepInfo()));
    this.dispatch('goods-list:setIepSwitch', await VAS.checkIepAuth());
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
  setCateId = (storeCateId, cateName) => {
    msg.emit('purchaseNum:refresh');
    this.dispatch(
      'goods-list:searchParams',
      fromJS({
        selectedCate: {
          storeCateId: [storeCateId],
          cateName
        },
        queryString: ''
      })
    );
    // 设置筛选项状态为待重绘
    this.dispatch('goods-list:drawFilter', true);
    this.closeShade();
  };

  /**
   * 设置排序
   */
  setSort = (type) => {
    msg.emit('purchaseNum:refresh');
    let newType = type;
    let newSort = '';
    const sortType = this.state().get('sortType');

    // 是否切换排序类型？
    if (newType !== sortType.get('type')) {
      if (newType === 'default') {
        newSort = '';
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
   * 切换批发类型-规格选择框显示与否
   */
  changeWholesaleVisible = (value) => {
    this.dispatch('goodsActor:changeWholesaleVisible', value);
  };

  /**
   * 切换零售类型-规格选择框显示与否
   */
  changeRetailVisible = (value) => {
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
}
