/**
 * Created by chenpeng on 2017/7/5.
 */
import Fetch from 'wmkit/fetch';

/**
 * 在线支付是否开启
 * @returns {Promise<Result<any>>}
 */
export const fetchOnlinePayStatus = () => {
  return Fetch('/pay/gateway/isopen/APP', {
    method: 'GET'
  });
};
