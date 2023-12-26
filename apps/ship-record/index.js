import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { StoreProvider } from 'plume2';

import WMEmpty from 'wmkit/empty';
import Header from 'wmkit/header';

import List from './components/ship-list';
import Bottom from './components/bottom';
import AppStore from './store';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class ShipRecord extends Component {
  UNSAFE_componentWillMount() {
    const state = this.props.route;
    const { tId, type } = (state && state.params) || {};
    this.store.init(tId, type);
    this.store.orderId(tId);
  }

  render() {
    const status = this.store.state().get('deliveryStatus');
    const tradeDilivery = this.store.state().get('tradeDilivery');
    const orderId = this.store.state().get('orderId');

    return (
      <View style={styles.container}>
        <Header
          title="发货记录"
        />
        {tradeDilivery ? (
          <View style={{ flex: 1 }}>
            <List />
          </View>
        ) : (
          <WMEmpty
            emptyImg={require('./img/list-none.png')}
            desc="暂无发货记录"
          />
        )}
         {tradeDilivery && status ? <Bottom /> : null}
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
