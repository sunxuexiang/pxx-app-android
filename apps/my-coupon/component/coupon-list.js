import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PixelRatio,
  Image,
  ImageBackground
} from 'react-native';
import { Relax, msg } from 'plume2';

import { noop } from 'wmkit/noop';
import * as _ from 'wmkit/common/util';
import WMEmpty from 'wmkit/empty';
import WmListView from 'wmkit/list-view/index';

import { mainColor, screenWidth } from 'wmkit/styles/index';
import LinearGradient from 'react-native-linear-gradient';
import { config } from 'wmkit/config';
const generalImg = require('../img/coupon-general.png'); //通用券
const freightImg = require('../img/coupon-freight.png'); //运费券
const storeImg = require('../img/coupon-store.png'); //店铺券
const invalidImg = require('../img/coupon-invalid.png'); //失效券
const COUPON_TYPE = {
  0: { img: {uri: config.OSS_HOST + '/assets/image/theme/currency-bg.png'}, text: '通用券' },
  1: { img: {uri: config.OSS_HOST + '/assets/image/theme/currency-bg.png'}, text: '店铺券' },
  2: { img: {uri: config.OSS_HOST + '/assets/image/theme/currency-bg.png'}, text: '运费券' }
};

@Relax
export default class CouponList extends React.Component {
  static relaxProps = {
    useStatus: 'useStatus',
    couponType: 'couponType',
    toRefresh: 'toRefresh',
    //对请求数据的处理
    dealData: noop,
    setCouponDesc: noop
  };
  render() {
    const {
      useStatus,
      couponType,
      toRefresh,
      dealData,
      setCouponDesc
    } = this.props.relaxProps;

    const listViewProps = {
      url: '/coupon-code/my-coupon',
      params: {
        useStatus: useStatus,
        couponType: couponType
      },
      isPagination: true,
      renderRow: (item) => this.couponItem(item, useStatus, setCouponDesc),
      onDataReached: dealData,
      noMoreStyle: { backgroundColor: '#f5f5f5' },
      renderEmpty: () => (
        <WMEmpty
          imgStyle={{ width: 104, height: 104 }}
          tipStyle={{ color: '#999', fontSize: 14 }}
          emptyImg={require('../img/empty.png')}
          desc="啊哦，什么券都没有~"
        />
      ),
      keyProps: 'couponCodeId',
      // extraData: { toRefresh: toRefresh }
    };

    return <WmListView {...listViewProps} />;
  }

