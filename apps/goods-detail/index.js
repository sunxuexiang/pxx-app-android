import React, { Component } from 'react';
import {
  ScrollView,
  Platform,
  StatusBar,
  AppState,
  View,
  StyleSheet,
  Animated
} from 'react-native';
import WMImage from 'wmkit/image/index';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StoreProvider, msg } from 'plume2';
import WMWholesaleChoose from 'wmkit/goods-choose/wholesale-choose';
import WMRetailChoose from 'wmkit/goods-choose/retail-choose';
import { _, WMRecommendList } from 'wmkit';
import ImgSlider from './components/img-slider';
import ImgRetailSlider from './components/img-retail-slider';
import GoodsTitle from './components/goods-title';
import GoodsPriceWholesale from './components/goods-price-wholesale';
import GoodsPriceRetail from './components/goods-price-retail';
import Promotion from './components/promotion';
import GoodsSpec from './components/goods-spec';
import GoodsEvaluation from './components/goods-evaluation';
import GoodsDesc from './components/goods-desc';
import GoodsBottom from './components/goods-bottom';
import StoreName from './components/store-name';
import PanelBottom from './components/panel-bottom';
import GoodsShare from './components/goods-share';
import GoodsCoupon from './components/goods-coupon';
import CouponPanel from './components/coupon-panel';
import AppStore from './store';
import ImgShare from './components/img-share';
import GoodsTopButton from './components/goods-top-button';
import NowSpellGroup from './components/now-spell-group';
import ShareModal from 'wmkit/goods-share-modal';
import GoodsRushBuy from './components/goods-rush-buy';
import GoodsDetailPricePoints from './components/goods-price-points';
import WMPointsChoose from 'wmkit/goods-choose/points-goods-choose';
import CombinationGoods from './components/combination-goods';
import MenuBox from '../../wmkit/biz/menu-box';
import PreBuy from './components/per-buy';
import Presale from './components/presale';
import BuyStatus from './components/buy-status';
import PresaleStatus from './components/presale-status';
import GoodsAppointmentRule from './components/goods-appointment-rule';
import GoodsPreSaleRule from './components/goods-presale-rule';
import SkeletonDetail from './components/skeleton-detail';
import DetailNav from './components/detail-nav';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as WMkit from 'wmkit/kit';
import { Const } from 'wmkit/const';
const isAndroid = Platform.OS === 'android';
import Address from './components/address';
import BigModal from '../../wmkit/modal/BigModel';
import GoodsDate from './components/goods-date';
import GoodsShelflife from './components/goods-shelflife';
@StoreProvider(AppStore, { debug: __DEV__ })
export default class GoodsDetail extends Component {
  store;

  constructor(props) {
    super(props);
    this.state = {
      skuId: '',
      pointsGoodsId: '',
      //进入商品详情页的入口类型
      type: '',
      currentAppState: AppState.currentState,
      scrollY: new Animated.Value(0),
      imgHeight: -1,
      infoHeight: -1,
      evaluationHeight: -1
    };
  }
  UNSAFE_componentWillMount() {
    // 是否是编辑状态
    const state = this.props.route;
    const { skuId } = (state && state.params) || {};
    const { pointsGoodsId } = (state && state.params) || {};
    const { type } = (state && state.params) || {};
    //初始化
    this.store.init(skuId, pointsGoodsId);
    this.setState({ skuId: skuId, pointsGoodsId: pointsGoodsId, type: type });
  }

  componentDidMount() {
    //监听状态改变事件
    AppState.addEventListener('change', (appState) =>
      this._handleAppStateChange(appState)
    );
  }

  componentWillUnmount() {
    //删除状态改变事件监听
    AppState.removeEventListener('change', (appState) =>
      this._handleAppStateChange(appState)
    );
  }

