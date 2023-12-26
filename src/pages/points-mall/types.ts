import Actions from './actions';
import { CustomerCenterResponse } from '../../web-api/CustomerBaseController';
import {
  PointsCouponVO,
  PointsGoodsCateVO,
  PointsGoodsVO
} from '../../web-api/PointsMallController';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  couponInfo: PointsCouponVO;

  customerInfo: CustomerCenterResponse;

  hotExchange: PointsGoodsVO;

  cateList: PointsGoodsCateVO;

  cateId: number;

  chooseCateIndex: number;

  canExchange: boolean;

  sortType: IMainSortType;

  pointsCouponListFlag: boolean;

  pointsCouponId: IMainPointsCouponId;

  latestPointsCouponInfoList: IMainLatestPointsCouponInfoListSet;

  pwdModalVisible: IMainPwdModalVisible;

  payPwd: IMainPayPwd;

  checkPayPwdRes: IMainCheckPayPwdRes;

  payPwdTime: IMainPayPwdTime;

  visible: boolean;

  pointsCoupon: PointsCouponVO;

}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IPointsTopProps = {};
export type IPointsTopState = {};

export type IHotExchangeProps = {};
export type IHotExchangeState = {};

export type ICateTabProps = {};
export type ICateTabState = { stickyLayoutY: number };

export type ISearchProps = {};
export type ISearchState = {};

export type IPaymentModalProps = {};
export type IPaymentModalState = {};

export type IExchangeCouponModalProps = {};
export type IExchangeCouponModalState = {};

export type IPointsGoodsListProps = {};
export type IPointsGoodsListState = {};

export type IPointsGoodsItemProps = {};
export type IPointsGoodsItemState = {};

export type IPointsCouponItemProps = {};
export type IPointsCouponItemState = {};

export interface IMainSortType {
  type?: string;
  sort?: string;
}

export type IMainPointsCouponId = string;
export type IMainLatestPointsCouponInfoListSet = IMainLatestPointsCouponInfoList[];

export interface IMainLatestPointsCouponInfoList {
  [k: string]: any;
}

export type IMainPwdModalVisible = boolean;
export type IMainPayPwd = string;
export type IMainCheckPayPwdRes = boolean;
export type IMainPayPwdTime = number;
