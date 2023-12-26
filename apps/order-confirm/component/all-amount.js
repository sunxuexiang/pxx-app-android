import React, { Component } from 'react';
import {
  Image,
  PixelRatio,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Relax, msg } from 'plume2';

import { noop } from 'wmkit/noop';
import * as _ from 'wmkit/common/util';

import { mainColor, priceColor } from 'wmkit/styles/index';
import {
  OrderMaxPointDiscountQL,
  OrderMaxPointQL,
  OrderUsePointDiscountQL
} from '../ql';
import {debounce} from 'lodash';

@Relax
export default class AllAmount extends Component {
  static relaxProps = {
    discountsTotalOrderPrice: 'discountsTotalOrderPrice',
    subType: 'subType',
    totalPrice: 'totalPrice',
    goodsTotalPrice: 'goodsTotalPrice',
    couponTotal: 'couponTotal',
    discountsTotalPrice: 'discountsTotalPrice',
    totalDeliveryPrice: 'totalDeliveryPrice',
    useCoupons: Function,
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
    totalCommission: 'totalCommission',
    isDistributor: 'isDistributor',
    payOptions: 'payOptions',
    payType: 'payType',
    saveSessionStorage: noop,
    totalBuyPoint: 'totalBuyPoint',
    goodsTotalNum: 'goodsTotalNum'
  };

  render() {
    const {
      totalPrice,
      goodsTotalPrice,
      couponTotal,
      discountsTotalPrice,
      totalDeliveryPrice,
      useCoupons,
      totalPoint,
      pointConfig,
      maxPoint,
      maxPointDiscount,
      setUsePoint,
      pointDiscount,
      changeSwitch,
      showPoint,
      discountsTotalOrderPrice,
      subType,
      integralInput,
      totalCommission,
      isDistributor,
      payOptions,
      payType,
      totalBuyPoint,
      goodsTotalNum
    } = this.props.relaxProps;
    const openStatus = pointConfig && pointConfig.get('status');
    const opening =
      (totalPoint
        ? _.sub(totalPoint, pointConfig.get('overPointsAvailable')) > 0
        : false) || maxPoint == 0;
    const openchecked = opening ? showPoint : false ;
    const payIndex = payOptions.findIndex((f) => f.get('id') == payType);
    return (
      <View style={styles.totalPrice}>
        <View
          style={[
            styles.box,
            {
              marginBottom: 12,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              paddingVertical: 0
            }
          ]}
        >
          <View style={styles.totalList}>
            <Text allowFontScaling={false} style={styles.orderPrice}>
              商品金额
            </Text>
            <Text allowFontScaling={false} style={styles.greyColor}>
              ¥{_.addZero(goodsTotalPrice || 0)}
            </Text>
          </View>

          <View style={[styles.totalList, styles.borderRLBradius]}>
            <Text allowFontScaling={false} style={styles.orderPrice}>
              配送费用
            </Text>
            <Text allowFontScaling={false} style={styles.greyColor}>
              ¥{_.addZero(totalDeliveryPrice || 0)}
            </Text>
          </View>
        </View>
        <View style={[styles.box, { marginBottom: 12 }]}>
          <TouchableOpacity
            style={styles.delivery}
            activeOpacity={0.8}
            onPress={debounce(() => this._goToPay(), 500)}
          >
            <Text allowFontSacling={false} style={styles.title}>
              支付方式
            </Text>
            <View style={styles.rightContext}>
              <View style={{ flexDirection: 'row' }}>
                {payType >= 0 && (
                  <Text allowFontSacling={false} style={styles.payText}>
                    {payOptions.getIn([payIndex, 'name'])}
                  </Text>
                )}
                {/*<Text allowFontSacling={false} style={styles.payText}>*/}
                {/*  /快递配送*/}
                {/*</Text>*/}
              </View>
              <Image
                style={[styles.arrow, { marginLeft: 10 }]}
                source={require('../img/arrow.png')}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.totalList}
            onPress={debounce(() => useCoupons(), 500)}
          >
            <Text allowFontScaling={false} style={styles.orderPrice}>
              使用优惠券
            </Text>
            <Text allowFontScaling={false} style={styles.greyColor}>
              ¥{_.addZero(couponTotal)}
            </Text>
            <Image style={styles.img} source={require('../img/arrow.png')} />
          </TouchableOpacity>
          {openStatus == '1' && opening
            ? (
                <View style={styles.integralBox}>
                  <View style={styles.integralSwitch}>
                    <Text allowFontScaling={false}>使用积分</Text>
                    <Switch
                      trackColor={{ true: '#fff0f0' }}
                      thumbColor={openchecked ? mainColor : '#eee'}
                      value={openchecked}
                      disabled={!opening || maxPoint == 0}
                      onValueChange={(e) => changeSwitch(e)}
                    />
                  </View>
                  {showPoint ? (
                    <View style={styles.rowFlex}>
                      <Text style={styles.greyColor} allowFontScaling={false}>
                        使用
                      </Text>
                      <TextInput
                        autoFocus={window.keyBoardShow}
                        keyboardType="numeric"
                        style={styles.input}
                        placeholder=""
                        placeholderTextColor="#999"
                        underlineColorAndroid="transparent"
                        value={integralInput}
                        onChangeText={(value) => setUsePoint(value, maxPoint)}
                      />
                      <Text style={styles.greyColor} allowFontScaling={false}>
                        积分&nbsp;抵扣
                        <Text allowFontScaling={false} style={{ color: priceColor }}>
                          &yen;
                          {pointDiscount}
                        </Text>
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.totalText} allowFontScaling={false}>
                      共
                      <Text allowFontScaling={false} style={{ color: priceColor }}>
                        {totalPoint}
                      </Text>
                      积分&nbsp;
                      {!opening ? (
                        '达到' +
                        pointConfig.get('overPointsAvailable') +
                        '积分后可用于下单抵扣'
                      ) : (
                        <Text allowFontScaling={false}>
                          最多可用
                          {maxPoint}
                          积分抵扣
                          <Text allowFontScaling={false} style={{ color: priceColor }}>
                            &yen;
                            {maxPointDiscount}
                          </Text>
                        </Text>
                      )}
                    </Text>
                  )}
                  {showPoint && (
                    <Text style={styles.totalText}>
                      共
                      <Text allowFontScaling={false} style={{ color: priceColor }}>
                        {totalPoint}
                      </Text>
                      积分&nbsp;最多可用
                      {maxPoint}
                      积分抵扣
                      <Text allowFontScaling={false} style={{ color: priceColor }}>
                        &yen;
                        {maxPointDiscount}
                      </Text>
                    </Text>
                  )}
                  {/* <View style={styles.grayBg} /> */}
                </View>
              )
            : null}
        </View>

