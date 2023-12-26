/**
 * Created by chenpeng on 2017/7/5.
 */
import Fetch from 'wmkit/fetch';
import { config } from 'wmkit/config';
const { HTTP_TIME_OUT, BFF_HOST } = config;
/**
 * 查询用户默认地址信息
 * @returns {Promise<AsyncResult<TResult>>}
 */
export const fetchCustomerDefaultAddr = () => {
  return Fetch('/customer/addressinfo');
};


export const orderMarketing = (params) => {
  return Fetch('/site/orderMarketing', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};

/**
 * 获取订单商品列表
 * @returns {Promise<Result<TResult>>}
 */
export const fetchWillBuyGoodsList = () => {
  return Fetch('/trade/purchase',{method: 'GET'},BFF_HOST,false);
};

/**
 * 提交
 * @param params
 * @returns {Promise<Result<T>>}
 */
export const commit = (params) => {
  return Fetch('/trade/commit', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};

/**
 * 在线支付是否开启
 * @returns {Promise<Result<any>>}
 */
export const fetchOnlinePayStatus = () => {
  return Fetch('/pay/gateway/isopen/APP', {
    method: 'GET'
  });
};

/**
 * 查询当前商家是否支持开发票
 * @param companyInfoIds
 */
export const fetchInvoiceSwitch = (companyInfoIds) => {
  const params = {
    companyInfoIds
  };
  return Fetch('/account/invoice/switch', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};

/**
 * 根据参数查询运费
 * @param params
 * @returns {Promise<Result<T>>}
 */
export const fetchFreight = (params) => {
  const req = {
    tradeParams:params
  };
  return Fetch('/trade/getFinalFreightForApp', {
    method: 'POST',
    body: JSON.stringify(req)
  });
};

/**
 * 查询缺货商品
 */
export const listStockOutGroupByStoreId = (wareId,storeId) => {
  return Fetch(
    '/trade/listStockOutGroupByStoreId/{wareId}/{storeId}'
      .replace('{wareId}', wareId + '')
      .replace('{storeId}', storeId + ''),
    {
      method: 'GET'
    }
  );
};

export const updateUnstock =(param)=>{
  return Fetch('/trade/updateUnStock', {
    method: 'PUT',
    body: JSON.stringify({
      realWareId:param.realWareId,
      storeId:param.storeId,
      cityCode:param.cityCode,
      wareId:param.wareId
    })
  });
}

/**
 * 查询会员数据
 * @returns
 */
export const fetchCustomerCenterInfo = () => {
  return Fetch('/customer/customerCenter');
};

/**
 * 查询积分设置
 * @returns
 */
export const fetchPointsConfig = () => {
  return Fetch('/pointsConfig');
};

/**
 * 是否可以直接支付
 */
export const canDirectPay = () => {
  // TODO
  return Promise.resolve({
    context: true
  });
  // return Fetch('/trade/can-direct-pay');
};

/**
 * 0元订单批量支付
 */
export const defaultPayBatch = (tradeIds) => {
  return Fetch('/pay/default/', {
    method: 'POST',
    body: JSON.stringify({
      tradeIds
    })
  });
};

/**
 * 根据物流公司id获取货流公司
 */
 export const getLogisticsCompanyById = (id) => {
  return Fetch(`/logisticscompany/${id}`, {
    method: 'GET'
  });
};

/**
 * 获取所有自提点
 */
export const queryPickUpStores =()=>{
  return Fetch('/warehouse/pick-up-stores',{
    method: 'GET'
  });
};

/**
 * 获取所有自提点
 */
export const queryPickUpStoresLimit =()=>{
  return Fetch('/warehouse/pick-up-stores-limit',{
    method: 'GET'
  });
}

/**
 * 获取支持本地配送
 */
export const checkDeliveryHomeFlag =(request)=>{
  return Fetch('/trade/checkHomeFlag', {
    method: 'POST',
    body: JSON.stringify(request)
  });
}

/**
 * 本地配送List
 */
export const getHomeDeliveryList =()=>{
  return Fetch('/homedelivery/list',{
    method: 'GET'
  });
}

export const checkoutCoupons = (couponCodeIds) => {
  return Fetch('/coupon-code/checkout-coupons', {
    method: 'POST',
    body: JSON.stringify({
      couponCodeIds
    })
  });
};