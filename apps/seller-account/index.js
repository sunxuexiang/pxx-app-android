import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StoreProvider } from 'plume2';
import Header from 'wmkit/header';

import AppStore from './store';
import AccountList from './components/account-list';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class SellerAccount extends React.Component {
  store;

  componentDidMount() {
    this.store.init();
  }

  render() {
    return (
      <View style={{ flex: 1, height: '100%', backgroundColor: '#fff' }}>
        <Header title="收款账号选择" />
        <View style={styles.bankContent}>
          <AccountList />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bankContent: {
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#fff'
  }
});
