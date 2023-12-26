import Fetch from 'wmkit/fetch';

/**
 * 获取用户的搜索历史
 * @returns {Promise<Result<any>>}
 */
export const getHistory = () => {
  return Fetch('/goods/history', {
    method: 'GET'
  });
};

/**
 * 获取热搜列表
 * @returns {Promise<Result<any>>}
 */
export const getHotSearchList=()=>{
 return Fetch( '/popular_search_terms/list',{
   method:'POST'
  }
  );
}
/**
 * 添加一条搜索历史
 * @param queryString
 * @returns {Promise<Result<any>>}
 */
export const addHistory = (queryString) => {
  return Fetch('/goods/history', {
    method: 'POST',
    body: JSON.stringify({ keyword: queryString })
  });
};

/**
 * 清空搜索历史
 * @returns {Promise<Result<any>>}
 */
export const clearHistory = () => {
  return Fetch('/goods/history', {
    method: 'DELETE'
  });
};

/**
 * 获取 店铺 搜索历史
 */
export const getStoreHistory = () => {
  return Fetch('/store/history', {
    method: 'GET'
  });
};

/**
 * 添加一条 店铺 搜索历史
 */
export const addStoreHistory = (queryString) => {
  return Fetch('/store/history', {
    method: 'POST',
    body: JSON.stringify({ keyword: queryString })
  });
};

/**
 * 清空 店铺 搜索历史
 */
export const clearStoreHistory = () => {
  return Fetch('/store/history', {
    method: 'DELETE'
  });
};

/**
 * 获取 分销员选品 搜索历史
 */
export const getDistributeHistory = () => {
  return Fetch('/goods/distribute/history', {
    method: 'GET'
  });
};

/**
 * 获取 拼团商品 搜索历史
 */
export const getGrouponHistory = () => {
  return Fetch('/goods/groupon/history', {
    method: 'GET'
  });
};

/**
 * 获取 分销推广商品 搜索历史
 */
export const getDistributeGoodsHistory = () => {
  return Fetch('/goods/distribute-goods/history', {
    method: 'GET'
  });
};

/**
 * 添加一条 分销员选品 搜索历史
 */
export const addDistributeHistory = (queryString) => {
  return Fetch('/goods/distribute/history', {
    method: 'POST',
    body: JSON.stringify({ keyword: queryString })
  });
};

/**
 * 添加一条 拼团商品 搜索历史
 */
export const addGrouponHistory = (queryString) => {
  return Fetch('/goods/groupon/history', {
    method: 'POST',
    body: JSON.stringify({ keyword: queryString })
  });
};

/**
 * 添加一条 分销推广商品 搜索历史
 */
export const addDistributeGoodsHistory = (queryString) => {
  return Fetch('/goods/distribute-goods/history', {
    method: 'POST',
    body: JSON.stringify({ keyword: queryString })
  });
};

/**
 * 清空 分销员选品 搜索历史
 */
export const clearDistributeHistory = () => {
  return Fetch('/goods/distribute/history', {
    method: 'DELETE'
  });
};

/**
 * 清空 拼团商品 搜索历史
 */
export const clearGrouponHistory = () => {
  return Fetch('/goods/groupon/history', {
    method: 'DELETE'
  });
};

/**
 * 清空 分销推广商品 搜索历史
 */
export const clearDistributeGoodsHistory = () => {
  return Fetch('/goods/distribute-goods/history', {
    method: 'DELETE'
  });
};


/**
 *
 * 
 * 预置词
 * getPresetSearchTerms
 *
 */
export const getPresetSearchTerms = () => {
  return Fetch('/preset_search_terms/list',{
    method: 'POST'
  })
}
/**
 *
 * 
 * 联想
 * likeAssociationalWord
 *  @param queryString
 *  @returns {Promise<Result<any>>}
 */
export const likeAssociationalWord= (queryString) =>{
  return Fetch('/search_associational_word/like_associational_word',{
    method: 'POST',
    body: JSON.stringify(queryString)
  })
}
