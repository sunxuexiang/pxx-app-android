import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { StoreProvider } from 'plume2';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from 'wmkit/header';
import Address from './components/address';
import OrderInfo from './components/order-info';
import OrderGoods from './components/order-goods';
import AppStore from './store';
import AnnexMask from './components/annex-mask.js';
import * as WMkit from 'wmkit/kit';
@StoreProvider(AppStore, {
  debug: __DEV__
})
export default class CustomerOrderDetail extends Component {
  componentDidMount() {
    const state = this.props.route;
    const { oId } = (state && state.params) || {};
    if (!WMkit.isLoginOrNotOpen()) {
      msg.emit('loginModal:toggleVisible', {
        callBack: () => {
          msg.emit('router: goToNext', {
            routeName: 'CustomerOrderDetail',
            oId: oId
          })
        }
      });
    } else {
      this.store.init(oId);
    }
    
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: '#f5f5f5',
          flex: 1
        }}
      >
        <Header title="订单详情" />
        <ScrollView
          style={{
            flex: 1,
            padding:12
          }}
        >
          <OrderInfo />
          <Address />
          <OrderGoods />
        </ScrollView>
        <SafeAreaView />
        <AnnexMask />
      </View>
    );
  }
}
