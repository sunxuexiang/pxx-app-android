import Fetch from '../fetch';

/**
 * 获取为你推荐商品列表
 */

 export const doInitAddressList = () => {
    return Fetch('/customer/addressList', {
       method: 'GET'
    });
 };