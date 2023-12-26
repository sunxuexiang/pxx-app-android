import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import moment from 'moment';
import { Const } from 'wmkit/const';

import Action from './action';
import * as WMkit from 'wmkit/kit';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      const isDistributor = WMkit.isDistributor();

      // 最近一周
      let start = moment()
        .subtract(7, 'days')
        .format(Const.DATE_FORMAT);
      let end = moment()
        .subtract(1, 'days')
        .format(Const.DATE_FORMAT);

      dispatch({
        type: Command.init,
        payload: {
          main: {
            range: `${start}~${end}`,
            isDistributor
          },
        },
      });
      await this.action.changeTab('inviteCount');
    },

    /**
     * 重置
     */
    async clean() {
      dispatch({type: Command.clean});
    },
  };

  return {actions};
};
