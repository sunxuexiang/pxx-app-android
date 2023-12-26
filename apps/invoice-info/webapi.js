/**
 * Created by feitingting on 2017/7/31.
 */
import Fetch from 'wmkit/fetch';
export const fetchInvoiceInfo = id => {
  return Fetch(`/trade/invoice/${id}/0`, {
    method: 'GET'
  });
};
