import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'CustomerDeliveryAddressBaseController';

/**
 *
 * 保存客户收货地址
 *
 */
async function saveAddress(
  editRequest: ISaveAddressEditRequestReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('CustomerDeliveryAddressBaseController', 'saveAddress')) {
      return Promise.resolve(
        require('./mock/CustomerDeliveryAddressBaseController.json').unknown ||
          {},
      );
    }
  }

  let result = await sdk.post(
    '/customer/address',

    {
      ...editRequest,
    },
  );
  return result.context;
}

/**
 *
 * 根据地址id查询客户收货地址详情
 *
 */
async function findById(
  addressId: IFindByIdAddressIdReq,
): Promise<CustomerDeliveryAddressByIdResponse> {
  if (__DEV__) {
    if (isMock('CustomerDeliveryAddressBaseController', 'findById')) {
      return Promise.resolve(
        require('./mock/CustomerDeliveryAddressBaseController.json')
          .CustomerDeliveryAddressByIdResponse || {},
      );
    }
  }

  let result = await sdk.get<CustomerDeliveryAddressByIdResponse>(
    '/customer/address/{addressId}'.replace('{addressId}', addressId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 修改客户收货地址
 *
 */
async function updateAddress(
  editRequest: IUpdateAddressEditRequestReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('CustomerDeliveryAddressBaseController', 'updateAddress')) {
      return Promise.resolve(
        require('./mock/CustomerDeliveryAddressBaseController.json').unknown ||
          {},
      );
    }
  }

  let result = await sdk.put(
    '/customer/addressInfo',

    {
      ...editRequest,
    },
  );
  return result.context;
}

/**
 *
 * 删除客户收货地址
 *
 */
async function deleteAddress_(
  addressId: IDeleteAddress_AddressIdReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('CustomerDeliveryAddressBaseController', 'deleteAddress_')) {
      return Promise.resolve(
        require('./mock/CustomerDeliveryAddressBaseController.json').unknown ||
          {},
      );
    }
  }

  let result = await sdk.deleteF(
    '/customer/addressInfo/{addressId}'.replace('{addressId}', addressId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 查询该客户的所有收货地址
 *
 */
async function findAddressList(): Promise<CustomerDeliveryAddressVOArray> {
  if (__DEV__) {
    if (isMock('CustomerDeliveryAddressBaseController', 'findAddressList')) {
      return Promise.resolve(
        require('./mock/CustomerDeliveryAddressBaseController.json')
          .CustomerDeliveryAddressVOArray || {},
      );
    }
  }

  let result = await sdk.get<CustomerDeliveryAddressVOArray>(
    '/customer/addressList',

    {},
  );
  return result.context;
}

/**
 *
 * 查询客户默认收货地址
 *
 */
async function findDefaultAddress(): Promise<CustomerDeliveryAddressResponse> {
  if (__DEV__) {
    if (isMock('CustomerDeliveryAddressBaseController', 'findDefaultAddress')) {
      return Promise.resolve(
        require('./mock/CustomerDeliveryAddressBaseController.json')
          .CustomerDeliveryAddressResponse || {},
      );
    }
  }

  let result = await sdk.get<CustomerDeliveryAddressResponse>(
    '/customer/addressinfo',

    {},
  );
  return result.context;
}

/**
 *
 * 设置客户收货地址为默认
 *
 */
async function setDefaultAddress(
  deliveryAddressId: ISetDefaultAddressDeliveryAddressIdReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('CustomerDeliveryAddressBaseController', 'setDefaultAddress')) {
      return Promise.resolve(
        require('./mock/CustomerDeliveryAddressBaseController.json').unknown ||
          {},
      );
    }
  }

  let result = await sdk.post(
    '/customer/defaultAddress/{deliveryAddressId}'.replace(
      '{deliveryAddressId}',
      deliveryAddressId + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 新增客户财务邮箱
 *
 */
async function addCouponCate(
  request: IAddCouponCateRequestReq,
): Promise<CustomerEmailAddResponse> {
  if (__DEV__) {
    if (isMock('CustomerDeliveryAddressBaseController', 'addCouponCate')) {
      return Promise.resolve(
        require('./mock/CustomerDeliveryAddressBaseController.json')
          .CustomerEmailAddResponse || {},
      );
    }
  }

  let result = await sdk.post<CustomerEmailAddResponse>(
    '/customer/email',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 修改客户财务邮箱
 *
 */
async function modifyCouponCate(
  request: IModifyCouponCateRequestReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('CustomerDeliveryAddressBaseController', 'modifyCouponCate')) {
      return Promise.resolve(
        require('./mock/CustomerDeliveryAddressBaseController.json').unknown ||
          {},
      );
    }
  }

  let result = await sdk.put(
    '/customer/email',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 银联企业支付通知财务
 *
 */
async function sendEmailToFinance(
  orderId: ISendEmailToFinanceOrderIdReq,
): Promise<unknown> {
  if (__DEV__) {
    if (isMock('CustomerDeliveryAddressBaseController', 'sendEmailToFinance')) {
      return Promise.resolve(
        require('./mock/CustomerDeliveryAddressBaseController.json').unknown ||
          {},
      );
    }
  }

  let result = await sdk.post(
    '/customer/email/sendToFinance/{orderId}'.replace(
      '{orderId}',
      orderId + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 根据客户邮箱ID删除财务邮箱
 *
 */
async function deleteCustomerEmailByCustomerEmailId_(
  customerEmailId: IDeleteCustomerEmailByCustomerEmailId_CustomerEmailIdReq,
): Promise<unknown> {
  if (__DEV__) {
    if (
      isMock(
        'CustomerDeliveryAddressBaseController',
        'deleteCustomerEmailByCustomerEmailId_',
      )
    ) {
      return Promise.resolve(
        require('./mock/CustomerDeliveryAddressBaseController.json').unknown ||
          {},
      );
    }
  }

  let result = await sdk.deleteF(
    '/customer/email/{customerEmailId}'.replace(
      '{customerEmailId}',
      customerEmailId + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 根据客户ID查询客户的财务邮箱列表
 *
 */
async function listCustomerEmailByCustomerId(): Promise<CustomerEmailVOArray> {
  if (__DEV__) {
    if (
      isMock(
        'CustomerDeliveryAddressBaseController',
        'listCustomerEmailByCustomerId',
      )
    ) {
      return Promise.resolve(
        require('./mock/CustomerDeliveryAddressBaseController.json')
          .CustomerEmailVOArray || {},
      );
    }
  }

  let result = await sdk.get<CustomerEmailVOArray>(
    '/customer/emailList',

    {},
  );
  return result.context;
}

/**
 *
 * 新增商品收藏
 *
 */
async function add(request: IAddRequestReq): Promise<unknown> {
  if (__DEV__) {
    if (isMock('CustomerDeliveryAddressBaseController', 'add')) {
      return Promise.resolve(
        require('./mock/CustomerDeliveryAddressBaseController.json').unknown ||
          {},
      );
    }
  }

  let result = await sdk.post(
    '/goods/goodsFollow',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 取消商品收藏
 *
 */
async function delete_(request: IDelete_RequestReq): Promise<unknown> {
  if (__DEV__) {
    if (isMock('CustomerDeliveryAddressBaseController', 'delete_')) {
      return Promise.resolve(
        require('./mock/CustomerDeliveryAddressBaseController.json').unknown ||
          {},
      );
    }
  }

  let result = await sdk.deleteF(
    '/goods/goodsFollow',

    {
      ...request,
    },
  );
  return result.context;
}

/**
 *
 * 获取商品收藏个数
 *
 */
async function count(): Promise<unknown> {
  if (__DEV__) {
    if (isMock('CustomerDeliveryAddressBaseController', 'count')) {
      return Promise.resolve(
        require('./mock/CustomerDeliveryAddressBaseController.json').unknown ||
          {},
      );
    }
  }

  let result = await sdk.get<unknown>(
    '/goods/goodsFollowNum',

    {},
  );
  return result.context;
}

/**
 *
 * 获取商品收藏列表
 *
 */
async function info(
  queryRequest: IInfoQueryRequestReq,
): Promise<FollowListResponse> {
  if (__DEV__) {
    if (isMock('CustomerDeliveryAddressBaseController', 'info')) {
      return Promise.resolve(
        require('./mock/CustomerDeliveryAddressBaseController.json')
          .FollowListResponse || {},
      );
    }
  }

  let result = await sdk.post<FollowListResponse>(
    '/goods/goodsFollows',

    {
      ...queryRequest,
    },
  );
  return result.context;
}

/**
 *
 * 删除失效商品
 *
 */
async function deleteInvalidGoods_(): Promise<unknown> {
  if (__DEV__) {
    if (isMock('CustomerDeliveryAddressBaseController', 'delete_')) {
      return Promise.resolve(
        require('./mock/CustomerDeliveryAddressBaseController.json').unknown ||
          {},
      );
    }
  }

  let result = await sdk.deleteF(
    '/goods/goodsFollows',

    {},
  );
  return result.context;
}

/**
 *
 * 是否含有失效商品
 *
 */
async function hasInvalid(): Promise<unknown> {
  if (__DEV__) {
    if (isMock('CustomerDeliveryAddressBaseController', 'hasInvalid')) {
      return Promise.resolve(
        require('./mock/CustomerDeliveryAddressBaseController.json').unknown ||
          {},
      );
    }
  }

  let result = await sdk.get<unknown>(
    '/goods/hasInvalidGoods',

    {},
  );
  return result.context;
}

/**
 *
 * 批量验证是否是收藏商品&lt;List&lt;String&gt;,相应的SkuId就是已收藏的商品ID&gt;
 *
 */
async function isGoodsFollow(
  request: IIsGoodsFollowRequestReq,
): Promise<undefinedArray> {
  if (__DEV__) {
    if (isMock('CustomerDeliveryAddressBaseController', 'isGoodsFollow')) {
      return Promise.resolve(
        require('./mock/CustomerDeliveryAddressBaseController.json')
          .undefinedArray || {},
      );
    }
  }

  let result = await sdk.post<undefinedArray>(
    '/goods/isGoodsFollow',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  saveAddress,

  findById,

  updateAddress,

  deleteAddress_,

  findAddressList,

  findDefaultAddress,

  setDefaultAddress,

  addCouponCate,

  modifyCouponCate,

  sendEmailToFinance,

  deleteCustomerEmailByCustomerEmailId_,

  listCustomerEmailByCustomerId,

  add,

  delete_,

  count,

  info,

  deleteInvalidGoods_,

  hasInvalid,

  isGoodsFollow,
};

/**
 * 内容
 */
export type CustomerDeliveryAddressVOArray = CustomerDeliveryAddressVO[];
/**
 * 内容
 */
export type CustomerEmailVOArray = CustomerEmailVO[];
/**
 * 内容
 */
export type UndefinedArray = string[];
/**
 * 地址id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IFindByIdAddressIdReq".
 */
export type IFindByIdAddressIdReq = string;
/**
 * 地址id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteAddress_AddressIdReq".
 */
export type IDeleteAddress_AddressIdReq = string;
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerDeliveryAddressVOArray".
 */
export type CustomerDeliveryAddressVOArray1 = CustomerDeliveryAddressVO2[];
/**
 * 地址id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISetDefaultAddressDeliveryAddressIdReq".
 */
export type ISetDefaultAddressDeliveryAddressIdReq = string;
/**
 * 订单id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISendEmailToFinanceOrderIdReq".
 */
export type ISendEmailToFinanceOrderIdReq = string;
/**
 * 客户邮箱ID
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteCustomerEmailByCustomerEmailId_CustomerEmailIdReq".
 */
export type IDeleteCustomerEmailByCustomerEmailId_CustomerEmailIdReq = string;
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerEmailVOArray".
 */
export type CustomerEmailVOArray1 = CustomerEmailVO2[];
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type Undefined = boolean;
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefinedArray".
 */
export type UndefinedArray1 = string[];

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "CustomerDeliveryAddressAddRequest".
 */
export interface CustomerDeliveryAddressAddRequest {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 收货人手机号码
   */
  consigneeNumber?: string;
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 详细地址
   */
  deliveryAddress?: string;
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 操作人员id
   */
  employeeId?: string;
  /**
   * 是否默认地址
   * * NO: 否
   * * YES: 是
   */
  isDefaltAddress?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
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
 * via the `definition` "BaseResponse«CustomerDeliveryAddressByIdResponse»".
 */
export interface BaseResponseCustomerDeliveryAddressByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerDeliveryAddressByIdResponse;
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
export interface CustomerDeliveryAddressByIdResponse {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 收货人手机号码
   */
  consigneeNumber?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客户ID
   */
  customerId?: string;
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
   * 详细地址
   */
  deliveryAddress?: string;
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 是否是默认地址
   * * NO: 否
   * * YES: 是
   */
  isDefaltAddress?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
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
 * via the `definition` "CustomerDeliveryAddressByIdResponse".
 */
export interface CustomerDeliveryAddressByIdResponse1 {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 收货人手机号码
   */
  consigneeNumber?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客户ID
   */
  customerId?: string;
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
   * 详细地址
   */
  deliveryAddress?: string;
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 是否是默认地址
   * * NO: 否
   * * YES: 是
   */
  isDefaltAddress?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
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
 * via the `definition` "CustomerDeliveryAddressModifyRequest".
 */
export interface CustomerDeliveryAddressModifyRequest {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 收货人手机号码
   */
  consigneeNumber?: string;
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 详细地址
   */
  deliveryAddress?: string;
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 操作人员id
   */
  employeeId?: string;
  /**
   * 是否默认地址
   * * NO: 否
   * * YES: 是
   */
  isDefaltAddress?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«List«CustomerDeliveryAddressVO»»".
 */
export interface BaseResponseListCustomerDeliveryAddressVO {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerDeliveryAddressVOArray;
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
export interface CustomerDeliveryAddressVO {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 收货人手机号码
   */
  consigneeNumber?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客户ID
   */
  customerId?: string;
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
   * 详细地址
   */
  deliveryAddress?: string;
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 是否是默认地址
   * * NO: 否
   * * YES: 是
   */
  isDefaltAddress?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
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
 * via the `definition` "CustomerDeliveryAddressVO".
 */
export interface CustomerDeliveryAddressVO1 {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 收货人手机号码
   */
  consigneeNumber?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客户ID
   */
  customerId?: string;
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
   * 详细地址
   */
  deliveryAddress?: string;
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 是否是默认地址
   * * NO: 否
   * * YES: 是
   */
  isDefaltAddress?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
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
 * via the `definition` "BaseResponse«CustomerDeliveryAddressResponse»".
 */
export interface BaseResponseCustomerDeliveryAddressResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerDeliveryAddressResponse;
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
export interface CustomerDeliveryAddressResponse {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 收货人手机号码
   */
  consigneeNumber?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客户ID
   */
  customerId?: string;
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
   * 详细地址
   */
  deliveryAddress?: string;
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 是否是默认地址
   * * NO: 否
   * * YES: 是
   */
  isDefaltAddress?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
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
 * via the `definition` "CustomerDeliveryAddressResponse".
 */
export interface CustomerDeliveryAddressResponse1 {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 收货人手机号码
   */
  consigneeNumber?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客户ID
   */
  customerId?: string;
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
   * 详细地址
   */
  deliveryAddress?: string;
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 是否是默认地址
   * * NO: 否
   * * YES: 是
   */
  isDefaltAddress?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
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
 * via the `definition` "CustomerEmailAddRequest".
 */
export interface CustomerEmailAddRequest {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 邮箱所属客户Id
   */
  customerId?: string;
  /**
   * 发信人邮箱地址
   */
  emailAddress?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«CustomerEmailAddResponse»".
 */
export interface BaseResponseCustomerEmailAddResponse {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerEmailAddResponse;
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
export interface CustomerEmailAddResponse {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 邮箱配置Id
   */
  customerEmailId?: string;
  /**
   * 邮箱所属客户Id
   */
  customerId?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 邮箱地址
   */
  emailAddress?: string;
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
 * via the `definition` "CustomerEmailAddResponse".
 */
export interface CustomerEmailAddResponse1 {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 邮箱配置Id
   */
  customerEmailId?: string;
  /**
   * 邮箱所属客户Id
   */
  customerId?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 邮箱地址
   */
  emailAddress?: string;
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
 * via the `definition` "CustomerEmailModifyRequest".
 */
export interface CustomerEmailModifyRequest {
  /**
   * 邮箱配置Id
   */
  customerEmailId?: string;
  /**
   * 邮箱所属客户Id
   */
  customerId?: string;
  /**
   * 发信人邮箱地址
   */
  emailAddress?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«List«CustomerEmailVO»»".
 */
export interface BaseResponseListCustomerEmailVO {
  /**
   * 结果码
   */
  code: string;
  context?: CustomerEmailVOArray;
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
export interface CustomerEmailVO {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 邮箱配置Id
   */
  customerEmailId?: string;
  /**
   * 邮箱所属客户Id
   */
  customerId?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 邮箱地址
   */
  emailAddress?: string;
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
 * via the `definition` "CustomerEmailVO".
 */
export interface CustomerEmailVO1 {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 邮箱配置Id
   */
  customerEmailId?: string;
  /**
   * 邮箱所属客户Id
   */
  customerId?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 邮箱地址
   */
  emailAddress?: string;
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
 * via the `definition` "FollowSaveRequest".
 */
export interface FollowSaveRequest {
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 收藏标识
   * * ALL: 0: 所有
   * * PURCHASE: 1: 采购
   * * FOLLOW: 2: 收藏
   */
  followFlag?: 0 | 1 | 2;
  /**
   * 编号
   */
  followIds?: number[];
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 购买数量
   */
  goodsNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "FollowDeleteRequest".
 */
export interface FollowDeleteRequest {
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 收藏标识
   * * ALL: 0: 所有
   * * PURCHASE: 1: 采购
   * * FOLLOW: 2: 收藏
   */
  followFlag?: 0 | 1 | 2;
  /**
   * 编号
   */
  followIds?: number[];
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 购买数量
   */
  goodsNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«long»".
 */
export interface BaseResponseLong {
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
 * via the `definition` "FollowListRequest".
 */
export interface FollowListRequest {
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 客户等级折扣
   */
  customerLevelDiscount?: number;
  /**
   * 客户等级id
   */
  customerLevelId?: number;
  /**
   * 收藏标识
   * * ALL: 0: 所有
   * * PURCHASE: 1: 采购
   * * FOLLOW: 2: 收藏
   */
  followFlag?: number;
  /**
   * 编号
   */
  followIds?: number[];
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 批量SKU编号
   */
  goodsInfoIds?: string[];
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
 * via the `definition` "BaseResponse«FollowListResponse»".
 */
export interface BaseResponseFollowListResponse {
  /**
   * 结果码
   */
  code: string;
  context?: FollowListResponse;
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
export interface FollowListResponse {
  goodsInfos?: MicroServicePageGoodsInfoVO;
  /**
   * 商品区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO[];
  /**
   * 商品SPU信息
   */
  goodses?: GoodsVO1[];
  [k: string]: any;
}
/**
 * 商品SKU信息
 */
export interface MicroServicePageGoodsInfoVO {
  /**
   * 具体数据内容
   */
  content?: GoodsInfoVO[];
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
export interface Sort3 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
export interface GoodsIntervalPriceVO {
  /**
   * 订货区间
   */
  count?: number;
  /**
   * 商品ID
   */
  goodsId?: string;
  /**
   * 商品ID
   */
  goodsInfoId?: string;
  /**
   * 订货区间ID
   */
  intervalPriceId?: number;
  /**
   * 订货价
   */
  price?: number;
  /**
   * 类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  type?: 0 | 1;
  [k: string]: any;
}
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
 * via the `definition` "FollowListResponse".
 */
export interface FollowListResponse1 {
  goodsInfos?: MicroServicePageGoodsInfoVO;
  /**
   * 商品区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO[];
  /**
   * 商品SPU信息
   */
  goodses?: GoodsVO1[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MicroServicePage«GoodsInfoVO»".
 */
export interface MicroServicePageGoodsInfoVO1 {
  /**
   * 具体数据内容
   */
  content?: GoodsInfoVO[];
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
 * via the `definition` "GoodsIntervalPriceVO".
 */
export interface GoodsIntervalPriceVO1 {
  /**
   * 订货区间
   */
  count?: number;
  /**
   * 商品ID
   */
  goodsId?: string;
  /**
   * 商品ID
   */
  goodsInfoId?: string;
  /**
   * 订货区间ID
   */
  intervalPriceId?: number;
  /**
   * 订货价
   */
  price?: number;
  /**
   * 类型
   * * SPU: 0：spu数据
   * * SKU: 1: sku数据
   */
  type?: 0 | 1;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsVO".
 */
export interface GoodsVO2 {
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
 * via the `definition` "IsFollowRequest".
 */
export interface IsFollowRequest {
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 收藏标识
   * * ALL: 0: 所有
   * * PURCHASE: 1: 采购
   * * FOLLOW: 2: 收藏
   */
  followFlag?: 0 | 1 | 2;
  /**
   * 编号
   */
  followIds?: number[];
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 购买数量
   */
  goodsNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«List«string»»".
 */
export interface BaseResponseListString {
  /**
   * 结果码
   */
  code: string;
  context?: UndefinedArray;
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
 * via the `definition` "ISaveAddressEditRequestReq".
 */
export interface ISaveAddressEditRequestReq {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 收货人手机号码
   */
  consigneeNumber?: string;
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 详细地址
   */
  deliveryAddress?: string;
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 操作人员id
   */
  employeeId?: string;
  /**
   * 是否默认地址
   * * NO: 否
   * * YES: 是
   */
  isDefaltAddress?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IUpdateAddressEditRequestReq".
 */
export interface IUpdateAddressEditRequestReq {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 收货人手机号码
   */
  consigneeNumber?: string;
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 详细地址
   */
  deliveryAddress?: string;
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 操作人员id
   */
  employeeId?: string;
  /**
   * 是否默认地址
   * * NO: 否
   * * YES: 是
   */
  isDefaltAddress?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
  [k: string]: any;
}
export interface CustomerDeliveryAddressVO2 {
  /**
   * 区
   */
  areaId?: number;
  /**
   * 市
   */
  cityId?: number;
  /**
   * 收货人
   */
  consigneeName?: string;
  /**
   * 收货人手机号码
   */
  consigneeNumber?: string;
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 客户ID
   */
  customerId?: string;
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
   * 详细地址
   */
  deliveryAddress?: string;
  /**
   * 收货地址ID
   */
  deliveryAddressId?: string;
  /**
   * 是否是默认地址
   * * NO: 否
   * * YES: 是
   */
  isDefaltAddress?: 0 | 1;
  /**
   * 省
   */
  provinceId?: number;
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
 * via the `definition` "IAddCouponCateRequestReq".
 */
export interface IAddCouponCateRequestReq {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 邮箱所属客户Id
   */
  customerId?: string;
  /**
   * 发信人邮箱地址
   */
  emailAddress?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IModifyCouponCateRequestReq".
 */
export interface IModifyCouponCateRequestReq {
  /**
   * 邮箱配置Id
   */
  customerEmailId?: string;
  /**
   * 邮箱所属客户Id
   */
  customerId?: string;
  /**
   * 发信人邮箱地址
   */
  emailAddress?: string;
  /**
   * 修改人
   */
  updatePerson?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 登录用户Id
   */
  userId?: string;
  [k: string]: any;
}
export interface CustomerEmailVO2 {
  /**
   * 创建人
   */
  createPerson?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 邮箱配置Id
   */
  customerEmailId?: string;
  /**
   * 邮箱所属客户Id
   */
  customerId?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 删除人
   */
  delPerson?: string;
  /**
   * 删除时间
   */
  delTime?: string;
  /**
   * 邮箱地址
   */
  emailAddress?: string;
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
 * via the `definition` "IAddRequestReq".
 */
export interface IAddRequestReq {
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 收藏标识
   * * ALL: 0: 所有
   * * PURCHASE: 1: 采购
   * * FOLLOW: 2: 收藏
   */
  followFlag?: 0 | 1 | 2;
  /**
   * 编号
   */
  followIds?: number[];
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 购买数量
   */
  goodsNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDelete_RequestReq".
 */
export interface IDelete_RequestReq {
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 收藏标识
   * * ALL: 0: 所有
   * * PURCHASE: 1: 采购
   * * FOLLOW: 2: 收藏
   */
  followFlag?: 0 | 1 | 2;
  /**
   * 编号
   */
  followIds?: number[];
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 购买数量
   */
  goodsNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IInfoQueryRequestReq".
 */
export interface IInfoQueryRequestReq {
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 客户等级折扣
   */
  customerLevelDiscount?: number;
  /**
   * 客户等级id
   */
  customerLevelId?: number;
  /**
   * 收藏标识
   * * ALL: 0: 所有
   * * PURCHASE: 1: 采购
   * * FOLLOW: 2: 收藏
   */
  followFlag?: number;
  /**
   * 编号
   */
  followIds?: number[];
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 批量SKU编号
   */
  goodsInfoIds?: string[];
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
 * via the `definition` "IIsGoodsFollowRequestReq".
 */
export interface IIsGoodsFollowRequestReq {
  /**
   * 会员id
   */
  customerId?: string;
  /**
   * 收藏标识
   * * ALL: 0: 所有
   * * PURCHASE: 1: 采购
   * * FOLLOW: 2: 收藏
   */
  followFlag?: 0 | 1 | 2;
  /**
   * 编号
   */
  followIds?: number[];
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 购买数量
   */
  goodsNum?: number;
  [k: string]: any;
}
