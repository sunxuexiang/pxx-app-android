import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StoreProvider } from 'plume2';
import Header from 'wmkit/header';

import AppStore from './store';
import LogisticsList from './components/logistics-list';
import Head from './components/head';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class LogisticsSelect extends React.Component {
  store;

  componentDidMount() {
    const state = this.props.route;
    const { storeId } = (state && state.params) || {};
    this.store.init(storeId);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="物流公司选择" />
        <Head />
        <LogisticsList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  }
});
