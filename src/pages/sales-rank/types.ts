import Actions from './actions';
import {
  DistributionCustomerRankingVO,
  DistributionCustomerRankingVO1
} from '../../web-api/DistributionCustomerRankingController';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  tab: RuleTab;
  ranks: DistributionCustomerRankingVO1[];
  myRank: DistributionCustomerRankingVO;
  range: string;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type ISalesListProps = {};
export type ISalesListState = {};

export type ISalesListItemProps = {
  rank: DistributionCustomerRankingVO1,
  // 是否影藏详细描述
  hideDetail?: boolean
};
export type ISalesListItemState = {};

export type ISalesListMineProps = {
  rank: DistributionCustomerRankingVO1
};
export type ISalesListMineState = {};

export type ISalesTabProps = {};
export type ISalesTabState = {};

export type RuleTab = 'inviteCount' | 'inviteAvailableCount' | 'saleAmount' | 'commission';
