import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import { Relax, msg } from 'plume2';
import { noop, _, share, Check, WMkit, cache } from 'wmkit';
import { priceColor } from 'wmkit/styles/index';
// @Relax
export default class CartPrice extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { price, buyPoint } = this.props;
    let total = _.toFixed2(price || 0);
    let arr = total.split('.');
    return (
      <View style={styles.container}>
        {buyPoint ? (
          <View style={styles.point}>
            <Text style={[styles.num, {color: priceColor}]} allowFontSacling={false}>
              {buyPoint}
            </Text>
            <Text style={[styles.pointUnit, {color: priceColor}]} allowFontSacling={false}>
              积分 {price > 0 && '+'}
            </Text>
            {
              price > 0 && (
                <Text>
                  <Text style={[styles.unit, {color: priceColor}]} allowFontSacling={false}>
                    ￥
                  </Text>
                  <Text style={[styles.price, {color: priceColor, width: 40 }]} allowFontSacling={false} numberOfLines={1}>
                    {arr[0]}
                    <Text style={[styles.zero, {color: priceColor}]} allowFontSacling={false}>
                      .{arr[1]}
                    </Text>
                  </Text>
                </Text>
              )
            }


          </View>
        ) : (
          <View style={styles.point}>
            <Text style={[styles.unit, {color: priceColor}]} allowFontSacling={false}>
              ￥
            </Text>
            <Text style={[styles.price, {color: priceColor}]} allowFontSacling={false}>
              {arr[0]}
            </Text>
            <Text style={[styles.zero, {color: priceColor}]} allowFontSacling={false}>
              .{arr[1]}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  point: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  num: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  pointUnit: {
    fontSize: 10,
    marginBottom: 2
  },
  unit: {
    fontSize: 10,
    marginBottom: 2
  },
  price: {
    fontSize: 16,
    marginTop: 2,
    fontWeight: 'bold'
  },
  zero: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2
  }
});
