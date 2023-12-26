import { StackHeaderOptions, TransitionPreset, StackNavigationOptions } from '@react-navigation/stack/lib/typescript/src/types';
import React from 'react';
import {
  createStackNavigator,
} from '@react-navigation/stack';
const Stack = createStackNavigator();

import UserInfo from './user-info';
import Login from './login';
import Register from './register';
import Main from './main';
import UserFinance from './user-finance';
import ImproveInformation from './improve-information';
import ImproveResult from './improve-result';
import UserInvoice from './user-invoice';
import UserEmail from './user-email/index';
import UserAccount from './user-account';
import UserSafe from './user-safe';
import UserPhone from './user-phone';
import UserPhoneSubmit from './user-phone-submit';
import UserPassword from './user-password';
import UserPasswordSubmit from './user-password-submit';
import GoodsDetail from './goods-detail';
import UserAccountEdit from './user-account-edit';
import UserAccountList from './user-account/component/list';
import OrderDetail from './order-detail';
import UserReceiveAddress from './receive-address';
import UserAddressEdit from './receive-address-edit';
import PurchaseOrder from './purchase-order';
import PurchaseOrderWithoutBottom from './purchase-order';
import Search from './search';
import AllList from './all-list';
import RefundList from './refund-list';
import LogisticsInput from './logistics-input';
import LogisticsSelect from './logistics-select';
import GoodsListWithoutBottom from './goods-list';
import SpecialGoodsListWithoutBottom from './special-goods-list';
import GoodsList from './goods-list';
import GoodsListPromotion from './goods-list-promotion';
import UserCenter from './user-center';
import MemberCenter from './user/member-center';
import GrowthValue from './user/growth-value';
import PointsList from './user/user-points';
import ClassEquity from './user/class-equity';
import Settings from './settings';
import Version from './settings/version';
import UserStore from './user-store';
import ReturnFirstStep from './return-refund/return-first-step';
import ReturnSecond from './return-refund/return-second-step';
import RefundFirstStep from './return-refund/refund-first-step';
import ApplySuccess from './return-refund/return-refund-success';
import OrderList from './order-list';
import OrderInvoice from './order-invoice';
import FillPayment from './fill-payment';
import SellerAccount from './seller-account';
import PayOrder from './pay-order';
import GoodsEmpty from './goods-failure';
import GoodsBill from './goods-bill';
import PaySuccess from './pay-success';
import OrderConfirm from './order-confirm';
import PayRecord from './pay-record';
import RegisterAgreement from './register-agreement';
import ReturnDetail from './return-detail';
import ReturnRecord from './return-record';
import LogisticInfo from './logistic-info';
import OrderSuccess from './order-sucess';
import ShipRecord from './ship-record';
import OrderDetailSkus from './order-goods-list';
import ShipList from './ship-list';
import PickUpRecord from './pick-up-record'
import InvoiceInfo from './invoice-info';
import ReturnGoodsList from './return-goods-list';
import ReturnLogisticInfo from './return-logistic-info';
import PayDelivery from './pay-delivery';
import StoreAttention from './store-attention';
import StoreMain from './store-main';
import StoreFile from './store-file';
import StoreMember from './store-member';
import StoreList from './store-list';
import StoreGoodsList from './store-goods-list';
import StoreCateList from './store-cate-list';
import StoreSearch from './store-search';
import Error from './error';
import NetBreak from './net-break';
import PageLink from './x-site/page-link';
import CustomLink from './x-site/custom-link';
import ChoseService from './chose-service';
import LinkedAccount from './linked-account';
import WechatLogin from './wechat-login';
import MyCoupon from './my-coupon';
import UseCoupon from './use-coupon';
import CouponCenter from './coupon-center';
import CouponPromotion from './coupon-promotion';
import PayPassword from './balance-pay-password/index';
import PayPasswordNext from './balance-pay-password-next/index';
//余额我的页面
import BalanceHome from './balance/home';
//余额提现
import BalanceCash from './balance/cash';
//余额提现申请单
import BalanceCashForm from './balance/cash-form';
//余额提现提交成功
import BalanceCashSuccess from './balance/cash-success';
//余额提现记录
import BalanceCashRecord from './balance/cash-record';
import CashDetail from './balance/cash-detail';
import CashAccountDetail from './balance/cash-account-detail';
import Test1 from '../src/pages/test1';
import FlashSale from '../src/pages/flash-sale';
import GoodsDetailEvaluationList from '../src/pages/goods-detail/evaluation-list';
import EvaluateCenter from '../src/pages/evaluate-center';
import FlashSaleGoodsPanicBuying from '../src/pages/flash-sale-goods-panic-buying';
import FlashSaleOrderConfirm from './flash-sale-order-confirm';
import FlashSaleOrderInvoice from './flash-sale-order-invoice';
import EvaluateSubmit from '../src/pages/evaluate-submit';
import { myPvUvStatis } from 'wmkit/wm_sta';
import * as WMkit from 'wmkit/kit';
import { cache } from 'wmkit/cache';
import Fetch from 'wmkit/fetch';
import * as _ from 'wmkit/common/util'; // added by scx
import { msg } from 'plume2';
import AboutUs from './about-us';
import SalesPerform from '../src/pages/sales-perform';
import SalesRank from '../src/pages/sales-rank';
import DistributionRule from '../src/pages/distribution-rule';
import DistributionShopIndex from './shop-index';
//签到
import Sign from './sign';
//在线客服
import OnlineService from './onlineService';
// 分销

