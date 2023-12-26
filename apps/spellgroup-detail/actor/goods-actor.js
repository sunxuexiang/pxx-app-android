import { Actor, Action } from 'plume2';

import { fromJS } from 'immutable';

export default class GoodsActor extends Actor {
  defaultState() {
    return {
      //sku信息
      goodsInfo: {},
      //spu信息
      goods: {},
      //分类拥有的所有属性信息
      goodsProps: [],
      //商品关联的具体属性值信息
      goodsPropDetailRels: [],
      //品牌信息
      goodsBrand: {},
      //商品规格
      goodsSpecs: [],
      //商品规格值
      goodsSpecDetails: [],
      //会员等级价
      goodsLevelPrices: [],
      //会员设价
      goodsCustomerPrices: [],
      //订货量设价
      goodsIntervalPrices: [],
      //spu图片集合(前10张,如果sku没有图片)
      images: [],
      //购买数量
      buyNum: 0,
      //是否收藏
      follow: false,
      //购物车数量
      purchaseCount: 0,
      // 店铺信息
      store: {},
      //是否显示促销底部弹框
      show: false,
      //满赠规则
      levelList: [],
      //赠品情况
      giftList: [],
      //分享弹窗
      showShare: false,
      //图文分享弹窗
      showImgShare: false,
      //在线客服是否开启
      serviceFlag: false,
      //获取h5-url，供分享
      h5Url: '',
      couponShow: false,
      //平台logo，用于图片分享展示
      logo: '',
      //控制视频的显示
      showVideo: false,
      //控制视频的播放
      ifPlay: false,
      storeGoodsTabs: [],
      //选中的tab位置
      tabKey: -1,
      //所有sku信息
      goodsInfos: fromJS([]),
      spuContext: {},
      //批发销售下的规格弹框显示
      showWholeSaleVisible: false,
      //零售销售类型下的规格弹框显示
      showRetailSaleVisible: false,
      storeGoodsTabContent: fromJS([]),
      //sku小程序码地址
      skuQrCode: '',
      isDistributor: true,
      //分享赚弹框显示隐藏
      shareModalVisible: false,
      //分享后是否加入自己店铺
      addSelfShop:true
    };
  }

  /**
   * 商品详情信息
   * @param state
   * @param goodsInfo
   * @param goods
   * @param goodsSpecs
   * @param goodsSpecDetails
   * @param goodsLevelPrices
   * @param goodsCustomerPrices
   * @param goodsIntervalPrices
   * @param images
   * @returns { }
   */
  @Action('goods-detail: info')
  descData(
    state,
    {
      skuId,
      goodsInfos,
      goods,
      goodsPropDetailRels,
      goodsSpecs,
      goodsSpecDetails,
      goodsLevelPrices,
      goodsCustomerPrices,
      goodsIntervalPrices,
      images
    }
  ) {
    //4.根据当前sku信息,标记每个规格项的默认选中值
    if (goodsSpecDetails) {
      goodsInfos = fromJS(goodsInfos).map((goodsInfo) => {
        //遍历该规格项对应的所有规格值
        let specStr = goodsSpecDetails
          .filter((specDetail) =>
            goodsInfo.get('mockSpecDetailIds').contains(specDetail.specDetailId)
          )
          .map((spec) => {
            return spec.detailName;
          })
          .join(' ');
        return goodsInfo.set('specText', specStr);
      });
    }

    let goodsInfo = fromJS(goodsInfos).find((item) => {
      return item.get('goodsInfoId') == skuId;
    });

    let allImgsIm = fromJS([]);

    //批发销售--spu+sku图片拼接
    if (goods.saleType == 0) {
      allImgsIm = fromJS(images).map((i) => i.get('artworkUrl'));
      goodsInfos.filter((i) => i.goodsInfoImg).forEach((v) => {
        if (allImgsIm.size >= 10) {
          //最多显示10张图片
          return;
        }
        allImgsIm = allImgsIm.push(v.goodsInfoImg);
      });
    }

    //零售销售--当前sku+spu的图片,sku图片为空时，取spu的第一张图片作为sku的图片，spu也没有图片时，就是空数组
    if (goods.saleType == 1) {
      allImgsIm = goodsInfo.get('goodsInfoImg')
        ? fromJS([]).push(goodsInfo.get('goodsInfoImg'))
        : images.length > 0
          ? fromJS([]).push(images[0].artworkUrl)
          : fromJS([]).push('');
      if (allImgsIm.size > 0) {
        fromJS(images).map((image) => {
          if (allImgsIm.size >= 10) {
            return;
          }
          allImgsIm = allImgsIm.push(image.get('artworkUrl'));
        });
      }
    }

    return state
      .set(
        'spuContext',
        fromJS({
          skuId,
          goodsInfos,
          goods,
          goodsPropDetailRels,
          goodsSpecs,
          goodsSpecDetails,
          goodsLevelPrices,
          goodsCustomerPrices,
          goodsIntervalPrices,
          images
        })
      )
      .set('goodsInfos', fromJS(goodsInfos))
      .set('goodsInfo', fromJS(goodsInfo))
      .set('goods', fromJS(goods))
      .set('goodsPropDetailRels', fromJS(goodsPropDetailRels))
      .set('goodsSpecs', fromJS(goodsSpecs))
      .set('goodsSpecDetails', fromJS(goodsSpecDetails))
      .set('goodsLevelPrices', fromJS(goodsLevelPrices))
      .set('goodsCustomerPrices', fromJS(goodsCustomerPrices))
      .set('goodsIntervalPrices', fromJS(goodsIntervalPrices))
      .set('images', allImgsIm);
  }

