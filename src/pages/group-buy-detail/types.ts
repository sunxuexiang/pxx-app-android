import Actions from './actions';
import { GrouponActivityVO } from '../../web-api/GrouponOrderController';
import { GrouponDetailWithGoodsVO } from '../../web-api/GoodsBaseController';
import { GrouponGoodsViewByIdResponse } from '../../web-api/GoodsBaseController';
import { GoodsVO } from '../../web-api/GoodsBaseController';
import { GoodsInfoVO } from '../../web-api/GoodsBaseController';
import { GrouponInstanceWithCustomerInfoVO } from '../../web-api/GrouponBaseController';
import { GrouponInstanceWithCustomerInfoVO2 } from '../../web-api/GrouponBaseController';

export interface IActivityReducer {
  isReady: boolean;
  isLoading?: boolean;

  activityInfo: GrouponActivityVO;

  grouponDetails: GrouponDetailWithGoodsVO;

  grouponDetailOptStatus: IActivityGrouponDetailOptStatus;

  grouponNo: IActivityGrouponNo;
}

export interface IGoodsReducer {
  isReady: boolean;
  isLoading?: boolean;

  goods: GoodsVO;

  goodsInfos: GoodsInfoVO[];

  goodsInfoId: IGoodsGoodsInfoId;

  serverTime: IGoodsServerTime;

  loading: IGoodsLoading;

  specModal: IGoodsSpecModal;

  waitGroupModal: IGoodsWaitGroupModal;

  groupShareModal: IGoodsGroupShareModal;

  joinPeopleModal: IGoodsJoinPeopleModal;

  spuContext: any;

  targetGroupNo: string;
}

export interface INoticeReducer {
  isReady: boolean;
  isLoading?: boolean;

  grouponInst: GrouponInstanceWithCustomerInfoVO;

  grouponActivityId: INoticeGrouponActivityId;

  noticeGrouponNo: INoticeNoticeGrouponNo;

  grouponNoWait: INoticeGrouponNoWait;

  tips: INoticeTips;

  url: INoticeUrl;

  topics: INoticeTopics;

  oldGroupNo: string;
}

export interface IOtherGroupReducer {
  isReady: boolean;
  isLoading?: boolean;

  grouponInstanceList: GrouponInstanceWithCustomerInfoVO2[];

  customerVOList: IOtherGroupCustomerVOListSet;

  modalRefresh: IOtherGroupModalRefresh;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  activity: IActivityReducer;

  goods: IGoodsReducer;

  notice: INoticeReducer;

  otherGroup: IOtherGroupReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type INoticeProps = {};
export type INoticeState = {};

export type IGroupBuyTipProps = {};
export type IGroupBuyTipState = {};

export type IGoodsDetailProps = {};
export type IGoodsDetailState = {};

export type IDetailBottomProps = {};
export type IDetailBottomState = {
  currentAppState: string;
};

export type IPlayWayProps = {};
export type IPlayWayState = {};

export type IJoinGroupProps = {};
export type IJoinGroupState = {};

export type IGoodsListProps = {};
export type IGoodsListState = {};

export type IJoinPeopleModalProps = {};
export type IJoinPeopleModalState = {};

export type IWaitGroupModalProps = {};
export type IWaitGroupModalState = {};

export type IGroupShareProps = {};
export type IGroupShareState = {};

export type IActivityGrouponDetailOptStatus = number;
export type IActivityGrouponNo = string;
export type IGoodsGoodsInfoId = string;
export type IGoodsServerTime = number;
export type IGoodsLoading = boolean;
export type IGoodsSpecModal = boolean;
export type IGoodsWaitGroupModal = boolean;
export type IGoodsGroupShareModal = boolean;
export type IGoodsJoinPeopleModal = boolean;
export type INoticeGrouponActivityId = string;
export type INoticeNoticeGrouponNo = string;
export type INoticeGrouponNoWait = string;
export type INoticeTips = boolean;
export type INoticeUrl = string;
export type INoticeTopics = string;
export type IOtherGroupCustomerVOListSet = IOtherGroupCustomerVOList[];

export interface IOtherGroupCustomerVOList {
  [k: string]: any;
}
export type IOtherGroupModalRefresh = boolean;
