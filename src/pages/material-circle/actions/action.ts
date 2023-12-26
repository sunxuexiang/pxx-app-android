import { Command } from '../constant';
import { Dispatch } from 'typings';
import { msg } from 'plume2';
import { IAllReducerProps } from '../types';
import { getReducerData } from '@/redux/store';
import api from 'api';
import { extraPathsValue } from '@/redux/util';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange
        //payload: extraPathsValue(...arguments)
      });
    },

    async changeTab(tab: number) {
      dispatch({
        type: Command.changeTab,
        payload: tab
      });
    },

    async saveImageIndex(matter: String, index: number, type: boolean) {
      dispatch({
        type: Command.saveImageIndex,
        payload: { matter: matter, index: index }
      });
      await this.toggleImageModal(type);
    },

    async toggleImageModal(type: boolean) {
      //触发打开弹窗，底部tab隐藏,否则展开
      msg.emit('app:bottomVisible', {
        key: 'MaterialCircle',
        visible: type
      });
      dispatch({
        type: Command.toggleImageModal,
        payload: {}
      });
    },

    async toggleGoodsShare(type: boolean) {
      //触发打开弹窗，底部tab隐藏,否则展开
      msg.emit('app:bottomVisible', {
        key: 'MaterialCircle',
        visible: type
      });
      dispatch({
        type: Command.toggleGoodsShare,
        payload: {}
      });
    },

    async toggleImgShare() {
      dispatch({
        type: Command.toggleGoodsShare,
        payload: {}
      });

      dispatch({
        type: Command.toggleImgShare,
        payload: {}
      });
    },

    async closeImgShare() {
      dispatch({
        type: Command.toggleImgShare,
        payload: {}
      });
    },

    async changeImageIndex(index) {
      dispatch({
        type: Command.changeImageIndex,
        payload: index
      });
    },

    async changeShare(matterType, matterId, matter) {
      //触发打开弹窗，底部tab隐藏,否则展开
      msg.emit('app:bottomVisible', {
        key: 'MaterialCircle',
        visible: matterType == 0 || matterType == 1 ? false : true
      });
      if (matterType == 0 || matterType == 1) {
        let currentMatterList = [];
        if (matterType == 0) {
          matter.split(',').map((v) => {
            currentMatterList.push({
              imgSrc: v,
              checked: true
            });
          });
        } else {
          JSON.parse(matter).map((item) => {
            currentMatterList.push({
              imgSrc: item.imgSrc,
              linkSrc: item.linkSrc,
              checked: true
            });
          });
        }
        dispatch({
          type: Command.saveCurrentMatter,
          payload: currentMatterList
        });
        dispatch({
          type: Command.saveCurrentMatterId,
          payload: matterId
        });
      }
      dispatch({
        type: Command.changeShare,
        payload: ''
      });
    },

    async changeText(id) {
      dispatch({
        type: Command.changeText,
        payload: id
      });
    },

    async moments(result: boolean) {
      dispatch({
        type: Command.changeMoments,
        payload: result
      });
    },

    async changeCheck(index: number, value: boolean) {
      dispatch({
        type: Command.changeCheck,
        payload: { index, value }
      });
    },

    async updataNum(matterId: string) {
      const {
        code,
        context,
        message
      } = api.distributionGoodsMatterController.deleteList({
        id: matterId
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

    async momentSuccess(success) {
      dispatch({
        type: Command.momentSuccess,
        payload: success
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
