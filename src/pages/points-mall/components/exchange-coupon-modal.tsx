import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  PixelRatio
} from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import moment from 'moment';
import { screenHeight, screenWidth, mainColor } from 'wmkit/styles/index';

type IExchangeCouponModalProps = T.IProps & T.IExchangeCouponModalProps;

@connect<Partial<IExchangeCouponModalProps>, T.IExchangeCouponModalState>(
  store2Props,
  actions
)
export default class ExchangeCouponModal extends React.Component<
  Partial<IExchangeCouponModalProps>,
  T.IExchangeCouponModalState
> {
  constructor(props: IExchangeCouponModalProps) {
    super(props);
  }

  /**

   */
  render() {
    let {
      actions: { action },
      main: { visible, pointsCoupon }
    } = this.props;
    let couponInfo = pointsCoupon.couponInfoVO;
    return (
      visible && (
        <View style={styles.container}>
          <View style={styles.whiteBox}>
            <Text style={styles.title}>兑换商品</Text>
            <View style={styles.couponCon}>
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
                  <View style={styles.topBox}>
                    <View style={[styles.labelBox, { backgroundColor: mainColor }]}>
                      <Text allowFontScaling={false} style={styles.labelText}>
                        通用券
                      </Text>
                    </View>
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
                </View>
              </View>
            </View>
            <View style={styles.pointsBox}>
              <Text allowFontScaling={false} style={styles.pointsTxt}>消耗</Text>
              <Text allowFontScaling={false} style={[styles.points, { color: mainColor }]}>{pointsCoupon.points}</Text>
              <Text allowFontScaling={false} style={styles.pointsTxt}>积分</Text>
            </View>
            <View style={styles.btnBox}>
              <TouchableOpacity
                style={[styles.clickBox, styles.borderRight]}
                activeOpacity={0.8}
                onPress={() =>
                  action.setVisible(
                    false,
                    pointsCoupon,
                    pointsCoupon.pointsCouponId
                  )
                }
              >
                <Text allowFontScaling={false} style={styles.cancelText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.clickBox}
                onPress={() => (
                  action.setVisible(
                    false,
                    pointsCoupon,
                    pointsCoupon.pointsCouponId
                  ),
                  action.setPwdModalVisible(true)
                )}
              >
                <Text allowFontScaling={false} style={[styles.submitText, { color: mainColor }]}>立即兑换</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    );
  }

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
  container: {
    backgroundColor: 'rgba(000,000,000,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    top: 0,
    paddingHorizontal: screenWidth * 0.08
  },
  whiteBox: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 6
  },
  title: {
    fontSize: 18,
    color: '#333',
    paddingTop: screenWidth * 0.106,
    paddingBottom: 16
  },
  couponCon: {
    paddingHorizontal: 12,
    alignItems: 'center'
  },
  couponInner: {
    flexDirection: 'row',
    borderColor: '#eee',
    borderWidth: 1 / PixelRatio.get(),
    borderRadius: 6,
    overflow: 'hidden',
    alignItems: 'center'
  },
  couponImg: {
    width: screenWidth * 0.256,
    height: screenWidth * 0.256,
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
    flex: 1,
    // shadowOffset: { width: 5, height: 3 },
    // shadowColor: '#999',
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    paddingHorizontal: 8
  },
  topBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  labelBox: {
    width: 40,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
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
    marginTop: 4
  },
  pointsBox: {
    marginTop: 16,
    marginBottom: screenWidth * 0.106,
    flexDirection: 'row'
  },
  points: {
    fontSize: 14,
    marginHorizontal: 2
  },
  pointsTxt: {
    color: '#000000',
    fontSize: 14
  },
  btnBox: {
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#ebebeb',
    flexDirection: 'row'
  },
  clickBox: {
    // width: (screenWidth - (screenWidth * 0.08)) * 0.5,
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16
  },
  borderRight: {
    borderRightWidth: 1 / PixelRatio.get(),
    borderRightColor: '#ebebeb'
  },
  cancelText: {
    fontSize: 16,
    color: '#000'
  },
  submitText: {
    fontSize: 16
  }
});
