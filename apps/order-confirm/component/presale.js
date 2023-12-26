import React, { Component } from 'react';
import { View, Text, StyleSheet, PixelRatio, Image, TouchableOpacity } from 'react-native';

import { Relax } from 'plume2';

import { noop } from 'wmkit/noop';
import { screenWidth } from '@/wmkit/styles';

@Relax
export default class Presale extends Component {
  static relaxProps = {
    stores: 'stores'
  };

  render() {
    return (
      <View style={styles.payWays}>
        <Image style={styles.line} source={require('../img/presale.png')}/>
        <Text style={styles.payText}>预售商品，定金不支持退款，请仔细考虑后再付款哦~</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  payWays: {
    height: 50,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    backgroundColor: 'rgba(255, 243, 235, 1)',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  payText: {
    fontSize: 14,
    color: 'rgba(255, 102, 0, 1)',
    margin: 0,
    fontWeight: '400',
    paddingLeft: 10
  },
  playIcon: {
    width: 70,
    height: 70
  },
  line: {
    height: 20,
    width: 20,
    position: 'absolute',
    top: 14,
    left: 5
  }
});