import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'TradeBaseController';

/**
 *
 * 查询积分订单发货清单
 *
 */
async function tradeDeliverRecordByPoint(
  tid: ITradeDeliverRecordTidReq,
  type: ITradeDeliverRecordTypeReq,
): Promise<TradeDeliverRecordResponse> {
  if (__DEV__) {
    if (isMock('TradeBaseController', 'tradeDeliverRecord')) {
      return Promise.resolve(
        require('./mock/TradeBaseController.json').TradeDeliverRecordResponse ||
          {},
      );
    }
  }

  let result = await sdk.get<TradeDeliverRecordResponse>(
    '/points/trade/deliverRecord/{tid}/{type}'

      .replace('{tid}', tid + '')

      .replace('{type}', type + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查询订单发货清单
 *
 */
async function tradeDeliverRecord(
  tid: ITradeDeliverRecordTidReq,
  type: ITradeDeliverRecordTypeReq,
): Promise<TradeDeliverRecordResponse> {
  let result = await sdk.get<TradeDeliverRecordResponse>(
    '/trade/deliverRecord/{tid}/{type}'

      .replace('{tid}', tid + '')

      .replace('{type}', type + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 分页查询订单
 *
 */
async function pageByPoint(
  pointsTradePageQueryRequest: IPagePointsTradePageQueryRequestReq,
): Promise<PagePointsTradeVO> {
  if (__DEV__) {
    if (isMock('TradeBaseController', 'page')) {
      return Promise.resolve(
        require('./mock/TradeBaseController.json').PagePointsTradeVO || {},
      );
    }
  }

  let result = await sdk.post<PagePointsTradeVO>(
    '/points/trade/page',

    {
      ...pointsTradePageQueryRequest,
    },
  );
  return result.context;
}

/**
 *
 * 积分订单确认收货
 *
 */
async function confirmPoint(tid: IConfirmTidReq): Promise<unknown> {
  if (__DEV__) {
    if (isMock('TradeBaseController', 'confirm')) {
      return Promise.resolve(
        require('./mock/TradeBaseController.json').unknown || {},
      );
    }
  }
}




/**
 *
 * 查询积分订单详情
 *
 */
async function detailsByPoint(tid: IDetailsTidReq): Promise<PointsTradeVO> {
  if (__DEV__) {
    if (isMock('TradeBaseController', 'details')) {
      return Promise.resolve(
        require('./mock/TradeBaseController.json').PointsTradeVO || {},
      );
    }
  }

  let result = await sdk.get<PointsTradeVO>(
    '/points/trade/{tid}'.replace('{tid}', tid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 审批订单
 *
 */
async function approval(request: IApprovalRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/trade/approval',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 分页查询审批订单
 *
 */
async function approvePage(
  paramRequest: IApprovePageParamRequestReq,
): Promise<PageTradeVO> {
  let result = await sdk.post<PageTradeVO>(
    '/trade/approvePage',

    {
      ...paramRequest,
    },
  );
  return result.context;
}

/**
 *
 * 取消订单
 *
 */
async function cancel(tid: ICancelTidReq): Promise<unknown> {
  let result = await sdk.get(
    '/trade/cancel/{tid}'.replace('{tid}', tid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 分页查询子账号订单
 *
 */
async function childAccountPage(
  paramRequest: IChildAccountPageParamRequestReq,
): Promise<PageTradeVO> {
  let result = await sdk.post<PageTradeVO>(
    '/trade/childAccountPage',

    {
      ...paramRequest,
    },
  );
  return result.context;
}

/**
 *
 * 提交订单，用于生成订单操作
 *
 */
async function commit(
  tradeCommitRequest: ICommitTradeCommitRequestReq,
): Promise<TradeCommitResultVOArray> {
  let result = await sdk.post<TradeCommitResultVOArray>(
    '/trade/commit',

    {
      ...tradeCommitRequest,
    },
  );
  return result.context;
}

/**
 *
 * 从采购单中确认订单商品
 *
 */
async function confirm(
  confirmRequest: IConfirmConfirmRequestReq,
): Promise<unknown> {
  let result = await sdk.put(
    '/trade/confirm',

    {
      ...confirmRequest,
    },
  );
  return result.context;
}

/**
 *
 * 分页查询客户订单
 *
 */
async function customerOrderPage(
  paramRequest: ICustomerOrderPageParamRequestReq,
): Promise<PageTradeVO> {
  let result = await sdk.post<PageTradeVO>(
    '/trade/customer/page',

    {
      ...paramRequest,
    },
  );
  return result.context;
}

/**
 *
 * 0元订单默认支付
 *
 */
async function defaultPay(tid: IDefaultPayTidReq): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/trade/default/pay/{tid}'.replace('{tid}', tid + ''),

    {},
  );
  return result.context;
}


/**
 *
 * 根据快递公司及快递单号查询物流详情
 *
 */
async function logistics(
  queryRequest: ILogisticsQueryRequestReq,
): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/trade/deliveryInfos',

    {
      ...queryRequest,
    },
  );
  return result.context;
}

/**
 *
 * B店主客户订单详情
 *
 */
async function distributeDetails(
  tid: IDistributeDetailsTidReq,
): Promise<TradeVO> {
  let result = await sdk.get<TradeVO>(
    '/trade/distribute/{tid}'.replace('{tid}', tid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查询订单附件信息，只做展示使用
 *
 */
async function encloses(tid: IEnclosesTidReq): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/trade/encloses/{tid}'.replace('{tid}', tid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 根据参数查询某订单的运费
 *
 */
async function getFreight(
  tradeParams: IGetFreightTradeParamsReq,
): Promise<TradeGetFreightResponseArray> {
  let result = await sdk.post<TradeGetFreightResponseArray>(
    '/trade/getFreight',

    {
      ...tradeParams,
    },
  );
  return result.context;
}

/**
 *
 * 查询订单商品清单
 *
 */
async function tradeItems(tid: ITradeItemsTidReq): Promise<TradeItemVOArray> {
  let result = await sdk.get<TradeItemVOArray>(
    '/trade/goods/{tid}'.replace('{tid}', tid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 拼团购买
 *
 */
async function grouponBuy(request: IGrouponBuyRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/trade/groupon-buy',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 立即购买
 *
 */
async function immediateBuy(
  confirmRequest: IImmediateBuyConfirmRequestReq,
): Promise<unknown> {
  let result = await sdk.post(
    '/trade/immediate-buy',

    {
      ...confirmRequest,
    },
  );
  return result.context;
}

/**
 *
 * 获取订单发票信息
 *
 */
async function invoice(
  tid: IInvoiceTidReq,
  type: IInvoiceTypeReq,
): Promise<InvoiceVO> {
  let result = await sdk.get<InvoiceVO>(
    '/trade/invoice/{tid}/{type}'

      .replace('{tid}', tid + '')

      .replace('{type}', type + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 分页查询订单
 *
 */
async function page(paramRequest: IPageParamRequestReq): Promise<PageTradeVO> {
  let result = await sdk.post<PageTradeVO>(
    '/trade/page',

    {
      ...paramRequest,
    },
  );
  return result.context;
}

/**
 *
 * 我的拼购分页查询订单
 *
 */
async function grouponPage(
  paramRequest: IGrouponPageParamRequestReq,
): Promise<PageGrouponTradeVO> {
  let result = await sdk.post<PageGrouponTradeVO>(
    '/trade/page/groupons',

    {
      ...paramRequest,
    },
  );
  return result.context;
}

/**
 *
 * 新增线下付款单
 *
 */
async function createPayOrder(
  paymentRecordRequest: ICreatePayOrderPaymentRecordRequestReq,
): Promise<unknown> {
  let result = await sdk.post(
    '/trade/pay/offline',

    {
      ...paymentRecordRequest,
    },
  );
  return result.context;
}

/**
 *
 * 查询订单付款记录
 *
 */
async function payOrder(tid: IPayOrderTidReq): Promise<FindPayOrderResponse> {
  let result = await sdk.get<FindPayOrderResponse>(
    '/trade/payOrder/{tid}'.replace('{tid}', tid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查询订单付款记录
 *
 */
async function payOrders(
  parentTid: IPayOrdersParentTidReq,
): Promise<FindPayOrderListResponse> {
  let result = await sdk.get<FindPayOrderListResponse>(
    '/trade/payOrders/{parentTid}'.replace('{parentTid}', parentTid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 用于确认订单后，创建订单前的获取订单商品信息
 *
 */
async function getPurchaseItems(): Promise<TradeConfirmResponse> {
  let result = await sdk.get<TradeConfirmResponse>(
    '/trade/purchase',

    {},
  );
  return result.context;
}

/**
 *
 * 确认收货
 *
 */
async function confirmGoods(tid: IConfirmTidReq): Promise<unknown> {
  if (__DEV__) {
    if (isMock('TradeBaseController', 'confirm')) {
      return Promise.resolve(
        require('./mock/TradeBaseController.json').unknown || {},
      );
    }
  }

  let result = await sdk.get(
    '/trade/receive/{tid}'.replace('{tid}', tid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 根据订单号与物流单号查询发货信息
 *
 */
async function shippItemsByLogisticsNo(
  deliverId: IShippItemsByLogisticsNoDeliverIdReq,
  tid: IShippItemsByLogisticsNoTidReq,
  type: IShippItemsByLogisticsNoTypeReq,
): Promise<TradeDeliverVO> {
  let result = await sdk.get<TradeDeliverVO>(
    '/trade/shipments/{tid}/{deliverId}/{type}'

      .replace('{deliverId}', deliverId + '')

      .replace('{tid}', tid + '')

      .replace('{type}', type + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 展示订单基本信息
 *
 */
async function commitResp(
  tid: ICommitRespTidReq,
): Promise<TradeCommitResultVO> {
  let result = await sdk.get<TradeCommitResultVO>(
    '/trade/show/{tid}'.replace('{tid}', tid + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 开店礼包购买
 *
 */
async function storeBagsBuy(
  request: IStoreBagsBuyRequestReq,
): Promise<unknown> {
  let result = await sdk.post(
    '/trade/store-bags-buy',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 组合购购买
 *
 */
async function suitBuy(request: ISuitBuyRequestReq): Promise<unknown> {
  let result = await sdk.post(
    '/trade/suit-buy',

    {
      ...request,
    },
  );
  return result.context;
}



export default {
  tradeDeliverRecord,

  page,

  confirm,

  approval,

  approvePage,

  cancel,

  childAccountPage,

  commit,

  confirmGoods,

  customerOrderPage,

  defaultPay,

  tradeDeliverRecordByPoint,

  logistics,

  distributeDetails,

  encloses,

  getFreight,

  tradeItems,

  grouponBuy,

  immediateBuy,

  invoice,

  pageByPoint,

  grouponPage,

  createPayOrder,

  payOrder,

  payOrders,

  getPurchaseItems,

  confirmPoint,

  shippItemsByLogisticsNo,

  commitResp,

  storeBagsBuy,

  detailsByPoint,
  suitBuy,
};

/**
 * 内容
 */
export type TradeCommitResultVOArray = TradeCommitResultVO[];
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type Undefined = string;
/**
 * 内容
 */
export type TradeGetFreightResponseArray = TradeGetFreightResponse[];
/**
 * 内容
 */
export type TradeItemVOArray = TradeItemVO4[];
/**
 * 订单ID
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ITradeDeliverRecordTidReq".
 */
export type ITradeDeliverRecordTidReq = string;
/**
 * type
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ITradeDeliverRecordTypeReq".
 */
export type ITradeDeliverRecordTypeReq = string;
/**
 * 订单ID
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IConfirmTidReq".
 */
export type IConfirmTidReq = string;
/**
 * 订单ID
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDetailsTidReq".
 */
export type IDetailsTidReq = string;
/**
 * 订单ID
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICancelTidReq".
 */
export type ICancelTidReq = string;
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeCommitResultVOArray".
 */
export type TradeCommitResultVOArray1 = TradeCommitResultVO3[];
/**
 * 订单ID
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDefaultPayTidReq".
 */
export type IDefaultPayTidReq = string;
/**
 * 订单ID
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDistributeDetailsTidReq".
 */
export type IDistributeDetailsTidReq = string;
/**
 * 订单ID
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IEnclosesTidReq".
 */
export type IEnclosesTidReq = string;
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetFreightTradeParamsReq".
 */
export type IGetFreightTradeParamsReq = TradeParamsRequest1[];
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeGetFreightResponseArray".
 */
export type TradeGetFreightResponseArray1 = TradeGetFreightResponse2[];
/**
 * 订单ID
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ITradeItemsTidReq".
 */
export type ITradeItemsTidReq = string;
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeItemVOArray".
 */
export type TradeItemVOArray1 = TradeItemVO8[];
/**
 * 订单ID
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IInvoiceTidReq".
 */
export type IInvoiceTidReq = string;
/**
 * 主客订单TYPE
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IInvoiceTypeReq".
 */
export type IInvoiceTypeReq = string;
/**
 * 订单ID
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPayOrderTidReq".
 */
export type IPayOrderTidReq = string;
/**
 * 父订单ID
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPayOrdersParentTidReq".
 */
export type IPayOrdersParentTidReq = string;
/**
 * 发货单号
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IShippItemsByLogisticsNoDeliverIdReq".
 */
export type IShippItemsByLogisticsNoDeliverIdReq = string;
/**
 * 订单ID
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IShippItemsByLogisticsNoTidReq".
 */
export type IShippItemsByLogisticsNoTidReq = string;
/**
 * type
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IShippItemsByLogisticsNoTypeReq".
 */
export type IShippItemsByLogisticsNoTypeReq = string;
/**
 * 订单ID
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICommitRespTidReq".
 */
export type ICommitRespTidReq = string;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«TradeDeliverRecordResponse»".
 */
export interface BaseResponseTradeDeliverRecordResponse {
  /**
   * 结果码
   */
  code: string;
  context?: TradeDeliverRecordResponse;
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
export interface TradeDeliverRecordResponse {
  /**
   * 订单总体状态
   */
  status?: string;
  /**
   * 发货记录列表
   */
  tradeDeliver?: TradeDeliverVO[];
  [k: string]: any;
}
export interface TradeDeliverVO {
  consignee?: ConsigneeVO;
  /**
   * 发货单号
   */
  deliverId?: string;
  /**
   * 发货时间
   */
  deliverTime?: string;
  /**
   * 赠品信息
   */
  giftItemList?: ShippingItemVO[];
  logistics?: LogisticsVO;
  /**
   * 发货清单
   */
  shippingItems?: ShippingItemVO1[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  status?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  [k: string]: any;
}
/**
 * 收货人信息
 */
export interface ConsigneeVO {
  /**
   * 详细地址
   */
  address?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 详细地址(包含省市区）
   */
  detailAddress?: string;
  /**
   * 期望收货时间
   */
  expectTime?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 收货人名称
   */
  name?: string;
  /**
   * 收货人电话
   */
  phone?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 收货地址修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface ShippingItemVO {
  /**
   * 货号
   */
  bn?: string;
  /**
   * 商品名称
   */
  itemName?: string;
  /**
   * 发货数量
   */
  itemNum?: number;
  /**
   * 清单编号
   */
  listNo?: string;
  /**
   * 商品单号
   */
  oid?: string;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * 购买价格
   */
  price?: number;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * skuNo
   */
  skuNo?: string;
  /**
   * 规格描述信息
   */
  specDetails?: string;
  /**
   * spuId
   */
  spuId?: string;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
/**
 * 物流信息
 */
export interface LogisticsVO {
  /**
   * 物流公司编号
   */
  logisticCompanyId?: string;
  /**
   * 物流公司名称
   */
  logisticCompanyName?: string;
  /**
   * 物流费
   */
  logisticFee?: number;
  /**
   * 物流号
   */
  logisticNo?: string;
  /**
   * 物流公司标准编码
   */
  logisticStandardCode?: string;
  /**
   * 物流配送方式编号
   */
  shipMethodId?: string;
  /**
   * 物流配送方式名称
   */
  shipMethodName?: string;
  [k: string]: any;
}
export interface ShippingItemVO1 {
  /**
   * 货号
   */
  bn?: string;
  /**
   * 商品名称
   */
  itemName?: string;
  /**
   * 发货数量
   */
  itemNum?: number;
  /**
   * 清单编号
   */
  listNo?: string;
  /**
   * 商品单号
   */
  oid?: string;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * 购买价格
   */
  price?: number;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * skuNo
   */
  skuNo?: string;
  /**
   * 规格描述信息
   */
  specDetails?: string;
  /**
   * spuId
   */
  spuId?: string;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeDeliverRecordResponse".
 */
export interface TradeDeliverRecordResponse1 {
  /**
   * 订单总体状态
   */
  status?: string;
  /**
   * 发货记录列表
   */
  tradeDeliver?: TradeDeliverVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeDeliverVO".
 */
export interface TradeDeliverVO1 {
  consignee?: ConsigneeVO;
  /**
   * 发货单号
   */
  deliverId?: string;
  /**
   * 发货时间
   */
  deliverTime?: string;
  /**
   * 赠品信息
   */
  giftItemList?: ShippingItemVO[];
  logistics?: LogisticsVO;
  /**
   * 发货清单
   */
  shippingItems?: ShippingItemVO1[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  status?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsigneeVO".
 */
export interface ConsigneeVO1 {
  /**
   * 详细地址
   */
  address?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 详细地址(包含省市区）
   */
  detailAddress?: string;
  /**
   * 期望收货时间
   */
  expectTime?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 收货人名称
   */
  name?: string;
  /**
   * 收货人电话
   */
  phone?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 收货地址修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ShippingItemVO".
 */
export interface ShippingItemVO2 {
  /**
   * 货号
   */
  bn?: string;
  /**
   * 商品名称
   */
  itemName?: string;
  /**
   * 发货数量
   */
  itemNum?: number;
  /**
   * 清单编号
   */
  listNo?: string;
  /**
   * 商品单号
   */
  oid?: string;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * 购买价格
   */
  price?: number;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * skuNo
   */
  skuNo?: string;
  /**
   * 规格描述信息
   */
  specDetails?: string;
  /**
   * spuId
   */
  spuId?: string;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "LogisticsVO".
 */
export interface LogisticsVO1 {
  /**
   * 物流公司编号
   */
  logisticCompanyId?: string;
  /**
   * 物流公司名称
   */
  logisticCompanyName?: string;
  /**
   * 物流费
   */
  logisticFee?: number;
  /**
   * 物流号
   */
  logisticNo?: string;
  /**
   * 物流公司标准编码
   */
  logisticStandardCode?: string;
  /**
   * 物流配送方式编号
   */
  shipMethodId?: string;
  /**
   * 物流配送方式名称
   */
  shipMethodName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PointsTradePageQueryRequest".
 */
export interface PointsTradePageQueryRequest {
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  /**
   * 公司ID-SaaS
   */
  companyInfoIdAtSaaS?: number;
  /**
   * 下单时间上限，精度到天
   */
  createdFrom?: string;
  /**
   * 下单时间下限,精度到天
   */
  createdTo?: string;
  /**
   * 小b端我的客户列表是否是查询全部
   */
  customerOrderListAllType?: boolean;
  /**
   * 订单发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 订单流程状态
   * * INIT: 0: INIT 创建订单
   * * REMEDY: 1: REMEDY 修改订单
   * * REFUND: 2: REFUND 已退款
   * * AUDIT: 3: AUDIT 已审核
   * * DELIVERED_PART: 4: DELIVERED_PART 部分发货
   * * DELIVERED: 5: DELIVERED 已发货
   * * CONFIRMED: 6: CONFIRMED 已确认
   * * COMPLETED: 7: COMPLETED 已完成
   * * VOID: 8: VOID 已作废
   * * GROUPON: 9: GROUPON 已参团
   * * APPROVAL: 10: APPROVAL 审批中
   */
  flowState?:
  | 'INIT'
  | 'REMEDY'
  | 'REFUND'
  | 'AUDIT'
  | 'DELIVERED_PART'
  | 'DELIVERED'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'VOID'
  | 'GROUPON'
  | 'APPROVAL';
  /**
   * 邀请人id，用于查询从店铺精选下的单
   */
  inviteeId?: string;
  /**
   * 关键字，用于搜索订单编号或商品名称
   */
  keywords?: string;
  /**
   * 订单类型
   * * NORMAL_ORDER: 0: 普通订单
   * * POINTS_ORDER: 1: 积分订单
   * * ALL_ORDER: 2: 所有订单
   */
  orderType?: 'NORMAL_ORDER' | 'POINTS_ORDER' | 'ALL_ORDER';
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
  /**
   * 父级id
   */
  parentCustomerId?: string;
  /**
   * 订单支付状态
   * * NOT_PAID: 0: NOT_PAID 未支付
   * * UNCONFIRMED: 1: UNCONFIRMED 待确认
   * * PAID: 2: PAID 已支付
   */
  payState?: number;
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
   * 店铺ID-SaaS
   */
  storeIdAtSaaS?: number;
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
 * via the `definition` "BaseResponse«Page«PointsTradeVO»»".
 */
export interface BaseResponsePagePointsTradeVO {
  /**
   * 结果码
   */
  code: string;
  context?: PagePointsTradeVO;
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
export interface PagePointsTradeVO {
  content?: PointsTradeVO[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: Pageable;
  size?: number;
  sort?: Sort4;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface PointsTradeVO {
  buyer?: BuyerVO;
  /**
   * 买家备注
   */
  buyerRemark?: string;
  /**
   * 是否可退标识
   * * NO: 否
   * * YES: 是
   */
  canReturnFlag?: number;
  consignee?: ConsigneeVO2;
  /**
   * 配送方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递
   */
  deliverWay?: 0 | 1;
  /**
   * 订单附件，以逗号隔开
   */
  encloses?: string;
  /**
   * 订单组号
   */
  groupId?: string;
  /**
   * 是否被结算
   * * NO: 否
   * * YES: 是
   */
  hasBeanSettled?: number;
  /**
   * 订单号
   */
  id?: string;
  /**
   * 订单来源
   * * SUPPLIER: 0: 代客下单
   * * WECHAT: 1: 会员h5端下单
   * * PC: 2: 会员pc端下单
   * * APP: 3: 会员APP端下单
   * * LITTLEPROGRAM: 4: 会员小程序端下单
   */
  orderSource?: 'SUPPLIER' | 'WECHAT' | 'PC' | 'APP' | 'LITTLEPROGRAM';
  /**
   * 超时未支付取消订单时间
   */
  orderTimeOut?: string;
  /**
   * 支付网关
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   * * ADVANCE: 预存款
   * * POINT: 积分兑换
   * * CASH: 线下支付
   * * UNIONPAY_B2B: 企业银联
   * * COUPON: 优惠券
   * * BALANCE: 余额
   * * CREDIT: 授信支付
   */
  payGateway?:
  | 'UNIONPAY'
  | 'WECHAT'
  | 'ALIPAY'
  | 'ADVANCE'
  | 'POINT'
  | 'CASH'
  | 'UNIONPAY_B2B'
  | 'COUPON'
  | 'BALANCE'
  | 'CREDIT';
  payInfo?: PayInfoVO;
  /**
   * 支付单ID
   */
  payOrderId?: string;
  /**
   * 支付方式
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   * * ADVANCE: 预存款
   * * POINT: 积分兑换
   * * CASH: 线下支付
   * * UNIONPAY_B2B: 企业银联
   * * COUPON: 优惠券
   * * BALANCE: 余额
   * * CREDIT: 授信支付
   */
  payWay?:
  | 'UNIONPAY'
  | 'WECHAT'
  | 'ALIPAY'
  | 'ADVANCE'
  | 'POINT'
  | 'CASH'
  | 'UNIONPAY_B2B'
  | 'COUPON'
  | 'BALANCE'
  | 'CREDIT';
  /**
   * 订单来源方
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?:
  | 'BOSS'
  | 'CUSTOMER'
  | 'THIRD'
  | 'SUPPLIER'
  | 'PLATFORM'
  | 'MALL'
  | 'PROVIDER';
  pointsOrderType?: 'POINTS_GOODS' | 'POINTS_COUPON';
  /**
   * 退款标识
   */
  refundFlag?: boolean;
  /**
   * 调用方的请求 IP
   */
  requestIp?: string;
  seller?: SellerVO;
  /**
   * 卖家备注
   */
  sellerRemark?: string;
  supplier?: SupplierVO;
  tradeCouponItem?: TradePointsCouponItemVO;
  /**
   * 发货单
   */
  tradeDelivers?: TradeDeliverVO2[];
  /**
   * 操作日志记录
   */
  tradeEventLogs?: TradeEventLogVO[];
  /**
   * 订单商品列表
   */
  tradeItems?: TradeItemVO[];
  tradePrice?: TradePriceVO;
  tradeState?: TradeStateVO;
  [k: string]: any;
}
/**
 * 购买人
 */
export interface BuyerVO {
  /**
   * 账号
   */
  account?: string;
  /**
   * 标识用户是否属于当前订单所属商家
   * * NO: 否
   * * YES: 是
   */
  customerFlag?: number;
  /**
   * 买家关联的业务员id
   */
  employeeId?: string;
  /**
   * 购买人编号
   */
  id?: string;
  /**
   * 等级编号
   */
  levelId?: number;
  /**
   * 等级名称
   */
  levelName?: string;
  /**
   * 购买人姓名
   */
  name?: string;
  /**
   * 母账号id
   */
  parentId?: string;
  /**
   * 手机号
   */
  phone?: string;
  [k: string]: any;
}
/**
 * 收货人信息
 */
export interface ConsigneeVO2 {
  /**
   * 详细地址
   */
  address?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 详细地址(包含省市区）
   */
  detailAddress?: string;
  /**
   * 期望收货时间
   */
  expectTime?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 收货人名称
   */
  name?: string;
  /**
   * 收货人电话
   */
  phone?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 收货地址修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 支付信息
 */
export interface PayInfoVO {
  /**
   * 描述
   */
  desc?: string;
  mergePay?: boolean;
  /**
   * 支付类型标识,0：在线支付 1：线下支付
   */
  payTypeId?: string;
  /**
   * 支付类型名称
   */
  payTypeName?: string;
  [k: string]: any;
}
/**
 * boss卖方
 */
export interface SellerVO {
  /**
   * 卖家ID
   */
  adminId?: string;
  /**
   * 代理人Id
   */
  proxyId?: string;
  /**
   * 代理人名称
   */
  proxyName?: string;
  [k: string]: any;
}
/**
 * 商家
 */
export interface SupplierVO {
  /**
   * 代理人Id
   */
  employeeId?: string;
  /**
   * 代理人名称
   */
  employeeName?: string;
  /**
   * 使用的运费模板类别
   * * NO: 否
   * * YES: 是
   */
  freightTemplateType?: 0 | 1;
  /**
   * 是否平台自营
   * * NO: 否
   * * YES: 是
   */
  isSelf?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 商家id
   */
  supplierId?: number;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * 积分订单优惠券
 */
export interface TradePointsCouponItemVO {
  couponInfoVO?: CouponInfoVO;
  /**
   * oid
   */
  oid?: string;
  [k: string]: any;
}
export interface CouponInfoVO {
  /**
   * 优惠券分类Id集合
   */
  cateIds?: string[];
  /**
   * 优惠券分类名集合
   */
  cateNames?: string[];
  /**
   * 优惠券说明
   */
  couponDesc?: string;
  /**
   * 优惠券主键Id
   */
  couponId?: string;
  /**
   * 优惠券名称
   */
  couponName?: string;
  /**
   * 优惠券查询状态
   * * ALL: 0：全部
   * * STARTED: 1：生效中
   * * NOT_START: 2：未生效
   * * DAYS: 3：领取生效
   * * ENDED: 4：已失效
   */
  couponStatus?: 0 | 1 | 2 | 3 | 4;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   */
  couponType?: 0 | 1 | 2;
  /**
   * 是否已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
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
   * 是否已经绑定营销活动
   * * NO: 否
   * * YES: 是
   */
  isFree?: 0 | 1;
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
   * 优惠券关联的商品范围id集合(可以为0(全部)，brand_id(品牌id)，cate_id(分类id), goods_info_id(货品id))
   */
  scopeIds?: string[];
  /**
   * 关联的商品范围名称集合，如分类名、品牌名
   */
  scopeNames?: string[];
  /**
   * 优惠券营销范围
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
   * 店铺id
   */
  storeId?: number;
  [k: string]: any;
}
export interface TradeDeliverVO2 {
  consignee?: ConsigneeVO;
  /**
   * 发货单号
   */
  deliverId?: string;
  /**
   * 发货时间
   */
  deliverTime?: string;
  /**
   * 赠品信息
   */
  giftItemList?: ShippingItemVO[];
  logistics?: LogisticsVO;
  /**
   * 发货清单
   */
  shippingItems?: ShippingItemVO1[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  status?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  [k: string]: any;
}
export interface TradeEventLogVO {
  /**
   * eventDetail
   */
  eventDetail?: string;
  /**
   * eventTime
   */
  eventTime?: string;
  /**
   * eventType
   */
  eventType?: string;
  operator?: Operator;
  [k: string]: any;
}
/**
 * 操作员
 */
export interface Operator {
  /**
   * 操作人账号
   */
  account?: string;
  /**
   * 管理员Id
   */
  adminId?: string;
  /**
   * 公司Id
   */
  companyInfoId?: number;
  /**
   * 供应商类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 父级账号
   */
  customerAccount?: string;
  /**
   * 母子账号标识 0:母账号  1:子账号
   */
  identityType?: number;
  /**
   * 操作所在的Ip地址
   */
  ip?: string;
  /**
   * 操作人
   */
  name?: string;
  /**
   * 父级id
   */
  parentCustomerId?: string;
  /**
   * 操作方
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?:
  | 'BOSS'
  | 'CUSTOMER'
  | 'THIRD'
  | 'SUPPLIER'
  | 'PLATFORM'
  | 'MALL'
  | 'PROVIDER';
  /**
   * 店铺id
   */
  storeId?: string;
  /**
   * 用户Id
   */
  userId?: string;
  [k: string]: any;
}
export interface TradeItemVO {
  /**
   * 商品所属的userId storeId?
   */
  adminId?: string;
  /**
   * 货物id
   */
  bn?: string;
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 可退数量
   */
  canReturnNum?: number;
  /**
   * 分类id
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 分销佣金比例
   */
  commissionRate?: number;
  /**
   * 成本价
   */
  cost?: number;
  /**
   * 优惠券商品结算信息(包括商品参加的优惠券信息)
   */
  couponSettlements?: CouponSettlementVO[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 已发货数量
   */
  deliveredNum?: number;
  /**
   * 分销佣金
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
  flashSaleGoodsId?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否入账状态
   * * NO: 否
   * * YES: 是
   * * FAIL: 失败
   */
  isAccountStatus?: 0 | 1 | 2;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  /**
   * 商品价格
   */
  levelPrice?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementVO[];
  /**
   * 购买数量
   */
  num?: number;
  /**
   * oid
   */
  oid?: string;
  /**
   * 商品原价
   */
  originalPrice?: number;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分商品Id
   */
  pointsGoodsId?: string;
  /**
   * 积分兑换金额
   */
  pointsPrice?: number;
  /**
   * 成交价格
   */
  price?: number;
  /**
   * 结算价格
   */
  settlementPrice?: number;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * skuName
   */
  skuName?: string;
  /**
   * skuNo
   */
  skuNo?: string;
  /**
   * 规格描述信息
   */
  specDetails?: string;
  /**
   * 平摊小计
   */
  splitPrice?: number;
  /**
   * spuId
   */
  spuId?: string;
  /**
   * spuName
   */
  spuName?: string;
  /**
   * 店铺分类Id
   */
  storeCateId?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
export interface CouponSettlementVO {
  /**
   * 优惠券码
   */
  couponCode?: string;
  /**
   * 优惠券码id
   */
  couponCodeId?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   */
  couponType?: 0 | 1 | 2;
  /**
   * 优惠金额
   */
  reducePrice?: number;
  /**
   * 除去优惠金额后的商品均摊价
   */
  splitPrice?: number;
  [k: string]: any;
}
export interface MarketingSettlementVO {
  /**
   * 营销类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * SUITS: 3：组合套餐
   */
  marketingType?: '0' | '1' | '2' | '3';
  /**
   * 除去营销优惠金额后的商品均摊价
   */
  splitPrice?: number;
  [k: string]: any;
}
/**
 * 订单价格
 */
export interface TradePriceVO {
  /**
   * 平台佣金
   */
  cmCommission?: number;
  /**
   * 优惠券优惠金额
   */
  couponPrice?: number;
  /**
   * 配送费用
   */
  deliveryPrice?: number;
  /**
   * 优惠金额
   */
  discountsPrice?: number;
  /**
   * 订单优惠金额明细
   */
  discountsPriceDetails?: DiscountsPriceDetailVO[];
  /**
   * 是否开启运费
   * * NO: 否
   * * YES: 是
   */
  enableDeliveryPrice?: number;
  /**
   * 商品总金额
   */
  goodsPrice?: number;
  /**
   * 积分数量
   */
  integral?: number;
  /**
   * 积分兑换金额
   */
  integralPrice?: number;
  /**
   * 发票费用
   */
  invoiceFee?: number;
  /**
   * 单个订单返利总金额
   */
  orderDistributionCommission?: number;
  /**
   * 原始金额, 不作为付费金额
   */
  originPrice?: number;
  /**
   * 积分价值
   */
  pointWorth?: number;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分兑换金额
   */
  pointsPrice?: number;
  /**
   * 特价金额
   */
  privilegePrice?: number;
  /**
   * 支付手续费
   */
  rate?: number;
  /**
   * 是否特价单
   * * NO: 否
   * * YES: 是
   */
  special?: number;
  /**
   * 订单实际支付金额
   */
  totalPayCash?: number;
  /**
   * 订单应付金额
   */
  totalPrice?: number;
  [k: string]: any;
}
export interface DiscountsPriceDetailVO {
  /**
   * 优惠金额
   */
  discounts?: number;
  /**
   * 营销类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * SUITS: 3：组合套餐
   */
  marketingType?: '0' | '1' | '2' | '3';
  [k: string]: any;
}
/**
 * 订单总体状态
 */
export interface TradeStateVO {
  /**
   * 审批状态
   * * APPROVAL: 0: 审批中
   * * APPROVED: 1: 审批通过
   * * REJECTED: 2: 驳回
   */
  approvalStatus?: 'APPROVAL' | 'APPROVED' | 'REJECTED';
  /**
   * 审核状态
   * * NON_CHECKED: 0: 未审核
   * * CHECKED: 1: 已审核
   * * REJECTED: 2: 已打回
   */
  auditState?: 'NON_CHECKED' | 'CHECKED' | 'REJECTED';
  /**
   * 自动确认收货时间
   */
  autoConfirmTime?: string;
  /**
   * 开始时间
   */
  createTime?: string;
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 发货时间
   */
  deliverTime?: string;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 订单入账时间
   */
  finalTime?: string;
  /**
   * 流程状态
   * * INIT: 0: INIT 创建订单
   * * REMEDY: 1: REMEDY 修改订单
   * * REFUND: 2: REFUND 已退款
   * * AUDIT: 3: AUDIT 已审核
   * * DELIVERED_PART: 4: DELIVERED_PART 部分发货
   * * DELIVERED: 5: DELIVERED 已发货
   * * CONFIRMED: 6: CONFIRMED 已确认
   * * COMPLETED: 7: COMPLETED 已完成
   * * VOID: 8: VOID 已作废
   * * GROUPON: 9: GROUPON 已参团
   * * APPROVAL: 10: APPROVAL 审批中
   */
  flowState?:
  | 'INIT'
  | 'REMEDY'
  | 'REFUND'
  | 'AUDIT'
  | 'DELIVERED_PART'
  | 'DELIVERED'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'VOID'
  | 'GROUPON'
  | 'APPROVAL';
  /**
   * 修改时间
   */
  modifyTime?: string;
  /**
   * 作废原因
   */
  obsoleteReason?: string;
  /**
   * 支付状态
   * * NOT_PAID: 0: NOT_PAID 未支付
   * * UNCONFIRMED: 1: UNCONFIRMED 待确认
   * * PAID: 2: PAID 已支付
   */
  payState?: number;
  /**
   * 付款时间
   */
  payTime?: string;
  /**
   * 进入支付页面的时间
   */
  startPayTime?: string;
  [k: string]: any;
}
export interface Pageable {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort3;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort3 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
export interface Sort4 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Page«PointsTradeVO»".
 */
export interface PagePointsTradeVO1 {
  content?: PointsTradeVO[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: Pageable;
  size?: number;
  sort?: Sort4;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PointsTradeVO".
 */
export interface PointsTradeVO1 {
  buyer?: BuyerVO;
  /**
   * 买家备注
   */
  buyerRemark?: string;
  /**
   * 是否可退标识
   * * NO: 否
   * * YES: 是
   */
  canReturnFlag?: number;
  consignee?: ConsigneeVO2;
  /**
   * 配送方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递
   */
  deliverWay?: 0 | 1;
  /**
   * 订单附件，以逗号隔开
   */
  encloses?: string;
  /**
   * 订单组号
   */
  groupId?: string;
  /**
   * 是否被结算
   * * NO: 否
   * * YES: 是
   */
  hasBeanSettled?: number;
  /**
   * 订单号
   */
  id?: string;
  /**
   * 订单来源
   * * SUPPLIER: 0: 代客下单
   * * WECHAT: 1: 会员h5端下单
   * * PC: 2: 会员pc端下单
   * * APP: 3: 会员APP端下单
   * * LITTLEPROGRAM: 4: 会员小程序端下单
   */
  orderSource?: 'SUPPLIER' | 'WECHAT' | 'PC' | 'APP' | 'LITTLEPROGRAM';
  /**
   * 超时未支付取消订单时间
   */
  orderTimeOut?: string;
  /**
   * 支付网关
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   * * ADVANCE: 预存款
   * * POINT: 积分兑换
   * * CASH: 线下支付
   * * UNIONPAY_B2B: 企业银联
   * * COUPON: 优惠券
   * * BALANCE: 余额
   * * CREDIT: 授信支付
   */
  payGateway?:
  | 'UNIONPAY'
  | 'WECHAT'
  | 'ALIPAY'
  | 'ADVANCE'
  | 'POINT'
  | 'CASH'
  | 'UNIONPAY_B2B'
  | 'COUPON'
  | 'BALANCE'
  | 'CREDIT';
  payInfo?: PayInfoVO;
  /**
   * 支付单ID
   */
  payOrderId?: string;
  /**
   * 支付方式
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   * * ADVANCE: 预存款
   * * POINT: 积分兑换
   * * CASH: 线下支付
   * * UNIONPAY_B2B: 企业银联
   * * COUPON: 优惠券
   * * BALANCE: 余额
   * * CREDIT: 授信支付
   */
  payWay?:
  | 'UNIONPAY'
  | 'WECHAT'
  | 'ALIPAY'
  | 'ADVANCE'
  | 'POINT'
  | 'CASH'
  | 'UNIONPAY_B2B'
  | 'COUPON'
  | 'BALANCE'
  | 'CREDIT';
  /**
   * 订单来源方
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?:
  | 'BOSS'
  | 'CUSTOMER'
  | 'THIRD'
  | 'SUPPLIER'
  | 'PLATFORM'
  | 'MALL'
  | 'PROVIDER';
  pointsOrderType?: 'POINTS_GOODS' | 'POINTS_COUPON';
  /**
   * 退款标识
   */
  refundFlag?: boolean;
  /**
   * 调用方的请求 IP
   */
  requestIp?: string;
  seller?: SellerVO;
  /**
   * 卖家备注
   */
  sellerRemark?: string;
  supplier?: SupplierVO;
  tradeCouponItem?: TradePointsCouponItemVO;
  /**
   * 发货单
   */
  tradeDelivers?: TradeDeliverVO2[];
  /**
   * 操作日志记录
   */
  tradeEventLogs?: TradeEventLogVO[];
  /**
   * 订单商品列表
   */
  tradeItems?: TradeItemVO[];
  tradePrice?: TradePriceVO;
  tradeState?: TradeStateVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BuyerVO".
 */
export interface BuyerVO1 {
  /**
   * 账号
   */
  account?: string;
  /**
   * 标识用户是否属于当前订单所属商家
   * * NO: 否
   * * YES: 是
   */
  customerFlag?: number;
  /**
   * 买家关联的业务员id
   */
  employeeId?: string;
  /**
   * 购买人编号
   */
  id?: string;
  /**
   * 等级编号
   */
  levelId?: number;
  /**
   * 等级名称
   */
  levelName?: string;
  /**
   * 购买人姓名
   */
  name?: string;
  /**
   * 母账号id
   */
  parentId?: string;
  /**
   * 手机号
   */
  phone?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PayInfoVO".
 */
export interface PayInfoVO1 {
  /**
   * 描述
   */
  desc?: string;
  mergePay?: boolean;
  /**
   * 支付类型标识,0：在线支付 1：线下支付
   */
  payTypeId?: string;
  /**
   * 支付类型名称
   */
  payTypeName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SellerVO".
 */
export interface SellerVO1 {
  /**
   * 卖家ID
   */
  adminId?: string;
  /**
   * 代理人Id
   */
  proxyId?: string;
  /**
   * 代理人名称
   */
  proxyName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SupplierVO".
 */
export interface SupplierVO1 {
  /**
   * 代理人Id
   */
  employeeId?: string;
  /**
   * 代理人名称
   */
  employeeName?: string;
  /**
   * 使用的运费模板类别
   * * NO: 否
   * * YES: 是
   */
  freightTemplateType?: 0 | 1;
  /**
   * 是否平台自营
   * * NO: 否
   * * YES: 是
   */
  isSelf?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 商家id
   */
  supplierId?: number;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradePointsCouponItemVO".
 */
export interface TradePointsCouponItemVO1 {
  couponInfoVO?: CouponInfoVO;
  /**
   * oid
   */
  oid?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponInfoVO".
 */
export interface CouponInfoVO1 {
  /**
   * 优惠券分类Id集合
   */
  cateIds?: string[];
  /**
   * 优惠券分类名集合
   */
  cateNames?: string[];
  /**
   * 优惠券说明
   */
  couponDesc?: string;
  /**
   * 优惠券主键Id
   */
  couponId?: string;
  /**
   * 优惠券名称
   */
  couponName?: string;
  /**
   * 优惠券查询状态
   * * ALL: 0：全部
   * * STARTED: 1：生效中
   * * NOT_START: 2：未生效
   * * DAYS: 3：领取生效
   * * ENDED: 4：已失效
   */
  couponStatus?: 0 | 1 | 2 | 3 | 4;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   */
  couponType?: 0 | 1 | 2;
  /**
   * 是否已删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
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
   * 是否已经绑定营销活动
   * * NO: 否
   * * YES: 是
   */
  isFree?: 0 | 1;
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
   * 优惠券关联的商品范围id集合(可以为0(全部)，brand_id(品牌id)，cate_id(分类id), goods_info_id(货品id))
   */
  scopeIds?: string[];
  /**
   * 关联的商品范围名称集合，如分类名、品牌名
   */
  scopeNames?: string[];
  /**
   * 优惠券营销范围
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
   * 店铺id
   */
  storeId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeEventLogVO".
 */
export interface TradeEventLogVO1 {
  /**
   * eventDetail
   */
  eventDetail?: string;
  /**
   * eventTime
   */
  eventTime?: string;
  /**
   * eventType
   */
  eventType?: string;
  operator?: Operator;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Operator".
 */
export interface Operator1 {
  /**
   * 操作人账号
   */
  account?: string;
  /**
   * 管理员Id
   */
  adminId?: string;
  /**
   * 公司Id
   */
  companyInfoId?: number;
  /**
   * 供应商类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 父级账号
   */
  customerAccount?: string;
  /**
   * 母子账号标识 0:母账号  1:子账号
   */
  identityType?: number;
  /**
   * 操作所在的Ip地址
   */
  ip?: string;
  /**
   * 操作人
   */
  name?: string;
  /**
   * 父级id
   */
  parentCustomerId?: string;
  /**
   * 操作方
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?:
  | 'BOSS'
  | 'CUSTOMER'
  | 'THIRD'
  | 'SUPPLIER'
  | 'PLATFORM'
  | 'MALL'
  | 'PROVIDER';
  /**
   * 店铺id
   */
  storeId?: string;
  /**
   * 用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeItemVO".
 */
export interface TradeItemVO1 {
  /**
   * 商品所属的userId storeId?
   */
  adminId?: string;
  /**
   * 货物id
   */
  bn?: string;
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 可退数量
   */
  canReturnNum?: number;
  /**
   * 分类id
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 分销佣金比例
   */
  commissionRate?: number;
  /**
   * 成本价
   */
  cost?: number;
  /**
   * 优惠券商品结算信息(包括商品参加的优惠券信息)
   */
  couponSettlements?: CouponSettlementVO[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 已发货数量
   */
  deliveredNum?: number;
  /**
   * 分销佣金
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
  flashSaleGoodsId?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否入账状态
   * * NO: 否
   * * YES: 是
   * * FAIL: 失败
   */
  isAccountStatus?: 0 | 1 | 2;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  /**
   * 商品价格
   */
  levelPrice?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementVO[];
  /**
   * 购买数量
   */
  num?: number;
  /**
   * oid
   */
  oid?: string;
  /**
   * 商品原价
   */
  originalPrice?: number;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分商品Id
   */
  pointsGoodsId?: string;
  /**
   * 积分兑换金额
   */
  pointsPrice?: number;
  /**
   * 成交价格
   */
  price?: number;
  /**
   * 结算价格
   */
  settlementPrice?: number;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * skuName
   */
  skuName?: string;
  /**
   * skuNo
   */
  skuNo?: string;
  /**
   * 规格描述信息
   */
  specDetails?: string;
  /**
   * 平摊小计
   */
  splitPrice?: number;
  /**
   * spuId
   */
  spuId?: string;
  /**
   * spuName
   */
  spuName?: string;
  /**
   * 店铺分类Id
   */
  storeCateId?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponSettlementVO".
 */
export interface CouponSettlementVO1 {
  /**
   * 优惠券码
   */
  couponCode?: string;
  /**
   * 优惠券码id
   */
  couponCodeId?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   */
  couponType?: 0 | 1 | 2;
  /**
   * 优惠金额
   */
  reducePrice?: number;
  /**
   * 除去优惠金额后的商品均摊价
   */
  splitPrice?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MarketingSettlementVO".
 */
export interface MarketingSettlementVO1 {
  /**
   * 营销类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * SUITS: 3：组合套餐
   */
  marketingType?: '0' | '1' | '2' | '3';
  /**
   * 除去营销优惠金额后的商品均摊价
   */
  splitPrice?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradePriceVO".
 */
export interface TradePriceVO1 {
  /**
   * 平台佣金
   */
  cmCommission?: number;
  /**
   * 优惠券优惠金额
   */
  couponPrice?: number;
  /**
   * 配送费用
   */
  deliveryPrice?: number;
  /**
   * 优惠金额
   */
  discountsPrice?: number;
  /**
   * 订单优惠金额明细
   */
  discountsPriceDetails?: DiscountsPriceDetailVO[];
  /**
   * 是否开启运费
   * * NO: 否
   * * YES: 是
   */
  enableDeliveryPrice?: number;
  /**
   * 商品总金额
   */
  goodsPrice?: number;
  /**
   * 积分数量
   */
  integral?: number;
  /**
   * 积分兑换金额
   */
  integralPrice?: number;
  /**
   * 发票费用
   */
  invoiceFee?: number;
  /**
   * 单个订单返利总金额
   */
  orderDistributionCommission?: number;
  /**
   * 原始金额, 不作为付费金额
   */
  originPrice?: number;
  /**
   * 积分价值
   */
  pointWorth?: number;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分兑换金额
   */
  pointsPrice?: number;
  /**
   * 特价金额
   */
  privilegePrice?: number;
  /**
   * 支付手续费
   */
  rate?: number;
  /**
   * 是否特价单
   * * NO: 否
   * * YES: 是
   */
  special?: number;
  /**
   * 订单实际支付金额
   */
  totalPayCash?: number;
  /**
   * 订单应付金额
   */
  totalPrice?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DiscountsPriceDetailVO".
 */
export interface DiscountsPriceDetailVO1 {
  /**
   * 优惠金额
   */
  discounts?: number;
  /**
   * 营销类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * SUITS: 3：组合套餐
   */
  marketingType?: '0' | '1' | '2' | '3';
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeStateVO".
 */
export interface TradeStateVO1 {
  /**
   * 审批状态
   * * APPROVAL: 0: 审批中
   * * APPROVED: 1: 审批通过
   * * REJECTED: 2: 驳回
   */
  approvalStatus?: 'APPROVAL' | 'APPROVED' | 'REJECTED';
  /**
   * 审核状态
   * * NON_CHECKED: 0: 未审核
   * * CHECKED: 1: 已审核
   * * REJECTED: 2: 已打回
   */
  auditState?: 'NON_CHECKED' | 'CHECKED' | 'REJECTED';
  /**
   * 自动确认收货时间
   */
  autoConfirmTime?: string;
  /**
   * 开始时间
   */
  createTime?: string;
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 发货时间
   */
  deliverTime?: string;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 订单入账时间
   */
  finalTime?: string;
  /**
   * 流程状态
   * * INIT: 0: INIT 创建订单
   * * REMEDY: 1: REMEDY 修改订单
   * * REFUND: 2: REFUND 已退款
   * * AUDIT: 3: AUDIT 已审核
   * * DELIVERED_PART: 4: DELIVERED_PART 部分发货
   * * DELIVERED: 5: DELIVERED 已发货
   * * CONFIRMED: 6: CONFIRMED 已确认
   * * COMPLETED: 7: COMPLETED 已完成
   * * VOID: 8: VOID 已作废
   * * GROUPON: 9: GROUPON 已参团
   * * APPROVAL: 10: APPROVAL 审批中
   */
  flowState?:
  | 'INIT'
  | 'REMEDY'
  | 'REFUND'
  | 'AUDIT'
  | 'DELIVERED_PART'
  | 'DELIVERED'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'VOID'
  | 'GROUPON'
  | 'APPROVAL';
  /**
   * 修改时间
   */
  modifyTime?: string;
  /**
   * 作废原因
   */
  obsoleteReason?: string;
  /**
   * 支付状态
   * * NOT_PAID: 0: NOT_PAID 未支付
   * * UNCONFIRMED: 1: UNCONFIRMED 待确认
   * * PAID: 2: PAID 已支付
   */
  payState?: number;
  /**
   * 付款时间
   */
  payTime?: string;
  /**
   * 进入支付页面的时间
   */
  startPayTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Pageable".
 */
export interface Pageable1 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort3;
  unpaged?: boolean;
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
 * via the `definition` "BaseResponse«PointsTradeVO»".
 */
export interface BaseResponsePointsTradeVO {
  /**
   * 结果码
   */
  code: string;
  context?: PointsTradeVO2;
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
export interface PointsTradeVO2 {
  buyer?: BuyerVO;
  /**
   * 买家备注
   */
  buyerRemark?: string;
  /**
   * 是否可退标识
   * * NO: 否
   * * YES: 是
   */
  canReturnFlag?: number;
  consignee?: ConsigneeVO2;
  /**
   * 配送方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递
   */
  deliverWay?: 0 | 1;
  /**
   * 订单附件，以逗号隔开
   */
  encloses?: string;
  /**
   * 订单组号
   */
  groupId?: string;
  /**
   * 是否被结算
   * * NO: 否
   * * YES: 是
   */
  hasBeanSettled?: number;
  /**
   * 订单号
   */
  id?: string;
  /**
   * 订单来源
   * * SUPPLIER: 0: 代客下单
   * * WECHAT: 1: 会员h5端下单
   * * PC: 2: 会员pc端下单
   * * APP: 3: 会员APP端下单
   * * LITTLEPROGRAM: 4: 会员小程序端下单
   */
  orderSource?: 'SUPPLIER' | 'WECHAT' | 'PC' | 'APP' | 'LITTLEPROGRAM';
  /**
   * 超时未支付取消订单时间
   */
  orderTimeOut?: string;
  /**
   * 支付网关
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   * * ADVANCE: 预存款
   * * POINT: 积分兑换
   * * CASH: 线下支付
   * * UNIONPAY_B2B: 企业银联
   * * COUPON: 优惠券
   * * BALANCE: 余额
   * * CREDIT: 授信支付
   */
  payGateway?:
  | 'UNIONPAY'
  | 'WECHAT'
  | 'ALIPAY'
  | 'ADVANCE'
  | 'POINT'
  | 'CASH'
  | 'UNIONPAY_B2B'
  | 'COUPON'
  | 'BALANCE'
  | 'CREDIT';
  payInfo?: PayInfoVO;
  /**
   * 支付单ID
   */
  payOrderId?: string;
  /**
   * 支付方式
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   * * ADVANCE: 预存款
   * * POINT: 积分兑换
   * * CASH: 线下支付
   * * UNIONPAY_B2B: 企业银联
   * * COUPON: 优惠券
   * * BALANCE: 余额
   * * CREDIT: 授信支付
   */
  payWay?:
  | 'UNIONPAY'
  | 'WECHAT'
  | 'ALIPAY'
  | 'ADVANCE'
  | 'POINT'
  | 'CASH'
  | 'UNIONPAY_B2B'
  | 'COUPON'
  | 'BALANCE'
  | 'CREDIT';
  /**
   * 订单来源方
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?:
  | 'BOSS'
  | 'CUSTOMER'
  | 'THIRD'
  | 'SUPPLIER'
  | 'PLATFORM'
  | 'MALL'
  | 'PROVIDER';
  pointsOrderType?: 'POINTS_GOODS' | 'POINTS_COUPON';
  /**
   * 退款标识
   */
  refundFlag?: boolean;
  /**
   * 调用方的请求 IP
   */
  requestIp?: string;
  seller?: SellerVO;
  /**
   * 卖家备注
   */
  sellerRemark?: string;
  supplier?: SupplierVO;
  tradeCouponItem?: TradePointsCouponItemVO;
  /**
   * 发货单
   */
  tradeDelivers?: TradeDeliverVO2[];
  /**
   * 操作日志记录
   */
  tradeEventLogs?: TradeEventLogVO[];
  /**
   * 订单商品列表
   */
  tradeItems?: TradeItemVO[];
  tradePrice?: TradePriceVO;
  tradeState?: TradeStateVO;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeApprovalRequest".
 */
export interface TradeApprovalRequest {
  /**
   * 审批状态
   * * APPROVAL: 0: 审批中
   * * APPROVED: 1: 审批通过
   * * REJECTED: 2: 驳回
   */
  approvalStatus?: 'APPROVAL' | 'APPROVED' | 'REJECTED';
  operator?: Operator2;
  /**
   * 原因
   */
  reason?: string;
  /**
   * 交易id
   */
  tid?: string;
  [k: string]: any;
}
/**
 * 操作人
 */
export interface Operator2 {
  /**
   * 操作人账号
   */
  account?: string;
  /**
   * 管理员Id
   */
  adminId?: string;
  /**
   * 公司Id
   */
  companyInfoId?: number;
  /**
   * 供应商类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 父级账号
   */
  customerAccount?: string;
  /**
   * 母子账号标识 0:母账号  1:子账号
   */
  identityType?: number;
  /**
   * 操作所在的Ip地址
   */
  ip?: string;
  /**
   * 操作人
   */
  name?: string;
  /**
   * 父级id
   */
  parentCustomerId?: string;
  /**
   * 操作方
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?:
  | 'BOSS'
  | 'CUSTOMER'
  | 'THIRD'
  | 'SUPPLIER'
  | 'PLATFORM'
  | 'MALL'
  | 'PROVIDER';
  /**
   * 店铺id
   */
  storeId?: string;
  /**
   * 用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradePageQueryRequest".
 */
export interface TradePageQueryRequest {
  /**
   * 审批状态
   * * APPROVAL: 0: 审批中
   * * APPROVED: 1: 审批通过
   * * REJECTED: 2: 驳回
   */
  approvalStatus?: 'APPROVAL' | 'APPROVED' | 'REJECTED';
  /**
   * 审批来源
   * * INITIATOR: 0: 发起人
   * * APPROVER: 1: 审批人
   */
  approverPersonSource?: 'INITIATOR' | 'APPROVER';
  /**
   * 审批处理类型 0：待处理 1：已处理
   * * UNPROCESSED: 0: 待处理
   * * PROCESSED: 1: 已处理
   */
  approverProcessingType?: 'UNPROCESSED' | 'PROCESSED';
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  /**
   * 公司ID-SaaS
   */
  companyInfoIdAtSaaS?: number;
  /**
   * 下单时间上限，精度到天
   */
  createdFrom?: string;
  /**
   * 下单时间下限,精度到天
   */
  createdTo?: string;
  creditPayInfo?: CreditPayInfoVO;
  /**
   * 小b端我的客户列表是否是查询全部
   */
  customerOrderListAllType?: boolean;
  /**
   * 订单发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 订单流程状态
   * * INIT: 0: INIT 创建订单
   * * REMEDY: 1: REMEDY 修改订单
   * * REFUND: 2: REFUND 已退款
   * * AUDIT: 3: AUDIT 已审核
   * * DELIVERED_PART: 4: DELIVERED_PART 部分发货
   * * DELIVERED: 5: DELIVERED 已发货
   * * CONFIRMED: 6: CONFIRMED 已确认
   * * COMPLETED: 7: COMPLETED 已完成
   * * VOID: 8: VOID 已作废
   * * GROUPON: 9: GROUPON 已参团
   * * APPROVAL: 10: APPROVAL 审批中
   */
  flowState?:
  | 'INIT'
  | 'REMEDY'
  | 'REFUND'
  | 'AUDIT'
  | 'DELIVERED_PART'
  | 'DELIVERED'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'VOID'
  | 'GROUPON'
  | 'APPROVAL';
  /**
   * 邀请人id，用于查询从店铺精选下的单
   */
  inviteeId?: string;
  /**
   * 关键字，用于搜索订单编号或商品名称
   */
  keywords?: string;
  /**
   * 订单类型
   * * NORMAL_ORDER: 0: 普通订单
   * * POINTS_ORDER: 1: 积分订单
   * * ALL_ORDER: 2: 所有订单
   */
  orderType?: 'NORMAL_ORDER' | 'POINTS_ORDER' | 'ALL_ORDER';
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest3;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest4;
  /**
   * 父级id
   */
  parentCustomerId?: string;
  /**
   * 母账号id
   */
  parentId?: string;
  /**
   * 订单支付状态
   * * NOT_PAID: 0: NOT_PAID 未支付
   * * UNCONFIRMED: 1: UNCONFIRMED 待确认
   * * PAID: 2: PAID 已支付
   */
  payState?: number;
  sort?: Sort5;
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
   * 店铺编码 精确查询
   */
  storeId?: number;
  /**
   * 店铺ID-SaaS
   */
  storeIdAtSaaS?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * 授信支付信息
 */
export interface CreditPayInfoVO {
  /**
   * 授信设置id
   */
  creditSettingId?: string;
  /**
   * 账期结束时间
   */
  endTime?: string;
  /**
   * 是否已经还款
   */
  hasRepaid?: boolean;
  /**
   * 账期开始时间
   */
  startTime?: string;
  [k: string]: any;
}
export interface PageRequest3 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface PageRequest4 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort5 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CreditPayInfoVO".
 */
export interface CreditPayInfoVO1 {
  /**
   * 授信设置id
   */
  creditSettingId?: string;
  /**
   * 账期结束时间
   */
  endTime?: string;
  /**
   * 是否已经还款
   */
  hasRepaid?: boolean;
  /**
   * 账期开始时间
   */
  startTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«Page«TradeVO»»".
 */
export interface BaseResponsePageTradeVO {
  /**
   * 结果码
   */
  code: string;
  context?: PageTradeVO;
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
export interface PageTradeVO {
  content?: TradeVO[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: Pageable2;
  size?: number;
  sort?: Sort6;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface TradeVO {
  buyer?: BuyerVO2;
  /**
   * 买家备注
   */
  buyerRemark?: string;
  /**
   * 可还款金额
   */
  canRepayPrice?: number;
  /**
   * 是否可退标识
   * * NO: 否
   * * YES: 是
   */
  canReturnFlag?: number;
  /**
   * 可退积分
   */
  canReturnPoints?: number;
  /**
   * 可退金额
   */
  canReturnPrice?: number;
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  /**
   * 佣金（订单返利）
   */
  commission?: number;
  /**
   * 是否返利
   * * NO: 否
   * * YES: 是
   */
  commissionFlag?: number;
  commissions?: TradeCommissionVO[];
  consignee?: ConsigneeVO3;
  creditPayInfo?: CreditPayInfoVO2;
  /**
   * 配送方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递
   */
  deliverWay?: 0 | 1;
  distributeItems?: TradeDistributeItemVO[];
  distributionShareCustomerId?: string;
  /**
   * 邀请人分销员id
   */
  distributorId?: string;
  /**
   * 分销员名称
   */
  distributorName?: string;
  /**
   * 订单附件，以逗号隔开
   */
  encloses?: string;
  /**
   * 营销赠品全量列表
   */
  gifts?: TradeItemVO2[];
  /**
   * 订单组号
   */
  groupId?: string;
  grouponFlag?: boolean;
  /**
   * 是否被结算
   * * NO: 否
   * * YES: 是
   */
  hasBeanSettled?: number;
  /**
   * 订单号
   */
  id?: string;
  /**
   * 邀请人会员id
   */
  inviteeId?: string;
  invoice?: InvoiceVO;
  /**
   * 下单时是否已开启订单自动审核
   * * NO: 否
   * * YES: 是
   */
  isAuditOpen?: number;
  /**
   * 订单来源
   * * SUPPLIER: 0: 代客下单
   * * WECHAT: 1: 会员h5端下单
   * * PC: 2: 会员pc端下单
   * * APP: 3: 会员APP端下单
   * * LITTLEPROGRAM: 4: 会员小程序端下单
   */
  orderSource?: 'SUPPLIER' | 'WECHAT' | 'PC' | 'APP' | 'LITTLEPROGRAM';
  /**
   * 超时未支付取消订单时间
   */
  orderTimeOut?: string;
  /**
   * 订单类型 0：普通订单；1：积分订单
   * * NORMAL_ORDER: 0: 普通订单
   * * POINTS_ORDER: 1: 积分订单
   * * ALL_ORDER: 2: 所有订单
   */
  orderType?: 'NORMAL_ORDER' | 'POINTS_ORDER' | 'ALL_ORDER';
  /**
   * 父订单号，用于不同商家订单合并支付场景
   */
  parentId?: string;
  payGateway?:
  | 'UNIONPAY'
  | 'WECHAT'
  | 'ALIPAY'
  | 'ADVANCE'
  | 'POINT'
  | 'CASH'
  | 'UNIONPAY_B2B'
  | 'COUPON'
  | 'BALANCE'
  | 'CREDIT';
  payInfo?: PayInfoVO2;
  /**
   * 支付单ID
   */
  payOrderId?: string;
  /**
   * 支付方式
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   * * ADVANCE: 预存款
   * * POINT: 积分兑换
   * * CASH: 线下支付
   * * UNIONPAY_B2B: 企业银联
   * * COUPON: 优惠券
   * * BALANCE: 余额
   * * CREDIT: 授信支付
   */
  payWay?:
  | 'UNIONPAY'
  | 'WECHAT'
  | 'ALIPAY'
  | 'ADVANCE'
  | 'POINT'
  | 'CASH'
  | 'UNIONPAY_B2B'
  | 'COUPON'
  | 'BALANCE'
  | 'CREDIT';
  /**
   * 订单支付顺序
   * * NO_LIMIT: 0: NO_LIMIT 不限
   * * PAY_FIRST: 1: PAY_FIRST 先款后货
   */
  paymentOrder?: 'NO_LIMIT' | 'PAY_FIRST';
  /**
   * 订单来源方
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?:
  | 'BOSS'
  | 'CUSTOMER'
  | 'THIRD'
  | 'SUPPLIER'
  | 'PLATFORM'
  | 'MALL'
  | 'PROVIDER';
  /**
   * 积分订单类型 0：积分商品 1：积分优惠券
   * * POINTS_GOODS: 0: 积分兑换商品
   * * POINTS_COUPON: 1: 积分兑换优惠券
   */
  pointsOrderType?: 'POINTS_GOODS' | 'POINTS_COUPON';
  /**
   * 退款标识
   */
  refundFlag?: boolean;
  /**
   * 调用方的请求 IP
   */
  requestIp?: string;
  /**
   * 是否可退标识
   * * NO: 否
   * * YES: 是
   */
  returningFlag?: number;
  seller?: SellerVO2;
  /**
   * 卖家备注
   */
  sellerRemark?: string;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 开店礼包
   * * NO: 否
   * * YES: 是
   */
  storeBagsFlag?: 0 | 1;
  storeId?: number;
  /**
   * 是否组合套装
   */
  suitMarketingFlag?: boolean;
  supplier?: SupplierVO2;
  totalCommission?: number;
  tradeCoupon?: TradeCouponVO;
  /**
   * 发货单
   */
  tradeDelivers?: TradeDeliverVO3[];
  /**
   * 操作日志记录
   */
  tradeEventLogs?: TradeEventLogVO2[];
  tradeGroupon?: TradeGrouponVO;
  /**
   * 订单商品列表
   */
  tradeItems?: TradeItemVO3[];
  /**
   * 订单营销信息
   */
  tradeMarketings?: TradeMarketingVO[];
  tradePrice?: TradePriceVO2;
  tradePurchase?: TradePurchaseVO;
  tradeState?: TradeStateVO2;
  [k: string]: any;
}
/**
 * 购买人
 */
export interface BuyerVO2 {
  /**
   * 账号
   */
  account?: string;
  /**
   * 标识用户是否属于当前订单所属商家
   * * NO: 否
   * * YES: 是
   */
  customerFlag?: number;
  /**
   * 买家关联的业务员id
   */
  employeeId?: string;
  /**
   * 购买人编号
   */
  id?: string;
  /**
   * 等级编号
   */
  levelId?: number;
  /**
   * 等级名称
   */
  levelName?: string;
  /**
   * 购买人姓名
   */
  name?: string;
  /**
   * 母账号id
   */
  parentId?: string;
  /**
   * 手机号
   */
  phone?: string;
  [k: string]: any;
}
export interface TradeCommissionVO {
  commission?: number;
  customerId?: string;
  customerName?: string;
  distributorId?: string;
  [k: string]: any;
}
/**
 * 收货人信息
 */
export interface ConsigneeVO3 {
  /**
   * 详细地址
   */
  address?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 详细地址(包含省市区）
   */
  detailAddress?: string;
  /**
   * 期望收货时间
   */
  expectTime?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 收货人名称
   */
  name?: string;
  /**
   * 收货人电话
   */
  phone?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 收货地址修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface CreditPayInfoVO2 {
  /**
   * 授信设置id
   */
  creditSettingId?: string;
  /**
   * 账期结束时间
   */
  endTime?: string;
  /**
   * 是否已经还款
   */
  hasRepaid?: boolean;
  /**
   * 账期开始时间
   */
  startTime?: string;
  [k: string]: any;
}
export interface TradeDistributeItemVO {
  actualPaidPrice?: number;
  commission?: number;
  commissionRate?: number;
  commissions?: TradeDistributeItemCommissionVO[];
  goodsInfoId?: string;
  num?: number;
  [k: string]: any;
}
export interface TradeDistributeItemCommissionVO {
  commission?: number;
  customerId?: string;
  distributorId?: string;
  [k: string]: any;
}
export interface TradeItemVO2 {
  /**
   * 商品所属的userId storeId?
   */
  adminId?: string;
  /**
   * 货物id
   */
  bn?: string;
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 可退数量
   */
  canReturnNum?: number;
  /**
   * 分类id
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 分销佣金比例
   */
  commissionRate?: number;
  /**
   * 成本价
   */
  cost?: number;
  /**
   * 优惠券商品结算信息(包括商品参加的优惠券信息)
   */
  couponSettlements?: CouponSettlementVO[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 已发货数量
   */
  deliveredNum?: number;
  /**
   * 分销佣金
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
  flashSaleGoodsId?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否入账状态
   * * NO: 否
   * * YES: 是
   * * FAIL: 失败
   */
  isAccountStatus?: 0 | 1 | 2;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  /**
   * 商品价格
   */
  levelPrice?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementVO[];
  /**
   * 购买数量
   */
  num?: number;
  /**
   * oid
   */
  oid?: string;
  /**
   * 商品原价
   */
  originalPrice?: number;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分商品Id
   */
  pointsGoodsId?: string;
  /**
   * 积分兑换金额
   */
  pointsPrice?: number;
  /**
   * 成交价格
   */
  price?: number;
  /**
   * 结算价格
   */
  settlementPrice?: number;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * skuName
   */
  skuName?: string;
  /**
   * skuNo
   */
  skuNo?: string;
  /**
   * 规格描述信息
   */
  specDetails?: string;
  /**
   * 平摊小计
   */
  splitPrice?: number;
  /**
   * spuId
   */
  spuId?: string;
  /**
   * spuName
   */
  spuName?: string;
  /**
   * 店铺分类Id
   */
  storeCateId?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
/**
 * 发票
 */
export interface InvoiceVO {
  /**
   * 发票的收货地址
   */
  address?: string;
  /**
   * 收货地址ID
   */
  addressId?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 联系人
   */
  contacts?: string;
  generalInvoice?: GeneralInvoiceVO;
  /**
   * 订单开票id
   */
  orderInvoiceId?: string;
  /**
   * 联系电话
   */
  phone?: string;
  /**
   * 开票项目id
   */
  projectId?: string;
  /**
   * 开票项目名称
   */
  projectName?: string;
  /**
   * 开票项修改时间
   */
  projectUpdateTime?: string;
  /**
   * 省
   */
  provinceId?: number;
  specialInvoice?: SpecialInvoiceVO;
  /**
   * 是否单独的收货地址
   */
  sperator?: boolean;
  /**
   * 纳税人识别码
   */
  taxNo?: string;
  /**
   * 类型
   * * NORMAL: 普通发票
   * * SPECIAL: 增值税专用发票
   */
  type?: number;
  /**
   * 收货地址的修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 普通发票与增票至少一项必传
 */
export interface GeneralInvoiceVO {
  /**
   * 发票类型
   */
  flag?: number;
  /**
   * 纸质发票单位纳税人识别码
   */
  identification?: string;
  /**
   * 抬头，单位发票必传
   */
  title?: string;
  [k: string]: any;
}
/**
 * 增值税发票与普票至少一项必传
 */
export interface SpecialInvoiceVO {
  /**
   * 账号
   */
  account?: string;
  /**
   * 地址
   */
  address?: string;
  /**
   * 银行
   */
  bank?: string;
  /**
   * 公司名称
   */
  companyName?: string;
  /**
   * 公司编号
   */
  companyNo?: string;
  /**
   * 增值税发票id
   */
  id?: number;
  /**
   * 纳税人识别号
   */
  identification?: string;
  /**
   * 手机号
   */
  phoneNo?: string;
  [k: string]: any;
}
/**
 * 支付信息
 */
export interface PayInfoVO2 {
  /**
   * 描述
   */
  desc?: string;
  mergePay?: boolean;
  /**
   * 支付类型标识,0：在线支付 1：线下支付
   */
  payTypeId?: string;
  /**
   * 支付类型名称
   */
  payTypeName?: string;
  [k: string]: any;
}
/**
 * boss卖方
 */
export interface SellerVO2 {
  /**
   * 卖家ID
   */
  adminId?: string;
  /**
   * 代理人Id
   */
  proxyId?: string;
  /**
   * 代理人名称
   */
  proxyName?: string;
  [k: string]: any;
}
/**
 * 商家
 */
export interface SupplierVO2 {
  /**
   * 代理人Id
   */
  employeeId?: string;
  /**
   * 代理人名称
   */
  employeeName?: string;
  /**
   * 使用的运费模板类别
   * * NO: 否
   * * YES: 是
   */
  freightTemplateType?: 0 | 1;
  /**
   * 是否平台自营
   * * NO: 否
   * * YES: 是
   */
  isSelf?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 商家id
   */
  supplierId?: number;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * 订单使用的店铺优惠券
 */
export interface TradeCouponVO {
  /**
   * 优惠券码值
   */
  couponCode?: string;
  /**
   * 优惠券码id
   */
  couponCodeId?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   */
  couponType?: 0 | 1 | 2;
  /**
   * 优惠金额
   */
  discountsAmount?: number;
  /**
   * 购满多少钱
   */
  fullBuyPrice?: number;
  /**
   * 优惠券关联的商品id集合
   */
  goodsInfoIds?: string[];
  [k: string]: any;
}
export interface TradeDeliverVO3 {
  consignee?: ConsigneeVO;
  /**
   * 发货单号
   */
  deliverId?: string;
  /**
   * 发货时间
   */
  deliverTime?: string;
  /**
   * 赠品信息
   */
  giftItemList?: ShippingItemVO[];
  logistics?: LogisticsVO;
  /**
   * 发货清单
   */
  shippingItems?: ShippingItemVO1[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  status?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  [k: string]: any;
}
export interface TradeEventLogVO2 {
  /**
   * eventDetail
   */
  eventDetail?: string;
  /**
   * eventTime
   */
  eventTime?: string;
  /**
   * eventType
   */
  eventType?: string;
  operator?: Operator;
  [k: string]: any;
}
export interface TradeGrouponVO {
  goodId?: string;
  goodInfoId?: string;
  grouponActivityId?: string;
  grouponNo?: string;
  grouponOrderStatus?: '0' | '1' | '2' | '3';
  grouponSuccessTime?: string;
  leader?: boolean;
  returnNum?: number;
  returnPrice?: number;
  [k: string]: any;
}
export interface TradeItemVO3 {
  /**
   * 商品所属的userId storeId?
   */
  adminId?: string;
  /**
   * 货物id
   */
  bn?: string;
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 可退数量
   */
  canReturnNum?: number;
  /**
   * 分类id
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 分销佣金比例
   */
  commissionRate?: number;
  /**
   * 成本价
   */
  cost?: number;
  /**
   * 优惠券商品结算信息(包括商品参加的优惠券信息)
   */
  couponSettlements?: CouponSettlementVO[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 已发货数量
   */
  deliveredNum?: number;
  /**
   * 分销佣金
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
  flashSaleGoodsId?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否入账状态
   * * NO: 否
   * * YES: 是
   * * FAIL: 失败
   */
  isAccountStatus?: 0 | 1 | 2;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  /**
   * 商品价格
   */
  levelPrice?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementVO[];
  /**
   * 购买数量
   */
  num?: number;
  /**
   * oid
   */
  oid?: string;
  /**
   * 商品原价
   */
  originalPrice?: number;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分商品Id
   */
  pointsGoodsId?: string;
  /**
   * 积分兑换金额
   */
  pointsPrice?: number;
  /**
   * 成交价格
   */
  price?: number;
  /**
   * 结算价格
   */
  settlementPrice?: number;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * skuName
   */
  skuName?: string;
  /**
   * skuNo
   */
  skuNo?: string;
  /**
   * 规格描述信息
   */
  specDetails?: string;
  /**
   * 平摊小计
   */
  splitPrice?: number;
  /**
   * spuId
   */
  spuId?: string;
  /**
   * spuName
   */
  spuName?: string;
  /**
   * 店铺分类Id
   */
  storeCateId?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
export interface TradeMarketingVO {
  /**
   * 优惠金额
   */
  discountsAmount?: number;
  fullDiscountLevel?: MarketingFullDiscountLevelVO;
  /**
   * 当前满赠活动关联的赠品id列表，非满赠活动则为空
   */
  giftIds?: string[];
  giftLevel?: MarketingFullGiftLevelVO;
  /**
   * 营销Id
   */
  marketingId?: number;
  /**
   * 营销名称
   */
  marketingName?: string;
  /**
   * 营销活动类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * SUITS: 3：组合套餐
   */
  marketingType?: '0' | '1' | '2' | '3';
  /**
   * 该活动关联商品除去优惠金额外的应付金额
   */
  realPayAmount?: number;
  reductionLevel?: MarketingFullReductionLevelVO;
  /**
   * 该营销活动关联的订单商品id集合
   */
  skuIds?: string[];
  /**
   * 营销子类型
   * * REDUCTION_FULL_AMOUNT: 0：满金额减
   * * REDUCTION_FULL_COUNT: 1：满数量减
   * * DISCOUNT_FULL_AMOUNT: 2：满金额折
   * * DISCOUNT_FULL_COUNT: 3：满数量折
   * * GIFT_FULL_AMOUNT: 4：满金额赠
   * * GIFT_FULL_COUNT: 5：满数量赠
   * * SUITS_GOODS: 6：组合商品
   */
  subType?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  [k: string]: any;
}
/**
 * 营销满折多级优惠信息
 */
export interface MarketingFullDiscountLevelVO {
  /**
   * 满金额|数量后折扣
   */
  discount?: number;
  /**
   * 满折级别Id
   */
  discountLevelId?: number;
  /**
   * 满金额
   */
  fullAmount?: number;
  /**
   * 满数量
   */
  fullCount?: number;
  /**
   * 营销ID
   */
  marketingId?: number;
  [k: string]: any;
}
/**
 * 营销满赠多级优惠信息
 */
export interface MarketingFullGiftLevelVO {
  /**
   * 满金额赠
   */
  fullAmount?: number;
  /**
   * 满数量赠
   */
  fullCount?: number;
  /**
   * 满赠赠品明细列表
   */
  fullGiftDetailList?: MarketingFullGiftDetailVO[];
  /**
   * 满赠多级促销主键Id
   */
  giftLevelId?: number;
  /**
   * 赠品赠送的方式
   * * ALL: 0：全赠
   * * ONE: 1：赠一个
   */
  giftType?: 0 | 1;
  /**
   * 满赠营销Id
   */
  marketingId?: number;
  [k: string]: any;
}
export interface MarketingFullGiftDetailVO {
  /**
   * 满赠赠品主键Id
   */
  giftDetailId?: number;
  /**
   * 满赠多级促销Id
   */
  giftLevelId?: number;
  /**
   * 满赠营销ID
   */
  marketingId?: number;
  /**
   * 赠品Id
   */
  productId?: string;
  /**
   * 赠品数量
   */
  productNum?: number;
  [k: string]: any;
}
/**
 * 营销满减多级优惠信息
 */
export interface MarketingFullReductionLevelVO {
  /**
   * 满金额
   */
  fullAmount?: number;
  /**
   * 满数量
   */
  fullCount?: number;
  /**
   * 满减营销Id
   */
  marketingId?: number;
  /**
   * 满金额|数量后减多少元
   */
  reduction?: number;
  /**
   * 满减级别主键Id
   */
  reductionLevelId?: number;
  [k: string]: any;
}
/**
 * 订单价格
 */
export interface TradePriceVO2 {
  /**
   * 平台佣金
   */
  cmCommission?: number;
  /**
   * 优惠券优惠金额
   */
  couponPrice?: number;
  /**
   * 配送费用
   */
  deliveryPrice?: number;
  /**
   * 优惠金额
   */
  discountsPrice?: number;
  /**
   * 订单优惠金额明细
   */
  discountsPriceDetails?: DiscountsPriceDetailVO[];
  /**
   * 是否开启运费
   * * NO: 否
   * * YES: 是
   */
  enableDeliveryPrice?: number;
  /**
   * 商品总金额
   */
  goodsPrice?: number;
  /**
   * 积分数量
   */
  integral?: number;
  /**
   * 积分兑换金额
   */
  integralPrice?: number;
  /**
   * 发票费用
   */
  invoiceFee?: number;
  /**
   * 单个订单返利总金额
   */
  orderDistributionCommission?: number;
  /**
   * 原始金额, 不作为付费金额
   */
  originPrice?: number;
  /**
   * 积分价值
   */
  pointWorth?: number;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分兑换金额
   */
  pointsPrice?: number;
  /**
   * 特价金额
   */
  privilegePrice?: number;
  /**
   * 支付手续费
   */
  rate?: number;
  /**
   * 是否特价单
   * * NO: 否
   * * YES: 是
   */
  special?: number;
  /**
   * 订单实际支付金额
   */
  totalPayCash?: number;
  /**
   * 订单应付金额
   */
  totalPrice?: number;
  [k: string]: any;
}
/**
 * 订单采购信息
 */
export interface TradePurchaseVO {
  /**
   * 母子账号标识
   * * PRIMARY_ACCOUNT: 母账号
   * * CHILD_ACCOUNT: 子账号
   */
  identityType?: 0 | 1;
  /**
   * 是否为审批订单 0：否 1：是
   * * NO: 否
   * * YES: 是
   */
  isApprovalTrade?: 0 | 1;
  /**
   * 父级id
   */
  parentId?: string;
  /**
   * 审批信息
   */
  tradeApprovers?: TradeApproverVO[];
  [k: string]: any;
}
export interface TradeApproverVO {
  /**
   * 审批状态
   * * APPROVAL: 0: 审批中
   * * APPROVED: 1: 审批通过
   * * REJECTED: 2: 驳回
   */
  approvalStatus?: 'APPROVAL' | 'APPROVED' | 'REJECTED';
  /**
   * 审批时间
   */
  approvalTime?: string;
  /**
   * 审批来源 0: 发起人 1: 审批人
   * * INITIATOR: 0: 发起人
   * * APPROVER: 1: 审批人
   */
  approverPersonSource?: 'INITIATOR' | 'APPROVER';
  /**
   * 用户id
   */
  customerId?: string;
  /**
   * 用户名称
   */
  customerName?: string;
  /**
   * 头像
   */
  headImg?: string;
  /**
   * 驳回原因
   */
  rejectReason?: string;
  [k: string]: any;
}
/**
 * 订单总体状态
 */
export interface TradeStateVO2 {
  /**
   * 审批状态
   * * APPROVAL: 0: 审批中
   * * APPROVED: 1: 审批通过
   * * REJECTED: 2: 驳回
   */
  approvalStatus?: 'APPROVAL' | 'APPROVED' | 'REJECTED';
  /**
   * 审核状态
   * * NON_CHECKED: 0: 未审核
   * * CHECKED: 1: 已审核
   * * REJECTED: 2: 已打回
   */
  auditState?: 'NON_CHECKED' | 'CHECKED' | 'REJECTED';
  /**
   * 自动确认收货时间
   */
  autoConfirmTime?: string;
  /**
   * 开始时间
   */
  createTime?: string;
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 发货时间
   */
  deliverTime?: string;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 订单入账时间
   */
  finalTime?: string;
  /**
   * 流程状态
   * * INIT: 0: INIT 创建订单
   * * REMEDY: 1: REMEDY 修改订单
   * * REFUND: 2: REFUND 已退款
   * * AUDIT: 3: AUDIT 已审核
   * * DELIVERED_PART: 4: DELIVERED_PART 部分发货
   * * DELIVERED: 5: DELIVERED 已发货
   * * CONFIRMED: 6: CONFIRMED 已确认
   * * COMPLETED: 7: COMPLETED 已完成
   * * VOID: 8: VOID 已作废
   * * GROUPON: 9: GROUPON 已参团
   * * APPROVAL: 10: APPROVAL 审批中
   */
  flowState?:
  | 'INIT'
  | 'REMEDY'
  | 'REFUND'
  | 'AUDIT'
  | 'DELIVERED_PART'
  | 'DELIVERED'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'VOID'
  | 'GROUPON'
  | 'APPROVAL';
  /**
   * 修改时间
   */
  modifyTime?: string;
  /**
   * 作废原因
   */
  obsoleteReason?: string;
  /**
   * 支付状态
   * * NOT_PAID: 0: NOT_PAID 未支付
   * * UNCONFIRMED: 1: UNCONFIRMED 待确认
   * * PAID: 2: PAID 已支付
   */
  payState?: number;
  /**
   * 付款时间
   */
  payTime?: string;
  /**
   * 进入支付页面的时间
   */
  startPayTime?: string;
  [k: string]: any;
}
export interface Pageable2 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort3;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort6 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Page«TradeVO»".
 */
export interface PageTradeVO1 {
  content?: TradeVO[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: Pageable2;
  size?: number;
  sort?: Sort6;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeVO".
 */
export interface TradeVO1 {
  buyer?: BuyerVO2;
  /**
   * 买家备注
   */
  buyerRemark?: string;
  /**
   * 可还款金额
   */
  canRepayPrice?: number;
  /**
   * 是否可退标识
   * * NO: 否
   * * YES: 是
   */
  canReturnFlag?: number;
  /**
   * 可退积分
   */
  canReturnPoints?: number;
  /**
   * 可退金额
   */
  canReturnPrice?: number;
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  /**
   * 佣金（订单返利）
   */
  commission?: number;
  /**
   * 是否返利
   * * NO: 否
   * * YES: 是
   */
  commissionFlag?: number;
  commissions?: TradeCommissionVO[];
  consignee?: ConsigneeVO3;
  creditPayInfo?: CreditPayInfoVO2;
  /**
   * 配送方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递
   */
  deliverWay?: 0 | 1;
  distributeItems?: TradeDistributeItemVO[];
  distributionShareCustomerId?: string;
  /**
   * 邀请人分销员id
   */
  distributorId?: string;
  /**
   * 分销员名称
   */
  distributorName?: string;
  /**
   * 订单附件，以逗号隔开
   */
  encloses?: string;
  /**
   * 营销赠品全量列表
   */
  gifts?: TradeItemVO2[];
  /**
   * 订单组号
   */
  groupId?: string;
  grouponFlag?: boolean;
  /**
   * 是否被结算
   * * NO: 否
   * * YES: 是
   */
  hasBeanSettled?: number;
  /**
   * 订单号
   */
  id?: string;
  /**
   * 邀请人会员id
   */
  inviteeId?: string;
  invoice?: InvoiceVO;
  /**
   * 下单时是否已开启订单自动审核
   * * NO: 否
   * * YES: 是
   */
  isAuditOpen?: number;
  /**
   * 订单来源
   * * SUPPLIER: 0: 代客下单
   * * WECHAT: 1: 会员h5端下单
   * * PC: 2: 会员pc端下单
   * * APP: 3: 会员APP端下单
   * * LITTLEPROGRAM: 4: 会员小程序端下单
   */
  orderSource?: 'SUPPLIER' | 'WECHAT' | 'PC' | 'APP' | 'LITTLEPROGRAM';
  /**
   * 超时未支付取消订单时间
   */
  orderTimeOut?: string;
  /**
   * 订单类型 0：普通订单；1：积分订单
   * * NORMAL_ORDER: 0: 普通订单
   * * POINTS_ORDER: 1: 积分订单
   * * ALL_ORDER: 2: 所有订单
   */
  orderType?: 'NORMAL_ORDER' | 'POINTS_ORDER' | 'ALL_ORDER';
  /**
   * 父订单号，用于不同商家订单合并支付场景
   */
  parentId?: string;
  payGateway?:
  | 'UNIONPAY'
  | 'WECHAT'
  | 'ALIPAY'
  | 'ADVANCE'
  | 'POINT'
  | 'CASH'
  | 'UNIONPAY_B2B'
  | 'COUPON'
  | 'BALANCE'
  | 'CREDIT';
  payInfo?: PayInfoVO2;
  /**
   * 支付单ID
   */
  payOrderId?: string;
  /**
   * 支付方式
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   * * ADVANCE: 预存款
   * * POINT: 积分兑换
   * * CASH: 线下支付
   * * UNIONPAY_B2B: 企业银联
   * * COUPON: 优惠券
   * * BALANCE: 余额
   * * CREDIT: 授信支付
   */
  payWay?:
  | 'UNIONPAY'
  | 'WECHAT'
  | 'ALIPAY'
  | 'ADVANCE'
  | 'POINT'
  | 'CASH'
  | 'UNIONPAY_B2B'
  | 'COUPON'
  | 'BALANCE'
  | 'CREDIT';
  /**
   * 订单支付顺序
   * * NO_LIMIT: 0: NO_LIMIT 不限
   * * PAY_FIRST: 1: PAY_FIRST 先款后货
   */
  paymentOrder?: 'NO_LIMIT' | 'PAY_FIRST';
  /**
   * 订单来源方
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?:
  | 'BOSS'
  | 'CUSTOMER'
  | 'THIRD'
  | 'SUPPLIER'
  | 'PLATFORM'
  | 'MALL'
  | 'PROVIDER';
  /**
   * 积分订单类型 0：积分商品 1：积分优惠券
   * * POINTS_GOODS: 0: 积分兑换商品
   * * POINTS_COUPON: 1: 积分兑换优惠券
   */
  pointsOrderType?: 'POINTS_GOODS' | 'POINTS_COUPON';
  /**
   * 退款标识
   */
  refundFlag?: boolean;
  /**
   * 调用方的请求 IP
   */
  requestIp?: string;
  /**
   * 是否可退标识
   * * NO: 否
   * * YES: 是
   */
  returningFlag?: number;
  seller?: SellerVO2;
  /**
   * 卖家备注
   */
  sellerRemark?: string;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 开店礼包
   * * NO: 否
   * * YES: 是
   */
  storeBagsFlag?: 0 | 1;
  storeId?: number;
  /**
   * 是否组合套装
   */
  suitMarketingFlag?: boolean;
  supplier?: SupplierVO2;
  totalCommission?: number;
  tradeCoupon?: TradeCouponVO;
  /**
   * 发货单
   */
  tradeDelivers?: TradeDeliverVO3[];
  /**
   * 操作日志记录
   */
  tradeEventLogs?: TradeEventLogVO2[];
  tradeGroupon?: TradeGrouponVO;
  /**
   * 订单商品列表
   */
  tradeItems?: TradeItemVO3[];
  /**
   * 订单营销信息
   */
  tradeMarketings?: TradeMarketingVO[];
  tradePrice?: TradePriceVO2;
  tradePurchase?: TradePurchaseVO;
  tradeState?: TradeStateVO2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeCommissionVO".
 */
export interface TradeCommissionVO1 {
  commission?: number;
  customerId?: string;
  customerName?: string;
  distributorId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeDistributeItemVO".
 */
export interface TradeDistributeItemVO1 {
  actualPaidPrice?: number;
  commission?: number;
  commissionRate?: number;
  commissions?: TradeDistributeItemCommissionVO[];
  goodsInfoId?: string;
  num?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeDistributeItemCommissionVO".
 */
export interface TradeDistributeItemCommissionVO1 {
  commission?: number;
  customerId?: string;
  distributorId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "InvoiceVO".
 */
export interface InvoiceVO1 {
  /**
   * 发票的收货地址
   */
  address?: string;
  /**
   * 收货地址ID
   */
  addressId?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 联系人
   */
  contacts?: string;
  generalInvoice?: GeneralInvoiceVO;
  /**
   * 订单开票id
   */
  orderInvoiceId?: string;
  /**
   * 联系电话
   */
  phone?: string;
  /**
   * 开票项目id
   */
  projectId?: string;
  /**
   * 开票项目名称
   */
  projectName?: string;
  /**
   * 开票项修改时间
   */
  projectUpdateTime?: string;
  /**
   * 省
   */
  provinceId?: number;
  specialInvoice?: SpecialInvoiceVO;
  /**
   * 是否单独的收货地址
   */
  sperator?: boolean;
  /**
   * 纳税人识别码
   */
  taxNo?: string;
  /**
   * 类型
   * * NORMAL: 普通发票
   * * SPECIAL: 增值税专用发票
   */
  type?: number;
  /**
   * 收货地址的修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GeneralInvoiceVO".
 */
export interface GeneralInvoiceVO1 {
  /**
   * 发票类型
   */
  flag?: number;
  /**
   * 纸质发票单位纳税人识别码
   */
  identification?: string;
  /**
   * 抬头，单位发票必传
   */
  title?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SpecialInvoiceVO".
 */
export interface SpecialInvoiceVO1 {
  /**
   * 账号
   */
  account?: string;
  /**
   * 地址
   */
  address?: string;
  /**
   * 银行
   */
  bank?: string;
  /**
   * 公司名称
   */
  companyName?: string;
  /**
   * 公司编号
   */
  companyNo?: string;
  /**
   * 增值税发票id
   */
  id?: number;
  /**
   * 纳税人识别号
   */
  identification?: string;
  /**
   * 手机号
   */
  phoneNo?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeCouponVO".
 */
export interface TradeCouponVO1 {
  /**
   * 优惠券码值
   */
  couponCode?: string;
  /**
   * 优惠券码id
   */
  couponCodeId?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   */
  couponType?: 0 | 1 | 2;
  /**
   * 优惠金额
   */
  discountsAmount?: number;
  /**
   * 购满多少钱
   */
  fullBuyPrice?: number;
  /**
   * 优惠券关联的商品id集合
   */
  goodsInfoIds?: string[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeGrouponVO".
 */
export interface TradeGrouponVO1 {
  goodId?: string;
  goodInfoId?: string;
  grouponActivityId?: string;
  grouponNo?: string;
  grouponOrderStatus?: '0' | '1' | '2' | '3';
  grouponSuccessTime?: string;
  leader?: boolean;
  returnNum?: number;
  returnPrice?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeMarketingVO".
 */
export interface TradeMarketingVO1 {
  /**
   * 优惠金额
   */
  discountsAmount?: number;
  fullDiscountLevel?: MarketingFullDiscountLevelVO;
  /**
   * 当前满赠活动关联的赠品id列表，非满赠活动则为空
   */
  giftIds?: string[];
  giftLevel?: MarketingFullGiftLevelVO;
  /**
   * 营销Id
   */
  marketingId?: number;
  /**
   * 营销名称
   */
  marketingName?: string;
  /**
   * 营销活动类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * SUITS: 3：组合套餐
   */
  marketingType?: '0' | '1' | '2' | '3';
  /**
   * 该活动关联商品除去优惠金额外的应付金额
   */
  realPayAmount?: number;
  reductionLevel?: MarketingFullReductionLevelVO;
  /**
   * 该营销活动关联的订单商品id集合
   */
  skuIds?: string[];
  /**
   * 营销子类型
   * * REDUCTION_FULL_AMOUNT: 0：满金额减
   * * REDUCTION_FULL_COUNT: 1：满数量减
   * * DISCOUNT_FULL_AMOUNT: 2：满金额折
   * * DISCOUNT_FULL_COUNT: 3：满数量折
   * * GIFT_FULL_AMOUNT: 4：满金额赠
   * * GIFT_FULL_COUNT: 5：满数量赠
   * * SUITS_GOODS: 6：组合商品
   */
  subType?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MarketingFullDiscountLevelVO".
 */
export interface MarketingFullDiscountLevelVO1 {
  /**
   * 满金额|数量后折扣
   */
  discount?: number;
  /**
   * 满折级别Id
   */
  discountLevelId?: number;
  /**
   * 满金额
   */
  fullAmount?: number;
  /**
   * 满数量
   */
  fullCount?: number;
  /**
   * 营销ID
   */
  marketingId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MarketingFullGiftLevelVO".
 */
export interface MarketingFullGiftLevelVO1 {
  /**
   * 满金额赠
   */
  fullAmount?: number;
  /**
   * 满数量赠
   */
  fullCount?: number;
  /**
   * 满赠赠品明细列表
   */
  fullGiftDetailList?: MarketingFullGiftDetailVO[];
  /**
   * 满赠多级促销主键Id
   */
  giftLevelId?: number;
  /**
   * 赠品赠送的方式
   * * ALL: 0：全赠
   * * ONE: 1：赠一个
   */
  giftType?: 0 | 1;
  /**
   * 满赠营销Id
   */
  marketingId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MarketingFullGiftDetailVO".
 */
export interface MarketingFullGiftDetailVO1 {
  /**
   * 满赠赠品主键Id
   */
  giftDetailId?: number;
  /**
   * 满赠多级促销Id
   */
  giftLevelId?: number;
  /**
   * 满赠营销ID
   */
  marketingId?: number;
  /**
   * 赠品Id
   */
  productId?: string;
  /**
   * 赠品数量
   */
  productNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MarketingFullReductionLevelVO".
 */
export interface MarketingFullReductionLevelVO1 {
  /**
   * 满金额
   */
  fullAmount?: number;
  /**
   * 满数量
   */
  fullCount?: number;
  /**
   * 满减营销Id
   */
  marketingId?: number;
  /**
   * 满金额|数量后减多少元
   */
  reduction?: number;
  /**
   * 满减级别主键Id
   */
  reductionLevelId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradePurchaseVO".
 */
export interface TradePurchaseVO1 {
  /**
   * 母子账号标识
   * * PRIMARY_ACCOUNT: 母账号
   * * CHILD_ACCOUNT: 子账号
   */
  identityType?: 0 | 1;
  /**
   * 是否为审批订单 0：否 1：是
   * * NO: 否
   * * YES: 是
   */
  isApprovalTrade?: 0 | 1;
  /**
   * 父级id
   */
  parentId?: string;
  /**
   * 审批信息
   */
  tradeApprovers?: TradeApproverVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeApproverVO".
 */
export interface TradeApproverVO1 {
  /**
   * 审批状态
   * * APPROVAL: 0: 审批中
   * * APPROVED: 1: 审批通过
   * * REJECTED: 2: 驳回
   */
  approvalStatus?: 'APPROVAL' | 'APPROVED' | 'REJECTED';
  /**
   * 审批时间
   */
  approvalTime?: string;
  /**
   * 审批来源 0: 发起人 1: 审批人
   * * INITIATOR: 0: 发起人
   * * APPROVER: 1: 审批人
   */
  approverPersonSource?: 'INITIATOR' | 'APPROVER';
  /**
   * 用户id
   */
  customerId?: string;
  /**
   * 用户名称
   */
  customerName?: string;
  /**
   * 头像
   */
  headImg?: string;
  /**
   * 驳回原因
   */
  rejectReason?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeCommitRequest".
 */
export interface TradeCommitRequest {
  /**
   * 会计科目id
   */
  accountingSubjectId?: string;
  /**
   * 选择的平台优惠券(通用券)id
   */
  commonCodeId?: string;
  /**
   * 公司ID-SaaS
   */
  companyInfoIdAtSaaS?: number;
  /**
   * 收货地址详细信息(包含省市区)
   */
  consigneeAddress?: string;
  /**
   * 订单收货地址id
   */
  consigneeId?: string;
  /**
   * 收货地址修改时间
   */
  consigneeUpdateTime?: string;
  /**
   * 成本中心id
   */
  costCenterId?: string;
  customer?: CustomerVO;
  distributeChannel?: DistributeChannel1;
  /**
   * 是否强制提交
   * * NO: 否
   * * YES: 是
   */
  forceCommit?: number;
  isDistributor?: '0' | '1';
  isFlashSaleGoods?: boolean;
  openFlag?: '0' | '1';
  operator?: Operator3;
  /**
   * 订单来源
   * * SUPPLIER: 0: 代客下单
   * * WECHAT: 1: 会员h5端下单
   * * PC: 2: 会员pc端下单
   * * APP: 3: 会员APP端下单
   * * LITTLEPROGRAM: 4: 会员小程序端下单
   */
  orderSource?: 'SUPPLIER' | 'WECHAT' | 'PC' | 'APP' | 'LITTLEPROGRAM';
  /**
   * 父级id
   */
  parentCustomerId?: string;
  /**
   * 使用积分
   */
  points?: number;
  /**
   * 分享人id
   */
  shareUserId?: string;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 订单信息
   */
  storeCommitInfoList?: StoreCommitInfoDTO[];
  /**
   * 店铺ID-SaaS
   */
  storeIdAtSaaS?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * 下单用户
 */
export interface CustomerVO {
  /**
   * 审批人id
   */
  approverId?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  checkState?: 0 | 1 | 2;
  /**
   * 所属商家Id
   */
  companyInfoId?: number;
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
  customerDetail?: null;
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
   * 冻结状态 0: 未冻结  1: 已冻结
   * * NOT_FROZEN: 未冻结
   * * FROZEN: 已冻结
   */
  frozenState?: 0 | 1;
  /**
   * 客户成长值
   */
  growthValue?: number;
  /**
   * 头像
   */
  headImg?: string;
  /**
   * 母子账号标识
   * * PRIMARY_ACCOUNT: 母账号
   * * CHILD_ACCOUNT: 子账号
   */
  identityType?: 0 | 1;
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
   * 父级id
   */
  parentId?: string;
  /**
   * 支付密码错误次数
   */
  payErrorTime?: number;
  /**
   * 支付锁定时间
   */
  payLockTime?: string;
  /**
   * 支付密码的安全等级
   */
  paySafeLevel?: number;
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
   * 店铺Id
   */
  storeId?: number;
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
 * 分销渠道
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
 * 操作人
 */
export interface Operator3 {
  /**
   * 操作人账号
   */
  account?: string;
  /**
   * 管理员Id
   */
  adminId?: string;
  /**
   * 公司Id
   */
  companyInfoId?: number;
  /**
   * 供应商类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  /**
   * 父级账号
   */
  customerAccount?: string;
  /**
   * 母子账号标识 0:母账号  1:子账号
   */
  identityType?: number;
  /**
   * 操作所在的Ip地址
   */
  ip?: string;
  /**
   * 操作人
   */
  name?: string;
  /**
   * 父级id
   */
  parentCustomerId?: string;
  /**
   * 操作方
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?:
  | 'BOSS'
  | 'CUSTOMER'
  | 'THIRD'
  | 'SUPPLIER'
  | 'PLATFORM'
  | 'MALL'
  | 'PROVIDER';
  /**
   * 店铺id
   */
  storeId?: string;
  /**
   * 用户Id
   */
  userId?: string;
  [k: string]: any;
}
export interface StoreCommitInfoDTO {
  /**
   * 订单备注
   */
  buyerRemark?: string;
  /**
   * 公司ID-SaaS
   */
  companyInfoIdAtSaaS?: number;
  /**
   * 选择的店铺优惠券id
   */
  couponCodeId?: string;
  /**
   * 配送方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递
   */
  deliverWay?: 0 | 1;
  /**
   * 附件,逗号隔开
   */
  encloses?: string;
  generalInvoice?: GeneralInvoiceDTO;
  /**
   * 收货地址详细信息（包含省市区）,如果需要开票,则必传
   */
  invoiceAddressDetail?: string;
  /**
   * 发票的收货地址ID,如果需要开票,则必传
   */
  invoiceAddressId?: string;
  /**
   * 发票收货地址修改时间
   */
  invoiceAddressUpdateTime?: string;
  /**
   * 开票项目id,如果需要开票则必传
   */
  invoiceProjectId?: string;
  /**
   * 开票项目名称,如果需要开票则必传
   */
  invoiceProjectName?: string;
  /**
   * 开票项修改时间
   */
  invoiceProjectUpdateTime?: string;
  /**
   * 开票类型
   */
  invoiceType: number;
  /**
   * 父级id
   */
  parentCustomerId?: string;
  /**
   * 支付类型
   * * ONLINE: 在线支付
   * * OFFLINE: 线下支付
   * * CREDIT: 授信支付
   */
  payType?: '0' | '1' | '2';
  specialInvoice?: SpecialInvoiceDTO;
  /**
   * 是否单独的收货地址
   * * NO: 否
   * * YES: 是
   */
  specialInvoiceAddress?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺ID-SaaS
   */
  storeIdAtSaaS?: number;
  storeOpenFlag?: '0' | '1';
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * 普通发票与增票参数,如果需要开票则至少一项必传
 */
export interface GeneralInvoiceDTO {
  /**
   * 发票类型
   * * NORMAL: 普通发票
   * * SPECIAL: 增值税专用发票
   */
  flag?: number;
  /**
   * 纸质发票单位纳税人识别码
   */
  identification?: string;
  /**
   * 抬头
   */
  title?: string;
  [k: string]: any;
}
/**
 * 增值税发票,如果需要开票则与普票至少一项必传
 */
export interface SpecialInvoiceDTO {
  /**
   * 公司账号
   */
  account?: string;
  /**
   * 地址
   */
  address?: string;
  /**
   * 开户银行
   */
  bank?: string;
  /**
   * 公司名称
   */
  companyName?: string;
  /**
   * 公司编号
   */
  companyNo?: string;
  /**
   * 增值税发票id，新增与修改时必传
   */
  id?: number;
  /**
   * 纳税人识别号
   */
  identification?: string;
  /**
   * 联系方式
   */
  phoneNo?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerVO".
 */
export interface CustomerVO1 {
  /**
   * 审批人id
   */
  approverId?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  checkState?: 0 | 1 | 2;
  /**
   * 所属商家Id
   */
  companyInfoId?: number;
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
  customerDetail?: null;
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
   * 冻结状态 0: 未冻结  1: 已冻结
   * * NOT_FROZEN: 未冻结
   * * FROZEN: 已冻结
   */
  frozenState?: 0 | 1;
  /**
   * 客户成长值
   */
  growthValue?: number;
  /**
   * 头像
   */
  headImg?: string;
  /**
   * 母子账号标识
   * * PRIMARY_ACCOUNT: 母账号
   * * CHILD_ACCOUNT: 子账号
   */
  identityType?: 0 | 1;
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
   * 父级id
   */
  parentId?: string;
  /**
   * 支付密码错误次数
   */
  payErrorTime?: number;
  /**
   * 支付锁定时间
   */
  payLockTime?: string;
  /**
   * 支付密码的安全等级
   */
  paySafeLevel?: number;
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
   * 店铺Id
   */
  storeId?: number;
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
 * via the `definition` "CustomerDetailVO".
 */
export interface CustomerDetailVO {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 生日
   */
  birthDay?: string;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 所属商家Id
   */
  companyInfoId?: number;
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
  customerVO?: CustomerVO2;
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
   * 性别，0女，1男
   * * FEMALE: 女
   * * MALE: 男
   * * SECRET: 保密
   */
  gender?: 0 | 1 | 2;
  /**
   * 是否为分销员
   * * NO: 否
   * * YES: 是
   */
  isDistributor?: 0 | 1;
  /**
   * 是否为员工 0：否 1：是
   */
  isEmployee?: number;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 审核驳回理由
   */
  rejectReason?: string;
  /**
   * 店铺Id
   */
  storeId?: number;
  /**
   * 街道
   */
  streetId?: number;
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
export interface CustomerVO2 {
  /**
   * 审批人id
   */
  approverId?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  checkState?: 0 | 1 | 2;
  /**
   * 所属商家Id
   */
  companyInfoId?: number;
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
  customerDetail?: null;
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
   * 冻结状态 0: 未冻结  1: 已冻结
   * * NOT_FROZEN: 未冻结
   * * FROZEN: 已冻结
   */
  frozenState?: 0 | 1;
  /**
   * 客户成长值
   */
  growthValue?: number;
  /**
   * 头像
   */
  headImg?: string;
  /**
   * 母子账号标识
   * * PRIMARY_ACCOUNT: 母账号
   * * CHILD_ACCOUNT: 子账号
   */
  identityType?: 0 | 1;
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
   * 父级id
   */
  parentId?: string;
  /**
   * 支付密码错误次数
   */
  payErrorTime?: number;
  /**
   * 支付锁定时间
   */
  payLockTime?: string;
  /**
   * 支付密码的安全等级
   */
  paySafeLevel?: number;
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
   * 店铺Id
   */
  storeId?: number;
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
 * via the `definition` "DistributeChannel".
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
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreCommitInfoDTO".
 */
export interface StoreCommitInfoDTO1 {
  /**
   * 订单备注
   */
  buyerRemark?: string;
  /**
   * 公司ID-SaaS
   */
  companyInfoIdAtSaaS?: number;
  /**
   * 选择的店铺优惠券id
   */
  couponCodeId?: string;
  /**
   * 配送方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递
   */
  deliverWay?: 0 | 1;
  /**
   * 附件,逗号隔开
   */
  encloses?: string;
  generalInvoice?: GeneralInvoiceDTO;
  /**
   * 收货地址详细信息（包含省市区）,如果需要开票,则必传
   */
  invoiceAddressDetail?: string;
  /**
   * 发票的收货地址ID,如果需要开票,则必传
   */
  invoiceAddressId?: string;
  /**
   * 发票收货地址修改时间
   */
  invoiceAddressUpdateTime?: string;
  /**
   * 开票项目id,如果需要开票则必传
   */
  invoiceProjectId?: string;
  /**
   * 开票项目名称,如果需要开票则必传
   */
  invoiceProjectName?: string;
  /**
   * 开票项修改时间
   */
  invoiceProjectUpdateTime?: string;
  /**
   * 开票类型
   */
  invoiceType: number;
  /**
   * 父级id
   */
  parentCustomerId?: string;
  /**
   * 支付类型
   * * ONLINE: 在线支付
   * * OFFLINE: 线下支付
   * * CREDIT: 授信支付
   */
  payType?: '0' | '1' | '2';
  specialInvoice?: SpecialInvoiceDTO;
  /**
   * 是否单独的收货地址
   * * NO: 否
   * * YES: 是
   */
  specialInvoiceAddress?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺ID-SaaS
   */
  storeIdAtSaaS?: number;
  storeOpenFlag?: '0' | '1';
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GeneralInvoiceDTO".
 */
export interface GeneralInvoiceDTO1 {
  /**
   * 发票类型
   * * NORMAL: 普通发票
   * * SPECIAL: 增值税专用发票
   */
  flag?: number;
  /**
   * 纸质发票单位纳税人识别码
   */
  identification?: string;
  /**
   * 抬头
   */
  title?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SpecialInvoiceDTO".
 */
export interface SpecialInvoiceDTO1 {
  /**
   * 公司账号
   */
  account?: string;
  /**
   * 地址
   */
  address?: string;
  /**
   * 开户银行
   */
  bank?: string;
  /**
   * 公司名称
   */
  companyName?: string;
  /**
   * 公司编号
   */
  companyNo?: string;
  /**
   * 增值税发票id，新增与修改时必传
   */
  id?: number;
  /**
   * 纳税人识别号
   */
  identification?: string;
  /**
   * 联系方式
   */
  phoneNo?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«List«TradeCommitResultVO»»".
 */
export interface BaseResponseListTradeCommitResultVO {
  /**
   * 结果码
   */
  code: string;
  context?: TradeCommitResultVOArray;
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
export interface TradeCommitResultVO {
  /**
   * 订单取消时间
   */
  orderTimeOut?: string;
  /**
   * 父订单号
   */
  parentTid?: string;
  /**
   * 订单支付顺序
   * * NO_LIMIT: 0: NO_LIMIT 不限
   * * PAY_FIRST: 1: PAY_FIRST 先款后货
   */
  paymentOrder?: 'NO_LIMIT' | 'PAY_FIRST';
  /**
   * 交易金额
   */
  price?: number;
  /**
   * 订单编号
   */
  tid?: string;
  tradeState?: TradeStateVO3;
  [k: string]: any;
}
/**
 * 订单状态
 */
export interface TradeStateVO3 {
  /**
   * 审批状态
   * * APPROVAL: 0: 审批中
   * * APPROVED: 1: 审批通过
   * * REJECTED: 2: 驳回
   */
  approvalStatus?: 'APPROVAL' | 'APPROVED' | 'REJECTED';
  /**
   * 审核状态
   * * NON_CHECKED: 0: 未审核
   * * CHECKED: 1: 已审核
   * * REJECTED: 2: 已打回
   */
  auditState?: 'NON_CHECKED' | 'CHECKED' | 'REJECTED';
  /**
   * 自动确认收货时间
   */
  autoConfirmTime?: string;
  /**
   * 开始时间
   */
  createTime?: string;
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 发货时间
   */
  deliverTime?: string;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 订单入账时间
   */
  finalTime?: string;
  /**
   * 流程状态
   * * INIT: 0: INIT 创建订单
   * * REMEDY: 1: REMEDY 修改订单
   * * REFUND: 2: REFUND 已退款
   * * AUDIT: 3: AUDIT 已审核
   * * DELIVERED_PART: 4: DELIVERED_PART 部分发货
   * * DELIVERED: 5: DELIVERED 已发货
   * * CONFIRMED: 6: CONFIRMED 已确认
   * * COMPLETED: 7: COMPLETED 已完成
   * * VOID: 8: VOID 已作废
   * * GROUPON: 9: GROUPON 已参团
   * * APPROVAL: 10: APPROVAL 审批中
   */
  flowState?:
  | 'INIT'
  | 'REMEDY'
  | 'REFUND'
  | 'AUDIT'
  | 'DELIVERED_PART'
  | 'DELIVERED'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'VOID'
  | 'GROUPON'
  | 'APPROVAL';
  /**
   * 修改时间
   */
  modifyTime?: string;
  /**
   * 作废原因
   */
  obsoleteReason?: string;
  /**
   * 支付状态
   * * NOT_PAID: 0: NOT_PAID 未支付
   * * UNCONFIRMED: 1: UNCONFIRMED 待确认
   * * PAID: 2: PAID 已支付
   */
  payState?: number;
  /**
   * 付款时间
   */
  payTime?: string;
  /**
   * 进入支付页面的时间
   */
  startPayTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeCommitResultVO".
 */
export interface TradeCommitResultVO1 {
  /**
   * 订单取消时间
   */
  orderTimeOut?: string;
  /**
   * 父订单号
   */
  parentTid?: string;
  /**
   * 订单支付顺序
   * * NO_LIMIT: 0: NO_LIMIT 不限
   * * PAY_FIRST: 1: PAY_FIRST 先款后货
   */
  paymentOrder?: 'NO_LIMIT' | 'PAY_FIRST';
  /**
   * 交易金额
   */
  price?: number;
  /**
   * 订单编号
   */
  tid?: string;
  tradeState?: TradeStateVO3;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeItemConfirmRequest".
 */
export interface TradeItemConfirmRequest {
  /**
   * 公司ID-SaaS
   */
  companyInfoIdAtSaaS?: number;
  /**
   * 是否强制确认，用于营销活动有效性校验,true: 无效依然提交， false: 无效做异常返回
   */
  forceConfirm?: boolean;
  /**
   * 父级id
   */
  parentCustomerId?: string;
  /**
   * 店铺ID-SaaS
   */
  storeIdAtSaaS?: number;
  /**
   * 商品信息
   */
  tradeItems?: TradeItemRequest[];
  /**
   * 订单营销信息快照
   */
  tradeMarketingList?: TradeMarketingDTO[];
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
export interface TradeItemRequest {
  /**
   * 公司ID-SaaS
   */
  companyInfoIdAtSaaS?: number;
  flashSaleGoodsId?: number;
  isFlashSaleGoods?: boolean;
  /**
   * 购买数量
   */
  num?: number;
  /**
   * 父级id
   */
  parentCustomerId?: string;
  /**
   * 购买商品的价格
   */
  price?: number;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * 店铺ID-SaaS
   */
  storeIdAtSaaS?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
export interface TradeMarketingDTO {
  /**
   * 如果是满赠，则填入用户选择的赠品id集合
   */
  giftSkuIds?: string[];
  /**
   * 营销活动Id
   */
  marketingId?: number;
  /**
   * 营销等级id
   */
  marketingLevelId?: number;
  /**
   * 该营销活动关联的订单商品id集合
   */
  skuIds?: string[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeItemRequest".
 */
export interface TradeItemRequest1 {
  /**
   * 公司ID-SaaS
   */
  companyInfoIdAtSaaS?: number;
  flashSaleGoodsId?: number;
  isFlashSaleGoods?: boolean;
  /**
   * 购买数量
   */
  num?: number;
  /**
   * 父级id
   */
  parentCustomerId?: string;
  /**
   * 购买商品的价格
   */
  price?: number;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * 店铺ID-SaaS
   */
  storeIdAtSaaS?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeMarketingDTO".
 */
export interface TradeMarketingDTO1 {
  /**
   * 如果是满赠，则填入用户选择的赠品id集合
   */
  giftSkuIds?: string[];
  /**
   * 营销活动Id
   */
  marketingId?: number;
  /**
   * 营销等级id
   */
  marketingLevelId?: number;
  /**
   * 该营销活动关联的订单商品id集合
   */
  skuIds?: string[];
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
 * via the `definition` "DeliveryQueryRequest".
 */
export interface DeliveryQueryRequest {
  /**
   * 快递公司代码
   */
  companyCode?: string;
  /**
   * 公司ID-SaaS
   */
  companyInfoIdAtSaaS?: number;
  /**
   * 快递单号
   */
  deliveryNo?: string;
  /**
   * 父级id
   */
  parentCustomerId?: string;
  /**
   * 商户id
   */
  storeId?: number;
  /**
   * 店铺ID-SaaS
   */
  storeIdAtSaaS?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«TradeVO»".
 */
export interface BaseResponseTradeVO {
  /**
   * 结果码
   */
  code: string;
  context?: TradeVO2;
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
export interface TradeVO2 {
  buyer?: BuyerVO2;
  /**
   * 买家备注
   */
  buyerRemark?: string;
  /**
   * 可还款金额
   */
  canRepayPrice?: number;
  /**
   * 是否可退标识
   * * NO: 否
   * * YES: 是
   */
  canReturnFlag?: number;
  /**
   * 可退积分
   */
  canReturnPoints?: number;
  /**
   * 可退金额
   */
  canReturnPrice?: number;
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  /**
   * 佣金（订单返利）
   */
  commission?: number;
  /**
   * 是否返利
   * * NO: 否
   * * YES: 是
   */
  commissionFlag?: number;
  commissions?: TradeCommissionVO[];
  consignee?: ConsigneeVO3;
  creditPayInfo?: CreditPayInfoVO2;
  /**
   * 配送方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递
   */
  deliverWay?: 0 | 1;
  distributeItems?: TradeDistributeItemVO[];
  distributionShareCustomerId?: string;
  /**
   * 邀请人分销员id
   */
  distributorId?: string;
  /**
   * 分销员名称
   */
  distributorName?: string;
  /**
   * 订单附件，以逗号隔开
   */
  encloses?: string;
  /**
   * 营销赠品全量列表
   */
  gifts?: TradeItemVO2[];
  /**
   * 订单组号
   */
  groupId?: string;
  grouponFlag?: boolean;
  /**
   * 是否被结算
   * * NO: 否
   * * YES: 是
   */
  hasBeanSettled?: number;
  /**
   * 订单号
   */
  id?: string;
  /**
   * 邀请人会员id
   */
  inviteeId?: string;
  invoice?: InvoiceVO;
  /**
   * 下单时是否已开启订单自动审核
   * * NO: 否
   * * YES: 是
   */
  isAuditOpen?: number;
  /**
   * 订单来源
   * * SUPPLIER: 0: 代客下单
   * * WECHAT: 1: 会员h5端下单
   * * PC: 2: 会员pc端下单
   * * APP: 3: 会员APP端下单
   * * LITTLEPROGRAM: 4: 会员小程序端下单
   */
  orderSource?: 'SUPPLIER' | 'WECHAT' | 'PC' | 'APP' | 'LITTLEPROGRAM';
  /**
   * 超时未支付取消订单时间
   */
  orderTimeOut?: string;
  /**
   * 订单类型 0：普通订单；1：积分订单
   * * NORMAL_ORDER: 0: 普通订单
   * * POINTS_ORDER: 1: 积分订单
   * * ALL_ORDER: 2: 所有订单
   */
  orderType?: 'NORMAL_ORDER' | 'POINTS_ORDER' | 'ALL_ORDER';
  /**
   * 父订单号，用于不同商家订单合并支付场景
   */
  parentId?: string;
  payGateway?:
  | 'UNIONPAY'
  | 'WECHAT'
  | 'ALIPAY'
  | 'ADVANCE'
  | 'POINT'
  | 'CASH'
  | 'UNIONPAY_B2B'
  | 'COUPON'
  | 'BALANCE'
  | 'CREDIT';
  payInfo?: PayInfoVO2;
  /**
   * 支付单ID
   */
  payOrderId?: string;
  /**
   * 支付方式
   * * UNIONPAY: 银联
   * * WECHAT: 微信
   * * ALIPAY: 支付宝
   * * ADVANCE: 预存款
   * * POINT: 积分兑换
   * * CASH: 线下支付
   * * UNIONPAY_B2B: 企业银联
   * * COUPON: 优惠券
   * * BALANCE: 余额
   * * CREDIT: 授信支付
   */
  payWay?:
  | 'UNIONPAY'
  | 'WECHAT'
  | 'ALIPAY'
  | 'ADVANCE'
  | 'POINT'
  | 'CASH'
  | 'UNIONPAY_B2B'
  | 'COUPON'
  | 'BALANCE'
  | 'CREDIT';
  /**
   * 订单支付顺序
   * * NO_LIMIT: 0: NO_LIMIT 不限
   * * PAY_FIRST: 1: PAY_FIRST 先款后货
   */
  paymentOrder?: 'NO_LIMIT' | 'PAY_FIRST';
  /**
   * 订单来源方
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?:
  | 'BOSS'
  | 'CUSTOMER'
  | 'THIRD'
  | 'SUPPLIER'
  | 'PLATFORM'
  | 'MALL'
  | 'PROVIDER';
  /**
   * 积分订单类型 0：积分商品 1：积分优惠券
   * * POINTS_GOODS: 0: 积分兑换商品
   * * POINTS_COUPON: 1: 积分兑换优惠券
   */
  pointsOrderType?: 'POINTS_GOODS' | 'POINTS_COUPON';
  /**
   * 退款标识
   */
  refundFlag?: boolean;
  /**
   * 调用方的请求 IP
   */
  requestIp?: string;
  /**
   * 是否可退标识
   * * NO: 否
   * * YES: 是
   */
  returningFlag?: number;
  seller?: SellerVO2;
  /**
   * 卖家备注
   */
  sellerRemark?: string;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 开店礼包
   * * NO: 否
   * * YES: 是
   */
  storeBagsFlag?: 0 | 1;
  storeId?: number;
  /**
   * 是否组合套装
   */
  suitMarketingFlag?: boolean;
  supplier?: SupplierVO2;
  totalCommission?: number;
  tradeCoupon?: TradeCouponVO;
  /**
   * 发货单
   */
  tradeDelivers?: TradeDeliverVO3[];
  /**
   * 操作日志记录
   */
  tradeEventLogs?: TradeEventLogVO2[];
  tradeGroupon?: TradeGrouponVO;
  /**
   * 订单商品列表
   */
  tradeItems?: TradeItemVO3[];
  /**
   * 订单营销信息
   */
  tradeMarketings?: TradeMarketingVO[];
  tradePrice?: TradePriceVO2;
  tradePurchase?: TradePurchaseVO;
  tradeState?: TradeStateVO2;
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
 * via the `definition` "TradeParamsRequest".
 */
export interface TradeParamsRequest {
  /**
   * 是否后端操作
   * * NO: 否
   * * YES: 是
   */
  backendFlag?: number;
  /**
   * 订单买家备注
   */
  buyerRemark?: string;
  /**
   * 是否为下单
   * * NO: 否
   * * YES: 是
   */
  commitFlag?: number;
  consignee?: ConsigneeDTO;
  /**
   * 选择的收货地址id
   */
  consigneeId?: string;
  /**
   * 收货地址修改时间
   */
  consigneeUpdateTime?: string;
  /**
   * 选择的店铺优惠券id
   */
  couponCodeId?: string;
  customer?: CustomerVO3;
  /**
   * 配送方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递
   */
  deliverWay?: 0 | 1;
  /**
   * 收货地址详细信息
   */
  detailAddress?: string;
  /**
   * 附件, 逗号隔开
   */
  encloses?: string;
  /**
   * 是否强制提交
   * * NO: 否
   * * YES: 是
   */
  forceCommit?: number;
  invoice?: InvoiceDTO;
  invoiceConsignee?: ConsigneeDTO1;
  /**
   * 操作人ip
   */
  ip?: string;
  /**
   * 营销活动
   */
  marketingList?: TradeMarketingDTO2[];
  /**
   * 旧订单赠品数据，用于编辑订单的场景，
   */
  oldGifts?: TradeItemDTO[];
  /**
   * 旧订单商品数据，用于编辑订单的场景
   */
  oldTradeItems?: TradeItemDTO1[];
  payType?: '0' | '1' | '2';
  /**
   * 订单来源方
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?:
  | 'BOSS'
  | 'CUSTOMER'
  | 'THIRD'
  | 'SUPPLIER'
  | 'PLATFORM'
  | 'MALL'
  | 'PROVIDER';
  seller?: SellerDTO;
  /**
   * 订单卖家备注
   */
  sellerRemark?: string;
  storeLevel?: CustomerLevelVO;
  supplier?: SupplierDTO;
  /**
   * 订单商品数据
   */
  tradeItems?: TradeItemDTO2[];
  tradePrice?: TradePriceDTO;
  [k: string]: any;
}
/**
 * 填写的临时收货地址
 */
export interface ConsigneeDTO {
  /**
   * 详细地址
   */
  address?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 详细地址(包含省市区）
   */
  detailAddress?: string;
  /**
   * 期望收货时间
   */
  expectTime?: string;
  /**
   * CustomerDeliveredAddress Id
   */
  id?: string;
  /**
   * 收货人名称
   */
  name?: string;
  /**
   * 收货人电话
   */
  phone?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 收货地址修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 下单客户
 */
export interface CustomerVO3 {
  /**
   * 审批人id
   */
  approverId?: string;
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核未通过
   */
  checkState?: 0 | 1 | 2;
  /**
   * 所属商家Id
   */
  companyInfoId?: number;
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
  customerDetail?: null;
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
   * 冻结状态 0: 未冻结  1: 已冻结
   * * NOT_FROZEN: 未冻结
   * * FROZEN: 已冻结
   */
  frozenState?: 0 | 1;
  /**
   * 客户成长值
   */
  growthValue?: number;
  /**
   * 头像
   */
  headImg?: string;
  /**
   * 母子账号标识
   * * PRIMARY_ACCOUNT: 母账号
   * * CHILD_ACCOUNT: 子账号
   */
  identityType?: 0 | 1;
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
   * 父级id
   */
  parentId?: string;
  /**
   * 支付密码错误次数
   */
  payErrorTime?: number;
  /**
   * 支付锁定时间
   */
  payLockTime?: string;
  /**
   * 支付密码的安全等级
   */
  paySafeLevel?: number;
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
   * 店铺Id
   */
  storeId?: number;
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
 * 发票信息
 */
export interface InvoiceDTO {
  /**
   * 发票的收货地址
   */
  address?: string;
  /**
   * 收货地址ID
   */
  addressId?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 联系人
   */
  contacts?: string;
  generalInvoice?: GeneralInvoiceDTO2;
  /**
   * 订单开票id
   */
  orderInvoiceId?: string;
  /**
   * 联系电话
   */
  phone?: string;
  /**
   * 开票项目id
   */
  projectId?: string;
  /**
   * 开票项目名称
   */
  projectName?: string;
  /**
   * 开票项修改时间
   */
  projectUpdateTime?: string;
  /**
   * 省
   */
  provinceId?: number;
  specialInvoice?: SpecialInvoiceDTO2;
  /**
   * 是否单独的收货地址
   */
  sperator?: boolean;
  /**
   * 纳税人识别码
   */
  taxNo?: string;
  /**
   * 发票类型
   * * NORMAL: 普通发票
   * * SPECIAL: 增值税专用发票
   */
  type?: number;
  /**
   * 收货地址的修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 普通发票与增票至少一项必传
 */
export interface GeneralInvoiceDTO2 {
  /**
   * 发票类型
   * * NORMAL: 普通发票
   * * SPECIAL: 增值税专用发票
   */
  flag?: number;
  /**
   * 纸质发票单位纳税人识别码
   */
  identification?: string;
  /**
   * 抬头
   */
  title?: string;
  [k: string]: any;
}
/**
 * 增值税发票与普票至少一项必传
 */
export interface SpecialInvoiceDTO2 {
  /**
   * 公司账号
   */
  account?: string;
  /**
   * 地址
   */
  address?: string;
  /**
   * 开户银行
   */
  bank?: string;
  /**
   * 公司名称
   */
  companyName?: string;
  /**
   * 公司编号
   */
  companyNo?: string;
  /**
   * 增值税发票id，新增与修改时必传
   */
  id?: number;
  /**
   * 纳税人识别号
   */
  identification?: string;
  /**
   * 联系方式
   */
  phoneNo?: string;
  [k: string]: any;
}
/**
 * 发票临时收货地址
 */
export interface ConsigneeDTO1 {
  /**
   * 详细地址
   */
  address?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 详细地址(包含省市区）
   */
  detailAddress?: string;
  /**
   * 期望收货时间
   */
  expectTime?: string;
  /**
   * CustomerDeliveredAddress Id
   */
  id?: string;
  /**
   * 收货人名称
   */
  name?: string;
  /**
   * 收货人电话
   */
  phone?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 收货地址修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface TradeMarketingDTO2 {
  /**
   * 如果是满赠，则填入用户选择的赠品id集合
   */
  giftSkuIds?: string[];
  /**
   * 营销活动Id
   */
  marketingId?: number;
  /**
   * 营销等级id
   */
  marketingLevelId?: number;
  /**
   * 该营销活动关联的订单商品id集合
   */
  skuIds?: string[];
  [k: string]: any;
}
export interface TradeItemDTO {
  /**
   * 商品所属的userId
   */
  adminId?: string;
  /**
   * 货物id
   */
  bn?: string;
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 可退数量
   */
  canReturnNum?: number;
  /**
   * 分类
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 成本价
   */
  cost?: number;
  /**
   * 优惠券商品结算信息
   */
  couponSettlements?: CouponSettlementDTO[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 已发货数量
   */
  deliveredNum?: number;
  /**
   * 分销佣金
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
  flashSaleGoodsId?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  /**
   * 商品价格 会员价 & 阶梯设价
   */
  levelPrice?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementDTO[];
  /**
   * 购买数量
   */
  num?: number;
  /**
   * 订单标识
   */
  oid?: string;
  /**
   * 商品原价 建议零售价
   */
  originalPrice?: number;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分商品Id
   */
  pointsGoodsId?: string;
  /**
   * 成交价格
   */
  price?: number;
  /**
   * 结算价格
   */
  settlementPrice?: number;
  /**
   * sku Id
   */
  skuId?: string;
  /**
   * sku 名字
   */
  skuName?: string;
  /**
   * sku 编码
   */
  skuNo?: string;
  /**
   * 规格描述信息
   */
  specDetails?: string;
  /**
   * 平摊小计 最初由 levelPrice*num（购买数量） 计算
   */
  splitPrice?: number;
  /**
   * spu Id
   */
  spuId?: string;
  /**
   * spu 名称
   */
  spuName?: string;
  /**
   * 店铺分类Id
   */
  storeCateId?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
export interface CouponSettlementDTO {
  /**
   * 优惠券码
   */
  couponCode?: string;
  /**
   * 优惠券码id
   */
  couponCodeId?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   */
  couponType?: 0 | 1 | 2;
  /**
   * 优惠金额
   */
  reducePrice?: number;
  /**
   * 除去优惠金额后的商品均摊价
   */
  splitPrice?: number;
  [k: string]: any;
}
export interface MarketingSettlementDTO {
  /**
   * 营销类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * SUITS: 3：组合套餐
   */
  marketingType?: '0' | '1' | '2' | '3';
  /**
   * 除去营销优惠金额后的商品均摊价
   */
  splitPrice?: number;
  [k: string]: any;
}
export interface TradeItemDTO1 {
  /**
   * 商品所属的userId
   */
  adminId?: string;
  /**
   * 货物id
   */
  bn?: string;
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 可退数量
   */
  canReturnNum?: number;
  /**
   * 分类
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 成本价
   */
  cost?: number;
  /**
   * 优惠券商品结算信息
   */
  couponSettlements?: CouponSettlementDTO[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 已发货数量
   */
  deliveredNum?: number;
  /**
   * 分销佣金
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
  flashSaleGoodsId?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  /**
   * 商品价格 会员价 & 阶梯设价
   */
  levelPrice?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementDTO[];
  /**
   * 购买数量
   */
  num?: number;
  /**
   * 订单标识
   */
  oid?: string;
  /**
   * 商品原价 建议零售价
   */
  originalPrice?: number;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分商品Id
   */
  pointsGoodsId?: string;
  /**
   * 成交价格
   */
  price?: number;
  /**
   * 结算价格
   */
  settlementPrice?: number;
  /**
   * sku Id
   */
  skuId?: string;
  /**
   * sku 名字
   */
  skuName?: string;
  /**
   * sku 编码
   */
  skuNo?: string;
  /**
   * 规格描述信息
   */
  specDetails?: string;
  /**
   * 平摊小计 最初由 levelPrice*num（购买数量） 计算
   */
  splitPrice?: number;
  /**
   * spu Id
   */
  spuId?: string;
  /**
   * spu 名称
   */
  spuName?: string;
  /**
   * 店铺分类Id
   */
  storeCateId?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
/**
 * 代客下单的操作人
 */
export interface SellerDTO {
  /**
   * 卖家ID
   */
  adminId?: string;
  /**
   * 代理人Id，用于代客下单
   */
  proxyId?: string;
  /**
   * 代理人名称，用于代客下单，相当于OptUserName
   */
  proxyName?: string;
  [k: string]: any;
}
/**
 * 客户等级
 */
export interface CustomerLevelVO {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客户等级折扣
   */
  customerLevelDiscount?: number;
  /**
   * 客户等级ID
   */
  customerLevelId?: number;
  /**
   * 客户等级名称
   */
  customerLevelName?: string;
  /**
   * 等级权益
   */
  customerLevelRightsVOS?: CustomerLevelRightsVO[];
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
   * 所需成长值
   */
  growthValue?: number;
  /**
   * 积分倍率
   */
  integralMultiple?: number;
  /**
   * 是否是默认
   * * NO: 否
   * * YES: 是
   */
  isDefalt?: 0 | 1;
  /**
   * 等级徽章图
   */
  rankBadgeImg?: string;
  /**
   * 店铺编号
   */
  storeId?: number;
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
export interface CustomerLevelRightsVO {
  activityId?: string;
  delFlag?: '0' | '1';
  rightsDescription?: string;
  rightsId?: number;
  rightsLogo?: string;
  rightsName?: string;
  rightsRule?: string;
  rightsType?: '0' | '1' | '2' | '3' | '4' | '5';
  sort?: number;
  status?: number;
  storeId?: number;
  [k: string]: any;
}
/**
 * 商家
 */
export interface SupplierDTO {
  /**
   * 代理人Id，用于代客下单
   */
  employeeId?: string;
  /**
   * 代理人名称，用于代客下单，相当于OptUserName
   */
  employeeName?: string;
  /**
   * 使用的运费模板类别
   * * NO: 否
   * * YES: 是
   */
  freightTemplateType?: 0 | 1;
  /**
   * 是否平台自营
   * * NO: 否
   * * YES: 是
   */
  isSelf?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 商家id
   */
  supplierId?: number;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
export interface TradeItemDTO2 {
  /**
   * 商品所属的userId
   */
  adminId?: string;
  /**
   * 货物id
   */
  bn?: string;
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 可退数量
   */
  canReturnNum?: number;
  /**
   * 分类
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 成本价
   */
  cost?: number;
  /**
   * 优惠券商品结算信息
   */
  couponSettlements?: CouponSettlementDTO[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 已发货数量
   */
  deliveredNum?: number;
  /**
   * 分销佣金
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
  flashSaleGoodsId?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  /**
   * 商品价格 会员价 & 阶梯设价
   */
  levelPrice?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementDTO[];
  /**
   * 购买数量
   */
  num?: number;
  /**
   * 订单标识
   */
  oid?: string;
  /**
   * 商品原价 建议零售价
   */
  originalPrice?: number;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分商品Id
   */
  pointsGoodsId?: string;
  /**
   * 成交价格
   */
  price?: number;
  /**
   * 结算价格
   */
  settlementPrice?: number;
  /**
   * sku Id
   */
  skuId?: string;
  /**
   * sku 名字
   */
  skuName?: string;
  /**
   * sku 编码
   */
  skuNo?: string;
  /**
   * 规格描述信息
   */
  specDetails?: string;
  /**
   * 平摊小计 最初由 levelPrice*num（购买数量） 计算
   */
  splitPrice?: number;
  /**
   * spu Id
   */
  spuId?: string;
  /**
   * spu 名称
   */
  spuName?: string;
  /**
   * 店铺分类Id
   */
  storeCateId?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
/**
 * 订单总价
 */
export interface TradePriceDTO {
  /**
   * 平台佣金
   */
  cmCommission?: number;
  /**
   * 优惠券优惠金额
   */
  couponPrice?: number;
  /**
   * 配送费用
   */
  deliveryPrice?: number;
  /**
   * 优惠金额
   */
  discountsPrice?: number;
  /**
   * 订单优惠金额明细
   */
  discountsPriceDetails?: DiscountsPriceDetailDTO[];
  /**
   * 是否开启运费
   * * NO: 否
   * * YES: 是
   */
  enableDeliveryPrice?: number;
  /**
   * 商品总金额
   */
  goodsPrice?: number;
  /**
   * 积分数量
   */
  integral?: number;
  /**
   * 积分兑换金额
   */
  integralPrice?: number;
  /**
   * 发票费用
   */
  invoiceFee?: number;
  /**
   * 原始金额, 不作为付费金额
   */
  originPrice?: number;
  /**
   * 积分价值
   */
  pointWorth?: number;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分兑换金额
   */
  pointsPrice?: number;
  /**
   * 特价金额
   */
  privilegePrice?: number;
  /**
   * 支付手续费
   */
  rate?: number;
  /**
   * 是否特价单
   * * NO: 否
   * * YES: 是
   */
  special?: number;
  /**
   * 订单实际支付金额
   */
  totalPayCash?: number;
  /**
   * 订单应付金额
   */
  totalPrice?: number;
  [k: string]: any;
}
export interface DiscountsPriceDetailDTO {
  /**
   * 优惠金额
   */
  discounts?: number;
  /**
   * 营销类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * SUITS: 3：组合套餐
   */
  marketingType?: '0' | '1' | '2' | '3';
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ConsigneeDTO".
 */
export interface ConsigneeDTO2 {
  /**
   * 详细地址
   */
  address?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 详细地址(包含省市区）
   */
  detailAddress?: string;
  /**
   * 期望收货时间
   */
  expectTime?: string;
  /**
   * CustomerDeliveredAddress Id
   */
  id?: string;
  /**
   * 收货人名称
   */
  name?: string;
  /**
   * 收货人电话
   */
  phone?: string;
  /**
   * 省
   */
  provinceId?: number;
  /**
   * 收货地址修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "InvoiceDTO".
 */
export interface InvoiceDTO1 {
  /**
   * 发票的收货地址
   */
  address?: string;
  /**
   * 收货地址ID
   */
  addressId?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 联系人
   */
  contacts?: string;
  generalInvoice?: GeneralInvoiceDTO2;
  /**
   * 订单开票id
   */
  orderInvoiceId?: string;
  /**
   * 联系电话
   */
  phone?: string;
  /**
   * 开票项目id
   */
  projectId?: string;
  /**
   * 开票项目名称
   */
  projectName?: string;
  /**
   * 开票项修改时间
   */
  projectUpdateTime?: string;
  /**
   * 省
   */
  provinceId?: number;
  specialInvoice?: SpecialInvoiceDTO2;
  /**
   * 是否单独的收货地址
   */
  sperator?: boolean;
  /**
   * 纳税人识别码
   */
  taxNo?: string;
  /**
   * 发票类型
   * * NORMAL: 普通发票
   * * SPECIAL: 增值税专用发票
   */
  type?: number;
  /**
   * 收货地址的修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeItemDTO".
 */
export interface TradeItemDTO3 {
  /**
   * 商品所属的userId
   */
  adminId?: string;
  /**
   * 货物id
   */
  bn?: string;
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 可退数量
   */
  canReturnNum?: number;
  /**
   * 分类
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 成本价
   */
  cost?: number;
  /**
   * 优惠券商品结算信息
   */
  couponSettlements?: CouponSettlementDTO[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 已发货数量
   */
  deliveredNum?: number;
  /**
   * 分销佣金
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
  flashSaleGoodsId?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  /**
   * 商品价格 会员价 & 阶梯设价
   */
  levelPrice?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementDTO[];
  /**
   * 购买数量
   */
  num?: number;
  /**
   * 订单标识
   */
  oid?: string;
  /**
   * 商品原价 建议零售价
   */
  originalPrice?: number;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分商品Id
   */
  pointsGoodsId?: string;
  /**
   * 成交价格
   */
  price?: number;
  /**
   * 结算价格
   */
  settlementPrice?: number;
  /**
   * sku Id
   */
  skuId?: string;
  /**
   * sku 名字
   */
  skuName?: string;
  /**
   * sku 编码
   */
  skuNo?: string;
  /**
   * 规格描述信息
   */
  specDetails?: string;
  /**
   * 平摊小计 最初由 levelPrice*num（购买数量） 计算
   */
  splitPrice?: number;
  /**
   * spu Id
   */
  spuId?: string;
  /**
   * spu 名称
   */
  spuName?: string;
  /**
   * 店铺分类Id
   */
  storeCateId?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponSettlementDTO".
 */
export interface CouponSettlementDTO1 {
  /**
   * 优惠券码
   */
  couponCode?: string;
  /**
   * 优惠券码id
   */
  couponCodeId?: string;
  /**
   * 优惠券类型
   * * GENERAL_VOUCHERS: 0：通用券
   * * STORE_VOUCHERS: 1：店铺券
   * * FREIGHT_VOUCHER: 2：运费券
   */
  couponType?: 0 | 1 | 2;
  /**
   * 优惠金额
   */
  reducePrice?: number;
  /**
   * 除去优惠金额后的商品均摊价
   */
  splitPrice?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MarketingSettlementDTO".
 */
export interface MarketingSettlementDTO1 {
  /**
   * 营销类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * SUITS: 3：组合套餐
   */
  marketingType?: '0' | '1' | '2' | '3';
  /**
   * 除去营销优惠金额后的商品均摊价
   */
  splitPrice?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SellerDTO".
 */
export interface SellerDTO1 {
  /**
   * 卖家ID
   */
  adminId?: string;
  /**
   * 代理人Id，用于代客下单
   */
  proxyId?: string;
  /**
   * 代理人名称，用于代客下单，相当于OptUserName
   */
  proxyName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerLevelVO".
 */
export interface CustomerLevelVO1 {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客户等级折扣
   */
  customerLevelDiscount?: number;
  /**
   * 客户等级ID
   */
  customerLevelId?: number;
  /**
   * 客户等级名称
   */
  customerLevelName?: string;
  /**
   * 等级权益
   */
  customerLevelRightsVOS?: CustomerLevelRightsVO[];
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
   * 所需成长值
   */
  growthValue?: number;
  /**
   * 积分倍率
   */
  integralMultiple?: number;
  /**
   * 是否是默认
   * * NO: 否
   * * YES: 是
   */
  isDefalt?: 0 | 1;
  /**
   * 等级徽章图
   */
  rankBadgeImg?: string;
  /**
   * 店铺编号
   */
  storeId?: number;
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
 * via the `definition` "CustomerLevelRightsVO".
 */
export interface CustomerLevelRightsVO1 {
  activityId?: string;
  delFlag?: '0' | '1';
  rightsDescription?: string;
  rightsId?: number;
  rightsLogo?: string;
  rightsName?: string;
  rightsRule?: string;
  rightsType?: '0' | '1' | '2' | '3' | '4' | '5';
  sort?: number;
  status?: number;
  storeId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SupplierDTO".
 */
export interface SupplierDTO1 {
  /**
   * 代理人Id，用于代客下单
   */
  employeeId?: string;
  /**
   * 代理人名称，用于代客下单，相当于OptUserName
   */
  employeeName?: string;
  /**
   * 使用的运费模板类别
   * * NO: 否
   * * YES: 是
   */
  freightTemplateType?: 0 | 1;
  /**
   * 是否平台自营
   * * NO: 否
   * * YES: 是
   */
  isSelf?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 商家id
   */
  supplierId?: number;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradePriceDTO".
 */
export interface TradePriceDTO1 {
  /**
   * 平台佣金
   */
  cmCommission?: number;
  /**
   * 优惠券优惠金额
   */
  couponPrice?: number;
  /**
   * 配送费用
   */
  deliveryPrice?: number;
  /**
   * 优惠金额
   */
  discountsPrice?: number;
  /**
   * 订单优惠金额明细
   */
  discountsPriceDetails?: DiscountsPriceDetailDTO[];
  /**
   * 是否开启运费
   * * NO: 否
   * * YES: 是
   */
  enableDeliveryPrice?: number;
  /**
   * 商品总金额
   */
  goodsPrice?: number;
  /**
   * 积分数量
   */
  integral?: number;
  /**
   * 积分兑换金额
   */
  integralPrice?: number;
  /**
   * 发票费用
   */
  invoiceFee?: number;
  /**
   * 原始金额, 不作为付费金额
   */
  originPrice?: number;
  /**
   * 积分价值
   */
  pointWorth?: number;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分兑换金额
   */
  pointsPrice?: number;
  /**
   * 特价金额
   */
  privilegePrice?: number;
  /**
   * 支付手续费
   */
  rate?: number;
  /**
   * 是否特价单
   * * NO: 否
   * * YES: 是
   */
  special?: number;
  /**
   * 订单实际支付金额
   */
  totalPayCash?: number;
  /**
   * 订单应付金额
   */
  totalPrice?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DiscountsPriceDetailDTO".
 */
export interface DiscountsPriceDetailDTO1 {
  /**
   * 优惠金额
   */
  discounts?: number;
  /**
   * 营销类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * SUITS: 3：组合套餐
   */
  marketingType?: '0' | '1' | '2' | '3';
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«List«TradeGetFreightResponse»»".
 */
export interface BaseResponseListTradeGetFreightResponse {
  /**
   * 结果码
   */
  code: string;
  context?: TradeGetFreightResponseArray;
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
export interface TradeGetFreightResponse {
  /**
   * 配送费用
   */
  deliveryPrice?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeGetFreightResponse".
 */
export interface TradeGetFreightResponse1 {
  /**
   * 配送费用
   */
  deliveryPrice?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«List«TradeItemVO»»".
 */
export interface BaseResponseListTradeItemVO {
  /**
   * 结果码
   */
  code: string;
  context?: TradeItemVOArray;
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
export interface TradeItemVO4 {
  /**
   * 商品所属的userId storeId?
   */
  adminId?: string;
  /**
   * 货物id
   */
  bn?: string;
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 可退数量
   */
  canReturnNum?: number;
  /**
   * 分类id
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 分销佣金比例
   */
  commissionRate?: number;
  /**
   * 成本价
   */
  cost?: number;
  /**
   * 优惠券商品结算信息(包括商品参加的优惠券信息)
   */
  couponSettlements?: CouponSettlementVO[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 已发货数量
   */
  deliveredNum?: number;
  /**
   * 分销佣金
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
  flashSaleGoodsId?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否入账状态
   * * NO: 否
   * * YES: 是
   * * FAIL: 失败
   */
  isAccountStatus?: 0 | 1 | 2;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  /**
   * 商品价格
   */
  levelPrice?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementVO[];
  /**
   * 购买数量
   */
  num?: number;
  /**
   * oid
   */
  oid?: string;
  /**
   * 商品原价
   */
  originalPrice?: number;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分商品Id
   */
  pointsGoodsId?: string;
  /**
   * 积分兑换金额
   */
  pointsPrice?: number;
  /**
   * 成交价格
   */
  price?: number;
  /**
   * 结算价格
   */
  settlementPrice?: number;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * skuName
   */
  skuName?: string;
  /**
   * skuNo
   */
  skuNo?: string;
  /**
   * 规格描述信息
   */
  specDetails?: string;
  /**
   * 平摊小计
   */
  splitPrice?: number;
  /**
   * spuId
   */
  spuId?: string;
  /**
   * spuName
   */
  spuName?: string;
  /**
   * 店铺分类Id
   */
  storeCateId?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GrouponBuyRequest".
 */
export interface GrouponBuyRequest {
  /**
   * 购买数量
   */
  buyCount?: number;
  /**
   * 商品skuId
   */
  goodsInfoId?: string;
  /**
   * 团号
   */
  grouponNo?: string;
  /**
   * 是否开团购买
   */
  openGroupon?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ImmediateBuyRequest".
 */
export interface ImmediateBuyRequest {
  /**
   * 购买数量
   */
  buyCount?: number;
  /**
   * 商品skuId
   */
  goodsInfoId?: string;
  /**
   * 是否开店礼包
   * * NO: 否
   * * YES: 是
   */
  storeBagsFlag?: 0 | 1;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«InvoiceVO»".
 */
export interface BaseResponseInvoiceVO {
  /**
   * 结果码
   */
  code: string;
  context?: InvoiceVO2;
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
export interface InvoiceVO2 {
  /**
   * 发票的收货地址
   */
  address?: string;
  /**
   * 收货地址ID
   */
  addressId?: string;
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 联系人
   */
  contacts?: string;
  generalInvoice?: GeneralInvoiceVO;
  /**
   * 订单开票id
   */
  orderInvoiceId?: string;
  /**
   * 联系电话
   */
  phone?: string;
  /**
   * 开票项目id
   */
  projectId?: string;
  /**
   * 开票项目名称
   */
  projectName?: string;
  /**
   * 开票项修改时间
   */
  projectUpdateTime?: string;
  /**
   * 省
   */
  provinceId?: number;
  specialInvoice?: SpecialInvoiceVO;
  /**
   * 是否单独的收货地址
   */
  sperator?: boolean;
  /**
   * 纳税人识别码
   */
  taxNo?: string;
  /**
   * 类型
   * * NORMAL: 普通发票
   * * SPECIAL: 增值税专用发票
   */
  type?: number;
  /**
   * 收货地址的修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«Page«GrouponTradeVO»»".
 */
export interface BaseResponsePageGrouponTradeVO {
  /**
   * 结果码
   */
  code: string;
  context?: PageGrouponTradeVO;
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
export interface PageGrouponTradeVO {
  content?: GrouponTradeVO[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: Pageable3;
  size?: number;
  sort?: Sort7;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface GrouponTradeVO {
  /**
   * 订单组号
   */
  groupId?: string;
  grouponInstance?: GrouponInstanceVO;
  /**
   * 订单号
   */
  id?: string;
  /**
   * 超时未支付取消订单时间
   */
  orderTimeOut?: string;
  seller?: SellerVO3;
  supplier?: SupplierVO3;
  /**
   * 订单实际支付金额
   */
  totalPayCash?: number;
  tradeGroupon?: TradeGrouponVO2;
  /**
   * 订单商品列表
   */
  tradeItems?: TradeItemVO5[];
  tradePrice?: TradePriceVO3;
  tradeState?: TradeStateVO4;
  [k: string]: any;
}
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
 * boss卖方
 */
export interface SellerVO3 {
  /**
   * 卖家ID
   */
  adminId?: string;
  /**
   * 代理人Id
   */
  proxyId?: string;
  /**
   * 代理人名称
   */
  proxyName?: string;
  [k: string]: any;
}
/**
 * 商家
 */
export interface SupplierVO3 {
  /**
   * 代理人Id
   */
  employeeId?: string;
  /**
   * 代理人名称
   */
  employeeName?: string;
  /**
   * 使用的运费模板类别
   * * NO: 否
   * * YES: 是
   */
  freightTemplateType?: 0 | 1;
  /**
   * 是否平台自营
   * * NO: 否
   * * YES: 是
   */
  isSelf?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 商家id
   */
  supplierId?: number;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
export interface TradeGrouponVO2 {
  goodId?: string;
  goodInfoId?: string;
  grouponActivityId?: string;
  grouponNo?: string;
  grouponOrderStatus?: '0' | '1' | '2' | '3';
  grouponSuccessTime?: string;
  leader?: boolean;
  returnNum?: number;
  returnPrice?: number;
  [k: string]: any;
}
export interface TradeItemVO5 {
  /**
   * 商品所属的userId storeId?
   */
  adminId?: string;
  /**
   * 货物id
   */
  bn?: string;
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 可退数量
   */
  canReturnNum?: number;
  /**
   * 分类id
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 分销佣金比例
   */
  commissionRate?: number;
  /**
   * 成本价
   */
  cost?: number;
  /**
   * 优惠券商品结算信息(包括商品参加的优惠券信息)
   */
  couponSettlements?: CouponSettlementVO[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 已发货数量
   */
  deliveredNum?: number;
  /**
   * 分销佣金
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
  flashSaleGoodsId?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否入账状态
   * * NO: 否
   * * YES: 是
   * * FAIL: 失败
   */
  isAccountStatus?: 0 | 1 | 2;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  /**
   * 商品价格
   */
  levelPrice?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementVO[];
  /**
   * 购买数量
   */
  num?: number;
  /**
   * oid
   */
  oid?: string;
  /**
   * 商品原价
   */
  originalPrice?: number;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分商品Id
   */
  pointsGoodsId?: string;
  /**
   * 积分兑换金额
   */
  pointsPrice?: number;
  /**
   * 成交价格
   */
  price?: number;
  /**
   * 结算价格
   */
  settlementPrice?: number;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * skuName
   */
  skuName?: string;
  /**
   * skuNo
   */
  skuNo?: string;
  /**
   * 规格描述信息
   */
  specDetails?: string;
  /**
   * 平摊小计
   */
  splitPrice?: number;
  /**
   * spuId
   */
  spuId?: string;
  /**
   * spuName
   */
  spuName?: string;
  /**
   * 店铺分类Id
   */
  storeCateId?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
/**
 * 订单价格
 */
export interface TradePriceVO3 {
  /**
   * 平台佣金
   */
  cmCommission?: number;
  /**
   * 优惠券优惠金额
   */
  couponPrice?: number;
  /**
   * 配送费用
   */
  deliveryPrice?: number;
  /**
   * 优惠金额
   */
  discountsPrice?: number;
  /**
   * 订单优惠金额明细
   */
  discountsPriceDetails?: DiscountsPriceDetailVO[];
  /**
   * 是否开启运费
   * * NO: 否
   * * YES: 是
   */
  enableDeliveryPrice?: number;
  /**
   * 商品总金额
   */
  goodsPrice?: number;
  /**
   * 积分数量
   */
  integral?: number;
  /**
   * 积分兑换金额
   */
  integralPrice?: number;
  /**
   * 发票费用
   */
  invoiceFee?: number;
  /**
   * 单个订单返利总金额
   */
  orderDistributionCommission?: number;
  /**
   * 原始金额, 不作为付费金额
   */
  originPrice?: number;
  /**
   * 积分价值
   */
  pointWorth?: number;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分兑换金额
   */
  pointsPrice?: number;
  /**
   * 特价金额
   */
  privilegePrice?: number;
  /**
   * 支付手续费
   */
  rate?: number;
  /**
   * 是否特价单
   * * NO: 否
   * * YES: 是
   */
  special?: number;
  /**
   * 订单实际支付金额
   */
  totalPayCash?: number;
  /**
   * 订单应付金额
   */
  totalPrice?: number;
  [k: string]: any;
}
/**
 * 订单总体状态
 */
export interface TradeStateVO4 {
  /**
   * 审批状态
   * * APPROVAL: 0: 审批中
   * * APPROVED: 1: 审批通过
   * * REJECTED: 2: 驳回
   */
  approvalStatus?: 'APPROVAL' | 'APPROVED' | 'REJECTED';
  /**
   * 审核状态
   * * NON_CHECKED: 0: 未审核
   * * CHECKED: 1: 已审核
   * * REJECTED: 2: 已打回
   */
  auditState?: 'NON_CHECKED' | 'CHECKED' | 'REJECTED';
  /**
   * 自动确认收货时间
   */
  autoConfirmTime?: string;
  /**
   * 开始时间
   */
  createTime?: string;
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 发货时间
   */
  deliverTime?: string;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 订单入账时间
   */
  finalTime?: string;
  /**
   * 流程状态
   * * INIT: 0: INIT 创建订单
   * * REMEDY: 1: REMEDY 修改订单
   * * REFUND: 2: REFUND 已退款
   * * AUDIT: 3: AUDIT 已审核
   * * DELIVERED_PART: 4: DELIVERED_PART 部分发货
   * * DELIVERED: 5: DELIVERED 已发货
   * * CONFIRMED: 6: CONFIRMED 已确认
   * * COMPLETED: 7: COMPLETED 已完成
   * * VOID: 8: VOID 已作废
   * * GROUPON: 9: GROUPON 已参团
   * * APPROVAL: 10: APPROVAL 审批中
   */
  flowState?:
  | 'INIT'
  | 'REMEDY'
  | 'REFUND'
  | 'AUDIT'
  | 'DELIVERED_PART'
  | 'DELIVERED'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'VOID'
  | 'GROUPON'
  | 'APPROVAL';
  /**
   * 修改时间
   */
  modifyTime?: string;
  /**
   * 作废原因
   */
  obsoleteReason?: string;
  /**
   * 支付状态
   * * NOT_PAID: 0: NOT_PAID 未支付
   * * UNCONFIRMED: 1: UNCONFIRMED 待确认
   * * PAID: 2: PAID 已支付
   */
  payState?: number;
  /**
   * 付款时间
   */
  payTime?: string;
  /**
   * 进入支付页面的时间
   */
  startPayTime?: string;
  [k: string]: any;
}
export interface Pageable3 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort3;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort7 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Page«GrouponTradeVO»".
 */
export interface PageGrouponTradeVO1 {
  content?: GrouponTradeVO[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: Pageable3;
  size?: number;
  sort?: Sort7;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GrouponTradeVO".
 */
export interface GrouponTradeVO1 {
  /**
   * 订单组号
   */
  groupId?: string;
  grouponInstance?: GrouponInstanceVO;
  /**
   * 订单号
   */
  id?: string;
  /**
   * 超时未支付取消订单时间
   */
  orderTimeOut?: string;
  seller?: SellerVO3;
  supplier?: SupplierVO3;
  /**
   * 订单实际支付金额
   */
  totalPayCash?: number;
  tradeGroupon?: TradeGrouponVO2;
  /**
   * 订单商品列表
   */
  tradeItems?: TradeItemVO5[];
  tradePrice?: TradePriceVO3;
  tradeState?: TradeStateVO4;
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
 * via the `definition` "PaymentRecordRequest".
 */
export interface PaymentRecordRequest {
  /**
   * 收款账号id
   */
  accountId?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 附件
   */
  encloses?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 关联的订单id
   */
  tid?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«FindPayOrderResponse»".
 */
export interface BaseResponseFindPayOrderResponse {
  /**
   * 结果码
   */
  code: string;
  context?: FindPayOrderResponse;
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
export interface FindPayOrderResponse {
  /**
   * 备注
   */
  comment?: string;
  /**
   * 商家编号
   */
  companyInfoId?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 附件
   */
  encloses?: string;
  grouponNo?: string;
  /**
   * 是否平台自营
   * * NO: 否
   * * YES: 是
   */
  isSelf?: number;
  /**
   * 订单编号
   */
  orderCode?: string;
  /**
   * 收款在线渠道
   */
  payChannel?: string;
  /**
   * 收款在线渠道id
   */
  payChannelId?: number;
  /**
   * 支付网关
   * * ONLINE: 在线支付
   * * OFFLINE: 线下支付
   * * CREDIT: 授信支付
   */
  payGateway?: '0' | '1' | '2';
  /**
   * 支付单Id
   */
  payOrderId?: string;
  payOrderPoints?: number;
  /**
   * 收款金额
   */
  payOrderPrice?: number;
  /**
   * 支付单状态
   * * PAYED: 已收款
   * * NOTPAY: 未收款
   * * TOCONFIRM: 待确认
   */
  payOrderStatus?: 0 | 1 | 2;
  /**
   * 支付类型
   * * ONLINE: 在线支付
   * * OFFLINE: 线下支付
   * * CREDIT: 授信支付
   */
  payType?: '0' | '1' | '2';
  payWay?:
  | 'UNIONPAY'
  | 'WECHAT'
  | 'ALIPAY'
  | 'ADVANCE'
  | 'POINT'
  | 'CASH'
  | 'UNIONPAY_B2B'
  | 'COUPON'
  | 'BALANCE'
  | 'CREDIT';
  /**
   * 收款单账号
   */
  receivableAccount?: string;
  /**
   * 流水号
   */
  receivableNo?: string;
  /**
   * 收款时间
   */
  receiveTime?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 商家名称
   */
  supplierName?: string;
  /**
   * 应付金额
   */
  totalPrice?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "FindPayOrderResponse".
 */
export interface FindPayOrderResponse1 {
  /**
   * 备注
   */
  comment?: string;
  /**
   * 商家编号
   */
  companyInfoId?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 附件
   */
  encloses?: string;
  grouponNo?: string;
  /**
   * 是否平台自营
   * * NO: 否
   * * YES: 是
   */
  isSelf?: number;
  /**
   * 订单编号
   */
  orderCode?: string;
  /**
   * 收款在线渠道
   */
  payChannel?: string;
  /**
   * 收款在线渠道id
   */
  payChannelId?: number;
  /**
   * 支付网关
   * * ONLINE: 在线支付
   * * OFFLINE: 线下支付
   * * CREDIT: 授信支付
   */
  payGateway?: '0' | '1' | '2';
  /**
   * 支付单Id
   */
  payOrderId?: string;
  payOrderPoints?: number;
  /**
   * 收款金额
   */
  payOrderPrice?: number;
  /**
   * 支付单状态
   * * PAYED: 已收款
   * * NOTPAY: 未收款
   * * TOCONFIRM: 待确认
   */
  payOrderStatus?: 0 | 1 | 2;
  /**
   * 支付类型
   * * ONLINE: 在线支付
   * * OFFLINE: 线下支付
   * * CREDIT: 授信支付
   */
  payType?: '0' | '1' | '2';
  payWay?:
  | 'UNIONPAY'
  | 'WECHAT'
  | 'ALIPAY'
  | 'ADVANCE'
  | 'POINT'
  | 'CASH'
  | 'UNIONPAY_B2B'
  | 'COUPON'
  | 'BALANCE'
  | 'CREDIT';
  /**
   * 收款单账号
   */
  receivableAccount?: string;
  /**
   * 流水号
   */
  receivableNo?: string;
  /**
   * 收款时间
   */
  receiveTime?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 商家名称
   */
  supplierName?: string;
  /**
   * 应付金额
   */
  totalPrice?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«FindPayOrderListResponse»".
 */
export interface BaseResponseFindPayOrderListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: FindPayOrderListResponse;
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
export interface FindPayOrderListResponse {
  /**
   * 支付单集合
   */
  payOrders?: PayOrderDetailVO[];
  [k: string]: any;
}
export interface PayOrderDetailVO {
  /**
   * 备注
   */
  comment?: string;
  /**
   * 商家编号
   */
  companyInfoId?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 附件
   */
  encloses?: string;
  grouponNo?: string;
  /**
   * 是否平台自营
   * * NO: 否
   * * YES: 是
   */
  isSelf?: number;
  /**
   * 订单编号
   */
  orderCode?: string;
  /**
   * 收款在线渠道
   */
  payChannel?: string;
  /**
   * 收款在线渠道id
   */
  payChannelId?: number;
  /**
   * 支付单Id
   */
  payOrderId?: string;
  payOrderPoints?: number;
  /**
   * 收款金额
   */
  payOrderPrice?: number;
  /**
   * 支付单状态
   * * PAYED: 已收款
   * * NOTPAY: 未收款
   * * TOCONFIRM: 待确认
   */
  payOrderStatus?: 0 | 1 | 2;
  /**
   * 支付类型
   * * ONLINE: 在线支付
   * * OFFLINE: 线下支付
   * * CREDIT: 授信支付
   */
  payType?: '0' | '1' | '2';
  /**
   * 流水号
   */
  receivableNo?: string;
  /**
   * 收款时间
   */
  receiveTime?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 商家名称
   */
  supplierName?: string;
  /**
   * 应付金额
   */
  totalPrice?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "FindPayOrderListResponse".
 */
export interface FindPayOrderListResponse1 {
  /**
   * 支付单集合
   */
  payOrders?: PayOrderDetailVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PayOrderDetailVO".
 */
export interface PayOrderDetailVO1 {
  /**
   * 备注
   */
  comment?: string;
  /**
   * 商家编号
   */
  companyInfoId?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 会员名称
   */
  customerName?: string;
  /**
   * 附件
   */
  encloses?: string;
  grouponNo?: string;
  /**
   * 是否平台自营
   * * NO: 否
   * * YES: 是
   */
  isSelf?: number;
  /**
   * 订单编号
   */
  orderCode?: string;
  /**
   * 收款在线渠道
   */
  payChannel?: string;
  /**
   * 收款在线渠道id
   */
  payChannelId?: number;
  /**
   * 支付单Id
   */
  payOrderId?: string;
  payOrderPoints?: number;
  /**
   * 收款金额
   */
  payOrderPrice?: number;
  /**
   * 支付单状态
   * * PAYED: 已收款
   * * NOTPAY: 未收款
   * * TOCONFIRM: 待确认
   */
  payOrderStatus?: 0 | 1 | 2;
  /**
   * 支付类型
   * * ONLINE: 在线支付
   * * OFFLINE: 线下支付
   * * CREDIT: 授信支付
   */
  payType?: '0' | '1' | '2';
  /**
   * 流水号
   */
  receivableNo?: string;
  /**
   * 收款时间
   */
  receiveTime?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 商家名称
   */
  supplierName?: string;
  /**
   * 应付金额
   */
  totalPrice?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«TradeConfirmResponse»".
 */
export interface BaseResponseTradeConfirmResponse {
  /**
   * 结果码
   */
  code: string;
  context?: TradeConfirmResponse;
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
export interface TradeConfirmResponse {
  /**
   * 未使用的优惠券
   */
  couponCodes?: CouponCodeVO[];
  /**
   * 优惠总额
   */
  discountsTotalPrice?: number;
  /**
   * 商品总额
   */
  goodsTotalPrice?: number;
  /**
   * 拼团活动是否包邮
   */
  grouponFreeDelivery?: boolean;
  /**
   * 邀请人名称
   */
  inviteeName?: string;
  /**
   * 是否开团购买
   */
  openGroupon?: boolean;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 是否开店礼包
   * * NO: 否
   * * YES: 是
   */
  storeBagsFlag?: 0 | 1;
  suitMarketingFlag?: boolean;
  /**
   * 返利总额
   */
  totalCommission?: number;
  /**
   * 订单总额
   */
  totalPrice?: number;
  /**
   * 按商家拆分后的订单项
   */
  tradeConfirmItems?: TradeConfirmItemVO[];
  [k: string]: any;
}
export interface CouponCodeVO {
  /**
   * 优惠券活动Id
   */
  activityId?: string;
  /**
   * 优惠券适用品牌名称集合
   */
  brandNames?: string[];
  /**
   * 是否可以立即使用
   */
  couponCanUse?: boolean;
  /**
   * 优惠券码
   */
  couponCode?: string;
  /**
   * 优惠券码id
   */
  couponCodeId?: string;
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
   * 优惠券创建时间
   */
  createTime?: string;
  /**
   * 优惠券面值
   */
  denomination?: number;
  /**
   * 结束时间
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
   * 优惠券适用平台类目名称集合
   */
  goodsCateNames?: string[];
  /**
   * 是否即将过期
   */
  nearOverdue?: boolean;
  /**
   * 使用的订单号
   */
  orderCode?: string;
  /**
   * 是否平台优惠券
   * * NO: 否
   * * YES: 是
   */
  platformFlag?: 0 | 1;
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
   * 开始时间
   */
  startTime?: string;
  /**
   * 使用优惠券码状态
   * * AVAILABLE: 0：可用
   * * UN_REACH_PRICE: 1：未达到使用门槛
   * * NO_AVAILABLE_SKU: 2：本单商品不可用
   * * UN_REACH_TIME: 3：未到可用时间
   */
  status?: 0 | 1 | 2 | 3;
  /**
   * 优惠券适用店铺分类名称集合
   */
  storeCateNames?: string[];
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 使用时间
   */
  useDate?: string;
  /**
   * 优惠券是否已使用
   * * NO: 否
   * * YES: 是
   */
  useStatus?: 0 | 1;
  [k: string]: any;
}
export interface TradeConfirmItemVO {
  /**
   * 优惠金额
   */
  discountsPrice?: DiscountsVO[];
  /**
   * 赠品列表
   */
  gifts?: TradeItemVO6[];
  supplier?: SupplierVO4;
  /**
   * 订单商品sku
   */
  tradeItems?: TradeItemVO7[];
  tradePrice?: TradePriceVO4;
  [k: string]: any;
}
export interface DiscountsVO {
  /**
   * 优惠金额
   */
  amount?: number;
  /**
   * 营销类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * SUITS: 3：组合套餐
   */
  type?: '0' | '1' | '2' | '3';
  [k: string]: any;
}
export interface TradeItemVO6 {
  /**
   * 商品所属的userId storeId?
   */
  adminId?: string;
  /**
   * 货物id
   */
  bn?: string;
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 可退数量
   */
  canReturnNum?: number;
  /**
   * 分类id
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 分销佣金比例
   */
  commissionRate?: number;
  /**
   * 成本价
   */
  cost?: number;
  /**
   * 优惠券商品结算信息(包括商品参加的优惠券信息)
   */
  couponSettlements?: CouponSettlementVO[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 已发货数量
   */
  deliveredNum?: number;
  /**
   * 分销佣金
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
  flashSaleGoodsId?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否入账状态
   * * NO: 否
   * * YES: 是
   * * FAIL: 失败
   */
  isAccountStatus?: 0 | 1 | 2;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  /**
   * 商品价格
   */
  levelPrice?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementVO[];
  /**
   * 购买数量
   */
  num?: number;
  /**
   * oid
   */
  oid?: string;
  /**
   * 商品原价
   */
  originalPrice?: number;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分商品Id
   */
  pointsGoodsId?: string;
  /**
   * 积分兑换金额
   */
  pointsPrice?: number;
  /**
   * 成交价格
   */
  price?: number;
  /**
   * 结算价格
   */
  settlementPrice?: number;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * skuName
   */
  skuName?: string;
  /**
   * skuNo
   */
  skuNo?: string;
  /**
   * 规格描述信息
   */
  specDetails?: string;
  /**
   * 平摊小计
   */
  splitPrice?: number;
  /**
   * spuId
   */
  spuId?: string;
  /**
   * spuName
   */
  spuName?: string;
  /**
   * 店铺分类Id
   */
  storeCateId?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
/**
 * 商家与店铺信息
 */
export interface SupplierVO4 {
  /**
   * 代理人Id
   */
  employeeId?: string;
  /**
   * 代理人名称
   */
  employeeName?: string;
  /**
   * 使用的运费模板类别
   * * NO: 否
   * * YES: 是
   */
  freightTemplateType?: 0 | 1;
  /**
   * 是否平台自营
   * * NO: 否
   * * YES: 是
   */
  isSelf?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 商家id
   */
  supplierId?: number;
  /**
   * 商家名称
   */
  supplierName?: string;
  [k: string]: any;
}
export interface TradeItemVO7 {
  /**
   * 商品所属的userId storeId?
   */
  adminId?: string;
  /**
   * 货物id
   */
  bn?: string;
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 可退数量
   */
  canReturnNum?: number;
  /**
   * 分类id
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 分销佣金比例
   */
  commissionRate?: number;
  /**
   * 成本价
   */
  cost?: number;
  /**
   * 优惠券商品结算信息(包括商品参加的优惠券信息)
   */
  couponSettlements?: CouponSettlementVO[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 已发货数量
   */
  deliveredNum?: number;
  /**
   * 分销佣金
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
  flashSaleGoodsId?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否入账状态
   * * NO: 否
   * * YES: 是
   * * FAIL: 失败
   */
  isAccountStatus?: 0 | 1 | 2;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  /**
   * 商品价格
   */
  levelPrice?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementVO[];
  /**
   * 购买数量
   */
  num?: number;
  /**
   * oid
   */
  oid?: string;
  /**
   * 商品原价
   */
  originalPrice?: number;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分商品Id
   */
  pointsGoodsId?: string;
  /**
   * 积分兑换金额
   */
  pointsPrice?: number;
  /**
   * 成交价格
   */
  price?: number;
  /**
   * 结算价格
   */
  settlementPrice?: number;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * skuName
   */
  skuName?: string;
  /**
   * skuNo
   */
  skuNo?: string;
  /**
   * 规格描述信息
   */
  specDetails?: string;
  /**
   * 平摊小计
   */
  splitPrice?: number;
  /**
   * spuId
   */
  spuId?: string;
  /**
   * spuName
   */
  spuName?: string;
  /**
   * 店铺分类Id
   */
  storeCateId?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
/**
 * 订单项小计
 */
export interface TradePriceVO4 {
  /**
   * 平台佣金
   */
  cmCommission?: number;
  /**
   * 优惠券优惠金额
   */
  couponPrice?: number;
  /**
   * 配送费用
   */
  deliveryPrice?: number;
  /**
   * 优惠金额
   */
  discountsPrice?: number;
  /**
   * 订单优惠金额明细
   */
  discountsPriceDetails?: DiscountsPriceDetailVO[];
  /**
   * 是否开启运费
   * * NO: 否
   * * YES: 是
   */
  enableDeliveryPrice?: number;
  /**
   * 商品总金额
   */
  goodsPrice?: number;
  /**
   * 积分数量
   */
  integral?: number;
  /**
   * 积分兑换金额
   */
  integralPrice?: number;
  /**
   * 发票费用
   */
  invoiceFee?: number;
  /**
   * 单个订单返利总金额
   */
  orderDistributionCommission?: number;
  /**
   * 原始金额, 不作为付费金额
   */
  originPrice?: number;
  /**
   * 积分价值
   */
  pointWorth?: number;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分兑换金额
   */
  pointsPrice?: number;
  /**
   * 特价金额
   */
  privilegePrice?: number;
  /**
   * 支付手续费
   */
  rate?: number;
  /**
   * 是否特价单
   * * NO: 否
   * * YES: 是
   */
  special?: number;
  /**
   * 订单实际支付金额
   */
  totalPayCash?: number;
  /**
   * 订单应付金额
   */
  totalPrice?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeConfirmResponse".
 */
export interface TradeConfirmResponse1 {
  /**
   * 未使用的优惠券
   */
  couponCodes?: CouponCodeVO[];
  /**
   * 优惠总额
   */
  discountsTotalPrice?: number;
  /**
   * 商品总额
   */
  goodsTotalPrice?: number;
  /**
   * 拼团活动是否包邮
   */
  grouponFreeDelivery?: boolean;
  /**
   * 邀请人名称
   */
  inviteeName?: string;
  /**
   * 是否开团购买
   */
  openGroupon?: boolean;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 是否开店礼包
   * * NO: 否
   * * YES: 是
   */
  storeBagsFlag?: 0 | 1;
  suitMarketingFlag?: boolean;
  /**
   * 返利总额
   */
  totalCommission?: number;
  /**
   * 订单总额
   */
  totalPrice?: number;
  /**
   * 按商家拆分后的订单项
   */
  tradeConfirmItems?: TradeConfirmItemVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CouponCodeVO".
 */
export interface CouponCodeVO1 {
  /**
   * 优惠券活动Id
   */
  activityId?: string;
  /**
   * 优惠券适用品牌名称集合
   */
  brandNames?: string[];
  /**
   * 是否可以立即使用
   */
  couponCanUse?: boolean;
  /**
   * 优惠券码
   */
  couponCode?: string;
  /**
   * 优惠券码id
   */
  couponCodeId?: string;
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
   * 优惠券创建时间
   */
  createTime?: string;
  /**
   * 优惠券面值
   */
  denomination?: number;
  /**
   * 结束时间
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
   * 优惠券适用平台类目名称集合
   */
  goodsCateNames?: string[];
  /**
   * 是否即将过期
   */
  nearOverdue?: boolean;
  /**
   * 使用的订单号
   */
  orderCode?: string;
  /**
   * 是否平台优惠券
   * * NO: 否
   * * YES: 是
   */
  platformFlag?: 0 | 1;
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
   * 开始时间
   */
  startTime?: string;
  /**
   * 使用优惠券码状态
   * * AVAILABLE: 0：可用
   * * UN_REACH_PRICE: 1：未达到使用门槛
   * * NO_AVAILABLE_SKU: 2：本单商品不可用
   * * UN_REACH_TIME: 3：未到可用时间
   */
  status?: 0 | 1 | 2 | 3;
  /**
   * 优惠券适用店铺分类名称集合
   */
  storeCateNames?: string[];
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 使用时间
   */
  useDate?: string;
  /**
   * 优惠券是否已使用
   * * NO: 否
   * * YES: 是
   */
  useStatus?: 0 | 1;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "TradeConfirmItemVO".
 */
export interface TradeConfirmItemVO1 {
  /**
   * 优惠金额
   */
  discountsPrice?: DiscountsVO[];
  /**
   * 赠品列表
   */
  gifts?: TradeItemVO6[];
  supplier?: SupplierVO4;
  /**
   * 订单商品sku
   */
  tradeItems?: TradeItemVO7[];
  tradePrice?: TradePriceVO4;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DiscountsVO".
 */
export interface DiscountsVO1 {
  /**
   * 优惠金额
   */
  amount?: number;
  /**
   * 营销类型
   * * REDUCTION: 0：满减优惠
   * * DISCOUNT: 1：满折优惠
   * * GIFT: 2：满赠优惠
   * * SUITS: 3：组合套餐
   */
  type?: '0' | '1' | '2' | '3';
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«TradeDeliverVO»".
 */
export interface BaseResponseTradeDeliverVO {
  /**
   * 结果码
   */
  code: string;
  context?: TradeDeliverVO4;
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
export interface TradeDeliverVO4 {
  consignee?: ConsigneeVO;
  /**
   * 发货单号
   */
  deliverId?: string;
  /**
   * 发货时间
   */
  deliverTime?: string;
  /**
   * 赠品信息
   */
  giftItemList?: ShippingItemVO[];
  logistics?: LogisticsVO;
  /**
   * 发货清单
   */
  shippingItems?: ShippingItemVO1[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  status?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«TradeCommitResultVO»".
 */
export interface BaseResponseTradeCommitResultVO {
  /**
   * 结果码
   */
  code: string;
  context?: TradeCommitResultVO2;
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
export interface TradeCommitResultVO2 {
  /**
   * 订单取消时间
   */
  orderTimeOut?: string;
  /**
   * 父订单号
   */
  parentTid?: string;
  /**
   * 订单支付顺序
   * * NO_LIMIT: 0: NO_LIMIT 不限
   * * PAY_FIRST: 1: PAY_FIRST 先款后货
   */
  paymentOrder?: 'NO_LIMIT' | 'PAY_FIRST';
  /**
   * 交易金额
   */
  price?: number;
  /**
   * 订单编号
   */
  tid?: string;
  tradeState?: TradeStateVO3;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "StoreBagsBuyRequest".
 */
export interface StoreBagsBuyRequest {
  /**
   * 商品skuId
   */
  goodsInfoId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SuitBuyRequest".
 */
export interface SuitBuyRequest {
  /**
   * 活动主键
   */
  marketingId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPagePointsTradePageQueryRequestReq".
 */
export interface IPagePointsTradePageQueryRequestReq {
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  /**
   * 公司ID-SaaS
   */
  companyInfoIdAtSaaS?: number;
  /**
   * 下单时间上限，精度到天
   */
  createdFrom?: string;
  /**
   * 下单时间下限,精度到天
   */
  createdTo?: string;
  /**
   * 小b端我的客户列表是否是查询全部
   */
  customerOrderListAllType?: boolean;
  /**
   * 订单发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 订单流程状态
   * * INIT: 0: INIT 创建订单
   * * REMEDY: 1: REMEDY 修改订单
   * * REFUND: 2: REFUND 已退款
   * * AUDIT: 3: AUDIT 已审核
   * * DELIVERED_PART: 4: DELIVERED_PART 部分发货
   * * DELIVERED: 5: DELIVERED 已发货
   * * CONFIRMED: 6: CONFIRMED 已确认
   * * COMPLETED: 7: COMPLETED 已完成
   * * VOID: 8: VOID 已作废
   * * GROUPON: 9: GROUPON 已参团
   * * APPROVAL: 10: APPROVAL 审批中
   */
  flowState?:
  | 'INIT'
  | 'REMEDY'
  | 'REFUND'
  | 'AUDIT'
  | 'DELIVERED_PART'
  | 'DELIVERED'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'VOID'
  | 'GROUPON'
  | 'APPROVAL';
  /**
   * 邀请人id，用于查询从店铺精选下的单
   */
  inviteeId?: string;
  /**
   * 关键字，用于搜索订单编号或商品名称
   */
  keywords?: string;
  /**
   * 订单类型
   * * NORMAL_ORDER: 0: 普通订单
   * * POINTS_ORDER: 1: 积分订单
   * * ALL_ORDER: 2: 所有订单
   */
  orderType?: 'NORMAL_ORDER' | 'POINTS_ORDER' | 'ALL_ORDER';
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
  /**
   * 父级id
   */
  parentCustomerId?: string;
  /**
   * 订单支付状态
   * * NOT_PAID: 0: NOT_PAID 未支付
   * * UNCONFIRMED: 1: UNCONFIRMED 待确认
   * * PAID: 2: PAID 已支付
   */
  payState?: number;
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
   * 店铺ID-SaaS
   */
  storeIdAtSaaS?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IApprovalRequestReq".
 */
export interface IApprovalRequestReq {
  /**
   * 审批状态
   * * APPROVAL: 0: 审批中
   * * APPROVED: 1: 审批通过
   * * REJECTED: 2: 驳回
   */
  approvalStatus?: 'APPROVAL' | 'APPROVED' | 'REJECTED';
  operator?: Operator2;
  /**
   * 原因
   */
  reason?: string;
  /**
   * 交易id
   */
  tid?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IApprovePageParamRequestReq".
 */
export interface IApprovePageParamRequestReq {
  /**
   * 审批状态
   * * APPROVAL: 0: 审批中
   * * APPROVED: 1: 审批通过
   * * REJECTED: 2: 驳回
   */
  approvalStatus?: 'APPROVAL' | 'APPROVED' | 'REJECTED';
  /**
   * 审批来源
   * * INITIATOR: 0: 发起人
   * * APPROVER: 1: 审批人
   */
  approverPersonSource?: 'INITIATOR' | 'APPROVER';
  /**
   * 审批处理类型 0：待处理 1：已处理
   * * UNPROCESSED: 0: 待处理
   * * PROCESSED: 1: 已处理
   */
  approverProcessingType?: 'UNPROCESSED' | 'PROCESSED';
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  /**
   * 公司ID-SaaS
   */
  companyInfoIdAtSaaS?: number;
  /**
   * 下单时间上限，精度到天
   */
  createdFrom?: string;
  /**
   * 下单时间下限,精度到天
   */
  createdTo?: string;
  creditPayInfo?: CreditPayInfoVO;
  /**
   * 小b端我的客户列表是否是查询全部
   */
  customerOrderListAllType?: boolean;
  /**
   * 订单发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 订单流程状态
   * * INIT: 0: INIT 创建订单
   * * REMEDY: 1: REMEDY 修改订单
   * * REFUND: 2: REFUND 已退款
   * * AUDIT: 3: AUDIT 已审核
   * * DELIVERED_PART: 4: DELIVERED_PART 部分发货
   * * DELIVERED: 5: DELIVERED 已发货
   * * CONFIRMED: 6: CONFIRMED 已确认
   * * COMPLETED: 7: COMPLETED 已完成
   * * VOID: 8: VOID 已作废
   * * GROUPON: 9: GROUPON 已参团
   * * APPROVAL: 10: APPROVAL 审批中
   */
  flowState?:
  | 'INIT'
  | 'REMEDY'
  | 'REFUND'
  | 'AUDIT'
  | 'DELIVERED_PART'
  | 'DELIVERED'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'VOID'
  | 'GROUPON'
  | 'APPROVAL';
  /**
   * 邀请人id，用于查询从店铺精选下的单
   */
  inviteeId?: string;
  /**
   * 关键字，用于搜索订单编号或商品名称
   */
  keywords?: string;
  /**
   * 订单类型
   * * NORMAL_ORDER: 0: 普通订单
   * * POINTS_ORDER: 1: 积分订单
   * * ALL_ORDER: 2: 所有订单
   */
  orderType?: 'NORMAL_ORDER' | 'POINTS_ORDER' | 'ALL_ORDER';
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest3;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest4;
  /**
   * 父级id
   */
  parentCustomerId?: string;
  /**
   * 母账号id
   */
  parentId?: string;
  /**
   * 订单支付状态
   * * NOT_PAID: 0: NOT_PAID 未支付
   * * UNCONFIRMED: 1: UNCONFIRMED 待确认
   * * PAID: 2: PAID 已支付
   */
  payState?: number;
  sort?: Sort5;
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
   * 店铺编码 精确查询
   */
  storeId?: number;
  /**
   * 店铺ID-SaaS
   */
  storeIdAtSaaS?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IChildAccountPageParamRequestReq".
 */
export interface IChildAccountPageParamRequestReq {
  /**
   * 审批状态
   * * APPROVAL: 0: 审批中
   * * APPROVED: 1: 审批通过
   * * REJECTED: 2: 驳回
   */
  approvalStatus?: 'APPROVAL' | 'APPROVED' | 'REJECTED';
  /**
   * 审批来源
   * * INITIATOR: 0: 发起人
   * * APPROVER: 1: 审批人
   */
  approverPersonSource?: 'INITIATOR' | 'APPROVER';
  /**
   * 审批处理类型 0：待处理 1：已处理
   * * UNPROCESSED: 0: 待处理
   * * PROCESSED: 1: 已处理
   */
  approverProcessingType?: 'UNPROCESSED' | 'PROCESSED';
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  /**
   * 公司ID-SaaS
   */
  companyInfoIdAtSaaS?: number;
  /**
   * 下单时间上限，精度到天
   */
  createdFrom?: string;
  /**
   * 下单时间下限,精度到天
   */
  createdTo?: string;
  creditPayInfo?: CreditPayInfoVO;
  /**
   * 小b端我的客户列表是否是查询全部
   */
  customerOrderListAllType?: boolean;
  /**
   * 订单发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 订单流程状态
   * * INIT: 0: INIT 创建订单
   * * REMEDY: 1: REMEDY 修改订单
   * * REFUND: 2: REFUND 已退款
   * * AUDIT: 3: AUDIT 已审核
   * * DELIVERED_PART: 4: DELIVERED_PART 部分发货
   * * DELIVERED: 5: DELIVERED 已发货
   * * CONFIRMED: 6: CONFIRMED 已确认
   * * COMPLETED: 7: COMPLETED 已完成
   * * VOID: 8: VOID 已作废
   * * GROUPON: 9: GROUPON 已参团
   * * APPROVAL: 10: APPROVAL 审批中
   */
  flowState?:
  | 'INIT'
  | 'REMEDY'
  | 'REFUND'
  | 'AUDIT'
  | 'DELIVERED_PART'
  | 'DELIVERED'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'VOID'
  | 'GROUPON'
  | 'APPROVAL';
  /**
   * 邀请人id，用于查询从店铺精选下的单
   */
  inviteeId?: string;
  /**
   * 关键字，用于搜索订单编号或商品名称
   */
  keywords?: string;
  /**
   * 订单类型
   * * NORMAL_ORDER: 0: 普通订单
   * * POINTS_ORDER: 1: 积分订单
   * * ALL_ORDER: 2: 所有订单
   */
  orderType?: 'NORMAL_ORDER' | 'POINTS_ORDER' | 'ALL_ORDER';
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest3;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest4;
  /**
   * 父级id
   */
  parentCustomerId?: string;
  /**
   * 母账号id
   */
  parentId?: string;
  /**
   * 订单支付状态
   * * NOT_PAID: 0: NOT_PAID 未支付
   * * UNCONFIRMED: 1: UNCONFIRMED 待确认
   * * PAID: 2: PAID 已支付
   */
  payState?: number;
  sort?: Sort5;
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
   * 店铺编码 精确查询
   */
  storeId?: number;
  /**
   * 店铺ID-SaaS
   */
  storeIdAtSaaS?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICommitTradeCommitRequestReq".
 */
export interface ICommitTradeCommitRequestReq {
  /**
   * 会计科目id
   */
  accountingSubjectId?: string;
  /**
   * 选择的平台优惠券(通用券)id
   */
  commonCodeId?: string;
  /**
   * 公司ID-SaaS
   */
  companyInfoIdAtSaaS?: number;
  /**
   * 收货地址详细信息(包含省市区)
   */
  consigneeAddress?: string;
  /**
   * 订单收货地址id
   */
  consigneeId?: string;
  /**
   * 收货地址修改时间
   */
  consigneeUpdateTime?: string;
  /**
   * 成本中心id
   */
  costCenterId?: string;
  customer?: CustomerVO;
  distributeChannel?: DistributeChannel1;
  /**
   * 是否强制提交
   * * NO: 否
   * * YES: 是
   */
  forceCommit?: number;
  isDistributor?: '0' | '1';
  isFlashSaleGoods?: boolean;
  openFlag?: '0' | '1';
  operator?: Operator3;
  /**
   * 订单来源
   * * SUPPLIER: 0: 代客下单
   * * WECHAT: 1: 会员h5端下单
   * * PC: 2: 会员pc端下单
   * * APP: 3: 会员APP端下单
   * * LITTLEPROGRAM: 4: 会员小程序端下单
   */
  orderSource?: 'SUPPLIER' | 'WECHAT' | 'PC' | 'APP' | 'LITTLEPROGRAM';
  /**
   * 父级id
   */
  parentCustomerId?: string;
  /**
   * 使用积分
   */
  points?: number;
  /**
   * 分享人id
   */
  shareUserId?: string;
  /**
   * 小店名称
   */
  shopName?: string;
  /**
   * 订单信息
   */
  storeCommitInfoList?: StoreCommitInfoDTO[];
  /**
   * 店铺ID-SaaS
   */
  storeIdAtSaaS?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
export interface TradeCommitResultVO3 {
  /**
   * 订单取消时间
   */
  orderTimeOut?: string;
  /**
   * 父订单号
   */
  parentTid?: string;
  /**
   * 订单支付顺序
   * * NO_LIMIT: 0: NO_LIMIT 不限
   * * PAY_FIRST: 1: PAY_FIRST 先款后货
   */
  paymentOrder?: 'NO_LIMIT' | 'PAY_FIRST';
  /**
   * 交易金额
   */
  price?: number;
  /**
   * 订单编号
   */
  tid?: string;
  tradeState?: TradeStateVO3;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IConfirmConfirmRequestReq".
 */
export interface IConfirmConfirmRequestReq {
  /**
   * 公司ID-SaaS
   */
  companyInfoIdAtSaaS?: number;
  /**
   * 是否强制确认，用于营销活动有效性校验,true: 无效依然提交， false: 无效做异常返回
   */
  forceConfirm?: boolean;
  /**
   * 父级id
   */
  parentCustomerId?: string;
  /**
   * 店铺ID-SaaS
   */
  storeIdAtSaaS?: number;
  /**
   * 商品信息
   */
  tradeItems?: TradeItemRequest[];
  /**
   * 订单营销信息快照
   */
  tradeMarketingList?: TradeMarketingDTO[];
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICustomerOrderPageParamRequestReq".
 */
export interface ICustomerOrderPageParamRequestReq {
  /**
   * 审批状态
   * * APPROVAL: 0: 审批中
   * * APPROVED: 1: 审批通过
   * * REJECTED: 2: 驳回
   */
  approvalStatus?: 'APPROVAL' | 'APPROVED' | 'REJECTED';
  /**
   * 审批来源
   * * INITIATOR: 0: 发起人
   * * APPROVER: 1: 审批人
   */
  approverPersonSource?: 'INITIATOR' | 'APPROVER';
  /**
   * 审批处理类型 0：待处理 1：已处理
   * * UNPROCESSED: 0: 待处理
   * * PROCESSED: 1: 已处理
   */
  approverProcessingType?: 'UNPROCESSED' | 'PROCESSED';
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  /**
   * 公司ID-SaaS
   */
  companyInfoIdAtSaaS?: number;
  /**
   * 下单时间上限，精度到天
   */
  createdFrom?: string;
  /**
   * 下单时间下限,精度到天
   */
  createdTo?: string;
  creditPayInfo?: CreditPayInfoVO;
  /**
   * 小b端我的客户列表是否是查询全部
   */
  customerOrderListAllType?: boolean;
  /**
   * 订单发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 订单流程状态
   * * INIT: 0: INIT 创建订单
   * * REMEDY: 1: REMEDY 修改订单
   * * REFUND: 2: REFUND 已退款
   * * AUDIT: 3: AUDIT 已审核
   * * DELIVERED_PART: 4: DELIVERED_PART 部分发货
   * * DELIVERED: 5: DELIVERED 已发货
   * * CONFIRMED: 6: CONFIRMED 已确认
   * * COMPLETED: 7: COMPLETED 已完成
   * * VOID: 8: VOID 已作废
   * * GROUPON: 9: GROUPON 已参团
   * * APPROVAL: 10: APPROVAL 审批中
   */
  flowState?:
  | 'INIT'
  | 'REMEDY'
  | 'REFUND'
  | 'AUDIT'
  | 'DELIVERED_PART'
  | 'DELIVERED'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'VOID'
  | 'GROUPON'
  | 'APPROVAL';
  /**
   * 邀请人id，用于查询从店铺精选下的单
   */
  inviteeId?: string;
  /**
   * 关键字，用于搜索订单编号或商品名称
   */
  keywords?: string;
  /**
   * 订单类型
   * * NORMAL_ORDER: 0: 普通订单
   * * POINTS_ORDER: 1: 积分订单
   * * ALL_ORDER: 2: 所有订单
   */
  orderType?: 'NORMAL_ORDER' | 'POINTS_ORDER' | 'ALL_ORDER';
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest3;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest4;
  /**
   * 父级id
   */
  parentCustomerId?: string;
  /**
   * 母账号id
   */
  parentId?: string;
  /**
   * 订单支付状态
   * * NOT_PAID: 0: NOT_PAID 未支付
   * * UNCONFIRMED: 1: UNCONFIRMED 待确认
   * * PAID: 2: PAID 已支付
   */
  payState?: number;
  sort?: Sort5;
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
   * 店铺编码 精确查询
   */
  storeId?: number;
  /**
   * 店铺ID-SaaS
   */
  storeIdAtSaaS?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ILogisticsQueryRequestReq".
 */
export interface ILogisticsQueryRequestReq {
  /**
   * 快递公司代码
   */
  companyCode?: string;
  /**
   * 公司ID-SaaS
   */
  companyInfoIdAtSaaS?: number;
  /**
   * 快递单号
   */
  deliveryNo?: string;
  /**
   * 父级id
   */
  parentCustomerId?: string;
  /**
   * 商户id
   */
  storeId?: number;
  /**
   * 店铺ID-SaaS
   */
  storeIdAtSaaS?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
export interface TradeParamsRequest1 {
  /**
   * 是否后端操作
   * * NO: 否
   * * YES: 是
   */
  backendFlag?: number;
  /**
   * 订单买家备注
   */
  buyerRemark?: string;
  /**
   * 是否为下单
   * * NO: 否
   * * YES: 是
   */
  commitFlag?: number;
  consignee?: ConsigneeDTO;
  /**
   * 选择的收货地址id
   */
  consigneeId?: string;
  /**
   * 收货地址修改时间
   */
  consigneeUpdateTime?: string;
  /**
   * 选择的店铺优惠券id
   */
  couponCodeId?: string;
  customer?: CustomerVO3;
  /**
   * 配送方式
   * * OTHER: 0: 其他
   * * EXPRESS: 1: 快递
   */
  deliverWay?: 0 | 1;
  /**
   * 收货地址详细信息
   */
  detailAddress?: string;
  /**
   * 附件, 逗号隔开
   */
  encloses?: string;
  /**
   * 是否强制提交
   * * NO: 否
   * * YES: 是
   */
  forceCommit?: number;
  invoice?: InvoiceDTO;
  invoiceConsignee?: ConsigneeDTO1;
  /**
   * 操作人ip
   */
  ip?: string;
  /**
   * 营销活动
   */
  marketingList?: TradeMarketingDTO2[];
  /**
   * 旧订单赠品数据，用于编辑订单的场景，
   */
  oldGifts?: TradeItemDTO[];
  /**
   * 旧订单商品数据，用于编辑订单的场景
   */
  oldTradeItems?: TradeItemDTO1[];
  payType?: '0' | '1' | '2';
  /**
   * 订单来源方
   * * BOSS: BOSS
   * * CUSTOMER: 商户(小B)
   * * THIRD: 第三方
   * * SUPPLIER: 商家
   * * PLATFORM: 平台
   * * MALL: 品牌商
   * * PROVIDER: 供应商
   */
  platform?:
  | 'BOSS'
  | 'CUSTOMER'
  | 'THIRD'
  | 'SUPPLIER'
  | 'PLATFORM'
  | 'MALL'
  | 'PROVIDER';
  seller?: SellerDTO;
  /**
   * 订单卖家备注
   */
  sellerRemark?: string;
  storeLevel?: CustomerLevelVO;
  supplier?: SupplierDTO;
  /**
   * 订单商品数据
   */
  tradeItems?: TradeItemDTO2[];
  tradePrice?: TradePriceDTO;
  [k: string]: any;
}
export interface TradeGetFreightResponse2 {
  /**
   * 配送费用
   */
  deliveryPrice?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  [k: string]: any;
}
export interface TradeItemVO8 {
  /**
   * 商品所属的userId storeId?
   */
  adminId?: string;
  /**
   * 货物id
   */
  bn?: string;
  /**
   * 商品品牌
   */
  brand?: number;
  /**
   * 可退数量
   */
  canReturnNum?: number;
  /**
   * 分类id
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 分销佣金比例
   */
  commissionRate?: number;
  /**
   * 成本价
   */
  cost?: number;
  /**
   * 优惠券商品结算信息(包括商品参加的优惠券信息)
   */
  couponSettlements?: CouponSettlementVO[];
  /**
   * 发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 已发货数量
   */
  deliveredNum?: number;
  /**
   * 分销佣金
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
  flashSaleGoodsId?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
  /**
   * 商品体积
   */
  goodsCubage?: number;
  /**
   * 商品重量
   */
  goodsWeight?: number;
  /**
   * 是否入账状态
   * * NO: 否
   * * YES: 是
   * * FAIL: 失败
   */
  isAccountStatus?: 0 | 1 | 2;
  /**
   * 是否是秒杀抢购商品
   */
  isFlashSaleGoods?: boolean;
  /**
   * 商品价格
   */
  levelPrice?: number;
  /**
   * 商品参加的营销活动id集合
   */
  marketingIds?: number[];
  /**
   * 营销商品结算信息
   */
  marketingSettlements?: MarketingSettlementVO[];
  /**
   * 购买数量
   */
  num?: number;
  /**
   * oid
   */
  oid?: string;
  /**
   * 商品原价
   */
  originalPrice?: number;
  /**
   * 商品图片
   */
  pic?: string;
  /**
   * 积分
   */
  points?: number;
  /**
   * 积分商品Id
   */
  pointsGoodsId?: string;
  /**
   * 积分兑换金额
   */
  pointsPrice?: number;
  /**
   * 成交价格
   */
  price?: number;
  /**
   * 结算价格
   */
  settlementPrice?: number;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * skuName
   */
  skuName?: string;
  /**
   * skuNo
   */
  skuNo?: string;
  /**
   * 规格描述信息
   */
  specDetails?: string;
  /**
   * 平摊小计
   */
  splitPrice?: number;
  /**
   * spuId
   */
  spuId?: string;
  /**
   * spuName
   */
  spuName?: string;
  /**
   * 店铺分类Id
   */
  storeCateId?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 商家编码
   */
  supplierCode?: string;
  /**
   * 单位
   */
  unit?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGrouponBuyRequestReq".
 */
export interface IGrouponBuyRequestReq {
  /**
   * 购买数量
   */
  buyCount?: number;
  /**
   * 商品skuId
   */
  goodsInfoId?: string;
  /**
   * 团号
   */
  grouponNo?: string;
  /**
   * 是否开团购买
   */
  openGroupon?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IImmediateBuyConfirmRequestReq".
 */
export interface IImmediateBuyConfirmRequestReq {
  /**
   * 购买数量
   */
  buyCount?: number;
  /**
   * 商品skuId
   */
  goodsInfoId?: string;
  /**
   * 是否开店礼包
   * * NO: 否
   * * YES: 是
   */
  storeBagsFlag?: 0 | 1;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPageParamRequestReq".
 */
export interface IPageParamRequestReq {
  /**
   * 审批状态
   * * APPROVAL: 0: 审批中
   * * APPROVED: 1: 审批通过
   * * REJECTED: 2: 驳回
   */
  approvalStatus?: 'APPROVAL' | 'APPROVED' | 'REJECTED';
  /**
   * 审批来源
   * * INITIATOR: 0: 发起人
   * * APPROVER: 1: 审批人
   */
  approverPersonSource?: 'INITIATOR' | 'APPROVER';
  /**
   * 审批处理类型 0：待处理 1：已处理
   * * UNPROCESSED: 0: 待处理
   * * PROCESSED: 1: 已处理
   */
  approverProcessingType?: 'UNPROCESSED' | 'PROCESSED';
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  /**
   * 公司ID-SaaS
   */
  companyInfoIdAtSaaS?: number;
  /**
   * 下单时间上限，精度到天
   */
  createdFrom?: string;
  /**
   * 下单时间下限,精度到天
   */
  createdTo?: string;
  creditPayInfo?: CreditPayInfoVO;
  /**
   * 小b端我的客户列表是否是查询全部
   */
  customerOrderListAllType?: boolean;
  /**
   * 订单发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 订单流程状态
   * * INIT: 0: INIT 创建订单
   * * REMEDY: 1: REMEDY 修改订单
   * * REFUND: 2: REFUND 已退款
   * * AUDIT: 3: AUDIT 已审核
   * * DELIVERED_PART: 4: DELIVERED_PART 部分发货
   * * DELIVERED: 5: DELIVERED 已发货
   * * CONFIRMED: 6: CONFIRMED 已确认
   * * COMPLETED: 7: COMPLETED 已完成
   * * VOID: 8: VOID 已作废
   * * GROUPON: 9: GROUPON 已参团
   * * APPROVAL: 10: APPROVAL 审批中
   */
  flowState?:
  | 'INIT'
  | 'REMEDY'
  | 'REFUND'
  | 'AUDIT'
  | 'DELIVERED_PART'
  | 'DELIVERED'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'VOID'
  | 'GROUPON'
  | 'APPROVAL';
  /**
   * 邀请人id，用于查询从店铺精选下的单
   */
  inviteeId?: string;
  /**
   * 关键字，用于搜索订单编号或商品名称
   */
  keywords?: string;
  /**
   * 订单类型
   * * NORMAL_ORDER: 0: 普通订单
   * * POINTS_ORDER: 1: 积分订单
   * * ALL_ORDER: 2: 所有订单
   */
  orderType?: 'NORMAL_ORDER' | 'POINTS_ORDER' | 'ALL_ORDER';
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest3;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest4;
  /**
   * 父级id
   */
  parentCustomerId?: string;
  /**
   * 母账号id
   */
  parentId?: string;
  /**
   * 订单支付状态
   * * NOT_PAID: 0: NOT_PAID 未支付
   * * UNCONFIRMED: 1: UNCONFIRMED 待确认
   * * PAID: 2: PAID 已支付
   */
  payState?: number;
  sort?: Sort5;
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
   * 店铺编码 精确查询
   */
  storeId?: number;
  /**
   * 店铺ID-SaaS
   */
  storeIdAtSaaS?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGrouponPageParamRequestReq".
 */
export interface IGrouponPageParamRequestReq {
  /**
   * 审批状态
   * * APPROVAL: 0: 审批中
   * * APPROVED: 1: 审批通过
   * * REJECTED: 2: 驳回
   */
  approvalStatus?: 'APPROVAL' | 'APPROVED' | 'REJECTED';
  /**
   * 审批来源
   * * INITIATOR: 0: 发起人
   * * APPROVER: 1: 审批人
   */
  approverPersonSource?: 'INITIATOR' | 'APPROVER';
  /**
   * 审批处理类型 0：待处理 1：已处理
   * * UNPROCESSED: 0: 待处理
   * * PROCESSED: 1: 已处理
   */
  approverProcessingType?: 'UNPROCESSED' | 'PROCESSED';
  /**
   * 分销渠道类型
   * * PC_MALL: PC商城
   * * MALL: 商城
   * * SHOP: 小店
   */
  channelType?: 0 | 1 | 2;
  /**
   * 公司ID-SaaS
   */
  companyInfoIdAtSaaS?: number;
  /**
   * 下单时间上限，精度到天
   */
  createdFrom?: string;
  /**
   * 下单时间下限,精度到天
   */
  createdTo?: string;
  creditPayInfo?: CreditPayInfoVO;
  /**
   * 小b端我的客户列表是否是查询全部
   */
  customerOrderListAllType?: boolean;
  /**
   * 订单发货状态
   * * NOT_YET_SHIPPED: 0: 未发货
   * * SHIPPED: 1: 已发货
   * * PART_SHIPPED: 2: 部分发货
   * * VOID: 3: 作废
   */
  deliverStatus?: 'NOT_YET_SHIPPED' | 'SHIPPED' | 'PART_SHIPPED' | 'VOID';
  /**
   * 订单流程状态
   * * INIT: 0: INIT 创建订单
   * * REMEDY: 1: REMEDY 修改订单
   * * REFUND: 2: REFUND 已退款
   * * AUDIT: 3: AUDIT 已审核
   * * DELIVERED_PART: 4: DELIVERED_PART 部分发货
   * * DELIVERED: 5: DELIVERED 已发货
   * * CONFIRMED: 6: CONFIRMED 已确认
   * * COMPLETED: 7: COMPLETED 已完成
   * * VOID: 8: VOID 已作废
   * * GROUPON: 9: GROUPON 已参团
   * * APPROVAL: 10: APPROVAL 审批中
   */
  flowState?:
  | 'INIT'
  | 'REMEDY'
  | 'REFUND'
  | 'AUDIT'
  | 'DELIVERED_PART'
  | 'DELIVERED'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'VOID'
  | 'GROUPON'
  | 'APPROVAL';
  /**
   * 邀请人id，用于查询从店铺精选下的单
   */
  inviteeId?: string;
  /**
   * 关键字，用于搜索订单编号或商品名称
   */
  keywords?: string;
  /**
   * 订单类型
   * * NORMAL_ORDER: 0: 普通订单
   * * POINTS_ORDER: 1: 积分订单
   * * ALL_ORDER: 2: 所有订单
   */
  orderType?: 'NORMAL_ORDER' | 'POINTS_ORDER' | 'ALL_ORDER';
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest3;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest4;
  /**
   * 父级id
   */
  parentCustomerId?: string;
  /**
   * 母账号id
   */
  parentId?: string;
  /**
   * 订单支付状态
   * * NOT_PAID: 0: NOT_PAID 未支付
   * * UNCONFIRMED: 1: UNCONFIRMED 待确认
   * * PAID: 2: PAID 已支付
   */
  payState?: number;
  sort?: Sort5;
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
   * 店铺编码 精确查询
   */
  storeId?: number;
  /**
   * 店铺ID-SaaS
   */
  storeIdAtSaaS?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ICreatePayOrderPaymentRecordRequestReq".
 */
export interface ICreatePayOrderPaymentRecordRequestReq {
  /**
   * 收款账号id
   */
  accountId?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 附件
   */
  encloses?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 关联的订单id
   */
  tid?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IStoreBagsBuyRequestReq".
 */
export interface IStoreBagsBuyRequestReq {
  /**
   * 商品skuId
   */
  goodsInfoId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISuitBuyRequestReq".
 */
export interface ISuitBuyRequestReq {
  /**
   * 活动主键
   */
  marketingId?: number;
  [k: string]: any;
}

//create by moon https://github.com/creasy2010/moon
