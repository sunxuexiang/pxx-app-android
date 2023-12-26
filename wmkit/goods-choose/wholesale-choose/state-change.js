import { fromJS, List } from 'immutable';
import { config } from 'wmkit/config';
import * as _ from 'wmkit/common/util';
import * as WMkit from 'wmkit/kit';
import * as webapi from './webapi';
import { postPurchase } from 'wmkit/biz/purchase-front';
import { msg } from 'plume2';
import AsyncStorage from '@react-native-community/async-storage';
import { cache } from '@/wmkit';

/**
 * 将数据转换成immutable对象
 * 将扁平的规格信息组装成层级结构
 * 根据当前sku设置规格项的默认选中值
 */
export const createImmutableData = ({
  skuId,
  goodsInfos,
  goods,
  goodsSpecs,
  goodsSpecDetails,
  goodsIntervalPrices,
  images
}) => {
  //1.获取当前sku标识
  const goodsInfoId = skuId;
  const goodsIm = fromJS(goods);
  const goodsIntervalPricesIm = fromJS(goodsIntervalPrices);

  //2.获取当前sku详情
  let goodsInfosIm = fromJS(goodsInfos);
  const goodsInfo = goodsInfosIm
    .find((single) => goodsInfoId === single.get('goodsInfoId'))
    .set('num', 0); //初始化购买数量

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

  //5.spu图片
  let allImgsIm = fromJS(images).map((i) => i.get('artworkUrl'));

  //6.最低,最高的sku价格;; 划线价;; 无规格时价格与缺货状态
  const { minPrice, maxPrice } = _getMinMaxPrice(goodsIm, goodsInfosIm);
  const lineShowPrice = _originPriceInfo(
    goodsIm.get('linePrice'),
    goodsInfosIm
  );
  const { noSpecPrices, noSpecStockFlag } = _getNoSpecInfo(
    goodsSpecDetails,
    goodsInfo,
    goodsIm,
    goodsIntervalPricesIm
  );

  //7.封装成选中spu
  const spuIm = {
    minPrice,
    maxPrice,
    lineShowPrice,
    noSpecPrices,
    noSpecStockFlag,
    goodsInfo: goodsInfo,
    goodsInfos: goodsInfosIm,
    goods: goodsIm,
    goodsSpecs: goodsSpecsIm,
    goodsSpecDetails: goodsSpecDetailsIm,
    images: allImgsIm,
    goodsIntervalPrices: goodsIntervalPricesIm,
    //之前准备购买的sku个数信息(sku标识,个数)
    savedBuyGoodsInfos: List([])
  };

  return spuIm;
};

/**
 * 获取最低,最高价
 * @param goods
 * @param goodsInfos
 * @private
 */
const _getMinMaxPrice = (goods, goodsInfos) => {
  let minPrice = 0;
  let maxPrice = 0;
  if (goods.get('priceType') === 1) {
    //是否有按订货量区间设价
    goodsInfos.forEach((info, index) => {
      if (index === 0) {
        minPrice = info.get('intervalMinPrice');
        maxPrice = info.get('intervalMaxPrice');
      } else {
        minPrice =
          info.get('intervalMinPrice') < minPrice
            ? info.get('intervalMinPrice')
            : minPrice;
        maxPrice =
          info.get('intervalMaxPrice') > maxPrice
            ? info.get('intervalMaxPrice')
            : maxPrice;
      }
    });
  } else {
    goodsInfos.forEach((info, index) => {
      if (info.get('goodsInfoType')===1){
        if (index === 0) {
          minPrice = info.get('specialPrice');
          maxPrice = info.get('specialPrice');
        } else {
          minPrice =
            info.get('specialPrice') < minPrice ? info.get('specialPrice') : minPrice;
          maxPrice =
            info.get('specialPrice') > maxPrice ? info.get('specialPrice') : maxPrice;
        }
      } else {
        if (index === 0) {
          minPrice = info.get('salePrice');
          maxPrice = info.get('salePrice');
        } else {
          minPrice =
            info.get('salePrice') < minPrice ? info.get('salePrice') : minPrice;
          maxPrice =
            info.get('salePrice') > maxPrice ? info.get('salePrice') : maxPrice;
        }
      }

    });
  }
  return { minPrice, maxPrice };
};

/**
 * 获取是否展示划线价,以及划线价
 *   a.若划线价存在,则展示
 *   b.若划线价不存在
 *     b.1.登录前,不展示
 *     b.2.登陆后,展示最高市场价
 * @private
 */
