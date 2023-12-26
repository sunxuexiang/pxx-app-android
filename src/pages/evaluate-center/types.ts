import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;

  isLoading?: boolean;

  queryType: 0 | 1 | 2;//待评价 已评价 服务评价

  queryGoodsTobeEvaluateNum: IMainQueryGoodsTobeEvaluateNum; //待评价数量

  queryStoreTobeEvaluateNum: IMainQueryStoreTobeEvaluateNum; //评价服务数量

  evaluateNum: IMainevaluateNum; //评价服务数量

  evaluateImage :[]
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IListProps = {};
export type IListState = {};

export type INavProps = {};
export type INavState = {};

export type IMainQueryGoodsTobeEvaluateNum = number;
export type IMainQueryStoreTobeEvaluateNum = number;
export type IMainevaluateNum = number;