  /**
   * 渲染优惠券项
   * @param couponInfo
   * @param useStatus
   * @param setCouponDesc
   * @returns {*}
   */
  couponItem = (couponInfo, useStatus, setCouponDesc) => {
    //券背景
    let imageBgm = '';
    //券标志
    let couponTag = '';

    if (couponInfo.couponType === 0) {
      imageBgm = generalImg;
      couponTag = styles.labelBox;
    } else if (couponInfo.couponType === 1) {
      imageBgm = storeImg;
      couponTag = [styles.labelBox];
    } else if (couponInfo.couponType === 2) {
      imageBgm = freightImg;
      couponTag = [styles.labelBox];
    }

    //已使用，已过期
    if (useStatus != 0) {
      imageBgm = invalidImg;
    }
    return (
      <View key={couponInfo.couponCodeId} style={styles.item}>
        <View style={[styles.bg, { borderLeftColor: mainColor }]}>
          <Text allowFontScaling={false} style={[styles.price, { color: mainColor }]} numberOfLines={1}>
            <Text allowFontScaling={false} style={styles.symbol}>
              ¥
            </Text>
            {couponInfo.denomination}
          </Text>
          <Text allowFontScaling={false} style={styles.tip} numberOfLines={1}>
            {couponInfo.fullBuyType == 0
              ? '无门槛'
              : `满${couponInfo.fullBuyPrice}可用`}
          </Text>
          {couponInfo.nearOverdue &&
            useStatus == 0 && (
              <Image
                source={require('../img/will-end.png')}
                style={styles.expiringImg}
              />
            )}
        </View>
        <View style={styles.rightBox}>
          <View style={styles.topBox}>
            <View style={styles.topLeft}>
              <ImageBackground
                style={useStatus == 0 ? couponTag : [styles.labelBox]}
                source={COUPON_TYPE[couponInfo.couponType].img}
              >
                <Text allowFontScaling={false} style={styles.labelText}>
                  {COUPON_TYPE[couponInfo.couponType].text}
                </Text>
              </ImageBackground>
              <Text
                allowFontScaling={false}
                style={
                  useStatus == 0
                    ? [styles.text, { flex: 1 }]
                    : [styles.text, { flex: 1, color: '#999' }]
                }
                numberOfLines={1}
              >
                {couponInfo.platformFlag == 1
                  ? '全平台可用'
                  : `仅${couponInfo.storeName}可用`}
              </Text>
            </View>

            {/* {couponInfo.couponDesc != '' &&
              couponInfo.couponDesc != null && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setCouponDesc(couponInfo.couponDesc)}
                >
                  <Image
                    style={styles.help}
                    source={require('../img/help.png')}
                  />
                </TouchableOpacity>
              )} */}
          </View>

          {useStatus != 0 ? (
            <View style={styles.invalidBox}>
              <View style={styles.invalidLeft}>
                {couponInfo.couponType == 2 ? (
                  <View style={styles.rangeBox} />
                ) : (
                  <View style={{width: screenWidth - 230}}>
                    {/* <Text
                      allowFontScaling={false}
                      style={[styles.rangeText, { color: '#999' }]}
                    >
                      限
                    </Text> */}
                    <Text
                      allowFontScaling={false}
                      numberOfLines={1}
                      style={[styles.rangeText, { color: '#999' }]}
                    >
                      {/* {this._getGoodScope(couponInfo)} */}
                      {couponInfo.prompt}
                    </Text>
                    {/* <Text
                      allowFontScaling={false}
                      style={[styles.rangeText, { color: '#999' }]}
                    >
                      可用
                    </Text> */}
                  </View>
                )}
                <View style={styles.bottomBox}>
                  <Text
                    allowFontScaling={false}
                    style={[styles.time]}
                    numberOfLines={1}
                  >
                    {`${_.formatDay(couponInfo.startTime)}至${_.formatDay(
                      couponInfo.endTime
                    )}`}
                  </Text>
                </View>
              </View>
              <Text allowFontScaling={false} style={styles.invalidText}>
                {useStatus == 1 ? '已使用' : useStatus == 2 ? '已过期' : null}
              </Text>
              {/* <ImageBackground
                style={styles.grayBg}
                source={require('../img/gray.png')}
              >
                <Text allowFontScaling={false} style={styles.invalidText}>
                  {useStatus == 1 ? '已使用' : useStatus == 2 ? '已过期' : null}
                </Text>
              </ImageBackground> */}
            </View>
          ) : (
            <View>
              {couponInfo.couponType == 2 ? (
                <View style={styles.rangeBox} />
              ) : (
                <View
                  style={[
                    // styles.rangeBox,
                    {
                      width: screenWidth - 230
                    }
                  ]}
                >
                  {/* <Text allowFontScaling={false} style={styles.rangeText}>
                    限
                  </Text> */}
                  <Text
                    allowFontScaling={false}
                    numberOfLines={1}
                    style={styles.rangeText}
                  >
                    {/* {this._getGoodScope(couponInfo)} */}
                    {couponInfo.prompt}
                  </Text>
                  {/* <Text allowFontScaling={false} style={styles.rangeText}>
                    可用
                  </Text> */}
                </View>
              )}
              <View style={styles.bottomBox}>
                <Text
                  allowFontScaling={false}
                  style={[styles.time, { flex: 1 }]}
                  numberOfLines={1}
                >
                  {`${_.formatDay(couponInfo.startTime)}至${_.formatDay(
                    couponInfo.endTime
                  )}`}
                </Text>
              </View>
              {couponInfo.couponType != 2 && (
                <TouchableOpacity
                  style={styles.bottomBtn}
                  activeOpacity={0.8}
                  onPress={() => {
                    msg.emit('router: goToNext', {
                      routeName: 'CouponPromotion',
                      couponId: couponInfo.couponId,
                      activityId: couponInfo.activityId
                    });
                  }}
                >
                  <LinearGradient
                    style={styles.useBtn}
                    colors={[mainColor, mainColor]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                  >
                    <Text allowFontScaling={false} style={[styles.useText]}>
                      {couponInfo.couponCanUse ? '立即使用' : '查看可用'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    );
  };

  /**
   * 优惠券的使用范围
   * @private
   */
  _getGoodScope = (couponInfo) => {
    //营销类型(0,1,2,3,4) 0全部商品，1品牌，2平台(boss)类目,3店铺分类，4自定义货品（店铺可用）
    let scopeType = '商品：';
    //范围名称
    let goodsName = '仅限';

    if (couponInfo.scopeType == 0) {
      goodsName = '全部商品';
    } else if (couponInfo.scopeType == 1) {
      scopeType = '品牌：';
      couponInfo.brandNames &&
        couponInfo.brandNames.forEach((value) => {
          goodsName = `${goodsName}[${value}]`;
        });
    } else if (couponInfo.scopeType == 2) {
      scopeType = '品类：';
      couponInfo.goodsCateNames &&
        couponInfo.goodsCateNames.forEach((value) => {
          goodsName = `${goodsName}[${value}]`;
        });
    } else if (couponInfo.scopeType == 3) {
      scopeType = '分类：';
      couponInfo.storeCateNames &&
        couponInfo.storeCateNames.forEach((value) => {
          goodsName = `${goodsName}[${value}]`;
        });
    } else {
      goodsName = '部分商品';
    }
    return `${scopeType}${goodsName}`;
  };
}

const styles = StyleSheet.create({
  list: {
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
    borderLeftWidth: 2 / PixelRatio.get()
  },
  item: {
    flexDirection: 'row',
    marginTop: 12,
    paddingHorizontal: 12
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
    fontSize: 24,
    width: 73,
    textAlign: 'center'
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
    fontSize: 12,
    color: '#333'
  },
  time: {
    fontSize: 12,
    color: '#999'
  },
  help: {
    width: 15,
    height: 15
  },
  topLeft: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginBottom: 5
  },
  rangeText: {
    fontSize: 12,
    color: '#999'
  },
  rangeBox: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 12,
    flex: 1,
    alignItems: 'center'
  },
  bottomBox: {
    flexDirection: 'row',
    alignItems: 'center'
    // height: 20
  },
  bottomBtn: {
    // paddingHorizontal: 7,
    borderRadius: 15,
    marginLeft: 3,
    position: 'absolute',
    right: 0
  },
  useBtn: {
    paddingHorizontal: 10,
    borderRadius: 15,
    paddingVertical:5
  },
  useText: {
    fontSize: 12,
    color: '#fff'
  },
  invalidBox: {
    flexDirection: 'row'
  },
  invalidLeft: {
    flex: 1
  },
  grayBg: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4
  },
  invalidText: {
    fontSize: 10,
    color: '#999'
  },
  expiringImg: {
    width: 41,
    height: 41,
    position: 'absolute',
    top: 0,
    left: 0
  }
});
