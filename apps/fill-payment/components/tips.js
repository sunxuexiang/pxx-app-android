import React from 'react';
import { View, Text, StyleSheet, Image, PixelRatio } from 'react-native';

export default class Tips extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <Image style={styles.icon} source={require('../img/warning.png')} />
        <Text style={styles.tips} allowFontScaling={false}>
          若您已线下支付，请在此填写付款单
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  header: {
    backgroundColor: '#fafafa',
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 12,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb'
  },
  tips: {
    color: '#333',
    fontSize: 12
  }
});
