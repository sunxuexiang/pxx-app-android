
import GoodsNum from './goods-num';
import MiniPurchase from './mini-purchase';
import StoreClose from './store-close';
import MarketingLabel from './marketing-label';
import {
  delPurchase,
  mergePurchase,
  postPurchase,
  putPurchase,
  putSkuMarketingCache
} from './purchase-front';
import SelfSalesLabel from './selfsales-label';
import RegisterCoupon from './coupon-model/register-coupon';
import UpdateModal from './update-modal';
import StoreForbid from './store-forbid';
import MagicWebview from './magic-webview';
import * as evaluateWebapi from './evaluateIs-show-webapi';
import GrouponSearch from './groupon/groupon-search';
import GrouponListItem from './groupon/groupon-list-item';
import SpecialLabel from './special-label';

export {
  GoodsNum,
  MiniPurchase,
  StoreClose,
  MarketingLabel,
  SelfSalesLabel,
  postPurchase,
  putPurchase,
  delPurchase,
  putSkuMarketingCache,
  mergePurchase,
  RegisterCoupon,
  UpdateModal,
  evaluateWebapi,
  StoreForbid,
  GrouponSearch,
  GrouponListItem,
  MagicWebview,
  SpecialLabel
};
