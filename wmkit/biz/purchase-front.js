/**
 * 未登录时,对购物车的操作
 */
import AsyncStorage from '@react-native-community/async-storage';
import Fetch from 'wmkit/fetch';
import { msg } from 'plume2';
import { config } from 'wmkit/config';
import { cache } from 'wmkit/cache';
import { Const } from 'wmkit/const';

/**
 * sku追加到前端购物车缓存(非幂等)
 *   目前商品详情采用此方式
 * @author bail
 * @param goodsInfoId skuId
 * @param num sku数量
 * @returns {boolean} 是否成功加入前端购物车缓存
 */
const postPurchase = async (goodsInfoId, goodsNum) => {
  try {
    // 1.查询商品是否已经在购物车缓存中
    const purStr = await AsyncStorage.getItem(cache.PURCHASE_CACHE);
    let purArr = new Array();
    if (purStr) {
      purArr = JSON.parse(purStr);
      const skuIndex = purArr.findIndex(
        (sku) => sku.goodsInfoId == goodsInfoId
      );
      if (skuIndex > -1) {
        // 1.1.若已经存在缓存中,则[累加]数量
        purArr[skuIndex].goodsNum = purArr[skuIndex].goodsNum + goodsNum;
        await AsyncStorage.setItem(cache.PURCHASE_CACHE, JSON.stringify(purArr));
        return true;
      }
    }
    // 1.2.若不在,则加入缓存中
    await addInPurchase(purArr, goodsInfoId, goodsNum);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * 加入前端购物车缓存(幂等)
 *   目前商品列表采用此方式
 * @author bail
 * @param goodsInfoId skuId
 * @param num 追加的sku数量
 */
const putPurchase = async (goodsInfoId, goodsNum) => {
  try {
    // 1.查询商品是否已经在购物车缓存中
    const purStr = await AsyncStorage.getItem(cache.PURCHASE_CACHE);
    let purArr = new Array();
    if (purStr) {
      purArr = JSON.parse(purStr);
      const skuIndex = purArr.findIndex(
        (sku) => sku.goodsInfoId == goodsInfoId
      );
      if (skuIndex > -1) {
        // 1.1.若已经存在缓存中,则[替换]数量
        purArr[skuIndex].goodsNum = goodsNum;
        await AsyncStorage.setItem(cache.PURCHASE_CACHE, JSON.stringify(purArr));
        return true;
      }
    }
    // 1.2.若不在,则加入缓存中
    await addInPurchase(purArr, goodsInfoId, goodsNum);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * 加到购物车缓存中,并验证购物车数量限制
 * @author bail
 * @param purArr 购物车缓存
 * @param goodsInfoId skuId
 * @param goodsNum 商品数量
 */
const addInPurchase = async (purArr, goodsInfoId, goodsNum) => {
  if (purArr.length >= Const.PURCHASE_MAX_SIZE) {
    // 验证是否超过购物车限制数量
    msg.emit('app:tip', '购物车容量达到100种上限！');
  } else {
    purArr.unshift({ goodsInfoId, goodsNum }); // 插入到第一个(时间倒序排列)
    await AsyncStorage.setItem(cache.PURCHASE_CACHE, JSON.stringify(purArr));
  }
};

/**
 * 从购物车缓存中删除信息, 同时删除该商品选择的营销活动信息
 * @author bail
 * @param goodsInfoIds skuIdList
 */
const delPurchase = async (goodsInfoIds) => {
  try {
    if (goodsInfoIds && goodsInfoIds.length > 0) {
      let purArr = JSON.parse(await AsyncStorage.getItem(cache.PURCHASE_CACHE));
      if (purArr) {
        // 过滤出 待删除ids中不存在的购物车信息
        purArr = purArr.filter(
          (sku) => goodsInfoIds.findIndex((id) => sku.goodsInfoId == id) == -1
        );
        await AsyncStorage.setItem(cache.PURCHASE_CACHE, JSON.stringify(purArr));
      }

      let marArr = JSON.parse(await AsyncStorage.getItem(cache.SKU_MARKETING_CACHE));
      if (marArr) {
        // 过滤出 待删除ids中不存在的商品营销信息
        marArr = marArr.filter(
          (sku) => goodsInfoIds.findIndex((id) => sku.goodsInfoId == id) == -1
        );
        await AsyncStorage.setItem(cache.SKU_MARKETING_CACHE, JSON.stringify(marArr));
      }
    }
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * 未登录时,设置sku 参加的营销活动
 * @param goodsInfoId skuId
 * @param marketingId 营销活动id(满减/满折/满赠)
 */
const putSkuMarketingCache = async (goodsInfoId, marketingId) => {
  try {
    // 未登录时,在前端存储,用户针对sku选择的营销活动信息
    let skuMarketingArr = new Array();
    const markCache = await AsyncStorage.getItem(cache.SKU_MARKETING_CACHE);
    if (markCache) {
      skuMarketingArr = JSON.parse(markCache);
    }
    const marIndex = skuMarketingArr.findIndex(
      (mar) => mar.goodsInfoId == goodsInfoId
    );
    if (marIndex > -1) {
      skuMarketingArr[marIndex] = { goodsInfoId, marketingId };
    } else {
      skuMarketingArr.push({ goodsInfoId, marketingId });
    }
    await AsyncStorage.setItem(
      cache.SKU_MARKETING_CACHE,
      JSON.stringify(skuMarketingArr)
    );
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * 登陆成功后,合并登录前与登陆后的购物车
 */
const mergePurchase = async (callBack) => {
  // 合并登录前/后的购物车
  const list = JSON.parse(await AsyncStorage.getItem(cache.PURCHASE_CACHE));
  if (list && list.length > 0) {
    const res = await Fetch('/site/mergePurchase', {
      method: 'POST',
      body: JSON.stringify({purchaseMergeDTOList: list})
    });
    if (res.code === config.SUCCESS_CODE) {
      // 清空登录前购物车信息
      await AsyncStorage.removeItem(cache.PURCHASE_CACHE);
      await AsyncStorage.removeItem(cache.SKU_MARKETING_CACHE);
    } else {
      msg.emit('app:tip', res.message);
    }
  }

  // 更新底部购物车数量
  msg.emit('purchaseNum:refresh');

  // 登陆弹框-登陆成功后的回调
  if(callBack){
    callBack();
  }
};

export { postPurchase, putPurchase, delPurchase, putSkuMarketingCache, mergePurchase };
