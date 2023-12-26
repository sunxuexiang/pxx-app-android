import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StoreProvider } from 'plume2';
import Header from 'wmkit/header';

import AppStore from './store';
import List from './components/list';
import Tabs from './components/tabs';

/**
 * 账户明细
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class CashAccountDetail extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header title="账户明细" />
        {/* <Tabs /> */}
        <List />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  btnBox: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ebebeb',
    backgroundColor: '#fff',
    alignItems: 'flex-end'
  },
  btn: {
    marginTop: 10,
    marginRight: 10,
    borderColor: '#000',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12
  }
});
