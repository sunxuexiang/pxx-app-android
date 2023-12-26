import {Command} from '../constant';
import {Dispatch} from 'typings';
import api from 'api';

export default (dispatch: Dispatch) => {
  const actions = {
    /**
     * 初始化数据
     */
    async init() {
      let res = await api.distributionController.getSettingAndInvitor();
      dispatch({
        type: Command.init,
        payload: {
          main  :{
            rule :res.distributionSettingSimVO.distributorLevelDesc
          },
        },
      });
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
