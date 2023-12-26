import { Command } from '../constant';
import _ from 'lodash';
import { IOtherGroupReducer } from '../types';
import { Action } from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IOtherGroupReducer = {
  isReady: false,

  grouponInstanceList: [],

  customerVOList: [],

  modalRefresh: false
};

export default function otherGroup(
  state = INITIAL_STATE,
  action: Action
): IOtherGroupReducer {
  const { type, payload } = action;

  return produce<IOtherGroupReducer>(state, (draftState) => {
    switch (type) {
      //通用改变数据
      case Command.commonChange:
        return immerUtil.commonChange(draftState, {
          ...payload,
          key: 'otherGroup'
        });

      //初始化
      case Command.init:
        draftState.isReady = true;
        for (let propKey in payload.otherGroup) {
          //@ts-ignore 这里处理的不够好.
          draftState[propKey] = payload.otherGroup[propKey];
        }
        return draftState;

      case Command.grouponInstanceList:
        draftState.grouponInstanceList = payload.grouponInstanceList;
        return draftState;

      case Command.initCustomerVOList:
        draftState.customerVOList = payload.customerVOList;
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
