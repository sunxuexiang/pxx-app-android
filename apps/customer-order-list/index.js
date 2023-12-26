import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { StoreProvider } from 'plume2';

import Header from 'wmkit/header';

import RefundTab from './components/order-tab';
import Orders from './components/order-list';
import AppStore from './store';

@StoreProvider(AppStore, {
  debug: __DEV__
})
export default class CustomerOrderList extends React.Component {
  store;

  static navigationOptions = {
    title: '订单',
    tabBarIcon: ({ focused }) => (
      <Image
        source={
          focused
            ? require('./img/order_focused.png')
            : require('./img/order.png')
        }
        style={{
          width: 24,
          height: 24
        }}
      />
    )
  };

  UNSAFE_componentWillMount() {
    let tabKey = '';
    let state = this.props.route;
    if (state) {
      tabKey = (state && state.params && state.params.tabKey) || '';
    }
    this.store.init(tabKey);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="推广订单" />
        <RefundTab />
        <View
          style={{
            flex: 1,
            backgroundColor:'#f5f5f5'
          }}
        >
          <Orders />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
});
