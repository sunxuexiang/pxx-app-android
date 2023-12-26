import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { StoreProvider } from 'plume2';
import AppStore from './store';
import Header from './components/header';
import List from './components/cash-list';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class Balance extends Component<any, any> {
  store: AppStore;

  UNSAFE_componentWillMount() {
    this.store.init();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
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
