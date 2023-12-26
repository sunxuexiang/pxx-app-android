import React, { Component } from 'react';
import { ScrollView, Platform, StatusBar, AppState } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StoreProvider } from 'plume2';
import WMGrouponChoose from 'wmkit/goods-choose/groupon-choose';
import ShareModal from 'wmkit/goods-share-modal';

import ImgSlider from './components/img-slider';
import ImgRetailSlider from './components/img-retail-slider';
import GoodsTitle from './components/goods-title';
import Promotion from './components/promotion';
import GoodsSpec from './components/goods-spec';
import GoodsDesc from './components/goods-desc';
import GoodsBottom from './components/goods-bottom';
import StoreName from './components/store-name';
import PanelBottom from './components/panel-bottom';
import GoodsShare from './components/goods-share';
import GoodsCoupon from './components/goods-coupon';
import CouponPanel from './components/coupon-panel';
import AppStore from './store';
import GroupInfo from './components/group-info';
import JoinGroup from './components/join-group';
import PlayWay from './components/play-way';
import ImgShare from './components/img-share';
import GroupBuyTip from './components/group-buy-tip';
import WaitGroupModal from './components/wait-group-modal';
import GoodsTopButton from './components/goods-top-button';
import GoodsPriceRetail from './components/goods-price-retail';
const isAndroid = Platform.OS === 'android';
@StoreProvider(AppStore, { debug: __DEV__ })
export default class SpellGroupDetail extends Component {
  store;

  constructor(props) {
    super(props);
    this.flage = false;
  }

  UNSAFE_componentWillMount() {
    // 是否是编辑状态
    const state = this.props.route;
    const { skuId } = (state && state.params) || {};
    //初始化
    this.store.init(skuId);
  }
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange = (nextAppState) => {
    if (nextAppState != null && nextAppState === 'active') {
      //如果是true ，表示从后台进入了前台 ，请求数据，刷新页面。或者做其他的逻辑
      this.store.queryServerTime();
    }
  };
  render() {
    const state = this.store.state();
    const couponShow = state.get('couponShow');
    const couponLabels = state.get('couponLabels');
    const saleType = state.getIn(['goods', 'saleType']);
    const joinGroup = this.store.state().get('grouponInsts');
    return [
      isAndroid ? null : <StatusBar barStyle="dark-content" key="1" />,
      <KeyboardAwareScrollView key="2">
        <ScrollView
          ref={(r) => (this.bigView = r)}
          style={{ backgroundColor: '#f5f5f5', zIndex: -1 }}
          keyboardShouldPersistTaps="always"
        >
          {/*轮播动图*/}
          {saleType === 0 ? <ImgSlider /> : <ImgRetailSlider />}
          {/* 拼团信息 */}
          <GroupInfo />
          {/* 价格 */}
          <GoodsPriceRetail />
          {/*商品名称,收藏*/}
          <GoodsTitle />
          {/*优惠券 以及 促销信息*/}
          {couponLabels.count() ? <GoodsCoupon /> : null}
          {/* {state.get('goodsInfo').size > 0 &&
            state.get('goodsInfo').get('marketingLabels').size > 0 ? (
              <Promotion />
            ) : null} */}
          {/*规格*/}
          <GoodsSpec />
          {/* 开团列表 */}
          {joinGroup.size > 0 && <JoinGroup />}

          {/*店铺*/}
          {/* <StoreName /> */}
          {/* 拼团玩法 */}
          <PlayWay />
          {/*商品详情*/}
          <GoodsDesc />
        </ScrollView>
      </KeyboardAwareScrollView>,
      <GroupBuyTip key="3" />,
      <GoodsBottom key="4" />,
      <GoodsTopButton key="5" />,
      <GoodsShare key="6" />,
      <ImgShare key="7" />,
      <PanelBottom key="8" />,
      <WMGrouponChoose
        //开团标识
        key="10"
        openGroupon={true}
        grouponData={state.get('grouponDetails').toJS()}
        data={state.get('spuContext').toJS()}
        visible={state.get('showRetailSaleVisible')}
        changeSpecVisible={this.store.changeRetailSaleVisible}
        dataCallBack={this.store.changeSpecVisibleAndRender}
      />,
      couponShow && <CouponPanel key="11" />,
      this.store.state().get('goodsInfo').size > 0 &&
        this.store.state().get('shareModalVisible') && (
          <ShareModal
            addSelfShop={this.store.state().get('addSelfShop')}
            //商品SKU信息
            goodsInfo={this.store.state().get('goodsInfo')}
            goods={this.store.state().get('goods')}
            //商城logo
            logo={this.store.state().get('logo')}
            key="12"
            //分享类型
            shareType={2}
            shareModalVisible={this.store.state().get('shareModalVisible')}
            //弹窗关闭
            closeVisible={this.store.toggleShareModal}
          />
        ),
      this.store.state().get('waitGroupModal') && <WaitGroupModal key="13" />
    ];
  }
}
