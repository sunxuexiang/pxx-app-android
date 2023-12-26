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
import { mainColor, screenWidth } from 'wmkit/styles/index';
import { config } from 'wmkit/config';

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
        <View
          style={[styles.bg, { borderLeftColor: mainColor }]}
          source={coupon.get('platformFlag') === 1 ? generalImg : storeImg}
        >
          <Text allowFontScaling={false} style={[styles.price, { color: mainColor }]} numberOfLines={1}>
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
        </View>
        <View style={styles.rightBox}>
          {!coupon.get('hasFetched') &&
            coupon.get('leftFlag') &&
            this._storeNameBox(coupon, storeName)}
          <View style={styles.getConpon}>
            <View style={styles.getLeft}>
              {((!coupon.get('hasFetched') && !coupon.get('leftFlag')) ||
                coupon.get('hasFetched')) &&
                this._storeNameBox(coupon, storeName)}
              <View style={styles.rangeBox}>
                <Text
                  allowFontScaling={false}
                  numberOfLines={1}
                  style={[
                    styles.rangeText,
                    { maxWidth: screenWidth - 200 }
                  ]}
                >
                  {coupon.get('prompt')}
                </Text>
              </View>
              <View style={styles.bottomBox}>
                <Text
                  allowFontScaling={false}
                  style={styles.rangeText}
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
            {!coupon.get('hasFetched') &&
                !coupon.get('leftFlag') && (
              <View style={{alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                  <View style={styles.bottomTextBox}>
                    <Text
                      allowFontScaling={false}
                      style={styles.bottomText}
                    >
                      已抢光
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                      styles.bottomBtn,
                      {backgroundColor: '#ccc'}
                    ]}
                    onPress={() => this._handleClick(coupon)}
                  >
                    <Text
                      allowFontScaling={false}
                      style={styles.bottomBtnText}
                    >
                      领取
                    </Text>
                  </TouchableOpacity>
              </View>
            )}
            <View style={{alignItems: 'center', justifyContent: 'center', height: '100%'}}>
              {coupon.get('hasFetched') && (
                <View style={styles.bottomTextBox}>
                  <Text
                    allowFontScaling={false}
                    style={styles.bottomText}
                  >
                    已领取
                  </Text>
              </View>
              )}
              {(coupon.get('hasFetched') || coupon.get('leftFlag')) && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.bottomBtn, { backgroundColor: mainColor }]}
                  onPress={() => this._handleClick(coupon)}
                >
                  <Text
                    allowFontScaling={false}
                    style={styles.bottomBtnText}
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
        <ImageBackground
          style={styles.labelBox}
          source={{uri: config.OSS_HOST + '/assets/image/theme/currency-bg.png'}}
        >
          <Text allowFontScaling={false} style={styles.labelText}>
            {COUPON_TYPE[coupon.get('couponType')]}
          </Text>
        </ImageBackground>
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
  item: {
    flexDirection: 'row',
    marginBottom: 12
  },
  bg: {
    width: 88,
    height: 92,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderLeftWidth: 2 / PixelRatio.get(),
    position: 'relative'
  },
  rightBox: {
    flex: 1,
    shadowOffset: { width: 5, height: 3 },
    shadowColor: '#999',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 18,
    height: 92,
    backgroundColor: '#fff',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    overflow: 'hidden'
  },
  price: {
    fontSize: 24,
    fontWeight: '500'
  },
  symbol: {
    fontSize: 10
  },
  tip: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.8)'
  },
  topBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  labelBox: {
    width: 38,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5
  },
  labelText: {
    color: '#fff',
    fontSize: 10
  },
  text: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)'
  },
  rangeText: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.4)'
  },
  rangeBox: {
    flexDirection: 'row',
    marginTop: 15,
    height: 12,
    alignItems: 'center'
  },
  bottomBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20
  },
  bottomBtn: {
    minWidth: 56,
    height: 20,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    borderRadius: 20
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
  },
  bottomTextBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  bottomText: {
    fontSize: 14,
    color: '#999'
  },
  bottomBtnText: {
    fontSize: 10,
    color: '#fff'
  }
});
