import React, { Component } from 'react';
import { View, Text, StyleSheet, PixelRatio } from 'react-native';
import { mainColor } from 'wmkit/styles/index';

export default class SelfSalesLabel extends Component {
  render() {
    return (
      <View style={[styles.selfSales, { backgroundColor: mainColor }]}>
        <Text allowFontSacling={false} style={styles.selfText}>
          自营
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  selfSales: {
    width: 28,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2
  },
  selfText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '500'
  }
});
