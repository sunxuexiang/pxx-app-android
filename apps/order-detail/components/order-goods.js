/**
 * Created by hht on 2017/8/30.
 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  PixelRatio,
  TouchableOpacity,
  ScrollView,
  Switch,
  TextInput
} from 'react-native';
import { Relax, msg } from 'plume2';
import moment from 'moment';

import { priceColor, screenWidth, mainColor } from 'wmkit/styles/index';
import SelfSalesLabel from 'wmkit/biz/selfsales-label';
import OrderWrapper from 'wmkit/order-wrapper';
import WMImage from 'wmkit/image/index';
import FormSelect from 'wmkit/form/form-select';
import FormItem from 'wmkit/form/form-item';
import { noop } from 'wmkit/noop';
import * as _ from 'wmkit/common/util';
import Price from 'wmkit/price';

import {
  OrderMaxPointDiscountQL,
  OrderMaxPointQL,
  OrderUsePointDiscountQL
} from '../ql';

@Relax
export default class OrderGoods extends Component {
  static relaxProps = {
    detail: 'detail',
    changeAnnexMask: noop,
    pointConfig: 'pointConfig',
    isBookingSaleGoods: 'isBookingSaleGoods',
    isPayBalance: 'isPayBalance',
    goodsTotalPrice: 'goodsTotalPrice',
    showPoint: 'showPoint',
    setUsePoint: Function,
    changeSwitch: Function,
    maxPoint: OrderMaxPointQL,
    // 积分可抵扣的最大金额
    maxPointDiscount: OrderMaxPointDiscountQL,
    //积分抵扣金额
    pointDiscount: OrderUsePointDiscountQL,
    totalPoint: 'totalPoint',
    integralInput: 'integralInput',
    isPresale: 'isPresale',
    useCoupons: Function,
    couponTotal: 'couponTotal',
    goodsTotalNum: 'goodsTotalNum',
  };

  render() {
    const {
      detail,
      changeAnnexMask,
      pointConfig,
      isBookingSaleGoods,
      isPayBalance,
      goodsTotalPrice,
      showPoint,
      changeSwitch,
      maxPointDiscount,
      setUsePoint,
      pointDiscount,
      totalPoint,
      maxPoint,
      integralInput,
      isPresale,
      useCoupons,
      couponTotal,
      goodsTotalNum,
    } = this.props.relaxProps;
    let orderWrapper = OrderWrapper(detail);

    let earnestPrice = 0,
      swellPrice = 0,
      points = 0,
      tailStartTime,
      tailPrice = 0;

    const detailItem = detail.toJS();
    // console.log('debug99 totalPoint', totalPoint);
    if (detailItem && JSON.stringify(detailItem) != '{}') {
      const tradePrice = detailItem.tradePrice;
      const tradeState = detailItem.tradeState;
      earnestPrice = tradePrice.earnestPrice; //定金
      swellPrice = tradePrice.swellPrice; //膨胀
      tailStartTime = tradeState.tailStartTime;
      points = tradePrice.points;
      tailPrice = tradePrice.tailPrice;
    }

    const openStatus = pointConfig && pointConfig.get('status');
    const opening =
      (totalPoint
        ? _.sub(pointConfig.get('overPointsAvailable'), totalPoint) > 0
        : false) || maxPoint == 0;
    const openchecked = opening ? false : showPoint;
    const pickTest =
      detail.get('tradeState') &&
      (detail.getIn(['tradeState','flowState']) == 'COMPLETED'
        || detail.getIn(['tradeState','flowState']) == 'CONFIRMED')
        ? '已自提'
        : '待自提';
        const tradeMarketings = detail.toJS().tradeMarketings
        ? detail
            .toJS()
            .tradeMarketings.filter(
              (item) => item.subType == 7 || item.subType == 8
            )
        : [];
    const logisticsCompanyInfo = detail.toJS().logisticsCompanyInfo;
    //debugger;
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.skuHead}>
            {orderWrapper.isSelf() ? <SelfSalesLabel /> : null}
            <TouchableOpacity
              style={styles.itemCount}
              activeOpacity={0.8}
              /*onPress={() => this._goStore(orderWrapper.storeId())}*/
            >
              <Text
                allowFontSacling={false}
                numberOfLines={1}
                style={{ flex: 1 }}
              >
                {orderWrapper.storeName()}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.lineItem, styles.itemContainer]}
            onPress={() => {
              msg.emit('router: goToNext', {
                routeName: 'OrderDetailSkus',
                tId: orderWrapper.orderNo(),
                totalPrice:orderWrapper.totalPrice()
              });
            }}
          >
              <View style={styles.imgContainer}>
                {orderWrapper
                  .tradeItems()
                  .concat(orderWrapper.gifts())
                  .filter((val, index) => index < 4)
                  .toJS()
                  .map((item) => {
                    return (<Image
                      style={styles.img1}
                      key={Math.random().toString()}
                      source={
                        item.pic
                          ? { uri: `${item.pic}?x-oss-process=image/format,jpg/interlace,1,image/resize,m_mfit,w_100,h_100` }
                          : require('../img/none.png')
                      }
                    />);
                  })
                }
              </View>
              <View style={styles.itemCount1}>
                <Text style={styles.grey} allowFontScaling={false}>
                  {detailItem.goodsTotalNum || this._countNum(detailItem)}
                </Text>
                <Image
                  source={require('../img/arrow.png')}
                  style={styles.icon}
                />
              </View>
          </TouchableOpacity>

          {/* 预售不展示 */}
          {!isBookingSaleGoods && (
            <View>
              <FormSelect
                label="付款记录"
                placeholder=""
                itemStyle={{
                  borderBottomWidth: 0,
                  paddingVertical: 10,
                  paddingHorizontal: 12
                }}
                textStyle={{ textAlign: 'right' }}
                selected={{ key: '1', value: orderWrapper.orderPayState() }}
                onPress={() => this._toPayRecord(orderWrapper.orderNo())}
              />
              {orderWrapper.deliverWay()===3?(
                  <FormSelect
                    label="发货记录"
                    placeholder=""
                    itemStyle={{
                      borderBottomWidth: 0,
                      paddingVertical: 10,
                      paddingHorizontal: 12
                    }}
                    textStyle={{ textAlign: 'right' }}
                    selected={{
                      key: '1',
                      value: pickTest
                    }}
                    onPress={() =>
                      this._toPickUp(
                        orderWrapper.orderNo(),
                      )
                    }
                  />
                ):(
                  <FormSelect
                    label="发货记录"
                    placeholder=""
                    itemStyle={{
                      borderBottomWidth: 0,
                      paddingVertical: 10,
                      paddingHorizontal: 12
                    }}
                    textStyle={{ textAlign: 'right' }}
                    selected={{
                      key: '1',
                      value: orderWrapper.orderDeliveryState()
                    }}
                    onPress={() =>
                      this._toShipRecord(
                        orderWrapper.orderNo(),
                        orderWrapper.orderDeliveryState()
                      )
                    }
                    disabled={
                      !this._isIconVisible(orderWrapper.orderDeliveryState())
                    }
                    iconVisible={this._isIconVisible(
                      orderWrapper.orderDeliveryState()
                    )}
                  />
                )
              }

              <FormSelect
                label="发票信息"
                placeholder=""
                itemStyle={{
                  borderBottomWidth: 0,
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 12
                }}
                textStyle={{ textAlign: 'right' }}
                selected={{ key: '1', value: orderWrapper.orderInvoice() }}
                onPress={() => this._toInvoice(orderWrapper.orderNo())}
                disabled={!this._isInvoiceVisible(orderWrapper.orderInvoice())}
                iconVisible={this._isInvoiceVisible(
                  orderWrapper.orderInvoice()
                )}
              />
              <FormItem
                itemStyle={{
                  borderBottomWidth: 0,
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 12
                }}
                labelName="配送方式"
                textStyle={{textAlign: 'right', fontWeight: '500', color: 'rgba(0,0,0,0.8)'}}
                placeholder={orderWrapper.orderDeliverWay()}
              />
              {orderWrapper.orderDeliverWay() == '物流' &&<FormItem
                itemStyle={{
                  borderBottomWidth: 0,
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 12
                }}
                labelName="物流公司"
                textStyle={{textAlign: 'right', fontWeight: '500', color: 'rgba(0,0,0,0.8)'}}
                placeholder={logisticsCompanyInfo ? logisticsCompanyInfo.logisticsCompanyName + logisticsCompanyInfo.logisticsCompanyPhone + logisticsCompanyInfo.logisticsAddress : '无'}
              />}
              {orderWrapper.orderDeliverWay() == '物流' &&<FormItem
                itemStyle={{
                  borderBottomWidth: 0,
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 12
                }}
                labelName="收货站点"
                textStyle={{textAlign: 'right', fontWeight: '500', color: 'rgba(0,0,0,0.8)'}}
                placeholder={logisticsCompanyInfo ? (logisticsCompanyInfo.receivingPoint || '无') : '无'}
              />}
            </View>
          )}
        </View>

        {!isBookingSaleGoods && (
          <View style={styles.box}>
            <FormItem
              labelName="订单备注"
              style={{
                backgroundColor: 'transparent',
                borderBottomWidth: 0,
                paddingVertical: 10,
                paddingHorizontal: 12
              }}
              placeholder={orderWrapper.buyerRemark()}
            />
            <FormItem
              labelName="卖家备注"
              style={{
                backgroundColor: 'transparent',
                borderBottomWidth: 0,
                paddingVertical: 10,
                paddingHorizontal: 12
              }}
              placeholder={orderWrapper.sellerRemark()}
            />
            <View style={styles.backItem}>
              <View style={styles.backTitle}>
                <Text allowFontScaling={false}>订单附件</Text>
              </View>
              <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
                {orderWrapper.encloses().length > 0 ? (
                  orderWrapper.encloses().map((img, index) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        // changeAnnexMask(index);
                      }}
                      key={index}
                    >
                      <WMImage
                        key={Math.random()}
                        resizeMode="contain"
                        style={styles.image}
                        src={img.image}
                        zoom
                      />
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text allowFontScaling={false} style={{ color: '#8b8b8b' }}>
                    无
                  </Text>
                )}
              </ScrollView>
            </View>
          </View>
        )}

        <View style={styles.remarks}>
          {!isBookingSaleGoods && (
            <View style={styles.itemTitle}>
              <Text allowFontScaling={false}>应付金额</Text>
              <Text style={{ color: priceColor }} allowFontScaling={false}>
                &yen;
                {orderWrapper.totalPrice()}
              </Text>
            </View>
          )}
          <View style={styles.itemTitle}>
            <Text allowFontScaling={false}>商品金额</Text>
            <Text allowFontScaling={false} style={styles.textGray}>
              &yen;
              {orderWrapper.goodsPrice()}
            </Text>
          </View>
          {orderWrapper.reductionPrice() != 0 &&
            !isBookingSaleGoods && (
              <View style={styles.itemTitle}>
                <Text allowFontScaling={false}>满减优惠</Text>
                <Text allowFontScaling={false} style={styles.textGray}>
                  -&yen;
                  {orderWrapper.reductionPrice()}
                </Text>
              </View>
            )}
          {orderWrapper.discountPrice() != 0 &&
            !isBookingSaleGoods && (
              <View style={styles.itemTitle}>
                <Text allowFontScaling={false}>买折优惠</Text>
                <Text allowFontScaling={false} style={styles.textGray}>
                  -&yen;
                  {orderWrapper.discountPrice()}
                </Text>
              </View>
            )}

            {/* 普通订单积分价商品（排除预售订单） */}
            {orderWrapper.points() && orderWrapper.points() != 0 && !isBookingSaleGoods && (
              <View style={styles.itemTitle}>
              <Text allowFontScaling={false}>使用积分</Text>
              <Text allowFontScaling={false} style={styles.textGray}>
                {orderWrapper.points() || 0}
              </Text>
            </View>
            )}

          {isBookingSaleGoods ? (
            <View>
              <View style={styles.itemTitle}>
                <Text allowFontScaling={false}>支付/配送</Text>
                <Text allowFontScaling={false} style={styles.textGray}>
                  在线支付/快递配送
                </Text>
              </View>

              <TouchableOpacity
                style={styles.itemTitle}
                onPress={() => {
                  if (orderWrapper.orderState() == '待支付尾款') useCoupons();
                }}
              >
                <Text allowFontScaling={false} style={{ flex: 1 }}>
                  优惠券
                </Text>
                <Text allowFontScaling={false} style={styles.textGray}>
                  {orderWrapper.orderState() == '待支付定金'
                    ? '尾款阶段可用'
                    : '￥' + _.addZero(couponTotal)}
                </Text>
                {orderWrapper.orderState() == '待支付尾款' && (
                  <Image
                    style={[styles.arrow]}
                    source={require('../img/arrow.png')}
                  />
                )}
              </TouchableOpacity>

              {orderWrapper.orderState() == '待支付定金' ||
              // !isPayBalance ||
              orderWrapper.orderState() != '待支付尾款' ? (
                <View style={styles.itemTitle}>
                  <Text allowFontScaling={false}>使用积分</Text>
                  <Text allowFontScaling={false} style={styles.textGray}>
                    {orderWrapper.orderState() == '待支付定金'
                      ? '尾款阶段可用'
                      : points || 0}
                  </Text>
                </View>
              ) : (
                // opening &&
                !(pointConfig.get('pointsUsageFlag') == 1) && (
                  <View style={styles.integralBox}>
                    <View style={styles.integralSwitch}>
                      <Text allowFontScaling={false}>使用积分</Text>
                      <Switch
                        onTintColor={mainColor}
                        trackColor={{ true: mainColor }}
                        thumbTintColor={true ? '#fff' : '#f4f3f4'}
                        value={openchecked}
                        disabled={opening || maxPoint == 0}
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
                        {opening ? (
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
                    <View style={styles.grayBg} />
                  </View>
                )
              )}
            </View>
          ):orderWrapper.couponPrice() != 0 && (
            <View style={styles.itemTitle}>
            <Text allowFontScaling={false}>优惠券</Text>
            <Text allowFontScaling={false} style={styles.textGray}>
              -&yen;
              {orderWrapper.couponPrice()}
            </Text>
          </View>
          )}
          <View style={styles.itemTitle}>
            <Text allowFontScaling={false}>配送费用</Text>
            <Text style={styles.textGray} allowFontScaling={false}>
              &yen;
              {orderWrapper.deliveryPrice()}
            </Text>
          </View>
          <View style={styles.itemTitle}>
            <Text allowFontScaling={false}>商品总件数</Text>
            <Text style={styles.textGray} allowFontScaling={false}>
              {goodsTotalNum}
            </Text>
          </View>
          {tradeMarketings.length>0&&(<View style={styles.itemTitle}>
            <Text allowFontScaling={false}>{`订单满${
                tradeMarketings[0].subType == 7 ? '减' : '折'
              }优惠金额`}</Text>
            <Text style={styles.textGray} allowFontScaling={false}>
            -￥{tradeMarketings[0].discountsAmount.toFixed(2)}
            </Text>
          </View>)}
          {isBookingSaleGoods && (
            <View style={styles.itemTitle}>
              <Text allowFontScaling={false}>尾款通知手机号</Text>
              <Text style={styles.textGray} allowFontScaling={false}>
                {detailItem.tailNoticeMobile}
              </Text>
            </View>
          )}

          {isBookingSaleGoods && (
            <View>
              <View style={styles.itemTitle}>
                <Text allowFontScaling={false}>定金</Text>
                <Text allowFontScaling={false} style={styles.textGray}>
                  -¥{earnestPrice && earnestPrice.toFixed(2)}
                </Text>
              </View>
              <View style={[styles.itemTitle, {paddingVertical: 0}]}>
                <Text allowFontScaling={false} />
                <Text allowFontScaling={false} style={[styles.swellPrice, { color: mainColor }]}>
                  定金膨胀¥ {swellPrice && swellPrice.toFixed(2)}
                </Text>
              </View>
              <View style={styles.itemTitle}>
                <Text allowFontScaling={false}>尾款</Text>
                <Text allowFontScaling={false} style={styles.textGray}>
                  ¥
                  {tailPrice.toFixed(2)}
                </Text>
              </View>
              <View style={[styles.itemTitle, {paddingVertical: 0}]}>
                <Text allowFontScaling={false} />
                <Text allowFontScaling={false} style={styles.tailStartTime}>
                  {moment(tailStartTime).format('M月DD日 HH:mm')}
                  开始支付尾款
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }

  /**
   * 付款记录页
   */
  _toPayRecord = (tid) => {
    msg.emit('router: goToNext', {
      routeName: 'PayRecord',
      tId: tid
    });
  };

  _toShipRecord = (id, state) => {
    if (state == '未发货') {
      return;
    } else {
      msg.emit('router: goToNext', {
        routeName: 'ShipRecord',
        tId: id,
        type: 0
      });
    }
  };

  _toPickUp = (id) => {
    msg.emit('router: goToNext', {
      routeName: 'PickUpRecord',
      tId: id,
    });
  };

  /**
   * 发货记录icon是否显示
   * @param state
   * @returns {boolean}
   * @private
   */
  _isIconVisible = (state) => {
    if (state === '未发货') {
      return false;
    }
    return true;
  };

  /**
   * 发票记录
   */
  _toInvoice = (id) => {
    const { detail } = this.props.relaxProps;
    let orderWrapper = OrderWrapper(detail);
    if (orderWrapper.orderInvoice() == '不需要发票') {
      return;
    } else {
      msg.emit('router: goToNext', {
        routeName: 'InvoiceInfo',
        tid: id
      });
    }
  };

  /**
   * 发票信息是否显示
   */
  _isInvoiceVisible = (invoice) => {
    if (invoice === '不需要发票') {
      return false;
    }
    return true;
  };

  /**
   * 跳转店铺首页
   * @param storeId
   * @private
   */
  _goStore = (storeId) => {
    msg.emit('router: goToNext', { routeName: 'StoreMain', storeId });
  };

  /**
   * 这个字段是后加的，为了旧数据订单没有加了这个方法
   * @param order
   * @private
   */
  _countNum = (order) => {
    let goodsTotalNum = 0;

    order.tradeItems.forEach((tradeItem) => {
      goodsTotalNum += tradeItem.num;
    });
    if (order.gifts) {
      order.gifts.forEach((gift) => {
        goodsTotalNum += gift.num;
      });
    }
    return goodsTotalNum;
  };
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10
    // backgroundColor: '#fff'
    // borderTopWidth: 1 / PixelRatio.get(),
    // borderTopColor: '#ebebeb'
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 12,
    marginBottom: 12,
    paddingVertical: 10
  },
  firstItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb',
    alignItems: 'center',
    // padding: 10
    paddingTop: 10
  },
  otherItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10
  },
  image: {
    height: 55,
    width: 55,
    marginRight: 10,
    borderColor: '#ebebeb',
    borderWidth: 1 / PixelRatio.get()
  },
  imageDom: {
    flexDirection: 'row'
  },
  textDom: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  count: {
    justifyContent: 'center'
  },
  recordRight: {
    flexDirection: 'row'
  },
  center: {
    justifyContent: 'center'
  },
  num: {
    color: '#333',
    fontSize: 14
  },
  arrow: {
    width: 7,
    height: 13,
    marginLeft: 10,
    tintColor: '#333'
  },
  greyLine: {
    backgroundColor: '#fafafa',
    height: 11,
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1 / PixelRatio.get()
  },
  backItem: {
    // backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 12
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb'
  },
  backTitle: {
    height: 30,
    justifyContent: 'center'
  },
  skuHead: {
    paddingTop: 12,
    paddingLeft: 10,
    paddingRight: 10,
    // backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemCount: {
    maxWidth: screenWidth - 60
  },
  itemCount1: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  remarks: {
    paddingVertical: 10,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 8,
    marginHorizontal: 12,
    backgroundColor: '#fff'
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb'
  },
  itemTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingVertical: 8,
    alignItems: 'center'
  },
  textGray: {
    color: '#333'
  },

  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    flex: 1
  },
  middleLeft: {
    flexDirection: 'row',
    flex: 1
  },
  skuName: {
    fontSize: 12,
    flex: 1
  },
  specDetails: {
    fontSize: 12,
    color: '#999'
  },
  middleRight: {
    justifyContent: 'flex-end',
    paddingRight: 12
  },
  middlePrice: {
    color: 'rgba(255, 102, 0, 1)',
    fontSize: 12
  },
  number: {
    color: '#333',
    fontSize: 12
  },
  img: {
    width: 80,
    height: 80,
    marginRight: 12,
    borderRadius: 6
  },
  middleDetail: {
    flex: 1
  },
  swellPrice: {
    fontWeight: '500',
    fontSize: 12,
    marginTop: -12
  },
  tailStartTime: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.4)',
    marginTop: -12
  },
  integralBox: {
    backgroundColor: '#fff',
    marginHorizontal: -14,
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
  icon: {
    width: 5,
    height: 13,
    marginRight: 2,
    marginLeft:4,
    tintColor: '#000'
  },
  grey: {
    fontSize: 14,
    color: '#333'
  },
  imgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  img1: {
    width: 55,
    height: 55,
    marginRight: 10
  },
  lineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemContainer: {
    // borderTopWidth: 1 / PixelRatio.get(),
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderColor: '#ebebeb'
    // flex: 1
    paddingTop: 20,
    paddingHorizontal: 12,

  },
});
