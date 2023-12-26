/**
 * Created by feitingting on 2017/9/8.
 */
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Relax } from 'plume2';

@Relax
export default class ImproveResult extends React.Component {
  constructor(props) {
    super(props);
  }

  static relaxProps = {
    checked: 'checked',
    initialName: 'initialName',
    minutes: 'minutes'
  };

  render() {
    const { checked, initialName, minutes } = this.props.relaxProps;
    return checked == 0 && initialName != '' ? (
      <View style={styles.header}>
        <Image style={styles.img} source={require('../img/result-suc.png')} />
        <Text allowFontScaling={false} style={[styles.text, {fontSize: 16, fontWeight: '500', marginTop: 16}]}>账户信息提交成功！</Text>
        <Text allowFontScaling={false} style={[styles.text, {color: 'rgba(0,0,0,0.4)', marginTop: 12}]}>
          您的账户信息已经提交审核
        </Text>
        <Text allowFontScaling={false} style={[styles.text, {color: 'rgba(0,0,0,0.4)'}]}>
          请耐心等待
        </Text>
        <Text allowFontScaling={false} style={[styles.text, {color: 'rgba(0,0,0,0.4)'}]}>
        {minutes}s后自动跳转到登录页面
        </Text>
      </View>
    ) : null;
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
