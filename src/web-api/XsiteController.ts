import * as sdk from './fetch';

import isMock from './mock-util';
const controllerName = 'XsiteController';

/**
 *
 * 魔方分页显示商品
 *
 */
async function skuList(request: ISkuListRequestReq): Promise<unknown> {
  if (__DEV__) {
    if (isMock('XsiteController', 'skuList')) {
      return Promise.resolve(
        require('./mock/XsiteController.json').unknown || {},
      );
    }
  }

  let result = await sdk.post<unknown>(
    '/xsite/skusForXsite',

    {
      ...request,
    },
  );
  return result.context;
}

export default {
  skuList,
};

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsInfoRequest".
 */
export interface GoodsInfoRequest {
  /**
   * 分类名称
   */
  catName?: number;
  /**
   * 第几页
   */
  pageNum?: number;
  /**
   * 每页几条
   */
  pageSize?: number;
  /**
   * 查询条件
   */
  q?: string;
  /**
   * 类型
   */
  type?: number;
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export interface Undefined {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISkuListRequestReq".
 */
export interface ISkuListRequestReq {
  /**
   * 分类名称
   */
  catName?: number;
  /**
   * 第几页
   */
  pageNum?: number;
  /**
   * 每页几条
   */
  pageSize?: number;
  /**
   * 查询条件
   */
  q?: string;
  /**
   * 类型
   */
  type?: number;
  [k: string]: any;
}
