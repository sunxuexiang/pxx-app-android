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
import moment from 'moment';

import { mainColor } from 'wmkit/styles/index';

import { noop } from 'wmkit/noop';
import OrderWrapper from 'wmkit/order-wrapper';

import { operationsQL } from '../ql';
import CountDown from './count-down';

import { _ } from 'wmkit';

@Relax
export default class OrderBottom extends Component {
  static relaxProps = {
    operations: operationsQL,
    detail: 'detail',
    _cancelOrder: noop,
    applyRefund: noop,
    defaultPay: noop,
    payBalance: noop,
    againBuy: noop,
    confirm: noop
  };

  render() {
    let { operations, detail } = this.props.relaxProps;
    let orderWrapper = OrderWrapper(detail);
    const detailItem = detail.toJS();

    let tailStartTime, tailEndTime;
    if (detailItem && JSON.stringify(detailItem) != '{}') {
      const tradeState = detailItem.tradeState;
      tailStartTime = tradeState.tailStartTime;
      tailEndTime = tradeState.tailEndTime;
    }
    const deliverWay = detailItem.deliverWay;

    return operations == undefined ? null : operations.available.length > 0 ? (
      <View style={styles.container}>
        {operations.available.map((availableButton) => {
          if (availableButton == '支付尾款') {
            return !moment(tailStartTime).isSameOrBefore(new Date()) ? (
              <View
                style={[styles.btn, styles.btnDisabled]}
                key={Math.random()}
              >
                <CountDown
                  allowFontScaling={false}
                  numberOfLines={1}
                  groupFlag={false}
                  prelistFlag={true}
                  showTimeDays={true}
                  overHandler={() => {
                    msg.emit('router: refresh');
                  }}
                  timeOffset={moment
                    .duration(moment(tailStartTime).diff(new Date()))
                    .asSeconds()
                    .toFixed(0)}
                />
                <Text style={styles.buyText}>后支付尾款</Text>
              </View>
            ) : (
              <View style={styles.btnDeposit} key={Math.random()}>
                <CountDown
                  allowFontScaling={false}
                  numberOfLines={1}
                  groupFlag={false}
                  prelistFlag={true}
                  showTimeDays={true}
                  timeStyle={{ color: mainColor, fontSize: 14 }}
                  overHandler={() => {
                    msg.emit('router: refresh');
                  }}
                  timeOffset={moment
                    .duration(moment(tailEndTime).diff(tailStartTime))
                    .asSeconds()
                    .toFixed(0)}
                />
                <Text style={styles.depositText}>后关闭尾款支付通道</Text>

                <TouchableOpacity
                  key={Math.random()}
                  onPress={() => {
                    this._operationButtons(
                      orderWrapper.orderNo(),
                      availableButton,
                      orderWrapper.payId(),
                      orderWrapper.totalPrice(),
                      deliverWay
                    );
                  }}
                  style={styles.btn}
                >
                  <Text allowFontScaling={false} style={[styles.text, {color: mainColor}]}>
                    {availableButton}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }

          return (
            <TouchableOpacity
              key={Math.random()}
              onPress={() => {
                this._operationButtons(
                  orderWrapper.orderNo(),
                  availableButton,
                  orderWrapper.payId(),
                  orderWrapper.totalPrice(),
                  deliverWay
                );
              }}
              style={[styles.btn, {borderColor: mainColor}]}
            >
              <Text
                allowFontScaling={false}
                style={[ styles.text, {color: mainColor} ]}
              >
                {availableButton}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    ) : null;
  }

  /**
   * 订单操作按钮event handler
   */
  _operationButtons = async (tid, button, payTypeId, totalPrice,deliverWay) => {
    const {
      _cancelOrder,
      applyRefund,
      defaultPay,
      payBalance,
      isPayBalance,
      againBuy,confirm
    } = this.props.relaxProps;
    if (button == '取消订单') {
      _cancelOrder(tid);
    } else if (button == '确认收货') {
      if (deliverWay == 3) {
        confirm(tid);
      } else {
        msg.emit('router: goToNext', {
          routeName: 'ShipRecord',
          tId: tid,
          type: 0
        });
      }
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
    } else if (button == '支付定金' && payTypeId == 0 && totalPrice != '0.00') {
      msg.emit('router: goToNext', {
        routeName: 'PayOrder',
        tid
      });
    } else if (button == '支付尾款' && payTypeId == 0) {
      if (isPayBalance) {
        msg.emit('router: goToNext', {
          routeName: 'PayOrder',
          tid
        });
      } else {
        payBalance(tid);
      }
    } else if (button === '再次购买' || button === '恢复订单') {
      againBuy(tid);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    ..._.ifIphoneX(
      {
        paddingBottom: 38
      },
      {
        paddingBottom: 8
      }
    ),
    ..._.ifIphoneXR({
      paddingBottom: 38
    }),
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
  btnDisabled: {
    backgroundColor: '#e6e6e6',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e6e6e6',
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  buyText: {
    fontSize: 14,
    color: '#fff'
  },
  btnDeposit: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  depositText: {
    marginLeft: 5,
    fontSize: 14
  }
});
