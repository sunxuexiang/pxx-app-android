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
    async init() {
      // 拼团分类
      let result = await api.grouponCateBaseController.findGrouponCateList();

      dispatch({
        type: Command.init,
        payload: {
          main: {
            grouponCates: result.grouponCateVOList,
            chooseCateId: result.grouponCateVOList[0].grouponCateId 
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
