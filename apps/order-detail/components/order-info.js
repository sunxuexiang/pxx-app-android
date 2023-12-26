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
          <Text allowFontScaling={false} style={styles.title}>
            订单状态
          </Text>
          <Text style={{ color: mainColor }} allowFontScaling={false}>
            {orderWrapper.orderState()}
          </Text>
        </View>
        {orderWrapper.isVoidTrade() && (
          <View style={styles.item}>
            <Text style={styles.textGray} allowFontScaling={false}>
              作废原因
            </Text>
            <Text style={styles.text} allowFontScaling={false}>
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
            <Text style={styles.text} allowFontScaling={false}>
              {orderWrapper.orderNo()}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.textGray} allowFontScaling={false}>
            下单时间
          </Text>
          <Text style={styles.text} allowFontScaling={false}>
            {orderWrapper.createTime()}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 12,
    marginTop: 12,
    paddingTop: 18,
    paddingBottom: 12
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb'
  },
  title: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold'
  },
  itemTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  text: {
    fontSize: 12,
    color: '#333'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6
  },
  textGray: {
    color: '#333',
    fontSize: 12
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
