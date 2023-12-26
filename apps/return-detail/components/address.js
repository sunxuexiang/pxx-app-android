/**
 * Created by hht on 2017/8/30.
 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  PixelRatio,
  Image,
  TouchableOpacity
} from 'react-native';

import { screenWidth } from 'wmkit/styles/index';

export default class Address extends Component {
  render() {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.box}>
        <View style={styles.container}>
          <View style={styles.leftDom}>
            <Image style={styles.img} source={require('../img/location.png')} />
          </View>
          <View style={styles.rightDom}>
            <View style={styles.center}>
              <View style={styles.item}>
                <Text allowFontScaling={false} >收货人：吧啦啦小魔仙</Text>
                <Text allowFontScaling={false}>13600000000</Text>
              </View>
              <Text allowFontScaling={false} numberOfLines={2}>
                收货地址：江苏省南京市雨花台区江苏省南京市雨花台区江苏省南京市雨花台区江苏省南京市雨花台区江苏省南京市雨花台区
              </Text>
            </View>
            <Image style={styles.arrow} source={require('../img/arrow.png')} />
          </View>
        </View>
        <Image source={require('../img/line.png')} style={styles.line} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb'
  },
  container: {
    marginTop: 10,
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-between',
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#ebebeb'
  },
  leftDom: {
    justifyContent: 'center',
    marginRight: 15
  },
  rightDom: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  img: {
    width: 17,
    height: 22
  },
  arrow: {
    width: 7,
    height: 13,
    marginLeft: 10
  },
  center: {
    flex: 1
  },
  line: {
    height: 4,
    width: screenWidth
  }
});
