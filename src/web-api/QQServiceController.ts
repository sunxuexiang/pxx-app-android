import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'QQServiceController';

/**
 *
 * 查询qq客服列表
 *
 */
async function qqDetail(
  storeId: IQqDetailStoreIdReq,
  type: IQqDetailTypeReq,
): Promise<OnlineServiceListResponse> {
  if (__DEV__) {
    if (isMock('QQServiceController', 'qqDetail')) {
      return Promise.resolve(
        require('./mock/QQServiceController.json').OnlineServiceListResponse ||
          {},
      );
    }
  }

  let result = await sdk.get<OnlineServiceListResponse>(
    '/customerService/qq/detail/{storeId}/{type}'

      .replace('{storeId}', storeId + '')

      .replace('{type}', type + ''),

    {},
  );
  return result.context;
}

export default {
  qqDetail,
};

/**
 * 店铺id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQqDetailStoreIdReq".
 */
export type IQqDetailStoreIdReq = number;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«OnlineServiceListResponse»".
 */
export interface BaseResponseOnlineServiceListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: OnlineServiceListResponse;
  /**
   * 错误内容
   */
  errorData?: {
    [k: string]: any;
  };
  /**
   * 消息内容
   */
  message?: string;
  [k: string]: any;
}
/**
 * 内容
 */
export interface OnlineServiceListResponse {
  /**
   * onlineerviceItem座席列表结果
   */
  qqOnlineServerItemRopList?: OnlineServiceItemVO[];
  qqOnlineServerRop?: OnlineServiceVO;
  [k: string]: any;
}
export interface OnlineServiceItemVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客服账号
   */
  customerServiceAccount?: string;
  /**
   * 客服昵称
   */
  customerServiceName?: string;
  /**
   * 删除标志 默认0：未删除 1：删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 在线客服主键
   */
  onlineServiceId?: number;
  /**
   * 操作人
   */
  operatePerson?: string;
  /**
   * 在线客服座席id
   */
  serviceItemId?: number;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * onlineService客服信息
 */
export interface OnlineServiceVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志 默认0：未删除 1：删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 生效终端App 0 不生效 1 生效
   * * NO: 否
   * * YES: 是
   */
  effectiveApp?: 0 | 1;
  /**
   * 生效终端移动版 0 不生效 1 生效
   * * NO: 否
   * * YES: 是
   */
  effectiveMobile?: 0 | 1;
  /**
   * 生效终端pc 0 不生效 1 生效
   * * NO: 否
   * * YES: 是
   */
  effectivePc?: 0 | 1;
  /**
   * 在线客服主键
   */
  onlineServiceId?: number;
  /**
   * 操作人
   */
  operatePerson?: string;
  /**
   * 在线客服是否启用 0 不启用， 1 启用
   * * NO: 否
   * * YES: 是
   */
  serverStatus?: 0 | 1;
  /**
   * 客服标题
   */
  serviceTitle?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "OnlineServiceListResponse".
 */
export interface OnlineServiceListResponse1 {
  /**
   * onlineerviceItem座席列表结果
   */
  qqOnlineServerItemRopList?: OnlineServiceItemVO[];
  qqOnlineServerRop?: OnlineServiceVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "OnlineServiceItemVO".
 */
export interface OnlineServiceItemVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客服账号
   */
  customerServiceAccount?: string;
  /**
   * 客服昵称
   */
  customerServiceName?: string;
  /**
   * 删除标志 默认0：未删除 1：删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 在线客服主键
   */
  onlineServiceId?: number;
  /**
   * 操作人
   */
  operatePerson?: string;
  /**
   * 在线客服座席id
   */
  serviceItemId?: number;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "OnlineServiceVO".
 */
export interface OnlineServiceVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志 默认0：未删除 1：删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 生效终端App 0 不生效 1 生效
   * * NO: 否
   * * YES: 是
   */
  effectiveApp?: 0 | 1;
  /**
   * 生效终端移动版 0 不生效 1 生效
   * * NO: 否
   * * YES: 是
   */
  effectiveMobile?: 0 | 1;
  /**
   * 生效终端pc 0 不生效 1 生效
   * * NO: 否
   * * YES: 是
   */
  effectivePc?: 0 | 1;
  /**
   * 在线客服主键
   */
  onlineServiceId?: number;
  /**
   * 操作人
   */
  operatePerson?: string;
  /**
   * 在线客服是否启用 0 不启用， 1 启用
   * * NO: 否
   * * YES: 是
   */
  serverStatus?: 0 | 1;
  /**
   * 客服标题
   */
  serviceTitle?: string;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 生效终端，0：PC, 1： H5, 2： APP
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQqDetailTypeReq".
 */
export interface IQqDetailTypeReq {
  [k: string]: any;
}
