import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'SystemPointsConfigController';

/**
 *
 * 查询积分设置
 *
 */
async function query(): Promise<SystemPointsConfigQueryResponse> {
  if (__DEV__) {
    if (isMock('SystemPointsConfigController', 'query')) {
      return Promise.resolve(
        require('./mock/SystemPointsConfigController.json')
          .SystemPointsConfigQueryResponse || {},
      );
    }
  }

  let result = await sdk.get<SystemPointsConfigQueryResponse>(
    '/pointsConfig',

    {},
  );
  return result.context;
}

/**
 *
 * isGoodsEvaluate
 *
 */
async function isGoodsEvaluate(): Promise<BossGoodsEvaluateResponse> {
  if (__DEV__) {
    if (isMock('SystemPointsConfigController', 'isGoodsEvaluate')) {
      return Promise.resolve(
        require('./mock/SystemPointsConfigController.json')
          .BossGoodsEvaluateResponse || {},
      );
    }
  }

  let result = await sdk.get<BossGoodsEvaluateResponse>(
    '/systemGoodsEvaluateConfig/isGoodsEvaluate',

    {},
  );
  return result.context;
}

export default {
  query,

  isGoodsEvaluate,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«SystemPointsConfigQueryResponse»".
 */
export interface BaseResponseSystemPointsConfigQueryResponse {
  /**
   * 结果码
   */
  code: string;
  context?: SystemPointsConfigQueryResponse;
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
export interface SystemPointsConfigQueryResponse {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 积分抵扣限额
   */
  maxDeductionRate?: number;
  /**
   * 满x积分可用
   */
  overPointsAvailable?: number;
  /**
   * 主键
   */
  pointsConfigId?: string;
  /**
   * 积分过期日期
   */
  pointsExpireDay?: number;
  /**
   * 积分过期月份
   */
  pointsExpireMonth?: number;
  /**
   * 积分价值
   */
  pointsWorth?: number;
  /**
   * 积分说明
   */
  remark?: string;
  /**
   * 是否启用标志 0：停用，1：启用
   * * DISABLE: 未启用
   * * ENABLE: 已启用
   */
  status?: 0 | 1;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SystemPointsConfigQueryResponse".
 */
export interface SystemPointsConfigQueryResponse1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 积分抵扣限额
   */
  maxDeductionRate?: number;
  /**
   * 满x积分可用
   */
  overPointsAvailable?: number;
  /**
   * 主键
   */
  pointsConfigId?: string;
  /**
   * 积分过期日期
   */
  pointsExpireDay?: number;
  /**
   * 积分过期月份
   */
  pointsExpireMonth?: number;
  /**
   * 积分价值
   */
  pointsWorth?: number;
  /**
   * 积分说明
   */
  remark?: string;
  /**
   * 是否启用标志 0：停用，1：启用
   * * DISABLE: 未启用
   * * ENABLE: 已启用
   */
  status?: 0 | 1;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«BossGoodsEvaluateResponse»".
 */
export interface BaseResponseBossGoodsEvaluateResponse {
  /**
   * 结果码
   */
  code: string;
  context?: BossGoodsEvaluateResponse;
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
export interface BossGoodsEvaluateResponse {
  /**
   * 是否开启商品评价
   */
  evaluate?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BossGoodsEvaluateResponse".
 */
export interface BossGoodsEvaluateResponse1 {
  /**
   * 是否开启商品评价
   */
  evaluate?: boolean;
  [k: string]: any;
}
