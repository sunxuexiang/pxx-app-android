import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { StoreProvider } from 'plume2';

import Header from 'wmkit/header';

import Logistics from './component/logistics';
import Status from './component/status';
import AppStore from './store';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class ReturnLogisticInfo extends React.Component {
  store;

  UNSAFE_componentWillMount() {
    const state = this.props.route;
    const { rid } = (state && state.params) || {};
    this.store.fetchBasicInfo(rid);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Header title="退货物流信息" />
        <Status />
        <Logistics />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  }
});
