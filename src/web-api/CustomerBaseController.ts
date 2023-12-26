import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerBaseController';

/**
 *
 * 验证token
 *
 */
async function checkToken(): Promise<unknown> {
  if (__DEV__) {
    if (isMock('CustomerBaseController', 'checkToken')) {
      return Promise.resolve(
        require('./mock/CustomerBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.get(
    '/customer/check-token',

    {},
  );
  return result.context;
}

/**
 *
 * 查询会员基本信息数据
 *
 */
async function findCustomerBaseInfo(): Promise<CustomerBaseInfoResponse> {
  if (__DEV__) {
    if (isMock('CustomerBaseController', 'findCustomerBaseInfo')) {
      return Promise.resolve(
        require('./mock/CustomerBaseController.json')
          .CustomerBaseInfoResponse || {},
      );
    }
  }

  let result = await sdk.get<CustomerBaseInfoResponse>(
    '/customer/customerBase',

    {},
  );
  return result.context;
}

/**
 *
 * 修改会员基本信息
 *
 */
async function updateCustomerBaseInfo(
  customerEditRequest: IUpdateCustomerBaseInfoCustomerEditRequestReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('CustomerBaseController', 'updateCustomerBaseInfo')) {
      return Promise.resolve(
        require('./mock/CustomerBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.put(
    '/customer/customerBase',

    {
      ...customerEditRequest,
    },
  );
  return result.context;
}

/**
 *
 * 查询会员中心主页面数据
 *
 */
async function findCustomerCenterInfo(): Promise<CustomerCenterResponse> {
  if (__DEV__) {
    if (isMock('CustomerBaseController', 'findCustomerCenterInfo')) {
      return Promise.resolve(
        require('./mock/CustomerBaseController.json').CustomerCenterResponse ||
          {},
      );
    }
  }

  let result = await sdk.get<CustomerCenterResponse>(
    '/customer/customerCenter',

    {},
  );
  return result.context;
}

/**
 *
 * 根据用户ID查询用户详情
 *
 */
async function getCustomerBaseInfo(
  customerId: IGetCustomerBaseInfoCustomerIdReq,
): Promise<CustomerDetailVO> {
  if (__DEV__) {
    if (isMock('CustomerBaseController', 'getCustomerBaseInfo')) {
      return Promise.resolve(
        require('./mock/CustomerBaseController.json').CustomerDetailVO || {},
      );
    }
  }

  let result = await sdk.get<CustomerDetailVO>(
    '/customer/customerInfoById/{customerId}'.replace(
      '{customerId}',
      customerId + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 会员中心查询会员绑定的手机号
 *
 */
async function findCustomerMobile(): Promise<CustomerSafeResponse> {
  if (__DEV__) {
    if (isMock('CustomerBaseController', 'findCustomerMobile')) {
      return Promise.resolve(
        require('./mock/CustomerBaseController.json').CustomerSafeResponse ||
          {},
      );
    }
  }

  let result = await sdk.get<CustomerSafeResponse>(
    '/customer/customerMobile',

    {},
  );
  return result.context;
}

/**
 *
 * 会员中心 修改绑定手机号 给原号码发送验证码
 *
 */
async function sendVerifiedCode(
  customerAccount: ISendVerifiedCodeCustomerAccountReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('CustomerBaseController', 'sendVerifiedCode')) {
      return Promise.resolve(
        require('./mock/CustomerBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.post(
    '/customer/customerVerified/{customerAccount}'.replace(
      '{customerAccount}',
      customerAccount + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 获取当前登录人信息
 *
 */
async function getLoginCustomerInfo(): Promise<CustomerGetByIdResponse> {
  if (__DEV__) {
    if (isMock('CustomerBaseController', 'getLoginCustomerInfo')) {
      return Promise.resolve(
        require('./mock/CustomerBaseController.json').CustomerGetByIdResponse ||
          {},
      );
    }
  }

  let result = await sdk.get<CustomerGetByIdResponse>(
    '/customer/getLoginCustomerInfo',

    {},
  );
  return result.context;
}

/**
 *
 * 会员中心 修改绑定手机号 发送验证码给新手机号
 *
 */
async function sendVerifiedCodeNew(
  customerAccount: ISendVerifiedCodeNewCustomerAccountReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('CustomerBaseController', 'sendVerifiedCodeNew')) {
      return Promise.resolve(
        require('./mock/CustomerBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.post(
    '/customer/newCustomerVerified/{customerAccount}'.replace(
      '{customerAccount}',
      customerAccount + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 会员中心 修改绑定手机号
 *
 */
async function changeNewMobile(
  mobileRequest: IChangeNewMobileMobileRequestReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('CustomerBaseController', 'changeNewMobile')) {
      return Promise.resolve(
        require('./mock/CustomerBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.post(
    '/customer/newMobileCode',

    {
      ...mobileRequest,
    },
  );
  return result.context;
}

/**
 *
 * 会员中心 修改绑定手机号 验证原号码发送的验证码
 *
 */
async function validateVerifiedCode(
  mobileRequest: IValidateVerifiedCodeMobileRequestReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('CustomerBaseController', 'validateVerifiedCode')) {
      return Promise.resolve(
        require('./mock/CustomerBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.post<unknown>(
    '/customer/oldMobileCode',

    {
      ...mobileRequest,
    },
  );
  return result.context;
}

export default {
  checkToken,

  findCustomerBaseInfo,

  updateCustomerBaseInfo,

  findCustomerCenterInfo,

  getCustomerBaseInfo,

  findCustomerMobile,

  sendVerifiedCode,

  getLoginCustomerInfo,

  sendVerifiedCodeNew,

  changeNewMobile,

  validateVerifiedCode,
};

/**
 * 会员id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetCustomerBaseInfoCustomerIdReq".
 */
export type IGetCustomerBaseInfoCustomerIdReq = string;
/**
 * 会员账户
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISendVerifiedCodeCustomerAccountReq".
 */
export type ISendVerifiedCodeCustomerAccountReq = string;
/**
 * 会员账户
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISendVerifiedCodeNewCustomerAccountReq".
 */
export type ISendVerifiedCodeNewCustomerAccountReq = string;
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type Undefined = string;

export interface IgnoreType {
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
 * via the `definition` "BaseResponse«CustomerBaseInfoResponse»".
 */
export interface BaseResponseCustomerBaseInfoResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerBaseInfoResponse;
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
export interface CustomerBaseInfoResponse {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 联系人名字
   */
  contactName?: string;
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 客户账号
   */
  customerAccount?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 账号
   */
  customerDetailId?: string;
  /**
   * 客户编号
   */
  customerId?: string;
  /**
   * 客户等级名称
   */
  customerLevelName?: string;
  /**
   * 客户名称
   */
  customerName?: string;
  /**
   * 业务员名称
   */
  employeeName?: string;
  /**
   * 省
   */
  provinceId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerBaseInfoResponse".
 */
export interface CustomerBaseInfoResponse1 {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 联系人名字
   */
  contactName?: string;
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 客户账号
   */
  customerAccount?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 账号
   */
  customerDetailId?: string;
  /**
   * 客户编号
   */
  customerId?: string;
  /**
   * 客户等级名称
   */
  customerLevelName?: string;
  /**
   * 客户名称
   */
  customerName?: string;
  /**
   * 业务员名称
   */
  employeeName?: string;
  /**
   * 省
   */
  provinceId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerBaseInfoRequest".
 */
export interface CustomerBaseInfoRequest {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 联系人名字
   */
  contactName?: string;
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 客户详情id
   */
  customerDetailId?: string;
  /**
   * 客户id
   */
  customerId?: string;
  /**
   * 客户名称
   */
  customerName?: string;
  /**
   * 省
   */
  provinceId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerCenterResponse»".
 */
export interface BaseResponseCustomerCenterResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerCenterResponse;
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
export interface CustomerCenterResponse {
  /**
   * 客户账号
   */
  customerAccount?: string;
  /**
   * 客户编号
   */
  customerId?: string;
  /**
   * 客户等级名称
   */
  customerLevelName?: string;
  /**
   * 客户名称
   */
  customerName?: string;
  /**
   * 客户成长值
   */
  growthValue?: number;
  /**
   * 客户头像
   */
  headImg?: string;
  /**
   * 可用积分
   */
  pointsAvailable?: number;
  /**
   * 已用积分
   */
  pointsUsed?: number;
  /**
   * 等级徽章图
   */
  rankBadgeImg?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerCenterResponse".
 */
export interface CustomerCenterResponse1 {
  /**
   * 客户账号
   */
  customerAccount?: string;
  /**
   * 客户编号
   */
  customerId?: string;
  /**
   * 客户等级名称
   */
  customerLevelName?: string;
  /**
   * 客户名称
   */
  customerName?: string;
  /**
   * 客户成长值
   */
  growthValue?: number;
  /**
   * 客户头像
   */
  headImg?: string;
  /**
   * 可用积分
   */
  pointsAvailable?: number;
  /**
   * 已用积分
   */
  pointsUsed?: number;
  /**
   * 等级徽章图
   */
  rankBadgeImg?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerDetailVO»".
 */
export interface BaseResponseCustomerDetailVO {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerDetailVO;
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
export interface CustomerDetailVO {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 联系人名字
   */
  contactName?: string;
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 会员详细信息标识UUID
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
   * 账号状态
   * * ENABLE: 0：启用中
   * * DISABLE: 1：禁用中
   */
  customerStatus?: 0 | 1;
  customerVO?: CustomerVO;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 负责业务员
   */
  employeeId?: string;
  /**
   * 禁用原因
   */
  forbidReason?: string;
  /**
   * 是否为分销员
   * * NO: 否
   * * YES: 是
   */
  isDistributor?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 审核驳回理由
   */
  rejectReason?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 会员信息
 */
export interface CustomerVO {
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  checkState?: 0 | 1 | 2;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建|注册时间
   */
  createTime?: string;
  /**
   * 账户
   */
  customerAccount?: string;
  customerDetail?: CustomerDetailVO1;
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 客户等级ID
   */
  customerLevelId?: number;
  /**
   * 密码
   */
  customerPassword?: string;
  /**
   * 支付密码
   */
  customerPayPassword?: string;
  /**
   * 盐值
   */
  customerSaltVal?: string;
  /**
   * 客户类型
   * * PLATFORM: 0:平台客户/0:店铺关联的客户
   * * SUPPLIER: 1:商家客户/1:店铺发展的客户
   */
  customerType?: 0 | 1;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  distributeChannel?: DistributeChannel;
  /**
   * 客户成长值
   */
  growthValue?: number;
  /**
   * 头像
   */
  headImg?: string;
  /**
   * 密码错误次数
   */
  loginErrorCount?: number;
  /**
   * 登录IP
   */
  loginIp?: string;
  /**
   * 锁定时间
   */
  loginLockTime?: string;
  /**
   * 登录时间
   */
  loginTime?: string;
  /**
   * 支付密码错误次数
   */
  payErrorTime?: number;
  /**
   * 支付锁定时间
   */
  payLockTime?: string;
  /**
   * 可用积分
   */
  pointsAvailable?: number;
  /**
   * 已用积分
   */
  pointsUsed?: number;
  /**
   * 密码安全等级
   */
  safeLevel?: number;
  /**
   * 连续签到天数
   */
  signContinuousDays?: number;
  /**
   * 商家和客户的关联关系
   */
  storeCustomerRelaListByAll?: StoreCustomerRelaVO[];
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 会员的详细信息
 */
export interface CustomerDetailVO1 {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 联系人名字
   */
  contactName?: string;
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 会员详细信息标识UUID
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
   * 账号状态
   * * ENABLE: 0：启用中
   * * DISABLE: 1：禁用中
   */
  customerStatus?: 0 | 1;
  customerVO?: CustomerVO;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 负责业务员
   */
  employeeId?: string;
  /**
   * 禁用原因
   */
  forbidReason?: string;
  /**
   * 是否为分销员
   * * NO: 否
   * * YES: 是
   */
  isDistributor?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 审核驳回理由
   */
  rejectReason?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 分销渠道信息
 */
export interface DistributeChannel {
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  [k: string]: any;
}
export interface StoreCustomerRelaVO {
  /**
   * 商家标识
   */
  companyInfoId?: number;
  /**
   * 用户标识
   */
  customerId?: string;
  /**
   * 关系类型
   * * PLATFORM: 0:平台客户/0:店铺关联的客户
   * * SUPPLIER: 1:商家客户/1:店铺发展的客户
   */
  customerType?: 0 | 1;
  /**
   * 负责的业务员标识
   */
  employeeId?: string;
  /**
   * 主键
   */
  id?: string;
  /**
   * 店铺标识
   */
  storeId?: number;
  /**
   * 店铺等级标识
   */
  storeLevelId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerDetailVO".
 */
export interface CustomerDetailVO2 {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 联系人名字
   */
  contactName?: string;
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 会员详细信息标识UUID
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
   * 账号状态
   * * ENABLE: 0：启用中
   * * DISABLE: 1：禁用中
   */
  customerStatus?: 0 | 1;
  customerVO?: CustomerVO;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 负责业务员
   */
  employeeId?: string;
  /**
   * 禁用原因
   */
  forbidReason?: string;
  /**
   * 是否为分销员
   * * NO: 否
   * * YES: 是
   */
  isDistributor?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 审核驳回理由
   */
  rejectReason?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerVO".
 */
export interface CustomerVO1 {
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  checkState?: 0 | 1 | 2;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建|注册时间
   */
  createTime?: string;
  /**
   * 账户
   */
  customerAccount?: string;
  customerDetail?: CustomerDetailVO1;
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 客户等级ID
   */
  customerLevelId?: number;
  /**
   * 密码
   */
  customerPassword?: string;
  /**
   * 支付密码
   */
  customerPayPassword?: string;
  /**
   * 盐值
   */
  customerSaltVal?: string;
  /**
   * 客户类型
   * * PLATFORM: 0:平台客户/0:店铺关联的客户
   * * SUPPLIER: 1:商家客户/1:店铺发展的客户
   */
  customerType?: 0 | 1;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  distributeChannel?: DistributeChannel;
  /**
   * 客户成长值
   */
  growthValue?: number;
  /**
   * 头像
   */
  headImg?: string;
  /**
   * 密码错误次数
   */
  loginErrorCount?: number;
  /**
   * 登录IP
   */
  loginIp?: string;
  /**
   * 锁定时间
   */
  loginLockTime?: string;
  /**
   * 登录时间
   */
  loginTime?: string;
  /**
   * 支付密码错误次数
   */
  payErrorTime?: number;
  /**
   * 支付锁定时间
   */
  payLockTime?: string;
  /**
   * 可用积分
   */
  pointsAvailable?: number;
  /**
   * 已用积分
   */
  pointsUsed?: number;
  /**
   * 密码安全等级
   */
  safeLevel?: number;
  /**
   * 连续签到天数
   */
  signContinuousDays?: number;
  /**
   * 商家和客户的关联关系
   */
  storeCustomerRelaListByAll?: StoreCustomerRelaVO[];
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DistributeChannel".
 */
export interface DistributeChannel1 {
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreCustomerRelaVO".
 */
export interface StoreCustomerRelaVO1 {
  /**
   * 商家标识
   */
  companyInfoId?: number;
  /**
   * 用户标识
   */
  customerId?: string;
  /**
   * 关系类型
   * * PLATFORM: 0:平台客户/0:店铺关联的客户
   * * SUPPLIER: 1:商家客户/1:店铺发展的客户
   */
  customerType?: 0 | 1;
  /**
   * 负责的业务员标识
   */
  employeeId?: string;
  /**
   * 主键
   */
  id?: string;
  /**
   * 店铺标识
   */
  storeId?: number;
  /**
   * 店铺等级标识
   */
  storeLevelId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerSafeResponse»".
 */
export interface BaseResponseCustomerSafeResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerSafeResponse;
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
export interface CustomerSafeResponse {
  /**
   * 会员账号，绑定手机号
   */
  customerAccount?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerSafeResponse".
 */
export interface CustomerSafeResponse1 {
  /**
   * 会员账号，绑定手机号
   */
  customerAccount?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerGetByIdResponse»".
 */
export interface BaseResponseCustomerGetByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerGetByIdResponse;
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
export interface CustomerGetByIdResponse {
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  checkState?: 0 | 1 | 2;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建|注册时间
   */
  createTime?: string;
  /**
   * 账户
   */
  customerAccount?: string;
  customerDetail?: CustomerDetailVO3;
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 客户等级ID
   */
  customerLevelId?: number;
  /**
   * 密码
   */
  customerPassword?: string;
  /**
   * 支付密码
   */
  customerPayPassword?: string;
  /**
   * 盐值
   */
  customerSaltVal?: string;
  /**
   * 客户类型
   * * PLATFORM: 0:平台客户/0:店铺关联的客户
   * * SUPPLIER: 1:商家客户/1:店铺发展的客户
   */
  customerType?: 0 | 1;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  distributeChannel?: DistributeChannel2;
  /**
   * 客户成长值
   */
  growthValue?: number;
  /**
   * 头像
   */
  headImg?: string;
  /**
   * 密码错误次数
   */
  loginErrorCount?: number;
  /**
   * 登录IP
   */
  loginIp?: string;
  /**
   * 锁定时间
   */
  loginLockTime?: string;
  /**
   * 登录时间
   */
  loginTime?: string;
  /**
   * 支付密码错误次数
   */
  payErrorTime?: number;
  /**
   * 支付锁定时间
   */
  payLockTime?: string;
  /**
   * 可用积分
   */
  pointsAvailable?: number;
  /**
   * 已用积分
   */
  pointsUsed?: number;
  /**
   * 密码安全等级
   */
  safeLevel?: number;
  /**
   * 连续签到天数
   */
  signContinuousDays?: number;
  /**
   * 商家和客户的关联关系
   */
  storeCustomerRelaListByAll?: StoreCustomerRelaVO2[];
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 会员的详细信息
 */
export interface CustomerDetailVO3 {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 联系人名字
   */
  contactName?: string;
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 会员详细信息标识UUID
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
   * 账号状态
   * * ENABLE: 0：启用中
   * * DISABLE: 1：禁用中
   */
  customerStatus?: 0 | 1;
  customerVO?: CustomerVO;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  /**
   * 负责业务员
   */
  employeeId?: string;
  /**
   * 禁用原因
   */
  forbidReason?: string;
  /**
   * 是否为分销员
   * * NO: 否
   * * YES: 是
   */
  isDistributor?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 审核驳回理由
   */
  rejectReason?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 分销渠道信息
 */
export interface DistributeChannel2 {
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  [k: string]: any;
}
export interface StoreCustomerRelaVO2 {
  /**
   * 商家标识
   */
  companyInfoId?: number;
  /**
   * 用户标识
   */
  customerId?: string;
  /**
   * 关系类型
   * * PLATFORM: 0:平台客户/0:店铺关联的客户
   * * SUPPLIER: 1:商家客户/1:店铺发展的客户
   */
  customerType?: 0 | 1;
  /**
   * 负责的业务员标识
   */
  employeeId?: string;
  /**
   * 主键
   */
  id?: string;
  /**
   * 店铺标识
   */
  storeId?: number;
  /**
   * 店铺等级标识
   */
  storeLevelId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerGetByIdResponse".
 */
export interface CustomerGetByIdResponse1 {
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  checkState?: 0 | 1 | 2;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建|注册时间
   */
  createTime?: string;
  /**
   * 账户
   */
  customerAccount?: string;
  customerDetail?: CustomerDetailVO3;
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 客户等级ID
   */
  customerLevelId?: number;
  /**
   * 密码
   */
  customerPassword?: string;
  /**
   * 支付密码
   */
  customerPayPassword?: string;
  /**
   * 盐值
   */
  customerSaltVal?: string;
  /**
   * 客户类型
   * * PLATFORM: 0:平台客户/0:店铺关联的客户
   * * SUPPLIER: 1:商家客户/1:店铺发展的客户
   */
  customerType?: 0 | 1;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  deletePerson?: string;
  /**
   * 删除时间
   */
  deleteTime?: string;
  distributeChannel?: DistributeChannel2;
  /**
   * 客户成长值
   */
  growthValue?: number;
  /**
   * 头像
   */
  headImg?: string;
  /**
   * 密码错误次数
   */
  loginErrorCount?: number;
  /**
   * 登录IP
   */
  loginIp?: string;
  /**
   * 锁定时间
   */
  loginLockTime?: string;
  /**
   * 登录时间
   */
  loginTime?: string;
  /**
   * 支付密码错误次数
   */
  payErrorTime?: number;
  /**
   * 支付锁定时间
   */
  payLockTime?: string;
  /**
   * 可用积分
   */
  pointsAvailable?: number;
  /**
   * 已用积分
   */
  pointsUsed?: number;
  /**
   * 密码安全等级
   */
  safeLevel?: number;
  /**
   * 连续签到天数
   */
  signContinuousDays?: number;
  /**
   * 商家和客户的关联关系
   */
  storeCustomerRelaListByAll?: StoreCustomerRelaVO2[];
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerMobileRequest".
 */
export interface CustomerMobileRequest {
  /**
   * 账号
   */
  customerAccount?: string;
  /**
   * 客户详情id
   */
  customerId?: string;
  /**
   * 旧验证码
   */
  oldVerifyCode?: string;
  /**
   * 验证码
   */
  verifyCode?: string;
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
 * via the `definition` "IUpdateCustomerBaseInfoCustomerEditRequestReq".
 */
export interface IUpdateCustomerBaseInfoCustomerEditRequestReq {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 联系人名字
   */
  contactName?: string;
  /**
   * 联系方式
   */
  contactPhone?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 客户详情id
   */
  customerDetailId?: string;
  /**
   * 客户id
   */
  customerId?: string;
  /**
   * 客户名称
   */
  customerName?: string;
  /**
   * 省
   */
  provinceId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IChangeNewMobileMobileRequestReq".
 */
export interface IChangeNewMobileMobileRequestReq {
  /**
   * 账号
   */
  customerAccount?: string;
  /**
   * 客户详情id
   */
  customerId?: string;
  /**
   * 旧验证码
   */
  oldVerifyCode?: string;
  /**
   * 验证码
   */
  verifyCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IValidateVerifiedCodeMobileRequestReq".
 */
export interface IValidateVerifiedCodeMobileRequestReq {
  /**
   * 账号
   */
  customerAccount?: string;
  /**
   * 客户详情id
   */
  customerId?: string;
  /**
   * 旧验证码
   */
  oldVerifyCode?: string;
  /**
   * 验证码
   */
  verifyCode?: string;
  [k: string]: any;
}