  @Action('goods-detail:props')
  setGoodsProps(state, goodsProps) {
    return state.set('goodsProps', goodsProps);
  }

  @Action('goods-detail:brand')
  setGoodsBrand(state, goodsBrand) {
    return state.set('goodsBrand', goodsBrand);
  }

  /**
   * 改变商品数量
   * @param state
   * @param num
   * @returns { }
   */
  @Action('goods-detail: change: num')
  changeNum(state, num) {
    return state.set('buyNum', num);
  }

  /**
   * 存储收藏状态
   * @param state
   * @param status
   * @returns {Map<string, V>}
   */
  @Action('goods-detail: follow')
  follow(state, status) {
    return state.set('follow', status);
  }

  /**
   * 购物车数量
   * @param state
   * @param count
   * @returns {Map<string, V>}
   */
  @Action('goods-detail: purchase: count')
  purchaseCount(state, count) {
    return state.set('purchaseCount', count);
  }

  /**
   * 弹框的显示或隐藏
   * @param state
   */
  @Action('goods-detail:modal')
  changeModal(state) {
    return state.set('show', !state.get('show'));
  }

  /**
   * 关闭弹框
   * @param state
   */
  @Action('goods-detail:modal:close')
  closeModal(state) {
    return state.set('show', false);
  }

  @Action('goods-detail:marketing')
  marketingDetai(state, gifts) {
    //如有满赠
    if (gifts.levelList.length > 0) {
      return state
        .set('levelList', fromJS(gifts.levelList))
        .set('giftList', fromJS(gifts.giftList));
    }
    return state;
  }
  /**
   * 分享弹框显示隐藏
   * @param state
   */
  @Action('goods-detail:changeShareModal')
  changeShareModal(state) {
    return state.set('showShare', !state.get('showShare'));
  }

  /**
   * 图文分享弹框显示隐藏
   * @param state
   */
  @Action('goods-detail:changeImgShareModal')
  changeImgShareModal(state) {
    return state
      .set('showShare', false)
      .set('showImgShare', !state.get('showImgShare'));
  }

  /**
   * 检查客服是否开启
   */
  @Action('goods-detail:setServiceFlag')
  getList(state, data) {
    const flag = data != null;
    return state.set('serviceFlag', flag);
  }

