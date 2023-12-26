import React from 'react';
import { Image } from 'react-native';
import { StoreProvider } from 'plume2';

import AppStore from './store';
import Container from './components/container';

/**
 * 推广商品列表模块
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class GoodsList extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '推广商品',
    tabBarVisible:
      navigation.state.params && navigation.state.params.tabBarVisible,
    tabBarIcon: ({ focused }) => (
      <Image
        source={
          focused
            ? require('./img/goods_focused.png')
            : require('./img/goods.png')
        }
        style={{ width: 24, height: 24 }}
      />
    )
  });

  UNSAFE_componentWillMount() {
    const state = this.props.route;
    const params = (state && state.params) || {}
    // 目录编号,目录名称,搜索关键字
    const { cateId, cateName, queryString, showGoBack } = params;
    this.store.init({ cateId, cateName, queryString, showGoBack });
    this.store.fetchBaseConfig();
  }

  render() {
    const state = this.props.route;
    const routeName = state.name || '';
    const hasBottom = !routeName.endsWith('WithoutBottom');
    return <Container hasBottom={hasBottom} />;
  }
}
