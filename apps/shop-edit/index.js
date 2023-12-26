import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StoreProvider } from 'plume2';
import AppStore from './store';
import HintBar from 'wmkit/hint-bar';

import List from './components/list';
import TopHeader from './components/top-header';
import ListSmall from './components/list-small';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class ShopEdit extends React.Component {
  componentDidMount() {
    this.store.init();
  }

  render() {
    const listView = this.store.state().get('listView');
    return (
      <View style={styles.container}>
        <TopHeader />
        <HintBar text="长按商品并拖动排序" />
        {listView ? <List /> : <ListSmall />}
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
