import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { Relax } from 'plume2';
import MiniPurchase from 'wmkit/biz/mini-purchase/index';
import SearchBar from './search-bar';
import FilterBar from './filter-bar';
import Cate from './cate';
import Sort from './sort';
import List from './goods-list';
import Filter from './filter';

const isAndroid = Platform.OS == 'android';

/**
 * 商品列表顶级组件
 */
@Relax
export default class Container extends React.Component {
  static relaxProps = {
    tabName: 'tabName',
    showGoBack: 'showGoBack'
  };

  render() {
    const { tabName, showGoBack } = this.props.relaxProps;

    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <StatusBar barStyle={isAndroid ? 'light-content' : 'dark-content'} />
        <SearchBar />
        <FilterBar />
        <List />

        {/* 分类*/}
        <Cate hide={tabName !== 'goodsCate'} />

        {/*排序*/}
        {tabName === 'goodsSort' && <Sort />}

        {/*筛选*/}
        <Filter
          hasBottom={this.props.hasBottom}
          hide={tabName !== 'goodsFilter'}
        />

        {/*悬浮mini购物车*/}
        {showGoBack && <MiniPurchase />}
      </View>
    );
  }
}
