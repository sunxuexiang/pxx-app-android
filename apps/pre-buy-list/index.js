import React from 'react';
import { StoreProvider } from 'plume2';
import Header from 'wmkit/header';
import { StyleSheet, View } from 'react-native';

import AppStore from './store';
import Container from './components/container';

/**
 * 我的预约
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class preBuyList extends React.Component {
  static navigationOptions = {
    title: '订单'
  };

  UNSAFE_componentWillMount() {
    this.store.init();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="我的预约" />
        <Container />
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
