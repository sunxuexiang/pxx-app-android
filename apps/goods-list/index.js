import React from 'react';
import { StoreProvider } from 'plume2';

import AppStore from './store';
import Container from './components/container';

/**
 * 商品列表模块
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class GoodsList extends React.Component {
  UNSAFE_componentWillMount() {
    const state = this.props.route;
    const params = (state && state.params) || {};
    // 目录编号,目录名称,搜索关键字
    const { cateId, cateName, queryString, showGoBack } = params;
    this.store.init({ cateId, cateName, queryString, showGoBack });
  }

  render() {
    const state = this.props.route;
    const routeName = state.name || '';
    const hasBottom = !routeName.endsWith('WithoutBottom');
    return <Container hasBottom={hasBottom} />;
  }
}
