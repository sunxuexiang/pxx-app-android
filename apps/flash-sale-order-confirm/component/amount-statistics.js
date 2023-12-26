import React, { Component } from 'react';
import { Image, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { fromJS } from 'immutable';

import * as _ from 'wmkit/common/util';
import { noop } from 'wmkit/noop';

import { priceColor } from 'wmkit/styles/index';
import { msg, Relax } from 'plume2';
import { OrderMaxPointDiscountQL, OrderMaxPointQL, OrderUsePointDiscountQL } from '../ql';

const TYPES = {
  '0': '满减优惠',
  '1': '满折优惠',
  '2': '满赠优惠'
};
@Relax
export default class AmountStatistics extends Component {
  static relaxProps = {
    totalPoint: 'totalPoint',
    pointConfig: 'pointConfig',
    showPoint: 'showPoint',
    usePoint: 'usePoint',
    integralInput: 'integralInput',
    setUsePoint: Function,
    changeSwitch: Function,
    maxPoint: OrderMaxPointQL,
    // 积分可抵扣的最大金额
    maxPointDiscount: OrderMaxPointDiscountQL,
    //积分抵扣金额
    pointDiscount: OrderUsePointDiscountQL,
    isDistributor: 'isDistributor',
    payOptions: 'payOptions',
    payType: 'payType',
    totalBuyPoint: 'totalBuyPoint',
    saveSessionStorage: noop,
    discountsTotalPrice: 'discountsTotalPrice',
    isPresale: 'isPresale',
    stores: 'stores',
    goodsTotalNum: 'goodsTotalNum',
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { single, couponTotal } = this.props;
    const { discountsPrice, tradePrice } = this.props.store;
    const {
      totalPoint,
      pointConfig,
      maxPoint,
      maxPointDiscount,
      setUsePoint,
      pointDiscount,
      changeSwitch,
      showPoint,
      integralInput,
      payOptions,
      payType,
      totalBuyPoint,
      isPresale,
      goodsTotalNum,
    } = this.props.relaxProps;
    const prices = (fromJS(discountsPrice) || fromJS([])).groupBy((item) =>
      item.get('type'),
    );
    const opening = totalPoint
      ? _.sub(pointConfig.get('overPointsAvailable'), totalPoint) > 0
      : false;
    const openchecked = opening ? false : showPoint;
    const payIndex = payOptions.findIndex((f) => f.get('id') == payType);

    return (
      <View style={styles.totalPrice}>
        <View style={[styles.box, { marginBottom: 12 }]}>
          {single && (
            <TouchableOpacity
              style={styles.delivery}
              activeOpacity={0.8}
            >
              <Text allowFontSacling={false} style={styles.title}>
                支付方式
              </Text>
              <View style={styles.rightContext}>
                {payType >= 0 && (
                  <Text allowFontSacling={false} style={styles.greyColor}>
                    {payOptions.getIn([payIndex, 'name'])}
                  </Text>
                )}
                {!isPresale && (
                    <Image
                      style={styles.arrow}
                      source={require('../img/arrow.png')}
                    />
                )}
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={[styles.box]}>
          {single && (
            <View style={styles.totalList}>
              <Text allowFontScaling={false} style={styles.title}>
                订单总额
              </Text>
              <Text allowFontScaling={false} style={styles.priceColor}>
                ¥
                {_.addZero(
                  tradePrice.totalPrice -
                    (couponTotal || 0) -
                    (pointDiscount || 0)
                )}
              </Text>
            </View>
          )}
          <View style={styles.totalList}>
            <Text allowFontScaling={false} style={styles.title}>
              商品金额
            </Text>
            <Text allowFontScaling={false} style={styles.greyColor}>
              ¥{_.addZero(tradePrice.goodsPrice || 0)}
            </Text>
          </View>

          <View style={[styles.totalList, styles.borderRLBradius]}>
            <Text allowFontScaling={false} style={styles.title}>
              配送费用
            </Text>
            <Text allowFontScaling={false} style={styles.greyColor}>
              ¥{_.addZero(tradePrice.deliveryPrice)}
            </Text>
          </View>

          {prices
            .map((val, key) => {
              console.log(key, 'v.key');
              const price = val
                .map((v) => v.get('amount'))
                .reduce((a, b) => (a += b));
              return (
                price > 0 && (
                  <View key={key} style={styles.totalList}>
                    <Text allowFontScaling={false} style={styles.title}>
                      {TYPES[key] ? TYPES[key] : '活动优惠'}
                    </Text>
                    <Text allowFontScaling={false} style={styles.greyColor}>
                      -¥
                      {_.addZero(price)}
                    </Text>
                  </View>
                )
              );
            })
            .toArray()}
          <View style={[styles.totalList, styles.borderRLBradius]}>
            <Text allowFontScaling={false} style={styles.title}>
              商品总件数
            </Text>
            <Text allowFontScaling={false} style={styles.greyColor}>
              {goodsTotalNum}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  /**
   * 支付配送
   *
   */
  _goToPay = () => {
    const { supplier } = this.props.store;
    this.props.relaxProps.saveSessionStorage('payment');
    msg.emit('router: goToNext', {
      routeName: 'PayDelivery',
      storeId: supplier.storeId
    });
  };
}

const styles = StyleSheet.create({
  totalPrice: {
    marginBottom: 10,
    marginTop: 12
  },
  totalList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  priceColor: {
    color: priceColor
  },
  greyColor: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 12,
    fontWeight: '500'
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    height: 35,
    width: 105,
    backgroundColor: '#fafafa',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb',
    textAlign: 'left',
    fontSize: 14,
    paddingVertical: 0,
    paddingLeft: 10,
    marginHorizontal: 5
  },
  integralBox: {
    backgroundColor: '#fff',
    marginHorizontal: 0,
    marginVertical: 6,
    paddingHorizontal: 14,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ddd'
  },
  integralSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  grayBg: {
    height: 10,
    marginTop: 8,
    marginHorizontal: -14,
    backgroundColor: '#fafafa',
    borderTopColor: '#ebebeb',
    borderTopWidth: StyleSheet.hairlineWidth
  },
  totalText: {
    color: '#333',
    marginTop: 5
  },
  red: {
    color: priceColor
  },
  totalRebate: {
    paddingTop: 10,
    marginTop: 8,
    borderTopColor: '#ebebeb',
    borderTopWidth: StyleSheet.hairlineWidth
  },
  rightContext: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 12
  },
  delivery: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  payText: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20
  },
  arrow: {
    width: 12,
    height: 12,
    marginLeft: 4
  },
  box: {
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingVertical: 10
    // marginTop:10
  },
  textInput: {
    flex: 1,
    height: 30,
    textAlign: 'right',
    fontSize: 14,
    color: '#333333',
    padding: 0,
    paddingLeft: 20
  },
  swellPrice: {
    color: '#333',
    fontWeight: '500',
    fontSize: 12,
    marginTop: -12
  },
  tailStartTime: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.4)',
    marginTop: -12
  },
  deposit: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 10
  },
  depositTag: {
    marginTop: 10,
    fontSize: 12,
    color: 'rgba(0,0,0, 0.4)'
  },
  switch: {
    position: 'absolute',
    right: 0,
    top: 10
  }
});
