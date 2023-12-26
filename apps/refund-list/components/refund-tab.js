import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import { priceColor, mainColor } from 'wmkit/styles/index';

const tabList = [
  { label: '全部', tabKey: 'all' },
  { label: '待审核', tabKey: 'INIT' },
  { label: '待填写物流', tabKey: 'AUDIT' },
  { label: '待商家收货', tabKey: 'DELIVERED' },
  { label: '待退款', tabKey: 'RECEIVED' },
  { label: '已完成', tabKey: 'COMPLETED' },
  { label: '拒绝退款', tabKey: 'REJECT_REFUND' },
  { label: '拒绝收货', tabKey: 'REJECT_RECEIVE' },
  { label: '已作废', tabKey: 'VOID' }
];

@Relax
export default class RefundTab extends React.Component {
  static relaxProps = {
    key: 'key',
    onTabChange: noop
  };

  render() {
    let { key, onTabChange } = this.props.relaxProps;
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={styles.bar}
        style={styles.container}
      >
        {tabList.map((tabItem) => {
          return (
            <TouchableOpacity
              key={tabItem.tabKey}
              style={[styles.nav, key === tabItem.tabKey && { borderBottomColor: mainColor }]}
              onPress={() => onTabChange(tabItem.tabKey)}
            >
              <Text
                style={[
                  styles.item,
                  key === tabItem.tabKey && { color: priceColor }
                ]}
                allowFontScaling={false}
              >
                {tabItem.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: 40,
    height: 40,
    maxHeight: 40,
    backgroundColor: '#fff'
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
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
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    flex: 1,
    marginHorizontal: 5
  }
});
