import Actions from './actions';
import {
  EvaluateInfoResponse,
  GoodsEvaluateQueryGoodsAndStoreResponse,
  IAddGoodsEvaluateEvaluateAddRequestReq
} from '../../web-api/GoodsEvaluateController';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  baseInfo: GoodsEvaluateQueryGoodsAndStoreResponse;
  evaluateAddRequest: IAddGoodsEvaluateEvaluateAddRequestReq;
  evaluateType?: string;
  evaluateDetail?:EvaluateInfoResponse;
  queryType?:number
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IEvaluateItemProps = {};
export type IEvaluateItemState = {};
export type IApiResult = {
  code?: string;
  message?: string;
  context?: any;
  [name: string]: any;
};
