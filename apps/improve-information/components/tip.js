import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Relax } from 'plume2';
import { screenWidth } from 'wmkit/styles/index';

@Relax
export default class Tip extends React.Component {
  constructor(props) {
    super(props);
  }

  static relaxProps = {
    checked: 'checked',
    initialName: 'initialName',
    rejectReason: 'rejectReason'
  };

  render() {
    const { checked, initialName, rejectReason } = this.props.relaxProps;
    return checked == 0 && initialName == '' ? (
      <View style={styles.header}>
        <Image style={styles.img} source={require('../img/fill.png')} />
        <Text allowFontScaling={false} style={[styles.text, {marginTop: 12}]}>
          您还需完善账户信息
        </Text>
        <Text allowFontScaling={false} style={styles.text}>
          才可正常访问商品信息
        </Text>
      </View>
    ) : (
      <View style={styles.header}>
        <Image style={styles.img} source={require('../img/failed.png')} />
        <Text allowFontScaling={false} style={[styles.text, {fontSize: 16, fontWeight: '500', marginTop: 16}]}>您提交的账户信息审核未通过！</Text>
        <Text allowFontScaling={false} style={[styles.text, {color: 'rgba(0,0,0,0.4)', marginTop: 12}]}>
          原因是：<Text allowFontScaling={false} style={{ color: '#ff0022' }}>{rejectReason}</Text>
        </Text>
        <Text allowFontScaling={false} style={[styles.text, {color: 'rgba(0,0,0,0.4)'}]}>
          请您修改账户基本信息重新提交。
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 53,
    paddingBottom: 36,
    paddingHorizontal: 12
  },
  img: {
    width: 48,
    height: 48
  },
  text: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 14,
    lineHeight: 22
  }
});
