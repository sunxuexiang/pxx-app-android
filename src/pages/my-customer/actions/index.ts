import { Command } from '../constant';
import { Dispatch } from 'typings';
import { getActionProxy } from '@/redux/action-util';
import * as WMkit from 'wmkit/kit';
import Action from './action';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(id) {
      const isDistributor = WMkit.isDistributor();
      dispatch({
        type: Command.init,
        payload: {
          main: {
            isDistributor
          }
        }
      });
      if (id) {
        await this.action.changeTab(id);
      }
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
