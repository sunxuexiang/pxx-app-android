import { QL } from 'plume2';
import { _, Const } from 'wmkit';

/**
 * 订单可用操作按钮DQL
 * @type {plume2.QueryLang}
 */
export const operationsQL = QL('operationsQL', [
  'detail',
  (order) => {
    let orderButtons = {
      available: [],
      id: ''
    };

    if (order) {
      const flow = order.getIn(['tradeState', 'flowState']);
      const pay = order.getIn(['tradeState', 'payState']);
      const deliverStatus = order.getIn(['tradeState', 'deliverStatus']);
      //配送方式
      const deliverWay = order.get('deliverWay');

      //取消订单
      const cancelButtons = [
        ['INIT', 'NOT_PAID'],
        ['AUDIT', 'NOT_PAID'],
        ['GROUPON', 'NOT_PAID']
      ];
      //付款
      const payButtons = [
        ['AUDIT', 'NOT_PAID'],
        ['DELIVERED_PART', 'NOT_PAID'],
        ['DELIVERED', 'NOT_PAID'],
        ['CONFIRMED', 'NOT_PAID'],
        ['GROUPON', 'NOT_PAID']
      ];
      //确认收货
      const confirmButtons = [
        ['DELIVERED', 'NOT_PAID'],
        ['DELIVERED', 'PAID'],
        ['DELIVERED', 'UNCONFIRMED']
      ];
      //待支付定金
      const presaleDepositButtons = [['WAIT_PAY_EARNEST', 'NOT_PAID']];
      //待支付尾款
      const presaleBalanceButtons = [
        ['WAIT_PAY_TAIL', 'PAID_EARNEST'],
        ['AUDIT', 'PAID_EARNEST']
      ];

      //再次购买
      const againBuy = [
        ['COMPLETED', 'PAID'],
        ['INIT', 'NOT_PAID'],
        ['AUDIT', 'NOT_PAID'],
        ['DELIVERED', 'PAID']
      ];

      //已作废
      const recoveryBuy = [
        ['VOID', 'PAID'],
        ['VOID', 'NOT_PAID'],
      ];

      //退货退款
      let canReturnFlag = order.get('canReturnFlag');

      if (flow == 'GROUPON' || deliverWay == 3) {
        // 待成团单，不展示退货退款
        // 自提订单，不展示退货退款
        canReturnFlag = false;
      }

      let availables = Array();
      payButtons.filter((button) => _calc(button)(flow, pay)).length > 0
        ? availables.push('去付款')
        : null;

      presaleDepositButtons.filter((button) => _calc(button)(flow, pay))
        .length > 0
        ? availables.push('支付定金')
        : null;
      presaleBalanceButtons.filter((button) => _calc(button)(flow, pay))
        .length > 0
        ? availables.push('支付尾款')
        : null;
        let confirmGoods = confirmButtons.filter((button) => _calc(button)(flow, pay)).length > 0;
        if (
          confirmGoods ||
          (deliverWay == 3 && flow == 'TOPICKUP' && pay == 'PAID' && deliverStatus == 'SHIPPED' )
        ) {
          availables.push('确认收货');
        }
      // confirmButtons.filter((button) => _calc(button)(flow, pay)).length > 0
      //   ? availables.push('确认收货')
      //   : null;
      cancelButtons.filter((button) => _calc(button)(flow, pay)).length > 0
        ? availables.push('取消订单')
        : null;
      //  if (againBuy.filter((button) => _calc(button)(flow, pay)).length > 0){
      //    availables.push('再次购买')
      //  }else if ( recoveryBuy.filter((button) => _calc(button)(flow, pay)).length > 0){
      //    availables.push('再次购买')
      //   }
        availables.push('再次购买')
    /*  againBuy.filter((button) => _calc(button)(flow, pay)).length > 0
        ? availables.push('再次购买')
        : null;*/
    /*  recoveryBuy.filter((button) => _calc(button)(flow, pay)).length > 0
        ? availables.push('再次购买')
        : null;*/


      //退货退款同时允许再次购买，小程序搬过来的逻辑
      canReturnFlag ? availables.push('退货退款') : null;
      orderButtons['available'] = availables;
      orderButtons['id'] = order.get('id');
    }
    return orderButtons;
  }
]);

/**
 * 计算订单可用按钮
 */
const _calc = (button) => {
  return function(flow, pay) {
    return button[0] === flow && button[1] === pay;
  };
};

/**
 * 计算积分可抵扣的最大数量
 *  @type {iflux2}
 */
export const OrderMaxPointQL = QL('OrderMaxPointDiscountQL', [
  'goodsTotalPrice', //商品总价
  'discountsTotalPrice', //优惠价格
  'totalDeliveryPrice', //配送费
  'totalPoint', //会员总积分
  'pointConfig',
  'detail',
  (
    goodsTotalPrice,
    discountsTotalPrice,
    totalDeliveryPrice,
    totalPoint,
    pointConfig,
    detail
  ) => {
    let totalPrice = 0;
    const detailItem = detail.toJS();
    if (detailItem.isBookingSaleGoods && detailItem.bookingType == 1) {
      //尾款价格
      const { tradePrice } = detailItem;
      totalPrice = _.sub(
        _.sub(goodsTotalPrice, tradePrice.swellPrice),
        discountsTotalPrice
      );
    } else {
      totalPrice = _.add(
        _.sub(goodsTotalPrice, discountsTotalPrice),
        totalDeliveryPrice
      );
    }

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
    console.log('debug99 usePoint', usePoint);
    //  积分转换单位，即多少积分抵扣1元
    return _.div(usePoint, Const.pointRatio);
  }
]);
