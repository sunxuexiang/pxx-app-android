import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { msg } from 'plume2';
// import * as _ from 'wmkit/common/util';
import * as _ from '../../../wmkit/common/util'; // added by scx
import { screenWidth,mainColor } from 'wmkit/styles/index';

/**
 * 促销凑单底部
 */
export default class PromotionBottom extends React.Component {
  static relaxProps = {};

  render() {
    return (
      <View style={styles.proTotal}>
        <View style={styles.info}>
          <Text style={styles.criteria} allowFontSacling={false} />
        </View>
        <TouchableOpacity
          onPress={() => {
            // msg.emit('router: back')
            msg.emit('router: goToNext', { routeName: 'PurchaseOrder' });
            msg.emit('app:bottomVisible', { key: 'CouponPromotion', visible: true });
          }}
          style={[styles.buttonBox, { backgroundColor: mainColor }]}
          activeOpacity={0.8}
        >
          <Text style={styles.button} allowFontSacling={false}>
            去购物车
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  proTotal: {
    position: 'absolute',
    width: screenWidth,
    ..._.ifIphoneX(
      {
        paddingBottom: 30,
        height: 75
      },
      {
        height: 45
      }
    ),
    left: 0,
    bottom: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ebebeb'
  },
  info: {
    paddingLeft: 10
  },
  criteria: {
    fontSize: 14,
    color: '#999'
  },
  criText: {
    fontSize: 10,
    color: '#999',
    marginLeft: 5
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 3
  },
  tipIcon: {
    width: 12.5,
    height: 12.5
  },
  buttonBox: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginRight: 5,
    borderRadius: 18
  },
  button: {
    color: '#fff',
    fontSize: 14
  }
});
