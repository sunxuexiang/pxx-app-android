import { config } from 'wmkit/config';
import Fetch from 'wmkit/fetch';
import * as WMkit from 'wmkit/kit';

/**
 * 查询首页商品列表
 * @param id 店铺Id
 */
export const fetchSkusForMain = ({ id, esGoodsInfoDTOList }) => {
  // 首页展示20条数据
  let params;
  if (WMkit.isLoginOrNotOpen()) {
    params = {
      storeId: id,
      pageSize: 20,
      // 上架时间倒序
      sortFlag: 1
    };
  } else {
    params = {
      storeId: id,
      pageSize: 20,
      // 上架时间倒序
      sortFlag: 0,
      esGoodsInfoDTOList: esGoodsInfoDTOList
    };
  }

  return WMkit.isLoginOrNotOpen()
    ? Fetch('/goods/skus', {
        method: 'POST',
        body: JSON.stringify(params)
      })
    : Fetch('/goods/skuListFront', {
        method: 'POST',
        body: JSON.stringify(params)
      });
};

/**
 * 获取店铺基本信息
 * @param id 店铺Id
 */
export const fetchStoreInfo = (id) => {
  const params = {
    storeId: id
  };
  return WMkit.isLoginOrNotOpen()
    ? Fetch('/store/storeInfo', {
        method: 'POST',
        body: JSON.stringify(params)
      })
    : Fetch('/store/unLogin/storeInfo', {
        method: 'POST',
        body: JSON.stringify(params)
      });
};

/**
 * 关注
 * @param id 店铺Id
 */
export const follow = (id) => {
  const params = {
    storeId: id
  };
  return Fetch('/store/storeFollow', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};

/**
 * 取消关注
 * @param id 店铺Id
 */
export const unfollow = (id) => {
  const params = {
    storeIds: [id]
  };
  return Fetch('/store/storeFollow', {
    method: 'DELETE',
    body: JSON.stringify(params)
  });
};

/**
 * 获取在线客服详情
 */
export const onLineServiceList = (storeId) => {
  return Fetch(`/customerService/qq/detail/${storeId}/2`);
};

/**
 * 获取商品评价是否开启
 */
export const commentConfig = () => {
  return Fetch('/systemGoodsEvaluateConfig/isGoodsEvaluate');
};

/**
 * 获取一组进店赠券优惠券
 * @param storeId
 * @param customerId
 */
export const fetchStoreCoupon = (storeId, customerId) =>{
  return Fetch(`/store/storeCoupons/${storeId}/${customerId}`);
};

/**
 * 是否配置了店铺首页
 */
export const hasMagicIndex = (storeId) => {
  return fetch(`${config.RENDER_HOST}/magic/d2cStore/000000/weixin/index?storeId=${storeId}`).then(res => res.json());
};

/**
 * 二级气泡弹窗
 */
export const getByMain = (usePageType) => {
  return Fetch('/hoverNavMobile/{usePageType}'.replace('{usePageType}', usePageType + ''),{
    method: 'GET'
  })
}