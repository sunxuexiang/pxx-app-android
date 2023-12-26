import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { Relax } from 'plume2';
import { fromJS } from 'immutable';
import { WMWholesaleChoose, WMRetailChoose, noop, ShareModal } from 'wmkit';
import { MiniPurchase } from 'wmkit/biz';

import SearchBar from './search-bar';
import FilterBar from './filter-bar';
import Cate from './cate';
import Sort from './sort';
import List from './goods-list';
import Filter from './filter';
import GoodsShare from './goods-share';
import WMSpecialChoose from '../../../wmkit/goods-choose/special-choose';

const isAndroid = Platform.OS === 'android';

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
    logo: 'logo',
    showShare: 'showShare',
    iepInfo: 'iepInfo',
    specialVisible: 'specialVisible',
    changeSpecialVisible: noop
  };

  render() {
    const {
      tabName,
      showGoBack,
      chosenSpu,
      wholesaleVisible,
      retailVisible,
      changeWholesaleVisible,
      changeSpecialVisible,
      changeRetailVisible,
      checkedSku,
      addSelfShop,
      shareModalVisible,
      toggleShareModal,
      logo,
      iepInfo,
      specialVisible
    } = this.props.relaxProps;

    return (
      <View style={{ backgroundColor: '#fff', flex: 1, width: '100%' }}>
        <StatusBar barStyle={isAndroid ? 'light-content' : 'dark-content'} />
        <SearchBar />
        <FilterBar />
        <View style={{ backgroundColor: '#f5f5f5', flex: 1 }}>
          <List />
        </View>

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

        {/*批发销售类型-规格选择弹框*/}
        <WMSpecialChoose
          data={chosenSpu}
          visible={specialVisible}
          changeSpecVisible={changeSpecialVisible}
        />

        {/*/!*批发销售类型-规格选择弹框*!/*/}
        {/*<WMWholesaleChoose*/}
          {/*data={chosenSpu}*/}
          {/*visible={wholesaleVisible}*/}
          {/*changeSpecVisible={changeWholesaleVisible}*/}
        {/*/>*/}

        {/*/!*零售销售类型-规格选择弹框*!/*/}
        {/*<WMRetailChoose*/}
          {/*data={chosenSpu}*/}
          {/*visible={retailVisible}*/}
          {/*changeSpecVisible={changeRetailVisible}*/}
          {/*iepInfo={iepInfo}*/}
        {/*/>*/}
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
