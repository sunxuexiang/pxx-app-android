import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StoreProvider } from 'plume2';
import Header from 'wmkit/header';

import AppStore from './store';
import Nav from './components/nav';
import RecordList from './components/record-list';

/**
 * 提现记录
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class CashRecord extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="提现记录" />
        <Nav />
        <RecordList />
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
