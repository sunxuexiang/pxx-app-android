import Actions from './actions';
import { GrouponSettingPageResponse } from 'api/GrouponSettingController';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  context: GrouponSettingPageResponse;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IInfoProps = {};
export type IInfoState = {};
