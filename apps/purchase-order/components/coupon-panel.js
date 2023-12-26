import React, { Component } from 'react';
import { Relax } from 'plume2';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform
} from 'react-native';

import { noop } from 'wmkit/noop';
import * as _ from '../../../wmkit/common/util'; // added by scx 
import { screenWidth, screenHeight } from 'wmkit/styles/index';
import CouponItem from './coupon-item';

const isAndroid = Platform.OS === 'android';

@Relax
export default class CouponPanel extends Component {
  static relaxProps = {
    //可领取的优惠券
    couponList: 'couponList',
    //店铺名称列表
    storeList: 'storeList',
    //立即领取优惠券
    receiveCoupon: noop,
    //隐藏弹窗
    changeCoupon: noop
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      changeCoupon,
      couponList,
      storeList,
      receiveCoupon
    } = this.props.relaxProps;

    return (
      <View style={styles.panelBottom}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.mask}
          onPress={() => changeCoupon(null)}
        />
        <View style={styles.panelBody}>
          <View style={styles.panelTitle}>
            <Text style={styles.title} allowFontSacling={false}>
              领券
            </Text>
            <TouchableOpacity
              style={styles.touchClose}
              activeOpacity={0.8}
              onPress={() => changeCoupon(null)}
            >
              <Image
                source={require('../img/close.png')}
                style={styles.close}
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            alwaysBounceHorizontal={false}
            style={styles.panelInfo}
            contentContainerStyle={{
              ..._.ifIphoneX(
                {
                  paddingBottom: 25
                },
                {
                  paddingBottom: isAndroid ? 25 : 0
                }
              )
            }}
          >
            <View style={styles.tipsBox}>
              <Text
                allowFontSacling={false}
                style={styles.infoText}
                numberOfLines={1}
              >
                可领取的优惠券
              </Text>
            </View>
            <View style={styles.list}>
              {couponList.map((coupon, i) => {
                let storeName =
                  storeList && storeList.get(`${[coupon.get('storeId')]}`);
                return (
                  <CouponItem
                    receiveCoupon={receiveCoupon}
                    coupon={coupon}
                    key={i}
                    storeName={storeName}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panelBottom: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    zIndex: 1000
  },
  mask: {
    backgroundColor: 'rgba(0,0,0,.5)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth,
    height: screenHeight
  },
  panelBody: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: screenWidth,
    maxHeight: screenHeight * 0.75,
    backgroundColor: '#fff'
  },
  panelTitle: {
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb'
  },
  title: {
    textAlign: 'center',
    fontSize: 16
  },
  touchClose: {
    position: 'absolute',
    top: 15,
    right: 15
  },
  close: {
    width: 16,
    height: 16
  },
  panelInfo: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12
  },
  tipsBox: {
    height: 45,
    justifyContent: 'center'
  },
  infoText: {
    fontSize: 12,
    color: '#333'
  },
  list: {
    flex: 1
  }
});
