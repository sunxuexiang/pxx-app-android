/**
 * Created by hht on 2017/8/30.
 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  PixelRatio
} from 'react-native';
import { Relax, msg } from 'plume2';

import { mainColor } from 'wmkit/styles/index';
import OrderWrapper from 'wmkit/order-wrapper';
import { noop } from 'wmkit/noop';

import { operationsQL } from '../ql';

@Relax
export default class OrderBottom extends Component {
  static relaxProps = {
    operations: operationsQL,
    detail: 'detail',
    _cancelOrder: noop,
    applyRefund: noop,
    defaultPay: noop
  };

  render() {
    let { operations, detail } = this.props.relaxProps;
    let orderWrapper = OrderWrapper(detail);

    return (
      <View style={styles.container}>
        {operations == undefined
          ? null
          : operations.available.map((availableButton) => {
              return (
                <TouchableOpacity
                  key={Math.random()}
                  onPress={() => {
                    this._operationButtons(
                      orderWrapper.orderNo(),
                      availableButton,
                      orderWrapper.payId(),
                      orderWrapper.totalPrice()
                    );
                  }}
                  style={
                    availableButton == '去付款' ? [styles.redBtn, { borderColor: mainColor }] : [styles.btn, { borderColor: mainColor }]
                  }
                >
                  <Text
                    allowFontScaling={false}
                    style={
                      availableButton == '去付款' ? [styles.redText, { color: mainColor }] : [styles.text, { color: mainColor }]
                    }
                  >
                    {availableButton}
                  </Text>
                </TouchableOpacity>
              );
            })}
      </View>
    );
  }

  /**
   * 订单操作按钮event handler
   */
  _operationButtons = async (tid, button) => {
    const { _cancelOrder } = this.props.relaxProps;
    if (button == '取消订单') {
      _cancelOrder(tid);
    } else if (button == '确认收货') {
      msg.emit('router: goToNext', {
        routeName: 'ShipRecord',
        tId: tid,
        type: 0
      });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  btn: {
    backgroundColor: '#fff',
    height: 30,
    justifyContent: 'center',
    borderWidth: 1 / PixelRatio.get(),
    alignItems: 'center',
    paddingHorizontal: 12,
    marginLeft: 10,
    borderRadius: 15
  },
  text: {
    fontSize: 12
  },
  redBtn: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    height: 30,
    justifyContent: 'center',
    borderWidth: 1 / PixelRatio.get(),
    paddingHorizontal: 12,
    alignItems: 'center',
    marginLeft: 10,
    borderRadius: 15
  },
  redText: {
    fontSize: 12
  }
});
