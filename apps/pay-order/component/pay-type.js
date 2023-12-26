/**
 * Created by hht on 2017/9/13.
 */
import React, { Component } from 'react';
import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Relax } from 'plume2';

import * as _ from 'wmkit/common/util';
import { Alert } from 'wmkit/modal/alert';
import { noop } from 'wmkit/noop';

@Relax
export default class PayType extends Component {
  static relaxProps = {
    payChannelList: 'payChannelList',
    trade: 'trade',
    getPayCharge: noop,
    zhifubaoPay: noop,
    payPwdModalVisible: noop,
    isPayPwdValid: noop,
    balance: 'balance',
    handleFriendPay: noop
  };

  render() {
    const {
      payChannelList,
      getPayCharge,
      trade,
      zhifubaoPay,
      balance,
      handleFriendPay
    } = this.props.relaxProps;
    let payChannelMap = {};
    const timeOut = trade.get('orderTimeOut');
    const results = trade.get('results');
    const price = trade.get('price');
    console.log('------>', payChannelList);
    payChannelList.toJS().forEach((value) => {
      payChannelMap[value.channel] = value;
    });
    return (
      <View>
        {payChannelMap['alipay'] &&
          payChannelMap['alipay']['isOpen'] && (
            <TouchableOpacity
              style={styles.row}
              activeOpacity={0.8}
              onPress={() => getPayCharge(payChannelMap['alipay']['id'])}
            >
              <View style={styles.box}>
                <Image source={require('../img/zhi.png')} style={styles.img} />
                <Text style={styles.text} allowFontScaling={false}>
                  支付宝
                </Text>
              </View>
              <Image source={require('../img/arrow.png')} style={styles.icon} />
            </TouchableOpacity>
          )}

        {payChannelMap['WeChat'] &&
          payChannelMap['WeChat']['isOpen'] && (
            <TouchableOpacity
              style={styles.row}
              activeOpacity={0.8}
              onPress={() => getPayCharge(payChannelMap['WeChat']['id'])}
            >
              <View style={styles.box}>
                <Image
                  source={require('../img/wechat.png')}
                  style={styles.img}
                />
                <Text style={styles.text} allowFontScaling={false}>
                  微信支付
                </Text>
              </View>
              <Image source={require('../img/arrow.png')} style={styles.icon} />
            </TouchableOpacity>
          )}

        {payChannelMap['unionpay'] &&
          payChannelMap['unionpay']['isOpen'] && (
            <TouchableOpacity
              style={styles.row}
              activeOpacity={0.8}
              onPress={() => getPayCharge(payChannelMap['unionpay']['id'])}
            >
              <View style={styles.box}>
                <Image source={require('../img/unin.png')} style={styles.img} />
                <Text style={styles.text} allowFontScaling={false}>
                  银联支付
                </Text>
              </View>
              <Image source={require('../img/arrow.png')} style={styles.icon} />
            </TouchableOpacity>
          )}
        {payChannelMap['unionpay_b2b'] &&
          payChannelMap['unionpay_b2b']['isOpen'] && (
            <TouchableOpacity
              style={styles.row}
              activeOpacity={0.8}
              onPress={() => getPayCharge(payChannelMap['unionpay_b2b']['id'])}
            >
              <View style={styles.box}>
                <Image source={require('../img/unin.png')} style={styles.img} />
                <Text style={styles.text} allowFontScaling={false}>
                  银联企业支付
                </Text>
              </View>
              <Image source={require('../img/arrow.png')} style={styles.icon} />
            </TouchableOpacity>
          )}

        {payChannelMap['WxPay'] &&
          payChannelMap['WxPay']['isOpen'] && (
            <TouchableOpacity
              style={styles.row}
              activeOpacity={0.8}
              onPress={() => getPayCharge(payChannelMap['WxPay']['id'])}
            >
              <View style={styles.box}>
                <Image
                  source={require('../img/wechat.png')}
                  style={styles.img}
                />
                <Text style={styles.text} allowFontScaling={false}>
                  微信app支付
                </Text>
              </View>
              <Image source={require('../img/arrow.png')} style={styles.icon} />
            </TouchableOpacity>
          )}

        {payChannelMap['Alipay'] &&
          payChannelMap['Alipay']['isOpen'] && (
            <TouchableOpacity
              style={styles.row}
              activeOpacity={0.8}
              onPress={() => zhifubaoPay(payChannelMap['Alipay']['id'])}
            >
              <View style={styles.box}>
                <Image source={require('../img/zhi.png')} style={styles.img} />
                <Text style={styles.text} allowFontScaling={false}>
                  支付宝支付
                </Text>
              </View>
              <Image source={require('../img/arrow.png')} style={styles.icon} />
            </TouchableOpacity>
          )}
        {/*{payChannelMap['Balance'] &&
          payChannelMap['Balance']['isOpen'] && (
            <TouchableOpacity
              style={styles.row}
              activeOpacity={0.8}
              onPress={() => this._showPassword(payChannelMap['Balance']['id'])}
            >
              <View style={styles.box}>
                <Image
                  source={
                    Number(balance) >= Number(price)
                      ? require('../img/balance.png')
                      : require('../img/balance_dark.png')
                  }
                  style={styles.img}
                />
                <Text
                  style={Number(balance) >= Number(price) ? styles.text : styles.balanceText}
                  allowFontScaling={false}
                >
                  余额支付&nbsp;&nbsp;&nbsp;&nbsp;当前余额:￥
                  {_.addZero(balance)}
                </Text>
              </View>
              <Image source={require('../img/arrow.png')} style={styles.icon} />
            </TouchableOpacity>
          )}*/}

        {/* 微信好友代付 */}
        {payChannelMap['ReplaceWechat'] &&
        payChannelMap['ReplaceWechat']['isOpen'] && (
          <TouchableOpacity
            style={styles.row}
            activeOpacity={0.8}
            onPress={() => handleFriendPay('ReplaceWechat', results)}
          >
            <View style={styles.box}>
              <Image source={require('../img/dai1.png')} style={styles.img} />
              <Text style={styles.text} allowFontScaling={false}>
                微信好友代付
              </Text>
            </View>
            <Image source={require('../img/arrow.png')} style={styles.icon} />
          </TouchableOpacity>
        )}
        {/* 支付宝好友代付 */}
        {payChannelMap['ReplaceAlipay'] &&
        payChannelMap['ReplaceAlipay']['isOpen'] && (
          <TouchableOpacity
            style={styles.row}
            activeOpacity={0.8}
            onPress={() => handleFriendPay('ReplaceAlipay', results)}
          >
            <View style={styles.box}>
              <Image source={require('../img/dai2.png')} style={styles.img} />
              <Text style={styles.text} allowFontScaling={false}>
                支付宝好友代付
              </Text>
            </View>
            <Image source={require('../img/arrow.png')} style={styles.icon} />
          </TouchableOpacity>
        )}
        {timeOut ? (
          <View style={styles.hintMsgBox}>
            <Text allowFontScaling={false} style={styles.hintMsgText}>
              请在 {_.formatDate(timeOut)} 前完成支付
            </Text>
            <Text allowFontScaling={false} style={styles.hintMsgText}>否则将会自动取消</Text>
          </View>
        ) : null}
      </View>
    );
  }

  /**
   * 支付密码弹窗
   */
  _showPassword = async (id) => {
    const {
      isPayPwdValid,
      balance,
      trade,
      payPwdModalVisible
    } = this.props.relaxProps;
    if (Number(balance) < Number(trade.get('price'))) {
      Alert({
        text: '可用余额不足！'
      });
    } else {
      const result = await isPayPwdValid();
      if (result) {
        payPwdModalVisible(true, id);
      }
    }
  };
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    justifyContent: 'space-between',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    paddingHorizontal: 14
  },
  text: {
    color: '#333333',
    fontSize: 14
  },
  balanceText: {
    color: '#73777C',
    fontSize: 14,
    textAlign: 'center'
  },
  icon: {
    width: 7,
    height: 13
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  img: {
    width: 28,
    height: 28,
    marginRight: 5
  },
  hintMsgBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5
  },
  hintMsgText: {
    color: '#ed3d2e'
  }
});
