/**
 * Created by chenpeng on 2017/7/19.
 */
import { QL } from 'plume2';

/**
 * 订单可用操作按钮DQL
 * @type {plume2.QueryLang}
 */
export const operationsQL = QL('operationsQL', [
  ['orders', '$index'],
  order => {
    let orderButtons = {
      available: [],
      id: ''
    };

    if (order) {
      const flow = order.getIn(['tradeState', 'flowState']);
      const pay = order.getIn(['tradeState', 'payState']);

      //取消订单
      const cancelButtons = [['INIT', 'NOT_PAID'], ['AUDIT', 'NOT_PAID']];
      //付款
      const payButtons = [
        ['AUDIT', 'NOT_PAID'],
        ['DELIVERED_PART', 'NOT_PAID'],
        ['DELIVERED', 'NOT_PAID'],
        ['CONFIRMED', 'NOT_PAID']
      ];
      //确认收货
      const confirmButtons = [
        ['DELIVERED', 'NOT_PAID'],
        ['DELIVERED', 'PAID'],
        ['DELIVERED', 'UNCONFIRMED']
      ];
      //退货退款
      const canReturnFlag = order.get('canReturnFlag');

      let availables = Array();
      payButtons.filter(button => _calc(button)(flow, pay)).length > 0
        ? availables.push('去付款')
        : null;
      confirmButtons.filter(button => _calc(button)(flow, pay)).length > 0
        ? availables.push('确认收货')
        : null;
      cancelButtons.filter(button => _calc(button)(flow, pay)).length > 0
        ? availables.push('取消订单')
        : null;

      canReturnFlag ? availables.push('退货退款') : null;
      orderButtons['available'] = availables;
      orderButtons['id'] = order.get('id');
    }
    return orderButtons;
  }
]);

/**
 * 计算订单有效按钮
 */
const _calc = button => {
  return function(flow, pay) {
    return button[0] === flow && button[1] === pay;
  };
};
