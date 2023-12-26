import React, { Component } from 'react';
import { Relax, msg } from 'plume2';
import { View, StyleSheet, Image, TouchableOpacity, Text, Animated } from 'react-native';

import * as WMkit from 'wmkit/kit';
import { noop } from 'wmkit/noop';
import * as _ from '../../../wmkit/common/util'; // added by scx
import {screenWidth, isAndroid, mainColor} from 'wmkit/styles/index';

import GoodsShareButton from './goods-share-button';
import GoodsNav from './goods-nav';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment/moment';

@Relax
export default class GoodsTopButton extends Component {
  state = {
    stickyLayoutY: 1
  };
  static defaultProps = {
    stickyImgY: -1,
    stickyScrollY: new Animated.Value(0)
  };

  static relaxProps = {
    // video显示时隐藏顶部按钮
    showVideo: 'showVideo',
    isDistributor: 'isDistributor',
    goodsInfo: 'goodsInfo',
    pointsGoodsId: 'pointsGoodsId',
    menuList: 'menuList',
    changeShareModal: noop
  };

  render() {
    const {
      showVideo,
      isDistributor,
      goodsInfo,
      pointsGoodsId,
      menuList,
      changeShareModal,
      iepDetail
    } = this.props.relaxProps;

    const { flashsaleGoodsFlag } = this.props;

    // 积分价商品
    const buyPoint = goodsInfo.get('buyPoint');
    // 是否是分销商品
    const social = goodsInfo.get('distributionGoodsAudit') == '2';

    // 企业购处理
    let iepSwitch = false;
    if (iepDetail) {
      // iep属性
      iepSwitch = iepDetail.toJS().isIepAuth;
    }
    //企业购商品的判断
    const iepGoodsShowFlag =
      iepSwitch &&
      goodsInfo.get('enterPriseAuditState') == 2 &&
      !flashsaleGoodsFlag;

    //预约
    let isAppointmentSale = false;
    //预售
    let isBookingSale = false;

    const appointmentSale = goodsInfo.get('appointmentSaleVO');
    const bookingSale = goodsInfo.get('bookingSaleVO');
    // 非积分价商品
    if (!buyPoint) {
      isAppointmentSale =
        appointmentSale && appointmentSale.get('appointmentSaleGood')
          ? true
          : false;
      isBookingSale =
        bookingSale && this.isPresaleStatus(bookingSale.toJS()) ? true : false;
    }

    const { stickyScrollY } = this.props;
    let y = screenWidth;

    const opacity = stickyScrollY.interpolate({
      inputRange: [-1, 0, y - 300],
      outputRange: [1, 1, 0]
    });

    const translateY = stickyScrollY.interpolate({
      inputRange: [-1, y - 280, y - 279],
      outputRange: [0, 0, -120]
    });

    return (
      !showVideo && (
        <Animated.View
          style={[
            styles.container,
            { opacity: opacity, transform: [{ translateY: translateY }] }
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => msg.emit('router: back')}
          >
            <Image
              style={{ width: 23, height: 23 }}
              source={require('../img/back.png')}
            />
          </TouchableOpacity>
          <View style={styles.rowFlex}>
            <GoodsShareButton />
            {isDistributor && social && !buyPoint
              ? !isAppointmentSale &&
                !isBookingSale &&
                !iepGoodsShowFlag && (
                  <View style={styles.rowFlex}>
                    {!pointsGoodsId &&
                      !this.props.flashsaleGoodsFlag &&
                      isDistributor &&
                      goodsInfo.get('distributionGoodsAudit') == '2' && (
                        <View style={{ flexDirection: 'row' }}>
                          <LinearGradient
                            colors={[mainColor, mainColor]}
                            style={styles.btnBox}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                          >
                            <TouchableOpacity
                              activeOpacity={0.8}
                              onPress={() =>
                                msg.emit('router: goToNext', {
                                  routeName: 'GraphicMaterial',
                                  goodsInfoId: goodsInfo.get('goodsInfoId')
                                })
                              }
                            >
                              <Text
                                style={styles.btnText}
                                allowFontScaling={false}
                              >
                                发圈素材
                              </Text>
                            </TouchableOpacity>
                          </LinearGradient>
                          <LinearGradient
                            colors={[mainColor, mainColor]}
                            style={styles.btnBox}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                          >
                            <TouchableOpacity
                              activeOpacity={0.8}
                              onPress={() => changeShareModal()}
                            >
                              <Text
                                style={styles.btnText}
                                allowFontScaling={false}
                              >
                                分享赚
                                {_.addZero(
                                  goodsInfo.get('distributionCommission')
                                )}
                              </Text>
                            </TouchableOpacity>
                          </LinearGradient>
                        </View>
                      )}
                  </View>
                )
              : null}
            {menuList.length > 0 && <GoodsNav />}
          </View>
        </Animated.View>
      )
    );
  }

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
  container: {
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    position: 'absolute',
    ..._.ifIphoneX(
      {
        top: 40
      },
      {
        top: isAndroid ? 5 : 30
      }
    ),
    left: 0,
    zIndex: 99,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnBox: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    height: 23,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11.5,
    marginRight: 10
  },
  btnText: {
    color: '#fff',
    fontSize: 14
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