//社交电商
import GraphicMaterial from './graphic-material';
//邀请好友
import InvitHome from './invit/home';
// 客户订单列表
import CustomerOrderList from './customer-order-list';
// 开店礼包
import StoreBags from './store-bags';
// 客户订单详情
import CustomerOrderDetail from './customer-order-detail';
// 客户订单商品列表
import CustomerOrderDetailSkus from './customer-order-goods-list';
//推广商品
import DistributionGoodsList from './distribution-goods-list';
// 我的用户
import MyCustomer from '../src/pages/my-customer';
//邀请码
import InviteCode from './distribution-register';
//分销商品详情
import DistributionGoodsDetail from './distribution-goods-detail';
// 店铺选品页
import ShopGoods from './shop-goods';
//分销中心
import DistributionCenter from '../src/pages/distribution-center';
//奖励中心
import RewardCenter from '../src/pages/reward-center';
//消息推送设置
import PushSetting from '../src/pages/message-push/setting';
import PushCenter from '../src/pages/message-push/center';
import PushList from '../src/pages/message-push/list';

import ShopEdit from './shop-edit';

// 开店礼包商品详情
import StoreBagsGoodsDetail from './store-bags-goods-detail';
import MaterialCircle from '../src/pages/material-circle';
//公司信息
import IepInfo from './iep-info';
import PreBuy from './pre-buy-list';

import { config } from 'wmkit/config';
//采购子账户
import LinkChildAccount from './link-child-account';

/**
 * 拼团相关页面
 */

//玩法介绍
import GrouponRule from '../src/pages/groupon-rule';
//参团详情
import GroupBuyDetail from '../src/pages/group-buy-detail';
//我的拼购
import GroupOrderList from '../src/pages/group-order-list';

//积分订单确认
import PointsOrderConfirm from './points-order-confirm';
//积分订单确认成功
import PointsConfirmSuccess from './points-order-confirm-success';
//积分订单商品列表
import PointsGoodsBill from './points-good-bill';

//拼团首页
import GrouponCenter from '../src/pages/groupon-center';
import GrouponSearchList from '../src/pages/groupon-search-list';
import GrouponSelection from '../src/pages/groupon-selection';

import SpellGroupDetail from './spellgroup-detail';

import ImproveIepInfo from './iep-vas/improve-iep-info';
//特价商品列表
import SpecialGoodsList from './special-goods-list';
//企业认证
import EnterpriseApproval from './enterprise-approval';
/**
 * 积分相关页面
 */

