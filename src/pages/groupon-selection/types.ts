import Actions from './actions';
import { GrouponCateVO } from '../../web-api/GrouponCateBaseController';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  grouponCates: GrouponCateVO;

  keyWords: IMainKeyWords;

  chooseCateId: IMainChooseCateId;

  chooseCateIndex: IMainChooseCateIndex;

  sticky: IMainSticky;

  toRefresh: boolean;
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

export type ICateTabProps = {};
export type ICateTabState = {};

export type IGrouponGoodsListProps = {};
export type IGrouponGoodsListState = {};

export type IMainGrouponCatesSet = IMainGrouponCates[];

export interface IMainGrouponCates {
  [k: string]: any;
}
export type IMainKeyWords = string;
export type IMainChooseCateId = string;
export type IMainChooseCateIndex = number;
export type IMainSticky = boolean;
