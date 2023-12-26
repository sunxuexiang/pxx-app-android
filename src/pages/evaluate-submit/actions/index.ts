import { Command } from '../constant';
import { Dispatch } from 'typings';
import { getActionProxy } from '@/redux/action-util';
import api from 'api';

import Action from './action';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(goodInfo, queryType) {
      const param = {
        skuId: goodInfo.skuId,
        storeId: goodInfo.storeId,
        tid: goodInfo.tid
      };
      const baseInfo = await api.goodsEvaluateController.getGoodsAndStore(
        param
      );
      let evaluateDetail;
      //评价详情获取
      if (queryType == 2) {
        evaluateDetail = await api.goodsEvaluateController.evaluateInfo(param);
      }
      // debugger;
      dispatch({
        type: Command.init,
        payload: {
          main: {
            baseInfo: baseInfo ? baseInfo : {},
            evaluateType: 'goodsEvaluate',
            evaluateDetail: evaluateDetail ? evaluateDetail : {},
            queryType: queryType
          }
        }
      });
    },

    /**
     * 重置
     */
    async clean() {
      dispatch({ type: Command.clean });
    }
  };

  return { actions };
};
