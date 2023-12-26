import Store from '@/redux/store';
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
    async init(queryType: number) {
      //获取待评价数量
      const res = await Promise.all([
        api.goodsTobeEvaluateController.getGoodsTobeEvaluateNum(),
        api.storeTobeEvaluateController.getStoreTobeEvaluateNum(),
        api.goodsEvaluateController.getGoodsEvaluateNum(),
      ]);
      dispatch({
        type: Command.init,
        payload: {
          main: {
            queryGoodsTobeEvaluateNum: res[0],
            queryStoreTobeEvaluateNum: res[1],
            evaluateNum: res[2],
            queryType: queryType ? queryType : 0
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
