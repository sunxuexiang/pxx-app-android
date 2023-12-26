import { Command } from '../constant';
import { Dispatch } from 'typings';
import { getActionProxy } from '@/redux/action-util';
import Action from './action';
import api from 'api';
import { msg } from 'plume2';
import moment from 'moment';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),
    /**
     * 初始化数据
     */
    async init() {
      let { flashSaleCateVOList } = await api.flashSaleController.cateList();
      let newList = flashSaleCateVOList;
      // for (let i = 0, len = flashSaleCateVOList.length; i < len; i += 8) {
      //   //8个以下 为一个轮播图的数组
      //   newList.push(flashSaleCateVOList.slice(i, i + 8));
      // }
      let {
        flashSaleActivityVOList,
        recentDate,
        recentTime
      } = await api.flashSaleController.sceneList();

      //找到当前是第几个
      let index = -1;
      if (flashSaleActivityVOList && flashSaleActivityVOList.length > 0) {
        index = flashSaleActivityVOList.findIndex((item) => {
          return (
            item.activityDate == recentDate && item.activityTime == recentTime
          );
        });
      }
      console.warn(flashSaleActivityVOList,index)
      let activityStatus = null;
      let sceneAry = [],checkedSceneIndex = 0;
      if (flashSaleActivityVOList.length > 0) {
        activityStatus = flashSaleActivityVOList[index].status;
        let endList = flashSaleActivityVOList.filter((item) => item.status == '已结束');
        let begList = flashSaleActivityVOList.filter((item) => item.status == '已开抢');
        let ingList = flashSaleActivityVOList.filter((item) => item.status == '正在抢购');
        let willBegList = flashSaleActivityVOList.filter((item) => item.status == '即将开始');
        let tomorrowList = flashSaleActivityVOList.filter((item) => item.status == '次日预告');
        let withoutEndBuy = flashSaleActivityVOList.filter(
          (item) => item.status != '已结束' && item.status != '已开抢',
        );
        let filterList = []
          .concat(endList.length > 0 ? endList[endList.length - 1] : [])
          .concat(begList.length > 0 ? begList[begList.length - 1] : [])
          .concat(withoutEndBuy);
        let sortTimeAry = filterList.sort((n1, n2) => {
          return moment(n1.activityFullTime).unix() - moment(n2.activityFullTime).unix();
        });
        checkedSceneIndex = sortTimeAry.findIndex(
          (item) => recentDate == item.activityDate && recentTime == item.activityTime,
        );
        if (begList.length + ingList.length == 0 && willBegList.length > 0) {
          checkedSceneIndex = sortTimeAry.findIndex((item) => '即将开始' == item.status);
        } else if (begList.length + ingList.length + willBegList.length == 0 && tomorrowList.length > 0) {
          checkedSceneIndex = sortTimeAry.findIndex((item) => '次日预告' == item.status);
        }
        let beforeCheckedScene = sortTimeAry.slice(0, checkedSceneIndex);
        let afterCheckedScene = sortTimeAry.slice(checkedSceneIndex);
        while (afterCheckedScene.length < 5) {
          afterCheckedScene.push({activityTime: '', status: ''});
        }
        sceneAry = beforeCheckedScene.concat(afterCheckedScene);
      }
      console.warn(sceneAry)

      dispatch({
        type: Command.init,
        payload: {
          main: {
            cateList: newList,
            sceneList: sceneAry,
            activityDate: recentDate,
            activityTime: recentTime,
            presentScene: checkedSceneIndex,
            activityStatus:
              index > -1 ? flashSaleActivityVOList[index].status : '',
          }
        }
      });
    },

    /**
     * 重置
     */
    async clean() {
      dispatch({ type: Command.clean });
    },

    /**
     * 选择分类
     * @param cateId
     */
    async changeCate(cateId) {
      dispatch({
        type: Command.init,
        payload: {
          main: {
            cateId: cateId
          }
        }
      });
    },

    /**
     * 选择分类
     * @param cateId
     */
    async cleanCate() {
      dispatch({
        type: Command.init,
        payload: {
          main: {
            cateId: null
          }
        }
      });
    },

    /**
     * 选择秒杀活动
     * @param activityDate
     * @param activityTime
     * @param status
     */
    async changeActivity(activityDate, activityTime, status) {
      dispatch({
        type: Command.init,
        payload: {
          main: {
            activityDate: activityDate,
            activityTime: activityTime,
            activityStatus: status,
            cateId: null
          }
        }
      });
    },

    /**
     * 选择抢购日期
     * @param activityTime
     */
    async changeActivityDate(activityDate) {
      dispatch({
        type: Command.init,
        payload: {
          main: {
            activityDate: activityDate
          }
        }
      });
    },

    /**
     * 选择抢购时间
     * @param activityTime
     */
    async changeActivityTime(activityTime) {
      dispatch({
        type: Command.init,
        payload: {
          main: {
            activityTime: activityTime
          }
        }
      });
    },

    /**
     * 活动状态
     * @param status
     */
    async changeStatus(status) {
      dispatch({
        type: Command.init,
        payload: {
          main: {
            activityStatus: status
          }
        }
      });
    }
  };

  return { actions };
};
