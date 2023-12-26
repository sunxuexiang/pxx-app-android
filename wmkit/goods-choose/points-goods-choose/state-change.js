import { Map, fromJS, List } from 'immutable';
import { cache } from 'wmkit/cache';
import * as WMkit from 'wmkit/kit';
import { config } from 'wmkit/config';

import * as webapi from './webapi';
import { msg } from 'plume2';
import AsyncStorage from '@react-native-community/async-storage';

/**
 * 将数据转换成immutable对象
 * 将扁平的规格信息组装成层级结构
 * 根据当前sku设置规格项的默认选中值
 */
export const createImmutableData = ({
  skuId,
  pointsGoodsId,
  goodsInfos,
  pointsGoodsList,
  goods,
  goodsSpecs,
  goodsSpecDetails,
  images
}) => {
  //1.获取当前sku标识
  const goodsInfoId = skuId;
  const goodsIm = fromJS(goods);

  //2.初始化购买数量,并获取当前sku详情
  let goodsInfo = fromJS({});
  let goodsInfosIm = fromJS(goodsInfos);
  goodsInfosIm = goodsInfosIm.map((single) => {
    single = single.set(
      'num',
      returnStockFlag(single.get('stock'), single.get('count')) ? 0 : 1
    ); //初始化购买数量为1
    if (goodsInfoId === single.get('goodsInfoId')) {
      goodsInfo = single;
    }
    return single;
  });
  let pointsGoods = fromJS({});
  let pointsGoodsListIm = fromJS(pointsGoodsList);
  pointsGoodsListIm = pointsGoodsListIm.map((single) => {
    single = single.set('num', returnStockFlag(single.get('stock')) ? 0 : 1); //初始化购买数量为1
    if (pointsGoodsId == single.get('pointsGoodsId')) {
      pointsGoods = single;
    }
    return single;
  });
  //3.规格项与规格值详情匹配-1对多的结构
  let goodsSpecsIm = fromJS(goodsSpecs);
  let goodsSpecDetailsIm = fromJS(goodsSpecDetails);
  if (goodsSpecDetailsIm && goodsSpecDetailsIm.size > 0) {
    //规格值存在,才进行封装
    goodsSpecsIm = goodsSpecsIm.map((spe) => {
      return spe.set(
        'specDetails',
        goodsSpecDetailsIm.filter((det) => {
          return spe.get('specId') === det.get('specId');
        })
      );
    });

    //4.根据当前sku信息,标记每个规格项的默认选中值
    goodsSpecsIm = goodsSpecsIm.map((spe) => {
      //遍历该规格项对应的所有规格值
      spe.get('specDetails').forEach((det) => {
        goodsInfo.get('mockSpecDetailIds').forEach((mockSpeDet) => {
          //找出当前sku对应spu每个规格项的规格值-(记录默认值)
          if (mockSpeDet === det.get('specDetailId')) {
            spe = spe.set('defaultVal', mockSpeDet);
            return;
          }
        });
      });
      return spe;
    });
  }

  //5.封装成选中spu
  const spuIm = {
    goodsInfo: goodsInfo,
    pointsGoods: pointsGoods,
    goodsInfos: goodsInfosIm,
    pointsGoodsList: pointsGoodsListIm,
    goods: goodsIm,
    goodsSpecs: goodsSpecsIm,
    goodsSpecDetails: goodsSpecDetailsIm,
    images
  };

  return spuIm;
};

/**
 * 计算是否缺货
 * @private
 */
export const returnStockFlag = (stock) => {
  //认定缺货的状态 >>> 库存小于等于0
  if (isNaN(stock)) {
    return true;
  }
  return stock <= 0;
};

/**
 * 计算并赋值新的规格项列表信息(主要是计算每个规格值是否灰化不可点击, 以及计算得出当前的sku)
 * @returns {any}
 */
