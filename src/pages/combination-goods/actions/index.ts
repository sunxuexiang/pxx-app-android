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
    async init(skuId) {
      let combinationList = await api.marketingController.getMoreSuitsInfo({
        goodsInfoId: skuId,
      });
      dispatch({
        type: Command.init,
        payload: {
          main: {
            combinationList: combinationList.marketingMoreGoodsInfoResponseList,
            currId: combinationList.marketingMoreGoodsInfoResponseList[0].marketingSuitsGoodsInfoDetailVO.marketingId
          },
        },
      });
      actions.action.changeCheck(combinationList.marketingMoreGoodsInfoResponseList[0].marketingSuitsGoodsInfoDetailVO.marketingId);
    },

    /**
     * 重置
     */
    async clean() {
      dispatch({ type: Command.clean });
    },
  };

  return { actions };
};
