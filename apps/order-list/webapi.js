import Fetch from 'wmkit/fetch';

/**
 * 获取订单详情
 */
export const getTradeDetail = (tid) => {
  return Fetch(`/return/trade/${tid}`);
};

/**
 * 查询退单列表
 */
export const fetchOrderReturnList = (tid) => {
  return Fetch(`/return/findByTid/${tid}`);
};

/**
 * 取消订单
 */
export const cancelOrder = (tid) => {
  return Fetch(`/trade/cancel/${tid}`);
};

/**
 * 判断改订单是否可申请退单
 */
export const isAbleReturn = (tid) => {
  return Fetch(`/return/returnable/${tid}`);
};

/**
 * 0元订单支付
 */
export const defaultPaylOrder = (tid) => {
  return Fetch(`/trade/default/pay/${tid}`);
};

/**
 * 查询订单列表展示设置
 */
export const getOrderShowType = (tid) => {
  return Fetch(`/config/orderListShowType`);
};

/**
 * 获取积分设置
 */
export const basicRules = () => {
  return Fetch('/pointsConfig');
};

/**
 * 批量加入购物车
 */
export const purchase = (goodsInfos) => {
  console.log(goodsInfos,'------------------------>goodsInfos');
  return Fetch('/site/batchAdd', {
    method: 'POST',
    body: JSON.stringify(goodsInfos)
  });
};


/**
 * 获取订单详情-参照订单列表
 */
export const getTradeDetailList = tid => {
  return Fetch(`/trade/${tid}`);
};

/**
 *
 * 自提确认收货
 *
 */
export const update = tid => {
  return Fetch('/pickuprecord/updatePickUpNoCode',{
    method: 'PUT',
    body: JSON.stringify(tid)
  });
};