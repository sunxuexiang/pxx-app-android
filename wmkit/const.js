export const Const = {
  DATE_FORMAT: 'YYYY-MM-DD',
  MINUTE_FORMAT: 'YYYY-MM-DD HH:mm',
  SECONDS_FORMAT: 'YYYY-MM-DD HH:mm:ss',
  // 购物车限订50
  PURCHASE_MAX_SIZE: 100,

  // 每日最大提现金额限制
  MAX_DRAW_CASH: 10000,
  // 每日最小提现金额限制
  MIN_DRAW_CASH: 1,

  // 退货状态
  returnGoodsState: {
    INIT: '待审核',
    AUDIT: '待填写物流信息',
    DELIVERED: '待商家收货',
    RECEIVED: '待退款',
    COMPLETED: '已完成',
    REJECT_RECEIVE: '拒绝收货',
    REJECT_REFUND: '拒绝退款',
    VOID: '已作废',
    REFUND_FAILED: '待退款' // BOSS端退款失败在C端不予展示，依旧为“待退款”
  },
  // 退款状态
  returnMoneyState: {
    INIT: '待审核',
    AUDIT: '待退款',
    COMPLETED: '已完成',
    REJECT_REFUND: '拒绝退款',
    VOID: '已作废',
    REFUND_FAILED: '待退款' // BOSS端退款失败在C端不予展示，依旧为“待退款”
  },
  // 订单状态
  flowState: {
    INIT: '待审核',
    REMEDY: '修改订单',
    REFUND: '退款',
    AUDIT: '待发货',
    DELIVERED_PART: '待发货',
    DELIVERED: '待收货',
    CONFIRMED: '已收货',
    COMPLETED: '已完成',
    VOID: '已作废',
    REFUND_FAILED: '待退款' // BOSS端退款失败在C端不予展示，依旧为“待退款”
  },
  marketingType: {
    0: '满减',
    1: '买折',
    2: '买赠'
  },
  //积分抵扣比例,默认100
  pointRatio: 100,
  //会员标签
  customerLabel: {
    IEPCustomer: 'enterprise-customer'//企业会员
  },

  GOODS_DETAIL_TYPE: {
    FLASHGOODS: 0
  }
};
