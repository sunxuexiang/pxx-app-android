import { Command } from '../constant';

import { Dispatch } from 'typings';
import { IAllReducerProps } from '../types';
import { getReducerData } from '@/redux/store';
import { msg } from 'plume2';
import api from 'api';
import { extraPathsValue } from '@/redux/util';
import * as WMkit from 'wmkit/kit';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments)
      });
    },

    /**
     * 团详情初始化
     */
    async init(grouponNo) {},

    /**
     * 规格弹框显示隐藏
     */
    async toggleSpecModal() {
      dispatch({
        type: Command.toggleSpecModal,
        payload: {}
      });
    },

    //打开规格弹框
    async openSpecModal(groupNo) {
      //存储团号，打开弹窗
      dispatch({
        type: Command.targetGroupNo,
        payload: groupNo
      });
      dispatch({
        type: Command.openSpecModal,
        payload: {}
      });
    },

    /**
     * 代成团显示隐藏
     */
    async toggleWaitGroupModal() {
      dispatch({
        type: Command.toggleWaitGroupModal,
        payload: {}
      });
    },

    /**
     * 查看成团人员弹框显示隐藏
     */
    async modalJoinGroup(grouponNo) {
      //存储团号,显示规格弹窗
      this.openSpecModal(grouponNo);
      //隐藏等待成团弹窗
      this.toggleWaitGroupModal();
    },

    /**
     * 参团人员弹框显示隐藏
     */
    async toggleJoinPeopleModal() {
      dispatch({
        type: Command.toggleJoinPeopleModal,
        payload: {}
      });
    },

    /**
     * 邀请参团弹框显示隐藏
     */
    async toggleGroupShareModal() {
      dispatch({
        type: Command.toggleGroupShareModal,
        payload: {}
      });
    }
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    activity: getReducerData('groupBuyDetailActivity'),

    goods: getReducerData('groupBuyDetailGoods'),

    notice: getReducerData('groupBuyDetailNotice'),

    otherGroup: getReducerData('groupBuyDetailOtherGroup')
  };
}
