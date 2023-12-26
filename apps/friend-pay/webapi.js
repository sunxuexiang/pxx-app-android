import { Fetch } from 'wmkit';

// 单个订单 tid 查询 GET /trade/${tid}
export const getFriendPayDataByTid = (tid) => {
    return Fetch(`/trade/${tid}`);
};

// 多个订单 parentId 查询 GET /trade/get/${parentId} 
export const getFriendPayDataByParentId = (parentId) => {
    return Fetch(`/trade/get/${parentId}`)
}