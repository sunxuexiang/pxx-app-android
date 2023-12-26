import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StoreProvider } from 'plume2';

import Header from 'wmkit/header';

import AppStore from './store';
import CashModal from './components/cash-modal';
import NoBindWecat from './components/no-bind-wecat';

/**
 * 余额提现
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class Cash extends React.Component {
  componentDidMount() {
    this.store.init();
  }

  render() {
    let isBindWeChat = this.store.state().get('isBindWeChat');
    let loading = this.store.state().get('loading');

    return (
      <View style={styles.container}>
        <Header title="提现" />

        {/* 未绑定微信 */}
        {loading == null ? null : isBindWeChat ? (
          <CashModal />
        ) : (
          <NoBindWecat />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  }
});
