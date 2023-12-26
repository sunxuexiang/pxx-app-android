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
      const res = await api.distributionController.queryDistributorInfoByCustomerId();
      let {
        noticeNum,
        preferentialNum
      } = await api.messageController.page({ pageNum: 0, pageSize: 10 });

      dispatch({
        type: Command.init,
        payload: {
          main: {
            customer: res.distributionCustomerVO,
            noticeNum: noticeNum,
            preferentialNum: preferentialNum,
          }
        }
      });
    },

    /**
     * 重置
     */
    async clean() {
      dispatch({ type: Command.clean });
    },

    async dealData(result) {
      const { code, context, message } = result;
      if (context && code == 'K-000000') {
        dispatch({
          type: Command.commonChange,
          payload: { key: 'toRefresh', value: true }
        });
      } else {
        // Alert({
        //   message: message
        // });
      }
    }
  };

  return { actions };
};
