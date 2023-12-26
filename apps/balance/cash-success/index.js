import React from 'react';
import { StyleSheet, View } from 'react-native';
import { msg, StoreProvider } from 'plume2';
import Header from 'wmkit/header';

import AppStore from './store';
import Success from './components/success';

/**
 * 商品列表模块
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class CashSuccess extends React.Component {
  render() {
    const state = this.props.route;
    const { drawCashId, drawCashNo, drawCashSum } =
      (state && state.params) || {};
    return (
      <View style={styles.container}>
        <Header
          title="提现成功"
          onLeftMenuPress={() => {
            msg.emit('router: back');
            msg.emit('router: refreshRoute', { routeName: 'BalanceCashForm' });
          }}
        />
        <Success
          drawCashId={drawCashId}
          drawCashNo={drawCashNo}
          drawCashSum={drawCashSum}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  }
});
