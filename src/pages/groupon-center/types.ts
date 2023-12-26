import Actions from './actions';
import { GrouponCateVO } from '../../web-api/GrouponCateBaseController';
import { GrouponCenterVO } from '../../web-api/GrouponCenterController';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  grouponAdvert: IMainGrouponAdvert;

  grouponCates: GrouponCateVO;

  grouponHotList: GrouponCenterVO;

  chooseCateId: IMainChooseCateId;

  keyWords: IMainKeyWords;

  sticky: boolean;

  chooseCateIndex: number;

  toRefresh: boolean;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IAdvBannerProps = {};
export type IAdvBannerState = {};

export type IHotRecommendProps = {};
export type IHotRecommendState = { currentIndex: number };

export type ICateTabProps = {};
export type ICateTabState = { stickyLayoutY: number };

export type IGrouponGoodsListProps = {};
export type IGrouponGoodsListState = {};

export type IMainGrouponAdvert = string;
export type IMainChooseCateId = string;
export type IMainKeyWords = string;
