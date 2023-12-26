import { DistributionGoodsMatterPageVO } from '../../web-api/DistributionGoodsMatterController';
import { DistributionCustomerVO } from '../../web-api/DistributionController';
import Actions from './actions';
export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  matterType: number;
  imageModal: boolean;
  imageList: Array<String>;
  chooseImageIndex: number;
  shareVisible: boolean;
  goodsShareVisible: boolean;
  shareModalVisible: boolean;
  visibleMap: any;
  currentMatterList: Array<any>;
  moments: boolean;
  currentMatterId: String;
  checkedSku: Object;
  addSelfShop: boolean;
  momentSuccess: boolean;
  customer: DistributionCustomerVO;

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

export type ITopProps = {};
export type ITopState = {};

export type IListProps = {};
export type IListState = {};

export type IGoodsShareProps = {};
export type IGoodsShareState = {};

export type IImgShareProps = {};
export type IImgShareState = {};

export type IFooterProps = {};
export type IFooterState = {};

export type IMatericalItemProps = {
  matterItem: DistributionGoodsMatterPageVO;
};

export type IMatericalItemState = {
  matterItem: DistributionGoodsMatterPageVO;
};

export type DistributionCustomerType = DistributionCustomerVO;

export type IMarketingMatericalItemProps = {};
export type IMarketingMatericalItemState = {
  key: String;
  textHeight: any;
};
