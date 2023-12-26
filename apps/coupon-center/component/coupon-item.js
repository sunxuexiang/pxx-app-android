import React, { Component } from 'react';
import { msg } from 'plume2';
import {
  Image,
  ImageBackground,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { mainColor, screenWidth } from 'wmkit/styles/index';
import * as WMkit from 'wmkit/kit';
import LinearGradient from 'react-native-linear-gradient';
import CountDown from './count-down';
import { config } from 'wmkit/config';
const willEnd = require('../img/will-end.png');
const willLose = require('../img/will-lose.png');
const COUPON_TYPE = {
  0: { img: {uri: config.OSS_HOST + '/assets/image/theme/currency-bg.png'}, text: '通用券' },
  1: { img: {uri: config.OSS_HOST + '/assets/image/theme/currency-bg.png'}, text: '店铺券' },
  2: { img: {uri: config.OSS_HOST + '/assets/image/theme/currency-bg.png'}, text: '运费券' }
};

export default class CouponItem extends Component {
  constructor(props) {
    super(props);
    //debug
    window._store = this;
  }
  render() {
    const {
      coupon: couponInfo,
      otherProps: otherProps,
      countOver,
      couponStateChanged: couponStateChanged,
      fetchCoupon: fetchCoupon
    } = this.props;

    return (
      <View style={styles.item}>
        {!(
          couponStateChanged.toJS()[couponInfo.activityConfigId] &&
          couponStateChanged.toJS()[couponInfo.activityConfigId].countOver
        ) && (
          <View style={[styles.bg, { borderLeftColor: mainColor }]}>
            {couponInfo.couponWillEnd ? (
              <Image style={styles.expiring} source={willEnd} />
            ) : (
              this._getCouponStatus(couponInfo) === 2 && (
                <Image style={styles.expiring} source={willLose} />
              )
            )}
            <Text
              allowFontScaling={false}
              style={[styles.price, { color: mainColor }]}
              numberOfLines={1}
            >
              <Text allowFontScaling={false} style={[styles.symbol, { color: mainColor }]}>
                ¥
              </Text>
              {couponInfo.denomination}
            </Text>
            <Text allowFontScaling={false} style={styles.tip} numberOfLines={1}>
              {couponInfo.fullBuyType === 0
                ? '无门槛'
                : `满${couponInfo.fullBuyPrice}可用`}
            </Text>
            {couponInfo.couponWillEnd && (
              <Image
                source={require('../img/expiring.png')}
                style={styles.expiringImg}
              />
            )}
          </View>
        )}
        {!(
          couponStateChanged.toJS()[couponInfo.activityConfigId] &&
          couponStateChanged.toJS()[couponInfo.activityConfigId].countOver
        ) && (
          <View style={styles.rightBox}>
            <View style={styles.getConpon}>
              <View style={styles.getLeft}>
                <View style={styles.topBox}>
                  <View
                    style={styles.labelBox}
                  >
                    <ImageBackground
                      style={styles.labelBox}
                      source={COUPON_TYPE[couponInfo.couponType].img}
                    >
                      <Text allowFontScaling={false} style={styles.labelText}>
                        {COUPON_TYPE[couponInfo.couponType].text}
                      </Text>
                    </ImageBackground>
                  </View>
                  <Text
                    allowFontScaling={false}
                    style={[styles.text, { flex: 1 }]}
                    numberOfLines={1}
                  >
                    {this._buildStorename(couponInfo, otherProps)}
                  </Text>
                </View>
                <View style={styles.rangeBox}>
                  <Text
                    allowFontScaling={false}
                    numberOfLines={1}
                    style={[
                      styles.rangeText,
                      { maxWidth: screenWidth - 200 }
                    ]}
                  >
                    {couponInfo.prompt}
                  </Text>
                </View>
                <View style={styles.bottomBox}>
                  <Text
                    allowFontScaling={false}
                    style={styles.rangeText}
                    numberOfLines={1}
                  >
                    {couponInfo.rangeDayType === 1
                      ? `领取后${couponInfo.effectiveDays}天内有效`
                      : `${couponInfo.couponStartTime}至${
                          couponInfo.couponEndTime
                        }`}
                  </Text>
                </View>
              </View>

              <View>
                {/* {couponStateChanged.toJS()}- */}

                {/* 已领 */}
                {(couponInfo.hasFetched ||
                  (couponStateChanged.toJS()[couponInfo.activityConfigId] &&
                    couponStateChanged.toJS()[couponInfo.activityConfigId]
                      .hasFetched)) && (
                  <View style={[styles.lastBox, { alignItems: 'flex-end' }]}>
                    <Image
                      source={require('../img/get-coupon.png')}
                      style={styles.getCoupon}
                    />
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={[styles.bottomBtn, { backgroundColor: mainColor }]}
                      onPress={() =>
                        this._handleClick(couponInfo, couponStateChanged)
                      }
                    >
                      <Text allowFontScaling={false} style={styles.bottomBtnText}>
                        {this._txtBox(couponInfo, couponStateChanged)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                {/* 立即领取   */}
                {!couponInfo.hasFetched &&
                  couponInfo.leftFlag &&
                  !(
                    couponStateChanged.toJS()[couponInfo.activityConfigId] &&
                    couponStateChanged.toJS()[couponInfo.activityConfigId]
                      .hasFetched
                  ) && (
                    <View style={styles.lastBox}>
                      {!couponInfo.activityWillEnd && (
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <Text
                            allowFontScaling={false}
                            style={styles.activeText}
                          >
                            已抢
                          </Text>
                          <Text
                            allowFontScaling={false}
                            style={[styles.timeText, { color: mainColor }]}
                          >
                            {(couponInfo.fetchPercent * 100).toFixed(0)}%
                          </Text>
                        </View>
                      )}
                      {couponInfo.activityWillEnd && (
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <Text
                            allowFontScaling={false}
                            style={styles.activeText}
                          >
                            即将结束
                          </Text>
                          <CountDown
                            timeStyle={{
                              paddingBottom: 4,
                              paddingTop: 0
                            }}
                            allowFontScaling={false}
                            numberOfLines={1}
                            endHandle={countOver}
                            parame={couponInfo}
                            timeOffset={(couponInfo.activityCountDown / 1000 -
                              3600 >
                            0
                              ? couponInfo.activityCountDown / 1000
                              : couponInfo.activityCountDown / 1000 + 59
                            ).toFixed(0)}
                            coupon={true}
                            // timeOffset={12 + 59}
                          />
                        </View>
                      )}

                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          if (!WMkit.isLoginOrNotOpen()) {
                            msg.emit('loginModal:toggleVisible', {
                              callBack: () => {
                                msg.emit('router: goToNext', {
                                  routeName: 'CouponCenter'
                                });
                              }
                            });
                          } else {
                            fetchCoupon(couponInfo);
                          }
                        }}
                        // onPress={() => fetchCoupon()}
                      >
                        <LinearGradient
                          style={[styles.bottomBtn, { backgroundColor: mainColor }]}
                          colors={[mainColor, mainColor]}
                          start={{ x: 0, y: 0.5 }}
                          end={{ x: 1, y: 0.5 }}
                        >
                          <Text
                            allowFontScaling={false}
                            style={styles.bottomBtnText}
                          >
                            领取
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  )}
                {/* 已抢光 */}
                {!couponInfo.hasFetched &&
                  !couponInfo.leftFlag && (
                    <View style={styles.lastBox}>
                      <ImageBackground
                        style={styles.grayBg}
                        source={require('../img/gray.png')}
                      >
                        <Text
                          allowFontScaling={false}
                          style={styles.invalidText}
                        >
                          已抢光
                        </Text>
                      </ImageBackground>
                    </View>
                  )}
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }

  /**
   * 优惠券使用店铺名称
   */
  _buildStorename = (coupon, otherProps) => {
    let text = '';
    if (coupon.platformFlag === 1) {
      text = '全平台可用';
    } else {
      text = otherProps.storeMap[coupon.storeId];
      text = `仅${text}可用`;
    }
    return `${text}`;
  };

  /**
   * 优惠券使用范围
   */
  _buildScope = (coupon, otherProps) => {
    let text = '';
    let scopeType = '';
    if (coupon.scopeType == 0) {
      scopeType = '商品：';
      text = '全部商品';
    } else if (coupon.scopeType == 1) {
      scopeType = '品牌：';
      text = '仅限';
      otherProps &&
        coupon.scopeIds.forEach((value) => {
          let name = otherProps.brandMap[value]
            ? '[' + otherProps.brandMap[value] + ']'
            : '';
          text = `${text}${name}`;
        });
    } else if (coupon.scopeType == 2) {
      scopeType = '品类：';
      text = '仅限';
      otherProps &&
        coupon.scopeIds.forEach((value) => {
          let name = otherProps.cateMap[value]
            ? '[' + otherProps.cateMap[value] + ']'
            : '';
          text = `${text}${name}`;
        });
    } else if (coupon.scopeType == 3) {
      scopeType = '分类：';
      text = '仅限';
      coupon.scopeIds.forEach((value) => {
        let name = otherProps.storeCateMap[value]
          ? '[' + otherProps.storeCateMap[value] + ']'
          : '';
        text = `${text}${name}`;
      });
    } else {
      scopeType = '商品：';
      text = '部分商品';
    }

    return `${scopeType}${text}`;
  };

  /**
   * 按钮文本展示
   */
  _txtBox = (coupon, couponStateChanged) => {
    if (
      couponStateChanged.toJS()[coupon.activityConfigId] &&
      couponStateChanged.toJS()[coupon.activityConfigId].hasFetched
    ) {
      return !this._convertCouponStarted(coupon) ? '查看可用' : '立即使用';
    }
    if (coupon.hasFetched) {
      return !coupon.couponStarted ? '查看可用' : '立即使用';
    }
  };

  /**
   * 点击事件
   */
  _handleClick = (coupon, couponStateChanged) => {
    if (
      couponStateChanged.toJS()[coupon.activityConfigId] &&
      couponStateChanged.toJS()[coupon.activityConfigId].hasFetched
    ) {
      this._goCoupronPromotion(coupon);
    }
    if (coupon.hasFetched) {
      this._goCoupronPromotion(coupon);
    }
  };

  /**
   * 1：查看使用范围
   * 2：立即使用
   */
  _goCoupronPromotion = (coupon) => {
    msg.emit('router: goToNext', {
      routeName: 'CouponPromotion',
      couponId: coupon.couponId,
      activityId: coupon.activityId
    });
  };

  /**
   * 计算couponStarted 优惠券开始标记
   * @private
   */
  _convertCouponStarted = (coupon) => {
    let couponStarted = false;
    if (coupon.rangeDayType === 0) {
      if (
        new Date(coupon.couponStartTime.replace(/-/g, '/')).getTime() -
          new Date().getTime() <
        0
      ) {
        couponStarted = true;
      }
    }
    //领取生效
    if (coupon.rangeDayType === 1) {
      couponStarted = true;
    }

    return couponStarted;
  };

  /**
   * 获取优惠券状态
   * 1.立即领取 百分比
   * 2.立即领取 倒计时
   * 3.已经领取  立即使用|查看使用范围
   * 4.
   * 5.已抢光
   */
  _getCouponStatus = (coupon) => {
    let status = 0;
    // 立即领取
    if (!coupon.hasFetched && coupon.leftFlag) {
      // 1.立即领取 百分比
      status = 1;
      if (coupon.activityWillEnd) {
        //2.立即领取 倒计时
        status = 2;
      }
    }
    // 3.已经领取  立即使用|查看使用范围
    if (coupon.hasFetched) {
      status = 3;
    }
    // 5.已抢光
    if (!coupon.hasFetched && !coupon.leftFlag) {
      status = 5;
    }
    return status;
  };
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 13,
    paddingTop: 12,
    flex: 1
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
  expiring: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 32,
    height: 32
  },
  item: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginBottom: 12
  },
  rightBox: {
    flex: 1,
    height: 92,
    justifyContent: 'center',
    paddingRight: 16,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: '#fff',
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
  topLeft: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
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
  lastBox: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeText: {
    fontSize: 12,
    color: '#999'
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 6
  },
  getCoupon: {
    width: 40,
    height: 40,
    marginBottom: 5
  },
  expiringImg: {
    width: 71,
    height: 41,
    position: 'absolute',
    top: 0,
    left: 0
  },
  bottomBtnText: {
    fontSize: 10,
    color: '#fff'
  }
});
