import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { StoreProvider } from 'plume2';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppStore from '../store';
import RetuenSkusBox from './component/return-skus-box';
import RetuenSkusPrice from './component/return-skus-price';
import ReturnRefundHead from '../component/return-refund-head';

import Header from 'wmkit/header';

/**
 * 退货第一步
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class ReturnFirstStep extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const state = this.props.route;
    const { tid } = (state && state.params) || {};

    this.store.init(tid);
  }

  render() {
    return (
      <View style={{ backgroundColor: '#fafafa', flex: 1 }}>
        <Header title="申请退货退款" />
        <KeyboardAwareScrollView behavior="height" style={{ flex: 1 }}>
          <ReturnRefundHead />
          <RetuenSkusBox />
        </KeyboardAwareScrollView>
        <RetuenSkusPrice />
      </View>
    );
  }
}
