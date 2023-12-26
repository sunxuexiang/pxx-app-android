import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { Relax } from 'plume2';
import { fromJS } from 'immutable';
import ShareModal from 'wmkit/goods-share-modal';
import WMWholesaleChoose from 'wmkit/goods-choose/wholesale-choose';
import WMRetailChoose from 'wmkit/goods-choose/retail-choose';
import { noop } from 'wmkit/noop';

import MiniPurchase from 'wmkit/biz/mini-purchase/index';
import SearchBar from './search-bar';
import FilterBar from './filter-bar';
import Cate from './cate';
import Sort from './sort';
import List from './goods-list';
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
    chosenSpu: 'chosenSpu',
    wholesaleVisible: 'wholesaleVisible',
    retailVisible: 'retailVisible',
    changeWholesaleVisible: noop,
    changeRetailVisible: noop,
    checkedSku: 'checkedSku',
    addSelfShop: 'addSelfShop',
    shareModalVisible: 'shareModalVisible',
    toggleShareModal: noop,
    iepInfo: 'iepInfo'
  };

  render() {
    const {
      tabName,
      chosenSpu,
      wholesaleVisible,
      retailVisible,
      changeWholesaleVisible,
      changeRetailVisible,
      checkedSku,
      addSelfShop,
      shareModalVisible,
      toggleShareModal,
      iepInfo
    } = this.props.relaxProps;
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <StatusBar barStyle={isAndroid ? 'light-content' : 'dark-content'} />
        <SearchBar storeId={this.props.storeId} />
        <FilterBar />
        <List />
        {/*悬浮mini购物车*/}
        <MiniPurchase />
        {/* 分类*/}
        <Cate hide={tabName !== 'goodsCate'} storeId={this.props.storeId} />
        {/*排序*/}
        {tabName === 'goodsSort' && <Sort />}

        {/*批发销售类型-规格选择弹框*/}
        <WMWholesaleChoose
          data={chosenSpu}
          visible={wholesaleVisible}
          changeSpecVisible={changeWholesaleVisible}
        />

        {/*零售销售类型-规格选择弹框*/}
        <WMRetailChoose
          data={chosenSpu}
          visible={retailVisible}
          changeSpecVisible={changeRetailVisible}
          iepInfo={iepInfo}
        />
        <GoodsShare />
        {checkedSku.size > 0 &&
          !!shareModalVisible && (
            <ShareModal
              addSelfShop={addSelfShop}
              //商品SKU信息
              goodsInfo={checkedSku}
              goods={fromJS({})}
              //商城logo
              logo={''}
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
