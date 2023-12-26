/**
 * Created by hht on 2017/8/30.
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
  ImageBackground
} from 'react-native';
import { Relax } from 'plume2';

import { mainColor } from 'wmkit/styles/index';
import OrderWrapper from 'wmkit/order-wrapper';
@Relax
export default class OrderInfo extends Component {
  static relaxProps = {
    detail: 'detail'
  };

  render() {
    const { detail } = this.props.relaxProps;
    let orderWrapper = OrderWrapper(detail);

    return (
      <View style={styles.container}>
        <View style={styles.itemTitle}>
          <Text allowFontScaling={false}>订单状态</Text>
          <Text style={{ color: mainColor }} allowFontScaling={false}>
            {orderWrapper.orderState()}
          </Text>
        </View>
        {orderWrapper.isVoidTrade() && (
          <View style={styles.item}>
            <Text style={styles.textGray} allowFontScaling={false}>
              作废原因
            </Text>
            <Text
              style={{ flex: 1, textAlign: 'right', color: '#333' }}
              allowFontScaling={false}
            >
              {orderWrapper.obsoleteReason()}
            </Text>
          </View>
        )}
        <View style={styles.item}>
          <Text style={styles.textGray} allowFontScaling={false}>
            订单号
          </Text>
          <View style={{ flexDirection: 'row' }}>
            {orderWrapper.platform() != 'CUSTOMER' && (
              <ImageBackground
                style={styles.bg}
                source={require('../img/tag.png')}
              >
                <Text style={styles.white} allowFontScaling={false}>
                  代
                </Text>
              </ImageBackground>
            )}
            <Text
              style={{ textAlign: 'right', color: '#333' }}
              allowFontScaling={false}
            >
              {orderWrapper.orderNo()}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.textGray} allowFontScaling={false}>
            下单时间
          </Text>
          <Text
            style={{ flex: 1, textAlign: 'right', color: '#333' }}
            allowFontScaling={false}
          >
            {orderWrapper.createTime()}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    borderRadius:6
  },
  itemTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingTop: 15
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6
  },
  textGray: {
    color: '#000'
  },
  center: {
    justifyContent: 'center'
  },
  white: {
    color: '#ffffff',
    fontSize: 10,
    backgroundColor: 'transparent'
  },
  bg: {
    width: 19,
    height: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 3
  }
});
