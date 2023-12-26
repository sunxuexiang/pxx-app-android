import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Relax } from 'plume2';

import { noop } from 'wmkit/noop';
import { mainColor } from 'wmkit/styles/index';

/**
 * 订单tab datasource
 */
const tabStatus = [
  { label: '全部', key: '' },
  { label: '待发货', key: 'flowState-AUDIT' },
  { label: '待收货', key: 'flowState-DELIVERED' },
  { label: '已完成', key: 'flowState-COMPLETED' }
];

@Relax
export default class RefundTab extends React.Component {
  static relaxProps = {
    changeTopActive: noop,
    key: 'key'
  };

  render() {
    const { changeTopActive, key } = this.props.relaxProps;

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
                style={[styles.nav, key === tabItem.key && { borderBottomColor: mainColor }]}
                onPress={() => changeTopActive(tabItem.key)}
              >
                <Text
                  style={[
                    styles.item,
                    key === tabItem.key && { color: mainColor }
                  ]}
                  allowFontScaling={false}
                >
                  {tabItem.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: '#fff'
  },
  bar: {
    flexDirection: 'row'
  },
  item: {
    color: '#333333',
    fontSize: 12,
    paddingHorizontal: 26
  },
  nav: {
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginHorizontal: 3
  }
});
