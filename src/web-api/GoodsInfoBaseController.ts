import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'GoodsInfoBaseController';

/**
 *
 * 根据skuIds获取商品信息
 *
 */
async function queryGoodsListBySkuIds(
  skuIds: IQueryGoodsListBySkuIdsSkuIdsReq,
): Promise<GoodsInfoViewByIdsResponse> {
  if (__DEV__) {
    if (isMock('GoodsInfoBaseController', 'queryGoodsListBySkuIds')) {
      return Promise.resolve(
        require('./mock/GoodsInfoBaseController.json')
          .GoodsInfoViewByIdsResponse || {},
      );
    }
  }

  let result = await sdk.post<GoodsInfoViewByIdsResponse>(
    '/goods/list',

    {
      ...skuIds,
    },
  );
  return result.context;
}

/**
 *
 * 根据商品分类id查询商品属性列表
 *
 */
async function propsList(
  cateId: IPropsListCateIdReq,
): Promise<GoodsPropVOArray> {
  if (__DEV__) {
    if (isMock('GoodsInfoBaseController', 'propsList')) {
      return Promise.resolve(
        require('./mock/GoodsInfoBaseController.json').GoodsPropVOArray || {},
      );
    }
  }

  let result = await sdk.get<GoodsPropVOArray>(
    '/goods/props/all/{cateId}'.replace('{cateId}', cateId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 根据商品分类id查询索引的商品属性列表
 *
 */
async function listByCateId(
  cateId: IListByCateIdCateIdReq,
): Promise<GoodsPropVOArray> {
  if (__DEV__) {
    if (isMock('GoodsInfoBaseController', 'listByCateId')) {
      return Promise.resolve(
        require('./mock/GoodsInfoBaseController.json').GoodsPropVOArray || {},
      );
    }
  }

  let result = await sdk.get<GoodsPropVOArray>(
    '/goods/props/{cateId}'.replace('{cateId}', cateId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 根据分销员-会员ID查询店铺精选小店名称
 *
 */
async function getShopInfo(
  distributorId: IGetShopInfoDistributorIdReq,
): Promise<ShopInfoResponse> {
  if (__DEV__) {
    if (isMock('GoodsInfoBaseController', 'getShopInfo')) {
      return Promise.resolve(
        require('./mock/GoodsInfoBaseController.json').ShopInfoResponse || {},
      );
    }
  }

  let result = await sdk.get<ShopInfoResponse>(
    '/goods/shop-info/{distributorId}'.replace(
      '{distributorId}',
      distributorId + '',
    ),

    {},
  );
  return result.context;
}

/**
 *
 * 分销员-我的店铺-选品功能
 *
 */
async function addDistributorGoods(
  queryRequest: IAddDistributorGoodsQueryRequestReq,
): Promise<EsGoodsInfoResponse> {
  if (__DEV__) {
    if (isMock('GoodsInfoBaseController', 'addDistributorGoods')) {
      return Promise.resolve(
        require('./mock/GoodsInfoBaseController.json').EsGoodsInfoResponse ||
          {},
      );
    }
  }

  let result = await sdk.post<EsGoodsInfoResponse>(
    '/goods/shop/add-distributor-goods',

    {
      ...queryRequest,
    },
  );
  return result.context;
}

/**
 *
 * 分销员-我的店铺-店铺精选页
 *
 */
async function shopSkuList(
  queryRequest: IShopSkuListQueryRequestReq,
): Promise<EsGoodsInfoResponse> {
  if (__DEV__) {
    if (isMock('GoodsInfoBaseController', 'shopSkuList')) {
      return Promise.resolve(
        require('./mock/GoodsInfoBaseController.json').EsGoodsInfoResponse ||
          {},
      );
    }
  }

  let result = await sdk.post<EsGoodsInfoResponse>(
    '/goods/shop/sku-list',

    {
      ...queryRequest,
    },
  );
  return result.context;
}

/**
 *
 * 小C-店铺精选页
 *
 */
async function shopSkuListToC(
  queryRequest: IShopSkuListToCQueryRequestReq,
): Promise<EsGoodsInfoResponse> {
  if (__DEV__) {
    if (isMock('GoodsInfoBaseController', 'shopSkuListToC')) {
      return Promise.resolve(
        require('./mock/GoodsInfoBaseController.json').EsGoodsInfoResponse ||
          {},
      );
    }
  }

  let result = await sdk.post<EsGoodsInfoResponse>(
    '/goods/shop/sku-list-to-c',

    {
      ...queryRequest,
    },
  );
  return result.context;
}

/**
 *
 * 查询商品详情
 *
 */
async function detail(
  skuId: IDetailSkuIdReq,
): Promise<GoodsInfoDetailByGoodsInfoResponse> {
  if (__DEV__) {
    if (isMock('GoodsInfoBaseController', 'detail')) {
      return Promise.resolve(
        require('./mock/GoodsInfoBaseController.json')
          .GoodsInfoDetailByGoodsInfoResponse || {},
      );
    }
  }

  let result = await sdk.get<GoodsInfoDetailByGoodsInfoResponse>(
    '/goods/sku/{skuId}'.replace('{skuId}', skuId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 未登录时,查询商品分页
 *
 */
async function skuListFront(
  queryRequest: ISkuListFrontQueryRequestReq,
): Promise<EsGoodsInfoResponse> {
  if (__DEV__) {
    if (isMock('GoodsInfoBaseController', 'skuListFront')) {
      return Promise.resolve(
        require('./mock/GoodsInfoBaseController.json').EsGoodsInfoResponse ||
          {},
      );
    }
  }

  let result = await sdk.post<EsGoodsInfoResponse>(
    '/goods/skuListFront',

    {
      ...queryRequest,
    },
  );
  return result.context;
}

/**
 *
 * 查询商品分页
 *
 */
async function list(
  queryRequest: IListQueryRequestReq,
): Promise<EsGoodsInfoResponse> {
  if (__DEV__) {
    if (isMock('GoodsInfoBaseController', 'list')) {
      return Promise.resolve(
        require('./mock/GoodsInfoBaseController.json').EsGoodsInfoResponse ||
          {},
      );
    }
  }

  let result = await sdk.post<EsGoodsInfoResponse>(
    '/goods/skus',

    {
      ...queryRequest,
    },
  );
  return result.context;
}

/**
 *
 * 未登录时查询商品详情
 *
 */
async function unLoginDetail(
  skuId: IUnLoginDetailSkuIdReq,
): Promise<GoodsInfoDetailByGoodsInfoResponse> {
  if (__DEV__) {
    if (isMock('GoodsInfoBaseController', 'unLoginDetail')) {
      return Promise.resolve(
        require('./mock/GoodsInfoBaseController.json')
          .GoodsInfoDetailByGoodsInfoResponse || {},
      );
    }
  }

  let result = await sdk.get<GoodsInfoDetailByGoodsInfoResponse>(
    '/goods/unLogin/sku/{skuId}'.replace('{skuId}', skuId + ''),

    {},
  );
  return result.context;
}

/**
 *
 * 未登录时，查询商品分页
 *
 */
async function unLoginList(
  queryRequest: IUnLoginListQueryRequestReq,
): Promise<EsGoodsInfoResponse> {
  if (__DEV__) {
    if (isMock('GoodsInfoBaseController', 'unLoginList')) {
      return Promise.resolve(
        require('./mock/GoodsInfoBaseController.json').EsGoodsInfoResponse ||
          {},
      );
    }
  }

  let result = await sdk.post<EsGoodsInfoResponse>(
    '/goods/unLogin/skus',

    {
      ...queryRequest,
    },
  );
  return result.context;
}

export default {
  queryGoodsListBySkuIds,

  propsList,

  listByCateId,

  getShopInfo,

  addDistributorGoods,

  shopSkuList,

  shopSkuListToC,

  detail,

  skuListFront,

  list,

  unLoginDetail,

  unLoginList,
};

/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export type IQueryGoodsListBySkuIdsSkuIdsReq = string[];
/**
 * 内容
 */
export type GoodsPropVOArray = GoodsPropVO[];
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryGoodsListBySkuIdsSkuIdsReq".
 */
export type IQueryGoodsListBySkuIdsSkuIdsReq1 = string[];
/**
 * 商品分类id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IPropsListCateIdReq".
 */
export type IPropsListCateIdReq = number;
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsPropVOArray".
 */
export type GoodsPropVOArray1 = GoodsPropVO2[];
/**
 * 商品分类id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IListByCateIdCateIdReq".
 */
export type IListByCateIdCateIdReq = number;
/**
 * 分销员-会员id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetShopInfoDistributorIdReq".
 */
export type IGetShopInfoDistributorIdReq = string;
/**
 * skuId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDetailSkuIdReq".
 */
export type IDetailSkuIdReq = number;
/**
 * skuId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IUnLoginDetailSkuIdReq".
 */
export type IUnLoginDetailSkuIdReq = number;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GoodsInfoViewByIdsResponse»".
 */
export interface BaseResponseGoodsInfoViewByIdsResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GoodsInfoViewByIdsResponse;
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
export interface GoodsInfoViewByIdsResponse {
  /**
   * 商品SKU信息
   */
  goodsInfos?: GoodsInfoVO[];
  /**
   * 商品SPU信息
   */
  goodses?: GoodsVO1[];
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
 * via the `definition` "GoodsInfoViewByIdsResponse".
 */
export interface GoodsInfoViewByIdsResponse1 {
  /**
   * 商品SKU信息
   */
  goodsInfos?: GoodsInfoVO[];
  /**
   * 商品SPU信息
   */
  goodses?: GoodsVO1[];
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
 * via the `definition` "BaseResponse«List«GoodsPropVO»»".
 */
export interface BaseResponseListGoodsPropVO {
  /**
   * 结果码
   */
  code: string;
  context?: GoodsPropVOArray;
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
export interface GoodsPropVO {
  /**
   * 分类Id
   */
  cateId?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 商品属性详情
   */
  goodsPropDetails?: GoodsPropDetailVO[];
  /**
   * 是否开启索引
   * * NO: 否
   * * YES: 是
   */
  indexFlag?: 0 | 1;
  /**
   * 商品属性详情字符串
   */
  propDetailStr?: string;
  /**
   * 属性Id
   */
  propId?: number;
  /**
   * 属性名称
   */
  propName?: string;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsPropDetailVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 详情id
   */
  detailId?: number;
  /**
   * 详情名
   */
  detailName?: string;
  /**
   * 属性id
   */
  propId?: number;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsPropVO".
 */
export interface GoodsPropVO1 {
  /**
   * 分类Id
   */
  cateId?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 商品属性详情
   */
  goodsPropDetails?: GoodsPropDetailVO[];
  /**
   * 是否开启索引
   * * NO: 否
   * * YES: 是
   */
  indexFlag?: 0 | 1;
  /**
   * 商品属性详情字符串
   */
  propDetailStr?: string;
  /**
   * 属性Id
   */
  propId?: number;
  /**
   * 属性名称
   */
  propName?: string;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsPropDetailVO".
 */
export interface GoodsPropDetailVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 详情id
   */
  detailId?: number;
  /**
   * 详情名
   */
  detailName?: string;
  /**
   * 属性id
   */
  propId?: number;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«ShopInfoResponse»".
 */
export interface BaseResponseShopInfoResponse {
  /**
   * 结果码
   */
  code: string;
  context?: ShopInfoResponse;
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
export interface ShopInfoResponse {
  /**
   * 精选店铺头像
   */
  headImg?: string;
  /**
   * 精选店铺名称
   */
  shopName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ShopInfoResponse".
 */
export interface ShopInfoResponse1 {
  /**
   * 精选店铺头像
   */
  headImg?: string;
  /**
   * 精选店铺名称
   */
  shopName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EsGoodsInfoQueryRequest".
 */
export interface EsGoodsInfoQueryRequest {
  /**
   * 上下架状态
   */
  addedFlag?: number;
  /**
   * 聚合参数
   */
  aggs?: AbstractAggregationBuilder[];
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: number;
  /**
   * 批量品牌编号
   */
  brandIds?: number[];
  /**
   * 是否需要反查分类
   * * NO: 否
   * * YES: 是
   */
  cateAggFlag?: number;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 批量分类编号
   */
  cateIds?: number[];
  /**
   * 商家类型
   */
  companyType?: number;
  /**
   * 签约结束日期
   */
  contractEndDate?: string;
  /**
   * 签约开始日期
   */
  contractStartDate?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 客户等级折扣
   */
  customerLevelDiscount?: number;
  /**
   * 客户等级
   */
  customerLevelId?: number;
  /**
   * 删除标记
   */
  delFlag?: number;
  /**
   * 分销商品审核状态 0:普通商品 1:待审核 2:已审核通过 3:审核不通过 4:禁止分销
   */
  distributionGoodsAudit?: number;
  /**
   * 批量分销商品SKU编号
   */
  distributionGoodsInfoIds?: string[];
  /**
   * 分销商品状态，配合分销开关使用
   */
  distributionGoodsStatus?: number;
  /**
   * 未登录时,前端采购单缓存信息
   */
  esGoodsInfoDTOList?: EsGoodsInfoDTO[];
  /**
   * 排除分销商品
   */
  excludeDistributionGoods?: boolean;
  /**
   * 禁售状态
   */
  forbidStatus?: number;
  /**
   * 批量商品ID
   */
  goodsIds?: string[];
  /**
   * 批量SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 隐藏已选分销商品,false:不隐藏，true:隐藏
   */
  hideSelectedDistributionGoods?: boolean;
  /**
   * 关键字，可能含空格
   */
  keywords?: string;
  /**
   * 模糊条件-商品名称
   */
  likeGoodsName?: string;
  /**
   * 营销Id
   */
  marketingId?: number;
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
   * 多个 属性与对应的属性值id列表
   */
  propDetails?: EsPropQueryRequest[];
  queryGoods?: boolean;
  searchCriteria?: SearchQuery;
  sort?: Sort4;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 排序标识
   */
  sortFlag?: number;
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
   * 排序参数
   */
  sorts?: SortBuilder1[];
  /**
   * 精确查询-规格值参数
   */
  specs?: EsSpecQueryRequest[];
  /**
   * 库存状态
   */
  stockFlag?: number;
  /**
   * 批量店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 店铺状态
   * * OPENING: 0、开启
   * * CLOSED: 1、关店
   */
  storeState?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  whereCriteria?: QueryBuilder2;
  [k: string]: any;
}
export interface AbstractAggregationBuilder {
  fragment?: boolean;
  metaData?: {
    [k: string]: any;
  };
  name?: string;
  pipelineAggregations?: PipelineAggregationBuilder[];
  subAggregations?: AggregationBuilder[];
  type?: string;
  writeableName?: string;
  [k: string]: any;
}
export interface PipelineAggregationBuilder {
  bucketsPaths?: string[];
  fragment?: boolean;
  metaData?: {
    [k: string]: any;
  };
  name?: string;
  type?: string;
  writeableName?: string;
  [k: string]: any;
}
export interface AggregationBuilder {
  fragment?: boolean;
  metaData?: {
    [k: string]: any;
  };
  name?: string;
  pipelineAggregations?: PipelineAggregationBuilder1[];
  subAggregations?: AggregationBuilder1[];
  type?: string;
  writeableName?: string;
  [k: string]: any;
}
export interface PipelineAggregationBuilder1 {
  bucketsPaths?: string[];
  fragment?: boolean;
  metaData?: {
    [k: string]: any;
  };
  name?: string;
  type?: string;
  writeableName?: string;
  [k: string]: any;
}
export interface AggregationBuilder1 {
  fragment?: boolean;
  metaData?: {
    [k: string]: any;
  };
  name?: string;
  pipelineAggregations?: PipelineAggregationBuilder1[];
  subAggregations?: AggregationBuilder1[];
  type?: string;
  writeableName?: string;
  [k: string]: any;
}
export interface EsGoodsInfoDTO {
  /**
   * SkuId
   */
  goodsInfoId?: string;
  /**
   * 购买数量
   */
  goodsNum?: number;
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
export interface EsPropQueryRequest {
  /**
   * 搜索属性值
   */
  detailIds?: number[];
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest2;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest3;
  /**
   * 搜索属性
   */
  propId?: number;
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
export interface PageRequest2 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
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
export interface Sort1 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
export interface SearchQuery {
  aggregations?: AbstractAggregationBuilder1[];
  elasticsearchSorts?: SortBuilder[];
  facets?: FacetRequest[];
  fields?: string[];
  filter?: QueryBuilder;
  highlightBuilder?: HighlightBuilder;
  highlightFields?: Field[];
  ids?: string[];
  indices?: string[];
  indicesBoost?: IndexBoost[];
  indicesOptions?: IndicesOptions;
  minScore?: number;
  pageable?: Pageable;
  query?: QueryBuilder1;
  route?: string;
  scriptFields?: ScriptField[];
  searchType?: 'DFS_QUERY_THEN_FETCH' | 'QUERY_THEN_FETCH' | 'QUERY_AND_FETCH';
  sort?: Sort3;
  sourceFilter?: SourceFilter;
  trackScores?: boolean;
  types?: string[];
  [k: string]: any;
}
export interface AbstractAggregationBuilder1 {
  fragment?: boolean;
  metaData?: {
    [k: string]: any;
  };
  name?: string;
  pipelineAggregations?: PipelineAggregationBuilder[];
  subAggregations?: AggregationBuilder[];
  type?: string;
  writeableName?: string;
  [k: string]: any;
}
export interface SortBuilder {
  fragment?: boolean;
  writeableName?: string;
  [k: string]: any;
}
export interface FacetRequest {
  facet?: AbstractAggregationBuilder2;
  [k: string]: any;
}
export interface AbstractAggregationBuilder2 {
  fragment?: boolean;
  metaData?: {
    [k: string]: any;
  };
  name?: string;
  pipelineAggregations?: PipelineAggregationBuilder[];
  subAggregations?: AggregationBuilder[];
  type?: string;
  writeableName?: string;
  [k: string]: any;
}
export interface QueryBuilder {
  fragment?: boolean;
  name?: string;
  writeableName?: string;
  [k: string]: any;
}
export interface HighlightBuilder {
  fragment?: boolean;
  [k: string]: any;
}
export interface Field {
  fragment?: boolean;
  [k: string]: any;
}
export interface IndexBoost {
  boost?: number;
  indexName?: string;
  [k: string]: any;
}
export interface IndicesOptions {
  fragment?: boolean;
  [k: string]: any;
}
export interface Pageable {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort2;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort2 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
export interface QueryBuilder1 {
  fragment?: boolean;
  name?: string;
  writeableName?: string;
  [k: string]: any;
}
export interface ScriptField {
  [k: string]: any;
}
export interface Sort3 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
export interface SourceFilter {
  excludes?: string[];
  includes?: string[];
  [k: string]: any;
}
export interface Sort4 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
export interface SortBuilder1 {
  fragment?: boolean;
  writeableName?: string;
  [k: string]: any;
}
export interface EsSpecQueryRequest {
  /**
   * 搜索规格项
   */
  name?: string;
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest4;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest5;
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
   * 登录用户Id
   */
  userId?: string;
  /**
   * 搜索规格值
   */
  values?: string[];
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
export interface PageRequest5 {
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
export interface QueryBuilder2 {
  fragment?: boolean;
  name?: string;
  writeableName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "AbstractAggregationBuilder".
 */
export interface AbstractAggregationBuilder3 {
  fragment?: boolean;
  metaData?: {
    [k: string]: any;
  };
  name?: string;
  pipelineAggregations?: PipelineAggregationBuilder[];
  subAggregations?: AggregationBuilder[];
  type?: string;
  writeableName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PipelineAggregationBuilder".
 */
export interface PipelineAggregationBuilder2 {
  bucketsPaths?: string[];
  fragment?: boolean;
  metaData?: {
    [k: string]: any;
  };
  name?: string;
  type?: string;
  writeableName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "AggregationBuilder".
 */
export interface AggregationBuilder2 {
  fragment?: boolean;
  metaData?: {
    [k: string]: any;
  };
  name?: string;
  pipelineAggregations?: PipelineAggregationBuilder1[];
  subAggregations?: AggregationBuilder1[];
  type?: string;
  writeableName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EsGoodsInfoDTO".
 */
export interface EsGoodsInfoDTO1 {
  /**
   * SkuId
   */
  goodsInfoId?: string;
  /**
   * 购买数量
   */
  goodsNum?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "PageRequest".
 */
export interface PageRequest6 {
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
 * via the `definition` "EsPropQueryRequest".
 */
export interface EsPropQueryRequest1 {
  /**
   * 搜索属性值
   */
  detailIds?: number[];
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest2;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest3;
  /**
   * 搜索属性
   */
  propId?: number;
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
 * via the `definition` "SearchQuery".
 */
export interface SearchQuery1 {
  aggregations?: AbstractAggregationBuilder1[];
  elasticsearchSorts?: SortBuilder[];
  facets?: FacetRequest[];
  fields?: string[];
  filter?: QueryBuilder;
  highlightBuilder?: HighlightBuilder;
  highlightFields?: Field[];
  ids?: string[];
  indices?: string[];
  indicesBoost?: IndexBoost[];
  indicesOptions?: IndicesOptions;
  minScore?: number;
  pageable?: Pageable;
  query?: QueryBuilder1;
  route?: string;
  scriptFields?: ScriptField[];
  searchType?: 'DFS_QUERY_THEN_FETCH' | 'QUERY_THEN_FETCH' | 'QUERY_AND_FETCH';
  sort?: Sort3;
  sourceFilter?: SourceFilter;
  trackScores?: boolean;
  types?: string[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "FacetRequest".
 */
export interface FacetRequest1 {
  facet?: AbstractAggregationBuilder2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "HighlightBuilder".
 */
export interface HighlightBuilder1 {
  fragment?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Field".
 */
export interface Field1 {
  fragment?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IndexBoost".
 */
export interface IndexBoost1 {
  boost?: number;
  indexName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IndicesOptions".
 */
export interface IndicesOptions1 {
  fragment?: boolean;
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
  sort?: Sort2;
  unpaged?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ScriptField".
 */
export interface ScriptField1 {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SourceFilter".
 */
export interface SourceFilter1 {
  excludes?: string[];
  includes?: string[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Sort".
 */
export interface Sort6 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "SortBuilder".
 */
export interface SortBuilder2 {
  fragment?: boolean;
  writeableName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EsSpecQueryRequest".
 */
export interface EsSpecQueryRequest1 {
  /**
   * 搜索规格项
   */
  name?: string;
  /**
   * 第几页
   */
  pageNum?: number;
  pageRequest?: PageRequest4;
  /**
   * 每页显示多少条
   */
  pageSize?: number;
  pageable?: PageRequest5;
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
   * 登录用户Id
   */
  userId?: string;
  /**
   * 搜索规格值
   */
  values?: string[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "QueryBuilder".
 */
export interface QueryBuilder3 {
  fragment?: boolean;
  name?: string;
  writeableName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«EsGoodsInfoResponse»".
 */
export interface BaseResponseEsGoodsInfoResponse {
  /**
   * 结果码
   */
  code: string;
  context?: EsGoodsInfoResponse;
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
export interface EsGoodsInfoResponse {
  /**
   * 品牌
   */
  brands?: GoodsBrandVO[];
  /**
   * 分类
   */
  cateList?: GoodsCateVO[];
  esGoodsInfoPage?: PageEsGoodsInfo;
  /**
   * 商品区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO[];
  /**
   * SPU
   */
  goodsList?: GoodsVO3[];
  /**
   * 规格值
   */
  goodsSpecDetails?: GoodsSpecDetailVO[];
  /**
   * 规格
   */
  goodsSpecs?: GoodsSpecVO[];
  [k: string]: any;
}
export interface GoodsBrandVO {
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 品牌logo
   */
  logo?: string;
  /**
   * 品牌别名
   */
  nickName?: string;
  /**
   * 拼音
   */
  pinYin?: string;
  spinYin?: string;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsCateVO {
  /**
   * 分类层次
   */
  cateGrade?: number;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 分类图片
   */
  cateImg?: string;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 父类编号
   */
  cateParentId?: number;
  /**
   * 分类路径
   */
  catePath?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 一对多关系，子分类
   */
  goodsCateList?: null[];
  /**
   * 一对多关系，属性
   */
  goodsProps?: GoodsCatePropVO[];
  /**
   * 成长值获取比例
   */
  growthValueRate?: number;
  /**
   * 默认标记
   * * NO: 否
   * * YES: 是
   */
  isDefault?: 0 | 1;
  /**
   * 是否使用上级类目扣率
   * * NO: 否
   * * YES: 是
   */
  isParentCateRate?: 0 | 1;
  /**
   * 是否使用上级类目成长值获取比例
   * * NO: 否
   * * YES: 是
   */
  isParentGrowthValueRate?: 0 | 1;
  /**
   * 是否使用上级类目积分获取比例
   * * NO: 否
   * * YES: 是
   */
  isParentPointsRate?: 0 | 1;
  /**
   * 拼音
   */
  pinYin?: string;
  /**
   * 积分获取比例
   */
  pointsRate?: number;
  /**
   * 排序
   */
  sort?: number;
  spinYin?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsCatePropVO {
  /**
   * 分类id
   */
  cateId?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 商品属性明细
   */
  goodsPropDetails?: GoodsPropDetailVO2[];
  /**
   * 默认标识
   * * NO: 否
   * * YES: 是
   */
  indexFlag?: 0 | 1;
  /**
   * 属性明细
   */
  propDetailStr?: string;
  /**
   * 属性id
   */
  propId?: number;
  /**
   * 属性名
   */
  propName?: string;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsPropDetailVO2 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 详情id
   */
  detailId?: number;
  /**
   * 详情名
   */
  detailName?: string;
  /**
   * 属性id
   */
  propId?: number;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * 索引SKU
 */
export interface PageEsGoodsInfo {
  content?: EsGoodsInfo[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: Pageable2;
  size?: number;
  sort?: Sort7;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
export interface EsGoodsInfo {
  addedTime?: string;
  auditStatus?: number;
  contractEndDate?: string;
  contractStartDate?: string;
  customerPrices?: GoodsCustomerPriceNest[];
  distributionGoodsStatus?: number;
  forbidStatus?: number;
  goodsBrand?: GoodsBrandNest;
  goodsCate?: GoodsCateNest;
  goodsInfo?: GoodsInfoNest;
  goodsLevelPrices?: GoodsLevelPriceNest[];
  id?: string;
  lowGoodsName?: string;
  propDetails?: GoodsPropDetailRelNest[];
  specDetails?: GoodsInfoSpecDetailRelNest[];
  storeCateIds?: number[];
  storeState?: number;
  [k: string]: any;
}
export interface GoodsCustomerPriceNest {
  /**
   * 起订量
   */
  count?: number;
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 客户价格ID
   */
  customerPriceId?: number;
  /**
   * 商品ID
   */
  goodsId?: string;
  /**
   * 商品ID
   */
  goodsInfoId?: string;
  /**
   * 限订量
   */
  maxCount?: number;
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
export interface GoodsBrandNest {
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 拼音
   */
  pinYin?: string;
  spinYin?: string;
  [k: string]: any;
}
export interface GoodsCateNest {
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 拼音
   */
  pinYin?: string;
  spinYin?: string;
  [k: string]: any;
}
export interface GoodsInfoNest {
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
  couponLabels?: CouponLabelVO2[];
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 按客户单独定价
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
   * 分销员商品表ID
   */
  distributionGoodsInfoId?: string;
  /**
   * 分销销量
   */
  distributionSalesCount?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
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
   * 商品好评数量
   */
  goodsFavorableCommentNum?: number;
  goodsFeedbackRate?: number;
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
  grouponLabel?: GrouponLabelVO2;
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
   * 多个订货区间价格编号
   */
  intervalPriceIds?: number[];
  /**
   * 是否已关联分销员，0：否，1：是
   */
  joinDistributior?: number;
  /**
   * 是否叠加客户等级折扣
   */
  levelDiscountFlag?: number;
  /**
   * 商品市场价
   */
  marketPrice?: number;
  /**
   * 促销标签
   */
  marketingLabels?: MarketingLabelVO2[];
  /**
   * 最新计算的限定量
   */
  maxCount?: number;
  /**
   * 扁平化多个规格值ID
   */
  mockSpecDetailIds?: number[];
  /**
   * 扁平化多个规格ID
   */
  mockSpecIds?: number[];
  /**
   * 设价类型
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
   * 商品分页
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
   */
  validFlag?: number;
  [k: string]: any;
}
export interface CouponLabelVO2 {
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
 * 促销标签
 */
export interface GrouponLabelVO2 {
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
export interface MarketingLabelVO2 {
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
export interface GoodsLevelPriceNest {
  /**
   * 起订量
   */
  count?: number;
  /**
   * 商品编号
   */
  goodsId?: string;
  /**
   * 商品ID
   */
  goodsInfoId?: string;
  /**
   * 等级ID
   */
  levelId?: number;
  /**
   * 级别价格ID
   */
  levelPriceId?: number;
  /**
   * 限订量
   */
  maxCount?: number;
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
export interface GoodsPropDetailRelNest {
  /**
   * 属性值id
   */
  detailId?: number;
  /**
   * 属性id
   */
  propId?: number;
  [k: string]: any;
}
export interface GoodsInfoSpecDetailRelNest {
  /**
   * 规格项值
   */
  allDetailName?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 规格值自定义名称
   */
  detailName?: string;
  /**
   * 商品编号
   */
  goodsId?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 新增商品时，模拟规格值ID
   */
  mockSpecDetailId?: number;
  /**
   *  新增商品时，模拟规格ID
   */
  mockSpecId?: number;
  /**
   * 规格值ID
   */
  specDetailId?: number;
  /**
   * SKU与规格值关联ID
   */
  specDetailRelId?: number;
  /**
   * 规格ID
   */
  specId?: number;
  /**
   * 规格项名称
   */
  specName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface Pageable2 {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort2;
  unpaged?: boolean;
  [k: string]: any;
}
export interface Sort7 {
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
export interface GoodsVO3 {
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
export interface GoodsSpecDetailVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 规格值明称
   */
  detailName?: string;
  /**
   * 商品ID
   */
  goodsId?: string;
  /**
   * 新增时，规格值摸拟ID
   */
  mockSpecDetailId?: number;
  /**
   * 新增时，规格摸拟ID
   */
  mockSpecId?: number;
  /**
   * 规格明细ID
   */
  specDetailId?: number;
  /**
   * 规格ID
   */
  specId?: number;
  /**
   * 创建时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsSpecVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 商品ID
   */
  goodsId?: string;
  /**
   * 新增时，模拟规格ID
   */
  mockSpecId?: number;
  /**
   * 多个规格值ID
   */
  specDetailIds?: number[];
  /**
   * 规格ID
   */
  specId?: number;
  /**
   * 规格名称
   */
  specName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EsGoodsInfoResponse".
 */
export interface EsGoodsInfoResponse1 {
  /**
   * 品牌
   */
  brands?: GoodsBrandVO[];
  /**
   * 分类
   */
  cateList?: GoodsCateVO[];
  esGoodsInfoPage?: PageEsGoodsInfo;
  /**
   * 商品区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO[];
  /**
   * SPU
   */
  goodsList?: GoodsVO3[];
  /**
   * 规格值
   */
  goodsSpecDetails?: GoodsSpecDetailVO[];
  /**
   * 规格
   */
  goodsSpecs?: GoodsSpecVO[];
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsBrandVO".
 */
export interface GoodsBrandVO1 {
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标志
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 品牌logo
   */
  logo?: string;
  /**
   * 品牌别名
   */
  nickName?: string;
  /**
   * 拼音
   */
  pinYin?: string;
  spinYin?: string;
  /**
   * 店铺id
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
 * via the `definition` "GoodsCateVO".
 */
export interface GoodsCateVO1 {
  /**
   * 分类层次
   */
  cateGrade?: number;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 分类图片
   */
  cateImg?: string;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 父类编号
   */
  cateParentId?: number;
  /**
   * 分类路径
   */
  catePath?: string;
  /**
   * 分类扣率
   */
  cateRate?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 一对多关系，子分类
   */
  goodsCateList?: null[];
  /**
   * 一对多关系，属性
   */
  goodsProps?: GoodsCatePropVO[];
  /**
   * 成长值获取比例
   */
  growthValueRate?: number;
  /**
   * 默认标记
   * * NO: 否
   * * YES: 是
   */
  isDefault?: 0 | 1;
  /**
   * 是否使用上级类目扣率
   * * NO: 否
   * * YES: 是
   */
  isParentCateRate?: 0 | 1;
  /**
   * 是否使用上级类目成长值获取比例
   * * NO: 否
   * * YES: 是
   */
  isParentGrowthValueRate?: 0 | 1;
  /**
   * 是否使用上级类目积分获取比例
   * * NO: 否
   * * YES: 是
   */
  isParentPointsRate?: 0 | 1;
  /**
   * 拼音
   */
  pinYin?: string;
  /**
   * 积分获取比例
   */
  pointsRate?: number;
  /**
   * 排序
   */
  sort?: number;
  spinYin?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsCatePropVO".
 */
export interface GoodsCatePropVO1 {
  /**
   * 分类id
   */
  cateId?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 商品属性明细
   */
  goodsPropDetails?: GoodsPropDetailVO2[];
  /**
   * 默认标识
   * * NO: 否
   * * YES: 是
   */
  indexFlag?: 0 | 1;
  /**
   * 属性明细
   */
  propDetailStr?: string;
  /**
   * 属性id
   */
  propId?: number;
  /**
   * 属性名
   */
  propName?: string;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Page«EsGoodsInfo»".
 */
export interface PageEsGoodsInfo1 {
  content?: EsGoodsInfo[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: Pageable2;
  size?: number;
  sort?: Sort7;
  totalElements?: number;
  totalPages?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "EsGoodsInfo".
 */
export interface EsGoodsInfo1 {
  addedTime?: string;
  auditStatus?: number;
  contractEndDate?: string;
  contractStartDate?: string;
  customerPrices?: GoodsCustomerPriceNest[];
  distributionGoodsStatus?: number;
  forbidStatus?: number;
  goodsBrand?: GoodsBrandNest;
  goodsCate?: GoodsCateNest;
  goodsInfo?: GoodsInfoNest;
  goodsLevelPrices?: GoodsLevelPriceNest[];
  id?: string;
  lowGoodsName?: string;
  propDetails?: GoodsPropDetailRelNest[];
  specDetails?: GoodsInfoSpecDetailRelNest[];
  storeCateIds?: number[];
  storeState?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsCustomerPriceNest".
 */
export interface GoodsCustomerPriceNest1 {
  /**
   * 起订量
   */
  count?: number;
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 客户价格ID
   */
  customerPriceId?: number;
  /**
   * 商品ID
   */
  goodsId?: string;
  /**
   * 商品ID
   */
  goodsInfoId?: string;
  /**
   * 限订量
   */
  maxCount?: number;
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
 * via the `definition` "GoodsBrandNest".
 */
export interface GoodsBrandNest1 {
  /**
   * 品牌编号
   */
  brandId?: number;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 拼音
   */
  pinYin?: string;
  spinYin?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsCateNest".
 */
export interface GoodsCateNest1 {
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 分类名称
   */
  cateName?: string;
  /**
   * 拼音
   */
  pinYin?: string;
  spinYin?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsInfoNest".
 */
export interface GoodsInfoNest1 {
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
  couponLabels?: CouponLabelVO2[];
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 按客户单独定价
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
   * 分销员商品表ID
   */
  distributionGoodsInfoId?: string;
  /**
   * 分销销量
   */
  distributionSalesCount?: number;
  /**
   * 运费模板ID
   */
  freightTempId?: number;
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
   * 商品好评数量
   */
  goodsFavorableCommentNum?: number;
  goodsFeedbackRate?: number;
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
  grouponLabel?: GrouponLabelVO2;
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
   * 多个订货区间价格编号
   */
  intervalPriceIds?: number[];
  /**
   * 是否已关联分销员，0：否，1：是
   */
  joinDistributior?: number;
  /**
   * 是否叠加客户等级折扣
   */
  levelDiscountFlag?: number;
  /**
   * 商品市场价
   */
  marketPrice?: number;
  /**
   * 促销标签
   */
  marketingLabels?: MarketingLabelVO2[];
  /**
   * 最新计算的限定量
   */
  maxCount?: number;
  /**
   * 扁平化多个规格值ID
   */
  mockSpecDetailIds?: number[];
  /**
   * 扁平化多个规格ID
   */
  mockSpecIds?: number[];
  /**
   * 设价类型
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
   * 商品分页
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
   */
  validFlag?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsLevelPriceNest".
 */
export interface GoodsLevelPriceNest1 {
  /**
   * 起订量
   */
  count?: number;
  /**
   * 商品编号
   */
  goodsId?: string;
  /**
   * 商品ID
   */
  goodsInfoId?: string;
  /**
   * 等级ID
   */
  levelId?: number;
  /**
   * 级别价格ID
   */
  levelPriceId?: number;
  /**
   * 限订量
   */
  maxCount?: number;
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
 * via the `definition` "GoodsPropDetailRelNest".
 */
export interface GoodsPropDetailRelNest1 {
  /**
   * 属性值id
   */
  detailId?: number;
  /**
   * 属性id
   */
  propId?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsInfoSpecDetailRelNest".
 */
export interface GoodsInfoSpecDetailRelNest1 {
  /**
   * 规格项值
   */
  allDetailName?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 是否删除
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 规格值自定义名称
   */
  detailName?: string;
  /**
   * 商品编号
   */
  goodsId?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 新增商品时，模拟规格值ID
   */
  mockSpecDetailId?: number;
  /**
   *  新增商品时，模拟规格ID
   */
  mockSpecId?: number;
  /**
   * 规格值ID
   */
  specDetailId?: number;
  /**
   * SKU与规格值关联ID
   */
  specDetailRelId?: number;
  /**
   * 规格ID
   */
  specId?: number;
  /**
   * 规格项名称
   */
  specName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
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
 * via the `definition` "GoodsSpecDetailVO".
 */
export interface GoodsSpecDetailVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 规格值明称
   */
  detailName?: string;
  /**
   * 商品ID
   */
  goodsId?: string;
  /**
   * 新增时，规格值摸拟ID
   */
  mockSpecDetailId?: number;
  /**
   * 新增时，规格摸拟ID
   */
  mockSpecId?: number;
  /**
   * 规格明细ID
   */
  specDetailId?: number;
  /**
   * 规格ID
   */
  specId?: number;
  /**
   * 创建时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsSpecVO".
 */
export interface GoodsSpecVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 商品ID
   */
  goodsId?: string;
  /**
   * 新增时，模拟规格ID
   */
  mockSpecId?: number;
  /**
   * 多个规格值ID
   */
  specDetailIds?: number[];
  /**
   * 规格ID
   */
  specId?: number;
  /**
   * 规格名称
   */
  specName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«GoodsInfoDetailByGoodsInfoResponse»".
 */
export interface BaseResponseGoodsInfoDetailByGoodsInfoResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GoodsInfoDetailByGoodsInfoResponse;
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
export interface GoodsInfoDetailByGoodsInfoResponse {
  /**
   * 商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  goods?: GoodsVO4;
  /**
   * 商品客户价格列表
   */
  goodsCustomerPrices?: GoodsCustomerPriceVO[];
  goodsInfo?: GoodsInfoVO2;
  /**
   * 商品订货区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO2[];
  /**
   * 商品等级价格列表
   */
  goodsLevelPrices?: GoodsLevelPriceVO[];
  /**
   * 商品属性列表
   */
  goodsPropDetailRels?: GoodsPropDetailRelVO[];
  /**
   * 商品规格值列表
   */
  goodsSpecDetails?: GoodsSpecDetailVO2[];
  /**
   * 商品规格列表
   */
  goodsSpecs?: GoodsSpecVO2[];
  /**
   * 拼团活动
   */
  grouponFlag?: boolean;
  /**
   * 商品相关图片
   */
  images?: GoodsImageVO[];
  /**
   * 店铺Id
   */
  storeId?: number;
  /**
   * 店铺logo
   */
  storeLogo?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  [k: string]: any;
}
/**
 * 相关商品SPU信息
 */
export interface GoodsVO4 {
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
export interface GoodsCustomerPriceVO {
  /**
   * 起订量
   */
  count?: number;
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 客户价格ID
   */
  customerPriceId?: number;
  /**
   * 商品ID
   */
  goodsId?: string;
  /**
   * 商品ID
   */
  goodsInfoId?: string;
  /**
   * 限订量
   */
  maxCount?: number;
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
 * 商品SKU信息
 */
export interface GoodsInfoVO2 {
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
export interface GoodsIntervalPriceVO2 {
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
export interface GoodsLevelPriceVO {
  /**
   * 起订量
   */
  count?: number;
  /**
   * 商品编号
   */
  goodsId?: string;
  /**
   * 商品ID
   */
  goodsInfoId?: string;
  /**
   * 等级ID
   */
  levelId?: number;
  /**
   * 级别价格ID
   */
  levelPriceId?: number;
  /**
   * 限订量
   */
  maxCount?: number;
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
export interface GoodsPropDetailRelVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 属性值id
   */
  detailId?: number;
  /**
   * SPU标识
   */
  goodsId?: string;
  /**
   * 属性id
   */
  propId?: number;
  /**
   * 编号
   */
  relId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsSpecDetailVO2 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 规格值明称
   */
  detailName?: string;
  /**
   * 商品ID
   */
  goodsId?: string;
  /**
   * 新增时，规格值摸拟ID
   */
  mockSpecDetailId?: number;
  /**
   * 新增时，规格摸拟ID
   */
  mockSpecId?: number;
  /**
   * 规格明细ID
   */
  specDetailId?: number;
  /**
   * 规格ID
   */
  specId?: number;
  /**
   * 创建时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsSpecVO2 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 商品ID
   */
  goodsId?: string;
  /**
   * 新增时，模拟规格ID
   */
  mockSpecId?: number;
  /**
   * 多个规格值ID
   */
  specDetailIds?: number[];
  /**
   * 规格ID
   */
  specId?: number;
  /**
   * 规格名称
   */
  specName?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsImageVO {
  /**
   * 原图路径
   */
  artworkUrl?: string;
  /**
   * 大图路径
   */
  bigUrl?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 商品编号
   */
  goodsId?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 图片编号
   */
  imageId?: number;
  /**
   * 中图路径
   */
  middleUrl?: string;
  /**
   * 小图路径
   */
  thumbUrl?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsInfoDetailByGoodsInfoResponse".
 */
export interface GoodsInfoDetailByGoodsInfoResponse1 {
  /**
   * 商家类型
   * * NO: 否
   * * YES: 是
   */
  companyType?: 0 | 1;
  goods?: GoodsVO4;
  /**
   * 商品客户价格列表
   */
  goodsCustomerPrices?: GoodsCustomerPriceVO[];
  goodsInfo?: GoodsInfoVO2;
  /**
   * 商品订货区间价格列表
   */
  goodsIntervalPrices?: GoodsIntervalPriceVO2[];
  /**
   * 商品等级价格列表
   */
  goodsLevelPrices?: GoodsLevelPriceVO[];
  /**
   * 商品属性列表
   */
  goodsPropDetailRels?: GoodsPropDetailRelVO[];
  /**
   * 商品规格值列表
   */
  goodsSpecDetails?: GoodsSpecDetailVO2[];
  /**
   * 商品规格列表
   */
  goodsSpecs?: GoodsSpecVO2[];
  /**
   * 拼团活动
   */
  grouponFlag?: boolean;
  /**
   * 商品相关图片
   */
  images?: GoodsImageVO[];
  /**
   * 店铺Id
   */
  storeId?: number;
  /**
   * 店铺logo
   */
  storeLogo?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsCustomerPriceVO".
 */
export interface GoodsCustomerPriceVO1 {
  /**
   * 起订量
   */
  count?: number;
  /**
   * 客户ID
   */
  customerId?: string;
  /**
   * 客户价格ID
   */
  customerPriceId?: number;
  /**
   * 商品ID
   */
  goodsId?: string;
  /**
   * 商品ID
   */
  goodsInfoId?: string;
  /**
   * 限订量
   */
  maxCount?: number;
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
 * via the `definition` "GoodsLevelPriceVO".
 */
export interface GoodsLevelPriceVO1 {
  /**
   * 起订量
   */
  count?: number;
  /**
   * 商品编号
   */
  goodsId?: string;
  /**
   * 商品ID
   */
  goodsInfoId?: string;
  /**
   * 等级ID
   */
  levelId?: number;
  /**
   * 级别价格ID
   */
  levelPriceId?: number;
  /**
   * 限订量
   */
  maxCount?: number;
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
 * via the `definition` "GoodsPropDetailRelVO".
 */
export interface GoodsPropDetailRelVO1 {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 属性值id
   */
  detailId?: number;
  /**
   * SPU标识
   */
  goodsId?: string;
  /**
   * 属性id
   */
  propId?: number;
  /**
   * 编号
   */
  relId?: number;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsImageVO".
 */
export interface GoodsImageVO1 {
  /**
   * 原图路径
   */
  artworkUrl?: string;
  /**
   * 大图路径
   */
  bigUrl?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标记
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 商品编号
   */
  goodsId?: string;
  /**
   * SKU编号
   */
  goodsInfoId?: string;
  /**
   * 图片编号
   */
  imageId?: number;
  /**
   * 中图路径
   */
  middleUrl?: string;
  /**
   * 小图路径
   */
  thumbUrl?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  [k: string]: any;
}
export interface GoodsPropVO2 {
  /**
   * 分类Id
   */
  cateId?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 删除标识
   * * NO: 否
   * * YES: 是
   */
  delFlag?: 0 | 1;
  /**
   * 商品属性详情
   */
  goodsPropDetails?: GoodsPropDetailVO[];
  /**
   * 是否开启索引
   * * NO: 否
   * * YES: 是
   */
  indexFlag?: 0 | 1;
  /**
   * 商品属性详情字符串
   */
  propDetailStr?: string;
  /**
   * 属性Id
   */
  propId?: number;
  /**
   * 属性名称
   */
  propName?: string;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 修改时间
   */
  updateTime?: string;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddDistributorGoodsQueryRequestReq".
 */
export interface IAddDistributorGoodsQueryRequestReq {
  /**
   * 上下架状态
   */
  addedFlag?: number;
  /**
   * 聚合参数
   */
  aggs?: AbstractAggregationBuilder[];
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: number;
  /**
   * 批量品牌编号
   */
  brandIds?: number[];
  /**
   * 是否需要反查分类
   * * NO: 否
   * * YES: 是
   */
  cateAggFlag?: number;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 批量分类编号
   */
  cateIds?: number[];
  /**
   * 商家类型
   */
  companyType?: number;
  /**
   * 签约结束日期
   */
  contractEndDate?: string;
  /**
   * 签约开始日期
   */
  contractStartDate?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 客户等级折扣
   */
  customerLevelDiscount?: number;
  /**
   * 客户等级
   */
  customerLevelId?: number;
  /**
   * 删除标记
   */
  delFlag?: number;
  /**
   * 分销商品审核状态 0:普通商品 1:待审核 2:已审核通过 3:审核不通过 4:禁止分销
   */
  distributionGoodsAudit?: number;
  /**
   * 批量分销商品SKU编号
   */
  distributionGoodsInfoIds?: string[];
  /**
   * 分销商品状态，配合分销开关使用
   */
  distributionGoodsStatus?: number;
  /**
   * 未登录时,前端采购单缓存信息
   */
  esGoodsInfoDTOList?: EsGoodsInfoDTO[];
  /**
   * 排除分销商品
   */
  excludeDistributionGoods?: boolean;
  /**
   * 禁售状态
   */
  forbidStatus?: number;
  /**
   * 批量商品ID
   */
  goodsIds?: string[];
  /**
   * 批量SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 隐藏已选分销商品,false:不隐藏，true:隐藏
   */
  hideSelectedDistributionGoods?: boolean;
  /**
   * 关键字，可能含空格
   */
  keywords?: string;
  /**
   * 模糊条件-商品名称
   */
  likeGoodsName?: string;
  /**
   * 营销Id
   */
  marketingId?: number;
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
   * 多个 属性与对应的属性值id列表
   */
  propDetails?: EsPropQueryRequest[];
  queryGoods?: boolean;
  searchCriteria?: SearchQuery;
  sort?: Sort4;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 排序标识
   */
  sortFlag?: number;
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
   * 排序参数
   */
  sorts?: SortBuilder1[];
  /**
   * 精确查询-规格值参数
   */
  specs?: EsSpecQueryRequest[];
  /**
   * 库存状态
   */
  stockFlag?: number;
  /**
   * 批量店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 店铺状态
   * * OPENING: 0、开启
   * * CLOSED: 1、关店
   */
  storeState?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  whereCriteria?: QueryBuilder2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IShopSkuListQueryRequestReq".
 */
export interface IShopSkuListQueryRequestReq {
  /**
   * 上下架状态
   */
  addedFlag?: number;
  /**
   * 聚合参数
   */
  aggs?: AbstractAggregationBuilder[];
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: number;
  /**
   * 批量品牌编号
   */
  brandIds?: number[];
  /**
   * 是否需要反查分类
   * * NO: 否
   * * YES: 是
   */
  cateAggFlag?: number;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 批量分类编号
   */
  cateIds?: number[];
  /**
   * 商家类型
   */
  companyType?: number;
  /**
   * 签约结束日期
   */
  contractEndDate?: string;
  /**
   * 签约开始日期
   */
  contractStartDate?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 客户等级折扣
   */
  customerLevelDiscount?: number;
  /**
   * 客户等级
   */
  customerLevelId?: number;
  /**
   * 删除标记
   */
  delFlag?: number;
  /**
   * 分销商品审核状态 0:普通商品 1:待审核 2:已审核通过 3:审核不通过 4:禁止分销
   */
  distributionGoodsAudit?: number;
  /**
   * 批量分销商品SKU编号
   */
  distributionGoodsInfoIds?: string[];
  /**
   * 分销商品状态，配合分销开关使用
   */
  distributionGoodsStatus?: number;
  /**
   * 未登录时,前端采购单缓存信息
   */
  esGoodsInfoDTOList?: EsGoodsInfoDTO[];
  /**
   * 排除分销商品
   */
  excludeDistributionGoods?: boolean;
  /**
   * 禁售状态
   */
  forbidStatus?: number;
  /**
   * 批量商品ID
   */
  goodsIds?: string[];
  /**
   * 批量SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 隐藏已选分销商品,false:不隐藏，true:隐藏
   */
  hideSelectedDistributionGoods?: boolean;
  /**
   * 关键字，可能含空格
   */
  keywords?: string;
  /**
   * 模糊条件-商品名称
   */
  likeGoodsName?: string;
  /**
   * 营销Id
   */
  marketingId?: number;
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
   * 多个 属性与对应的属性值id列表
   */
  propDetails?: EsPropQueryRequest[];
  queryGoods?: boolean;
  searchCriteria?: SearchQuery;
  sort?: Sort4;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 排序标识
   */
  sortFlag?: number;
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
   * 排序参数
   */
  sorts?: SortBuilder1[];
  /**
   * 精确查询-规格值参数
   */
  specs?: EsSpecQueryRequest[];
  /**
   * 库存状态
   */
  stockFlag?: number;
  /**
   * 批量店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 店铺状态
   * * OPENING: 0、开启
   * * CLOSED: 1、关店
   */
  storeState?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  whereCriteria?: QueryBuilder2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IShopSkuListToCQueryRequestReq".
 */
export interface IShopSkuListToCQueryRequestReq {
  /**
   * 上下架状态
   */
  addedFlag?: number;
  /**
   * 聚合参数
   */
  aggs?: AbstractAggregationBuilder[];
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: number;
  /**
   * 批量品牌编号
   */
  brandIds?: number[];
  /**
   * 是否需要反查分类
   * * NO: 否
   * * YES: 是
   */
  cateAggFlag?: number;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 批量分类编号
   */
  cateIds?: number[];
  /**
   * 商家类型
   */
  companyType?: number;
  /**
   * 签约结束日期
   */
  contractEndDate?: string;
  /**
   * 签约开始日期
   */
  contractStartDate?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 客户等级折扣
   */
  customerLevelDiscount?: number;
  /**
   * 客户等级
   */
  customerLevelId?: number;
  /**
   * 删除标记
   */
  delFlag?: number;
  /**
   * 分销商品审核状态 0:普通商品 1:待审核 2:已审核通过 3:审核不通过 4:禁止分销
   */
  distributionGoodsAudit?: number;
  /**
   * 批量分销商品SKU编号
   */
  distributionGoodsInfoIds?: string[];
  /**
   * 分销商品状态，配合分销开关使用
   */
  distributionGoodsStatus?: number;
  /**
   * 未登录时,前端采购单缓存信息
   */
  esGoodsInfoDTOList?: EsGoodsInfoDTO[];
  /**
   * 排除分销商品
   */
  excludeDistributionGoods?: boolean;
  /**
   * 禁售状态
   */
  forbidStatus?: number;
  /**
   * 批量商品ID
   */
  goodsIds?: string[];
  /**
   * 批量SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 隐藏已选分销商品,false:不隐藏，true:隐藏
   */
  hideSelectedDistributionGoods?: boolean;
  /**
   * 关键字，可能含空格
   */
  keywords?: string;
  /**
   * 模糊条件-商品名称
   */
  likeGoodsName?: string;
  /**
   * 营销Id
   */
  marketingId?: number;
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
   * 多个 属性与对应的属性值id列表
   */
  propDetails?: EsPropQueryRequest[];
  queryGoods?: boolean;
  searchCriteria?: SearchQuery;
  sort?: Sort4;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 排序标识
   */
  sortFlag?: number;
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
   * 排序参数
   */
  sorts?: SortBuilder1[];
  /**
   * 精确查询-规格值参数
   */
  specs?: EsSpecQueryRequest[];
  /**
   * 库存状态
   */
  stockFlag?: number;
  /**
   * 批量店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 店铺状态
   * * OPENING: 0、开启
   * * CLOSED: 1、关店
   */
  storeState?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  whereCriteria?: QueryBuilder2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISkuListFrontQueryRequestReq".
 */
export interface ISkuListFrontQueryRequestReq {
  /**
   * 上下架状态
   */
  addedFlag?: number;
  /**
   * 聚合参数
   */
  aggs?: AbstractAggregationBuilder[];
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: number;
  /**
   * 批量品牌编号
   */
  brandIds?: number[];
  /**
   * 是否需要反查分类
   * * NO: 否
   * * YES: 是
   */
  cateAggFlag?: number;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 批量分类编号
   */
  cateIds?: number[];
  /**
   * 商家类型
   */
  companyType?: number;
  /**
   * 签约结束日期
   */
  contractEndDate?: string;
  /**
   * 签约开始日期
   */
  contractStartDate?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 客户等级折扣
   */
  customerLevelDiscount?: number;
  /**
   * 客户等级
   */
  customerLevelId?: number;
  /**
   * 删除标记
   */
  delFlag?: number;
  /**
   * 分销商品审核状态 0:普通商品 1:待审核 2:已审核通过 3:审核不通过 4:禁止分销
   */
  distributionGoodsAudit?: number;
  /**
   * 批量分销商品SKU编号
   */
  distributionGoodsInfoIds?: string[];
  /**
   * 分销商品状态，配合分销开关使用
   */
  distributionGoodsStatus?: number;
  /**
   * 未登录时,前端采购单缓存信息
   */
  esGoodsInfoDTOList?: EsGoodsInfoDTO[];
  /**
   * 排除分销商品
   */
  excludeDistributionGoods?: boolean;
  /**
   * 禁售状态
   */
  forbidStatus?: number;
  /**
   * 批量商品ID
   */
  goodsIds?: string[];
  /**
   * 批量SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 隐藏已选分销商品,false:不隐藏，true:隐藏
   */
  hideSelectedDistributionGoods?: boolean;
  /**
   * 关键字，可能含空格
   */
  keywords?: string;
  /**
   * 模糊条件-商品名称
   */
  likeGoodsName?: string;
  /**
   * 营销Id
   */
  marketingId?: number;
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
   * 多个 属性与对应的属性值id列表
   */
  propDetails?: EsPropQueryRequest[];
  queryGoods?: boolean;
  searchCriteria?: SearchQuery;
  sort?: Sort4;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 排序标识
   */
  sortFlag?: number;
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
   * 排序参数
   */
  sorts?: SortBuilder1[];
  /**
   * 精确查询-规格值参数
   */
  specs?: EsSpecQueryRequest[];
  /**
   * 库存状态
   */
  stockFlag?: number;
  /**
   * 批量店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 店铺状态
   * * OPENING: 0、开启
   * * CLOSED: 1、关店
   */
  storeState?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  whereCriteria?: QueryBuilder2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IListQueryRequestReq".
 */
export interface IListQueryRequestReq {
  /**
   * 上下架状态
   */
  addedFlag?: number;
  /**
   * 聚合参数
   */
  aggs?: AbstractAggregationBuilder[];
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: number;
  /**
   * 批量品牌编号
   */
  brandIds?: number[];
  /**
   * 是否需要反查分类
   * * NO: 否
   * * YES: 是
   */
  cateAggFlag?: number;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 批量分类编号
   */
  cateIds?: number[];
  /**
   * 商家类型
   */
  companyType?: number;
  /**
   * 签约结束日期
   */
  contractEndDate?: string;
  /**
   * 签约开始日期
   */
  contractStartDate?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 客户等级折扣
   */
  customerLevelDiscount?: number;
  /**
   * 客户等级
   */
  customerLevelId?: number;
  /**
   * 删除标记
   */
  delFlag?: number;
  /**
   * 分销商品审核状态 0:普通商品 1:待审核 2:已审核通过 3:审核不通过 4:禁止分销
   */
  distributionGoodsAudit?: number;
  /**
   * 批量分销商品SKU编号
   */
  distributionGoodsInfoIds?: string[];
  /**
   * 分销商品状态，配合分销开关使用
   */
  distributionGoodsStatus?: number;
  /**
   * 未登录时,前端采购单缓存信息
   */
  esGoodsInfoDTOList?: EsGoodsInfoDTO[];
  /**
   * 排除分销商品
   */
  excludeDistributionGoods?: boolean;
  /**
   * 禁售状态
   */
  forbidStatus?: number;
  /**
   * 批量商品ID
   */
  goodsIds?: string[];
  /**
   * 批量SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 隐藏已选分销商品,false:不隐藏，true:隐藏
   */
  hideSelectedDistributionGoods?: boolean;
  /**
   * 关键字，可能含空格
   */
  keywords?: string;
  /**
   * 模糊条件-商品名称
   */
  likeGoodsName?: string;
  /**
   * 营销Id
   */
  marketingId?: number;
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
   * 多个 属性与对应的属性值id列表
   */
  propDetails?: EsPropQueryRequest[];
  queryGoods?: boolean;
  searchCriteria?: SearchQuery;
  sort?: Sort4;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 排序标识
   */
  sortFlag?: number;
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
   * 排序参数
   */
  sorts?: SortBuilder1[];
  /**
   * 精确查询-规格值参数
   */
  specs?: EsSpecQueryRequest[];
  /**
   * 库存状态
   */
  stockFlag?: number;
  /**
   * 批量店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 店铺状态
   * * OPENING: 0、开启
   * * CLOSED: 1、关店
   */
  storeState?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  whereCriteria?: QueryBuilder2;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IUnLoginListQueryRequestReq".
 */
export interface IUnLoginListQueryRequestReq {
  /**
   * 上下架状态
   */
  addedFlag?: number;
  /**
   * 聚合参数
   */
  aggs?: AbstractAggregationBuilder[];
  /**
   * 审核状态
   * * WAIT_CHECK: 0：待审核
   * * CHECKED: 1：已审核
   * * NOT_PASS: 2：审核失败
   * * FORBADE: 3：禁售中
   */
  auditStatus?: number;
  /**
   * 批量品牌编号
   */
  brandIds?: number[];
  /**
   * 是否需要反查分类
   * * NO: 否
   * * YES: 是
   */
  cateAggFlag?: number;
  /**
   * 分类编号
   */
  cateId?: number;
  /**
   * 批量分类编号
   */
  cateIds?: number[];
  /**
   * 商家类型
   */
  companyType?: number;
  /**
   * 签约结束日期
   */
  contractEndDate?: string;
  /**
   * 签约开始日期
   */
  contractStartDate?: string;
  /**
   * 会员ID
   */
  customerId?: string;
  /**
   * 客户等级折扣
   */
  customerLevelDiscount?: number;
  /**
   * 客户等级
   */
  customerLevelId?: number;
  /**
   * 删除标记
   */
  delFlag?: number;
  /**
   * 分销商品审核状态 0:普通商品 1:待审核 2:已审核通过 3:审核不通过 4:禁止分销
   */
  distributionGoodsAudit?: number;
  /**
   * 批量分销商品SKU编号
   */
  distributionGoodsInfoIds?: string[];
  /**
   * 分销商品状态，配合分销开关使用
   */
  distributionGoodsStatus?: number;
  /**
   * 未登录时,前端采购单缓存信息
   */
  esGoodsInfoDTOList?: EsGoodsInfoDTO[];
  /**
   * 排除分销商品
   */
  excludeDistributionGoods?: boolean;
  /**
   * 禁售状态
   */
  forbidStatus?: number;
  /**
   * 批量商品ID
   */
  goodsIds?: string[];
  /**
   * 批量SKU编号
   */
  goodsInfoIds?: string[];
  /**
   * 隐藏已选分销商品,false:不隐藏，true:隐藏
   */
  hideSelectedDistributionGoods?: boolean;
  /**
   * 关键字，可能含空格
   */
  keywords?: string;
  /**
   * 模糊条件-商品名称
   */
  likeGoodsName?: string;
  /**
   * 营销Id
   */
  marketingId?: number;
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
   * 多个 属性与对应的属性值id列表
   */
  propDetails?: EsPropQueryRequest[];
  queryGoods?: boolean;
  searchCriteria?: SearchQuery;
  sort?: Sort4;
  /**
   * 排序字段
   */
  sortColumn?: string;
  /**
   * 排序标识
   */
  sortFlag?: number;
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
   * 排序参数
   */
  sorts?: SortBuilder1[];
  /**
   * 精确查询-规格值参数
   */
  specs?: EsSpecQueryRequest[];
  /**
   * 库存状态
   */
  stockFlag?: number;
  /**
   * 批量店铺分类编号
   */
  storeCateIds?: number[];
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 店铺状态
   * * OPENING: 0、开启
   * * CLOSED: 1、关店
   */
  storeState?: number;
  /**
   * 登录用户Id
   */
  userId?: string;
  whereCriteria?: QueryBuilder2;
  [k: string]: any;
}
