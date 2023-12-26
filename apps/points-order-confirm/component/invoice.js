import React, { Component } from 'react';
import { View, Text, StyleSheet, PixelRatio } from 'react-native';

export default class Invoice extends Component {
  render() {
    return (
      <View style={styles.totalPrice}>
        <View style={styles.delivery}>
          <Text allowFontScaling={false} style={styles.title}>
            支付配送
          </Text>
          <View style={styles.rightContext}>
            <View>
              <Text allowFontScaling={false} style={styles.payText}>
                在线支付
              </Text>
              <Text allowFontScaling={false} style={styles.payText}>
                快递配送
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.delivery}>
          <Text allowFontScaling={false} style={styles.title}>
            发票信息
          </Text>
          <View style={styles.rightContext}>
            <Text allowFontScaling={false} style={styles.payText}>
              暂不支持
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  totalPrice: {
    marginHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
    // borderStyle: 'solid',
    // borderTopWidth: 1 / PixelRatio.get(),
    // borderTopColor: '#ebebeb',
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb'
  },
  rightContext: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    color: '#333333',
    fontSize: 14
  },
  delivery: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
    // borderBottomColor: '#ebebeb',
    // borderBottomWidth: 1 / PixelRatio.get()
  },
  payText: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20
  }
});
