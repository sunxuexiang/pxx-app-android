import { noop } from './noop.js';
import * as Button from './button';
import * as _ from './common/util';
import Fetch from './fetch';
import NumInput from './num-input';
import AddCart from './add-cart';
import FormInput from './form/form-input';
import FormSelect from './form/form-select';
import FormSelectBase from './form/form-select-base';
import FormSelectReq from './form/form-select-req';
import FormRegexUtil from './form/form-regex';
import FormItem from './form/form-item';
import DatePicker from './date-picker';
// import * as WMkit from './kit';
import * as WMkit from './kit';
import * as VAS from './vas';
import { link, setModalShow, fetchModal } from './adv-modal';
import { config } from './config';
import { cache } from './cache';
import Check from './check';
import * as FindArea from './area/area';
import { Alert } from './modal/alert';
import { Confirm } from './modal/confirm';
import WmModal from './modal/modal';
import RadioBox from './radio-box';
import Tip from './modal/tip';
import { region } from './region/China_region_wx';
import AreaPicker from './picker';
import ProgressBar from './progress-bar';
import WMImage from './image/index';
import { ImgCode } from './img-code';
import WmListView from './list-view/index';
import WmUpload from './upload';
import { Const } from './const';
import GiftList from './gift-list';
import SkuList from './goods-list';
import RadioHook from './radio-hook';
import OrderWrapper from './order-wrapper';
import Loading from './loading';
import WMSplashScreen from './splash-screen';
import { myPvUvStatis } from './wm_sta';
import Header from './header';
import AutoGrowingTextInput from './autoGrowingTextInput';
import ValidConst from './validate';
import * as share from './share';

import * as thirdLogin from './third-login';
import * as ossUtil from './oss-util';
import WMImgPreview from './img-preview';
import WMLoginModal from './login-modal';
import LevelTag from './level-tag';
import WMWholesaleChoose from './goods-choose/wholesale-choose';
import WMRetailChoose from './goods-choose/retail-choose';
import WMGrouponChoose from './goods-choose/groupon-choose';
import WMVideo from './video';
import WMCouponLabel from './coupon-label';
import WMEmpty from './empty';
import HintBar from './hint-bar';
import ShareModal from './goods-share-modal';
import Rating from './rating';
import CountDown from './count-down';
import WMGrouponFooter from './groupon-footer';
import WMIntegralFooter from './integral-footer';
import PhysiquePicker from './physique-picker';

import VASConst from './VAS-Const';
import * as FindBusiness from './business/business';
import BusinessIndustryPicker from './business-industy-picker';
import BusinessEmployeeNumPicker from './business-employee-num-picker';
import Price from './price';
import { getHashParam } from './url-helper';
//推荐
import WMRecommendList from './recommend-list';

export {
  noop,
  Button,
  _,
  Fetch,
  NumInput,
  AddCart,
  FormInput,
  FormSelect,
  FormSelectBase,
  FormRegexUtil,
  FormItem,
  DatePicker,
  WMkit,
  link,
  setModalShow,
  fetchModal,
  VAS,
  config,
  cache,
  Check,
  FindArea,
  Alert,
  Confirm,
  WmModal,
  RadioBox,
  Tip,
  region,
  AreaPicker,
  ProgressBar,
  WMImage,
  ImgCode,
  WmUpload,
  WmListView,
  Const,
  GiftList,
  SkuList,
  RadioHook,
  OrderWrapper,
  Loading,
  WMSplashScreen,
  myPvUvStatis,
  Header,
  AutoGrowingTextInput,
  ValidConst,
  share,
  thirdLogin,
  ossUtil,
  WMImgPreview,
  WMLoginModal,
  LevelTag,
  WMWholesaleChoose,
  WMRetailChoose,
  WMVideo,
  WMCouponLabel,
  WMEmpty,
  HintBar,
  ShareModal,
  Rating,
  WMGrouponChoose,
  CountDown,
  WMGrouponFooter,
  WMIntegralFooter,
  VASConst,
  FindBusiness,
  BusinessIndustryPicker,
  BusinessEmployeeNumPicker,
  PhysiquePicker,
  FormSelectReq,
  Price,
  getHashParam,
  WMRecommendList
};
