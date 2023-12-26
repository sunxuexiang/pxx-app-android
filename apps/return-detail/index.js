import React from 'react';
import { View, ScrollView } from 'react-native';
import { StoreProvider } from 'plume2';

import Header from 'wmkit/header';

import AppStore from './store';
import OrderBottom from './components/order-bottom';
import OrderInfo from './components/order-info';
import OrderGoods from './components/order-goods';
import OrderInvoice from './components/order-invoice';
import OrderPrice from './components/order-price';
import OrderRemark from './components/order-remark';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class ReturnDetail extends React.Component {
  store;

  UNSAFE_componentWillMount() {
    const state = this.props.route;
    const { rid } = (state && state.params) || {};

    this.store.init(rid);
    this.store.basicRules();
  }

  render() {
    return (
      <View
        style={{ backgroundColor: '#f5f5f5', flex: 1, paddingHorizontal: 12 }}
      >
        <Header title="退货退款详情" />
        <ScrollView style={{ flex: 1 }}>
          <OrderInfo />
          <OrderGoods />
          <OrderInvoice />
          <OrderRemark />
          <OrderPrice />
        </ScrollView>
        <OrderBottom />
        {/*<ImgBox/>*/}
      </View>
    );
  }
}
