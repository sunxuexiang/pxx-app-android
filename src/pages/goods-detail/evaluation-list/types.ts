import Actions from './actions';
import {
  GoodsEvaluateVO,
  GoodsEvaluateImageVO
} from '../../../web-api/EvaluateController';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  goodsId: number;

  visible: boolean;

  bigImgList: GoodsEvaluateImageVO[];

  goodsEvaluate: GoodsEvaluateVO;

  bigImgIndex: number;

  //已点赞数据
  zanGoodsEvaluateList: GoodsEvaluateVO[],

  //取消点赞数据
  cancelZanGoodsEvaluateList: GoodsEvaluateVO[],

  visibleMap: any;

  iepInfo: {
    iepLogo: string;
    iepCustomerName: string;
    iepPriceName: string;
  };

  checkEnterpriseEnable: boolean;
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

export type IModalProps = {};
export type IModalState = {};

export type IItemProps = {};
export type IItemState = {
  key: string;
  textHeight: any;
};
