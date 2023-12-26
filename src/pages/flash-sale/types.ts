import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  sceneList: IMainSceneListSet;

  cateList: IMainCateListSet;

  cateId: IMainCateId;

  activityDate: IMainActivityDate;

  activityTime: IMainActivityTime;

  presentScene: number;

  activityStatus: IMainActivityStatus;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;
  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type ICartListProps = {};
export type ICartListState = {
  sceneArr:Array<any>
};

export type IProductListProps = {};
export type IProductListState = {};

export type ISceneListProps = {};
export type ISceneListState = {
  sceneArr?:Array<any>
};

export type INavListProps = {};
export type INavListState = {};

export type IBannerProps = {};
export type IBannerState = {};

export type ITimesProps = {};
export type ITimesState = {};

export type IMainSceneListSet = IMainSceneList[];

export interface IMainSceneList {
  [k: string]: any;
}
export type IMainCateListSet = IMainCateList[];

export interface IMainCateList {
  [k: string]: any;
}
export type IMainCateId = null;
export type IMainActivityDate = null;
export type IMainActivityTime = null;
export type IMainActivityStatus = string;
