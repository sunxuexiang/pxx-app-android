import { Store, msg } from 'plume2';
import { fromJS } from 'immutable';
import { config } from 'wmkit/config';
import { cache } from 'wmkit/cache';
import * as WMkit from 'wmkit/kit';
import * as VAS from 'wmkit/vas';
import * as webApi from './webapi';
import OneLevelActor from './actor/one-level-actor';
import GoodsTabActor from './actor/goods-tab-actor';
import AsyncStorage from '@react-native-community/async-storage';
import * as evaluateWebapi from 'wmkit/biz/evaluateIs-show-webapi';
import * as webapi from '../search/webapi';

export default class AppStore extends Store {
  bindActor() {
    return [
      new OneLevelActor(),
      new GoodsTabActor(),
    ];
  }

  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
  }

  init = async(cateId) => {
    //加载中
    this.changeLoadingVisible(true);
    // 购物车数量
    this.updatePurchaseCount();
    await webApi.bannerList(cateId).then(res=>{
      if (res.code === config.SUCCESS_CODE) {
        this.dispatch('swiper: bannerList', res.context.bannerAdminVOList);
      }
    });
    const { code, context:cateData } = await webApi.allGoodsRootCate(cateId);
    if (code == config.SUCCESS_CODE) {
      if (cateData && cateData.goodsCateList) {
        this.dispatch('flied: commonChange', {key:'secdCateList',value:fromJS(cateData.goodsCateList)});
        this.dispatch('flied: commonChange', {key:'activitySecondCate',value:cateData.goodsCateList[0].cateId});
        this.dispatch('flied: commonChange', {key:'thirdCateList',value:cateData.goodsCateList[0].goodsCateList});
        this.dispatch('flied: commonChange', {key:'activityThirdCate',value:cateData.goodsCateList[0].goodsCateList[0].cateId});
        // 获取品牌
        this.setThirdCate(cateData.goodsCateList[0].goodsCateList[0].cateId);
      }
    }
    const result = await webApi.queryGoodsShowType();

    if (result.code == config.SUCCESS_CODE) {
      // 查询平台评价开关配置
      this.basicRules();
      const isDistributor = WMkit.isDistributor();
      this.dispatch('goods-list:setIsDistributor', isDistributor);
      // goodsShowType(0:sku列表,1:spu列表)  imageShowType(0:小图,1:大图)
      const { goodsShowType, imageShowType } = result.context;
      let params = {};
      let props = [];
      if (cateId) {
        // params['selectedCate'] = { cateId, cateName };
        props = await this._getProps(cateId);
      }
      // if (queryString) {
      //   params['queryString'] = queryString;
      // }

      // this.dispatch('goods-list:showGoBack', showGoBack);

      //查询是否展示评价相关信息
      const evacontext = await evaluateWebapi.isShow();
      this.transaction(() => {
        this.dispatch('goodsActor:isShow', evacontext);
        this.dispatch('goodsActor:changeGoodsShowType', goodsShowType); // sku/spu视图模式
        this.dispatch('goodsActor:changeImageShowType', false); // 小图/大图模式
        this.dispatch('goods-list:props', fromJS(props));
        this.dispatch('goods-list:searchParams', fromJS(params));
        this.dispatch('goods-list:initialEnd');
        // if (cateName != null && cateName != undefined && cateName != '') {
        //   this.dispatch('goods-list:setCateId', { cateId, cateName });
        // }
      });
    }

    // 增值服务信息
    this._initVAS();
    //加载中
    this.changeLoadingVisible(false);
    //预搜索词
    this._setPrewords();
  }

  _changeIsCateId = (CateId) =>{
    let pre = this.state().get('CateId')
    if(CateId!=pre){
      this.dispatch('change:CateId', CateId);
      this.setThirdCate(CateId)
    }
  }
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

// 切换swipe
_setCurrent = async (current) => {
  this.dispatch('goods-detail: current', current);
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
   * 选中二级类目
   */
  setSecdCate = (secdCateId) => {
    this.dispatch('flied: commonChange', {key:'activitySecondCate',value:secdCateId});

    const secdCateList = this.state().get('secdCateList').toJS();
    let filterSecdCateList = secdCateList.filter(v => {
      return v.cateId == secdCateId;
    });
    this.dispatch('flied: commonChange', {key:'thirdCateList',value:filterSecdCateList[0].goodsCateList});
    this.dispatch('flied: commonChange', {key:'activityThirdCate',value:filterSecdCateList[0].goodsCateList[0].cateId});
  }

  /**
   * 选中三级类目
   */
  setThirdCate = async (thirdCateId) => {
    // 获取品牌
    const { code, context, message } = await webApi.getBrandByCateId(thirdCateId);

    if (code == config.SUCCESS_CODE) {
      this.dispatch('goods-list:initFilter', fromJS(context.goodsBrandVOS));
    } else {
      msg.emit('app:tip', message);
    }
    this.dispatch('flied: commonChange', {key:'activityThirdCate',value:thirdCateId});
    this.dispatch('goods-list:selectedBrandIds', fromJS([]));
  }

  /**
   * 加入购物车
   * @param id
   * @param num
   * @param stock
   */
  purchase = async (id, num, stock) => {
    if (num > stock) {
      msg.emit('app:tip', '库存' + stock);
      return;
    } else {
      const { code, message } = await webApi.purchase(id, num);
      if (code == config.SUCCESS_CODE) {
        msg.emit('app:tip', '加入成功');
        const purchaseCount = await webApi.fetchPurchaseCount();
        let count = 0;
        if (purchaseCount.code == config.SUCCESS_CODE) {
          count = purchaseCount.context;
        }
        this.dispatch('goods-detail: purchase: count', count);
        await AsyncStorage.setItem(cache.PURCHASE_NUM,JSON.stringify({purchaseNum:count}))
      } else {
        msg.emit('app:tip', message);
      }
    }
  };

  /**
   * 更新商品详情中的购物车数量
   */
  updatePurchaseCount = () => {
    if (WMkit.isLoginOrNotOpen()) {
      webApi.fetchPurchaseCount().then((res) => {
        if (res.code === config.SUCCESS_CODE) {
          const purchaseNum = res.context || 0;
          this.dispatch('goods-detail: purchase: count', purchaseNum);
          AsyncStorage.setItem(cache.PURCHASE_NUM,JSON.stringify({purchaseNum}))
        }
      });
    } else {
      AsyncStorage.getItem(cache.PURCHASE_CACHE).then((res) => {
        const purCache = JSON.parse(res) || [];
        this.dispatch('goods-detail: purchase: count', purCache.length);
          AsyncStorage.setItem(cache.PURCHASE_NUM,JSON.stringify({purchaseNum:purCache.length}))
      });
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
    }
  };

  /**
   * 切换批发类型-规格选择框显示与否
   */
  changeWholesaleVisible = (value) => {
    this.updatePurchaseCount();
    this.dispatch('goodsActor:changeWholesaleVisible', value);
  };

  /**
   * 切换零售类型-规格选择框显示与否
   */
  changeRetailVisible = (value) => {
    this.updatePurchaseCount();
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

  //改变加载中状态
  changeLoadingVisible = (status) => {
    this.dispatch('set: loadingVisible', status);
  };
}
