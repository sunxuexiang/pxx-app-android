import React from 'react';
import { Relax } from 'plume2';

import { WmListView, noop, WMEmpty } from 'wmkit';
import OrderItem from './order-item';
import { number } from 'prop-types';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Keyboard
} from 'react-native';

const tabStatus = [
  { label: '全部订单', key: '' },
  { label: '拼团订单', key: 'assemble-order' }
  // { label: '积分兑换订单', key: 'points-order' }
];

@Relax
export default class OrderCateMask extends React.Component {
  static relaxProps = {
    // changeTopActive: noop,
    changeCateMask: noop,
    tabsChange: noop,
    // key: 'key',
    showCateMask: 'showCateMask',
    // 积分开关
    pointsIsOpen: 'pointsIsOpen'
  };

  render() {
    const { changeCateMask, tabsChange, pointsIsOpen } = this.props.relaxProps;

    return (
      <View style={styles.orderCateMask}>
        <View style={styles.couponContent}>
          <View style={styles.couponList}>
            {tabStatus.map((cateItme, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.couponcIem}
                  onPress={() => {
                    Keyboard.dismiss();
                    tabsChange(cateItme.key);
                    changeCateMask();
                  }}
                >
                  <Text numberOfLines={1} style={styles.label}>
                    {cateItme.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
            {/*{pointsIsOpen && (*/}
              {/*<TouchableOpacity*/}
                {/*key="points-order"*/}
                {/*style={styles.couponcIem}*/}
                {/*onPress={() => {*/}
                  {/*Keyboard.dismiss();*/}
                  {/*tabsChange('points-order');*/}
                  {/*changeCateMask();*/}
                {/*}}*/}
              {/*>*/}
                {/*<Text numberOfLines={1} style={styles.label}>*/}
                  {/*积分兑换订单*/}
                {/*</Text>*/}
              {/*</TouchableOpacity>*/}
            {/*)}*/}
          </View>
        </View>
        <TouchableOpacity
          style={styles.couponBottom}
          onPress={() => {
            changeCateMask();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  orderCateMask: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999
  },

  couponContent: {
    backgroundColor: '#fff',
    width: '100%',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  couponList: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexWrap: 'wrap',
    overflow: 'scroll',
    flexDirection: 'row'
  },
  couponcIem: {
    backgroundColor: '#f5f5f5',
    marginRight: 10,
    marginBottom: 8,
    borderRadius: 14
  },
  label: {
    fontSize: 12,
    height: 28,
    lineHeight: 28,
    paddingHorizontal: 20
  }
});
