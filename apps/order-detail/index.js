import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { StoreProvider } from 'plume2';
import Loading from 'wmkit/loading';
import Header from 'wmkit/header';
import Address from './components/address';
import OrderBottom from './components/order-bottom';
import OrderInfo from './components/order-info';
import OrderGoods from './components/order-goods';
import AppStore from './store';
import AnnexMask from './components/annex-mask.js';
@StoreProvider(AppStore, { debug: __DEV__ })
export default class OrderDetail extends Component {
  UNSAFE_componentWillMount() {
    const state = this.props.route;
    const { oId } = (state && state.params) || {};
    this.store.init(oId);
  }

  render() {
    const { loadingVisible } = this.store.state().toJS();

    return (
      <View style={{ backgroundColor: '#f5f5f5', flex: 1 }}>
        <Header title="订单详情" />
        {loadingVisible ?
            <Loading /> :
            <ScrollView style={{ flex: 1 }}>
              <OrderInfo />
              <Address />
              <OrderGoods />
              <View style={{ height: 8 }}></View>
            </ScrollView>
        }
        {!loadingVisible && <OrderBottom />}
        <AnnexMask />
      </View>
    );
  }
}
