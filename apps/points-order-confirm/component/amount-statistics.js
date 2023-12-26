import React, { Component } from 'react';
import * as _ from 'wmkit/common/util';
import { PixelRatio, StyleSheet, Text, View } from 'react-native';
import { priceColor } from 'wmkit/styles/index';

export default class AmountStatistics extends Component {
  render() {
    const { tradeItem } = this.props.store;
    return (
      <View style={styles.totalPrice}>
        <View style={styles.totalList}>
          <Text allowFontScaling={false} style={styles.orderPrice}>
            订单金额
          </Text>
          <Text allowFontScaling={false} style={{ color: priceColor }}>
            {_.mul(tradeItem.points, tradeItem.num)}
            积分
          </Text>
        </View>

        <View style={styles.totalList}>
          <Text allowFontScaling={false} style={styles.orderPrice}>
            商品金额
          </Text>
          <Text allowFontScaling={false} style={styles.greyColor}>
            {_.mul(tradeItem.points, tradeItem.num)}
            积分
          </Text>
        </View>

        <View style={styles.totalList}>
          <Text allowFontScaling={false} style={styles.orderPrice}>
            配送费用
          </Text>
          <Text allowFontScaling={false} style={styles.greyColor}>
            ¥ 0.00
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  totalPrice: {
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    // borderTopWidth: 1 / PixelRatio.get(),
    // borderTopColor: '#ebebeb',
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb',
    padding: 12,
    marginHorizontal: 12,
    borderRadius: 8,
    marginBottom: 10
  },
  totalList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8
  },
  orderPrice: {
    fontSize: 14,
    color: '#333333',
    flex: 1
  },
  greyColor: {
    color: '#333'
  }
});
