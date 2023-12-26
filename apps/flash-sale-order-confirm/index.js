import React, { Component } from 'react';
import { StoreProvider } from 'plume2';
import { View, ScrollView } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from 'wmkit/header';
import * as _ from '../../wmkit/common/util'; // added by scx
import AppStore from './store';
import Address from './component/address';
import ToolBar from './component/tool-bar';
import StoreList from './component/store-list';
import AllAmount from './component/all-amount';
import AnnexMask from './component/annex-mask';
import DeliverType from './component/deliver-type';
import { Provider } from '@ant-design/react-native';
@StoreProvider(AppStore, { debug: __DEV__ })
export default class FlashSaleOrderConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisable: false
    };
  }

  UNSAFE_componentWillMount() {
    const state = this.props.route;
    const { storeId, deliveryType, pickUpWareId } = (state && state.params) || {};
    this.store.confirmInit(storeId, deliveryType, pickUpWareId);
  }

  componentDidMount() {
    if (window.y || window.y == 0) {
      this._scroll.scrollToPosition(0, window.y);
    }
  }

  render() {
    const {deliverModelIsShow,stores,pickUpMessage} = this.store.state().toJS();
    const storeId = stores[0]&&stores[0].supplier.storeId;

    return (
      <Provider>
        <View style={{ backgroundColor: '#f5f5f5', flex: 1 }}>
          <Header title="确认订单" />
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
              <StoreList disableF={this._disableButton} />
              {this.store
                .state()
                .get('stores')
                .count() > 1 && <AllAmount />}
            </ScrollView>
          </KeyboardAwareScrollView>
          <ToolBar btnDisabled={this.state.btnDisable} />
          <AnnexMask />
          {/*配送方式弹窗*/}
          {deliverModelIsShow[storeId] && (
            <DeliverType
              key={storeId}
              storeId={storeId}
              pickUpMessage={pickUpMessage[storeId]}
            />
          )}
        </View>
      </Provider>
    );
  }

  /**
   * 禁用/启用 提交按钮
   * @private
   */
  _disableButton = () => {
    this.setState({
      btnDisable: !this.state.btnDisable
    });
  };
}
