import { Command } from '../constant';
import { Dispatch } from 'typings';
import { getActionProxy } from '@/redux/action-util';

import Action from './action';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(goods) {
      dispatch({
        type: Command.init,
        payload: {
          main: {
            bigImgList: [],
            zanGoodsEvaluateList: [],
            cancelZanGoodsEvaluateList: []
          }
        }
      });
      await actions.action.commonChange('main.goodsId', goods);
      await actions.action.checkIEP();
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
