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
      // 客户基本数据
      const result = await api.customerBaseController.findCustomerCenterInfo();
      dispatch({
        type: Command.init,
        payload: {
          main: {
            customerInfo: result
          }
        }
      });
    },
    /**
     * 热门兑换列表
     */
    async getCenterData() {
      const result = await Promise.all([
        api.pointsMallController.hotExchange({ pageSize: 10 }),
        api.pointsMallController.getCateList()
      ]);

      dispatch({
        type: Command.init,
        payload: {
          main: {
            hotExchange: result[0].pointsGoodsVOPage.content,
            cateList: result[1].pointsGoodsCateVOList
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
