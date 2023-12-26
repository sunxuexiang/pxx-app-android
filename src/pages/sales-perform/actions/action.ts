import { Command } from '../constant';
import { Dispatch } from 'typings';
import { IAllReducerProps, IMainSaleData } from '../types';
import { getReducerData } from '@/redux/store';
import api from 'api';
import { extraPathsValue } from '@/redux/util';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments)
      });
    },

    /**
     * 改变规则状态
     */
    async changeRuleFlag() {},

    /**
     * 查询销售业绩列表
     */
    async querySalesList() {
      const {
        main: { salesTab, dateTab, month }
      } = getData();

      dispatch({
        type: Command.commonChange,
        payload: { paths: ['main', 'isReady'], value: false }
      });

      let distributionId = (await api.distributionController.queryDistributorInfoByCustomerId())
        .distributionCustomerVO.distributionId;

      let saleData: IMainSaleData;

      if (salesTab === 'day') {
        // 日销售业绩
        saleData = await api.distributionPerformanceController.queryByDay({
          distributionId,
          dateCycleEnum: month ? '2' : dateTab,
          month: month && month.month,
          year: month && month.year
        });
      } else if (salesTab === 'month') {
        // 月销售业绩
        saleData = await api.distributionPerformanceController.queryByLast6Months(
          {
            distributionId
          }
        );
      }
      dispatch({
        type: Command.changeSalesList,
        payload: {
          main: {
            saleData
          }
        }
      });

      dispatch({
        type: Command.commonChange,
        payload: { paths: ['main', 'isReady'], value: true }
      });
    }
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('salesPerformMain')
  };
}
