import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'SystemController';

/**
 *
 * 查询阿里云客服配置
 *
 */
async function queryAliyun(
  onlineServiceUrlRequest: IQueryAliyunOnlineServiceUrlRequestReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('SystemController', 'queryAliyun')) {
      return Promise.resolve(
        require('./mock/SystemController.json').unknown || {},
      );
    }
  }

  let result = await sdk.post(
    '/system/aliyun/detail',

    {
      ...onlineServiceUrlRequest,
    },
  );
  return result.context;
}

/**
 *
 * 查询基本设置
 *
 */
async function findBaseConfig(): Promise<BaseConfigRopResponse> {
  if (__DEV__) {
    if (isMock('SystemController', 'findBaseConfig')) {
      return Promise.resolve(
        require('./mock/SystemController.json').BaseConfigRopResponse || {},
      );
    }
  }

  let result = await sdk.get<BaseConfigRopResponse>(
    '/system/baseConfig',

    {},
  );
  return result.context;
}

/**
 *
 * 查询招商页设置
 *
 */
async function findConfig(): Promise<BusinessConfigRopResponse> {
  if (__DEV__) {
    if (isMock('SystemController', 'findConfig')) {
      return Promise.resolve(
        require('./mock/SystemController.json').BusinessConfigRopResponse || {},
      );
    }
  }

  let result = await sdk.get<BusinessConfigRopResponse>(
    '/system/businessConfig',

    {},
  );
  return result.context;
}

/**
 *
 * 获取服务时间
 *
 */
async function queryServerTime(): Promise<unknown> {
  if (__DEV__) {
    if (isMock('SystemController', 'queryServerTime')) {
      return Promise.resolve(
        require('./mock/SystemController.json').unknown || {},
      );
    }
  }

  let result = await sdk.get<unknown>(
    '/system/queryServerTime',

    {},
  );
  return result.context;
}

export default {
  queryAliyun,

  findBaseConfig,

  findConfig,

  queryServerTime,
};

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type Undefined = number;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "OnlineServiceUrlRequest".
 */
export interface OnlineServiceUrlRequest {
  /**
   * 用户id
   */
  customerId?: string;
  /**
   * 用户名
   */
  customerName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse".
 */
export interface BaseResponse {
  /**
   * 结果码
   */
  code: string;
  /**
   * 内容
   */
  context?: {
    [k: string]: any;
  };
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
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«BaseConfigRopResponse»".
 */
export interface BaseResponseBaseConfigRopResponse {
  /**
   * 结果码
   */
  code: string;
  context?: BaseConfigRopResponse;
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
export interface BaseConfigRopResponse {
  /**
   * 主键ID
   */
  baseConfigId?: number;
  /**
   * 移动商城banner,最多可添加5个,多个图片间以"|"隔开
   */
  mobileBanner?: string;
  /**
   * 移动端商城网址
   */
  mobileWebsite?: string;
  /**
   * PC商城登录页banner,最多可添加5个,多个图片间以"|"隔开
   */
  pcBanner?: string;
  /**
   * 商城图标，最多添加一个
   */
  pcIco?: string;
  /**
   * PC商城logo
   */
  pcLogo?: string;
  /**
   * PC商城首页banner,最多可添加5个,多个图片间以"|"隔开
   */
  pcMainBanner?: string;
  /**
   * 商城首页标题
   */
  pcTitle?: string;
  /**
   * PC端商城网址
   */
  pcWebsite?: string;
  /**
   * 会员注册协议
   */
  registerContent?: string;
  /**
   * 商家网址
   */
  supplierWebsite?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseConfigRopResponse".
 */
export interface BaseConfigRopResponse1 {
  /**
   * 主键ID
   */
  baseConfigId?: number;
  /**
   * 移动商城banner,最多可添加5个,多个图片间以"|"隔开
   */
  mobileBanner?: string;
  /**
   * 移动端商城网址
   */
  mobileWebsite?: string;
  /**
   * PC商城登录页banner,最多可添加5个,多个图片间以"|"隔开
   */
  pcBanner?: string;
  /**
   * 商城图标，最多添加一个
   */
  pcIco?: string;
  /**
   * PC商城logo
   */
  pcLogo?: string;
  /**
   * PC商城首页banner,最多可添加5个,多个图片间以"|"隔开
   */
  pcMainBanner?: string;
  /**
   * 商城首页标题
   */
  pcTitle?: string;
  /**
   * PC端商城网址
   */
  pcWebsite?: string;
  /**
   * 会员注册协议
   */
  registerContent?: string;
  /**
   * 商家网址
   */
  supplierWebsite?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«BusinessConfigRopResponse»".
 */
export interface BaseResponseBusinessConfigRopResponse {
  /**
   * 结果码
   */
  code: string;
  context?: BusinessConfigRopResponse;
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
export interface BusinessConfigRopResponse {
  /**
   * 已新增的招商页设置信息
   */
  businessBanner?: string;
  /**
   * 已新增的招商页设置信息
   */
  businessConfigId?: number;
  /**
   * 已新增的招商页设置信息
   */
  businessCustom?: string;
  /**
   * 已新增的招商页设置信息
   */
  businessEnter?: string;
  /**
   * 已新增的招商页设置信息
   */
  businessRegister?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BusinessConfigRopResponse".
 */
export interface BusinessConfigRopResponse1 {
  /**
   * 已新增的招商页设置信息
   */
  businessBanner?: string;
  /**
   * 已新增的招商页设置信息
   */
  businessConfigId?: number;
  /**
   * 已新增的招商页设置信息
   */
  businessCustom?: string;
  /**
   * 已新增的招商页设置信息
   */
  businessEnter?: string;
  /**
   * 已新增的招商页设置信息
   */
  businessRegister?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryAliyunOnlineServiceUrlRequestReq".
 */
export interface IQueryAliyunOnlineServiceUrlRequestReq {
  /**
   * 用户id
   */
  customerId?: string;
  /**
   * 用户名
   */
  customerName?: string;
  [k: string]: any;
}
