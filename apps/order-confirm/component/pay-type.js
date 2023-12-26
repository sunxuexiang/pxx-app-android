import React, { Component } from 'react';
import { View, Text, StyleSheet, PixelRatio } from 'react-native';

import { Relax } from 'plume2';

import { noop } from 'wmkit/noop';
import RadioBox from 'wmkit/radio-box';

@Relax
export default class PayType extends Component {
  static relaxProps = {
    payOptions: 'payOptions',
    payType: 'payType',

    onSelectPayInfo: noop
  };

  render() {
    const { payOptions, payType, onSelectPayInfo } = this.props.relaxProps;

    return (
      <View style={styles.payWays}>
        <Text allowFontScaling={false} style={styles.payText}>支付方式</Text>
        <RadioBox
          data={payOptions.toJS()}
          checked={payType}
          onCheck={v => onSelectPayInfo(v)}
          style={{ width: '46%' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  payWays: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    backgroundColor: '#ffffff',
    marginBottom: 10
  },
  payText: {
    fontSize: 14,
    color: '#333333',
    margin: 0,
    fontWeight: '400',
    paddingLeft: 5,
    marginBottom: 5
  }
});
