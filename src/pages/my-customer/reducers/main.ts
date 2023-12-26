import { Command } from '../constant';
import _ from 'lodash';
import { IMainReducer } from '../types';
import { Action } from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isDistributor: false,
  isReady: false,
  tab: '1',
  totalNum: '',
  url: '/customer/page-invite-customer'
};
/**
 * tab请求路径
 */
const TAB_URL = {
  1: '/customer/page-invite-customer',
  2: '/customer/page-valid-invite-customer',
  3: '/customer/page-my-customer'
};

export default function main(
  state = INITIAL_STATE,
  action: Action
): IMainReducer {
  const { type, payload } = action;

  return produce<IMainReducer>(state, (draftState) => {
    switch (type) {
      //通用改变数据
      case Command.commonChange:
        return immerUtil.commonChange(draftState, { ...payload, key: 'main' });

      //点击tab
      case Command.changeTab:
        draftState.tab = payload.main.tab;
        draftState.url = TAB_URL[payload.main.tab];

        return draftState;

      //点击tab列表回调
      case Command.changeTotalNum:
        draftState.totalNum = payload.main.totalNum;
        return draftState;
      // //点击tab列表回调
      // case Command.initToRefresh:
      //   draftState.toRefresh = payload.main.toRefresh;
      //   return draftState;

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
    }
  });
}
