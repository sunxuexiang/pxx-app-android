import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { StoreProvider } from 'plume2';
import Header from 'wmkit/header';

import List from './components/pick-up-list';
import AppStore from './store';
import WMEmpty from '../../wmkit/empty';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class PickUpRecord extends Component {
  UNSAFE_componentWillMount() {
    const state = this.props.route;
    const { tId } = (state && state.params) || {};
    this.store.init(tId);
    this.store.orderId(tId);
  }

  render() {
    const address = this.store.state().get('address');
    const pickUpRecord = this.store.state().get('pickUpRecord');
    const order = this.store.state().get('order');
    let dataReady=JSON.stringify(pickUpRecord) !== "{}"&&JSON.stringify(address) !== "{}"&&JSON.stringify(order) !== "{}"

    return (
      <View style={styles.container}>
        <Header
          title="自提记录"
        />
        {dataReady?(
          <View style={{ flex: 1 }}>
            <List />
          </View>
        ):(
          <WMEmpty
            emptyImg={require('./img/list-none.png')}
            desc="暂无发货记录"
          />
        )}
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
