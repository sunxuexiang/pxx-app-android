import { _ } from 'wmkit';
import { fromJS, Map } from 'immutable';

const FLOW_STATE = {
  INIT: '待审核',
  AUDIT: '待发货',
  DELIVERED_PART: '待发货',
  DELIVERED: '待收货',
  CONFIRMED: '已收货',
  COMPLETED: '已完成',
  VOID: '已作废'
};

/**
 * 订单状态
 * @type {{INIT: string; GROUPON: string; AUDIT: string; DELIVERED_PART: string; DELIVERED: string; CONFIRMED: string; COMPLETED: string; VOID: string}}
 */
const flowState = (status, payState) => {
  if (status == 'INIT') {
    return '待审核';
  } else if (status == 'GROUPON') {
    // 是拼团订单 根据支付状态 ? 待支付 : 待发货
    if (payState == 'NOT_PAID') {
      return '待支付';
    } else if (payState == 'UNCONFIRMED') {
      return '待确认';
    } else if (payState == 'PAID') {
      return '待发货';
    }
  } else if (status == 'WAIT_PAY_EARNEST' && payState == 'NOT_PAID') {
    return '待支付定金';
  } else if (
    (status == 'WAIT_PAY_TAIL' && payState == 'PAID_EARNEST') ||
    (status == 'AUDIT' && payState == 'PAID_EARNEST')
  ) {
    return '待支付尾款';
  } else if (status == 'CONFIRMED') {
    return '已收货';
  } else if (status == 'AUDIT' || status == 'DELIVERED_PART') {
    return '待发货';
  } else if (status == 'DELIVERED') {
    return '待收货';
  } else if (status == 'COMPLETED') {
    return '已完成';
  } else if (status == 'VOID') {
    return '已作废';
  }else if (status == 'TOPICKUP') {
    if (payState == 'NOT_PAID') {
      return '待支付';
    } else if (payState == 'UNCONFIRMED') {
      return '待确认';
    } else if (payState == 'PAID') {
      return '待自提';
    }
  }
};

const PAY_STATUS = {
  NOT_PAID: '未付款',
  UNCONFIRMED: '待确认',
  PAID: '已付款'
};

const DELIVERY_STATUS = {
  NOT_YET_SHIPPED: '未发货',
  PART_SHIPPED: '部分发货',
  SHIPPED: '全部发货'
};

const invoiceType = (type) => {
  if (type == '0') {
    return '普通发票';
  } else if (type == '1') {
    return '增值税专用发票';
  } else if (type == '-1') {
    return '不需要发票';
  }
};

class WrapperOrder {
  order;

  constructor(order) {
    this.order = order;
  }

  orderNo() {
    return this.order.get('id');
  }

  orderState() {
    // return FLOW_STATE[this.order.getIn(['tradeState', 'flowState'])];
    return flowState(
      this.order.getIn(['tradeState', 'flowState']),
      this.order.getIn(['tradeState', 'payState'])
    );
  }

  createTime() {
    const creat = this.order.getIn(['tradeState', 'createTime']);
    if (creat) {
      return _.formatDate(creat);
    }
  }

  buyerName() {
    return this.order.getIn(['consignee', 'name']);
  }

  buyerPhone() {
    return this.order.getIn(['consignee', 'phone']);
  }

  buyerAddress() {
    const consignee = this.order.get('consignee');
    return consignee ? consignee.get('detailAddress') : '';
  }

  isPayed() {
    return this.order.getIn(['tradeState', 'payState']) != 'NOT_PAID';
  }

  totalPrice() {
    return _.addZero(this.order.getIn(['tradePrice', 'totalPrice']));
  }

  goodsPrice() {
    return _.addZero(this.order.getIn(['tradePrice', 'goodsPrice']));
  }