  /**
   * 获取h5-url，供分享
   */
  @Action('goods-detail:getH5Url')
  getH5Url(state, data) {
    if (data) {
      data = data.endsWith('/') ? data.substring(0, data.length - 1) : data;
    }
    return state.set('h5Url', data);
  }

  /**
   * 领券弹窗的显示隐藏
   */
  @Action('change:changeCoupon')
  changeCoupon(state) {
    return state.set('couponShow', !state.get('couponShow'));
  }

  /**
   * 获取商城logo，用于图片分享
   * @param {} state
   * @param {*} data
   */
  @Action('goods-detail:getLogo')
  getLogo(state, data) {
    return state.set('logo', data.url);
  }

  //开始播放
  @Action('goods-detail:startPlay')
  startPlay(state) {
    return state.set('ifPlay', true).set('showVideo', true);
  }

  //关闭视频
  @Action('goods-detail:closeVideo')
  closeVideo(state) {
    return state.set('showVideo', false);
  }

  //视频暂停
  @Action('goods-detail:pauseVideo')
  pauseVideo(state) {
    return state.set('ifPlay', false);
  }

  //视频播放
  @Action('goods-detail:playVideo')
  playVideo(state) {
    return state.set('ifPlay', true);
  }

  //图文详情tab
  @Action('goods-detail:storeGoodsTabs')
  storeGoodsTabs(state, result) {
    return state.set('storeGoodsTabs', fromJS(result));
  }

  //图文详情tab切换
  @Action('goods-detail:changeTabKey')
  changeTabKey(state, index) {
    return state.set('tabKey', index);
  }

  //初始化店铺信息
  @Action('goodsDetail:initStore')
  initStore(state, { storeId, storeName, storeLogo, companyType, followSum, goodsSum}) {
    return state.set(
      'store',
      fromJS({
        storeId,
        storeName,
        storeLogo,
        companyType,
        followSum,
        goodsSum
      })
    );
  }

  @Action('goods-detail:changeWholesaleVisible')
  changeWholesaleVisible(state, result) {
    return state.set('showWholeSaleVisible', result);
  }

  //零售销售类型规格弹框显示隐藏
  @Action('goods-detail:changeRetailSaleVisible')
  changeRetailSaleVisible(state, value) {
    return state.set('showRetailSaleVisible', value);
  }

  //选择规格重新刷新详情页
  @Action('goods-detail:closeAndRenderRetail')
  closeAndRenderRetail(state, goodsInfo) {
    let newImages = fromJS([]);
    //重置images,使得当前的sku图片是第一张，若无sku图片，将spu的第一张认为是，spu也没有的话，返回空数组
    if (state.get('images').size >= 0) {
      newImages = state
        .get('images')
        .set(
          0,
          goodsInfo.get('goodsInfoImg')
            ? goodsInfo.get('goodsInfoImg')
            : state.get('images').size > 1
              ? state.get('images').get(1)
              : ''
        );
    }
    //第一个为空（sku,spu都没有图片），置为空数组
    return state.set('goodsInfo', goodsInfo).set('images', newImages);
  }

  //图文详情内容
  @Action('goods-detail:storeGoodsTabContent')
  storeGoodsTabContent(state, result) {
    return state.set('storeGoodsTabContent', fromJS(result));
  }

  //sku小程序码
  @Action('goods-detail:skuQrCode')
  skuQrCode(state, result) {
    return state.set('skuQrCode', result);
  }

    @Action('goods-detail:setIsDistributor')
    setIsDistributor(state, result) {
        return state.set('isDistributor', result);
    }

  @Action('goods-detail:toggleShareVisible')
  toggleShareVisible(state) {
    return state.set('shareModalVisible', !state.get('shareModalVisible'));
  }

  @Action('goods-detail:changeAddSelfShop')
  changeAddSelfShop(state,value) {
    return state.set('addSelfShop', value);
  }
}
