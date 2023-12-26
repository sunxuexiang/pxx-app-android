import Fetch from 'wmkit/fetch';

/**
 * 我的会员中心
 * @returns
 */
export const fetchCustomerCenterInfo = () => {
  return Fetch('/customer/customerCenter');
};

/**
 * 获取在线QQ客服详情
 */
export const onLineServiceList = () => {
  return Fetch('/customerService/qq/detail/0/2');
};

/**
 * 查询用户信息
 */
export const getCustomerInfo = () => {
  return Fetch('/customer/signrecord/getUserInfo');
};
/**
 * 查询订单tab数量
 */
export const getOrderTrade = () => {
  return Fetch('/trade/todo');
};

/**
 * 获取ali聊天窗口的url
 */
export const getAliyunChatUrl = (customerId, customerName) => {
  return Fetch('/system/aliyun/detail', {
    method: 'POST',
    body: JSON.stringify({
      customerId: customerId,
      customerName: customerName
    })
  });
};

/**
 * 分页查询app消息
 */
export const messagePage = (params) => {
  return Fetch('/appMessage/page', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};

/**
 * 查询成长值是否开启
 */
export const growthValueIsOpen = () => {
  return Fetch('/growthValue/isOpen');
};

/**
 * 获取积分设置
 */
export const basicRules = () => {
  return Fetch('/pointsConfig');
};

/**
 * 获取商品评价是否开启
 */
export const commentConfig = () => {
  return Fetch('/systemGoodsEvaluateConfig/isGoodsEvaluate');
};

/**
 * 获取商品评价是否开启
 */
export const isShow = () => {
  return Fetch('/systemGoodsEvaluateConfig/isGoodsEvaluate');
};

/**
 * 获取订单物流信息
 */
export const initLogisticsLog = () => {
  return Fetch('/logisticsLog/list');
};

/**
 * 收藏商品
 */
export const count = () => {
  return Fetch('/goods/goodsFollowNum');
};

/**
 * 关注店铺
 */
export const storeFollowNum = () => {
  return Fetch('/store/storeFollowNum');
};

/**
 * 余额
 */
export const statistics = () => {
  return Fetch('/customer/funds/statistics');
};

/**
 * 优惠券
 */
export const listMyCouponList = (couponType) => {
  return Fetch('/coupon-code/my-coupon', {
    method: 'POST',
    body: JSON.stringify({
      couponType: null
    })
  });
};

/**
 * 查询是否为员工
 * @returns {Promise<Result<T>>}
 */
export const queryBuyerByPhone = (phone) => {
  return Fetch(`/customer/queryBuyerByPhone/${phone}`, {
    method: 'GET'
  });
};
