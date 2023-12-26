
import Fetch from 'wmkit/fetch';


export const getByCustomerId = (customerId) => {
  return Fetch(`/logisticscompany/customer/${customerId}`);
};

/**
 * 获取平台物流公司
 */
export const logisticscompany = (params) => {
  return Fetch('/logisticscompany/list', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};

/**
 * 添加自建物流
 */
export const addLogisticscompany = (params) => {
  return Fetch('/logisticscompany/add', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};
/**
 * 删除
 */
export const delLogisticscompany = (id) => {
  return Fetch(`/logisticscompany/${id}`, {
    method: 'DELETE'
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
 *
 * 用于确认订单后，创建订单前的获取订单商品信息
 *
 */
export const getHomeDeliveryList =()=>{
  return Fetch('/homedelivery/list',{
    method: 'GET'
  });
}


