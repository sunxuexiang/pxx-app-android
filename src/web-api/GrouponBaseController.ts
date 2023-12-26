import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'GrouponBaseController';

/**
 *
 * getGrouponInstanceInfo
 *
 */
async function getGrouponInstanceInfo(
  grouponNo: IGetGrouponInstanceInfoGrouponNoReq,
): Promise<GrouponInstanceWithCustomerInfoVO> {
  if (__DEV__) {
    if (isMock('GrouponBaseController', 'getGrouponInstanceInfo')) {
      return Promise.resolve(
        require('./mock/GrouponBaseController.json')
          .GrouponInstanceWithCustomerInfoVO || {},
      );
    }
  }

  let result = await sdk.get<GrouponInstanceWithCustomerInfoVO>(
    '/groupon/grouponInstanceInfo/{grouponNo}'.replace(
      '{grouponNo}',
      grouponNo + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 分页查询进行中团实例
 *
 */
async function page(
  grouponInstancePageRequest: IPageGrouponInstancePageRequestReq,
): Promise<GrouponInstancePageWithCustomerInfoResponse> {
  if (__DEV__) {
    if (isMock('GrouponBaseController', 'page')) {
      return Promise.resolve(
        require('./mock/GrouponBaseController.json')
          .GrouponInstancePageWithCustomerInfoResponse || {},
      );
    }
  }

  let result = await sdk.post<GrouponInstancePageWithCustomerInfoResponse>(
    '/groupon/instance/page',

    {
      ...grouponInstancePageRequest,
    },
  );
  return result.context;
}

/**
 *
 * 邀请参团小程序码
 *
 */
async function inviteAddGroup(
  grouponNo: IInviteAddGroupGrouponNoReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('GrouponBaseController', 'inviteAddGroup')) {
      return Promise.resolve(
        require('./mock/GrouponBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.get<unknown>(
    '/groupon/invite/add/group/{grouponNo}'.replace(
      '{grouponNo}',
      grouponNo + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 查询最近的待成团实例
 *
 */
async function getGrouponLatestInstanceByActivityId(
  grouponInstancePageRequest: IGetGrouponLatestInstanceByActivityIdGrouponInstancePageRequestReq,
): Promise<GrouponInstanceByActivityIdResponse> {
  if (__DEV__) {
    if (
      isMock('GrouponBaseController', 'getGrouponLatestInstanceByActivityId')
    ) {
      return Promise.resolve(
        require('./mock/GrouponBaseController.json')
          .GrouponInstanceByActivityIdResponse || {},
      );
    }
  }

  let result = await sdk.post<GrouponInstanceByActivityIdResponse>(
    '/groupon/latest/instance',

    {
      ...grouponInstancePageRequest,
    },
  );
  return result.context;
}

/**
 *
 * vaildateGrouponStatusForOpenOrJoin
 *
 */
async function vaildateGrouponStatusForOpenOrJoin(
  request: IVaildateGrouponStatusForOpenOrJoinRequestReq,
): Promise<GrouponGoodsInfoVO> {
  if (__DEV__) {
    if (isMock('GrouponBaseController', 'vaildateGrouponStatusForOpenOrJoin')) {
      return Promise.resolve(
        require('./mock/GrouponBaseController.json').GrouponGoodsInfoVO || {},
      );
    }
  }

  let result = await sdk.post<GrouponGoodsInfoVO>(
    '/groupon/vaildateGrouponStatusForOpenOrJoin',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  getGrouponInstanceInfo,

  page,

  inviteAddGroup,

  getGrouponLatestInstanceByActivityId,

  vaildateGrouponStatusForOpenOrJoin,
};

/**
 * grouponNo
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetGrouponInstanceInfoGrouponNoReq".
 */
export type IGetGrouponInstanceInfoGrouponNoReq = string;
/**
 * grouponNo
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IInviteAddGroupGrouponNoReq".
 */
export type IInviteAddGroupGrouponNoReq = string;
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
 * via the `definition` "BaseResponse«GrouponInstanceWithCustomerInfoVO»".
 */
export interface BaseResponseGrouponInstanceWithCustomerInfoVO {
  /**
   * 结果码
   */
  code: string;
  context?: GrouponInstanceWithCustomerInfoVO;
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
export interface GrouponInstanceWithCustomerInfoVO {
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 团截止时间
   */
  endTime?: string;
  /**
   * 团号
   */
  grouponNo?: string;
  /**
   * 拼团人数
   */
  grouponNum?: number;
  /**
   *
   * * UNPAY: 0: 待开团
   * * WAIT: 1: 待成团
   * * COMPLETE: 2: 已成团
   * * FAIL: 3: 拼团失败
   */
  grouponStatus?: '0' | '1' | '2' | '3';
  /**
   * 头像路径
   */
  headimgurl?: string;
  /**
   * 参团人数参团人数
   */
  joinNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GrouponInstanceWithCustomerInfoVO".
 */
export interface GrouponInstanceWithCustomerInfoVO1 {
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 团截止时间
   */
  endTime?: string;
  /**
   * 团号
   */
  grouponNo?: string;
  /**
   * 拼团人数
   */
  grouponNum?: number;
  /**
   *
   * * UNPAY: 0: 待开团
   * * WAIT: 1: 待成团
   * * COMPLETE: 2: 已成团
   * * FAIL: 3: 拼团失败
   */
  grouponStatus?: '0' | '1' | '2' | '3';
  /**
   * 头像路径
   */
  headimgurl?: string;
  /**
   * 参团人数参团人数
   */
  joinNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GrouponInstancePageRequest".
 */
export interface GrouponInstancePageRequest {
  customerId?: string;
  grouponActivityId?: string;
  grouponNo?: string;
  grouponStatus?: '0' | '1' | '2' | '3';
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest1;
  sort?: Sort1;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 多重排序
   */
  sortMap?: {
    [k: string]: string;
  };
  /**
   * 排序规则 desc asc
   */
  sortRole?: string;
  /**
   * 排序类型
   */
  sortType?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
export interface PageRequest {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
export interface PageRequest1 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort1 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PageRequest".
 */
export interface PageRequest2 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Sort".
 */
export interface Sort2 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GrouponInstancePageWithCustomerInfoResponse»".
 */
export interface BaseResponseGrouponInstancePageWithCustomerInfoResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GrouponInstancePageWithCustomerInfoResponse;
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
export interface GrouponInstancePageWithCustomerInfoResponse {
  grouponInstanceVOS?: MicroServicePageGrouponInstanceWithCustomerInfoVO;
  [k: string]: any;
}
/**
 * 分页数据
 */
export interface MicroServicePageGrouponInstanceWithCustomerInfoVO {
  /**
   * 具体数据内容
   */
  content?: GrouponInstanceWithCustomerInfoVO2[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  /**
   * 页码
   */
  number?: number;
  numberOfElements?: number;
  /**
   * 每页条数
   */
  size?: number;
  sort?: Sort3;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface GrouponInstanceWithCustomerInfoVO2 {
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 团截止时间
   */
  endTime?: string;
  /**
   * 团号
   */
  grouponNo?: string;
  /**
   * 拼团人数
   */
  grouponNum?: number;
  /**
   *
   * * UNPAY: 0: 待开团
   * * WAIT: 1: 待成团
   * * COMPLETE: 2: 已成团
   * * FAIL: 3: 拼团失败
   */
  grouponStatus?: '0' | '1' | '2' | '3';
  /**
   * 头像路径
   */
  headimgurl?: string;
  /**
   * 参团人数参团人数
   */
  joinNum?: number;
  [k: string]: any;
}
export interface Sort3 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GrouponInstancePageWithCustomerInfoResponse".
 */
export interface GrouponInstancePageWithCustomerInfoResponse1 {
  grouponInstanceVOS?: MicroServicePageGrouponInstanceWithCustomerInfoVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«GrouponInstanceWithCustomerInfoVO»".
 */
export interface MicroServicePageGrouponInstanceWithCustomerInfoVO1 {
  /**
   * 具体数据内容
   */
  content?: GrouponInstanceWithCustomerInfoVO2[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  /**
   * 页码
   */
  number?: number;
  numberOfElements?: number;
  /**
   * 每页条数
   */
  size?: number;
  sort?: Sort3;
  /**
   * 总数据大小
   */
  total?: number;
  totalElements?: number;
  totalPages?: number;
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
 * via the `definition` "BaseResponse«GrouponInstanceByActivityIdResponse»".
 */
export interface BaseResponseGrouponInstanceByActivityIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GrouponInstanceByActivityIdResponse;
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
export interface GrouponInstanceByActivityIdResponse {
  customerName?: string;
  grouponInstance?: GrouponInstanceVO;
  [k: string]: any;
}
/**
 * 团信息
 */
export interface GrouponInstanceVO {
  /**
   * 成团时间
   */
  completeTime?: string;
  /**
   * 开团时间
   */
  createTime?: string;
  /**
   * 团长用户id
   */
  customerId?: string;
  /**
   * 团截止时间
   */
  endTime?: string;
  /**
   * 拼团活动id
   */
  grouponActivityId?: string;
  /**
   * 团号
   */
  grouponNo?: string;
  /**
   * 拼团人数
   */
  grouponNum?: number;
  /**
   * 拼团状态
   * * UNPAY: 0: 待开团
   * * WAIT: 1: 待成团
   * * COMPLETE: 2: 已成团
   * * FAIL: 3: 拼团失败
   */
  grouponStatus?: '0' | '1' | '2' | '3';
  /**
   * 参团人数
   */
  joinNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GrouponInstanceByActivityIdResponse".
 */
export interface GrouponInstanceByActivityIdResponse1 {
  customerName?: string;
  grouponInstance?: GrouponInstanceVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GrouponInstanceVO".
 */
export interface GrouponInstanceVO1 {
  /**
   * 成团时间
   */
  completeTime?: string;
  /**
   * 开团时间
   */
  createTime?: string;
  /**
   * 团长用户id
   */
  customerId?: string;
  /**
   * 团截止时间
   */
  endTime?: string;
  /**
   * 拼团活动id
   */
  grouponActivityId?: string;
  /**
   * 团号
   */
  grouponNo?: string;
  /**
   * 拼团人数
   */
  grouponNum?: number;
  /**
   * 拼团状态
   * * UNPAY: 0: 待开团
   * * WAIT: 1: 待成团
   * * COMPLETE: 2: 已成团
   * * FAIL: 3: 拼团失败
   */
  grouponStatus?: '0' | '1' | '2' | '3';
  /**
   * 参团人数
   */
  joinNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GrouponOrderValidRequest".
 */
export interface GrouponOrderValidRequest {
  buyCount?: number;
  customerId?: string;
  goodsId?: string;
  goodsInfoId?: string;
  grouponNo?: string;
  openGroupon?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GrouponGoodsInfoVO»".
 */
export interface BaseResponseGrouponGoodsInfoVO {
  /**
   * 结果码
   */
  code: string;
  context?: GrouponGoodsInfoVO;
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
export interface GrouponGoodsInfoVO {
  /**
   * SPU编号
   */
  goodsId?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsInfoName?: string;
  /**
   * SKU编码
   */
  goodsInfoNo?: string;
  /**
   * 商品销售数量
   */
  goodsSalesNum?: number;
  /**
   * 拼团活动ID
   */
  grouponActivityId?: string;
  /**
   * 拼团分类ID
   */
  grouponCateId?: string;
  /**
   * 拼团商品ID
   */
  grouponGoodsId?: string;
  /**
   * 拼团价格
   */
  grouponPrice?: number;
  /**
   * 限购数量
   */
  limitSellingNum?: number;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 订单数量
   */
  orderSalesNum?: number;
  /**
   * 成团后退单金额
   */
  refundAmount?: number;
  /**
   * 成团后退单数量
   */
  refundNum?: number;
  /**
   * 规格名称
   */
  specText?: string;
  /**
   * 起售数量
   */
  startSellingNum?: number;
  /**
   * 店铺ID
   */
  storeId?: string;
  /**
   * 交易额
   */
  tradeAmount?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GrouponGoodsInfoVO".
 */
export interface GrouponGoodsInfoVO1 {
  /**
   * SPU编号
   */
  goodsId?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 商品名称
   */
  goodsInfoName?: string;
  /**
   * SKU编码
   */
  goodsInfoNo?: string;
  /**
   * 商品销售数量
   */
  goodsSalesNum?: number;
  /**
   * 拼团活动ID
   */
  grouponActivityId?: string;
  /**
   * 拼团分类ID
   */
  grouponCateId?: string;
  /**
   * 拼团商品ID
   */
  grouponGoodsId?: string;
  /**
   * 拼团价格
   */
  grouponPrice?: number;
  /**
   * 限购数量
   */
  limitSellingNum?: number;
  /**
   * 市场价
   */
  marketPrice?: number;
  /**
   * 订单数量
   */
  orderSalesNum?: number;
  /**
   * 成团后退单金额
   */
  refundAmount?: number;
  /**
   * 成团后退单数量
   */
  refundNum?: number;
  /**
   * 规格名称
   */
  specText?: string;
  /**
   * 起售数量
   */
  startSellingNum?: number;
  /**
   * 店铺ID
   */
  storeId?: string;
  /**
   * 交易额
   */
  tradeAmount?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPageGrouponInstancePageRequestReq".
 */
export interface IPageGrouponInstancePageRequestReq {
  customerId?: string;
  grouponActivityId?: string;
  grouponNo?: string;
  grouponStatus?: '0' | '1' | '2' | '3';
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest1;
  sort?: Sort1;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 多重排序
   */
  sortMap?: {
    [k: string]: string;
  };
  /**
   * 排序规则 desc asc
   */
  sortRole?: string;
  /**
   * 排序类型
   */
  sortType?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetGrouponLatestInstanceByActivityIdGrouponInstancePageRequestReq".
 */
export interface IGetGrouponLatestInstanceByActivityIdGrouponInstancePageRequestReq {
  customerId?: string;
  grouponActivityId?: string;
  grouponNo?: string;
  grouponStatus?: '0' | '1' | '2' | '3';
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest1;
  sort?: Sort1;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 多重排序
   */
  sortMap?: {
    [k: string]: string;
  };
  /**
   * 排序规则 desc asc
   */
  sortRole?: string;
  /**
   * 排序类型
   */
  sortType?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IVaildateGrouponStatusForOpenOrJoinRequestReq".
 */
export interface IVaildateGrouponStatusForOpenOrJoinRequestReq {
  buyCount?: number;
  customerId?: string;
  goodsId?: string;
  goodsInfoId?: string;
  grouponNo?: string;
  openGroupon?: boolean;
  [k: string]: any;
}