        <View style={styles.box}>
          <View style={styles.totalList}>
            <Text allowFontScaling={false} style={styles.orderPrice}>
              订单总额
            </Text>
            <Text allowFontScaling={false} style={{ color: priceColor }}>
              ¥{_.addZero(totalPrice)}
            </Text>
          </View>
          <View style={styles.totalList}>
            <Text allowFontScaling={false} style={styles.orderPrice}>
              商品总额
            </Text>
            <Text allowFontScaling={false} style={styles.greyColor}>
              ¥{_.addZero(goodsTotalPrice)}
            </Text>
          </View>
          <View style={styles.totalList}>
            <Text allowFontScaling={false} style={styles.orderPrice}>
              优惠总额
            </Text>
            <Text allowFontScaling={false} style={styles.greyColor}>
              -¥
              {_.addZero(discountsTotalPrice)}
            </Text>
          </View>
          {/*<View style={styles.totalList}>*/}
          {/*  <Text allowFontScaling={false} style={styles.orderPrice}>*/}
          {/*    积分抵扣*/}
          {/*  </Text>*/}
          {/*  <Text allowFontScaling={false} style={styles.greyColor}>*/}
          {/*    -¥*/}
          {/*    {showPoint?_.addZero(pointDiscount):'0.00'}*/}
          {/*  </Text>*/}
          {/*</View>*/}
          {openStatus == '1' && opening && (
              <View style={styles.totalList}>
                <Text allowFontScaling={false} style={styles.orderPrice}>
                  积分抵扣
                </Text>
                <Text allowFontScaling={false} style={styles.greyColor}>
                  -¥
                  {_.addZero(pointDiscount)}
                </Text>
              </View>
            )}
          {/*{openStatus == '1' && opening && (*/}
          {/*  <View style={styles.totalList}>*/}
          {/*    <Text allowFontScaling={false} style={styles.orderPrice}>*/}
          {/*      使用积分*/}
          {/*    </Text>*/}
          {/*    <Text allowFontScaling={false} style={styles.greyColor}>*/}
          {/*      {totalBuyPoint || 0}*/}
          {/*    </Text>*/}
          {/*  </View>*/}
          {/*)}*/}
          {isDistributor && totalCommission > 0 && (
            <View style={[styles.totalList, styles.totalRebate]}>
              <Text allowFontScaling={false} style={styles.orderPrice}>
                预计返利
              </Text>
              <Text allowFontScaling={false} style={styles.greyColor}>
                ¥{totalCommission && totalCommission.toFixed(2)}
              </Text>
            </View>
          )}
          <View style={styles.totalList}>
            <Text allowFontScaling={false} style={styles.orderPrice}>
              商品总件数
            </Text>
            <Text allowFontScaling={false} style={styles.greyColor}>
              {goodsTotalNum}
            </Text>
          </View>
          {(subType==7||subType==8)&&(<View style={styles.totalList}>
            <Text allowFontScaling={false} style={styles.orderPrice}>
            订单满{subType==7?'减':'折'}优惠后金额
            </Text>
            <Text allowFontScaling={false} style={styles.greyColor}>
              {discountsTotalOrderPrice}
            </Text>
          </View>)}
          
        </View>
      </View>
    );
  }

  /**
   * 支付配送
   *
   */
  _goToPay = () => {
    this.props.relaxProps.saveSessionStorage('payment');
    msg.emit('router: goToNext', {
      routeName: 'PayDelivery'
    });
  };
}

const styles = StyleSheet.create({
  totalPrice: {
    // backgroundColor: '#ffffff',
    // borderStyle: 'solid',
    // borderTopWidth: 1 / PixelRatio.get(),
    // borderTopColor: '#ebebeb',
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb',
    paddingHorizontal: 12,
    marginBottom: 10
  },
  totalList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  orderPrice: {
    fontSize: 14,
    color: '#333333',
    flex: 1
  },
  greyColor: {
    color: '#333'
  },
  img: {
    width: 7,
    height: 13,
    tintColor: '#000',
    marginLeft: 5
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    height: 35,
    width: 105,
    // backgroundColor: '#fafafa',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ebebeb',
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
    color: '#333333',
    fontSize: 14
  },
  delivery: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12
    // backgroundColor: '#ffffff',
    // borderBottomColor: '#ebebeb',
    // borderBottomWidth: 1 / PixelRatio.get()
  },
  payText: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20
  },
  arrow: {
    width: 7,
    height: 13,
    tintColor: '#333'
  },
  box: {
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingVertical: 10
  }
});
