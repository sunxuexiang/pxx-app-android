import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { priceColor } from 'wmkit/styles/index';
import * as _ from 'wmkit/common/util';

export default class Price extends Component {
  render() {
    const {
      price,
      buyPoint,
      linePrice,
      priceStyle,
      bigPriceStyle
    } = this.props;
    let total = price ? _.toFixed2(price) : '0.00';
    let arr = total.split('.');
    // 是否登录
    const loginFlag = window.token != undefined && window.token != '';
    return (
      <View style={styles.container}>
        {buyPoint ? (
          arr[0] > 0 || arr[1] > 0 ? (
            <View style={styles.point}>
              <Text style={[styles.num, { color: priceColor }]} allowFontSacling={false}>
                {buyPoint}
              </Text>
              <Text style={[styles.pointUnit, { color: priceColor }]} allowFontSacling={false}>
                积分+
              </Text>

              <Text style={[styles.unit, { color: priceColor }, priceStyle]} allowFontSacling={false}>
                ￥
              </Text>

                <Text
                  style={[styles.price, { color: priceColor }, bigPriceStyle,{maxWidth:30}]}
                  allowFontSacling={false}
                  numberOfLines={1}
                >
                  {arr[0]}
                  <Text style={[styles.zero, { color: priceColor }, priceStyle]} allowFontSacling={false}>
                    .{arr[1]}
                  </Text>
                </Text>
            </View>
          ) : (
            <View style={styles.point}>
              <Text style={[styles.num, { color: priceColor }]} allowFontSacling={false}>
                {buyPoint}
              </Text>
              <Text style={[styles.pointUnit, { color: priceColor }]} allowFontSacling={false}>
                积分
              </Text>
            </View>
          )
        ) : (
          <View style={styles.point}>
            <Text style={[styles.unit, { color: priceColor }, priceStyle]} allowFontSacling={false}>
              ￥
            </Text>

              <Text>
                <Text
                  style={[styles.price, { color: priceColor }, bigPriceStyle]}
                  allowFontSacling={false}
                >
                  {arr[0]}
                </Text>
                <Text style={[styles.zero, { color: priceColor }, priceStyle]} allowFontSacling={false}>
                  .{arr[1]}
                </Text>
              </Text>

          </View>
        )}
        {linePrice ? (
          <Text style={styles.linePrice} allowFontScaling={false}>
            ￥{_.toFixed2(linePrice)}
          </Text>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  point: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    // flex:1
  },
  num: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
  pointUnit: {
    fontSize: 10
  },
  unit: {
    fontSize: 10,
    marginBottom: 2
  },
  price: {
    fontSize: 12,
    fontWeight: '500',
  },
  zero: {
    fontSize: 10,
    fontWeight: '500',
  },
  linePrice: {
    paddingLeft: 4,
    fontSize: 10,
    color: 'rgba(0,0,0,0.4)',
    textDecorationLine: 'line-through',
    lineHeight: 12,
  },
});
