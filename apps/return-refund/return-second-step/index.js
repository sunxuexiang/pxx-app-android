import React from 'react';
import { View, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { StoreProvider } from 'plume2';

import AppStore from '../store';
import ReturnRefundReason from '../component/return-refund-reason';
import ReturnRefundRemark from '../component/return-refund-remark';
import ReturnType from './component/return-type';
import ReturnRefundFile from '../component/return-refund-file';
import ReturnRefundPrice from '../component/return-refund-price';

import Header from 'wmkit/header';

/**
 * 退货第二步
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class ReturnsSecond extends React.Component {
  store;

  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    };
  }

  componentDidMount() {
    this.store.initApplyPage();
  }

  render() {
    return (
      <View style={{ backgroundColor: '#fafafa', flex: 1 }}>
        <Header title="申请退货退款" />
        <KeyboardAwareScrollView animated={true}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 50 }}
          >
            <ReturnRefundReason />
            <ReturnType />
            <ReturnRefundRemark />
            <ReturnRefundFile disableBtn={() => this._disableBtn()} />
          </ScrollView>
        </KeyboardAwareScrollView>
        <ReturnRefundPrice disabled={this.state.disabled} />
      </View>
    );
  }

  /**
   * 禁用提交按钮
   * @private
   */
  _disableBtn = () => {
    this.setState({
      disabled: !this.state.disabled
    });
  };
}
