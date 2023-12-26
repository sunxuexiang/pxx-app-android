import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Relax } from 'plume2';

import { noop } from 'wmkit/noop';

import { mainColor } from 'wmkit/styles/index';

@Relax
export default class CouponTab extends React.Component {
  constructor(props) {
    super(props);
  }
  static relaxProps = {
    //我的优惠券未使用总数
    unUseCount: 'unUseCount',
    //我的优惠券已使用总数
    usedCount: 'usedCount',
    //我的优惠券已过期总数
    overDueCount: 'overDueCount',
    //使用状态,0(未使用)，1(使用)，2(已过期)
    useStatus: 'useStatus',
    //我的优惠券tab页签切换
    setUseStatus: noop
  };

  render() {
    const {
      unUseCount,
      usedCount,
      overDueCount,
      useStatus,
      setUseStatus
    } = this.props.relaxProps;
    return (
      <View style={styles.tabBox}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setUseStatus(0)}
          style={
            useStatus == 0
              ? [styles.tabItem, { borderBottomColor: mainColor }]
              : styles.tabItem
          }
        >
          <Text
            allowFontScaling={false}
            style={
              useStatus == 0
                ? [styles.tabText, { color: mainColor }]
                : styles.tabText
            }
          >
            未使用(
            {unUseCount})
          </Text>
          {useStatus == 0 && <View style={[styles.line, { backgroundColor: mainColor }]} />}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setUseStatus(1)}
          style={
            useStatus == 1
              ? [styles.tabItem, { borderBottomColor: mainColor }]
              : styles.tabItem
          }
        >
          <Text
            allowFontScaling={false}
            style={
              useStatus == 1
                ? [styles.tabText, { color: mainColor }]
                : styles.tabText
            }
          >
            已使用(
            {usedCount})
          </Text>
          {useStatus == 1 && <View style={[styles.line, { backgroundColor: mainColor }]} />}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setUseStatus(2)}
          style={
            useStatus == 2
              ? [styles.tabItem, { borderBottomColor: mainColor }]
              : styles.tabItem
          }
        >
          <Text
            allowFontScaling={false}
            style={
              useStatus == 2
                ? [styles.tabText, { color: mainColor }]
                : styles.tabText
            }
          >
            已过期(
            {overDueCount})
          </Text>
          {useStatus == 2 && <View style={[styles.line, { backgroundColor: mainColor }]} />}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabBox: {
    // borderBottomColor: '#ebebeb',
    // borderBottomWidth: 1 / PixelRatio.get(),
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff'
  },
  tabItem: {
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative'
  },
  tabText: {
    fontSize: 12,
    color: '#333'
  },
  line: {
    width: 24,
    height: 2,
    position: 'absolute',
    bottom: 3
  }
});
