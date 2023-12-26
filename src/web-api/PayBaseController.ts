import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'PayBaseController';

/**
 *
 * 0元订单批量支付（支付网关默认为银联）
 *
 */
async function defaultPayBatchByGetMethod(
  request: IDefaultPayBatchRequestReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('PayBaseController', 'defaultPayBatch')) {
      return Promise.resolve(
        require('./mock/PayBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.get(
    '/pay/default',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 0元订单批量支付（支付网关默认为银联）
 *
 */
async function defaultPayBatchUsingHEAD(
  request: IDefaultPayBatchUsingHEADRequestReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('PayBaseController', 'defaultPayBatchUsingHEAD')) {
      return Promise.resolve(
        require('./mock/PayBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.head(
    '/pay/default',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 0元订单批量支付（支付网关默认为银联）
 *
 */
async function defaultPayBatch(
  request: IDefaultPayBatchRequestReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('PayBaseController', 'defaultPayBatch')) {
      return Promise.resolve(
        require('./mock/PayBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.post(
    '/pay/default',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 0元订单批量支付（支付网关默认为银联）
 *
 */
async function defaultPayBatchByPutMethod(
  request: IDefaultPayBatchRequestReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('PayBaseController', 'defaultPayBatch')) {
      return Promise.resolve(
        require('./mock/PayBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.put(
    '/pay/default',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 0元订单批量支付（支付网关默认为银联）
 *
 */
async function defaultPayBatch_(
  request: IDefaultPayBatch_RequestReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('PayBaseController', 'defaultPayBatch_')) {
      return Promise.resolve(
        require('./mock/PayBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.deleteF(
    '/pay/default',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 0元订单批量支付（支付网关默认为银联）
 *
 */
async function defaultPayBatchUsingOPTIONS(
  request: IDefaultPayBatchUsingOPTIONSRequestReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('PayBaseController', 'defaultPayBatchUsingOPTIONS')) {
      return Promise.resolve(
        require('./mock/PayBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.options(
    '/pay/default',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 0元订单批量支付（支付网关默认为银联）
 *
 */
async function defaultPayBatchUsingPATCH(
  request: IDefaultPayBatchUsingPATCHRequestReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('PayBaseController', 'defaultPayBatchUsingPATCH')) {
      return Promise.resolve(
        require('./mock/PayBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.patch(
    '/pay/default',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 查询在线支付是否开启
 *
 */
async function queryGatewayIsOpen(
  type: IQueryGatewayIsOpenTypeReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('PayBaseController', 'queryGatewayIsOpen')) {
      return Promise.resolve(
        require('./mock/PayBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.get<unknown>(
    '/pay/gateway/isopen/{type}'.replace('{type}', type + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查询银联企业支付配置
 *
 */
async function queryUnionB2bConfigByGet(): Promise<PayGatewayConfigResponse> {
  if (__DEV__) {
    if (isMock('PayBaseController', 'queryUnionB2bConfig')) {
      return Promise.resolve(
        require('./mock/PayBaseController.json').PayGatewayConfigResponse || {},
      );
    }
  }

  let result = await sdk.get<PayGatewayConfigResponse>(
    '/pay/queryUnionB2bConfig',

    {},
  );
  return result.context;
}

/**
 *
 * 查询银联企业支付配置
 *
 */
async function queryUnionB2bConfigUsingHEAD(): Promise<
  PayGatewayConfigResponse
> {
  if (__DEV__) {
    if (isMock('PayBaseController', 'queryUnionB2bConfigUsingHEAD')) {
      return Promise.resolve(
        require('./mock/PayBaseController.json').PayGatewayConfigResponse || {},
      );
    }
  }

  let result = await sdk.head<PayGatewayConfigResponse>(
    '/pay/queryUnionB2bConfig',

    {},
  );
  return result.context;
}

/**
 *
 * 查询银联企业支付配置
 *
 */
async function queryUnionB2bConfig(): Promise<PayGatewayConfigResponse> {
  if (__DEV__) {
    if (isMock('PayBaseController', 'queryUnionB2bConfig')) {
      return Promise.resolve(
        require('./mock/PayBaseController.json').PayGatewayConfigResponse || {},
      );
    }
  }

  let result = await sdk.post<PayGatewayConfigResponse>(
    '/pay/queryUnionB2bConfig',

    {},
  );
  return result.context;
}

/**
 *
 * 查询银联企业支付配置
 *
 */
async function queryUnionB2bConfigByPut(): Promise<PayGatewayConfigResponse> {
  if (__DEV__) {
    if (isMock('PayBaseController', 'queryUnionB2bConfig')) {
      return Promise.resolve(
        require('./mock/PayBaseController.json').PayGatewayConfigResponse || {},
      );
    }
  }

  let result = await sdk.put<PayGatewayConfigResponse>(
    '/pay/queryUnionB2bConfig',

    {},
  );
  return result.context;
}

/**
 *
 * 查询银联企业支付配置
 *
 */
async function queryUnionB2bConfig_(): Promise<PayGatewayConfigResponse> {
  if (__DEV__) {
    if (isMock('PayBaseController', 'queryUnionB2bConfig_')) {
      return Promise.resolve(
        require('./mock/PayBaseController.json').PayGatewayConfigResponse || {},
      );
    }
  }

  let result = await sdk.deleteF<PayGatewayConfigResponse>(
    '/pay/queryUnionB2bConfig',

    {},
  );
  return result.context;
}

/**
 *
 * 查询银联企业支付配置
 *
 */
async function queryUnionB2bConfigUsingOPTIONS(): Promise<
  PayGatewayConfigResponse
> {
  if (__DEV__) {
    if (isMock('PayBaseController', 'queryUnionB2bConfigUsingOPTIONS')) {
      return Promise.resolve(
        require('./mock/PayBaseController.json').PayGatewayConfigResponse || {},
      );
    }
  }

  let result = await sdk.options<PayGatewayConfigResponse>(
    '/pay/queryUnionB2bConfig',

    {},
  );
  return result.context;
}

/**
 *
 * 查询银联企业支付配置
 *
 */
async function queryUnionB2bConfigUsingPATCH(): Promise<
  PayGatewayConfigResponse
> {
  if (__DEV__) {
    if (isMock('PayBaseController', 'queryUnionB2bConfigUsingPATCH')) {
      return Promise.resolve(
        require('./mock/PayBaseController.json').PayGatewayConfigResponse || {},
      );
    }
  }

  let result = await sdk.patch<PayGatewayConfigResponse>(
    '/pay/queryUnionB2bConfig',

    {},
  );
  return result.context;
}

/**
 *
 * 查询支付记录状态
 *
 */
async function getRecordStatus(tid: IGetRecordStatusTidReq): Promise<unknown> {
  if (__DEV__) {
    if (isMock('PayBaseController', 'getRecordStatus')) {
      return Promise.resolve(
        require('./mock/PayBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.get<unknown>(
    '/pay/record/status/{tid}'.replace('{tid}', tid + ''),

    {},
  );
  return result.context;
}

export default {
  defaultPayBatch,

  defaultPayBatchUsingHEAD,

  defaultPayBatchByPutMethod,

  defaultPayBatchByGetMethod,

  defaultPayBatch_,

  defaultPayBatchUsingOPTIONS,

  defaultPayBatchUsingPATCH,

  queryGatewayIsOpen,

  queryUnionB2bConfig,

  queryUnionB2bConfigUsingHEAD,

  queryUnionB2bConfigByGet,

  queryUnionB2bConfigByPut,

  queryUnionB2bConfig_,

  queryUnionB2bConfigUsingOPTIONS,

  queryUnionB2bConfigUsingPATCH,

  getRecordStatus,
};

/**
 * 终端类型
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryGatewayIsOpenTypeReq".
 */
export type IQueryGatewayIsOpenTypeReq = string;
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type Undefined = string;
/**
 * 订单id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetRecordStatusTidReq".
 */
export type IGetRecordStatusTidReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DefaultPayBatchRequest".
 */
export interface DefaultPayBatchRequest {
  /**
   * 0元订单单号集合
   */
  tradeIds?: string[];
  /**
   * 登录用户Id
   */
  userId?: string;
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
 * via the `definition` "BaseResponse«boolean»".
 */
export interface BaseResponseBoolean {
  /**
   * 结果码
   */
  code: string;
  /**
   * 内容
   */
  context?: boolean;
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
 * via the `definition` "BaseResponse«PayGatewayConfigResponse»".
 */
export interface BaseResponsePayGatewayConfigResponse {
  /**
   * 结果码
   */
  code: string;
  context?: PayGatewayConfigResponse;
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
export interface PayGatewayConfigResponse {
  /**
   * 收款账户
   */
  account?: string;
  /**
   * 身份标识
   */
  apiKey?: string;
  /**
   * 第三方应用标识
   */
  appId?: string;
  /**
   * 微信app_id
   */
  appId2?: string;
  /**
   * boss后台接口地址
   */
  bossBackUrl?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 支付网关配置项id
   */
  id?: number;
  openPlatformAccount?: string;
  openPlatformApiKey?: string;
  openPlatformAppId?: string;
  openPlatformSecret?: string;
  payGateway?: PayGatewayVO;
  /**
   * PC前端后台接口地址
   */
  pcBackUrl?: string;
  /**
   * PC前端web地址
   */
  pcWebUrl?: string;
  /**
   * 私钥
   */
  privateKey?: string;
  /**
   * 公钥
   */
  publicKey?: string;
  /**
   * secret key
   */
  secret?: string;
  [k: string]: any;
}
/**
 * 支付网关
 */
export interface PayGatewayVO {
  config?: PayGatewayConfigVO;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 支付网关id
   */
  id?: number;
  /**
   * 是否开启
   * * NO: 关闭
   * * YES: 开启
   */
  isOpen?: 0 | 1;
  /**
   * 网关名称
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   * * UNIONB2B: 银联b2b
   * * PING: 拼++
   * * BALANCE: 余额支付
   */
  name?: number;
  /**
   * 支付项
   */
  payChannelItemList?: null[];
  /**
   * 是否聚合支付
   */
  type?: boolean;
  [k: string]: any;
}
/**
 * 支付网关配置
 */
export interface PayGatewayConfigVO {
  /**
   * 收款账户
   */
  account?: string;
  /**
   * 身份标识
   */
  apiKey?: string;
  /**
   * 第三方应用标识
   */
  appId?: string;
  /**
   * 微信app_id
   */
  appId2?: string;
  /**
   * boss后台接口地址
   */
  bossBackUrl?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 支付网关配置项id
   */
  id?: number;
  openPlatformAccount?: string;
  openPlatformApiKey?: string;
  openPlatformAppId?: string;
  openPlatformSecret?: string;
  payGateway?: null;
  /**
   * PC前端后台接口地址
   */
  pcBackUrl?: string;
  /**
   * PC前端web地址
   */
  pcWebUrl?: string;
  /**
   * 私钥
   */
  privateKey?: string;
  /**
   * 公钥
   */
  publicKey?: string;
  /**
   * secret key
   */
  secret?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PayGatewayConfigResponse".
 */
export interface PayGatewayConfigResponse1 {
  /**
   * 收款账户
   */
  account?: string;
  /**
   * 身份标识
   */
  apiKey?: string;
  /**
   * 第三方应用标识
   */
  appId?: string;
  /**
   * 微信app_id
   */
  appId2?: string;
  /**
   * boss后台接口地址
   */
  bossBackUrl?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 支付网关配置项id
   */
  id?: number;
  openPlatformAccount?: string;
  openPlatformApiKey?: string;
  openPlatformAppId?: string;
  openPlatformSecret?: string;
  payGateway?: PayGatewayVO;
  /**
   * PC前端后台接口地址
   */
  pcBackUrl?: string;
  /**
   * PC前端web地址
   */
  pcWebUrl?: string;
  /**
   * 私钥
   */
  privateKey?: string;
  /**
   * 公钥
   */
  publicKey?: string;
  /**
   * secret key
   */
  secret?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PayGatewayVO".
 */
export interface PayGatewayVO1 {
  config?: PayGatewayConfigVO;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 支付网关id
   */
  id?: number;
  /**
   * 是否开启
   * * NO: 关闭
   * * YES: 开启
   */
  isOpen?: 0 | 1;
  /**
   * 网关名称
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   * * UNIONB2B: 银联b2b
   * * PING: 拼++
   * * BALANCE: 余额支付
   */
  name?: number;
  /**
   * 支付项
   */
  payChannelItemList?: null[];
  /**
   * 是否聚合支付
   */
  type?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PayGatewayConfigVO".
 */
export interface PayGatewayConfigVO1 {
  /**
   * 收款账户
   */
  account?: string;
  /**
   * 身份标识
   */
  apiKey?: string;
  /**
   * 第三方应用标识
   */
  appId?: string;
  /**
   * 微信app_id
   */
  appId2?: string;
  /**
   * boss后台接口地址
   */
  bossBackUrl?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 支付网关配置项id
   */
  id?: number;
  openPlatformAccount?: string;
  openPlatformApiKey?: string;
  openPlatformAppId?: string;
  openPlatformSecret?: string;
  payGateway?: null;
  /**
   * PC前端后台接口地址
   */
  pcBackUrl?: string;
  /**
   * PC前端web地址
   */
  pcWebUrl?: string;
  /**
   * 私钥
   */
  privateKey?: string;
  /**
   * 公钥
   */
  publicKey?: string;
  /**
   * secret key
   */
  secret?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PayChannelItemVO".
 */
export interface PayChannelItemVO {
  /**
   * 支付渠道
   */
  channel?: string;
  /**
   * 支付项代码，同一支付网关唯一
   */
  code?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  gateway?: PayGatewayVO2;
  /**
   * 支付渠道项id
   */
  id?: number;
  /**
   * 是否开启
   * * NO: 关闭
   * * YES: 开启
   */
  isOpen?: 0 | 1;
  /**
   * 支付项名称
   */
  name?: string;
  /**
   * 终端
   * * PC: PC
   * * H5: H5
   * * APP: APP
   */
  terminal?: 0 | 1 | 2;
  [k: string]: any;
}
/**
 * 支付网关
 */
export interface PayGatewayVO2 {
  config?: PayGatewayConfigVO;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 支付网关id
   */
  id?: number;
  /**
   * 是否开启
   * * NO: 关闭
   * * YES: 开启
   */
  isOpen?: 0 | 1;
  /**
   * 网关名称
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   * * UNIONB2B: 银联b2b
   * * PING: 拼++
   * * BALANCE: 余额支付
   */
  name?: number;
  /**
   * 支付项
   */
  payChannelItemList?: null[];
  /**
   * 是否聚合支付
   */
  type?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«string»".
 */
export interface BaseResponseString {
  /**
   * 结果码
   */
  code: string;
  /**
   * 内容
   */
  context?: string;
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
 * via the `definition` "IDefaultPayBatchRequestReq".
 */
export interface IDefaultPayBatchRequestReq {
  /**
   * 0元订单单号集合
   */
  tradeIds?: string[];
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDefaultPayBatchUsingHEADRequestReq".
 */
export interface IDefaultPayBatchUsingHEADRequestReq {
  /**
   * 0元订单单号集合
   */
  tradeIds?: string[];
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDefaultPayBatch_RequestReq".
 */
export interface IDefaultPayBatch_RequestReq {
  /**
   * 0元订单单号集合
   */
  tradeIds?: string[];
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDefaultPayBatchUsingOPTIONSRequestReq".
 */
export interface IDefaultPayBatchUsingOPTIONSRequestReq {
  /**
   * 0元订单单号集合
   */
  tradeIds?: string[];
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDefaultPayBatchUsingPATCHRequestReq".
 */
export interface IDefaultPayBatchUsingPATCHRequestReq {
  /**
   * 0元订单单号集合
   */
  tradeIds?: string[];
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
