import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps, RuleTab} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    /**
     * 切换tab
     * @param tab
     */
    async changeTab(tab: RuleTab) {
      let res = await api.distributionCustomerRankingController.getRanking({
        type: tab
      });
      dispatch({
        type: Command.changeTab,
        payload: {
          main: {
            ranks: res.rankingVOList,
            myRank: res.distributionCustomerRankingVO,
            tab
          }
        }
      });
    },
  };
  return action;
};

