import Actions from './actions';
// import NoticeBarPropsType from 'antd-mobile/lib/notice-bar/PropsType';

export interface IMainReducer {
  isDistributor: boolean;
  isReady: boolean;
  isLoading?: boolean;
  tab: Tabs;
  totalNum: string;
  url: string;
  toRefresh: any;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IHeadersProps = {};
export type IHeadersState = {};

export type IContentProps = {};
export type IContentState = {};

export type IFriendListProps = {};
export type IFriendListState = {};

export type IFriendProps = {};
export type IFriendState = {};

export type ITabProps = {};
export type ITabState = {};

export type Tabs = '1' | '2' | '3';
