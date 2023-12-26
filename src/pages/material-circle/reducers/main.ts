import { Command } from '../constant';
import _ from 'lodash';
import { IMainReducer } from '../types';
import { Action } from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  matterType: 0,
  //图片预览弹出
  imageModal: false,
  imageList: [],
  //当前预览的图片索引
  chooseImageIndex: 0,
  //分享弹出
  shareVisible: false,
  // 分享赚弹出
  goodsShareVisible: false,
  // 分享赚弹出
  shareModalVisible: false,
  visibleMap: { 0: false },
  currentMatterList: [],
  //分享到朋友圈
  moments: false,
  //当前分享或保存时的素材ID
  currentMatterId: '',
  checkedSku: {},
  addSelfShop: true,
  momentSuccess: false,
  customer: {},

  noticeNum: 0,
  preferentialNum: 0,
};

export default function materialCircleMain(
  state = INITIAL_STATE,
  action: Action
): IMainReducer {
  const { type, payload } = action;

  return produce<IMainReducer>(state, (draftState) => {
    switch (type) {
      //通用改变数据
      case Command.commonChange:
        return immerUtil.commonChange(draftState, { ...payload, key: 'main' });

      //初始化
      case Command.init:
        draftState.isReady = true;
        for (let propKey in payload.main) {
          //@ts-ignore 这里处理的不够好.
          draftState[propKey] = payload.main[propKey];
        }
        return draftState;

      //重置
      case Command.clean:
        for (let propKey in INITIAL_STATE) {
          //@ts-ignore 这里处理的不够好.
          draftState[propKey] = INITIAL_STATE[propKey];
        }
        return draftState;

      //tab切换
      case Command.changeTab:
        draftState.matterType = payload;
        return draftState;

      //图片预览，存储urlList和当前的index
      case Command.saveImageIndex:
        if (draftState.matterType == 0) {
          draftState.imageList = payload.matter.split(',');
          draftState.chooseImageIndex = payload.index;
        }
        if (draftState.matterType == 1) {
          let imageList = [];
          JSON.parse(payload.matter).map((item) => {
            imageList.push(item.imgSrc);
          });
          draftState.imageList = imageList;
          draftState.chooseImageIndex = payload.index;
        }
        return draftState;

      //显示图片预览弹框
      case Command.toggleImageModal:
        draftState.imageModal = !draftState.imageModal;
        return draftState;

      //切换显示分享赚弹框
      case Command.toggleGoodsShare:
        draftState.goodsShareVisible = !draftState.goodsShareVisible;
        return draftState;

      //切换显示分享赚弹框
      case Command.toggleImgShare:
        draftState.shareModalVisible = !draftState.shareModalVisible;
        return draftState;

      case Command.changeImageIndex:
        draftState.chooseImageIndex = payload;
        return draftState;

      case Command.changeShare:
        draftState.shareVisible = !draftState.shareVisible;
        return draftState;

      case Command.changeText:
        draftState.visibleMap[payload] = !draftState.visibleMap[payload];
        return draftState;

      case Command.saveCurrentMatter:
        draftState.currentMatterList = payload;
        return draftState;

      case Command.changeMoments:
        draftState.moments = payload;
        return draftState;

      case Command.changeCheck:
        draftState.currentMatterList[payload.index].checked = payload.value;
        return draftState;

      case Command.saveCurrentMatterId:
        draftState.currentMatterId = payload;
        return draftState;

      case Command.saveCheckedSku:
        draftState.checkedSku = payload;
        return draftState;

      case Command.changeAddSelfShop:
        draftState.addSelfShop = !draftState.addSelfShop;
        return draftState;

      case Command.setAddSelfShop:
        draftState.addSelfShop = payload;
        return draftState;

      case Command.momentSuccess:
        draftState.momentSuccess = payload;
        return draftState;
    }
  });
}
