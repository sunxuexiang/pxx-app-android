import React from 'react';
import { msg } from 'plume2';
import { fromJS } from 'immutable';
import { Const } from 'wmkit/const';
import moment from 'moment';
import { Image, PixelRatio, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { priceColor, screenWidth } from 'wmkit/styles/index';
import LinearGradient from 'react-native-linear-gradient';

/**
 * 订单状态
 * @type {{INIT: string; GROUPON: string; AUDIT: string; DELIVERED_PART: string; DELIVERED: string; CONFIRMED: string; COMPLETED: string; VOID: string}}
 */
const flowState = (status) => {
  if (status == 'AUDIT' || status == 'DELIVERED_PART') {
    return '待发货';
  } else if (status == 'DELIVERED') {
    return '待收货';
  } else if (status == 'CONFIRMED') {
    return '已收货';
  } else if (status == 'COMPLETED') {
    return '已完成';
  }
};

export default class PointOrderCouponItem extends React.Component {
  render() {
    const { item: order } = this.props;
    const couponInfo = fromJS(order.tradeCouponItem.couponInfoVO);

    return (
      <View style={styles.container}>
        <View style={styles.lineItem}>
          <Text
            style={styles.price}
            allowFontScaling={false}
          >订单积分 <Text style={{ color: priceColor }} allowFontScaling={false}>{order.tradePrice.points || 0}</Text></Text>
          <Text style={styles.status} allowFontScaling={false}>
            {flowState(order.tradeState.flowState, order.tradeState.payState)}
          </Text>
        </View>
        <View style={styles.couponItem}>
          <ImageBackground style={styles.bgStyle} source={require('../img/coupon-img.png')}>
            <Text style={[styles.couponPrice, { marginBottom: 8 }]} allowFontScaling={false}>￥<Text style={styles.priceText} allowFontScaling={false}>{couponInfo.get('denomination')}</Text></Text>
            <Text style={styles.couponPrice} allowFontScaling={false}>{this._buildFullBuyPrice(couponInfo)}</Text>
          </ImageBackground>
          <View style={styles.right}>
            <View style={styles.rightTop}>
              <LinearGradient
                colors={['#ff5240', '#fc3749', '#f91a53']}
                style={[styles.couponCate]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
              >
                <Text allowFontScaling={false} style={styles.cateText}>通用券</Text>
              </LinearGradient>
              <Text allowFontScaling={false} style={styles.couponName} numberOfLines={1}>{this._buildStorename(couponInfo)}</Text>
            </View>
            {couponInfo.get('couponType') != 2 && (
              <Text allowFontScaling={false} style={styles.couponInfo}>
                限<Text allowFontScaling={false} numberOfLines={1}>{this._buildScope(couponInfo)}</Text>
                可用
                </Text>
            )}
            <Text allowFontScaling={false} style={styles.couponInfo}>有效期：{this._buildRangDay(couponInfo)}</Text>
          </View>
        </View>
      </View>
    );
  }

  /***
   * 满减金额
   */
  _buildFullBuyPrice = (coupon) => {
    return coupon.get('fullBuyType') === 0
      ? '无门槛'
      : `满${coupon.get('fullBuyPrice')}可用`;
  };

  /**
   * 优惠券使用店铺名称（暂时只有平台券）
   */
  _buildStorename = (coupon) => {
    let text = '';
    if (coupon.get('platformFlag') === 1) {
      text = '全平台可用';
    }
    return `${text}`;
  };

  /**
   * 优惠券使用范围
   */
  _buildScope = (coupon) => {
    let text = '';
    let scopeType = '';
    if (coupon.get('scopeType') == 0) {
      scopeType = '商品：';
      text = '全部商品';
    } else if (coupon.get('scopeType') == 1) {
      scopeType = '品牌：';
      text = '仅限';
      coupon.get('scopeNames').forEach((value) => {
        let name = value ? '[' + value + ']' : '';
        text = `${text}${name}`;
      });
    } else if (coupon.get('scopeType') == 2) {
      scopeType = '品类：';
      text = '仅限';
      coupon.get('scopeNames').forEach((value) => {
        let name = value ? '[' + value + ']' : '';
        text = `${text}${name}`;
      });
    } else if (coupon.get('scopeType') == 3) {
      scopeType = '分类：';
      text = '仅限';
      coupon.get('scopeNames').forEach((value) => {
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
    return coupon.get('rangeDayType') === 1
      ? `领取后${coupon.get('effectiveDays')}天内有效`
      : `${moment(coupon.get('startTime')).format(Const.DATE_FORMAT)}至${moment(
        coupon.get('endTime')
      ).format(Const.DATE_FORMAT)}`;
  };
}
const styles = StyleSheet.create({
  container: {
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb',
    backgroundColor:'#fff',
    paddingHorizontal: 10,
    marginBottom: 10,
    paddingBottom: 16,
  },
  lineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12
  },
  bgStyle: {
    width: 96,
    height: 96,
    justifyContent: 'center',
    alignItems: 'center'
  },
  couponItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  couponPrice: {
    fontSize: 12,
    color: '#fff'
  },
  priceText: { fontSize: 24 },
  imgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  img: {
    width: 55,
    height: 55,
    marginRight: 10,
    borderColor: '#ebebeb',
    borderWidth: 1 / PixelRatio.get()
  },
  itemCount: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  right: {
    height: 96,
    justifyContent: 'center',
    paddingLeft: 12,
    width: screenWidth - 110,
    borderRightColor: '#ebebeb',
    borderTopColor: '#ebebeb',
    borderBottomColor: '#ebebeb',
    borderWidth: 1,
    borderLeftColor: 'transparent',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6
  },
  rightTop: {
    flexDirection: 'row',
    marginBottom: 10
  },
  couponCate: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10
  },
  cateText: {
    color: '#fff',
    fontSize: 10
  },
  couponName: {
    fontSize: 16, paddingLeft: 5
  },
  couponInfo: {
    fontSize: 12,
    color: '#777',
    marginTop: 5
  },

  bg: {
    width: 19,
    height: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 3
  },
  white: {
    color: '#ffffff',
    fontSize: 10,
    backgroundColor: 'transparent'
  },
  code: {
    fontSize: 15,
    color: '#333333'
  },
  status: {
    fontSize: 14,
    color: '#666'
  },
  grey: {
    fontSize: 14,
    color: '#000'
  },

  price: {
    fontSize: 14,
    color: '#000'
  }
});
