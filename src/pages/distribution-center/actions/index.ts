import { Command } from '../constant';
import { Dispatch } from 'typings';
import { getActionProxy } from '@/redux/action-util';
// import moment from 'moment';
import api from 'api';

import Action from './action';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      let res = await api.distributionController.queryDistributorInfoByCustomerId();
      dispatch({
        type: Command.init,
        payload: {
          main: {
            distributor: res.distributionCustomerVO
          }
        }
      });

      // let newDate = moment().subtract(1, 'month');
      // 分销员ID
      let distributionId = res.distributionCustomerVO.distributionId;

      const result = await Promise.all([
        // 分销员基本数据
        api.customerBaseController.findCustomerCenterInfo(),
        // 分销员余额信息
        api.customerFundsController.statistics(),
        // 分销员昨天销售业绩
        api.distributionPerformanceController.queryYesterday({
          distributionId: distributionId
        }),
        // 分销员本月销售业绩
        // api.distributionPerformanceController.queryByDay({
        //   distributionId: distributionId,
        //   dateCycleEnum: '2',
        //   year: newDate.year(),
        //   month: newDate.month() + 1
        // }),
        api.distributionPerformanceController.summaryPerformanceCurrentMonth(),
        // 邀请人信息 + 分销设置信息
        api.distributionController.getSettingAndInvitor(),
        // 我的客户 - 邀新人数
        api.inviteCustomerRecordController.countInviteCustomer(),
        // 热销前十分销商品
        api.goodsInfoBaseController.addDistributorGoods({
          pageNum: 0,
          pageSize: 10,
          sortFlag: 0
        }),
        api.messageController.page({ pageNum: 0, pageSize: 10 })
      ]);

      dispatch({
        type: Command.init,
        payload: {
          main: {
            customerInfo: result[0],
            customerBalance: result[1],
            yesterdayPerformance: result[2].performanceByDayVO,
            monthPerformance: result[3].dataList[0],
            // 邀请人信息
            inviteInfo: result[4].distributionCustomerSimVO,
            distributeSetting: result[4].distributionSettingSimVO,
            inviteCustomer: result[5],
            hotGoodsList: result[6].esGoodsInfoPage.content,
            noticeNum: result[7].noticeNum,
            preferentialNum: result[7].preferentialNum
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
