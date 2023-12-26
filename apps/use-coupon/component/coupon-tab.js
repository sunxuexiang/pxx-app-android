import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PixelRatio
} from 'react-native';
import { mainColor } from 'wmkit/styles/index';
import { Relax } from 'plume2';

@Relax
export default class CouponTab extends React.Component {
  constructor(props) {
    super(props);
  }
  static relaxProps = {
    tabKey: 'tabKey',
    enableCount: 'enableCount',
    disableCount: 'disableCount',
    changeTabKey: Function
  };

  render() {
    const {
      tabKey,
      changeTabKey,
      enableCount,
      disableCount
    } = this.props.relaxProps;
    return (
      <View style={styles.tabBox}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => changeTabKey(0)}
          style={[
            styles.tabItem,
            tabKey == 0 && { borderBottomColor: mainColor }
          ]}
        >
          <Text
            allowFontScaling={false}
            style={[styles.tabText, tabKey == 0 && { color: mainColor }]}
          >
            可用优惠券(
            {enableCount})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => changeTabKey(1)}
          style={[
            styles.tabItem,
            tabKey == 1 && { borderBottomColor: mainColor }
          ]}
        >
          <Text
            allowFontScaling={false}
            style={[styles.tabText, tabKey == 1 && { color: mainColor }]}
          >
            不可用优惠券(
            {disableCount})
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabBox: {
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1 / PixelRatio.get(),
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff'
  },
  tabItem: {
    paddingVertical: 14,
    borderBottomColor: 'transparent',
    borderBottomWidth: 1
  },
  tabText: {
    fontSize: 12,
    color: '#333'
  }
});
