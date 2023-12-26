/**
 * Created by chenpeng on 2017/12/18.
 */
import * as WMkit from 'wmkit/kit';
import Fetch from 'wmkit/fetch';

export const archives = (id) => {
  /**
   * 获取店铺档案
   */
  return Fetch('/store/storeDocument', {
    method: 'POST',
    body: JSON.stringify({
      storeId: id
    })
  });
};

/**
 * 店铺的会员等级与折扣信息
 * @returns {IAsyncResult}
 */
export const storeMember = (storeId) => {
  return WMkit.isLoginOrNotOpen()
    ? Fetch('/store/storeVip', {
        method: 'POST',
        body: JSON.stringify({
          storeId
        })
      })
    : Fetch('/store/storeVipFront', {
        method: 'POST',
        body: JSON.stringify({
          storeId
        })
      });
};





/**
 * 获取客户在第三方店铺消费情况
 */
export const  thirdPartyConsumption = (id) => {
  return Fetch(`/store/customer/level/${id}`);
};

/**
 * 获取客户在自营的成长值
 */
export const proprietaryGrowthValue = () => {
  return Fetch('/customer/level/rights');
};



/**
 * 获取自营等级列表
 */
export const proprietaryGradeList = () => {
  return Fetch('/customer/level/rightsList');
};



/**
 * 获取第三方店铺等级列表
 */
export const thirdPartyGradeList = (id) => {
  return Fetch(`/store/level/list/${id}`);
};

//
/**
 * 查询成长值是否开启
 */
export const growthValueIsOpen = () => {
  return Fetch(`/growthValue/isOpen`);
};
