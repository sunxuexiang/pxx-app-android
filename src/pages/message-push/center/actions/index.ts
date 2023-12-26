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
    async init() {
      let {
        noticeNum,
        preferentialNum
      } = await api.messageController.page({ pageNum: 0, pageSize: 10 });
      dispatch({
        type: Command.init,
        payload: {
          main: {
            noticeNum: noticeNum,
            preferentialNum: preferentialNum
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
