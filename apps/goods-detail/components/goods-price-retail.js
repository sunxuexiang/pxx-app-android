import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  PixelRatio,
  TouchableOpacity,
  Image
} from 'react-native';
import { Relax, msg } from 'plume2';

import * as _ from 'wmkit/common/util';
import * as WMkit from 'wmkit/kit';
import { noop } from 'wmkit/noop';
import moment from 'moment';
import WMImage from 'wmkit/image/index';
import { marketOne } from '../kit';
import AsyncStorage from '@react-native-community/async-storage';
import { priceColor, mainColor } from 'wmkit/styles/index';
import LinearGradient from 'react-native-linear-gradient';

/**
 * 零售销售类型-价格展示
 */
@Relax
export default class GoodsPriceRetail extends Component {
  static relaxProps = {
    goodsInfo: 'goodsInfo',
    goods: 'goods',
    isDistributor: 'isDistributor',
    iepDetail: 'iepDetail',
    follow: 'follow',
    bookingSaleVO: 'bookingSaleVO',
    appointmentSaleVO: 'appointmentSaleVO',
    changeFollow: noop
  };
  constructor(props) {
    super(props);
    this.state = {
      getReduced: null
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('getReduced').then((res) => {
      this.setState({ getReduced: JSON.parse(res) });
    });
  }
  render() {
    const {
      goodsInfo,
      goods,
      isDistributor,
      iepDetail = Map(),
      bookingSaleVO,
      appointmentSaleVO,
      follow
    } = this.props.relaxProps;
    const {
      flashsalePrice,
      flashsaleGoodsFlag,
      pointsGoodsId,
      flashsaleGoods
    } = this.props;
    // iep属性
    const { getReduced } = this.state;
    const { isIepAuth: iepSwitch, iepInfo: info = {} } = iepDetail.toJS();
        //有促销活动时,返回优先级最高的活动
        const marketing =
        goodsInfo.size > 0 && goodsInfo.get('marketingLabels').size > 0
          ? marketOne(goodsInfo)[0]
          : null;
    // 默认为企业价
    const { enterprisePriceName } = info;
    //企业购商品的判断
    const iepGoodsShowFlag =
      iepSwitch &&
      goodsInfo.get('enterPriseAuditState') == 2 &&
      !flashsaleGoodsFlag;

    //积分
    const buyPoint = goodsInfo.toJS().buyPoint;
    const appointmentSale = appointmentSaleVO.toJS();
    const bookingSale = bookingSaleVO.toJS();
    let isShow = flashsaleGoodsFlag
      ? flashsalePrice != 0
      : goodsInfo.get('salePrice') != 0;

    //预约
    let isAppointmentSale = false;
    //预售
    let isBookingSale = false;
    // 是否是全款预售
    let isAllMoneySale = false;

    // 非积分价商品
    if (!buyPoint) {
      isAppointmentSale =
        appointmentSale && appointmentSale.appointmentSaleGood ? true : false;
      isBookingSale =
        bookingSale && this.isPresaleStatus(bookingSale) ? true : false;
      isAllMoneySale = bookingSale.bookingType == 1 ? false : true;
    }

    //划线价
    const linePrice = goods.get('linePrice');

    const stock = flashsaleGoods && flashsaleGoods.get('stock');
    const volume = flashsaleGoods && flashsaleGoods.get('salesVolume');
    const total = flashsaleGoods && _.add(stock, volume);
    const num = flashsaleGoods && _.div(volume, total);
    // 是否登录
    const loginFlag = window.token != undefined && window.token != '';
    return (
      <View style={styles.container}>
        <View
          style={styles.box}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ flexDirection: 'row' }}>
            <View allowFontScaling={false} style={styles.priceBox}>
              {/* 积分价商品 */}
              {buyPoint ? (
                <Text style={[styles.price, { color: priceColor }]}>
                  {buyPoint ? (
                    <Text>
                      {buyPoint}
                      <Text style={styles.pricePoint}>积分</Text>
                    </Text>
                  ) : null}
                  {buyPoint && isShow ? (
                    <Text style={[styles.pricePlus, { color: priceColor }]}>+</Text>
                  ) : null}
                  {isShow ? <Text style={[styles.unit, { color: priceColor }]}>¥</Text> : null}

                  {isShow
                    ? flashsaleGoodsFlag
                      ? _.addZero(flashsalePrice || 0)
                      : _.addZero(goodsInfo.get('salePrice'))
                    : null}
                </Text>
              ) : (
                //  定金预售显示原来价格和普通价格
                (!bookingSale.id || bookingSale.bookingType == 1) &&
                !appointmentSale.id && (
                  <Text style={[styles.price, { color: priceColor }]}>
                    <Text style={[styles.unit, { color: priceColor }]}>¥</Text>
                    {bookingSale.bookingType == 1
                      ? _.addZero(goodsInfo.get('marketPrice'))
                      : flashsaleGoodsFlag
                      ? _.addZero(flashsalePrice || 0)
                      : goodsInfo.get('distributionGoodsAudit') == '2'
                      ? _.addZero(goodsInfo.get('marketPrice'))
                      : goodsInfo.get('goodsInfoType')==1?
                            _.addZero(goodsInfo.get('specialPrice'))
                          :_.addZero(goodsInfo.get('salePrice'))}
                  </Text>
                )
              )}
              {/* 预约 */}
              {(appointmentSale &&
                appointmentSale.appointmentSaleGood &&
                !buyPoint &&
                !pointsGoodsId && (
                  <Text style={[styles.price, { color: priceColor }]}>
                    <Text style={[styles.unit, { color: priceColor }]}>¥</Text>
                    {appointmentSale.appointmentSaleGood.price
                      ? _.addZero(appointmentSale.appointmentSaleGood.price)
                      : _.addZero(goodsInfo.get('marketPrice'))}
                  </Text>
                ))}
              {/* 全款预售 */}
              {(bookingSale &&
                bookingSale.bookingType == 0 &&
                this.isPresaleStatus(bookingSale) &&
                !buyPoint &&
                !pointsGoodsId && (
                  <Text style={[styles.price, { color: priceColor }]}>
                    <Text style={[styles.unit, { color: priceColor }]}>¥</Text>
                    {bookingSale.bookingSaleGoods.bookingPrice
                      ? _.addZero(bookingSale.bookingSaleGoods.bookingPrice)
                      : _.addZero(goodsInfo.get('marketPrice'))}
                  </Text>
                ))}

              {!buyPoint && iepGoodsShowFlag && (
                <View style={styles.qygPriceBox}>
                  <Text style={styles.qygPrice}>
                    ￥{_.addZero(goodsInfo.get('enterPrisePrice'))}
                  </Text>
                  <View style={[styles.qygPriceNameBox, { backgroundColor: mainColor }]}>
                    <Text style={styles.qygPriceName}>
                      {enterprisePriceName}
                    </Text>
                  </View>
                </View>
              )}
            </View>
           {!!linePrice && (
              <Text style={styles.linePrice} allowFontScaling={false}>
                ￥{_.addZero(linePrice)}
              </Text>
            )}
            {/* {goodsInfo.get('goodsInfoType')===1&&(<Text style={styles.specialPrice} >特价</Text>)} */}
            {marketing !== null && (
              <View style={styles.tagMain}>
                {this.filterText0(marketing)}
                {/* {getReduced !== null && getReduced.isOpen === '1'
                  ? this.filterText1(marketing)
                  : this.filterText0(marketing)} */}
              </View>
            )}
            {isDistributor &&
            goodsInfo.get('distributionGoodsAudit') == '2' &&
            !buyPoint
              ? !isAppointmentSale &&
                !isBookingSale &&
                !iepGoodsShowFlag && (
                  <Text allowFontScaling={false} style={styles.distCommission}>
                    /赚
                    {_.addZero(goodsInfo.get('distributionCommission'))}元
                  </Text>
                )
              : null}
          </View>
          {/*通过styles.rushItemProcessShort.width的方法动态改变width的值*/}
          {flashsaleGoods && (
            <View style={styles.rushBox}>
              <Text
                allowFontScaling={false}
                style={{ color: '#999', fontSize: 12 }}
              >
                已抢
                <Text style={{ color: mainColor, fontWeight: 'bold' }}>
                  {_.mul(num, 100).toFixed(0)}%
                </Text>
              </Text>

              {/*通过styles.rushItemProcessShort.width的方法动态改变width的值*/}
              <View style={{ position: 'relative' }}>
                <View style={styles.rushItemProcessLong} />
                <LinearGradient
                  colors={[mainColor, mainColor]}
                  style={[styles.rushItemProcessShort, { width: 96 * num }]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                ></LinearGradient>
              </View>
            </View>
          )}
          <TouchableOpacity
            activeOpacity={1}
            style={styles.barItem}
            onPress={() => this.collect()}
          >
            {follow ? (
              <Image style={[styles.img, { tintColor: mainColor }]} source={require('wmkit/theme/hert.png')} />
            ) : (
              <Image
                style={[styles.img, { tintColor: '#333' }]}
                source={require('../img/brokenheart.png')}
              />
            )}
            <Text
              allowFontScaling={false}
              style={[
                styles.barItemText,
                follow ? { color: mainColor } : {}
              ]}
            >
              {follow ? '已收藏' : '收藏'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 预售定金 */}
        {bookingSale &&
          bookingSale.bookingType == 1 &&
          !buyPoint &&
          !pointsGoodsId &&
          this.isPresaleStatus(bookingSale) && (
            <View style={styles.pricePresale}>
              {bookingSale.bookingSaleGoods.inflationPrice ? (
                <Text style={styles.inflationPrice}>
                  ￥{_.addZero(bookingSale.bookingSaleGoods.handSelPrice)}
                  定金可抵￥
                  {_.addZero(bookingSale.bookingSaleGoods.inflationPrice)}
                </Text>
              ) : (
                <Text style={[styles.handSelPrice, styles.inflationPrice]}>
                  ￥{_.addZero(bookingSale.bookingSaleGoods.handSelPrice)}
                  定金
                </Text>
              )}
            </View>
          )}
      </View>
    );
  }
  filterText0(marketing) {
    return (
      <View style={[styles.tag, { borderColor: mainColor }]}>
        <Text
          style={[styles.tagText, { color: mainColor }]}
          allowFontScaling={false}
        >
          {this.filterMarketingType(marketing.marketingDesc)}
        </Text>
      </View>
    );
  }
  filterText1(marketing) {
    if (marketing.marketingType == '0') {
      url = marketing.marketingDesc.includes('立减')
        ? this.state.getReduced['onceReductionIcon']
        : this.state.getReduced['fullReductionIcon'];
    } else if (marketing.marketingType == '1') {
      url = this.state.getReduced['discountIcon'];
    } else if (marketing.marketingType == '2') {
      url = this.state.getReduced['discountGiftIcon'];
    }

    if (url.length > 0) {
      return (
        <WMImage
          style={{ width: 30, height: 30 }}
          src={JSON.parse(url)[0].url}
        />
      );
    }
    return this.filterText0(marketing);
  }
  /**
   * 根据返回促销中是否包含立减字段决定展示满减或立减
   */
  filterMarketingType(marketingDesc) {
    if (marketingDesc.includes('指定商品')) {
      return '送指定商品';
    }
    return marketingDesc;
  }
  collect = () => {
    const {
      follow,
      changeFollow,
      goodsInfo,
      init,
      goods,
      goodsInfos
    } = this.props.relaxProps;
    let saleType = goods.get('saleType');
    if (WMkit.isLoginOrNotOpen()) {
      changeFollow(
        !follow,
        saleType == 0
          ? goodsInfos.get(0).get('goodsInfoId')
          : goodsInfo.get('goodsInfoId')
      );
    } else {
      msg.emit('loginModal:toggleVisible', {
        callBack: () => init(goodsInfo.get('goodsInfoId'))
      });
    }
  };

