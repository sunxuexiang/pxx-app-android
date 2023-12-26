import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'LoginBaseController';

/**
 *
 * 检测用户名是否存在
 *
 */
async function checkAccount(
  registerRequest: ICheckAccountRegisterRequestReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('LoginBaseController', 'checkAccount')) {
      return Promise.resolve(
        require('./mock/LoginBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.post<unknown>(
    '/checkAccount',

    {
      ...registerRequest,
    },
  );
  return result.context;
}

/**
 *
 * 忘记密码时发送验证码
 *
 */
async function checkSmsByForgot(
  registerRequest: ICheckSmsByForgotRegisterRequestReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('LoginBaseController', 'checkSmsByForgot')) {
      return Promise.resolve(
        require('./mock/LoginBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.post(
    '/checkSmsByForgot',

    {
      ...registerRequest,
    },
  );
  return result.context;
}

/**
 *
 * 注册时发送验证码
 *
 */
async function checkSmsByRegister(
  registerRequest: ICheckSmsByRegisterRegisterRequestReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('LoginBaseController', 'checkSmsByRegister')) {
      return Promise.resolve(
        require('./mock/LoginBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.post(
    '/checkSmsByRegister',

    {
      ...registerRequest,
    },
  );
  return result.context;
}

/**
 *
 * 开放访问注册时发送验证码
 *
 */
async function checkSmsByWebModalRegister(
  customerAccount: ICheckSmsByWebModalRegisterCustomerAccountReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('LoginBaseController', 'checkSmsByWebModalRegister')) {
      return Promise.resolve(
        require('./mock/LoginBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.post(
    '/checkSmsByRegister/web/modal/{customerAccount}'.replace(
      '{customerAccount}',
      customerAccount + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 获取注册限制、是否开启分销
 *
 */
async function getRegisterLimitType(): Promise<RegisterResponse> {
  if (__DEV__) {
    if (isMock('LoginBaseController', 'getRegisterLimitType')) {
      return Promise.resolve(
        require('./mock/LoginBaseController.json').RegisterResponse || {},
      );
    }
  }

  let result = await sdk.post<RegisterResponse>(
    '/getRegisterLimitType',

    {},
  );
  return result.context;
}

/**
 *
 * 验证TOKEN，实现自动登录
 *
 */
async function loginByToken(): Promise<unknown> {
  if (__DEV__) {
    if (isMock('LoginBaseController', 'login')) {
      return Promise.resolve(
        require('./mock/LoginBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.get<unknown>(
    '/login',

    {},
  );
  return result.context;
}

/**
 *
 * 会员登录
 *
 */
async function login(
  loginRequest: ILoginLoginRequestReq,
): Promise<LoginResponse> {
  if (__DEV__) {
    if (isMock('LoginBaseController', 'login')) {
      return Promise.resolve(
        require('./mock/LoginBaseController.json').LoginResponse || {},
      );
    }
  }

  let result = await sdk.post<LoginResponse>(
    '/login',

    {
      ...loginRequest,
    },
  );
  return result.context;
}

/**
 *
 * 使用验证码登录验证发送的验证码并登录
 *
 */
async function loginWithVerificationCode(
  loginRequest: ILoginWithVerificationCodeLoginRequestReq,
): Promise<LoginResponse> {
  if (__DEV__) {
    if (isMock('LoginBaseController', 'loginWithVerificationCode')) {
      return Promise.resolve(
        require('./mock/LoginBaseController.json').LoginResponse || {},
      );
    }
  }

  let result = await sdk.post<LoginResponse>(
    '/login/verification',

    {
      ...loginRequest,
    },
  );
  return result.context;
}

/**
 *
 * 使用验证码登录发送验证码
 *
 */
async function sendLoginCode(
  customerAccount: ISendLoginCodeCustomerAccountReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('LoginBaseController', 'sendLoginCode')) {
      return Promise.resolve(
        require('./mock/LoginBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.post(
    '/login/verification/{customerAccount}'.replace(
      '{customerAccount}',
      customerAccount + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 忘记密码时修改验证码
 *
 */
async function passwordByForgot(
  registerRequest: IPasswordByForgotRegisterRequestReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('LoginBaseController', 'passwordByForgot')) {
      return Promise.resolve(
        require('./mock/LoginBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.post(
    '/passwordByForgot',

    {
      ...registerRequest,
    },
  );
  return result.context;
}

/**
 *
 * 验证图片验证码
 *
 */
async function patchcaByPost(
  registerRequest: IPatchcaRegisterRequestReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('LoginBaseController', 'patchca')) {
      return Promise.resolve(
        require('./mock/LoginBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.post(
    '/patchca',

    {
      ...registerRequest,
    },
  );
  return result.context;
}

/**
 *
 * 获取验证码
 *
 */
async function patchca(uuid: IPatchcaUuidReq): Promise<unknown> {
  if (__DEV__) {
    if (isMock('LoginBaseController', 'patchca')) {
      return Promise.resolve(
        require('./mock/LoginBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.get<unknown>(
    '/patchca/{uuid}'.replace('{uuid}', uuid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 完善用户信息
 *
 */
async function perfect(
  registerRequest: IPerfectRegisterRequestReq,
): Promise<LoginResponse> {
  if (__DEV__) {
    if (isMock('LoginBaseController', 'perfect')) {
      return Promise.resolve(
        require('./mock/LoginBaseController.json').LoginResponse || {},
      );
    }
  }

  let result = await sdk.post<LoginResponse>(
    '/perfect',

    {
      ...registerRequest,
    },
  );
  return result.context;
}

/**
 *
 * 注册用户
 *
 */
async function register(
  registerRequest: IRegisterRegisterRequestReq,
): Promise<LoginResponse> {
  if (__DEV__) {
    if (isMock('LoginBaseController', 'register')) {
      return Promise.resolve(
        require('./mock/LoginBaseController.json').LoginResponse || {},
      );
    }
  }

  let result = await sdk.post<LoginResponse>(
    '/register',

    {
      ...registerRequest,
    },
  );
  return result.context;
}

/**
 *
 * 注册验证
 *
 */
async function checkRegister(
  registerRequest: ICheckRegisterRegisterRequestReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('LoginBaseController', 'checkRegister')) {
      return Promise.resolve(
        require('./mock/LoginBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.post(
    '/register/check',

    {
      ...registerRequest,
    },
  );
  return result.context;
}

/**
 *
 * 开放访问注册
 *
 */
async function registerModal(
  registerRequest: IRegisterModalRegisterRequestReq,
): Promise<LoginResponse> {
  if (__DEV__) {
    if (isMock('LoginBaseController', 'registerModal')) {
      return Promise.resolve(
        require('./mock/LoginBaseController.json').LoginResponse || {},
      );
    }
  }

  let result = await sdk.post<LoginResponse>(
    '/register/modal',

    {
      ...registerRequest,
    },
  );
  return result.context;
}

/**
 *
 * 查询访问是否需要登录
 *
 */
async function isVisitWithLogin(): Promise<UserAuditResponse> {
  if (__DEV__) {
    if (isMock('LoginBaseController', 'isVisitWithLogin')) {
      return Promise.resolve(
        require('./mock/LoginBaseController.json').UserAuditResponse || {},
      );
    }
  }

  let result = await sdk.post<UserAuditResponse>(
    '/userSetting/isVisitWithLogin',

    {},
  );
  return result.context;
}

/**
 *
 * 忘记密码时验证验证码
 *
 */
async function validateSmsByForgot(
  registerRequest: IValidateSmsByForgotRegisterRequestReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('LoginBaseController', 'validateSmsByForgot')) {
      return Promise.resolve(
        require('./mock/LoginBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.post<unknown>(
    '/validateSmsByForgot',

    {
      ...registerRequest,
    },
  );
  return result.context;
}

export default {
  checkAccount,

  checkSmsByForgot,

  checkSmsByRegister,

  checkSmsByWebModalRegister,

  getRegisterLimitType,

  login,

  loginByToken,

  loginWithVerificationCode,

  sendLoginCode,

  passwordByForgot,

  patchca,

  patchcaByPost,

  perfect,

  register,

  checkRegister,

  registerModal,

  isVisitWithLogin,

  validateSmsByForgot,
};

/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type Undefined = string;
/**
 * 会员账号
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICheckSmsByWebModalRegisterCustomerAccountReq".
 */
export type ICheckSmsByWebModalRegisterCustomerAccountReq = string;
/**
 * 会员账号
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISendLoginCodeCustomerAccountReq".
 */
export type ISendLoginCodeCustomerAccountReq = string;
/**
 * 图片验证码key
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPatchcaUuidReq".
 */
export type IPatchcaUuidReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "RegisterRequest".
 */
export interface RegisterRequest {
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
   * 账号
   */
  customerAccount?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 用户编号
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 密码
   */
  customerPassword?: string;
  /**
   * 业务员id
   */
  employeeId?: string;
  /**
   * 邀请码
   */
  inviteCode?: string;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * 是否是忘记密码
   */
  isForgetPassword?: boolean;
  /**
   * 图片验证码
   */
  patchca?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 分享人id
   */
  shareUserId?: string;
  /**
   * 图片验证码的key
   */
  uuid?: string;
  /**
   * 验证码
   */
  verifyCode?: string;
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
 * via the `definition` "BaseResponse«RegisterResponse»".
 */
export interface BaseResponseRegisterResponse {
  /**
   * 结果码
   */
  code: string;
  context?: RegisterResponse;
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
export interface RegisterResponse {
  /**
   * 是否开启社交分销
   * * NO: 否
   * * YES: 是
   */
  openFlag?: 0 | 1;
  /**
   * 注册限制
   * * UNLIMITED: 0：不限
   * * INVITE: 1：仅限邀请注册
   */
  registerLimitType?: 0 | 1;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "RegisterResponse".
 */
export interface RegisterResponse1 {
  /**
   * 是否开启社交分销
   * * NO: 否
   * * YES: 是
   */
  openFlag?: 0 | 1;
  /**
   * 注册限制
   * * UNLIMITED: 0：不限
   * * INVITE: 1：仅限邀请注册
   */
  registerLimitType?: 0 | 1;
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
 * via the `definition` "LoginRequest".
 */
export interface LoginRequest {
  /**
   * 账号
   */
  customerAccount?: string;
  /**
   * 密码
   */
  customerPassword?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«LoginResponse»".
 */
export interface BaseResponseLoginResponse {
  /**
   * 结果码
   */
  code: string;
  context?: LoginResponse;
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
export interface LoginResponse {
  /**
   * 账号名称
   */
  accountName?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  checkState?: number;
  couponResponse?: GetRegisterOrStoreCouponResponse;
  customerDetail?: CustomerDetailVO;
  /**
   * 客户编号
   */
  customerId?: string;
  /**
   * 是否直接可以登录
   */
  isLoginFlag?: boolean;
  /**
   * jwt验证token
   */
  token?: string;
  [k: string]: any;
}
/**
 * 注册赠券信息
 */
export interface GetRegisterOrStoreCouponResponse {
  /**
   * 优惠券列表
   */
  couponList?: GetCouponGroupResponse[];
  /**
   * 描述
   */
  desc?: string;
  /**
   * 标题
   */
  title?: string;
  [k: string]: any;
}
export interface GetCouponGroupResponse {
  /**
   * 优惠券说明
   */
  couponDesc?: string;
  /**
   * 优惠券Id
   */
  couponId?: string;
  /**
   * 优惠券名称
   */
  couponName?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   */
  couponType?: 0 | 1 | 2;
  /**
   * 优惠券面值
   */
  denomination?: number;
  /**
   * 有效天数
   */
  effectiveDays?: number;
  /**
   * 优惠券结束时间
   */
  endTime?: string;
  /**
   * 购满多少钱
   */
  fullBuyPrice?: number;
  /**
   * 购满类型
   * * NO_THRESHOLD: 0：无门槛
   * * FULL_MONEY: 1：满N元可使用
   */
  fullBuyType?: 0 | 1;
  /**
   * 是否平台优惠券
   * * NO: 否
   * * YES: 是
   */
  platformFlag?: 0 | 1;
  /**
   * 起止时间类型
   * * RANGE_DAY: 0：按起止时间
   * * DAYS: 1：按N天有效
   */
  rangeDayType?: 0 | 1;
  /**
   * 营销范围类型
   * * ALL: 0：全部商品
   * * BRAND: 1：品牌
   * * BOSS_CATE: 2：平台(boss)类目
   * * STORE_CATE: 3：店铺分类
   * * SKU: 4：自定义货品（店铺可用）
   */
  scopeType?: 0 | 1 | 2 | 3 | 4;
  /**
   * 优惠券开始时间
   */
  startTime?: string;
  /**
   * 商户id
   */
  storeId?: number;
  /**
   * 优惠券总张数
   */
  totalCount?: number;
  [k: string]: any;
}
/**
 * 客户明细信息
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
 * via the `definition` "LoginResponse".
 */
export interface LoginResponse1 {
  /**
   * 账号名称
   */
  accountName?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  checkState?: number;
  couponResponse?: GetRegisterOrStoreCouponResponse;
  customerDetail?: CustomerDetailVO;
  /**
   * 客户编号
   */
  customerId?: string;
  /**
   * 是否直接可以登录
   */
  isLoginFlag?: boolean;
  /**
   * jwt验证token
   */
  token?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GetRegisterOrStoreCouponResponse".
 */
export interface GetRegisterOrStoreCouponResponse1 {
  /**
   * 优惠券列表
   */
  couponList?: GetCouponGroupResponse[];
  /**
   * 描述
   */
  desc?: string;
  /**
   * 标题
   */
  title?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GetCouponGroupResponse".
 */
export interface GetCouponGroupResponse1 {
  /**
   * 优惠券说明
   */
  couponDesc?: string;
  /**
   * 优惠券Id
   */
  couponId?: string;
  /**
   * 优惠券名称
   */
  couponName?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   */
  couponType?: 0 | 1 | 2;
  /**
   * 优惠券面值
   */
  denomination?: number;
  /**
   * 有效天数
   */
  effectiveDays?: number;
  /**
   * 优惠券结束时间
   */
  endTime?: string;
  /**
   * 购满多少钱
   */
  fullBuyPrice?: number;
  /**
   * 购满类型
   * * NO_THRESHOLD: 0：无门槛
   * * FULL_MONEY: 1：满N元可使用
   */
  fullBuyType?: 0 | 1;
  /**
   * 是否平台优惠券
   * * NO: 否
   * * YES: 是
   */
  platformFlag?: 0 | 1;
  /**
   * 起止时间类型
   * * RANGE_DAY: 0：按起止时间
   * * DAYS: 1：按N天有效
   */
  rangeDayType?: 0 | 1;
  /**
   * 营销范围类型
   * * ALL: 0：全部商品
   * * BRAND: 1：品牌
   * * BOSS_CATE: 2：平台(boss)类目
   * * STORE_CATE: 3：店铺分类
   * * SKU: 4：自定义货品（店铺可用）
   */
  scopeType?: 0 | 1 | 2 | 3 | 4;
  /**
   * 优惠券开始时间
   */
  startTime?: string;
  /**
   * 商户id
   */
  storeId?: number;
  /**
   * 优惠券总张数
   */
  totalCount?: number;
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
 * via the `definition` "LoginVerificationCodeRequest".
 */
export interface LoginVerificationCodeRequest {
  /**
   * 账号
   */
  customerAccount?: string;
  /**
   * 短信验证码
   */
  verificationCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "RegisterCheckRequest".
 */
export interface RegisterCheckRequest {
  /**
   * 账号
   */
  customerAccount?: string;
  /**
   * 验证码
   */
  fromPage?: number;
  /**
   * 验证码
   */
  verifyCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«UserAuditResponse»".
 */
export interface BaseResponseUserAuditResponse {
  /**
   * 结果码
   */
  code: string;
  context?: UserAuditResponse;
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
export interface UserAuditResponse {
  /**
   * 审核开关-true:审核 false:不审核
   */
  audit?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "UserAuditResponse".
 */
export interface UserAuditResponse1 {
  /**
   * 审核开关-true:审核 false:不审核
   */
  audit?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICheckAccountRegisterRequestReq".
 */
export interface ICheckAccountRegisterRequestReq {
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
   * 账号
   */
  customerAccount?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 用户编号
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 密码
   */
  customerPassword?: string;
  /**
   * 业务员id
   */
  employeeId?: string;
  /**
   * 邀请码
   */
  inviteCode?: string;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * 是否是忘记密码
   */
  isForgetPassword?: boolean;
  /**
   * 图片验证码
   */
  patchca?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 分享人id
   */
  shareUserId?: string;
  /**
   * 图片验证码的key
   */
  uuid?: string;
  /**
   * 验证码
   */
  verifyCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICheckSmsByForgotRegisterRequestReq".
 */
export interface ICheckSmsByForgotRegisterRequestReq {
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
   * 账号
   */
  customerAccount?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 用户编号
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 密码
   */
  customerPassword?: string;
  /**
   * 业务员id
   */
  employeeId?: string;
  /**
   * 邀请码
   */
  inviteCode?: string;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * 是否是忘记密码
   */
  isForgetPassword?: boolean;
  /**
   * 图片验证码
   */
  patchca?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 分享人id
   */
  shareUserId?: string;
  /**
   * 图片验证码的key
   */
  uuid?: string;
  /**
   * 验证码
   */
  verifyCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICheckSmsByRegisterRegisterRequestReq".
 */
export interface ICheckSmsByRegisterRegisterRequestReq {
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
   * 账号
   */
  customerAccount?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 用户编号
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 密码
   */
  customerPassword?: string;
  /**
   * 业务员id
   */
  employeeId?: string;
  /**
   * 邀请码
   */
  inviteCode?: string;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * 是否是忘记密码
   */
  isForgetPassword?: boolean;
  /**
   * 图片验证码
   */
  patchca?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 分享人id
   */
  shareUserId?: string;
  /**
   * 图片验证码的key
   */
  uuid?: string;
  /**
   * 验证码
   */
  verifyCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ILoginLoginRequestReq".
 */
export interface ILoginLoginRequestReq {
  /**
   * 账号
   */
  customerAccount?: string;
  /**
   * 密码
   */
  customerPassword?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ILoginWithVerificationCodeLoginRequestReq".
 */
export interface ILoginWithVerificationCodeLoginRequestReq {
  /**
   * 账号
   */
  customerAccount?: string;
  /**
   * 短信验证码
   */
  verificationCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPasswordByForgotRegisterRequestReq".
 */
export interface IPasswordByForgotRegisterRequestReq {
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
   * 账号
   */
  customerAccount?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 用户编号
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 密码
   */
  customerPassword?: string;
  /**
   * 业务员id
   */
  employeeId?: string;
  /**
   * 邀请码
   */
  inviteCode?: string;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * 是否是忘记密码
   */
  isForgetPassword?: boolean;
  /**
   * 图片验证码
   */
  patchca?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 分享人id
   */
  shareUserId?: string;
  /**
   * 图片验证码的key
   */
  uuid?: string;
  /**
   * 验证码
   */
  verifyCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPatchcaRegisterRequestReq".
 */
export interface IPatchcaRegisterRequestReq {
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
   * 账号
   */
  customerAccount?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 用户编号
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 密码
   */
  customerPassword?: string;
  /**
   * 业务员id
   */
  employeeId?: string;
  /**
   * 邀请码
   */
  inviteCode?: string;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * 是否是忘记密码
   */
  isForgetPassword?: boolean;
  /**
   * 图片验证码
   */
  patchca?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 分享人id
   */
  shareUserId?: string;
  /**
   * 图片验证码的key
   */
  uuid?: string;
  /**
   * 验证码
   */
  verifyCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPerfectRegisterRequestReq".
 */
export interface IPerfectRegisterRequestReq {
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
   * 账号
   */
  customerAccount?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 用户编号
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 密码
   */
  customerPassword?: string;
  /**
   * 业务员id
   */
  employeeId?: string;
  /**
   * 邀请码
   */
  inviteCode?: string;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * 是否是忘记密码
   */
  isForgetPassword?: boolean;
  /**
   * 图片验证码
   */
  patchca?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 分享人id
   */
  shareUserId?: string;
  /**
   * 图片验证码的key
   */
  uuid?: string;
  /**
   * 验证码
   */
  verifyCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IRegisterRegisterRequestReq".
 */
export interface IRegisterRegisterRequestReq {
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
   * 账号
   */
  customerAccount?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 用户编号
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 密码
   */
  customerPassword?: string;
  /**
   * 业务员id
   */
  employeeId?: string;
  /**
   * 邀请码
   */
  inviteCode?: string;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * 是否是忘记密码
   */
  isForgetPassword?: boolean;
  /**
   * 图片验证码
   */
  patchca?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 分享人id
   */
  shareUserId?: string;
  /**
   * 图片验证码的key
   */
  uuid?: string;
  /**
   * 验证码
   */
  verifyCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICheckRegisterRegisterRequestReq".
 */
export interface ICheckRegisterRegisterRequestReq {
  /**
   * 账号
   */
  customerAccount?: string;
  /**
   * 验证码
   */
  fromPage?: number;
  /**
   * 验证码
   */
  verifyCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IRegisterModalRegisterRequestReq".
 */
export interface IRegisterModalRegisterRequestReq {
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
   * 账号
   */
  customerAccount?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 用户编号
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 密码
   */
  customerPassword?: string;
  /**
   * 业务员id
   */
  employeeId?: string;
  /**
   * 邀请码
   */
  inviteCode?: string;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * 是否是忘记密码
   */
  isForgetPassword?: boolean;
  /**
   * 图片验证码
   */
  patchca?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 分享人id
   */
  shareUserId?: string;
  /**
   * 图片验证码的key
   */
  uuid?: string;
  /**
   * 验证码
   */
  verifyCode?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IValidateSmsByForgotRegisterRequestReq".
 */
export interface IValidateSmsByForgotRegisterRequestReq {
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
   * 账号
   */
  customerAccount?: string;
  /**
   * 详细地址
   */
  customerAddress?: string;
  /**
   * 用户编号
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 密码
   */
  customerPassword?: string;
  /**
   * 业务员id
   */
  employeeId?: string;
  /**
   * 邀请码
   */
  inviteCode?: string;
  /**
   * 邀请人id
   */
  inviteeId?: string;
  /**
   * 是否是忘记密码
   */
  isForgetPassword?: boolean;
  /**
   * 图片验证码
   */
  patchca?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 分享人id
   */
  shareUserId?: string;
  /**
   * 图片验证码的key
   */
  uuid?: string;
  /**
   * 验证码
   */
  verifyCode?: string;
  [k: string]: any;
}
