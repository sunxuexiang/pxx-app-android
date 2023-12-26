import { msg } from 'plume2';
import { Command } from '../constant';
import { Dispatch } from 'typings';
import api from 'api';
import * as WMkit from 'wmkit/kit';

export default (dispatch: Dispatch) => {
  const actions = {
    /**
     * 初始化数据
     */
    async init() {
      //如果当前已经为分销员跳转分销中心
      if (WMkit.isDistributor()) {
        msg.emit('router: goToNext', {
          routeName: 'DistributionCenter'
        });
        return;
      }

      const result = await Promise.all([
        // 分销员基本数据
        api.customerBaseController.findCustomerCenterInfo(),
        // 分销员余额信息
        api.customerFundsController.statistics(),
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
            // 邀请人信息
            inviteInfo: result[2].distributionCustomerSimVO,
            distributeSetting: result[2].distributionSettingSimVO,
            inviteCustomer: result[3],
            hotGoodsList: result[4].esGoodsInfoPage.content,
            noticeNum: result[5].noticeNum,
            preferentialNum: result[5].preferentialNum
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