  //判断当前的预售状态
  isPresaleStatus = (item) => {
    const {
      bookingStartTime,
      bookingEndTime,
      bookingType,
      handSelStartTime,
      handSelEndTime
    } = item;
    let isBetween = false;

    //预售起止时间内 0:全款 1:定金
    if (bookingType == 0) {
      isBetween = moment(new Date()).isBetween(
        bookingStartTime,
        bookingEndTime
      );
    }

    //定金支付起止时间内
    if (bookingType == 1) {
      isBetween = moment(new Date()).isBetween(
        handSelStartTime,
        handSelEndTime
      );
    }

    return isBetween;
  };
}

const styles = StyleSheet.create({
  box: {
    justifyContent: 'space-between'
  },
  tagMain: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    paddingVertical: 8,
    paddingBottom: 0,
    paddingHorizontal: 12,
    backgroundColor: '#fff'
  },
  priceBox: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  unit: {
    fontSize: 10
  },
  pricePoint: {
    fontSize: 12
  },
  pricePlus: {
    marginLeft: 4
  },
  linePrice: {
    paddingLeft: 5,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 10,
    textDecorationLine: 'line-through',
    top: 13
  },
  specialPrice: {
//    marginTop: 2,
    paddingLeft: 5,
    color: '#228B22',
    fontSize: 16,
    top:10,
    fontWeight: 'bold'
  },
  distCommission: {
    color: '#333',
    fontSize: 10,
    top: 13
  },
  qygPriceBox: {
    flexDirection: 'row',
    marginLeft: 20,
    height: 24
  },
  qygPrice: {
    color: '#666',
    marginRight: 20
  },
  qygPriceNameBox: {
    borderRadius: 2,
    height: 18,
    paddingHorizontal: 4,
    justifyContent: 'center'
  },
  qygPriceName: {
    fontSize: 10,
    color: '#fff'
  },
  pricePresale: {
    flexDirection: 'row',
    marginTop: 5
  },
  inflationPrice: {
    color: 'rgba(255, 102, 0, 1)',
    fontSize: 10,
    textAlign: 'left',
    borderRadius: 2,
    backgroundColor: 'rgba(255, 243, 235, 1)',
    paddingVertical: 2,
    paddingHorizontal: 5
  },
  handSelPrice: {
    marginLeft: 8
  },
  barItem: {
    width: 68,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftColor: '#ebebeb',
    borderLeftWidth: 1 / PixelRatio.get(),
    flexDirection: 'row',
    backgroundColor: 'rgba(245, 245, 245, 1)',
    borderRadius: 13,
    height: 24,
    top: 5,
    position: 'absolute',
    right: 0
  },
  img: {
    width: 12,
    height: 12,
    marginRight: 4
  },
  barItemText: {
    color: '#333',
    fontSize: 12
  },
  rushBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  rushItemProcessLong: {
    marginLeft: 8,
    width: 96,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0,108,182,.3)'
  },
  tag: {
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    marginRight: 8,
    marginLeft: 12,
    borderWidth: 1,
    borderRadius: 2
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500'
  },
  rushItemProcessShort: {
    position: 'absolute',
    top: 0,
    left: 8,
    height: 8,
    borderRadius: 4
  }
});