const _originPriceInfo = (linePrice, goodsInfos) => {
  if (linePrice) {
    return linePrice;
  } else {
    /*if (WMkit.isLoginOrNotOpen()) {
      // 已登录时,找出最高的市场价
      let maxMarketPrice = null;
      goodsInfos.forEach((info, index) => {
        if (info.get('goodsInfoType')===1){
          if (index === 0) {
            maxMarketPrice = info.get('salePrice');
          } else {
            maxMarketPrice =
              info.get('salePrice') > maxMarketPrice
                ? info.get('salePrice')
                : maxMarketPrice;
          }
        } else {
          if (index === 0) {
            maxMarketPrice = info.get('marketPrice');
          } else {
            maxMarketPrice =
              info.get('marketPrice') > maxMarketPrice
                ? info.get('marketPrice')
                : maxMarketPrice;
          }
        }

      });
      return maxMarketPrice;
    } else {
      return null;
    }*/
    return null;
  }
};

/**
 * 获取无规格商品的显示价格 以及 缺货状态
 * @param specList
 * @param goodsInfo
 * @param goodsIm
 * @param goodsIntervalPricesIm
 * @private
 */
const _getNoSpecInfo = (
  specList,
  goodsInfo,
  goodsIm,
  goodsIntervalPricesIm
) => {
  // 若无任何规格时,计算单个sku的价格区间,以及是否缺货
  let noSpecPrices = [];
  let noSpecStockFlag = false;
  if (!specList || specList.size === 0) {
    noSpecPrices = _getSinglePriceData(
      goodsIm,
      goodsInfo,
      goodsIntervalPricesIm
    );
    noSpecStockFlag = returnStockFlag(
      goodsInfo.get('stock'),
      goodsInfo.get('count')
    );
  }
  return { noSpecPrices, noSpecStockFlag };
};

/**
 * 计算是否缺货
 * @private
 */
export const returnStockFlag = (stock, minCount) => {
  //认定缺货的状态 >>> 库存小于等于0 或者 最少订货量大于库存(最少订货量量存在的时候)
  if (isNaN(stock) || isNaN(minCount)) {
    return true;
  }
  return stock <= 0 || (minCount ? minCount > stock : false);
};

/**
 * 无任何规格时,计算单独的价格区间
 * @returns {any}
 * @private
 */
const _getSinglePriceData = (goods, goodsInfo, goodsIntervalPrices) => {
  //计算该sku的设价(匹配,排序)
  let prices = fromJS([]);
  if (goods.get('priceType') === 1) {
    //是否有按订货量区间设价
    prices = goodsInfo
      .get('intervalPriceIds')
      .map((pri) => {
        let interPri = goodsIntervalPrices
          .filter((intePri) => {
            return intePri.get('intervalPriceId') === pri;
          })
          .get(0);
        return {
          id: interPri.get('intervalPriceId'),
          price: interPri.get('price'),
          count: interPri.get('count')
        };
      })
      .sortBy((pri) => pri.count);
  } else {
    prices = prices.push({
      id: 0,
      price: goodsInfo.get('salePrice'),
      count: 1
    });
  }
  return prices.toJS();
};

/**
 * 计算并赋值新的规格项列表信息(主要是计算符合前几个规格值的剩余sku信息)
 * @returns {any}
 */
