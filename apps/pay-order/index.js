import React from 'react';
import { View, Text, StyleSheet, PixelRatio } from 'react-native';

import { StoreProvider } from 'plume2';

import AppStore from './store';
import { priceColor } from 'wmkit/styles/index';
import Header from 'wmkit/header';

import PayType from './component/pay-type';
import PaymentPassword from './component/payment-password';
import * as _ from '../../wmkit/common/util';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class PayOrder extends React.Component {
  store;

  componentDidMount() {
    const state = this.props.route;
    const tradeId = state && state.params && state.params.tid;
    const results = state && state.params && state.params.results;
    this.store.init(tradeId, results);
  }

  render() {
    const trade = this.store.state().get('trade');
    const visible = this.store.state().get('pwdModalVisible');
    return (
      <View style={styles.container}>
        <Header title="订单支付" />
        <View style={styles.row}>
          <Text style={styles.text} allowFontScaling={false}>
            订单金额
          </Text>
          <Text style={[styles.price, { color: priceColor}]} allowFontScaling={false}>
            ¥{_.addZero(trade.get('price'))}
          </Text>
        </View>
        <PayType />
        {visible && <PaymentPassword />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  price: {
    fontSize: 14
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    justifyContent: 'space-between',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    paddingHorizontal: 14
  }
});
