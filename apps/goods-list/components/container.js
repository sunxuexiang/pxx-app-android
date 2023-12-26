import React from 'react';
import { View, StatusBar, Platform, StyleSheet } from 'react-native';
import { Relax } from 'plume2';
import { fromJS } from 'immutable';

import WMWholesaleChoose from 'wmkit/goods-choose/wholesale-choose';
import WMRetailChoose from 'wmkit/goods-choose/retail-choose';
import { noop } from 'wmkit/noop';
import ShareModal from 'wmkit/goods-share-modal';
import {_, Loading} from 'wmkit';

import MiniPurchase from 'wmkit/biz/mini-purchase/index';
import SearchBar from './search-bar';
import FilterBar from './filter-bar';
import Cate from './cate';
import Sort from './sort';
import List from './goods-list';
import Filter from './filter';
import GoodsShare from './goods-share';
import MenuBox from '../../../wmkit/biz/menu-box';
import SkeletonSmall from './skeleton-small';
import SkeletonBig from './skeleton-big';

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
    logo: 'logo',
    showShare: 'showShare',
    iepInfo: 'iepInfo',
    menuList: 'menuList',
    isMenuBoxFlag: 'isMenuBoxFlag',
    handClick: noop,
    listView: 'listView',
    loadingStatus: 'loadingStatus',
    nextPageLoading: 'nextPageLoading',
  };
  render() {
    const {
      tabName,
      showGoBack,
      chosenSpu,
      wholesaleVisible,
      retailVisible,
      changeWholesaleVisible,
      changeRetailVisible,
      checkedSku,
      addSelfShop,
      shareModalVisible,
      toggleShareModal,
      logo,
      showShare,
      iepInfo,
      menuList,
      isMenuBoxFlag,
      handClick,
      listView,
      loadingStatus,
      nextPageLoading
    } = this.props.relaxProps;

    return (
      <View style={{ backgroundColor: '#fff', flex: 1, width: '100%' }}>
        <StatusBar barStyle={isAndroid ? 'light-content' : 'dark-content'} />
        <SearchBar />
        <FilterBar />
        {/* #f5f5f5 */}
        <View style={{ flex: 1 }}>
          <List />
        </View>
        {/* 骨架屏 */}
        {loadingStatus && <Loading />}
        {nextPageLoading && <Loading />}
        {loadingStatus && listView != null ? (
          listView ? (
            <View style={styles.skeleton}>
              <SkeletonSmall />
            </View>
          ) : (
            <View style={styles.skeleton}>
              <SkeletonBig />
            </View>
          )
        ) : null}
        {/* 分类*/}
        {tabName == 'goodsCate' ? <Cate /> : null}

        {/*排序*/}
        {tabName === 'goodsSort' && <Sort />}

        {/*筛选*/}
        <Filter
          hasBottom={this.props.hasBottom}
          hide={tabName !== 'goodsFilter'}
        />

        {/* 悬浮mini购物车 */}
        {showGoBack && <MiniPurchase />}

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
        {checkedSku.size > 0 && !!shareModalVisible && (
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
        {isMenuBoxFlag && (
          <MenuBox
            style={{
              ..._.ifIphoneX(
                {
                  top: 80
                },
                {
                  top: 70
                }
              )
            }}
            changeShow={handClick}
            menuList={menuList}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  skeleton: {
    position: 'absolute',
    ..._.ifIphoneX(
      {
        top: 118
      },
      {
        top: isAndroid ? 88 : 108
      }
    )
  }
});
