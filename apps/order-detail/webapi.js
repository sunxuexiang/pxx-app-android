import Fetch from 'wmkit/fetch';

/**
 * 订单详情
 */
export const fetchOrderDetail = (tid) => {
  return Fetch(`/trade/${tid}`);
};

/**
 * 取消订单
 */
export const cancelOrder = (tid) => {
  return Fetch(`/trade/cancel/${tid}`);
};

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
 * 0元订单支付
 */
export const defaultPaylOrder = (tid) => {
  return Fetch(`/trade/default/pay/${tid}`);
};

/**
 * 查询积分设置
 * @returns
 */
export const fetchPointsConfig = () => {
  return Fetch('/pointsConfig');
};

/**
 * 提交订单，用于尾款支付操作
 * @returns
 */
export const commitTail = (params) => {
  return Fetch('/trade/commit/final/', {
    method: 'POST',
    body: JSON.stringify({
      ...params
    })
  });
};

/**
 * 查询会员数据
 * @returns
 */
export const fetchCustomerCenterInfo = () => {
  return Fetch('/customer/customerCenter');
};

/**
 * 获取订单详情-参照订单列表
 */
export const getTradeDetailList = tid => {
  return Fetch(`/trade/${tid}`);
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