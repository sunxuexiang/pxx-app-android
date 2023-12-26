import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'DistributionController';

/**
 *
 * 登录人员是否分销员
 *
 */
async function loginIsDistributor(): Promise<unknown> {
  if (__DEV__) {
    if (isMock('DistributionController', 'loginIsDistributor')) {
      return Promise.resolve(
        require('./mock/DistributionController.json').unknown || {},
      );
    }
  }

  let result = await sdk.get<unknown>(
    '/distribute/check/loginIsDistributor',

    {},
  );
  return result.context;
}

/**
 *
 * 查询小店分销状态
 *
 */
async function checkStatus(): Promise<unknown> {
  if (__DEV__) {
    if (isMock('DistributionController', 'checkStatus')) {
      return Promise.resolve(
        require('./mock/DistributionController.json').unknown || {},
      );
    }
  }

  let result = await sdk.get<unknown>(
    '/distribute/check/status',

    {},
  );
  return result.context;
}

/**
 *
 * 根据会员的Id查询该会员的分销员信息
 *
 */
async function queryDistributorInfoByCustomerId(): Promise<
  DistributionCustomerByCustomerIdResponse
> {
  if (__DEV__) {
    if (isMock('DistributionController', 'queryDistributorInfoByCustomerId')) {
      return Promise.resolve(
        require('./mock/DistributionController.json')
          .DistributionCustomerByCustomerIdResponse || {},
      );
    }
  }

  let result = await sdk.get<DistributionCustomerByCustomerIdResponse>(
    '/distribute/distributor-info',

    {},
  );
  return result.context;
}

/**
 *
 * 查询分销员状态
 *
 */
async function getDistributorStatus(): Promise<
  DistributionCustomerEnableByCustomerIdResponse
> {
  if (__DEV__) {
    if (isMock('DistributionController', 'getDistributorStatus')) {
      return Promise.resolve(
        require('./mock/DistributionController.json')
          .DistributionCustomerEnableByCustomerIdResponse || {},
      );
    }
  }

  let result = await sdk.get<DistributionCustomerEnableByCustomerIdResponse>(
    '/distribute/getDistributorStatus',

    {},
  );
  return result.context;
}

/**
 *
 * 查询平台端-社交分销总开关状态
 *
 */
async function queryOpenFlag(): Promise<unknown> {
  if (__DEV__) {
    if (isMock('DistributionController', 'queryOpenFlag')) {
      return Promise.resolve(
        require('./mock/DistributionController.json').unknown || {},
      );
    }
  }

  let result = await sdk.get<unknown>(
    '/distribute/queryOpenFlag',

    {},
  );
  return result.context;
}

/**
 *
 * 查询分销员的销售业绩
 *
 */
async function getPerformanceByInviteedId(): Promise<
  DistributionRecordByInviteeIdResponse
> {
  if (__DEV__) {
    if (isMock('DistributionController', 'getPerformanceByInviteedId')) {
      return Promise.resolve(
        require('./mock/DistributionController.json')
          .DistributionRecordByInviteeIdResponse || {},
      );
    }
  }

  let result = await sdk.get<DistributionRecordByInviteeIdResponse>(
    '/distribute/sales/performance',

    {},
  );
  return result.context;
}

/**
 *
 * 查询分销设置信息
 *
 */
