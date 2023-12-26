import Actions from './actions';
import { PushCustomerEnableVO } from '../../../web-api/UmengConfigController';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  isShow?: boolean;
  initShow?: boolean;
  pushState: PushCustomerEnableVO
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
