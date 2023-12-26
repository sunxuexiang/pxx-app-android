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
import { fromJS } from 'immutable';
import moment from 'moment';

import * as _ from 'wmkit/common/util';
import { noop } from 'wmkit/noop';
import AutoGrowingTextInput from 'wmkit/autoGrowingTextInput';

import { mainColor, priceColor } from 'wmkit/styles/index';
import { msg, Relax } from 'plume2';
import {
  OrderMaxPointDiscountQL,
  OrderMaxPointQL,
  OrderUsePointDiscountQL
} from '../ql';
import {debounce} from 'lodash';

const TYPES = {
  '0': '满减优惠',
  '1': '满折优惠',
  '2': '满赠优惠'
};
@Relax
export default class AmountStatistics extends Component {
  static relaxProps = {
    discountsTotalOrderPrice: 'discountsTotalOrderPrice',
    subType: 'subType',
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
    isBookingSaleGoods: 'isBookingSaleGoods',
    tailNoticeMobile: 'tailNoticeMobile',
    isPresale: 'isPresale',
    saveTailNoticeMobile: noop,
    stores: 'stores',
    isCommit: 'isCommit',
    changeIsCommit: noop,
    // 是否是开店礼包商品
    storeBagsFlag: 'storeBagsFlag',
    goodsTotalNum: 'goodsTotalNum',
    totalDeliveryPrice: 'totalDeliveryPrice'
  };
  constructor(props) {
    super(props);
  }
  render() {
    const { single, useCoupons, couponTotal, totalCommission } = this.props;
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
      discountsTotalOrderPrice,
      subType,
      isDistributor,
      payOptions,
      payType,
      totalBuyPoint,
      discountsTotalPrice,
      // 定金预售
      isBookingSaleGoods,
      tailNoticeMobile,
      isPresale,
      saveTailNoticeMobile,
      stores,
      isCommit,
      changeIsCommit,
      storeBagsFlag,
      goodsTotalNum,
      totalDeliveryPrice
    } = this.props.relaxProps;
    const prices = (fromJS(discountsPrice) || fromJS([])).groupBy((item) =>
      item.get('type')
    );
    let allPrice = 0;
    prices.map((val, key) => {
      console.log(key, 'v.key');
      const price = val.map((v) => v.get('amount')).reduce((a, b) => (a += b));
      allPrice = allPrice + price;
    });

    const openStatus = pointConfig && pointConfig.get('status');
    const opening = totalPoint
      ? _.sub(totalPoint, pointConfig.get('overPointsAvailable')) >= 0
      : false;
    const openchecked = opening ? showPoint : false;
    const payIndex = payOptions.findIndex((f) => f.get('id') == payType);
    const store = stores.toJS();
    let earnestPrice = 0,
      swellPrice = 0,
      tailStartTime;
    if (store.length != 0) {
      const { tradeItems } = store[0];
      earnestPrice = tradeItems[0].earnestPrice; //定金
      swellPrice = tradeItems[0].swellPrice; //膨胀
      tailStartTime = tradeItems[0].tailStartTime; //尾款时间
    }

