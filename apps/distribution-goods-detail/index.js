import React, { Component } from 'react';
import { ScrollView, Platform, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StoreProvider } from 'plume2';
import WMWholesaleChoose from 'wmkit/goods-choose/wholesale-choose';
import WMRetailChoose from 'wmkit/goods-choose/retail-choose';
import ShareModal from 'wmkit/goods-share-modal';

import ImgSlider from './components/img-slider';
import ImgRetailSlider from './components/img-retail-slider';
import GoodsTitle from './components/goods-title';
import GoodsPriceWholesale from './components/goods-price-wholesale';
import GoodsPriceRetail from './components/goods-price-retail';
import GoodsSpec from './components/goods-spec';
import GoodsDesc from './components/goods-desc';
import GoodsBottom from './components/goods-bottom';
import StoreName from './components/store-name';
import PanelBottom from './components/panel-bottom';
import GoodsShare from './components/goods-share';
import AppStore from './store';
import ImgShare from './components/img-share';
import GoodsTopButton from './components/goods-top-button';

const isAndroid = Platform.OS === 'android';
@StoreProvider(AppStore, { debug: __DEV__ })
export default class GoodsDetail extends Component {
  store;

  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {
    // 是否是编辑状态
    const state = this.props.route;
    const { skuId, goodsId } = (state && state.params) || {};
    //初始化
    this.store.init(goodsId, skuId);
  }

  render() {
    const state = this.store.state();
    const saleType = state.getIn(['goods', 'saleType']);
    return [
      isAndroid ? null : <StatusBar barStyle="dark-content" key="1" />,
      <KeyboardAwareScrollView key="2">
        <ScrollView
          ref={(r) => (this.bigView = r)}
          style={{ backgroundColor: '#fff', zIndex: -1 }}
          keyboardShouldPersistTaps="always"
        >
          {/*轮播动图*/}
          {saleType === 0 ? <ImgSlider /> : <ImgRetailSlider />}
          {/*商品名称,收藏*/}
          <GoodsTitle />
          {/*价格信息*/}
          {saleType === 0 ? <GoodsPriceWholesale /> : <GoodsPriceRetail />}
          {/*规格*/}
          <GoodsSpec />
          {/*店铺*/}
          <StoreName />
          {/*商品详情*/}
          <GoodsDesc />
        </ScrollView>
      </KeyboardAwareScrollView>,
      <GoodsBottom key="3" />,
      <GoodsTopButton key="4" />,
      <PanelBottom key="6" />,
      <GoodsShare key="7" />,
      <ImgShare key="8" />,
      this.store
        .state()
        .get('spuContext').size > 0 && state.get('showWholeSaleVisible') && <WMWholesaleChoose
        key="9"
        data={this.store
          .state()
          .get('spuContext')
          .toJS()}
        visible={state.get('showWholeSaleVisible')}
        changeSpecVisible={this.store.changeWholesaleVisible}
      />,//零售销售类型-规格选择弹框
      this.store
        .state()
        .get('spuContext').size > 0 && state.get('showRetailSaleVisible') && <WMRetailChoose
        key="10"
        data={this.store
          .state()
          .get('spuContext')
          .toJS()}
        visible={state.get('showRetailSaleVisible')}
        changeSpecVisible={this.store.changeRetailSaleVisible}
        dataCallBack={this.store.changeSpecVisibleAndRender}
      />,
      this.store.state().get('goodsInfo').size > 0 &&
      this.store.state().get('shareModalVisible') && (
        <ShareModal
          addSelfShop={false}
          //商品SKU信息
          goodsInfo={this.store.state().get('goodsInfo')}
          goods={this.store.state().get('goods')}
          //商城logo
          logo={this.store.state().get('logo')}
          key="12"
          //分享类型
          shareType={1}
          shareModalVisible={this.store.state().get('shareModalVisible')}
          //弹窗关闭
          closeVisible={this.store.toggleShareModal}
        />
      )
    ];
  }
}
