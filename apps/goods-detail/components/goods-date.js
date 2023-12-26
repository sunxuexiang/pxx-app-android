import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Relax, msg } from 'plume2';

@Relax
export default class GoodsDate extends Component {
  static relaxProps = {
    goodsInfo: 'goodsInfo',
    goodsInfos: 'goodsInfos',
  };

  render() {
    const {
      goodsInfo
    } = this.props.relaxProps;
    const goodsInfoBatchNo = goodsInfo.get('goodsInfoBatchNo');
    return (
      <View style={styles.container}>
        <View style={styles.spec}>
          <Text allowFontScaling={false} style={styles.specLabel}>
            生产日期
          </Text>
          <Text allowFontScaling={false} style={styles.specText}>
            &nbsp;&nbsp;&nbsp;{goodsInfoBatchNo}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  spec: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 48,
    paddingHorizontal: 12
  },
  specLabel: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)',
    fontWeight: '500'
  },
  specText: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)',
    paddingRight: 5
  }
});
