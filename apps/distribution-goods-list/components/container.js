import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { Relax } from 'plume2';
import { fromJS } from 'immutable';
import MiniPurchase from 'wmkit/biz/mini-purchase/index';
import ShareModal from 'wmkit/goods-share-modal';
import { noop } from 'wmkit/noop';


import SearchBar from './search-bar';
import FilterBar from './filter-bar';
import Cate from './cate';
import Sort from './sort';
import List from './goods-list';
import Filter from './filter';
import GoodsShare from './goods-share';

const isAndroid = Platform.OS == 'android';

/**
 * 商品列表顶级组件
 */
@Relax
export default class Container extends React.Component {
  static relaxProps = {
    tabName: 'tabName',
    showGoBack: 'showGoBack',
    checkedSku: 'checkedSku',
    shareModalVisible: 'shareModalVisible',
    addSelfShop: 'addSelfShop',
    toggleShareModal: noop,
    logo: 'logo'
  };

  render() {
    const {
      tabName,
      showGoBack,
      checkedSku,
      shareModalVisible,
      addSelfShop,
      toggleShareModal,
      logo
    } = this.props.relaxProps;

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

        <GoodsShare />

        {checkedSku.size > 0 &&
          !!shareModalVisible && (
            <ShareModal
              addSelfShop={addSelfShop}
              //商品SKU信息
              goodsInfo={checkedSku}
              goods={fromJS({})}
              //商城logo
              logo={logo}
              //分享类型
              shareType={2}
              shareModalVisible={shareModalVisible}
              //弹窗关闭
              closeVisible={toggleShareModal}
            />
          )}
      </View>
    );
  }
}
