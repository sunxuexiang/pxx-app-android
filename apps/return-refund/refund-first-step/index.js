import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { StoreProvider } from 'plume2';

import AppStore from '../store';
import ReturnRefundReason from '../component/return-refund-reason';
import ReturnRefundRemark from '../component/return-refund-remark';
import ReturnRefundFile from '../component/return-refund-file';
import ReturnRefundPrice from '../component/return-refund-price';

import Header from 'wmkit/header';

/**
 * 退款第一步
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class RefundFirstStep extends React.Component {
  store;

  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    };
  }

  componentDidMount() {
    const state = this.props.route;
    const { tid } = (state && state.params) || {};

    this.store.init(tid);
  }

  render() {
    return (
      <View style={{ backgroundColor: '#f5f5f5', flex: 1 }}>
        <Header title="申请退货退款" />
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          <ReturnRefundReason />
          <ReturnRefundRemark />
          <ReturnRefundFile disableBtn={() => this._disableBtn()} />
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
