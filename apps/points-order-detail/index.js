import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { StoreProvider } from 'plume2';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from 'wmkit/header';
import Address from './components/address';
import OrderBottom from './components/order-bottom';
import OrderInfo from './components/order-info';
import OrderGoods from './components/order-goods';
import AppStore from './store';
import AnnexMask from './components/annex-mask';
@StoreProvider(AppStore, { debug: __DEV__ })
export default class PointsOrderDetail extends Component {
  componentDidMount() {
    const state = this.props.route;
    const { oId } = (state && state.params) || {};
    this.store.init(oId);
  }

  render() {
    return (
      <View style={{ backgroundColor: '#f5f5f5', flex: 1 }}>
        <Header title="积分订单详情" />
        <ScrollView style={{ flex: 1 }}>
          <OrderInfo />
          <Address />
          <OrderGoods />
        </ScrollView>
        <SafeAreaView>
          <OrderBottom />
        </SafeAreaView>
        <AnnexMask />
      </View>
    );
  }
}
