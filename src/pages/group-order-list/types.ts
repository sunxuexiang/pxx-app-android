import Actions from './actions';
import { GrouponTradeVO } from '../../web-api/TradeBaseController';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  toRefresh: any;
  loading: boolean;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;

  toRefresh: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IOrderItemProps = {
  item: GrouponTradeVO;
};
export type IOrderItemState = {};