  //状态改变响应
  async _handleAppStateChange(appState) {
    //app至于后台 在切换过规格信息之后不刷新
    const changeSpecInfoFlag = await AsyncStorage.getItem('changeSpecInfoFlag');
    if (appState === 'active' && changeSpecInfoFlag === '1') {
      this.store.init(this.state.skuId, this.state.pointsGoodsId);
    }
    AsyncStorage.removeItem('changeSpecInfoFlag');
  }

  render() {
    const state = this.store.state();
    const loadingStatus = state.get('loadingStatus');
    const pointsGoodsId = this.state.pointsGoodsId;
    const couponShow = state.get('couponShow');
    const couponLabels = state.get('couponLabels');
    const saleType = state.getIn(['goods', 'saleType']);
    const isMenuBoxFlag = state.get('isMenuBoxFlag');
    const menuList = state.get('menuList');
    const isPay = state.get('isPay');
    const type = this.state.type;

    const goodsInfo = this.store.state().get('goodsInfo');
    const goodsLabels = goodsInfo.toJS().goodsLabels
    const geolocationVisible = this.store.state().get('geolocationVisible');
    const buyPoint = goodsInfo.get('buyPoint');
    const showVideo = state.get('showVideo');

    //当商品允许分销且分销审核通过，视为分销商品，不展示促销和优惠券
    const distributionFlag =
      this.store.state().get('goodsInfo').get('distributionGoodsAudit') == '2';

    //当前选中商品是否为正在进行的抢购活动
    let flashsaleGoodsFlag = false;
    let flashsalePrice;
    let flashsaleGoods;
    const selectdGoodsInfoId = this.store
      .state()
      .getIn(['goodsInfo', 'goodsInfoId']);

    // 积分价商品、预约、预售不展示秒杀信息
    this.store
      .state()
      .get('flashsaleGoods')
      .map((v) => {
        if (
          v.get('goodsInfoId') == selectdGoodsInfoId &&
          v.get('stock') >= v.get('minNum') &&
          !buyPoint
        ) {
          flashsaleGoodsFlag = true;
          flashsalePrice = v.get('price');
          flashsaleGoods = v;
        }
      });
    //企业购信息-企业购开关、企业购设置
    // iep属性
    const iepDetail = this.store.state().get('iepDetail');
    let spuContext = this.store.state().get('spuContext');
    let goodsInfos = spuContext.get('goodsInfos');
    let stockEnough=false;
    if (goodsInfos){
      goodsInfos.forEach(
        param=>{
          if (param.get('stock')>0){
            stockEnough=true;
            return;
          }
        }
      )
    }else {
      stockEnough=true
    }
    let specialGoodsFlag=false;
    if (goodsInfos){
      specialGoodsFlag=goodsInfos.get(0).get('goodsInfoType')==1;
    }
    const addressModalVisible = this.store.state().get('addressModalVisible');
    return [
      isAndroid ? null : <StatusBar barStyle="dark-content" key="1" />,
      <GoodsTopButton
        key={'GoodsTopButton'}
        flashsaleGoodsFlag={flashsaleGoodsFlag}
        stickyImgY={this.state.imgHeight}
        stickyScrollY={this.state.scrollY}
      />,
      <Animated.ScrollView
        key="tab"
        ref={(r) => (this._scrollTabBarView = r)}
        // keyboardShouldPersistTaps="always"
        style={{
          zIndex: -1,
          position: 'relative',
          backgroundColor: '#f5f5f5'
        }}
        contentContainerStyle={{ flexGrow: 1 }}
        automaticallyAdjustContentInsets={false}
        onScroll={
          Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: this.state.scrollY } } // 记录滑动距离
              }
            ],
            { useNativeDriver: true }
          ) // 使用原生动画驱动
        }
        scrollEventThrottle={1}
      >
        <View
          onLayout={(e) => {
            let { height } = e.nativeEvent.layout;
            this.setState({ imgHeight: height }); // 给头部高度赋值
          }}
        >
          {/*轮播动图*/}
          {saleType === 0 ? (
            <ImgSlider
              stockEnough={stockEnough}
              stickyImgY={this.state.imgHeight}
              stickyScrollY={this.state.scrollY}
            />
          ) : (
            <ImgRetailSlider
              stockEnough={stockEnough}
              stickyImgY={this.state.imgHeight}
              stickyScrollY={this.state.scrollY}
            />
          )}
        </View>

        <View
          onLayout={(e) => {
            let { height } = e.nativeEvent.layout;
            this.setState({ infoHeight: height }); // 给详情高度赋值
          }}
        >

          {/*价格信息*/}
          {pointsGoodsId && !flashsaleGoodsFlag ? (
            <GoodsDetailPricePoints />
          ) : flashsaleGoodsFlag ? (
            <View>
              <GoodsRushBuy flashsaleGoods={flashsaleGoods} />
              <GoodsPriceRetail
                flashsalePrice={flashsalePrice}
                flashsaleGoodsFlag={flashsaleGoodsFlag}
                flashsaleGoods={flashsaleGoods}
                pointsGoodsId={pointsGoodsId}
              />
            </View>
          ) : saleType === 0 ? (
            <GoodsPriceWholesale />
          ) : (
            <GoodsPriceRetail
              flashsalePrice={flashsalePrice}
              flashsaleGoodsFlag={flashsaleGoodsFlag}
              pointsGoodsId={pointsGoodsId}
            />
          )}
          {goodsLabels && (
          <View className="goods-spec">
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                paddingVertical: 5,
                backgroundColor:'#ffffff'
              }}
            >
              {goodsLabels.map((item) => {
                return (
                  <WMImage
                    key={item.id}
                    style={{width: 30, height: 30, marginHorizontal:10}}
                    src={JSON.parse(item.image)[0].url}
                  />
                );
              })}
            </View>
          </View>
        )}
          {/*商品名称*/}
          <GoodsTitle />
          {/*生产日期*/}
          {!specialGoodsFlag && <GoodsDate />}
          {/*保质期*/}
          <GoodsShelflife />
          {/*优惠券 以及 促销信息*/}
          {!pointsGoodsId &&
          state.get('goodsInfo') &&
          state.get('goodsInfo').get('distributionGoodsAudit') != '2' &&
          !flashsaleGoodsFlag &&
          couponLabels.count() ? (
            <GoodsCoupon />
          ) : null}
          {/* 促销 */}
          {!distributionFlag &&
            state.get('goodsInfo') &&
            state.get('goodsInfo').get('marketingLabels') &&
            state.get('goodsInfo').get('marketingLabels').size > 0 &&
            !flashsaleGoodsFlag && <Promotion />}
          {/*规格*/}
          <GoodsSpec />
          {/*地址*/}
          <Address />
          {/* 组合购 */}
          <CombinationGoods />
        </View>
        <View
          onLayout={(e) => {
            let { height } = e.nativeEvent.layout;
            this.setState({ evaluationHeight: height }); // 给评价高度赋值
          }}
        >
          {/* 评价 */}
          {state.get('isShow') && !state.get('top3Evaluate').isEmpty() ? (
            <GoodsEvaluation />
          ) : null}
          {/*店铺*/}
          {/* <StoreName />*/}
        </View>
        {/*商品详情*/}
        <GoodsDesc />
        <View style={styles.recommend}>
          {/*为你推荐*/}
          <WMRecommendList type={'4'} />
        </View>

        {/* 骨架屏 */}
        {loadingStatus && (
          <View style={styles.skeleton}>
            <SkeletonDetail />
          </View>
        )}
      </Animated.ScrollView>,
      !loadingStatus && (
        <GoodsBottom
          key="4"
          flashsaleGoodsFlag={flashsaleGoodsFlag}
          flashsaleGoods={flashsaleGoods}
          stockEnough={stockEnough}
          specialGoodsFlag={specialGoodsFlag}
        />
      ),
      this.state.imgHeight > 0 && !showVideo && (
        <DetailNav
          key={'DetailNav'}
          scrollTo={(scrollY) => {
            if (this._scrollTabBarView) {
              this._scrollTabBarView.scrollTo({
                x: 0,
                y: scrollY + 1,
                animated: true
              });
            }
          }}
          stickyImgY={this.state.imgHeight}
          stickyInfoY={this.state.infoHeight}
          stickyevaluationY={this.state.evaluationHeight}
          stickyScrollY={this.state.scrollY}
        />
      ),
      <PanelBottom key="6" />,
      <GoodsShare key="7" flashsaleGoodsFlag={flashsaleGoodsFlag} />,
      <ImgShare key="8" />,

      //批发多规格弹框
      <WMWholesaleChoose
        key="9"
        data={this.store.state().get('spuContext').toJS()}
        visible={state.get('showWholeSaleVisible')}
        changeSpecVisible={this.store.changeWholesaleVisible}
        isPay={isPay}
        _didConfirm={this.store.didConfirm}
      />,
      //零售销售类型-规格选择弹框
      <WMRetailChoose
        isGoodsDetail={true}
        key="10"
        data={this.store.state().get('spuContext').toJS()}
        visible={state.get('showRetailSaleVisible')}
        changeSpecVisible={this.store.changeRetailSaleVisible}
        dataCallBack={this.store.changeSpecVisibleAndRender}
        flashsaleGoodsFlag={flashsaleGoodsFlag}
        flashsaleGoods={flashsaleGoods}
        iepInfo={iepDetail}
        _didConfirm={this.store.didConfirm}
        isPay={isPay}
        stockEnough={stockEnough}
      />,
      //积分类型-规格选择弹框
      <WMPointsChoose
        key="13"
        data={this.store.state().get('spuContext').toJS()}
        visible={state.get('pointsExchangeVisible')}
        changeSpecVisible={this.store.changePointsExchangeVisible}
        dataCallBack={this.store.changeSpecVisibleAndRender}
      />,

      state.get('isAddrSelShow') && (
        <GoodsAddressSelect
          deliveryAddressId={state.get('deliveryAddressId')}
          areaIds={state.get('areaIds') ? state.get('areaIds').toJS() : []}
          onCancel={() => {
            this.store.setAddrSelShow(false);
          }}
          onSelect={(params) => {
            this.store.onSelectAddress(params);
          }}
        />
      ),
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
      this.store.state().get('appointmentRuleVisible') && (
        <GoodsAppointmentRule key="15" />
      ),
      this.store.state().get('preSaleRuleVisible') && (
        <GoodsPreSaleRule key="16" />
      ),
      isMenuBoxFlag && (
        <MenuBox
          key="14"
          style={{
            ..._.ifIphoneX(
              {
                top: 80
              },
              {
                top: 70
              }
            )
          }}
          changeShow={this.store.handClick}
          menuList={menuList}
        />
      ),
      <BigModal
        visibility={geolocationVisible}
        title='定位服务未开启'
        message='请进入系统【设置】》【隐私】[定位服务]中打开开关，并允许超级大白鲸使用定位服务'
        btnText='立即开启'
        onRequestClose={()=>this.store.setGeolocationVisible()}
        onBtnPress={()=>this.store.openSettings()}
      />,
      <BigModal
        visibility={addressModalVisible}
        title='暂无收货地址'
        message='请前往个人中心设置收货地址'
        btnText='设置地址'
        onRequestClose={()=>this.store.setModalVisible()}
        onBtnPress={()=>this.btnSuccess()}
      />
    ];
  }

  btnSuccess=()=>{
    this.store.setModalVisible();
    msg.emit('router: goToNext', { routeName: 'UserReceiveAddress' });
  }
}

const styles = StyleSheet.create({
  recommend: {
    ..._.ifIphoneX(
      {
        marginBottom: 80,
      },
      {
        marginBottom: 48,
      }
    ),
    paddingHorizontal: 12,
  },
  skeleton: {
    position: 'absolute',
    top: 0,
    zIndex: 100,
    ..._.ifIphoneX(
      {
        bottom: 90
      },
      {
        bottom: 56
      }
    )
  }
})
