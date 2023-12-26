import { Command } from '../constant';
import _ from 'lodash';
import { INoticeReducer } from '../types';
import { Action } from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: INoticeReducer = {
  isReady: false,

  grouponInst: {},

  grouponActivityId: '',

  noticeGrouponNo: '',

  grouponNoWait: '',

  tips: false,

  //消息通知中，上一次获取的团号
  oldGroupNo: ''

  //url: config.BFF_HOST + '/endpoint'",

  //topics: "['/topic/getGrouponInstance']",
};

export default function notice(
  state = INITIAL_STATE,
  action: Action
): INoticeReducer {
  const { type, payload } = action;

  return produce<INoticeReducer>(state, (draftState) => {
    switch (type) {
      //通用改变数据
      case Command.commonChange:
        return immerUtil.commonChange(draftState, {
          ...payload,
          key: 'notice'
        });

      //初始化
      case Command.init:
        draftState.isReady = true;
        for (let propKey in payload.notice) {
          //@ts-ignore 这里处理的不够好.
          draftState[propKey] = payload.notice[propKey];
        }
        return draftState;

      case Command.grouponLatest:
        //获取之前的团号
        if (Object.keys(payload).length > 0) {
          if (draftState.oldGroupNo != payload.grouponInstance.grouponNo) {
            draftState.grouponInst = payload;
            draftState.oldGroupNo = payload.grouponInstance.grouponNo;
          } else {
            draftState.grouponInst = {};
          }
        } else {
          draftState.grouponInst = {};
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
