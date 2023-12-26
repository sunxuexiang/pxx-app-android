import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StoreProvider } from 'plume2';

import AppStore from './store';
import CashForm from './components/cash-form';
import PaymentPassword from './components/payment-password';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from 'wmkit/header';

/**
 * 提现申请单
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class DrawCashForm extends React.Component {
  componentDidMount() {
    //初始化
    this.store.init();
  }

  render() {
    const visible = this.store.state().get('pwdModalVisible');
    return (
      <View style={styles.container}>
        <Header title="提现申请单" />
        <KeyboardAwareScrollView
          ref={(ref) => (this._scroll = ref)}
          onScroll={(event) => {
            window.y = event.nativeEvent.contentOffset.y;
          }}
        >
          <CashForm />
        </KeyboardAwareScrollView>
        {visible && <PaymentPassword />}
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
