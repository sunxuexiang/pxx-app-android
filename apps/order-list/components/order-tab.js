import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { Relax, msg } from 'plume2';

import { noop } from 'wmkit/noop';
import { mainColor } from 'wmkit/styles/index';

/**
 * 订单tab datasource
 */
const tabStatus = [
  { label: '全部', key: '' },
  { label: '待付款', key: 'payState-NOT_PAID' },
  { label: '待审核', key: 'flowState-INIT' },
  { label: '待发货', key: 'flowState-AUDIT' },
  { label: '待收货', key: 'flowState-DELIVERED' },
  // { label: '待评价', key: 'flowState-COMPLETED' },
  { label: '已收货', key: 'flowState-CONFIRMED' },
  { label: '已完成', key: 'flowState-COMPLETED' },
  { label: '已作废', key: 'flowState-VOID' }
];

@Relax
export default class RefundTab extends React.Component {
  static relaxProps = {
    changeTopActive: noop,
    changeCateMask: noop,
    key: 'key',
    showCateMask: 'showCateMask'
  };

  render() {
    const {
      changeTopActive,
      key,
      showCateMask,
      changeCateMask
    } = this.props.relaxProps;

    return (
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={styles.bar}
        >
          {tabStatus.map((tabItem) => {
            return (
              <TouchableOpacity
                key={tabItem.key}
                style={[styles.nav]}
                onPress={() => {
                  // if(tabItem.key === 'flowState-COMPLETED') {
                  //   msg.emit('router: goToNext', {
                  //     routeName: 'EvaluateCenter'
                  //   });
                  // } else {
                    changeTopActive(tabItem.key)
                  // }
                }}
              >
                <Text
                  style={[
                    styles.item,
                    key === tabItem.key && {color: mainColor}
                  ]}
                  allowFontScaling={false}
                >
                  {tabItem.label}
                </Text>
                {key === tabItem.key && <View style={[styles.line, { borderColor: mainColor }]} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* <TouchableOpacity
          style={styles.tabRight}
          onPress={() => {
            changeCateMask();
          }}
        >
          <Image
            style={styles.dowmImg}
            source={showCateMask ? upImg : dowmImg}
          />
        </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: '#ffff'
  },
  bar: {
    flexDirection: 'row'
  },
  item: {
    color: '#333333',
    fontSize: 12,
    paddingHorizontal: 8
  },
  nav: {
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    marginHorizontal: 5,
    position: 'relative'
  },
  line: {
    borderBottomWidth: 1,
    width: 24,
    position: 'absolute',
    bottom: 2
  },
  tabRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    height: 40,
    position: 'absolute',
    right: 10,
    top: 2
  },
  dowmImg: {
    width: 16,
    height: 16
  }
});
