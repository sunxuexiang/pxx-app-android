import Actions from './actions';
import {
  DistributionPerformanceByMonthVO,
  DistributionPerformanceByDayVO,
  DistributionPerformanceByLast6MonthsQueryResponse,
  DistributionPerformanceByDayQueryResponse
} from '../../web-api/DistributionPerformanceController';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  salesTab: IMainSalesTab;

  dateTab: IMainDateTab;

  month: IMainMonth;

  monthFlag: IMainMonthFlag;

  saleData: IMainSaleData;

  ruleFlag: IMainRuleFlag;

  rule: IMainRule;

  monthData: IMainMonthData;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type ISalesTabProps = {};
export type ISalesTabState = {};

export type IDateTabProps = {};
export type IDateTabState = {};

export type ISalesListProps = {};
export type ISalesListState = {};

export type ISalesItemProps = {};
export type ISalesItemState = {};

export type ISalesHeaderProps = {};
export type ISalesHeaderState = {};

export type IMainSalesTab = 'day' | 'month';
export type IMainDateTab = '0' | '1'; // 0:最近7天 1:最近30天
export type IMainMonth = IMainMonthItem;
export type IMainMonthFlag = boolean;

export type IMainSalesItem = DistributionPerformanceByDayVO &
  DistributionPerformanceByMonthVO;

export type IMainSaleData = DistributionPerformanceByLast6MonthsQueryResponse &
  DistributionPerformanceByDayQueryResponse;
export type IMainRuleFlag = boolean;
export type IMainRule = string;
export type IMainMonthItem = {
  value: string;
  year: number;
  month: number;
};
export type IMainMonthData = IMainMonthItem[];