export const calculateSpeInfo = ({
  goodsInfo,
  pointsGoods,
  goodsInfoCache = Map(),
  goodsInfos,
  pointsGoodsList,
  goodsSpecs,
  images
}) => {
  let defaultValArr = List(); //临时存储每个规格项默认选中值

  //1.遍历spu所有规格项
  if (goodsSpecs && goodsSpecs.size > 0) {
    goodsSpecs = goodsSpecs.map((spe) => {
      let defaultVal = spe.get('defaultVal');
      defaultValArr = defaultValArr.push(defaultVal);

      /**以下是为了提高用户体验,让用户在当前选中的规格值情况下,灰化对应的不可点击的规格值*/
      //2.遍历当前规格项的所有规格值,找出需要灰化的规格值
      spe = spe.set(
        'specDetails',
        spe.get('specDetails').map((sdet) => {
          sdet = sdet.set('disabled', true); //默认灰化
          let leftList = goodsInfos; //匹配规格项值后剩余的sku,通过判断此List数量来决定是否灰化该规格值
          let checkedVal;

          //3.遍历所有规格项,拿当前需要判断灰化的规格值与其他规格项的选中规格值进行搭配-->筛选出剩余sku
          goodsSpecs.forEach((spec) => {
            if (spec.get('specId') === spe.get('specId')) {
              checkedVal = sdet.get('specDetailId'); //当前需要判断是否灰化的规格值
            } else {
              checkedVal = spec.get('defaultVal'); //有可能不存在:null(即取消选中规格值的时候)
            }

            //4.筛选出当前规格项每个规格值 与 其他规格项的默认规格值 匹配的sku们
            if (checkedVal) {
              //如果存在选中值,才进行筛选,若不存在(即该规格项未选中任意规格值),则不筛选
              leftList = leftList.filter((good) => {
                let filterFlag = false;
                good.get('mockSpecDetailIds').forEach((goodSpeDet) => {
                  if (checkedVal === goodSpeDet) {
                    //规格项相同,规格值相同
                    filterFlag = true;
                    return;
                  }
                });
                return filterFlag;
              });
            }
          });

          //5.若能够筛选出sku,则说明该规格值能够切换,则去除灰化
          if (leftList && leftList.size > 0) {
            sdet = sdet.set('disabled', false); //去除灰化
          }
          return sdet;
        })
      );
      return spe;
    });
  }

  //6.若匹配所有规格值后,只剩余1个sku,则得到准确的需要展示的sku信息,若大于1,则说明用户未选中所有规格项
  //  !info.get('mockSpecDetailIds')是为了照顾无规格的商品
  const leftSkuList = goodsInfos.filter(
    (info) =>
      !info.get('mockSpecDetailIds') ||
      info.get('mockSpecDetailIds').every((dId) => defaultValArr.contains(dId))
  );
  if (leftSkuList && leftSkuList.size === 1) {
    goodsInfo = leftSkuList.get(0);
    pointsGoods = pointsGoodsList
      .filter((info) => info.get('goodsInfoId') == goodsInfo.get('goodsInfoId'))
      .get(0);
    //获取sku,并设置显示的图片
    if (!goodsInfo.get('goodsInfoImg') && images && images.length) {
      goodsInfoCache = goodsInfo.set('goodsInfoImg', images[0].artworkUrl);
    } else {
      goodsInfoCache = goodsInfo;
    }
  } else {
    goodsInfo = Map();
    pointsGoods = Map();
  }

  return { goodsSpecs, goodsInfo, goodsInfoCache, pointsGoods };
};

/**
 * 改变前几个规格项的规格值
 * @param specDetailId
 * @param index
 */
export const changeSpecDetail = (chosenSpu, specDetailId, index) => {
  let { goodsSpecs } = chosenSpu;
  chosenSpu.goodsSpecs = goodsSpecs.set(
    index,
    goodsSpecs.get(index).set('defaultVal', specDetailId)
  ); //更改第index个规格项的选中值
  return { ...calculateSpeInfo(chosenSpu) };
};

/**
 * 修改某个sku购买数量
 * @param chosenSpu
 * @param {any} num
 * @param {any} pointsGoodsId
 * @returns {any}
 */
export const changeNum = (chosenSpu, { num, pointsGoodsId }) => {
  //1.修改单个积分商品的购买数量
  let pointsGoods = chosenSpu.pointsGoods;
  pointsGoods = pointsGoods.set('num', num); //修改购买数量

  //2.之前准备购买的所有sku个数信息(sku标识,个数),用于切换回相同规格的时候能够回显采购数量
  let pointsGoodsList = chosenSpu.pointsGoodsList;
  pointsGoodsList = pointsGoodsList.map((info) => {
    if (info.get('pointsGoodsId') == pointsGoodsId) {
      info = info.set('num', num); //若购买数量大于0,则修改购买数量,以及修改价格
    }
    return info;
  });

  return { pointsGoods, pointsGoodsList };
};

/**
 * 立即兑换
 * @param chosenSpu
 * @returns {Promise<any>}
 */
export const exchange = async (chosenSpu) => {
  let buyGoodsInfo = chosenSpu.pointsGoods;

  if (buyGoodsInfo) {
    let pointsGoodsId = buyGoodsInfo.get('pointsGoodsId');
    const params = {
      pointsGoodsId: pointsGoodsId,
      num: buyGoodsInfo.get('num')
    };
    if (WMkit.isLoginOrNotOpen()) {
      const { code, message } = await webapi.exchange(params);
      if (code == config.SUCCESS_CODE) {
        await AsyncStorage.removeItem(cache.ORDER_CONFIRM);
        msg.emit('router: goToNext', {
          routeName: 'PointsOrderConfirm',
          params : params
        });
      } else {
        msg.emit('app:tip', message);
      }
    }
  } else {
    msg.emit('app:tip', '请先选择采购商品！');
  }
};
