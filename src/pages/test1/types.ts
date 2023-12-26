import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  request: IMainRequest;

  total: IMainTotal;

  list: IMainListSet;
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

export interface IMainRequest {
  q?: string;
  pageNum?: number;
  pageSize?: number;
  [k: string]: any;
}
export type IMainTotal = number;
export type IMainListSet = IMainList[];

export interface IMainList {
  [k: string]: any;
}
