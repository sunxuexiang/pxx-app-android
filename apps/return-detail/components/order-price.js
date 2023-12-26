/**
 * Created by hht on 2017/8/30.
 */
import React, { Component } from 'react';
import { View, StyleSheet, Text, PixelRatio } from 'react-native';
import { Relax } from 'plume2';

import { priceColor } from 'wmkit/styles/index';

@Relax
export default class OrderPrice extends Component {
  static relaxProps = {
    detail: 'detail',
    pointsIsOpen: 'pointsIsOpen'
  };

  render() {
    const { detail, pointsIsOpen } = this.props.relaxProps;

    // 总额
    const totalPrice = detail.getIn(['returnPrice', 'totalPrice']) || 0;
    // 改价金额
    const actualReturnPrice = detail.getIn([
      'returnPrice',
      'actualReturnPrice'
    ]);
    // 应退金额，如果对退单做了改价，使用actualReturnPrice，否则，使用总额totalPrice
    const payPrice = actualReturnPrice || totalPrice;
    const returnFlowState = detail.get('returnFlowState');
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text allowFontScaling={false} style={styles.text}>
            应退金额
          </Text>
          <Text allowFontScaling={false} style={[styles.price, { color: priceColor }]}>
            ¥{totalPrice.toFixed(2)}
          </Text>
        </View>
        {returnFlowState == 'COMPLETED' && (
          <View style={styles.item}>
            <Text allowFontScaling={false} style={styles.text}>
              实退金额
            </Text>
            <Text allowFontScaling={false} style={styles.grey}>
              ¥{payPrice.toFixed(2)}
            </Text>
          </View>
        )}

        {pointsIsOpen && (
          <View style={styles.item}>
            <Text allowFontScaling={false} style={styles.text}>
              应退积分
            </Text>
            <Text allowFontScaling={false} style={styles.grey}>
              {detail.getIn(['returnPoints', 'applyPoints']) || 0}
            </Text>
          </View>
        )}

        {pointsIsOpen && (
          <View style={styles.item}>
            <Text allowFontScaling={false} style={styles.text}>
              实退积分
            </Text>
            <Text allowFontScaling={false} style={styles.grey}>
              {(returnFlowState == 'COMPLETED' &&
                (detail.getIn(['returnPoints', 'actualPoints']) || 0)) ||
                0}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#ebebeb'
  },
  item: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 30,
    alignItems: 'center'
  },
  text: {
    color: '#333333',
    fontSize: 12
  },
  price: {
    fontSize: 14
  },
  grey: {
    fontSize: 12,
    color: '#333'
  }
});
