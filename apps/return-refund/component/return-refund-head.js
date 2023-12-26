import React from 'react';
import { View, StyleSheet, PixelRatio, Text } from 'react-native';
import { Relax } from 'plume2';

/**
 * 退货商品头部
 */
@Relax
export default class ReturnRefundHead extends React.Component {
  static relaxProps = {
    tid: 'tid'
  };

  render() {
    return (
      <View style={styles.orderNumTitle}>
        <Text style={styles.text}>订单号：{this.props.relaxProps.tid}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  orderNumTitle: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    marginBottom: 10
  },
  text: {
    fontSize: 14,
    color: '#333333'
  }
});
