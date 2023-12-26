import React, { Component } from 'react';
import { StoreProvider } from 'plume2';
import { ScrollView, View } from 'react-native';
import Header from 'wmkit/header';
import * as _ from '../../wmkit/common/util'; // added by scx
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PaymentPassword from './component/payment-password';

import AppStore from './store';
import Address from './component/address';
import ToolBar from './component/tool-bar';
import StoreItem from './component/store-item';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class PointsOrderConfirm extends Component {
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {
    const state = this.props.route;
    const { params } = (state && state.params) || {};
    this.store.confirmInit(params);
  }

  componentDidMount() {
    if (window.y || window.y == 0) {
      this._scroll.scrollToPosition(0, window.y);
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: '#f5f5f5', flex: 1 }}>
        <Header title="确认积分订单" />
        <KeyboardAwareScrollView
          ref={(ref) => (this._scroll = ref)}
          onScroll={(event) => {
            window.y = event.nativeEvent.contentOffset.y;
          }}
        >
          <ScrollView
            contentContainerStyle={{
              ..._.ifIphoneX(
                {
                  paddingBottom: 85
                },
                {
                  paddingBottom: 50
                }
              )
            }}
          >
            <Address />
            {this.store
              .state()
              .get('store')
              .get('supplier') && <StoreItem />}
          </ScrollView>
        </KeyboardAwareScrollView>
        <ToolBar />
        {this.store.state().get('visible') && <PaymentPassword />}
      </View>
    );
  }
}
