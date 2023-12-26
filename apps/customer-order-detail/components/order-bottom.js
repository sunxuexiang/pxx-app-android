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
import { noop } from 'wmkit/noop';
import OrderWrapper from 'wmkit/order-wrapper';

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
                    availableButton == '去付款' ? [styles.redBtn, { borderColor: mainColor }] : styles.btn
                  }
                >
                  <Text
                    allowFontScaling={false}
                    style={
                      availableButton == '去付款' ? [styles.redText, { color: mainColor }] : styles.text
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
  _operationButtons = async (tid, button, payTypeId, totalPrice) => {
    const { _cancelOrder, applyRefund, defaultPay } = this.props.relaxProps;
    if (button == '取消订单') {
      _cancelOrder(tid);
    } else if (button == '确认收货') {
      msg.emit('router: goToNext', {
        routeName: 'ShipRecord',
        tId: tid,
        type: 0
      });
    } else if (button == '去付款' && totalPrice == '0.00') {
      //0元素订单直接调默认支付接口
      defaultPay(tid);
    } else if (button == '去付款' && payTypeId == '0') {
      msg.emit('router: goToNext', {
        routeName: 'PayOrder',
        tid: tid
      });
    } else if (button == '去付款' && payTypeId == '1') {
      msg.emit('router: goToNext', {
        routeName: 'FillPayment',
        tid: tid,
        search: 'from=order-detail'
      });
    } else if (button == '退货退款') {
      applyRefund(tid);
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
    borderColor: '#000',
    borderWidth: 1 / PixelRatio.get(),
    width: 64,
    alignItems: 'center',
    marginLeft: 10
  },
  text: {
    color: '#000',
    fontSize: 12
  },
  redBtn: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    height: 30,
    justifyContent: 'center',
    borderWidth: 1 / PixelRatio.get(),
    width: 64,
    alignItems: 'center',
    marginLeft: 10
  },
  redText: {
    fontSize: 12
  }
});
