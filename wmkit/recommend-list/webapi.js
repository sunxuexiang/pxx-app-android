import Fetch from '../fetch'

/**
 * 获取为你推荐商品列表
 */

 export const getRecommendList = () => {
    return Fetch('/goods/recommend/setting/get-setting', {
       method: 'GET'
    })
 };