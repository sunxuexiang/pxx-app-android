import * as sdk from './fetch';

import isMock from  './mock-util';
const controllerName = "GoodsBrandBaseController"



/**
 *
 * 条件查询商品品牌列表
 *
 */
async function list(
    
        brandIds:IListBrandIdsReq,
    
        brandName:IListBrandNameReq,
    
        delFlag:IListDelFlagReq,
    
        keywords:IListKeywordsReq,
    
        likeBrandName:IListLikeBrandNameReq,
    
        likeNickName:IListLikeNickNameReq,
    
        likePinYin:IListLikePinYinReq,
    
        nickName:IListNickNameReq,
    
        notBrandId:IListNotBrandIdReq,
    
        sort.sorted:IListSortSortedReq,
    
        sort.unsorted:IListSortUnsortedReq,
    
):Promise< GoodsBrandVOArray > {

  if(__DEV__){
    if(isMock("GoodsBrandBaseController","list")){
      return Promise.resolve(require('./mock/GoodsBrandBaseController.json').GoodsBrandVOArray||{});
    }
  }

  let result = await sdk.get <GoodsBrandVOArray>(
  "/goods/allGoodsBrands"
    
           
    
           
    
           
    
           
    
           
    
           
    
           
    
           
    
           
    
           
    
           
    

  , {
      
       
          ...brandIds,
        

      
       
          brandName,
        

      
       
          delFlag,
        

      
       
          keywords,
        

      
       
          likeBrandName,
        

      
       
          likeNickName,
        

      
       
          likePinYin,
        

      
       
          nickName,
        

      
       
          notBrandId,
        

      
       
          ...sort.sorted,
        

      
       
          ...sort.unsorted,
        

      
  });
  return  result.context;
}


/**
 *
 * 根据商品品牌id查询商品品牌信息
 *
 */
async function list(
    
        brandId:IListBrandIdReq,
    
):Promise< GoodsBrandByIdResponse > {

  if(__DEV__){
    if(isMock("GoodsBrandBaseController","list")){
      return Promise.resolve(require('./mock/GoodsBrandBaseController.json').GoodsBrandByIdResponse||{});
    }
  }

  let result = await sdk.get <GoodsBrandByIdResponse>(
  "/goods/goodsBrand/{brandId}"
    
           
           .replace("{brandId}",brandId+"")
            
    

  , {
      
       

      
  });
  return  result.context;
}



export default {

    list,

    list,

};



/**
 * 内容
 */
export type GoodsBrandVOArray = GoodsBrandVO[];
/**
 * 批量品牌编号
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IListBrandIdsReq".
 */
export type IListBrandIdsReq = number[];
/**
 * and 精准查询，品牌名称
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IListBrandNameReq".
 */
export type IListBrandNameReq = string;
/**
 * 删除标记
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IListDelFlagReq".
 */
export type IListDelFlagReq = number;
/**
 * 品牌编号
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IListKeywordsReq".
 */
export type IListKeywordsReq = string;
/**
 * and 模糊查询，品牌名称
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IListLikeBrandNameReq".
 */
export type IListLikeBrandNameReq = string;
/**
 * and 模糊查询，品牌昵称
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IListLikeNickNameReq".
 */
export type IListLikeNickNameReq = string;
/**
 * 模糊查询，品牌拼音
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IListLikePinYinReq".
 */
export type IListLikePinYinReq = string;
/**
 * and 精准查询，品牌昵称
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IListNickNameReq".
 */
export type IListNickNameReq = string;
/**
 * 品牌编号
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IListNotBrandIdReq".
 */
export type IListNotBrandIdReq = number;
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IListSortSortedReq".
 */
export type IListSortSortedReq = boolean;
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IListSortUnsortedReq".
 */
export type IListSortUnsortedReq = boolean;
/**
 * 内容
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "GoodsBrandVOArray".
 */
export type GoodsBrandVOArray1 = GoodsBrandVO2[];
/**
 * 商品品牌id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IListBrandIdReq".
 */
export type IListBrandIdReq = number;

export interface IgnoreType {
  [k: string]: any;
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "BaseResponse«List«GoodsBrandVO»»".
 */
export interface BaseResponseListGoodsBrandVO {
  /**
   * 结果码
   */
  code: string;
  context?: GoodsBrandVOArray;
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
 * via the `definition` "BaseResponse«GoodsBrandByIdResponse»".
 */
export interface BaseResponseGoodsBrandByIdResponse {
  /**
   * 结果码
   */
  code: string;
  context?: GoodsBrandByIdResponse;
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
export interface GoodsBrandByIdResponse {
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
 * via the `definition` "GoodsBrandByIdResponse".
 */
export interface GoodsBrandByIdResponse1 {
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
export interface GoodsBrandVO2 {
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
