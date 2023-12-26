/**
 * Created by chenpeng on 2017/7/5.
 */
import Fetch from 'wmkit/fetch';

/**
 * 查询用户默认地址信息
 * @returns {Promise<AsyncResult<TResult>>}
 */
export const fetchCustomerDefaultAddr = () => {
  return Fetch('/customer/addressinfo');
};

/**
 * 获取订单商品列表
 * @returns {Promise<Result<TResult>>}
 */
export const fetchWillBuyGoodsList = () => {
  return Fetch('/trade/purchase');
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
  const request = {
    tradeParams:params
  };
  return Fetch('/trade/getFinalFreightForApp', {
    method: 'POST',
    body: JSON.stringify(request)
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
 * 查询积分设置
 * @returns
 */
export const fetchPointsConfig = () => {
  return Fetch('/pointsConfig');
};

/**
 * 删除抢购资格
 * @param params
 */
export const delFlashSaleGoodsQualifications = (params:any) => {
  return Fetch('/flashsale/delFlashSaleGoodsQualifications', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};

export const getFlashSaleGoodsQualifications = (params:any) => {
  return Fetch('/flashsale/getFlashSaleGoodsQualifications', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};

/**
 * 获取秒杀活动详情
 * @param params
 */
export const getFlashSaleInfo = (params:any) =>{
  return Fetch('/flashsale/getFlashSaleInfo', {
    method: 'POST',
    body: JSON.stringify(params)
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

