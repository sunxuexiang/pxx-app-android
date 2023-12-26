import React from 'react';
import { StoreProvider } from 'plume2';
import { fromJS } from 'immutable';
import { StatusBar, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styled from 'styled-components/native';
import { msg } from 'plume2';

import { cache } from 'wmkit/cache';
import { config } from 'wmkit/config';
import Loading from 'wmkit/loading';
import ShareModal from 'wmkit/goods-share-modal';
import Header from 'wmkit/header';
import { _ } from 'wmkit';

import RegisterCoupon from 'wmkit/biz/coupon-model/register-coupon/index';
import MagicWebview from '../../wmkit/biz/magic-webview/index';

import AppStore from './store';
import SearchBar from './component/search-bar';
import Bottom from './component/bottom';
import List from './component/list';
import GoodsShare from './component/goods-share';
import MenuBox from '../../wmkit/biz/menu-box';
const Store = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

@StoreProvider(AppStore, { debug: __DEV__ })
export default class StoreMain extends React.Component {
  store;
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {
    const state = this.props.route;
    const { storeId } = (state && state.params) || {};
    this.store.init(storeId);
    AsyncStorage.setItem(cache.STORE_ID, JSON.stringify(storeId));
  }

  componentWillUnmount() {
    msg.emit('registerCouponVisible', { visible: false });
    AsyncStorage.removeItem(cache.STORE_ID);
  }

  render() {
    const states = this.store.state();
    const isMenuBoxFlag = states.get('isMenuBoxFlag');
    const menuList = states.get('menuList');
    const state = this.props.route;
    const { storeId } = (state && state.params) || {};
    let source = config.MAGIC_HOST + '/index/' + storeId;
    if (window.token) {
      source = source + '?token=' + window.token;
    }
    return this.store.state().get('loading') ? (
      <Loading />
    ) : (
      <Store>
        <StatusBar barStyle="light-content" />
        <Header title="店铺" />
        <SearchBar />
        {/* <MiniPurchase style={{ zIndex: 99 }} bottom={90} /> */}

        {this.store.state().get('showMagicBox') ? (
          <View
            style={{
              flex: 1,
              ..._.ifIphoneX(
                {
                  marginBottom: 83
                },
                {
                  marginBottom: 50
                }
              )
            }}
          >
            <MagicWebview source={source} />
          </View>
        ) : (
          <List storeId={storeId} />
        )}

        <Bottom
          storeId={storeId}
          serviceFlag={this.store.state().get('serviceFlag')}
        />
        <GoodsShare />
        {this.store.state().get('checkedSku').size > 0 &&
          !!this.store.state().get('shareModalVisible') && (
            <ShareModal
              addSelfShop={this.store.state().get('addSelfShop')}
              //商品SKU信息
              goodsInfo={this.store.state().get('checkedSku')}
              goods={fromJS({})}
              //商城logo
              logo={this.store.state().get('logo')}
              //分享类型
              shareType={2}
              shareModalVisible={this.store.state().get('shareModalVisible')}
              //弹窗关闭
              closeVisible={this.store.toggleShareModal}
            />
          )}
        <RegisterCoupon />
        {isMenuBoxFlag && (
          <MenuBox
            style={{
              ..._.ifIphoneX(
                {
                  top: 150
                },
                {
                  top: 130
                }
              )
            }}
            changeShow={this.store.handClick}
            menuList={menuList}
          />
        )}
      </Store>
    );
  }
}
