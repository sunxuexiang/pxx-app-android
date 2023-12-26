import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { StoreProvider } from 'plume2';
import AppStore from './store';
import Header from 'wmkit/header';

import StoreHeader from './components/store-header';
import List from './components/list';
import Modal from './components/modal';
import { isAndroid, screenWidth } from 'wmkit/styles/index';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class StoreBags extends React.Component {
  componentDidMount() {
    this.store.init();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="开店礼包" />
        <ScrollView>
          <StoreHeader />
          <Text allowFontScaling={false} style={styles.text}>
            超值开店礼包
          </Text>
          <List />
        </ScrollView>
        <Modal />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  text: {
    textAlign: 'center'
  }
});
