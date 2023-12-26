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
      const result = await Promise.all([
        // 拼团广告
        api.grouponSettingController.findOne(),
        // 拼团分类
        api.grouponCateBaseController.findGrouponCateList(),
        // 热门推荐
        api.grouponCenterController.list({ pageNum: 0, pageSize: 15 })
      ]);

      // 拼团广告
      let adverts = '';
      let setting = result[0] ? result[0].grouponSettingVO : {};
      if (setting && setting.advert) {
        adverts = setting.advert;
      }

      const {grouponCateVOList} = result[1];
      dispatch({
        type: Command.init,
        payload: {
          main: {
            grouponAdvert: adverts,
            grouponCates: grouponCateVOList,
            grouponHotList: result[2].grouponCenterVOList.content,
            chooseCateId: grouponCateVOList[0].grouponCateId
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
