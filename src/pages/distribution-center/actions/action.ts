import { Command } from '../constant';
import { Dispatch } from 'typings';
import { IAllReducerProps } from '../types';
import { getReducerData } from '@/redux/store';
import { extraPathsValue } from '@/redux/util';
import { msg } from 'plume2';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments)
      });
    },
    /**
     * 分销员禁用时弹窗
     * @param {string} forbidReason
     */
    shopClosedTip(forbidReason: string) {
      msg.emit('store-forbid:visible', {
        visible: true,
        reason: forbidReason
      });
    },

    async saveCheckedSku(goodsInfo) {
      dispatch({
        type: Command.saveCheckedSku,
        payload: goodsInfo
      });
    },

    async changeAddSelfShop() {
      dispatch({
        type: Command.changeAddSelfShop,
        payload: {}
      });
    },

    async setAddSelfShop() {
      dispatch({
        type: Command.setAddSelfShop,
        payload: true
      });
    },

    async toggleGoodsShare(result: boolean, bottomVisible: boolean) {
      //触发打开弹窗，底部tab隐藏,否则展开
      msg.emit('app:bottomVisible', {
        key: 'DistributionCenter',
        visible: bottomVisible
      });
      dispatch({
        type: Command.toggleGoodsShare,
        payload: result
      });
    },

    async toggleImgShare(result: boolean, bottomVisible: boolean) {
      //隐藏底部tab
      msg.emit('app:bottomVisible', {
        key: 'DistributionCenter',
        visible: bottomVisible
      });
      dispatch({
        type: Command.toggleImgShare,
        payload: result
      });
    },

    async closeImgShare() {
      //显示底部tab
      msg.emit('app:bottomVisible', {
        key: 'DistributionCenter',
        visible: true
      });
      dispatch({
        type: Command.toggleGoodsShare,
        payload: false
      });
      dispatch({
        type: Command.toggleImgShare,
        payload: false
      });
    }
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('distributionCenterMain')
  };
}
