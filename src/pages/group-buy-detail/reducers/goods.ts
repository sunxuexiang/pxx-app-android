import { Command } from '../constant';
import _ from 'lodash';
import { IGoodsReducer } from '../types';
import { Action } from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IGoodsReducer = {
  isReady: false,

  goods: {},

  goodsInfos: [],

  goodsInfoId: '',

  serverTime: 0,

  loading: true,

  specModal: false,

  waitGroupModal: false,

  groupShareModal: false,

  joinPeopleModal: false,

  spuContext: {},

  targetGroupNo: ''
};

export default function goods(
  state = INITIAL_STATE,
  action: Action
): IGoodsReducer {
  const { type, payload } = action;

  return produce<IGoodsReducer>(state, (draftState) => {
    switch (type) {
      //通用改变数据
      case Command.commonChange:
        return immerUtil.commonChange(draftState, { ...payload, key: 'goods' });

      //初始化
      case Command.init:
        draftState.isReady = true;
        for (let propKey in payload.goods) {
          //@ts-ignore 这里处理的不够好.
          draftState[propKey] = payload.goods[propKey];
        }
        return draftState;

      case Command.initGoodsInfoId:
        draftState.goodsInfoId = payload.goodsInfoId;
        return draftState;

      case Command.initGoods:
        draftState.goods = payload.goods;
        return draftState;

      case Command.initGoodsInfos:
        draftState.goodsInfos = payload.goodsInfos;
        return draftState;

      case Command.toggleJoinPeopleModal:
        draftState.joinPeopleModal = !draftState.joinPeopleModal;
        return draftState;

      case Command.toggleWaitGroupModal:
        draftState.waitGroupModal = !draftState.waitGroupModal;
        return draftState;

      case Command.initSpuContext:
        draftState.spuContext = payload.spuContext;
        return draftState;

      case Command.toggleSpecModal:
        draftState.specModal = !draftState.specModal;
        return draftState;

      case Command.openSpecModal:
        draftState.specModal = true;
        return draftState;

      case Command.closeSpecModal:
        draftState.specModal = false;
        return draftState;

      case Command.targetGroupNo:
        draftState.targetGroupNo = payload;
        return draftState;

      case Command.saveServerTime:
        draftState.serverTime = payload.serverTime;
        return draftState;

      case Command.toggleGroupShareModal:
        draftState.groupShareModal = !draftState.groupShareModal;
        return draftState;

      //重置
      case Command.clean:
        for (let propKey in INITIAL_STATE) {
          //@ts-ignore 这里处理的不够好.
          draftState[propKey] = INITIAL_STATE[propKey];
        }
        return draftState;
    }
  });
}
