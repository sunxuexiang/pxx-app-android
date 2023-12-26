import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { msg, Relax } from 'plume2';

import { mainColor, screenWidth } from 'wmkit/styles/index';
import * as Button from 'wmkit/button';
import { noop } from 'wmkit/noop';
import * as WMkit from 'wmkit/kit';
import * as _ from '../../../wmkit/common/util'; // added by scx
import moment from 'moment';
import CountDown from './count-down';
import LinearGradient from 'react-native-linear-gradient';
const SubmitButton = Button.Submit;

@Relax
export default class GoodsBottom extends Component {
  static relaxProps = {
    purchaseCount: 'purchaseCount',
    store: 'store',
    serviceFlag: 'serviceFlag',
    goods: 'goods',
    updatePurchaseCount: noop,
    changeWholesaleVisible: noop,
    changeRetailSaleVisible: noop,
    goodsInfo: 'goodsInfo',
    isDistributor: 'isDistributor',
    pointsGoodsId: 'pointsGoodsId',
    changePointsExchangeVisible: noop,
    rushToBuyingFlashSaleGoodsInfo: noop,
    appointmentSaleVO: 'appointmentSaleVO',
    serverTime: 'serverTime',
    subscriptionFlag: 'subscriptionFlag',
    changeCurrentPreBuyStatus: noop,
    queryPreBuyTime: noop,
    bookingSaleVO: 'bookingSaleVO'
  };

  UNSAFE_componentWillMount() {
    // 商品详情中购物车数量角标更新方法
    msg.on('purchaseNum:refresh', this.props.relaxProps.updatePurchaseCount);
  }

  componentWillUnmount() {
    msg.off('purchaseNum:refresh', this.props.relaxProps.updatePurchaseCount);
  }

