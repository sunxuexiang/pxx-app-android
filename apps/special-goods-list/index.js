import React from 'react';
import { Image } from 'react-native';
import { StoreProvider } from 'plume2';

import AppStore from './store';
import Container from './components/container';

/**
 * 特价商品列表模块
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class SpecialGoodsList extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '特价商品',
    tabBarVisible:
      navigation.state.params && navigation.state.params.tabBarVisible,
    tabBarIcon: ({ focused }) => (
      <Image
        source={
          focused
            ? require('./img/special-curr.png')
            : require('./img/special-1.png')
        }
        style={{ width: 24, height: 24 }}
      />
    )
  });

  UNSAFE_componentWillMount() {
    const state = this.props.route;
    const params = (state && state.params) || {};
    // 目录编号,目录名称,搜索关键字
    let { cateId, cateName, queryString, showGoBack } = params;
    queryString = queryString==="NONE"?"":queryString
    console.info('----------------- special queryString: -------------', queryString);
    this.store.init({ cateId, cateName, queryString, showGoBack });
  }

  render() {
    const navigation = this.props.navigation;
    const state = navigation.state || {};
    const routeName = state.routeName || '';
    const hasBottom = !routeName.endsWith('WithoutBottom');
    return <Container hasBottom={hasBottom} />;
  }
}
