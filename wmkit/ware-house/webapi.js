import Fetch  from '../common/fetch-min';

/**
 * 分享商品增加成长值及积分
 */
export const shareGoods = () => {
  return Fetch('/customer/points/share', {
    method: 'POST'
  });
};

/**
 * 匹配分仓信息并返回匹配好的分仓
 * @param cityCode
 */
export const matchWareHouse = (cityCode) => {
  return Fetch('/warehouse/match-ware-house',{
    method: 'POST',
    body: JSON.stringify({cityCode: cityCode})
  });
};

/**
 * 匹配分仓信息并返回匹配好的分仓——未登录时使用
 * @param cityCode
 */
export const matchWareHouseWithoutLogin = (cityCode) => {
  return Fetch('/warehouse/match-ware-house-without-login',{
    method: 'POST',
    body: JSON.stringify({cityCode: cityCode})
  });
};



/**
 * 获取所有有效的自提点
 */
export const queryPickUpStores = () => {
  return Fetch('/warehouse/pick-up-stores',{
    method: 'GET'
  });
};

/**
 * 获取已匹配的仓库地址
 */
export const getMatchedAddress = () => {
  return Fetch('/warehouse/get-matched-ware',{
    method: 'GET'
  });
};

/**
 *更新最后一次收货地址
 */
export const updateLastAddress = (request) => {
  return Fetch('/customer/updateLastAddress', {
    method: 'POST',
    body: JSON.stringify({
      ...request
    })
  });
};

export const doInitAddressList = () => {
  return Fetch('/customer/addressList', {
    method: 'GET'
  });
};