  /**
   * 满减金额
   */
  reductionPrice() {
    const discountsPriceDetails = this.order.getIn([
      'tradePrice',
      'discountsPriceDetails'
    ]);
    const reduction = discountsPriceDetails
      ? discountsPriceDetails.find((item) => item.get('marketingType') == 0)
      : null;
    return _.addZero(reduction ? reduction.get('discounts') : 0);
  }

  /**
   * 满折金额
   */
  discountPrice() {
    const discountsPriceDetails = this.order.getIn([
      'tradePrice',
      'discountsPriceDetails'
    ]);
    const discount = discountsPriceDetails
      ? discountsPriceDetails.find((item) => item.get('marketingType') == 1)
      : null;
    return _.addZero(discount ? discount.get('discounts') : 0);
  }

  /**
   * 优惠券金额
   * @returns {*}
   */
  couponPrice() {
    const couponPrice = this.order.getIn(['tradePrice', 'couponPrice']);
    return couponPrice ? _.addZero(couponPrice) : 0;
  }

  deliveryPrice() {
    return _.addZero(this.order.getIn(['tradePrice', 'deliveryPrice']));
  }

  buyerRemark() {
    return this.order.get('buyerRemark') || '无';
  }

  sellerRemark() {
    return this.order.get('sellerRemark') || '无';
  }

  tradeItems() {
    return this.order.get('tradeItems') || fromJS([]);
  }

  gifts() {
    return this.order.get('gifts') || fromJS([]);
  }

  deliverWay(){
    return this.order.get('deliverWay')||'';
  }

  totalNum() {
    return this.tradeItems()
      ? this.tradeItems().reduce((x, y) => (x += y.get('num')), 0)
      : 0;
  }

  encloses() {
    if (this.order.get('encloses')) {
      let encloses = this.order.get('encloses').split(',');
      let enclo = fromJS(encloses || []);
      return enclo.size > 0
        ? enclo.map((value) => Map().set('image', value)).toJS()
        : Array();
    } else {
      return Array();
    }
  }

  payId() {
    return this.order.getIn(['payInfo', 'payTypeId']);
  }

  orderPayState() {
    return PAY_STATUS[this.order.getIn(['tradeState', 'payState'])];
  }

  orderDeliveryState() {
    return DELIVERY_STATUS[this.order.getIn(['tradeState', 'deliverStatus'])];
  }

  orderInvoice() {
    return invoiceType(this.order.getIn(['invoice', 'type']));
  }

  /**
   * 订单是否作废
   * @returns {boolean}
   */
  isVoidTrade() {
    return this.order.getIn(['tradeState', 'flowState']) == 'VOID';
  }

  /**
   * 订单作废原因
   * @returns {any|string}
   */
  obsoleteReason() {
    return this.order.getIn(['tradeState', 'obsoleteReason']) || '-';
  }

  /**
   * 店铺信息
   * @returns {string}
   */
  storeName() {
    return this.order.getIn(['supplier', 'storeName']);
  }

  storeId() {
    return this.order.getIn(['supplier', 'storeId']);
  }

  isSelf() {
    return this.order.getIn(['supplier', 'isSelf']);
  }

  platform() {
    return this.order.get('platform');
  }
  orderDeliverWay() {
    let deliverWay = this.order.get('deliverWay')
    console.log('qy>>>',deliverWay,typeof deliverWay)
    switch (deliverWay) {
      case  1:
        return  '物流'
      case  2:
        return '快递';
      case  3:
        return '自提';
      case  4:
        return '配送到家';
      default:
        return '其他';
    }
  }
  /**
   * 积分兑换金额
   * @returns {*}
   */
  pointsPrice() {
    const pointsPrice = this.order.getIn(['tradePrice', 'pointsPrice']);
    return pointsPrice ? _.addZero(pointsPrice) : 0;
  }

  // 订单返利
  commission() {
    let commission = this.order.get('commission');
    return commission ? _.addZero(commission) : 0;
  }

  /**
   * 订单积分
   */
  points() {
    return this.order.getIn(['tradePrice', 'points']);
  }
}

export default (order) => {
  return new WrapperOrder(order);
};