export const calculateSpeInfo = ({
  goodsInfos,
  goods,
  goodsSpecs,
  savedBuyGoodsInfos,
  goodsIntervalPrices
}) => {
  let leftGoodsInfos = goodsInfos; //匹配规格项值后剩余的sku
  let buyGoodsInfos = fromJS([]); //当前准备购买的sku们
  let defaultVal; //临时存储的规格项默认选中值
  let calGoodsSpecs = fromJS([]); //计算后的规格项信息

  //1.遍历spu所有规格项
  if (goodsSpecs && goodsSpecs.size > 0) {
    calGoodsSpecs = goodsSpecs.map((spe, dIndex) => {
      defaultVal = spe.get('defaultVal');
      if (dIndex === goodsSpecs.size - 1) {
        //若是最后一个规格项
        let specDetails = fromJS([]);

        //A2.遍历该规格项对应的所有规格值
        spe.get('specDetails').forEach((det) => {
          leftGoodsInfos.forEach((leftGood) => {
            leftGood.get('mockSpecDetailIds').forEach((moSpeDet) => {
              if (moSpeDet === det.get('specDetailId')) {
                //A3.初始化曾经购买过的数量 以及 购买的金额
                let savedNum = 0;
                let goodsPrices = 0;
                savedBuyGoodsInfos.forEach((savedInfo) => {
                  if (
                    savedInfo.get('goodsInfoId') === leftGood.get('goodsInfoId')
                  ) {
                    savedNum = savedInfo.get('buyCount');
                    goodsPrices = savedInfo.get('price');
                    return;
                  }
                });

                //A4.计算该sku的设价(匹配,排序)
                let prices = fromJS([]);
                //按订货量设价
                if (goods.get('priceType') === 1) {
                  //按订货量设价且不允许独立设价,以spu的阶梯价作为sku阶梯价,过滤出type=0，即以spu设价的阶梯价
                  if (goods.get('allowPriceSet') == 0) {
                    prices = fromJS(goodsIntervalPrices)
                      .filter((price) => price.get('type') == 0)
                      .map((pri) => {
                        return {
                          id: pri.get('intervalPriceId'),
                          price: pri.get('price'),
                          count: pri.get('count')
                        };
                      })
                      .sortBy((pri) => pri.count);
                  } else {
                    //按订货量设价且允许独立设价,以sku的阶梯价为准
                    prices = leftGood
                      ?.get('intervalPriceIds')
                      ?.map((pri) => {
                        let interPri = goodsIntervalPrices.find((intePri) => {
                          return intePri.get('intervalPriceId') === pri;
                        });
                        return {
                          id: interPri.get('intervalPriceId'),
                          price: interPri.get('price'),
                          count: interPri.get('count')
                        };
                      })
                      .sortBy((pri) => pri.count);
                  }
                } else {
                  prices = prices.push({
                    id: 0,
                    price: leftGood.get('goodsInfoType')==1?leftGood.get('specialPrice'):leftGood.get('salePrice'),
                    count: 1
                  });
                }
                let priceTmp = '';
                if (savedNum > 0) {
                  priceTmp = _.addZero(goodsPrices); //购买过的商品,直接以之前算过的单价显示
                } else {
                  priceTmp = prices?.maxBy((price) => price.price).price || 0.0; //未购买过的商品,显示价格数组中的第一个价格
                }

                //A5.为规格值对象赋值更多属性(skuId , 显示价格 , 区间价 , 购买量 , 单位 , 是否收藏...)
                det = det
                  .set('goodsInfoId', leftGood.get('goodsInfoId'))
                  .set('goodsInfoNo',leftGood.get('goodsInfoNo'))
                  .set('price', priceTmp)
                  .set('intervalPrices', prices)
                  .set('num', savedNum)
                  .set('minCount', leftGood.get('count'))
                  .set('maxCount', leftGood.get('maxCount'))
                  .set('stock', leftGood.get('stock'))
                  .set('unit', goods.get('goodsUnit'))
                  .set('marketingLabels', leftGood.get('marketingLabels'))
                  .set('addStep',leftGood.get('addStep'))
                  .set('couponLabels', leftGood.get('couponLabels'))
                  .set('followFlag', leftGood.get('followFlag'));
                specDetails = specDetails.push(det);

                //A6.初始化当前准备购买的sku们
                if (savedNum > 0) {
                  buyGoodsInfos = buyGoodsInfos.push(
                    fromJS({
                      goodsInfoId: leftGood.get('goodsInfoId'),
                      buyCount: savedNum,
                      price: goodsPrices
                    })
                  );
                }
              }
            });
          });
        });

        //A7.过滤掉系统中没有设置响应规格的sku信息
        spe = spe.set('specDetails', specDetails);
      } else {
        //B2.与所有的sku进行遍历比较,筛选出与前几个规格值相同的sku
        leftGoodsInfos = leftGoodsInfos.filter((good) => {
          let filterFlag = false;
          good.get('mockSpecDetailIds').forEach((goodSpeDet) => {
            if (defaultVal === goodSpeDet) {
              //规格项相同,规格值相同
              filterFlag = true;
              return;
            }
          });
          return filterFlag;
        });

        /**以下是为了提高用户体验,让用户在当前选中的规格值情况下,灰化对应的不可点击的规格值*/
        //B3.遍历当前规格项的所有规格值,找出需要灰化的规格值
        spe = spe.set(
          'specDetails',
          spe.get('specDetails').map((sdet) => {
            sdet = sdet.set('disabled', true); //默认灰化
            let leftList = goodsInfos; //匹配规格项值后剩余的sku,通过判断此List数量来决定是否灰化该规格值
            let checkedVal;

            //B4.遍历所有规格项,拿当前需要判断灰化的规格值与其他规格项的选中规格值进行搭配-->筛选出剩余sku
            goodsSpecs.forEach((spec, dInd) => {
              if (dInd < goodsSpecs.size - 1) {
                if (spec.get('specId') === spe.get('specId')) {
                  checkedVal = sdet.get('specDetailId'); //当前需要判断是否灰化的规格值
                } else {
                  checkedVal = spec.get('defaultVal'); //有可能不存在:null(即取消选中规格值的时候)
                }

                //B5.筛选出当前规格项每个规格值 与 其他规格项的默认规格值 匹配的sku们
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
              }
            });

            //B6.若能够筛选出sku,则说明该规格值能够切换,则去除灰化
            if (leftList && leftList.size > 0) {
              sdet = sdet.set('disabled', false); //去除灰化
            }
            return sdet;
          })
        );
      }

      return spe;
    });
  }
  return { calGoodsSpecs: calGoodsSpecs, buyGoodsInfos: buyGoodsInfos };
};

