import React from 'react';
import { Image } from 'react-native';
import { StoreProvider } from 'plume2';
import { ImgCode } from 'wmkit/img-code';

import AppStore from './store';
import Container from './components/container';

/**
 * 商品列表模块
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class CouponPromotion extends React.Component {
  static navigationOptions = () => ({
    title: '商品',
    tabBarIcon: ({ focused }) => (
      <Image
        source={{ uri: focused ? ImgCode.GOODS_X : ImgCode.GOODS }}
        style={{ width: 24, height: 24 }}
      />
    )
  });

  componentDidMount() {
    const state = this.props.route;
    const params = (state && state.params) || {}
    const { couponId, activityId } = params;
    this.store.init(couponId, activityId);
  }

  render() {
    return <Container />;
  }
}
