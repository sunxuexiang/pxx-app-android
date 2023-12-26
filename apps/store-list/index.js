import React, { Component } from 'react';
import { View } from 'react-native';
import { StoreProvider } from 'plume2';
import AppStore from './store';

import SearchBar from './components/search-bar';
import List from './components/list';
import Filter from './components/filter';
@StoreProvider(AppStore, { debug: __DEV__ })
export default class StoreList extends Component {
  componentDidMount() {
    // 搜索关键字
    // 店铺列表带搜索条件目前仅有一个来源：从搜索页面进行搜索
    const state = this.props.route;
    const params = (state && state.params) || {};
    const queryString = params.queryString;
    this.store.init(queryString);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        {/* 搜索框 */}
        <SearchBar />
        {/* 店铺分页列表 */}
        <List />
        {/* 筛选 */}
        <Filter />
      </View>
    );
  }
}
