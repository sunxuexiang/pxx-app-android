import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  PixelRatio
} from 'react-native';
import { msg } from 'plume2';

import { mainColor } from 'wmkit/styles/index';
import * as WMkit from 'wmkit/kit';

const generalImg = require('../img/coupon-general.png'); //通用券
const storeImg = require('../img/coupon-store.png'); //店铺券
const COUPON_TYPE = {
  0: '通用券',
  1: '店铺券',
  2: '运费券'
};

export default class CouponItem extends Component {
  render() {
    const { coupon, storeName } = this.props;
    return (
      <View style={styles.item}>
        <ImageBackground
          style={styles.bg}
          source={coupon.get('platformFlag') === 1 ? generalImg : storeImg}
        >
          <Text allowFontScaling={false} style={styles.price} numberOfLines={1}>
            <Text allowFontScaling={false} style={styles.symbol}>
              ¥
            </Text>
            {coupon.get('denomination')}
          </Text>
          <Text allowFontScaling={false} style={styles.tip} numberOfLines={1}>
            {coupon.get('fullBuyType') === 0
              ? '无门槛'
              : `满${coupon.get('fullBuyPrice')}可用`}
          </Text>
          {coupon.get('couponWillEnd') && (
            <Image
              source={require('../img/expiring.png')}
              style={styles.expiringImg}
            />
          )}
        </ImageBackground>
        <View style={styles.rightBox}>
          {!coupon.get('hasFetched') &&
            coupon.get('leftFlag') &&
            this._storeNameBox(coupon, storeName)}
          <View style={styles.getConpon}>
            <View style={styles.getLeft}>
              {((!coupon.get('hasFetched') && !coupon.get('leftFlag')) ||
                coupon.get('hasFetched')) &&
                this._storeNameBox(coupon, storeName)}
              <View style={styles.rangeBox} />
              <View style={styles.bottomBox}>
                <Text
                  allowFontScaling={false}
                  style={[styles.text, { flex: 1 }]}
                  numberOfLines={1}
                >
                  {coupon.get('rangeDayType') === 1
                    ? `领取后${coupon.get('effectiveDays')}天内有效`
                    : `${coupon.get('couponStartTime')}至${coupon.get(
                        'couponEndTime'
                      )}`}
                </Text>
              </View>
            </View>
            <View style={styles.lastBox}>
              {!coupon.get('hasFetched') &&
                !coupon.get('leftFlag') && (
                  <View style={styles.lastBox}>
                    <ImageBackground
                      style={styles.grayBg}
                      source={require('../img/gray.png')}
                    >
                      <Text allowFontScaling={false} style={styles.invalidText}>
                        已抢光
                      </Text>
                    </ImageBackground>
                  </View>
                )}
              {coupon.get('hasFetched') && (
                <Image
                  source={require('../img/get-coupon.png')}
                  style={styles.getImg}
                />
              )}
              {(coupon.get('hasFetched') || coupon.get('leftFlag')) && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    styles.bottomBtn,
                    !coupon.get('hasFetched') &&
                      coupon.get('leftFlag') && { borderColor: mainColor }
                  ]}
                  onPress={() => this._handleClick(coupon)}
                >
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.text,
                      !coupon.get('hasFetched') &&
                        coupon.get('leftFlag') && { color: mainColor }
                    ]}
                  >
                    {this._txtBox(coupon)}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }

  /**
   * 按钮文本展示
   */
  _txtBox = (coupon) => {
    if (!coupon.get('hasFetched') && coupon.get('leftFlag')) {
      return '立即领取';
    }
    if (coupon.get('hasFetched')) {
      return !coupon.get('couponStarted') ? '查看可用' : '立即使用';
    }
  };

  /**
   * 点击事件
   */
  _handleClick = (coupon) => {
    const { receiveCoupon, closeCouponModal } = this.props;
    if (window.token) {
      if (coupon.get('hasFetched')) {
        msg.emit('router: goToNext', {
          routeName: 'CouponPromotion',
          couponId: coupon.get('couponId'),
          activityId: coupon.get('activityId')
        });
      } else {
        receiveCoupon(coupon.get('couponId'), coupon.get('activityId'));
      }
    } else {
      //未登录，先关闭优惠券弹框，再调出登录弹框
      closeCouponModal();
      msg.emit('loginModal:toggleVisible', {
        callBack: null
      });
    }
  };

  /**
   * 平台/店铺名称 展示
   */
  _storeNameBox = (coupon, storeName) => {
    return (
      <View style={styles.topBox}>
        <View
          style={[
            styles.labelBox,
            coupon.get('platformFlag') === 0 ? {
              backgroundColor: '#cfa864'
            } : { backgroundColor: mainColor }
          ]}
        >
          <Text allowFontScaling={false} style={styles.labelText}>
            {COUPON_TYPE[coupon.get('couponType')]}
          </Text>
        </View>
        <Text
          allowFontScaling={false}
          style={[styles.text, { flex: 1 }]}
          numberOfLines={1}
        >
          {coupon.get('platformFlag') === 1 ? '全平台可用' : storeName}
        </Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  bg: {
    width: 117,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 5
  },
  item: {
    flexDirection: 'row',
    marginBottom: 10
  },
  rightBox: {
    backgroundColor: '#fff',
    flex: 1,
    shadowOffset: { width: 5, height: 3 },
    shadowColor: '#999',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 15,
    height: 100
  },
  price: {
    fontSize: 35,
    color: '#fff'
  },
  symbol: {
    fontSize: 18
  },
  tip: {
    fontSize: 12,
    color: '#fff',
    paddingTop: 8
  },
  topBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  labelBox: {
    width: 40,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 5
  },
  labelText: {
    color: '#fff',
    fontSize: 10
  },
  text: {
    fontSize: 10,
    color: '#000'
  },
  rangeText: {
    fontSize: 10,
    color: '#000'
  },
  rangeBox: {
    flexDirection: 'row',
    marginTop: 12,
    height: 12
  },
  bottomBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    marginTop: 10
  },
  bottomBtn: {
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderColor: '#000',
    borderWidth: 1 / PixelRatio.get(),
    borderRadius: 15,
    marginLeft: 3
  },
  grayBg: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  invalidText: {
    fontSize: 10,
    color: '#999'
  },
  getConpon: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  getLeft: {
    flex: 1
  },
  getImg: {
    width: 40,
    height: 40,
    marginLeft: 10,
    marginBottom: 6
  },
  expiringImg: {
    width: 71,
    height: 41,
    position: 'absolute',
    top: 0,
    left: 0
  },
  lastBox: {
    alignItems: 'flex-end'
  }
});
