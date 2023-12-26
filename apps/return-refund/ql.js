import { QL } from 'plume2';
import * as _ from 'wmkit/common/util';

/**
 * 计算全选状态
 * @type {plume2.QueryLang}
 */
export const checkedAllQL = QL('checkedAllQL', [
  'skus',
  (skus) => {
    return skus && skus.count() > 0
      ? skus.every((sku) => sku.get('skuChecked'))
      : false;
  }
]);

/**
 * 获取全部选中sku的价格，如果是退款申请，直接取订单应付金额
 * 1.选中
 * 2.可退数量 > 0
 * 3.价格*可退数量
 * 4.累加
 * @type {plume2.QueryLang}
 */
export const checkedAllPriceQL = QL('checkedAllPriceQL', [
  'skus',
  'isReturn',
  'totalPrice',
  'tradePoints',
  (skus, isReturn, totalPrice, tradePoints) => {
    if (isReturn) {
      const price = skus
          .filter((sku) => sku.get('skuChecked'))
          .map((sku) => {
            if (sku.get('num') < sku.get('canReturnNum')) {
              //小于可退数量,直接单价乘以数量
              return _.mul(sku.get('price'), sku.get('num'));
            } else {
              //大于等于可退数量 , 使用分摊小计金额 - 已退金额(单价*(购买数量-可退数量))
              return _.sub(
                sku.get('splitPrice'),
                _.mul(
                  sku.get('price'),
                  _.sub(sku.get('skuBuyNum'), sku.get('canReturnNum'))
                )
              );
            }
          })
          .reduce((one, two) => _.add(one, two)) || 0;
      const points = skus
          .filter((sku) => sku.get('skuChecked'))
          .map((sku) => {
            if (sku.get('num') < sku.get('canReturnNum')) {
              //小于可退数量,直接单价乘以数量
              return _.mul(sku.get('skuPoint'), sku.get('num'));
            } else {
              //大于等于可退数量 , 使用分摊小计金额 - 已退金额(单价*(购买数量-可退数量))
              return _.sub(
                sku.get('points') || 0,
                Math.floor(_.mul(
                  sku.get('skuPoint'),
                  _.sub(sku.get('skuBuyNum'), sku.get('canReturnNum'))
                ))
              );

            }
          })
          .reduce((one, two) => _.add(one, two)) || 0;
      return {price, points};
    } else {
      return {price: totalPrice, points: tradePoints};
    }
  }
]);

/**
 * 计算可退数量
 */
export const returnSkuNumDQL = QL('returnSkuNumDQL', [
  ['skus', '$skuIndex'],
  (sku) => {
    if (sku) {
      return sku.get('canReturnNum');
    }
    return 0;
  }
]);

/**
 * 计算当前是否有选中的sku,
 * 并返回是否禁用"下一步"按钮
 * @type {plume2.QueryLang}
 */
export const checkedAnyQL = QL('checkedAnyQL', [
  'skus',
  (skus) => {
    const goods = skus.filter((sku) => sku.get('skuChecked'));
    return !(
      goods.count() > 0 &&
      goods.every(
        (sku) => sku.get('num') > 0 && sku.get('num') <= sku.get('canReturnNum')
      )
    );
  }
]);

/**
 * sku选中状态
 * @type {plume2.QueryLang}
 */
export const skuCheckStatusDQL = QL('skuCheckStatusDQL', [
  ['skus', '$skuIndex'],
  (sku) => {
    if (sku) {
      return sku.get('skuChecked');
    }
    return false;
  }
]);

/**
 * 订单备注长度计算
 * @type {plume2.QueryLang}
 */
export const remarkLengthQL = QL('remarkLengthQL', [
  'description',
  (remark) => {
    if (remark && remark.trim()) {
      return remark.length;
    } else {
      return 0;
    }
  }
]);
