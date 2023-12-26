import React, { Component } from 'react';
import { Relax } from 'plume2';
import { View, Text, Image, StyleSheet, PixelRatio } from 'react-native';

import { mainColor, screenHeight } from 'wmkit/styles/index';

const NoneImg = require('../component/img/none.png');

@Relax
export default class Logistics extends Component {
  static relaxProps = {
    detail: 'detail',
    result: 'result'
  };

  render() {
    const { result, detail } = this.props.relaxProps;

    return result ? (
      <View>
        <View style={styles.title}>
          <Text allowFontScaling={false} style={styles.h2}>
            物流详情
          </Text>
        </View>
        <View style={styles.logisticBox}>
          {detail.map((v) => {
            return (
              <View key={Math.random()} style={styles.item}>
                <View style={styles.line}>
                  <Image
                    style={[styles.img, { tintColor: mainColor }]}
                    source={require('./img/dot.png')}
                  />
                  <Text
                    style={[styles.dark, { color: mainColor }]}
                    allowFontScaling={false}
                  >
                    {v.context}
                  </Text>
                </View>
                <Text
                  allowFontScaling={false}
                  style={[styles.time, { color: mainColor }]}
                >
                  {v.time}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    ) : (
        <View style={styles.box}>
          <Image source={NoneImg} style={{ width: 200, height: 200 }} />
          <Text allowFontScaling={false} style={styles.dark}>暂无相关物流信息</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  logisticBox: {
    backgroundColor: '#ffffff'
  },
  item: {
    padding: 12,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb'
  },
  img: {
    width: 4.5,
    height: 4.5,
    marginRight: 5,
    marginTop: 8
  },
  dark: {
    color: '#666666',
    fontSize: 14
  },
  line: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  time: {
    color: '#999999',
    fontSize: 14,
    marginTop: 12
  },
  title: {
    height: 40,
    justifyContent: 'center',
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1 / PixelRatio.get(),
    paddingHorizontal: 12
  },
  h2: {
    fontSize: 12,
    color: '#666'
  },
  darktext: {
    color: '#666',
    fontSize: 12,
    margin: 0,
    lineHeight: 25
  },
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: screenHeight - 200
  }
});
