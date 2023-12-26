import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StoreProvider } from 'plume2';
import AppStore from './store';
import RefundTab from './components/refund-tab';
import List from './components/refund-list';

import Header from 'wmkit/header';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class RefundList extends React.Component {
  store;

  render() {
    return (
      <View style={styles.container}>
        <Header title="我的退单" />
        <RefundTab />
        <List />
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