    return (
      <View style={styles.totalPrice}>
        {(single ||
          (!storeBagsFlag && single) ||
          (pointConfig.get('pointsUsageFlag') !== 1 && single)) && (
          <View style={[styles.box, { marginBottom: 12 }]}>
            {single && (
              <TouchableOpacity
                style={styles.delivery}
                activeOpacity={0.8}
                onPress={debounce(() => {
                  if (!isPresale) this._goToPay();
                }, 500)}
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
            {!storeBagsFlag
              ? single && (
                  <TouchableOpacity
                    style={styles.totalList}
                    onPress={debounce(() => {
                      if (!isBookingSaleGoods) useCoupons();
                    }, 500)}
                  >
                    <Text allowFontScaling={false} style={styles.title}>
                      使用优惠券
                    </Text>
                    <View style={styles.rightContext}>
                      <Text allowFontScaling={false} style={styles.greyColor}>
                        {/* 定金预售不可用 */}
                        {isBookingSaleGoods
                          ? '尾款阶段使用'
                          : '￥' + _.addZero(couponTotal)}
                      </Text>
                      {!isPresale && (
                        <Image
                          style={styles.arrow}
                          source={require('../img/arrow.png')}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                )
              : null}
            {openStatus == '1' && opening && single ? (
              <View style={styles.integralBox}>
                <View style={styles.integralSwitch}>
                  <Text allowFontScaling={false}>使用积分</Text>
                  {/* 定金预售不可用 */}
                  {isBookingSaleGoods ? (
                    <Text allowFontScaling={false} style={styles.greyColor}>
                      尾款阶段可用
                    </Text>
                  ) : (
                    <Switch
                      trackColor={{ true: '#fff0f0' }}
                      thumbColor={openchecked ? mainColor : '#eee'}
                      value={openchecked}
                      disabled={!opening || maxPoint == 0}
                      onValueChange={(e) => changeSwitch(e)}
                    />
                  )}
                </View>
                {showPoint && !isBookingSaleGoods ? (
                  <View style={styles.rowFlex}>
                    <Text style={styles.greyColor} allowFontScaling={false}>
                      使用
                    </Text>
                    <TextInput
                      autoFocus={window.keyBoardShow}
                      keyboardType="numeric"
                      style={styles.input}
                      placeholder=""
                      placeholderTextColor="rgba(0,0,0,0.4)"
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
                  !isBookingSaleGoods && (
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
                  )
                )}
                {showPoint && (
                  <Text allowFontScaling={false} style={styles.totalText}>
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
            ) : null}
          </View>
        )}

        <View style={[styles.box]}>
          {single && (
            <View style={styles.totalList}>
              <Text allowFontScaling={false} style={styles.title}>
                订单总额
              </Text>
              <Text allowFontScaling={false} style={{ color: priceColor }}>
                ¥
                {_.addZero(
                  tradePrice.totalPrice -
                    (couponTotal || 0) -
                    (pointDiscount || 0)
                )}
              </Text>
            </View>
          )}
          {!isBookingSaleGoods && (
            <View style={styles.totalList}>
              <Text allowFontScaling={false} style={styles.title}>
                商品金额
              </Text>
              <Text allowFontScaling={false} style={styles.greyColor}>
                ¥{_.addZero(tradePrice.goodsPrice || 0)}
              </Text>
            </View>
          )}
          {single && !isBookingSaleGoods && (
            <View style={styles.totalList}>
              <Text allowFontScaling={false} style={styles.title}>
                优惠总额
              </Text>
              <Text allowFontScaling={false} style={styles.greyColor}>
                -¥
                {_.addZero(discountsTotalPrice)}
              </Text>
            </View>
          )}
          {openStatus == '1' && opening && (
            <View style={styles.totalList}>
              <Text allowFontScaling={false} style={styles.title}>
                积分抵扣
              </Text>
              <Text allowFontScaling={false} style={styles.greyColor}>
                -¥
                {_.addZero(pointDiscount)}
              </Text>
            </View>
          )}
          {single &&
            !isBookingSaleGoods &&
            isDistributor &&
            totalCommission > 0 && (
              <View style={[styles.totalList, styles.totalRebate]}>
                <Text allowFontScaling={false} style={styles.title}>
                  预计返利
                </Text>
                <Text allowFontScaling={false} style={styles.greyColor}>
                  ¥ {totalCommission && totalCommission.toFixed(2)}
                </Text>
              </View>
            )}

          {isBookingSaleGoods && (
            <View>
              <View style={styles.totalList}>
                <Text allowFontScaling={false} style={styles.title}>
                  尾款通知手机号
                </Text>
                <AutoGrowingTextInput
                  {...this.props}
                  ref={(ref) => (this.input = ref)}
                  underlineColorAndroid="transparent"
                  style={styles.textInput}
                  type="number"
                  defaultValue={tailNoticeMobile}
                  multiline={true}
                  minHeight={24}
                  placeholder={'点击输入，手机号'}
                  onChange={(e) =>
                    saveTailNoticeMobile({
                      tailNoticeMobile: e.nativeEvent.text
                    })
                  }
                  maxLength={11}
                  textAlignVertical="top"
                />
              </View>
              <View style={styles.totalList}>
                <Text allowFontScaling={false} style={styles.title}>
                  定金
                </Text>
                <Text allowFontScaling={false} style={styles.greyColor}>
                  ¥ {earnestPrice && earnestPrice.toFixed(2)}
                </Text>
              </View>
              <View style={styles.totalList}>
                <Text allowFontScaling={false} style={styles.title} />
                <Text allowFontScaling={false} style={styles.swellPrice}>
                  定金膨胀¥ {swellPrice && swellPrice.toFixed(2)}
                </Text>
              </View>
              <View style={styles.totalList}>
                <Text allowFontScaling={false} style={styles.title}>
                  尾款
                </Text>
                <Text allowFontScaling={false} style={styles.greyColor}>
                  ¥
                  {_.sub(tradePrice.totalPrice, swellPrice) >= 0
                    ? _.sub(tradePrice.totalPrice, swellPrice)
                    : 0}
                </Text>
              </View>
              <View style={styles.totalList}>
                <Text allowFontScaling={false} style={styles.title} />
                <Text allowFontScaling={false} style={styles.tailStartTime}>
                  {moment(tailStartTime).format('M月DD日 HH:mm')}
                  开始支付尾款
                </Text>
              </View>
            </View>
          )}
          {/* </View> */}

          {isBookingSaleGoods && (
            <View style={[styles.box, styles.deposit]}>
              <View style={styles.orderStoreItem}>
                <View>
                  <Text style={styles.title}>同意支付定金</Text>
                  <Text style={[styles.title, styles.depositTag]}>
                    预售商品，定金不退噢
                  </Text>
                </View>
                <View style={styles.switch}>
                  <Switch
                    onTintColor={mainColor}
                    thumbTintColor={true ? '#fff' : '#f4f3f4'}
                    value={isCommit}
                    onValueChange={(e) => changeIsCommit(e)}
                  />
                </View>
              </View>
            </View>
          )}

          <View style={[styles.totalList, styles.borderRLBradius]}>
            <Text allowFontScaling={false} style={styles.title}>
              配送费用
            </Text>
            <Text allowFontScaling={false} style={styles.greyColor}>
              ¥{_.addZero(totalDeliveryPrice || 0)}
            </Text>
          </View>
          <View style={[styles.totalList, styles.borderRLBradius]}>
            <Text allowFontScaling={false} style={styles.title}>
              商品总件数
            </Text>
            <Text allowFontScaling={false} style={styles.greyColor}>
              {goodsTotalNum}
            </Text>
          </View>
          {(subType==7||subType==8)&&(<View style={[styles.totalList, styles.borderRLBradius]}>
            <Text allowFontScaling={false} style={styles.title}>
            订单满{subType==7?'减':'折'}优惠金额
            </Text>
            <Text allowFontScaling={false} style={styles.greyColor}>
              -¥{discountsTotalOrderPrice.toFixed(2)}
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