// 积分商城
import PointsMall from '../src/pages/points-mall';
// 积分商品
import PointsOrderList from './points-order-list';
import PointsOrderDetail from './points-order-detail';
import PointsOrderDetailSkus from './points-order-goods-list';
import CombinationGoods from '../src/pages/combination-goods';
//相机
import CameraComponent from './camera-page';
//新增采购子账户
import LinkChildAdd from './link-child-add';
import AddressMap from './address-map';
import OrderConfirmDeliver from './order-confirm-deliver';
import LoginSuccessDefault from '../wmkit/login-success-default';

import FriendPay from './friend-pay';
//客服页跳转
import SobotLink from './sobot-link-page';
//首页三级分类页
import CateOnelevelList from './cate-onelevel-list';
//优惠变更页
import MarketingModify from './maketing-modify';

import ClassifyPage from './classify-page';
//导购邀新
import GuideInvites from './guide-invites';
//小视频
import VideoPage from './video-page';


export interface IRouteMap {
  name?: string;
  component: React.ReactNode;
  options?: StackHeaderOptions | TransitionPreset | StackNavigationOptions;
  [key: string]: any;
}

const routersConfig: IRouteMap[] = [

  {
    name: 'GoodsList',
    component: GoodsList,
  },
  // {
  //   name: 'Main',
  //   component: Main,
  // },
  {
    name: 'Login',
    component: Login,
  },

  {
    name: 'LoginSuccessDefault',
    component: LoginSuccessDefault,
  },

  {
    name: 'Register',
    component: Register,
  },


  {
    name: 'UserInfo',
    component: UserInfo,
  },


  {
    name: 'UserFinance',
    component: UserFinance,
  },
  {
    name: 'ImproveInformation',
    component: ImproveInformation,
  },
  {
    name: 'ImproveResult',
    component: ImproveResult,
  },
  {
    name: 'UserInvoice',
    component: UserInvoice,
  },
  {
    name: 'UserEmail',
    component: UserEmail,
  },
  {
    name: 'UserAccount',
    component: UserAccount,
  },
  {
    name: 'UserSafe',
    component: UserSafe,
  },
  {
    name: 'UserPhone',
    component: UserPhone,
  },
  //修改密码
  {
    name: 'UserPassword',
    component: UserPassword
  },
  //修改密码
  {
    name: 'UserPasswordSubmit',
    component: UserPasswordSubmit
  },
  {
    name: 'UserPhoneSubmit',
    component: UserPhoneSubmit,
  },
  {
    name: 'GoodsDetail',
    component: GoodsDetail,
  },
  {
    name: 'UserAccountEdit',
    component: UserAccountEdit,
  },
  {
    name: 'UserAccountList',
    component: UserAccountList,
  },
  {
    name: 'OrderDetail',
    component: OrderDetail,
  },
  {
    name: 'UserReceiveAddress',
    component: UserReceiveAddress,
  },
  {
    name: 'UserAddressEdit',
    component: UserAddressEdit,
  },
  {
    name: 'AddressMap',
    component: AddressMap,
  },
  {
    name: 'PurchaseOrderWithoutBottom',
    component: PurchaseOrderWithoutBottom,
  },
  // {
  //   name: 'PurchaseOrder',
  //   component: PurchaseOrder,
  // },
  {
    name: 'Search',
    component: Search,
  },
  {
    name: 'AllList',
    component: AllList,
  },
  {
    name: 'RefundList',
    component: RefundList,
  },
  {
    name: 'LogisticsInput',
    component: LogisticsInput,
  },
  {
    name: 'LogisticsSelect',
    component: LogisticsSelect,
  },
  {
    name: 'GoodsListWithoutBottom',
    component: GoodsListWithoutBottom,
  },
  {
    name: 'SpecialGoodsListWithoutBottom',
    component: SpecialGoodsListWithoutBottom
  },
  {
    name: 'GoodsListPromotion',
    component: GoodsListPromotion,
  },
  // {
  //   name: 'UserCenter',
  //   component: UserCenter,
  // },
  {
    name: 'PointsList',
    component: PointsList,
  },
  {
    name: 'GrowthValue',
    component: GrowthValue,
  },
  {
    name: 'MemberCenter',
    component: MemberCenter,
  },
  {
    name: 'ReturnFirstStep',
    component: ReturnFirstStep,
  },
  {
    name: 'UserStore',
    component: UserStore,
  },
  {
    name: 'Version',
    component: Version,
  },
  {
    name: 'Settings',
    component: Settings,
  },
  {
    name: 'ClassEquity',
    component: ClassEquity,
  },
  {
    name: 'OrderList',
    component: OrderList,
  },
  //索取发票
  {
    name: 'OrderInvoice',
    component: OrderInvoice,
  },
  {
    name: 'ApplySuccess',
    component: ApplySuccess,
  },
  {
    name: 'RefundFirstStep',
    component: RefundFirstStep,
  },
  {
    name: 'ReturnSecond',
    component: ReturnSecond,
  },

  {
    name: 'GoodsBill',
    component: GoodsBill,
  },
  {
    name: 'GoodsEmpty',
    component: GoodsEmpty,
  },
  {
    name: 'OrderConfirm',
    component: OrderConfirm,
  },
  {
    name: 'PayOrder',
    component: PayOrder,
  },
  {
    name: 'SellerAccount',
    component: SellerAccount,
  },
  {
    name: 'PaySuccess',
    component: PaySuccess,
  },
  {
    name: 'OrderConfirmDeliver',
    component: OrderConfirmDeliver,
  },
  {
    name: 'FillPayment',
    component: FillPayment,
  },
  {
    name: 'PayRecord',
    component: PayRecord,
  },
  {
    name: 'RegisterAgreement',
    component: RegisterAgreement,
  },
  {
    name: 'ReturnDetail',
    component: ReturnDetail,
  },
  {
    name: 'ReturnRecord',
    component: ReturnRecord,
  },
  {
    name: 'LogisticInfo',
    component: LogisticInfo,
  },
  {
    name: 'OrderSuccess',
    component: OrderSuccess,
  },
  {
    name: 'ShipRecord',
    component: ShipRecord,
  },
  {
    name: 'PickUpRecord',
    component: PickUpRecord,
  },
  {
    name: 'OrderDetailSkus',
    component: OrderDetailSkus,
  },
  {
    name: 'ShipList',
    component: ShipList,
  },
  {
    name: 'InvoiceInfo',
    component: InvoiceInfo,
  },
  {
    name: 'ReturnGoodsList',
    component: ReturnGoodsList,
  },
  {
    name: 'ReturnLogisticInfo',
    component: ReturnLogisticInfo,
  },
  {
    name: 'PayDelivery',
    component: PayDelivery,
  },
  {
    name: 'StoreAttention',
    component: StoreAttention,
  },
  {
    name: 'StoreMain',
    component: StoreMain,
  },
  {
    name: 'StoreFile',
    component: StoreFile,
  },
  {
    name: 'StoreCateList',
    component: StoreCateList,
  },
  {
    name: 'StoreGoodsList',
    component: StoreGoodsList,
  },
  {
    name: 'StoreList',
    component: StoreList,
  },
  {
    name: 'StoreMember',
    component: StoreMember,
  },
  {
    name: 'PageLink',
    component: PageLink,
  },
  {
    name: 'NetBreak',
    component: NetBreak,
  },
  {
    name: 'Error',
    component: Error,
  },
  {
    name: 'StoreSearch',
    component: StoreSearch,
  },

  {
    name: 'CustomLink',
    component: CustomLink,
  },
  {
    name: 'ChoseService',
    component: ChoseService,
  },
  {
    name: 'LinkedAccount',
    component: LinkedAccount,
  },
  {
    name: 'WechatLogin',
    component: WechatLogin,
  },
  {
    name: 'CouponPromotion',
    component: CouponPromotion,
  },
  {
    name: 'CouponCenter',
    component: CouponCenter,
  },
  {
    name: 'UseCoupon',
    component: UseCoupon,
  },
  {
    name: 'MyCoupon',
    component: MyCoupon,
  },
  {
    name: 'BalanceHome',
    component: BalanceHome,
  },
  {
    name: 'PayPasswordNext',
    component: PayPasswordNext,
  },
  {
    name: 'PayPassword',
    component: PayPassword,
  },
  {
    name: 'BalanceCashSuccess',
    component: BalanceCashSuccess,
  },
  {
    name: 'BalanceCashForm',
    component: BalanceCashForm,
  },
  {
    name: 'BalanceCash',
    component: BalanceCash,
  },
  {
    name: 'FlashSale',
    component: FlashSale,
  },
  {
    name: 'CashAccountDetail',
    component: CashAccountDetail,
  },
  {
    name: 'BalanceCashRecord',
    component: BalanceCashRecord,
  },
  {
    name: 'CashDetail',
    component: CashDetail,
  },
  {
    name: 'FlashSaleOrderConfirm',
    component: FlashSaleOrderConfirm,
  },
  {
    name: 'FlashSaleGoodsPanicBuying',
    component: FlashSaleGoodsPanicBuying,
  },
  {
    name: 'EvaluateCenter',
    component: EvaluateCenter,
  },
  {
    name: 'GoodsDetailEvaluationList',
    component: GoodsDetailEvaluationList,
  },
  {
    name: 'FlashSaleOrderInvoice',
    component: FlashSaleOrderInvoice,
  },
  {
    name: 'EvaluateSubmit',
    component: EvaluateSubmit,
  },

  {
    name: 'AboutUs',
    component: AboutUs,
  },
  {
    name: 'SalesPerform',
    component: SalesPerform,
  },
  {
    name: 'SalesRank',
    component: SalesRank,
  },
  {
    name: 'DistributionRule',
    component: DistributionRule,
  },
  {
    name: 'DistributionShopIndex',
    component: DistributionShopIndex,
  },
  {
    name: 'InvitHome',
    component: InvitHome,
  },

  {
    name: 'GraphicMaterial',
    component: GraphicMaterial,
  },
  {
    name: 'OnlineService',
    component: OnlineService,
  },
  {
    name: 'Sign',
    component: Sign,
  },
  {
    name: 'CustomerOrderList',
    component: CustomerOrderList,
  },
  {
    name: 'StoreBags',
    component: StoreBags,
  },
  {
    name: 'CustomerOrderDetail',
    component: CustomerOrderDetail,
  },
  {
    name: 'CustomerOrderDetailSkus',
    component: CustomerOrderDetailSkus,
  },
  {
    name: 'DistributionGoodsDetail',
    component: DistributionGoodsDetail,
  },
  {
    name: 'InviteCode',
    component: InviteCode,
  },
  {
    name: 'MyCustomer',
    component: MyCustomer,
  },
  {
    name: 'DistributionGoodsList',
    component: DistributionGoodsList,
  },
  {
    name: 'PushSetting',
    component: PushSetting,
  },
  // {
  //   name: 'RewardCenter',
  //   component: RewardCenter,
  // },
  // {
  //   name: 'DistributionCenter',
  //   component: DistributionCenter,
  // },
  {
    name: 'ShopGoods',
    component: ShopGoods,
  },
  {
    name: 'PushCenter',
    component: PushCenter,
  },
  //消息中心
  {
    name: 'PushList',
    component: PushList
  },
  {
    name: 'StoreBagsGoodsDetail',
    component: StoreBagsGoodsDetail,
  },
  {
    name: 'ShopEdit',
    component: ShopEdit,
  },
  {
    name: 'GroupBuyDetail',
    component: GroupBuyDetail,
  },
  {
    name: 'GrouponRule',
    component: GrouponRule,
  },
  {
    name: 'IepInfo',
    component: IepInfo,
  },
  // {
  //   name: 'MaterialCircle',
  //   component: MaterialCircle,
  // },
  {
    name: 'PointsConfirmSuccess',
    component: PointsConfirmSuccess,
  },
  {
    name: 'PointsGoodsBill',
    component: PointsGoodsBill,
  },
  {
    name: 'PointsOrderConfirm',
    component: PointsOrderConfirm,
  },
  {
    name: 'GroupOrderList',
    component: GroupOrderList,
  },
  {
    name: 'GrouponSelection',
    component: GrouponSelection,
  },
  {
    name: 'GrouponSearchList',
    component: GrouponSearchList,
  },
  {
    name: 'GrouponCenter',
    component: GrouponCenter,
  },
  {
    name: 'SpellGroupDetail',
    component: SpellGroupDetail
  },
  {
    name: 'PointsMall',
    component: PointsMall,
  },
  {
    name: 'ImproveIepInfo',
    component: ImproveIepInfo,
  },
  {
    name: 'PointsOrderDetailSkus',
    component: PointsOrderDetailSkus,
  },
  {
    name: 'PointsOrderDetail',
    component: PointsOrderDetail,
  },
  {
    name: 'PointsOrderList',
    component: PointsOrderList,
  },
  {
    name:'PreBuy',
    component:PreBuy
  },
  {
    name: 'CombinationGoods',
    component: CombinationGoods
  },
  {
    name: 'CameraComponent',
    component: CameraComponent
  },
  {
    name: 'SpecialGoodsList',
    component: SpecialGoodsList
  },
  {
    name: 'EnterpriseApproval',
    component: EnterpriseApproval
  },
  {
    name: 'LinkChildAccount',
    component: LinkChildAccount
  },
  {
    name: 'LinkChildAdd',
    component: LinkChildAdd
  },
  {
    name: 'FriendPay',
    component: FriendPay
  },
  {
    name: 'SobotLink',
    component: SobotLink
  },
  {
    name: 'CateOnelevelList',
    component: CateOnelevelList
  },
  {
    name: 'MarketingModify',
    component: MarketingModify
  },
  {
    name: 'ClassifyPage',
    component: ClassifyPage
  },
  {
    name: 'GuideInvites',
    component: GuideInvites
  },
  {
    name: 'VideoPage',
    component: VideoPage
  },
];

