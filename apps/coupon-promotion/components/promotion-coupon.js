import React from 'react';
import { Relax } from 'plume2';
import { View, StyleSheet, Text, Image } from 'react-native';
import WMCouponLabel from 'wmkit/coupon-label';
import * as _ from 'wmkit/common/util';
import MZengIcon from 'wmkit/theme/mzeng.png';
import {mainColor, panelColor} from 'wmkit/styles/index';
/**
 * 促销—优惠券活动
 */
@Relax
export default class PromotionCoupon extends React.Component {
  static relaxProps = {
    couponInfo: 'couponInfo'
  };

  render() {
    const { couponInfo } = this.props.relaxProps;
    if (!couponInfo) {
      return null;
    }
    const fullBuyPrice = couponInfo.get('fullBuyPrice')
      ? couponInfo.get('fullBuyPrice')
      : 0;
    const denomination = couponInfo.get('denomination')
      ? couponInfo.get('denomination')
      : 0;
    //拼接优惠券面值
    let couponLabel = `${
      couponInfo.get('fullBuyType') == 0 ? '满0' : `满${fullBuyPrice}`
    }减${denomination}`;
    return (
      <View style={[styles.promotionBg, { backgroundColor: panelColor }]}>
        <Image source={MZengIcon} style={[styles.img, { tintColor: mainColor }]} />
        <View>
          <Text
            style={styles.infoText}
            allowFontScaling={false}
            numberOfLines={1}
          >
            {`${_.formatDay(couponInfo.get('startTime'))}至${_.formatDay(
              couponInfo.get('endTime')
            )} 以下商品可使用优惠券`}
          </Text>
          <Text style={styles.infoText}
            allowFontScaling={false}
            numberOfLines={1}
          >
            {couponInfo.get('prompt')}
          </Text>
          <WMCouponLabel text={couponLabel} />
        </View>
      </View>
    );
  }

  /**
   * 优惠券使用范围
   */
  _buildScope = (coupon) => {
    //营销类型(0,1,2,3,4) 0全部商品，1品牌，2平台(boss)类目,3店铺分类，4自定义货品（店铺可用）
    let scopeType = '限商品：';
    //范围名称
    let goodsName = '';

    if (coupon.scopeType == 0) {
      goodsName = '全部商品';
    } else if (coupon.scopeType == 1) {
      scopeType = '限品牌：';
      goodsName = '仅限';
      coupon.brandMap &&
        coupon.brandIds.forEach((value) => {
          let name = coupon.brandMap[value];
          if (name != null || name != undefined) {
            goodsName = `${goodsName}[${name}]`;
          }
        });
    } else if (coupon.scopeType == 2) {
      scopeType = '限品类：';
      goodsName = '仅限';
      coupon.cateMap &&
        coupon.cateIds.forEach((value) => {
          let name = coupon.cateMap[value];
          if (name != null || name != undefined) {
            goodsName = `${goodsName}[${name}]`;
          }
        });
    } else if (coupon.scopeType == 3) {
      scopeType = '限分类：';
      goodsName = '仅限';
      coupon.storeCateMap &&
        coupon.storeCateIds.forEach((value) => {
          let name = coupon.storeCateMap[value];
          if (name != null || name != undefined) {
            goodsName = `${goodsName}[${name}]`;
          }
        });
    } else if (coupon.scopeType == 4) {
      goodsName = '部分商品';
    }

    return `${scopeType}${goodsName}`;
  };
}

const styles = StyleSheet.create({
  promotionBg: {
    flexDirection: 'row',
    height: 95,
    padding: 12
  },
  infoText: {
    fontSize: 12,
    color: '#333',
    flex: 1
  },
  img: {
    height: 16,
    marginRight: 8,
    width: 16,
    marginTop:2
  }
});
