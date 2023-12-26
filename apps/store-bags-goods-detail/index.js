import React, { Component } from 'react';
import { ScrollView, Platform, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StoreProvider } from 'plume2';
import ImgSlider from './components/img-slider';
import GoodsTitle from './components/goods-title';
import GoodsPriceRetail from './components/goods-price-retail';
import GoodsSpec from './components/goods-spec';
import GoodsDesc from './components/goods-desc';
import GoodsBottom from './components/goods-bottom';
import GoodsTopButton from './components/goods-top-button';
import AppStore from './store';

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
    const { skuId } = (state && state.params) || {};
    //初始化
    this.store.init(skuId);
  }

  render() {
    return [
      isAndroid ? null : <StatusBar barStyle="dark-content" key="1" />,
      <KeyboardAwareScrollView key="2">
        <ScrollView
          ref={(r) => (this.bigView = r)}
          style={{ backgroundColor: '#fff', zIndex: -1 }}
          keyboardShouldPersistTaps="always"
        >
          <ImgSlider />
          {/*商品名称,收藏*/}
          <GoodsTitle />
          {/*价格信息*/}
          <GoodsPriceRetail />
          {/*规格*/}
          <GoodsSpec />
          {/*商品详情*/}
          <GoodsDesc />
        </ScrollView>
      </KeyboardAwareScrollView>,
      <GoodsBottom key="3" />,
      <GoodsTopButton key="4" />
    ];
  }
}
