import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import WMCouponLabel from 'wmkit/coupon-label';

import { screenWidth } from 'wmkit/styles/index';

@Relax
export default class GoodsCoupon extends Component {
  static relaxProps = {
    couponLabels: 'couponLabels',
      goodsInfo: 'goodsInfo',
    changeCoupon: noop
  };
  render() {
    const { couponLabels,goodsInfo } = this.props.relaxProps;
    return goodsInfo.get('distributionGoodsAudit') != '2' && (
      <View style={styles.container}>
        <Text allowFontScaling={false} style={styles.text}>
          领券
        </Text>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.promotionBox}
            onPress={this._handleClick}
          >
            <View style={styles.promotion}>
              {couponLabels.slice(0, 3).map((label, i) => {
                return (
                  <WMCouponLabel
                    key={i}
                    text={label.get('couponDesc')}
                    style={{ marginRight: i === 2 ? 0 : 5 }}
                  />
                );
              })}
            </View>
            <Image
              source={require('../img/more.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  /**
   * 点击事件
   */
  _handleClick = () => {
    const { changeCoupon, couponLabels } = this.props.relaxProps;
    if (couponLabels.count() > 0) {
      changeCoupon();
    }
  };
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical:12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center'
  },
  promotionBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10
  },
  promotion: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  text: {
    color: '#333333',
    fontSize: 14,
    marginTop: 1,
    fontWeight: 'bold'
  },
  proText: {
    color: '#999',
    fontSize: 14,
    maxWidth: screenWidth - 90
  },
  icon: {
    width: 24,
    height: 24
  }
});
