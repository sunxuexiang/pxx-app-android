import { QL } from 'plume2';

import { Const } from 'wmkit/const';
import * as _ from 'wmkit/common/util';

/**
 * 计算积分可抵扣的最大数量
 *  @type {iflux2}
 */
export const OrderMaxPointQL = QL('OrderMaxPointDiscountQL', [
  'goodsTotalPrice', //商品总价
  'discountsTotalPrice',//优惠价格
  'totalDeliveryPrice', //配送费
  'totalPoint', //会员总积分
  'pointConfig',
  (goodsTotalPrice,discountsTotalPrice, totalDeliveryPrice, totalPoint, pointConfig) => {
    let totalPrice = _.add(
      _.sub(goodsTotalPrice,discountsTotalPrice),
      totalDeliveryPrice
    );
    // 最大积分
    let maxPoint = 0;

    // 订单金额小于等于0，可用最大积分为0
    if (totalPrice <= 0) {
      return maxPoint;
    }

    // 当前用户的总积分
    let mePoint = totalPoint;
    //  积分转换单位，即多少积分抵扣1元
    let pointWorth = Const.pointRatio;
    //  剔除包装费的订单金额
    let orderPrice = _.sub(totalPrice, totalDeliveryPrice);
    let limitPercent = _.div(pointConfig.get('maxDeductionRate'), 100);
    //  积分使用最高限额
    let limitPrice = _.mul(orderPrice, limitPercent);

    // 如果积分价值设置了，则计算当前积分可以抵扣多少金额
    if (pointWorth != null) {
      // 当前订单值多少积分，比如订单金额为10元，10积分=1元，则buyPoint = 100积分
      let buyPoint = Math.floor(_.mul(limitPrice, Const.pointRatio));
      // 比较二方积分，以最少的为准
      if (buyPoint > mePoint) {
        maxPoint = mePoint;
      } else {
        maxPoint = buyPoint;
      }
    }
    return maxPoint;
  }
]);

/**
 * 计算积分可抵扣的最大金额
 * @type {iflux2}
 */
export const OrderMaxPointDiscountQL = QL('OrderMaxPointDiscountQL', [
  OrderMaxPointQL,
  (maxPoint) => {
    // 积分最多可抵扣金额
    let maxPointDiscount = 0;
    //  积分转换单位，即多少积分抵扣1元
    let pointWorth = Const.pointRatio;

    // 如果积分价值设置了，则计算当前积分可以抵扣多少金额
    if (pointWorth != null) {
      maxPointDiscount = _.div(maxPoint, pointWorth);
    }

    return maxPointDiscount;
  }
]);

/**
 * 计算积分抵扣的金额
 * @type {iflux2}
 */
export const OrderUsePointDiscountQL = QL('OrderUsePointDiscountQL', [
  'usePoint',
  (usePoint) => {
    //  积分转换单位，即多少积分抵扣1元
    return _.div(usePoint, Const.pointRatio);
  }
]);