  render() {
    let {
      purchaseCount,
      store,
      serviceFlag,
      goodsInfo,
      pointsGoodsId,
      changePointsExchangeVisible,
      rushToBuyingFlashSaleGoodsInfo,
      goods,
      appointmentSaleVO,
      subscriptionFlag,
      serverTime,
      changeCurrentPreBuyStatus,
      queryPreBuyTime,
      bookingSaleVO
    } = this.props.relaxProps;
    // 社交电商相关内容显示与否
    const social = WMkit.isDistributor();
    appointmentSaleVO = appointmentSaleVO.toJS();
    bookingSaleVO = bookingSaleVO.toJS();
    const buyPoint = goodsInfo.get('buyPoint');
    return (
      <View style={styles.detailBottom}>
        <View style={styles.bottomBar}>
          {serviceFlag && (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.barItem}
              onPress={() => {
                msg.emit('router: goToNext', {
                  routeName: 'SobotLink',
                  hasBottom: true
                });
              }}
            >
              <Image
                style={styles.img}
                source={require('../img/service.png')}
              />
              <Text allowFontScaling={false} style={styles.barItemText}>
                客服
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            activeOpacity={1}
            style={styles.barItem}
            onPress={() => msg.emit('router: goToNext', { routeName: 'PurchaseOrder' })}
          >
            <View>
              {purchaseCount ? (
                <View style={[styles.numTip, { backgroundColor: mainColor }]}>
                  <Text allowFontScaling={false} style={styles.numTipText}>
                    {purchaseCount}
                  </Text>
                </View>
              ) : null}
              <Image style={styles.img} source={require('../img/cart.png')} />
            </View>
            <Text allowFontScaling={false} style={styles.barItemText}>
              购物车
            </Text>
          </TouchableOpacity>
        </View>
          {pointsGoodsId ? (
            <View style={styles.btnBox}>
              <SubmitButton
                key={pointsGoodsId}
                disabled={false}
                text="立即兑换"
                aotuFixed={true}
                boxStyle={{ marginRight: 4 }}
                colors={[mainColor, mainColor]}
                isLinear={true}
                onClick={() => {
                  changePointsExchangeVisible(true);
                }}
              />
            </View>
          ) : appointmentSaleVO && JSON.stringify(appointmentSaleVO) != '{}' && !buyPoint ? (
            this.isBuyStatus(appointmentSaleVO) == '抢购中' ? (
              <View style={styles.btnBox}>
                <SubmitButton
                  key={'singleBtn'}
                  disabled={false}
                  text="立即抢购"
                  aotuFixed={true}
                  boxStyle={{ marginRight: 4 }}
                  colors={[mainColor, mainColor]}
                  isLinear={true}
                  onClick={() => {
                    this._addPurchase(true);
                  }}
                />
              </View>
            ) : this.isBuyStatus(appointmentSaleVO) == '预约中' ? (
              !subscriptionFlag ? (
                <View style={styles.btnBox}>
                  <SubmitButton
                    key={'singleBtn'}
                    disabled={false}
                    text="立即预约"
                    aotuFixed={true}
                    boxStyle={{ marginRight: 4 }}
                    colors={[mainColor, mainColor]}
                    isLinear={true}
                    onClick={() => {
                      this._addPurchase(true);
                      changeCurrentPreBuyStatus(0);
                    }}
                  />
                </View>
              ) : (
                <View style={styles.btnBox}>
                  <SubmitButton
                    key={'singleBtnPre'}
                    disabled={false}
                    text="已预约"
                    aotuFixed={true}
                    boxStyle={{ marginRight: 4 }}
                    colors={['#E6E6E6', '#CCCCCC']}
                    isLinear={true}
                  />
                </View>
              )
            ) : (
              <View style={styles.btnBox}>
                <LinearGradient style={styles.btnItem}
                  colors={['#E6E6E6', '#CCCCCC']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}>
                  <View>
                    {!moment(appointmentSaleVO.snapUpStartTime).isSameOrBefore(
                      new Date()
                    ) && (
                      <CountDown
                        allowFontScaling={false}
                        numberOfLines={1}
                        groupFlag={false}
                        prelistFlag={true}
                        showTimeDays={true}
                        endHandle={() => {
                          queryPreBuyTime(goodsInfo.goodsInfoId);
                        }}
                        timeOffset={moment
                          .duration(
                            moment(appointmentSaleVO.snapUpStartTime).diff(
                              serverTime
                            )
                          )
                          .asSeconds()
                          .toFixed(0)}
                      />
                    )}
                  </View>
                  <Text style={styles.buyText}>后开抢</Text>
                </LinearGradient>
              </View>
            )
          ) : bookingSaleVO && this.isPresaleStatus(bookingSaleVO)&& !buyPoint ? (
            <View style={styles.btnBox}>
              {bookingSaleVO.bookingType == 0 ? (
                <SubmitButton
                  text="全款预定"
                  key={'fullPaymentButton'}
                  aotuFixed={true}
                  boxStyle={{ marginRight: 4 }}
                  colors={[mainColor, mainColor]}
                  isLinear={true}
                  onClick={() => this._addPurchase(true)}
                />
              ) : (
                <SubmitButton
                  text="支付定金"
                  key={'fullPaymentButton'}
                  aotuFixed={true}
                  boxStyle={{ marginRight: 4 }}
                  colors={[mainColor, mainColor]}
                  isLinear={true}
                  onClick={() => this._addPurchase(true)}
                />
              )}
            </View>
          ) : this.props.flashsaleGoodsFlag ? (
            <View style={styles.btnBox}>
              {this.props.stockEnough ?
              <SubmitButton
                // disabled={!this.props.stockEnough}
                text="立即抢购"
                key={'flashSaleButton'}
                aotuFixed={true}
                boxStyle={{ marginRight: 4 }}
                colors={[mainColor, mainColor]}
                isLinear={true}
                onClick={() => {
                  // rushToBuyingFlashSaleGoodsInfo(
                  //   this.props.flashsaleGoods.get('id'),
                  //   this.props.flashsaleGoods.get('minNum')
                  // );
                  this._addPurchase(true)
                }}
              /> :
              <SubmitButton
                  key={'addToShopCart'}
                  disabled={false}
                  text="到货通知"
                  aotuFixed={true}
                  boxStyle={{ marginRight: 4 }}
                  colors={[mainColor, mainColor]}
                  isLinear={true}
                  onClick={() => this._addPurchase(false)}
                />}
            </View>
          ) : !pointsGoodsId
              && social
              && goodsInfo.get('distributionGoodsAudit') == '2'
              && goods.get('goodsBuyTypes')
              && goods.get('goodsBuyTypes').indexOf('0') > -1 ? (
            <View style={styles.btnBox}>
              <SubmitButton
                disabled={false}
                text="加入购物车"
                onClick={() => this._addPurchase(false)}
                aotuFixed={true}
                boxStyle={{ marginRight: 4 }}
                colors={[mainColor, mainColor]}
                isLinear={true}
              />

              {(goods.get('singleSpecFlag') ||
                (!goods.get('singleSpecFlag') &&
                  goods.get('saleType') === 1)) && goods.get('goodsBuyTypes') &&
                goods.get('goodsBuyTypes').indexOf('1') > -1 && (
                  <SubmitButton
                    key="pay"
                    disabled={false}
                    text="立即购买"
                    aotuFixed={true}
                    boxStyle={{ marginRight: 4 }}
                    colors={[mainColor, mainColor]}
                    isLinear={true}
                    onClick={() => this._addPurchase(true)}
                  />
                )}
            </View>
          ) : (
            <View style={styles.btnBox}>

              {this.props.stockEnough?(
                <SubmitButton
                  key={'addToShopCart'}
                  disabled={false}
                  text="加入购物车"
                  aotuFixed={true}
                  boxStyle={{ marginRight: 4 }}
                  colors={[mainColor, mainColor]}
                  isLinear={true}
                  onClick={() => this._addPurchase(false)}
                />
              ):this.props.specialGoodsFlag?(
                <View style={styles.btnBox}>
                  <SubmitButton
                    key={'addToShopCart'}
                    disabled={true}
                    text="加入购物车"
                    aotuFixed={true}
                    boxStyle={{ marginRight: 4 }}
                    colors={[mainColor, mainColor]}
                  />
                  <SubmitButton
                    key="pay"
                    disabled={true}
                    text="立即购买"
                    aotuFixed={true}
                    boxStyle={{ marginRight: 4 }}
                    colors={[mainColor, mainColor]}
                  />
                </View>
              ):(
                <SubmitButton
                  key={'addToShopCart'}
                  disabled={false}
                  text="到货通知"
                  aotuFixed={true}
                  boxStyle={{ marginRight: 4 }}
                  colors={[mainColor, mainColor]}
                  isLinear={true}
                  onClick={() => this._addPurchase(false)}
                />
              )
              }
              {this.props.stockEnough&&(
                <SubmitButton
                  key="pay"
                  disabled={false}
                  text="立即购买"
                  aotuFixed={true}
                  boxStyle={{ marginRight: 4 }}
                  colors={[mainColor, mainColor]}
                  isLinear={true}
                  onClick={() => this._addPurchase(true)}
                />
                )}
            </View>
          )}
      </View>
    );
  }

  //加入购物车
  _addPurchase = (type) => {
    const { goods,goodsInfo } = this.props.relaxProps;
    // if (!WMkit.isLoginOrNotOpen()) {
    //   msg.emit('loginModal:toggleVisible', {
    //     callBack: () => {
    //       msg.emit('router: replace', {
    //         routeName: 'GoodsDetail',
    //         skuId: goodsInfo.get('goodsInfoId')
    //       });
    //     }
    //   });
    // } else {
      //弹出规格框
      if (goods.get('saleType') == 0) {
        this.props.relaxProps.changeWholesaleVisible(true, type);
      } else {
        this.props.relaxProps.changeRetailSaleVisible(true, type);
      }
    // }
  };

  //判断当前的预约状态
  isBuyStatus = (status) => {
    let appointmentStartTime = status.appointmentStartTime;
    let appointmentEndTime = status.appointmentEndTime;
    let snapUpStartTime = status.snapUpStartTime;
    let snapUpEndTime = status.snapUpEndTime;

    let isAppointmentStart = moment(appointmentStartTime).isBefore(new Date());
    let isAppointmentEnd = moment(new Date()).isBefore(appointmentEndTime);

    let isSnapUpStartTime = moment(snapUpStartTime).isBefore(new Date());
    let isSnapUpEndTime = moment(new Date()).isBefore(snapUpEndTime);

    if (isAppointmentStart && isAppointmentEnd) return '预约中';
    if (!isAppointmentEnd && !isSnapUpStartTime) return '预约结束';
    if (isSnapUpStartTime && isSnapUpEndTime) return '抢购中';
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
  detailBottom: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: '#ebebeb',
    borderStyle: 'solid',
    backgroundColor: '#fff',
    width: screenWidth,
    paddingRight: 8,
    position: 'absolute',
    left: 0,
    ..._.ifIphoneX(
      {
        height: 90,
        paddingBottom: 34
      },
      {
        height: 56
      }
    ),
    zIndex: 999
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  barItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16
  },
  img: {
    width: 16,
    height: 16,
    tintColor: '#000',
    marginBottom: 4
  },
  barItemText: {
    color: 'rgba(0,0,0,0.4)',
    textAlign: 'center',
    fontSize: 10
  },
  numTip: {
    position: 'absolute',
    top: -5,
    right: -8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 12,
    height: 12,
    borderRadius: 50,
    zIndex: 999
  },
  numTipText: {
    color: '#fff',
    fontSize: 8,
    backgroundColor: 'transparent',
    paddingHorizontal:1
  },
  btnBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth * 0.597
  },
  btnItem: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    height: 36
  },
  singleBtn: {
    ..._.ifIphoneX(
      {
        height: 48
        // paddingBottom: 35
      },
      {
        height: 48
      }
    ),
    backgroundColor: 'rgba(255, 136, 0, 1)',
    width: 191,
    justifyContent: 'center',
    alignItems: 'center'
  },
  singleBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  singleBtnPreText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
  },
  buyText: {
    fontSize: 14,
    position: 'relative',
    color: '#fff'
  }
});
