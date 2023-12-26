import Fetch from 'wmkit/fetch';

/**
 * 获取退货方式
 */
export const getReturnWays = () => {
  return Fetch('/return/ways');
};

/**
 * 获取退货原因
 */
export const getReturnReasons = () => {
  return Fetch('/return/reasons');
};

/**
 * 获取订单详情
 */
export const getTradeDetail = (tid) => {
  return Fetch(`/return/trade/${tid}`);
};

/**
 * 创建退货第一步快照，只记录选中的退货商品及数量
 */
export const addSnapshot = (param) => {
  return Fetch('/return/transfer', {
    method: 'POST',
    body: JSON.stringify(param)
  });
};

/**
 * 获取退货申请第一步快照
 */
export const getSnapshot = () => {
  return Fetch('/return/findTransfer');
};

/**
 * 提交退货申请
 */
export const addApply = (param) => {
  return Fetch('/return/add', {
    method: 'POST',
    body: JSON.stringify(param)
  });
};

/**
 * 提交退款申请
 */
export const addRefundApply = (param) => {
  return Fetch('/return/addRefund', {
    method: 'POST',
    body: JSON.stringify(param)
  });
};

/**
 * 获取该订单已退的退单列表信息
 */
export const getReturnOrderList = (tid) => {
  return Fetch(`/return/findCompletedByTid/${tid}`);
};

/**
 * 查询退单详情
 */
export const fetchReturnDetail = (rid) => {
  return Fetch(`/return/${rid}`, {
    method: 'POST'
  });
};