/**
 * 改变前几个规格项的规格值
 * @param chosenSpu
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

export const changeNum = (chosenSpu, { num, price, goodsInfoId }) => {

  //1.当前准备购买的sku信息(sku标识,个数)
  let buyGoodsInfos = chosenSpu.buyGoodsInfos;

  let inFlag = false; //标记之前是不是准备购买(数量大于0)
  let insideIndex = -1; //需要去除元素的下标
  buyGoodsInfos = buyGoodsInfos.map((buyInfo, index) => {
    if (buyInfo.get('goodsInfoId') === goodsInfoId) {
      if (num > 0) {
        buyInfo = buyInfo.set('buyCount', num).set('price', price); //若购买数量大于0,则修改购买数量,以及修改价格
      } else {
        insideIndex = index; //记录需要删除元素的下标
      }
      inFlag = true;
    }
    return buyInfo;
  });
  if (insideIndex !== -1) {
    //若下标存在,则从购买商品中删除该商品
    buyGoodsInfos = buyGoodsInfos.remove(insideIndex);
  }
  if (!inFlag) {
    //如果之前没有购买过,则加入购买队列
    buyGoodsInfos = buyGoodsInfos.push(
      fromJS({ goodsInfoId: goodsInfoId, price: price, buyCount: num })
    );
  }

  //2.之前准备购买的所有sku个数信息(sku标识,个数),用于切换回相同规格的时候能够回显采购数量
  let savedBuyGoodsInfos = chosenSpu.savedBuyGoodsInfos;
  inFlag = false; //标记之前是不是准备购买(数量大于0)
  insideIndex = -1; //需要去除元素的下标
  savedBuyGoodsInfos = savedBuyGoodsInfos.map((buyInfo, index) => {
    if (buyInfo.get('goodsInfoId') === goodsInfoId) {
      if (num > 0) {
        buyInfo = buyInfo.set('buyCount', num).set('price', price); //若购买数量大于0,则修改购买数量,以及修改价格
      } else {
        insideIndex = index; //记录需要删除元素的下标
      }
      inFlag = true;
    }
    return buyInfo;
  });
  if (insideIndex !== -1) {
    //若下标存在,则从购买商品中删除该商品
    savedBuyGoodsInfos = savedBuyGoodsInfos.remove(insideIndex);
  }
  if (!inFlag) {
    //如果之前没有购买过,则加入购买队列
    savedBuyGoodsInfos = savedBuyGoodsInfos.push(
      fromJS({ goodsInfoId: goodsInfoId, price: price, buyCount: num })
    );
  }

  //3.修改计算后规格项的最后一个规格项的购买数量
  let calGoodsSpecs = chosenSpu.calGoodsSpecs;
  calGoodsSpecs = calGoodsSpecs.map((spe, dIndex) => {
    if (dIndex === calGoodsSpecs.size - 1) {
      //需要修改计算后规格项的最后一个规格项信息
      spe = spe.set(
        'specDetails',
        spe.get('specDetails').map((det) => {
          if (det.get('goodsInfoId') === goodsInfoId) {
            det = det.set('num', num).set('price', price); //修改对应sku的购买数量与价格
          }
          return det;
        })
      );
    }
    return spe;
  });

  //4.修改单个商品的购买数量(无规格的情况)
  let goodsInfo = chosenSpu.goodsInfo;
  goodsInfo = goodsInfo.set('num', num).set('price', price); //初始化购买数量

  return {
    buyGoodsInfos,
    savedBuyGoodsInfos,
    calGoodsSpecs,
    goodsInfo
  };
};
//单规格的到货通知
export const saveGoodsLack=async (info,cityCode)=>{
  const wareStr = await AsyncStorage.getItem(cache.MATCH_WARE_STORE);
  let stockRequest=[];
  let  param={
    goodsInfoId:info.get('goodsInfoId'),
    goodsInfoNo:info.get('goodsInfoNo'),
    stockoutNum:info.get('num'),
    cityCode:cityCode,
    wareId:JSON.parse(wareStr).wareId
  }
  stockRequest.push(param);
  let request = {};
  request['stockOutList'] = stockRequest;
  const { code, message } =await webapi.saveGoodsLack(request);
  if (code===config.SUCCESS_CODE){
    msg.emit('app:tip', '通知成功');
  }else {
    msg.emit('app:tip', '通知失败');
  }
}

export const goodsNotificationAll=async (request)=>{
  const { code, message } =await webapi.saveGoodsLack(request);
  if (code===config.SUCCESS_CODE){
    msg.emit('app:tip', '通知成功');
  }else {
    msg.emit('app:tip', '通知失败');
  }
}
/**
 * 加入购物车
 * @param chosenSpu
 * @returns {Promise<any>}
 */
