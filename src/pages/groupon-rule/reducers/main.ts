import { Command } from '../constant';
import _ from 'lodash';
import { IMainReducer } from '../types';
import { Action } from 'typings';
import produce from 'immer';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  context: ''
};
export default function main(
  state = INITIAL_STATE,
  action: Action
): IMainReducer {
  const { type, payload } = action;

  return produce<IMainReducer>(state, (draftState) => {
    switch (type) {
      //初始化
      case Command.init:
        draftState.context = payload.main.context;
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
