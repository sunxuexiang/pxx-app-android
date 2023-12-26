import { Command } from '../constant';
import { IMainReducer } from '../types';
import { Action } from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,

  goodsId: 0,

  visible: false,

  bigImgList: [],

  //商品评价详情
  goodsEvaluate: {},

  bigImgIndex: 0,

  //已点赞数据
  zanGoodsEvaluateList: [],

  //取消点赞数据
  cancelZanGoodsEvaluateList: [],

  visibleMap: { 0: false },

  //企业购设置信息
  iepInfo: {
    iepLogo: '',
    iepCustomerName: '',
    iepPriceName: ''
  },
  //是否购买了企业购增值服务
  checkEnterpriseEnable: false
};

export default function main(
  state = INITIAL_STATE,
  action: Action,
): IMainReducer {
  const {type, payload} = action;

  return produce<IMainReducer>(state, draftState => {
    switch (type) {
      //通用改变数据
      case Command.commonChange:
        return immerUtil.commonChange(draftState, {...payload, key: 'main'});

      case Command.changeText:
        draftState.visibleMap[payload] = !draftState.visibleMap[payload];
        return draftState;

      //
      case Command.setBigImgList:
        draftState.bigImgList = payload.bigImgList;
        return draftState;

      //初始化
      case Command.init:
        draftState.isReady = true;
        for (let propKey in payload.main) {
          //@ts-ignore 这里处理的不够好.
          draftState[propKey] = payload.main[propKey];
        }
        return draftState;

      //打开/关闭弹窗
      case Command.openCloseModal:
        draftState.visible = payload;
        return draftState;

      //设置评价信息
      case Command.setGoodsEvaluate:
        draftState.goodsEvaluate = payload;
        return draftState;

      //设置评价信息
      case Command.setZanGoodsEvaluateList:
        draftState.zanGoodsEvaluateList = payload;
        return draftState;

      //图片下标
      case Command.bigImgIndex:
        draftState.bigImgIndex = payload;
        return draftState;

      //重置
      case Command.clean:
        for (let propKey in INITIAL_STATE) {
          //@ts-ignore 这里处理的不够好.
          draftState[propKey] = INITIAL_STATE[propKey];
        }
        return draftState;

      //企业购设置信息
      case Command.iepInfo:
        draftState.iepInfo = payload;
        return draftState;

      //是否购买企业购
      case Command.checkEnterpriseEnable:
        draftState.checkEnterpriseEnable = payload;
        return draftState;
    }
  });
}