export const purchase = async (chosenSpu) => {
  let buyGoodsInfos = chosenSpu.buyGoodsInfos;
  if (buyGoodsInfos && buyGoodsInfos.size > 0) {
    if (WMkit.isLoginOrNotOpen()) {
      const { code, message } = await webapi.purchase(buyGoodsInfos);
      if (code === config.SUCCESS_CODE) {
        msg.emit('app:tip', '加入成功');
        //更新购物车全局数量
        msg.emit('purchaseNum:refresh');
        return removePurchase(chosenSpu); //清除当前购买单
      } else {
        msg.emit('app:tip', message);
      }
    } else {
      //批量加入
      for (let i = 0; i < buyGoodsInfos.size; i++) {
        await postPurchase(
          buyGoodsInfos.getIn([i, 'goodsInfoId']),
          buyGoodsInfos.getIn([i, 'buyCount'])
        );
      }
      msg.emit('app:tip', '加入成功');
      //更新购物车全局数量
      msg.emit('purchaseNum:refresh');
      return removePurchase(chosenSpu); //清除当前购买单
    }
  } else {
    msg.emit('app:tip', '请先选择采购商品！');
  }
  return null;
};

const removePurchase = (chosenSpu) => {
  //1.将之前购买的内容中去除已经购买的商品
  let buyGoodsInfos = chosenSpu.buyGoodsInfos; //当前已经准备购买的sku信息(sku标识,个数)
  let savedBuyGoodsInfos = chosenSpu.savedBuyGoodsInfos; //之前准备购买的所有sku个数信息(sku标识,个数),用于切换回相同规格的时候能够回显采购数量
  savedBuyGoodsInfos = savedBuyGoodsInfos.filter((savedInfo) => {
    let flag = true;
    buyGoodsInfos.forEach((buyInfo) => {
      if (buyInfo.get('goodsInfoId') === savedInfo.get('goodsInfoId')) {
        flag = false;
      }
    });
    return flag;
  });

  //2.修改计算后规格项的最后一个规格项的商品数量信息
  let calGoodsSpecs = chosenSpu.calGoodsSpecs;
  calGoodsSpecs = calGoodsSpecs.map((spe, dIndex) => {
    if (dIndex === calGoodsSpecs.size - 1) {
      //需要修改计算后规格项的最后一个规格项信息
      spe = spe.set(
        'specDetails',
        spe.get('specDetails').map((det) => {
          return det.set('num', 0); //清空对应sku的购买数量
        })
      );
    }
    return spe;
  });

  //3.修改goodsInfo中的num属性(无任何规格的情况)
  let goodsInfo = chosenSpu.goodsInfo;
  goodsInfo = goodsInfo.set('num', 0);

  return {
    buyGoodsInfos: fromJS([]),
    savedBuyGoodsInfos,
    calGoodsSpecs,
    goodsInfo
  };
};

/**
 * 立即购买
 */
export const purchaseBatchAdd = async (chosenSpu) => {
  let buyGoodsInfo = chosenSpu.goodsInfo;

  if (WMkit.isLoginOrNotOpen()) {
    const { code, message } = await webapi.purchaseSingle(buyGoodsInfo);
  } else {
    msg.emit('loginModal:toggleVisible', false);
  }
};
