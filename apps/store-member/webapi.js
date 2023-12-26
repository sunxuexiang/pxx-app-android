/**
 * Created by chenpeng on 2017/12/20.
 */
import * as WMkit from 'wmkit/kit';
import Fetch from 'wmkit/fetch';

/**
 * 店铺的会员等级与折扣信息
 * @returns {IAsyncResult}
 */
export const storeMember = (storeId) => {
  return WMkit.isLoginOrNotOpen()
    ? Fetch('/store/storeVip', {
        method: 'POST',
        body: JSON.stringify({
          storeId
        })
      })
    : Fetch('/store/storeVipFront', {
        method: 'POST',
        body: JSON.stringify({
          storeId
        })
      });
};