async function getSetting(
  request: IGetSettingRequestReq,
): Promise<DistributionSimSettingResponse> {
  if (__DEV__) {
    if (isMock('DistributionController', 'getSetting')) {
      return Promise.resolve(
        require('./mock/DistributionController.json')
          .DistributionSimSettingResponse || {},
      );
    }
  }

  let result = await sdk.post<DistributionSimSettingResponse>(
    '/distribute/setting',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 查询分销设置和邀请人信息
 *
 */
async function getSettingAndInvitor(): Promise<DistributionSimSettingResponse> {
  if (__DEV__) {
    if (isMock('DistributionController', 'getSettingAndInvitor')) {
      return Promise.resolve(
        require('./mock/DistributionController.json')
          .DistributionSimSettingResponse || {},
      );
    }
  }

  let result = await sdk.get<DistributionSimSettingResponse>(
    '/distribute/setting-invitor',

    {},
  );
  return result.context;
}

/**
 *
 * 开店礼包
 *
 */
async function storeBags(): Promise<DistributionSetting4StoreBagsResponse> {
  if (__DEV__) {
    if (isMock('DistributionController', 'storeBags')) {
      return Promise.resolve(
        require('./mock/DistributionController.json')
          .DistributionSetting4StoreBagsResponse || {},
      );
    }
  }

  let result = await sdk.post<DistributionSetting4StoreBagsResponse>(
    '/distribute/storeBags',

    {},
  );
  return result.context;
}

/**
 *
 * 验证开店礼包商品状态
 *
 */
async function verifyStoreBagsSku(
  goodsInfoId: IVerifyStoreBagsSkuGoodsInfoIdReq,
): Promise<DistributionSetting4StoreBagsVerifyResponse> {
  if (__DEV__) {
    if (isMock('DistributionController', 'verifyStoreBagsSku')) {
      return Promise.resolve(
        require('./mock/DistributionController.json')
          .DistributionSetting4StoreBagsVerifyResponse || {},
      );
    }
  }

  let result = await sdk.get<DistributionSetting4StoreBagsVerifyResponse>(
    '/distribute/verify/storeBags/sku/{goodsInfoId}'.replace(
      '{goodsInfoId}',
      goodsInfoId + '',
    ),

    {},
  );
  return result.context;
}

export default {
  loginIsDistributor,

  checkStatus,

  queryDistributorInfoByCustomerId,

  getDistributorStatus,

  queryOpenFlag,

  getPerformanceByInviteedId,

  getSetting,

  getSettingAndInvitor,

  storeBags,

  verifyStoreBagsSku,
};

/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type Undefined = number;
/**
 * 商品Id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IVerifyStoreBagsSkuGoodsInfoIdReq".
 */
export type IVerifyStoreBagsSkuGoodsInfoIdReq = string;

export interface IgnoreType {
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
 * via the `definition` "BaseResponse«DistributionCustomerByCustomerIdResponse»".
 */
export interface BaseResponseDistributionCustomerByCustomerIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DistributionCustomerByCustomerIdResponse;
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
export interface DistributionCustomerByCustomerIdResponse {
  distributionCustomerVO?: DistributionCustomerVO;
  [k: string]: any;
}
/**
 * 分销员信息
 */
export interface DistributionCustomerVO {
  /**
   * 分销佣金(元)
   */
  commission?: number;
  /**
   * 未入账分销佣金(元)
   */
  commissionNotRecorded?: number;
  /**
   * 佣金总额(元)
   */
  commissionTotal?: number;
  /**
   * 创建人(后台新增分销员)
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员登录账号|手机号
   */
  customerAccount?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 分销员标识UUID
   */
  distributionId?: string;
  /**
   * 分销订单(笔)
   */
  distributionTradeCount?: number;
  /**
   * 是否有分销员资格0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  distributorFlag?: 0 | 1;
  /**
   * 分销员等级ID
   */
  distributorLevelId?: string;
  /**
   * 分销员等级名称
   */
  distributorLevelName?: string;
  /**
   * 是否禁止分销 0: 启用中  1：禁用中
   * * NO: 否
   * * YES: 是
   */
  forbiddenFlag?: 0 | 1;
  /**
   * 禁用原因
   */
  forbiddenReason?: string;
  /**
   * 会员头像
   */
  headImg?: string;
  /**
   * 有效邀新人数
   */
  inviteAvailableCount?: number;
  /**
   * 邀请码
   */
  inviteCode?: string;
  /**
   * 邀新人数
   */
  inviteCount?: number;
  /**
   * 邀请人会员ID集合，后期可扩展N级
   */
  inviteCustomerIds?: string;
  /**
   * 邀新奖金(元)
   */
  rewardCash?: number;
  /**
   * 未入账邀新奖金(元)
   */
  rewardCashNotRecorded?: number;
  /**
   * 销售额(元)
   */
  sales?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionCustomerByCustomerIdResponse".
 */
export interface DistributionCustomerByCustomerIdResponse1 {
  distributionCustomerVO?: DistributionCustomerVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionCustomerVO".
 */
export interface DistributionCustomerVO1 {
  /**
   * 分销佣金(元)
   */
  commission?: number;
  /**
   * 未入账分销佣金(元)
   */
  commissionNotRecorded?: number;
  /**
   * 佣金总额(元)
   */
  commissionTotal?: number;
  /**
   * 创建人(后台新增分销员)
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员登录账号|手机号
   */
  customerAccount?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 是否删除标志 0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 分销员标识UUID
   */
  distributionId?: string;
  /**
   * 分销订单(笔)
   */
  distributionTradeCount?: number;
  /**
   * 是否有分销员资格0：否，1：是
   * * NO: 否
   * * YES: 是
   */
  distributorFlag?: 0 | 1;
  /**
   * 分销员等级ID
   */
  distributorLevelId?: string;
  /**
   * 分销员等级名称
   */
  distributorLevelName?: string;
  /**
   * 是否禁止分销 0: 启用中  1：禁用中
   * * NO: 否
   * * YES: 是
   */
  forbiddenFlag?: 0 | 1;
  /**
   * 禁用原因
   */
  forbiddenReason?: string;
  /**
   * 会员头像
   */
  headImg?: string;
  /**
   * 有效邀新人数
   */
  inviteAvailableCount?: number;
  /**
   * 邀请码
   */
  inviteCode?: string;
  /**
   * 邀新人数
   */
  inviteCount?: number;
  /**
   * 邀请人会员ID集合，后期可扩展N级
   */
  inviteCustomerIds?: string;
  /**
   * 邀新奖金(元)
   */
  rewardCash?: number;
  /**
   * 未入账邀新奖金(元)
   */
  rewardCashNotRecorded?: number;
  /**
   * 销售额(元)
   */
  sales?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«DistributionCustomerEnableByCustomerIdResponse»".
 */
export interface BaseResponseDistributionCustomerEnableByCustomerIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DistributionCustomerEnableByCustomerIdResponse;
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
export interface DistributionCustomerEnableByCustomerIdResponse {
  /**
   * 分销状态是否正常
   */
  distributionEnable?: boolean;
  /**
   * 禁用原因
   */
  forbiddenReason?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionCustomerEnableByCustomerIdResponse".
 */
export interface DistributionCustomerEnableByCustomerIdResponse1 {
  /**
   * 分销状态是否正常
   */
  distributionEnable?: boolean;
  /**
   * 禁用原因
   */
  forbiddenReason?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«int»".
 */
export interface BaseResponseInt {
  /**
   * 结果码
   */
  code: string;
  /**
   * 内容
   */
  context?: number;
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
 * via the `definition` "BaseResponse«DistributionRecordByInviteeIdResponse»".
 */
export interface BaseResponseDistributionRecordByInviteeIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DistributionRecordByInviteeIdResponse;
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
export interface DistributionRecordByInviteeIdResponse {
  /**
   * 本月预估收益
   */
  monthEstimatedReturn?: number;
  /**
   * 本月销售额
   */
  monthSales?: number;
  /**
   * 昨日预估收益
   */
  yesterdayEstimatedReturn?: number;
  /**
   * 昨日销售额
   */
  yesterdaySales?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionRecordByInviteeIdResponse".
 */
export interface DistributionRecordByInviteeIdResponse1 {
  /**
   * 本月预估收益
   */
  monthEstimatedReturn?: number;
  /**
   * 本月销售额
   */
  monthSales?: number;
  /**
   * 昨日预估收益
   */
  yesterdayEstimatedReturn?: number;
  /**
   * 昨日销售额
   */
  yesterdaySales?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionSettingByDistributorIdRequest".
 */
export interface DistributionSettingByDistributorIdRequest {
  /**
   * 邀请人id
   */
  inviteeId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«DistributionSimSettingResponse»".
 */
export interface BaseResponseDistributionSimSettingResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DistributionSimSettingResponse;
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
export interface DistributionSimSettingResponse {
  distributionCustomerSimVO?: DistributionCustomerSimVO;
  distributionSettingSimVO?: DistributionSettingSimVO;
  [k: string]: any;
}
export interface DistributionCustomerSimVO {
  /**
   * 分销员标识UUID
   */
  customerDetailId?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 分销员ID
   */
  distributionId?: string;
  /**
   * 是否为分销员
   * * NO: 否
   * * YES: 是
   */
  distributorFlag?: 0 | 1;
  /**
   * 分销员等级规则说明
   */
  distributorLevelDesc?: string;
  /**
   * 分销员等级ID
   */
  distributorLevelId?: string;
  /**
   * 是否被禁用
   * * NO: 否
   * * YES: 是
   */
  forbiddenFlag?: 0 | 1;
  [k: string]: any;
}
export interface DistributionSettingSimVO {
  /**
   * 申请入口是否开启
   * * NO: 否
   * * YES: 是
   */
  applyFlag?: 0 | 1;
  /**
   * 申请条件
   * * BUY: 0：购买商品
   * * REGISTER: 1：邀请注册
   */
  applyType?: 0 | 1;
  /**
   * 购买商品时招募入口海报
   */
  buyRecruitEnterImg?: string;
  /**
   * 分销员等级规则
   */
  distributorLevelDesc?: string;
  /**
   * 分销员名称
   */
  distributorName?: string;
  /**
   * 邀新入口海报
   */
  inviteEnterImg?: string;
  /**
   * 是否开启邀新奖励
   * * NO: 否
   * * YES: 是
   */
  inviteFlag?: 0 | 1;
  /**
   * 邀请注册时招募入口海报
   */
  inviteRecruitEnterImg?: string;
  /**
   * 邀请注册时招募落地页海报
   */
  inviteRecruitImg?: string;
  /**
   * 是否开启社交分销
   * * NO: 否
   * * YES: 是
   */
  openFlag?: 0 | 1;
  /**
   * 分销业绩规则说明
   */
  performanceDesc?: string;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 是否开启分销小店
   * * NO: 否
   * * YES: 是
   */
  shopOpenFlag?: 0 | 1;
  /**
   * 店铺分享图片
   */
  shopShareImg?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionSimSettingResponse".
 */
export interface DistributionSimSettingResponse1 {
  distributionCustomerSimVO?: DistributionCustomerSimVO;
  distributionSettingSimVO?: DistributionSettingSimVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionCustomerSimVO".
 */
export interface DistributionCustomerSimVO1 {
  /**
   * 分销员标识UUID
   */
  customerDetailId?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 分销员ID
   */
  distributionId?: string;
  /**
   * 是否为分销员
   * * NO: 否
   * * YES: 是
   */
  distributorFlag?: 0 | 1;
  /**
   * 分销员等级规则说明
   */
  distributorLevelDesc?: string;
  /**
   * 分销员等级ID
   */
  distributorLevelId?: string;
  /**
   * 是否被禁用
   * * NO: 否
   * * YES: 是
   */
  forbiddenFlag?: 0 | 1;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionSettingSimVO".
 */
export interface DistributionSettingSimVO1 {
  /**
   * 申请入口是否开启
   * * NO: 否
   * * YES: 是
   */
  applyFlag?: 0 | 1;
  /**
   * 申请条件
   * * BUY: 0：购买商品
   * * REGISTER: 1：邀请注册
   */
  applyType?: 0 | 1;
  /**
   * 购买商品时招募入口海报
   */
  buyRecruitEnterImg?: string;
  /**
   * 分销员等级规则
   */
  distributorLevelDesc?: string;
  /**
   * 分销员名称
   */
  distributorName?: string;
  /**
   * 邀新入口海报
   */
  inviteEnterImg?: string;
  /**
   * 是否开启邀新奖励
   * * NO: 否
   * * YES: 是
   */
  inviteFlag?: 0 | 1;
  /**
   * 邀请注册时招募入口海报
   */
  inviteRecruitEnterImg?: string;
  /**
   * 邀请注册时招募落地页海报
   */
  inviteRecruitImg?: string;
  /**
   * 是否开启社交分销
   * * NO: 否
   * * YES: 是
   */
  openFlag?: 0 | 1;
  /**
   * 分销业绩规则说明
   */
  performanceDesc?: string;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 是否开启分销小店
   * * NO: 否
   * * YES: 是
   */
  shopOpenFlag?: 0 | 1;
  /**
   * 店铺分享图片
   */
  shopShareImg?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«DistributionSetting4StoreBagsResponse»".
 */
export interface BaseResponseDistributionSetting4StoreBagsResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DistributionSetting4StoreBagsResponse;
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
export interface DistributionSetting4StoreBagsResponse {
  /**
   * 是否开启申请入口
   * * NO: 否
   * * YES: 是
   */
  applyFlag?: 0 | 1;
  /**
   * 申请条件
   * * BUY: 0：购买商品
   * * REGISTER: 1：邀请注册
   */
  applyType?: 0 | 1;
  /**
   * 礼包商品列表
   */
  goodsInfos?: GoodsInfoVO[];
  /**
   * 是否开启社交分销
   * * NO: 否
   * * YES: 是
   */
  openFlag?: 0 | 1;
  /**
   * 招募规则说明
   */
  recruitDesc?: string;
  /**
   * 招募海报
   */
  recruitImg?: string;
  [k: string]: any;
}
export interface GoodsInfoVO {
  /**
   * 上下架状态
   * * NO: 0: 未上架
   * * YES: 1: 已上架
   * * PART: 2: 部分上架
   */
  addedFlag?: number;
  /**
   * 上下架时间
   */
  addedTime?: string;
  /**
   * 是否允许独立设价
   * * NO: 否
   * * YES: 是
   */
  allowPriceSet?: number;
  /**
   * 是否独立设价
   */
  aloneFlag?: boolean;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: 0 | 1 | 2 | 3;
  /**
   * 品牌ID
   */
  brandId?: number;
  /**
   * 购买量
   */
  buyCount?: number;
  /**
   * 商品分类ID
   */
  cateId?: number;
  /**
   * 前端是否选中
   */
  checked?: boolean;
  /**
   * 佣金比例
   */
  commissionRate?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 商品成本价
   */
  costPrice?: number;
  /**
   * 最新计算的起订量
   */
  count?: number;
  /**
   * 优惠券标签
   */
  couponLabels?: CouponLabelVO[];
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 按客户单独定价
   * * NO: 否
   * * YES: 是
   */
  customFlag?: number;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 预估佣金
   */
  distributionCommission?: number;
  /**
   * 分销商品审核状态
   * * COMMON_GOODS: 0：普通商品
   * * WAIT_CHECK: 1：待审核
   * * CHECKED: 2：已审核通过
   * * NOT_PASS: 3：审核不通过
   * * FORBID: 4：禁止分销
   */
  distributionGoodsAudit?: 0 | 1 | 2 | 3 | 4;
  /**
   * 分销商品审核不通过或禁止分销原因
   */
  distributionGoodsAuditReason?: string;
  /**
   * 分销销量
   */
  distributionSalesCount?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  goods?: GoodsVO;
  /**
   * 商品收藏量
   */
  goodsCollectNum?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品评论数
   */
  goodsEvaluateNum?: number;
  /**
   * 商品好评数
   */
  goodsFavorableCommentNum?: number;
  /**
   * 商品编号
   */
  goodsId?: string;
  /**
   * 商品条形码
   */
  goodsInfoBarcode?: string;
  /**
   * 商品SKU编号
   */
  goodsInfoId?: string;
  /**
   * 商品图片
   */
  goodsInfoImg?: string;
  /**
   * 商品SKU名称
   */
  goodsInfoName?: string;
  /**
   * 商品SKU编码
   */
  goodsInfoNo?: string;
  /**
   * 商品销量
   */
  goodsSalesNum?: number;
  /**
   * 商品状态
   * * OK:  0：正常
   * * OUT_STOCK: 1：缺货
   * * INVALID: 2：失效
   */
  goodsStatus?: 0 | 1 | 2;
  /**
   * 计算单位
   */
  goodsUnit?: string;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  grouponLabel?: GrouponLabelVO;
  /**
   * 拼团价
   */
  grouponPrice?: number;
  /**
   * 最大区间价
   */
  intervalMaxPrice?: number;
  /**
   * 最小区间价
   */
  intervalMinPrice?: number;
  /**
   * 一对多关系，多个订货区间价格编号
   */
  intervalPriceIds?: number[];
  /**
   * 是否已关联分销员，0：否，1：是
   */
  joinDistributior?: number;
  /**
   * 是否叠加客户等级折扣
   * * NO: 否
   * * YES: 是
   */
  levelDiscountFlag?: number;
  /**
   * 商品市场价
   */
  marketPrice?: number;
  /**
   * 促销标签
   */
  marketingLabels?: MarketingLabelVO[];
  /**
   * 最新计算的限定量
   */
  maxCount?: number;
  /**
   * 新增时，模拟多个规格值 ID
   */
  mockSpecDetailIds?: number[];
  /**
   * 新增时，模拟多个规格ID
   */
  mockSpecIds?: number[];
  /**
   * 设价类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  priceType?: number;
  /**
   * 最新计算的会员价
   */
  salePrice?: number;
  /**
   * 销售类型
   * * WHOLESALE: 0：批发
   * * RETAIL: 1: 零售
   */
  saleType?: number;
  /**
   * 商品详情小程序码
   */
  smallProgramCode?: string;
  /**
   * 商品分页，扁平化多个商品规格值ID
   */
  specDetailRelIds?: number[];
  /**
   * 规格名称规格值
   */
  specText?: string;
  /**
   * 商品库存
   */
  stock?: number;
  /**
   * 多对多关系，多个店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 有效状态
   * * NO: 否
   * * YES: 是
   */
  validFlag?: number;
  [k: string]: any;
}
export interface CouponLabelVO {
  /**
   * 优惠券活动Id
   */
  couponActivityId?: string;
  /**
   * 促销描述
   */
  couponDesc?: string;
  /**
   * 优惠券Id
   */
  couponInfoId?: string;
  [k: string]: any;
}
export interface GoodsVO {
  /**
   * 上下架状态
   * * NO: 0: 未上架
   * * YES: 1: 已上架
   * * PART: 2: 部分上架
   */
  addedFlag?: number;
  /**
   * 上下架时间
   */
  addedTime?: string;
  /**
   * 订货量设价时,是否允许sku独立设阶梯价
   * * NO: 否
   * * YES: 是
   */
  allowPriceSet?: number;
  /**
   * 审核驳回原因
   */
  auditReason?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: 0 | 1 | 2 | 3;
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 成本价
   */
  costPrice?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否按客户单独定价
   * * NO: 否
   * * YES: 是
   */
  customFlag?: number;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 运费模板名称
   */
  freightTempName?: string;
  /**
   * 商品收藏量
   */
  goodsCollectNum?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品详情
   */
  goodsDetail?: string;
  /**
   * 商品评论数
   */
  goodsEvaluateNum?: number;
  /**
   * 商品好评数
   */
  goodsFavorableCommentNum?: number;
  /**
   * 商品编号，采用UUID
   */
  goodsId?: string;
  /**
   * 商品主图
   */
  goodsImg?: string;
  /**
   * 一对多关系，多个SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 商品移动端详情
   */
  goodsMobileDetail?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * SPU编码
   */
  goodsNo?: string;
  /**
   * 商品销量
   */
  goodsSalesNum?: number;
  /**
   * 商品副标题
   */
  goodsSubtitle?: string;
  /**
   * 计量单位
   */
  goodsUnit?: string;
  /**
   * 商品视频地址
   */
  goodsVideo?: string;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否禁止在新增拼团活动时选择
   */
  grouponForbiddenFlag?: boolean;
  /**
   * 是否叠加客户等级折扣
   * * NO: 否
   * * YES: 是
   */
  levelDiscountFlag?: number;
  /**
   * 划线价格
   */
  linePrice?: number;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 是否多规格标记
   * * NO: 否
   * * YES: 是
   */
  moreSpecFlag?: number;
  /**
   * 设价类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  priceType?: number;
  /**
   * 销售类别
   * * WHOLESALE: 0：批发
   * * RETAIL: 1: 零售
   */
  saleType?: number;
  /**
   * 库存，根据相关所有SKU库存来合计
   */
  stock?: number;
  /**
   * 多对多关系，多个店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 提交审核时间
   */
  submitTime?: string;
  /**
   * 公司名称
   */
  supplierName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 促销标签
 */
export interface GrouponLabelVO {
  /**
   * 营销编号
   */
  grouponActivityId?: string;
  /**
   * 促销描述
   */
  marketingDesc?: string;
  [k: string]: any;
}
export interface MarketingLabelVO {
  /**
   * 促销描述
   */
  marketingDesc?: string;
  /**
   * 营销编号
   */
  marketingId?: number;
  /**
   * 促销类型
   * * REDUCTION: 满减
   * * DISCOUNT: 满折
   * * GIFT: 满赠
   */
  marketingType?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionSetting4StoreBagsResponse".
 */
export interface DistributionSetting4StoreBagsResponse1 {
  /**
   * 是否开启申请入口
   * * NO: 否
   * * YES: 是
   */
  applyFlag?: 0 | 1;
  /**
   * 申请条件
   * * BUY: 0：购买商品
   * * REGISTER: 1：邀请注册
   */
  applyType?: 0 | 1;
  /**
   * 礼包商品列表
   */
  goodsInfos?: GoodsInfoVO[];
  /**
   * 是否开启社交分销
   * * NO: 否
   * * YES: 是
   */
  openFlag?: 0 | 1;
  /**
   * 招募规则说明
   */
  recruitDesc?: string;
  /**
   * 招募海报
   */
  recruitImg?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsInfoVO".
 */
export interface GoodsInfoVO1 {
  /**
   * 上下架状态
   * * NO: 0: 未上架
   * * YES: 1: 已上架
   * * PART: 2: 部分上架
   */
  addedFlag?: number;
  /**
   * 上下架时间
   */
  addedTime?: string;
  /**
   * 是否允许独立设价
   * * NO: 否
   * * YES: 是
   */
  allowPriceSet?: number;
  /**
   * 是否独立设价
   */
  aloneFlag?: boolean;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: 0 | 1 | 2 | 3;
  /**
   * 品牌ID
   */
  brandId?: number;
  /**
   * 购买量
   */
  buyCount?: number;
  /**
   * 商品分类ID
   */
  cateId?: number;
  /**
   * 前端是否选中
   */
  checked?: boolean;
  /**
   * 佣金比例
   */
  commissionRate?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 商品成本价
   */
  costPrice?: number;
  /**
   * 最新计算的起订量
   */
  count?: number;
  /**
   * 优惠券标签
   */
  couponLabels?: CouponLabelVO[];
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 按客户单独定价
   * * NO: 否
   * * YES: 是
   */
  customFlag?: number;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 预估佣金
   */
  distributionCommission?: number;
  /**
   * 分销商品审核状态
   * * COMMON_GOODS: 0：普通商品
   * * WAIT_CHECK: 1：待审核
   * * CHECKED: 2：已审核通过
   * * NOT_PASS: 3：审核不通过
   * * FORBID: 4：禁止分销
   */
  distributionGoodsAudit?: 0 | 1 | 2 | 3 | 4;
  /**
   * 分销商品审核不通过或禁止分销原因
   */
  distributionGoodsAuditReason?: string;
  /**
   * 分销销量
   */
  distributionSalesCount?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  goods?: GoodsVO;
  /**
   * 商品收藏量
   */
  goodsCollectNum?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品评论数
   */
  goodsEvaluateNum?: number;
  /**
   * 商品好评数
   */
  goodsFavorableCommentNum?: number;
  /**
   * 商品编号
   */
  goodsId?: string;
  /**
   * 商品条形码
   */
  goodsInfoBarcode?: string;
  /**
   * 商品SKU编号
   */
  goodsInfoId?: string;
  /**
   * 商品图片
   */
  goodsInfoImg?: string;
  /**
   * 商品SKU名称
   */
  goodsInfoName?: string;
  /**
   * 商品SKU编码
   */
  goodsInfoNo?: string;
  /**
   * 商品销量
   */
  goodsSalesNum?: number;
  /**
   * 商品状态
   * * OK:  0：正常
   * * OUT_STOCK: 1：缺货
   * * INVALID: 2：失效
   */
  goodsStatus?: 0 | 1 | 2;
  /**
   * 计算单位
   */
  goodsUnit?: string;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  grouponLabel?: GrouponLabelVO;
  /**
   * 拼团价
   */
  grouponPrice?: number;
  /**
   * 最大区间价
   */
  intervalMaxPrice?: number;
  /**
   * 最小区间价
   */
  intervalMinPrice?: number;
  /**
   * 一对多关系，多个订货区间价格编号
   */
  intervalPriceIds?: number[];
  /**
   * 是否已关联分销员，0：否，1：是
   */
  joinDistributior?: number;
  /**
   * 是否叠加客户等级折扣
   * * NO: 否
   * * YES: 是
   */
  levelDiscountFlag?: number;
  /**
   * 商品市场价
   */
  marketPrice?: number;
  /**
   * 促销标签
   */
  marketingLabels?: MarketingLabelVO[];
  /**
   * 最新计算的限定量
   */
  maxCount?: number;
  /**
   * 新增时，模拟多个规格值 ID
   */
  mockSpecDetailIds?: number[];
  /**
   * 新增时，模拟多个规格ID
   */
  mockSpecIds?: number[];
  /**
   * 设价类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  priceType?: number;
  /**
   * 最新计算的会员价
   */
  salePrice?: number;
  /**
   * 销售类型
   * * WHOLESALE: 0：批发
   * * RETAIL: 1: 零售
   */
  saleType?: number;
  /**
   * 商品详情小程序码
   */
  smallProgramCode?: string;
  /**
   * 商品分页，扁平化多个商品规格值ID
   */
  specDetailRelIds?: number[];
  /**
   * 规格名称规格值
   */
  specText?: string;
  /**
   * 商品库存
   */
  stock?: number;
  /**
   * 多对多关系，多个店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 有效状态
   * * NO: 否
   * * YES: 是
   */
  validFlag?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponLabelVO".
 */
export interface CouponLabelVO1 {
  /**
   * 优惠券活动Id
   */
  couponActivityId?: string;
  /**
   * 促销描述
   */
  couponDesc?: string;
  /**
   * 优惠券Id
   */
  couponInfoId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsVO".
 */
export interface GoodsVO1 {
  /**
   * 上下架状态
   * * NO: 0: 未上架
   * * YES: 1: 已上架
   * * PART: 2: 部分上架
   */
  addedFlag?: number;
  /**
   * 上下架时间
   */
  addedTime?: string;
  /**
   * 订货量设价时,是否允许sku独立设阶梯价
   * * NO: 否
   * * YES: 是
   */
  allowPriceSet?: number;
  /**
   * 审核驳回原因
   */
  auditReason?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: 0 | 1 | 2 | 3;
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 公司信息ID
   */
  companyInfoId?: number;
  /**
   * 商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 成本价
   */
  costPrice?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否按客户单独定价
   * * NO: 否
   * * YES: 是
   */
  customFlag?: number;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 运费模板名称
   */
  freightTempName?: string;
  /**
   * 商品收藏量
   */
  goodsCollectNum?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品详情
   */
  goodsDetail?: string;
  /**
   * 商品评论数
   */
  goodsEvaluateNum?: number;
  /**
   * 商品好评数
   */
  goodsFavorableCommentNum?: number;
  /**
   * 商品编号，采用UUID
   */
  goodsId?: string;
  /**
   * 商品主图
   */
  goodsImg?: string;
  /**
   * 一对多关系，多个SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 商品移动端详情
   */
  goodsMobileDetail?: string;
  /**
   * 商品名称
   */
  goodsName?: string;
  /**
   * SPU编码
   */
  goodsNo?: string;
  /**
   * 商品销量
   */
  goodsSalesNum?: number;
  /**
   * 商品副标题
   */
  goodsSubtitle?: string;
  /**
   * 计量单位
   */
  goodsUnit?: string;
  /**
   * 商品视频地址
   */
  goodsVideo?: string;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否禁止在新增拼团活动时选择
   */
  grouponForbiddenFlag?: boolean;
  /**
   * 是否叠加客户等级折扣
   * * NO: 否
   * * YES: 是
   */
  levelDiscountFlag?: number;
  /**
   * 划线价格
   */
  linePrice?: number;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 是否多规格标记
   * * NO: 否
   * * YES: 是
   */
  moreSpecFlag?: number;
  /**
   * 设价类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  priceType?: number;
  /**
   * 销售类别
   * * WHOLESALE: 0：批发
   * * RETAIL: 1: 零售
   */
  saleType?: number;
  /**
   * 库存，根据相关所有SKU库存来合计
   */
  stock?: number;
  /**
   * 多对多关系，多个店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 提交审核时间
   */
  submitTime?: string;
  /**
   * 公司名称
   */
  supplierName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GrouponLabelVO".
 */
export interface GrouponLabelVO1 {
  /**
   * 营销编号
   */
  grouponActivityId?: string;
  /**
   * 促销描述
   */
  marketingDesc?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MarketingLabelVO".
 */
export interface MarketingLabelVO1 {
  /**
   * 促销描述
   */
  marketingDesc?: string;
  /**
   * 营销编号
   */
  marketingId?: number;
  /**
   * 促销类型
   * * REDUCTION: 满减
   * * DISCOUNT: 满折
   * * GIFT: 满赠
   */
  marketingType?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«DistributionSetting4StoreBagsVerifyResponse»".
 */
export interface BaseResponseDistributionSetting4StoreBagsVerifyResponse {
  /**
   * 结果码
   */
  code: string;
  context?: DistributionSetting4StoreBagsVerifyResponse;
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
export interface DistributionSetting4StoreBagsVerifyResponse {
  /**
   * 验证开店礼包商品状态
   */
  result?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributionSetting4StoreBagsVerifyResponse".
 */
export interface DistributionSetting4StoreBagsVerifyResponse1 {
  /**
   * 验证开店礼包商品状态
   */
  result?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetSettingRequestReq".
 */
export interface IGetSettingRequestReq {
  /**
   * 邀请人id
   */
  inviteeId?: string;
  [k: string]: any;
}
