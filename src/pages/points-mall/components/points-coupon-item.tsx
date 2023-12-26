import React from 'react';
import {
  ImageBackground,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import * as Progress from 'react-native-progress';

import LinearGradient from 'react-native-linear-gradient';

import moment from 'moment';
import { mainColor, screenWidth } from 'wmkit/styles/index';
import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';

type IPointsCouponItemProps = T.IProps & T.IPointsCouponItemProps;

@connect<Partial<IPointsCouponItemProps>, T.IPointsCouponItemState>(
  store2Props,
  actions
)
export default class PointsCouponItem extends React.Component<
  Partial<IPointsCouponItemProps>,
  T.IPointsCouponItemState
> {
  constructor(props: IPointsCouponItemProps) {
    super(props);
  }

  /**

   */
  render() {
    let {
      actions: { action },
      pointCoupon,
      id
    } = this.props;
    pointCoupon = this._exchangedEvent(pointCoupon);
    let couponInfo = pointCoupon.couponInfoVO;

    return (
      <View style={styles.couponCon} key={id}>
        <View style={styles.couponInner}>
          <ImageBackground
            style={styles.couponImg}
            source={require('../img/coupon-img.png')}
          >
            <Text
              allowFontScaling={false}
              numberOfLines={1}
              style={styles.moneyTxt}
            >
              <Text allowFontScaling={false} style={styles.moneyTag}>
                ￥
              </Text>
              {couponInfo.denomination}
            </Text>
            <Text
              allowFontScaling={false}
              numberOfLines={1}
              style={styles.couponTip}
            >
              {this._buildFullBuyPrice(couponInfo)}
            </Text>
          </ImageBackground>
          <View style={styles.rightBox}>
            <View style={styles.getCoupon}>
              <View style={styles.getLeft}>
                <View style={styles.topBox}>
                  <ImageBackground
                    style={styles.labelBox}
                    source={require('../img/coupon-icon.png')}
                  >
                    <Text allowFontScaling={false} style={styles.labelText}>
                      通用券
                    </Text>
                  </ImageBackground>
                  <Text
                    allowFontScaling={false}
                    style={[styles.commonText, { flex: 1 }]}
                    numberOfLines={1}
                  >
                    全平台可用
                  </Text>
                </View>
                <Text
                  allowFontScaling={false}
                  numberOfLines={1}
                  style={styles.useScope}
                >
                  限{this._buildScope(couponInfo)}
                  可用
                </Text>
                <Text
                  allowFontScaling={false}
                  numberOfLines={1}
                  style={styles.useScope}
                >
                  {this._buildRangDay(couponInfo)}
                </Text>
                <View style={styles.pointsBox}>
                  <Text allowFontScaling={false} style={[styles.points, { color: mainColor }]}>
                    {pointCoupon.points}
                  </Text>
                  <Text allowFontScaling={false} style={styles.pointsTxt}>
                    积分
                  </Text>
                </View>
              </View>
              {pointCoupon.sellOutFlag ? (
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
              ) : (
                <View style={styles.lastBox}>
                  {/* <Progress.Circle
                    style={styles.progressBox}
                    size={44} // 圆的直径
                    progress={
                      pointCoupon.exchangeCount / pointCoupon.totalCount
                    } // 进度
                    unfilledColor={'#EBEBEB'} // 剩余进度的颜色
                    color={mainColor} // 颜色
                    thickness={2} // 内圆厚度
                    direction="clockwise" // 方向
                    borderWidth={0} // 边框
                    children={
                      // 子布局
                      <View style={styles.progressInnerBox}>
                        <View style={styles.progressInner}>
                          <Text
                            allowFontScaling={false}
                            style={styles.alreadyGot}
                          >
                            已抢
                          </Text>
                          <Text
                            allowFontScaling={false}
                            style={[styles.gotPercent, { color: mainColor }]}
                          >
                            {(
                              (pointCoupon.exchangeCount /
                                pointCoupon.totalCount) *
                              100
                            ).toFixed(0)}
                            %
                          </Text>
                        </View>
                      </View>
                    }
                  /> */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      action.isPayPwdValid(pointCoupon);
                    }}
                  >
                    <LinearGradient
                      colors={['#FF8800', '#FF4D00']}
                      style={[styles.linearGradient]}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                    >
                      <Text
                        allowFontScaling={false}
                        style={styles.exchangeFont}
                      >
                        立即兑换
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }

  _exchangedEvent = (pointsCoupon) => {
    const { latestPointsCouponInfoList } = this.props.main;
    const index = latestPointsCouponInfoList.findIndex(
      (info) => info.pointsCouponId == pointsCoupon.pointsCouponId
    );
    if (index > -1) {
      pointsCoupon.exchangeCount =
        latestPointsCouponInfoList[index].exchangeCount;
      pointsCoupon.sellOutFlag = latestPointsCouponInfoList[index].sellOutFlag;
    }
    return pointsCoupon;
  };

  /***
   * 满减金额
   */
  _buildFullBuyPrice = (coupon) => {
    return coupon.fullBuyType === 0 ? '无门槛' : `满${coupon.fullBuyPrice}可用`;
  };

  /**
   * 优惠券使用范围
   */
  _buildScope = (coupon) => {
    let text = '';
    let scopeType = '';
    if (coupon.scopeType == 0) {
      scopeType = '商品：';
      text = '全部商品';
    } else if (coupon.scopeType == 1) {
      scopeType = '品牌：';
      text = '仅限';
      coupon.scopeNames.forEach((value) => {
        let name = value ? '[' + value + ']' : '';
        text = `${text}${name}`;
      });
    } else if (coupon.scopeType == 2) {
      scopeType = '品类：';
      text = '仅限';
      coupon.scopeNames.forEach((value) => {
        let name = value ? '[' + value + ']' : '';
        text = `${text}${name}`;
      });
    } else if (coupon.scopeType == 3) {
      scopeType = '分类：';
      text = '仅限';
      coupon.scopeNames.forEach((value) => {
        let name = value ? '[' + value + ']' : '';
        text = `${text}${name}`;
      });
    } else {
      scopeType = '商品：';
      text = '部分商品';
    }

    return `${scopeType}${text}`;
  };

  /***
   * 生效时间
   */
  _buildRangDay = (coupon) => {
    return coupon.rangeDayType === 1
      ? `领取后${coupon.effectiveDays}天内有效`
      : `${moment(coupon.startTime).format('YYYY-MM-DD')}至${moment(
          coupon.endTime
        ).format('YYYY-MM-DD')}`;
  };
}

const styles = StyleSheet.create({
  couponCon: {
    width: screenWidth,
    paddingHorizontal: 12,
    paddingTop: 12
  },
  couponInner: {
    width: screenWidth - 24,
    flexDirection: 'row',
    borderColor: '#eee',
    borderWidth: 1 / PixelRatio.get(),
    borderRadius: 6,
    overflow: 'hidden'
  },
  couponImg: {
    width: 88,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center'
  },
  moneyTag: {
    fontSize: 12
  },
  moneyTxt: {
    fontSize: 20,
    color: '#ffffff'
  },
  couponTip: {
    fontSize: 12,
    color: '#ffffff',
    paddingTop: 4
  },
  rightBox: {
    backgroundColor: '#ffffff',
    flex: 1,
    shadowOffset: { width: 5, height: 3 },
    shadowColor: '#999',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderRadius: 2,
    paddingHorizontal: 12,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  getCoupon: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  getLeft: {
    flex: 1
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
    borderRadius: 7,
    marginRight: 5
  },
  labelText: {
    color: '#ffffff',
    fontSize: 10
  },
  commonText: {
    fontSize: 13,
    color: '#000000'
  },
  useScope: {
    fontSize: 12,
    color: '#999999',
    maxWidth: screenWidth - 205,
    marginTop: 4
  },
  pointsBox: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  points: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  pointsTxt: {
    color: '#ff6600',
    fontSize: 12,
    marginLeft: 2
  },
  lastBox: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  grayBg: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  invalidText: {
    fontSize: 10,
    color: '#999999'
  },
  progressBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginBottom: 5
  },
  progressInnerBox: {
    position: 'absolute',
    top: 9,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  progressInner: {
    width: 25,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center'
  },
  alreadyGot: {
    fontSize: 10,
    color: '#999999'
  },
  gotPercent: {
    fontSize: 10
  },
  linearGradient: {
    width: 57,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  exchangeFont: {
    fontSize: 10,
    color: '#ffffff'
  }
});