// tabbar
const tabScreens = {
  Main: Main,//首页
  GoodsList: GoodsList,//商品列表
  UserCenter: UserCenter,//我的
  PurchaseOrder: PurchaseOrder,//购物车
  MaterialCircle: MaterialCircle,//发现
  DistributionCenter: DistributionCenter, //分销中心
  RewardCenter: RewardCenter, //奖励中心
  SpecialGoodsList: SpecialGoodsList, //特价列表
  SobotLink:SobotLink, //智齿客服
  AllList:AllList, //分类列表
  ClassifyPage:ClassifyPage, //分类页
  VideoPage:VideoPage //分类页
};
//非授权页面
const unAuthRoutes = {
  Login: 1,
  Register: 2,
  UserPassword: 3,
  Error: 4,
  NetBreak: 5,
  ImproveInformation: 6,
  ImproveResult: 7,
  RegisterAgreement: 8,
  UserPasswordSubmit: 9,
  WechatLogin: 10,
  GoodsEmpty: 11,
  InviteCode: 12,
  GrouponSelection: 13,
  GrouponRule: 14,
  ImproveIepInfo: 15,
  CameraComponent: 16,
  SpecialGoodsList: 17
};
//依赖开放设置的页面
 const openAccess = {
  Main: true,
  GoodsList: true,
  DistributionGoodsList: true,
  PurchaseOrder: true,
  PurchaseOrderWithoutBottom: true,
  GoodsDetail: true,
  UserCenter: true,
  StoreMain: true,
  StoreSearch: true,
  StoreFile: true,
  StoreGoodsList: true,
  StoreMember: true,
  StoreCateList: true,
  Search: true,
  StoreList: true,
  GoodsListWithoutBottom: true,
  GoodsListPromotion: true,
  CouponCenter: true,
  GoodsDetailEvaluationList: true,
  FlashSale: true,
  AllList: true,
  GrouponCenter: true,
  PointsMall: true,
  SpellGroupDetail: true,
  GrouponSearchList: true,
  CombinationGoods:true,
  CameraComponent: true,
  SpecialGoodsList: true,
  PageLink: true,
  SpecialGoodsListWithoutBottom: true
};
export {
  routersConfig,
  tabScreens,
  openAccess,
  unAuthRoutes
};
