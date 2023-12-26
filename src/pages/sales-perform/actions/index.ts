import { Command } from '../constant';
import { Dispatch } from 'typings';
import { getActionProxy } from '@/redux/action-util';
import api from 'api';

import Action from './action';
import { IMainMonthItem } from '@/pages/sales-perform/types';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      // 1.查询销售业绩列表
      actions.action.querySalesList();

      // 2.拼接月份数据
      let date = new Date();
      let monthData = new Array();
      for (let i = 0; i < 6; i++) {
        date.setMonth(date.getMonth() - 1, 1);
        monthData.push(this._formateDate(date));
      }
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: ['main', 'monthData'],
          value: monthData
        }
      });

      // 3.查询销售业绩
      let rule = (await api.distributionSettingController.findOne())
        .distributionSettingSimVO.performanceDesc;
      dispatch({
        type: Command.commonChange,
        payload: { paths: ['main', 'rule'], value: rule }
      });
      dispatch({
        type: Command.commonChange,
        payload: { paths: ['main', 'isReady'], value: true }
      });
    },

    //格式化日期
    _formateDate(date) {
      const dateMap: IMainMonthItem = { value: null, year: null, month: null };
      if (date instanceof Date) {
        dateMap.value =
          date.getFullYear() + '年' + (date.getMonth() + 1) + '月';
        dateMap.year = date.getFullYear();
        dateMap.month = date.getMonth() + 1;
        return dateMap;
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
