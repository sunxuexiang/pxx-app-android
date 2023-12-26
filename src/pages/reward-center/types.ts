import Actions from './actions';
import { CustomerCenterResponse } from '../../web-api/CustomerBaseController';
import { CustomerFundsStatisticsResponse } from '../../web-api/CustomerFundsController';

import { CountInviteCustomerResponse } from '../../web-api/InviteCustomerRecordController';
import {
  DistributionCustomerSimVO,
  DistributionCustomerVO,
  DistributionSettingSimVO
} from '../../web-api/DistributionController';
import { EsGoodsInfo } from '../../web-api/GoodsInfoBaseController';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  customerInfo: CustomerCenterResponse;

  distributor: DistributionCustomerVO;

  distributeSetting: DistributionSettingSimVO;

  inviteInfo: DistributionCustomerSimVO;

  customerBalance: CustomerFundsStatisticsResponse;

  inviteCustomer: CountInviteCustomerResponse;

  hotGoodsList: EsGoodsInfo;

  checkedSku: IMainCheckedSku;

  shareVisible: IMainShareVisible;


  noticeNum: number;

  preferentialNum: number;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IHeadProps = {};
export type IHeadState = {};

export type IMySalesProps = {};
export type IMySalesState = { showFlag: boolean };

export type IInvitFriendProps = {};
export type IInvitFriendState = {};

export type IMyCustomerProps = {};
export type IMyCustomerState = {};

export type IToolImgProps = {};
export type IToolImgState = {};

export type ISellwellGoodsProps = {};
export type ISellwellGoodsState = {};

export type IMainCheckedSku = {};
export type IMainShareVisible = boolean;
