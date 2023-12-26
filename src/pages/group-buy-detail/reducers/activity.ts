import { Command } from '../constant';
import _ from 'lodash';
import { IActivityReducer } from '../types';
import { Action } from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IActivityReducer = {
  isReady: false,

  activityInfo: {},

  grouponDetails: {},

  grouponDetailOptStatus: 4,

  grouponNo: ''
};

export default function activity(
  state = INITIAL_STATE,
  action: Action
): IActivityReducer {
  const { type, payload } = action;

  return produce<IActivityReducer>(state, (draftState) => {
    switch (type) {
      //通用改变数据
      case Command.commonChange:
        return immerUtil.commonChange(draftState, {
          ...payload,
          key: 'activity'
        });

      //初始化
      case Command.init:
        draftState.isReady = true;
        return draftState;

      case Command.saveGrouponNo:
        draftState.grouponNo = payload.grouponNo;
        return draftState;

      case Command.initGrouponDetails:
        draftState.grouponDetails = payload.grouponDetails;
        draftState.grouponDetailOptStatus =
          payload.grouponDetails.grouponDetailOptStatus;
        return draftState;

      case Command.initActivityInfo:
        draftState.activityInfo = payload.grouponActivity;
        return draftState;

      //重置
      case Command.clean:
        draftState.isReady = false;
        return draftState;
    }
  });
}
