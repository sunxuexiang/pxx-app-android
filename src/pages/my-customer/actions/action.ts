import { Command } from '../constant';
import { Dispatch } from 'typings';
import { Tabs } from '../types';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange
        // payload: extraPathsValue(...arguments)
      });
    },

    /**
     * 切换tab
     * @param tab
     */
    async changeTab(tab: Tabs) {
      dispatch({
        type: Command.changeTab,
        payload: {
          main: {
            tab
          }
        }
      });
    },
    /**
     * 列表回调
     * @param tab
     */
    async fetchFriends(res: any) {
      // 邀请人数
      let totalNum = 0;
      if (res.context) {
        if (res.context.totalElements) {
          totalNum = res.context.totalElements;
        }
      }
      dispatch({
        type: Command.changeTotalNum,
        payload: {
          main: {
            totalNum
          }
        }
      });
    }
  };
  return action;
};
