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
import { config } from 'wmkit/config';
const storeBg = require('../img/store-bg.png');
const freightBg = require('../img/freight-bg.png');
const COUPON_TYPE = {
  0: { img: {uri: config.OSS_HOST + '/assets/image/theme/currency-bg.png'}, text: '通用券' },
  1: { img: storeBg, text: '店铺券' },
  2: { img: freightBg, text: '运费券' }
};

export default class CouponItem extends Component {
  render() {
    const { coupon, storeName } = this.props;
    return (
      <View style={styles.item}>
        <View
          style={[styles.bg, { borderLeftColor: mainColor }]}
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
              <View style={styles.rangeBox} />
              <View style={styles.bottomBox}>
                <Text
                  allowFontScaling={false}
                  style={[styles.text, { flex: 1,color:'#999' }]}
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
                      <Text allowFontScaling={false} style={styles.invalidText}>
                        已抢光
                      </Text>
                      <View style={styles.grayBtn}>
                        <Text allowFontScaling={false} style={styles.grayBtnText}>
                          领取
                        </Text>
                      </View>
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
    const { receiveCoupon } = this.props;
    if (coupon.get('hasFetched')) {
      msg.emit('router: goToNext', {
        routeName: 'CouponPromotion',
        couponId: coupon.get('couponId'),
        activityId: coupon.get('activityId')
      });
    } else {
      receiveCoupon(coupon.get('couponId'), coupon.get('activityId'));
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
          source={COUPON_TYPE[coupon.get('couponType')].img}
        >
          <Text allowFontScaling={false} style={styles.labelText}>
            {COUPON_TYPE[coupon.get('couponType')].text}
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
  item: {
    flexDirection: 'row',
    // paddingHorizontal: 12,
    marginBottom: 12
  },
  rightBox: {
    backgroundColor: '#fff',
    flex: 1,
    height: 92,
    justifyContent: 'center',
    paddingRight: 16,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6
  },
  price: {
    fontSize: 24
  },
  symbol: {
    fontSize: 10
  },
  tip: {
    fontSize: 12,
    color: '#333'
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
    fontSize: 10,
    color: '#000'
  },
  rangeText: {
    fontSize: 10,
    color: '#000'
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
    width: 56,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6
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
    alignItems: 'center'
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
    alignItems: 'center'
  },
  grayBtn:{
    width:56,
    height:20,
    borderRadius:10,
    backgroundColor:'#D8D8D8',
    alignItems:'center',
    justifyContent:'center',
    marginTop:8
  },
  grayBtnText:{
    fontSize:10,
    color:'#fff'
  },
});
