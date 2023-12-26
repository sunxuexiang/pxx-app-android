import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { StoreProvider } from 'plume2';
import Header from 'wmkit/header';

import AppStore from './store';
import List from './components/list';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class LinkedAccount extends React.Component {
  store;

  UNSAFE_componentWillMount() {
    this.store.init();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="关联账号" />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 ,backgroundColor:'#f5f5f5'}}
          iosautomaticallyAdjustContentInsets={false}
        >
          <List />
        </ScrollView>
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
