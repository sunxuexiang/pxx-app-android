import { Actor, Action } from 'plume2';
import { fromJS } from 'immutable';

export default class SpuActor extends Actor {
  defaultState() {
    return {
      //spu值
      spus: [],
      goodsInfo: {},
      //spu图片集合(前10张,如果sku没有图片)
      images: [],
      //所有积分商品信息
      pointsGoodsList: fromJS([]),
      // 企业购业务信息
      iepDetail: fromJS({}),
      //零售销售类型下的规格弹框显示
      showRetailSaleVisible: false,
      spuContext: {},
      //spu信息
      goods: {},
      //商品规格
      goodsSpecs: [],
      goodsInfoId: [], //选中商品的id
      // 企业购服务开关
      iepSwitch: false
    };
  }

  @Action('purchaseOrder: spus')
  spus(state, spus) {
    return state.set('spus', fromJS(spus));
  }

  //零售销售类型规格弹框显示隐藏
  @Action('spu:changeRetailSaleVisible')
  changeRetailSaleVisible(state, value) {
    return state.set('showRetailSaleVisible', value);
  }

  //选择规格重新刷新详情页
  @Action('spu:closeAndRenderRetail')
  closeAndRenderRetail(state, { goodsInfo, pointsGoods }) {
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
    return state
      .set('goodsInfo', goodsInfo)
      .set('images', newImages)
      .set('pointsGoods', pointsGoods);
  }
  /**
   * 企业购信息
   * @param state
   * @param context
   * @returns {any}
   */
  @Action('goods-list:iep-info')
  setIepInfo(state, context) {
    return state.set('iepDetail', context);
  }

  @Action('goods-list:setIepSwitch')
  setIepSwitch(state, iepSwitch) {
    return state.set('iepSwitch', iepSwitch);
  }

  /**
   *
   * @param {*} state
   * @param {*} goodsInfoId
   */
  @Action('spu:goodsInfoId')
  setGoodsInfoId(state, goodsInfoId) {
    return state.set('goodsInfoId', goodsInfoId);
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
  @Action('spu:goods-detail')
  descData(
    state,
    {
      skuId,
      pointsGoodsId,
      goodsInfos,
      pointsGoodsList,
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
    let pointsGoods =
      pointsGoodsList &&
      fromJS(pointsGoodsList).find((item) => {
        return item.get('pointsGoodsId') == pointsGoodsId;
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
          pointsGoodsId,
          goodsInfos,
          pointsGoodsList,
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
      .set('pointsGoods', fromJS(pointsGoods))
      .set('pointsGoodsId', pointsGoodsId)
      .set('pointsGoodsList', fromJS(pointsGoodsList))
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
}
