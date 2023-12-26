import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
  TouchableOpacity
} from 'react-native';
import { Relax } from 'plume2';

import { mainColor } from 'wmkit/styles/index';
import { noop } from 'wmkit/noop';
import LinearGradient from 'react-native-linear-gradient';

@Relax
export default class Bottom extends Component {
  static relaxProps = {
    orderId: 'orderId',

    onConfirm: noop
  };

  render() {
    const { onConfirm, orderId } = this.props.relaxProps;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => onConfirm(orderId)}>
          <LinearGradient
            colors={[mainColor, mainColor]}
            style={[styles.btn, { backgroundColor: mainColor }]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <Text allowFontScaling={false} style={[styles.whiteText]}>
              确认收货
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 10,
    justifyContent: 'flex-end',
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#e1e1e1',
    paddingRight: 20,
    paddingVertical:30
  },
  btn: {
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 5
  },
  whiteText: {
    color: '#fff',
    fontSize: 16
  },
});
