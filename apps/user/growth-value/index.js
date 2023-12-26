import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { StoreProvider } from 'plume2';

import AppStore from './store';
import Head from './components/head';
import ValueList from './components/value-list';
import ValueLayer from './components/value-layer';
import {Header} from 'wmkit'
/**
 * 成长值明细
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class GrowthValue extends React.Component {
  store;

  componentDidMount() {
    this.store.init();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="会员成长值" />
        <Head />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          iosautomaticallyAdjustContentInsets={false}
        >
          <ValueList />
        </ScrollView>
        <ValueLayer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
