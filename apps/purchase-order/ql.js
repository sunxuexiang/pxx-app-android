import { QL } from 'plume2';

import * as _ from 'wmkit/common/util';
import { _calculateGoodsPrice } from './kit';

/**
 * 全部选中ql
 * @type {plume2.QueryLang}
 */
export const checkAllQL = QL('checkAllQL', [
  'checkItemList',
  'edit',
  (checkItemList, edit) => {
    const skuList = checkItemList.filter((sku) => {
      return sku.get('goodsStatus') === 0 || (edit && sku.get('goodsStatus') !== 2);
    });
    return skuList.count() > 0 && skuList.every((sku) => sku.get('checked'));
  }
]);

/**
 * 去下单按钮禁用状态
 * @type {plume2.QueryLang}
 */
export const disableOrderQL = QL('disableOrderQL', [
  'checkItemList',
  (checkItemList) => {
    //有商品
    const checkSkus = checkItemList.filter((sku) => {
      const buyCount = sku.get('buyCount') || 0;
      const stock = sku.get('stock') || 0;
      //缺货状态显示
      return (
        sku.get('checked') && (sku.get('goodsStatus') !== 0)
      );
    });
    return checkSkus.count() > 0;
  }
]);

/**
 * 购物车不符合商品条件提示
 * @type {plume2.QueryLang}
 */
export const disableCountQL = QL('disableCountQL', [
  'skus',
  (skus) => {
    const checkSkus = skus.filter(
      (sku) => sku.get('checked') && sku.get('goodsStatus') !== 2
    );
    return checkSkus.filter((sku) => sku.get('error')).count();
  }
]);

/**
 * 商品总额价格
 * @type {plume2.QueryLang}
 */
export const sumPriceQL = QL('sumPriceQL', [
  'checkItemList',
  'intervalPrices',
  (checkItemList, intervalPrices) => {
    return checkItemList
      .filter((sku) => {
        //缺货状态显示 要么库存为0 要么起订量比库存大
        return sku.get('goodsStatus') === 0 && sku.get('checked');
      })
      .map((sku) =>
        _.mul(sku.get('buyCount'), _calculateGoodsPrice(sku, intervalPrices))
      )
      .reduce((price1, price2) => {
        return _.add(price1, price2).toFixed(2);
      });
  }
]);

/**
 * 统计去下单的数量
 * @type {plume2.QueryLang}
 */
export const countSelectedQL = QL('countSelectedQL', [
  'checkItemList',
  'edit',
  (checkItemList, edit) => {
    return checkItemList
      .filter((sku) => {
        if (edit) {
          return sku.get('checked');
        } else {
          return sku.get('goodsStatus') === 0 && sku.get('checked');
        }
      })
      .count();
  }
]);

/**
 * 统计所有商品数量
 * @type {plume2.QueryLang}
 */
export const countGoodsQL = QL('countGoodsQL', [
  'checkItemList',
  'selectedMarketingGifts',
  'numSkus',
  (checkItemList, selectedMarketingGifts, numSkus) => {
    numSkus = numSkus && numSkus.toJS();
    const goodsNums = checkItemList
      .filter((sku) => {
        return sku.get('goodsStatus') === 0 && sku.get('checked');
      })
      .map((sku) => numSkus[sku.get('goodsInfoId')])
      .reduce((count1, count2) => _.add(count1, count2), 0);

    const giftNums = selectedMarketingGifts ? selectedMarketingGifts
      .map((selectedMarketingGift) => selectedMarketingGift.get('goodsNum'))
      .reduce((count1, count2) => _.add(count1, count2), 0) : 0;

    return goodsNums + giftNums;
  }
]);
