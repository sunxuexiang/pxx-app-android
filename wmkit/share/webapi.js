import Fetch from 'wmkit/fetch';

/**
 * 分享商品增加成长值及积分
 */
export const shareGoods = () => {
  return Fetch('/customer/points/share', {
    method: 'POST'
  });
};
