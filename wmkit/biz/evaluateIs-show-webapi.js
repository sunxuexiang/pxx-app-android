import Fetch from 'wmkit/fetch';
import { config } from 'wmkit/config';

import { fromJS } from 'immutable';

/**
 * 获取商品评价是否开启
 */
export const isShow = async () => {
  const res = await Fetch('/systemGoodsEvaluateConfig/isGoodsEvaluate');
  if (res.code == config.SUCCESS_CODE) {
    const r = fromJS(res.context);
    return r.get('evaluate');
  }
  return false;
};
