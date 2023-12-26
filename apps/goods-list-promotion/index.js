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
export default class GoodsListPromotion extends React.Component {
  static navigationOptions = () => ({
    title: '商品',
    tabBarIcon: ({ focused }) => (
      <Image
        source={{ uri: focused ? ImgCode.GOODS_X : ImgCode.GOODS }}
        style={{ width: 24, height: 24 }}
      />
    )
  });

  UNSAFE_componentWillMount() {
    const state = this.props.route;
    const params = (state && state.params) || {}
    const { mid,stype } = params;
    this.store.init(Number(mid),stype);
  }

  render() {
    return <Container />;
  }
}
