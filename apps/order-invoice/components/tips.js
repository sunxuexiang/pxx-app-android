import React from 'react';
import { View, Text, StyleSheet, Image, PixelRatio } from 'react-native';
import { mainColor } from '@/wmkit/styles';

export default class Tips extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <Image style={[styles.icon, { tintColor: mainColor }]} source={require('../img/warming.png')} />
        <Text style={[styles.tips, { color: mainColor }]} allowFontScaling={false}>
          如需增值税专用发票，需提前提交增票资质给工作人员审核
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 16,
    height: 16,
    marginRight: 2
  },
  header: {
    backgroundColor: '#cfe5f5',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical:12
  },
  tips: {
    fontSize: 12,
    lineHeight:20
  }
});
