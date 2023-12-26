import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';

import Action from './action';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      let {pushCustomerEnableVO} = await api.umengConfigController.getConfigDetail();
      dispatch({
        type: Command.init,
        payload: {
          main:{
            pushState: pushCustomerEnableVO
            // isShow: pushCustomerEnableVO.enableStatus === 1,
            // initShow: pushCustomerEnableVO.enableStatus === 1,
          },
        },
      });

      // this.action.commonChange('main.isShow', pushCustomerEnableVO.enableStatus === 1);
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
