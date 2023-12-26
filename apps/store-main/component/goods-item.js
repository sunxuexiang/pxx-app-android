import React from 'react';
import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { msg } from 'plume2';

import WMImage from 'wmkit/image/index';
import * as _ from 'wmkit/common/util';

import MarketingLabel from 'wmkit/biz/marketing-label';
import GoodsNum from 'wmkit/biz/goods-num';

import { mainColor } from 'wmkit/styles/index';
import { fromJS } from 'immutable';
import Price from 'wmkit/price';
import moment from 'moment';
export default class GoodsItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      goodsItem,
      // 是否是分销员
      isDistributor,
      iepInfo,
      iepSwitch,
      appointmentSaleVOList,
      bookingSaleVOList
    } = this.props;

    // skuId
    const id = goodsItem.get('id');
    // sku信息
    const goodsInfo = goodsItem.get('goodsInfo');
    const labels = (goodsInfo.get('marketingLabels') || fromJS([])).toJS();
    const couponLabels = (goodsInfo.get('couponLabels') || fromJS([])).toJS();
    const grouponLabel = (goodsInfo.get('grouponLabel') || fromJS([])).toJS();
    const stock = goodsInfo.get('stock');
    // 商品是否要设置成无效状态
    // 起订量
    const count = goodsInfo.get('count') || 0;
    // 库存等于0或者起订量大于剩余库存
    const invalid = stock <= 0 || (count > 0 && count > stock);
    const buyCount = invalid ? 0 : goodsInfo.get('buyCount') || 0;
    // 会员价
    const salePrice = goodsInfo.get('salePrice') || 0;
    // 最低的区间价
    const intervalMinPrice = goodsInfo.get('intervalMinPrice') || 0;

    // 社交电商相关内容显示与否
    const social = goodsInfo.get('distributionGoodsAudit') == 2 ? true : false;
    //禁用分享赚
    const socialDisabled = false;


    // iep属性
    const { iepInfo: info = {} } = iepInfo.toJS();
    // 企业价格名称
    const { enterprisePriceName } = info;
    const iepShowFlag = iepSwitch && !invalid && !social && goodsInfo.get('enterPriseAuditStatus') == 2;
    // 企业价
    const iepGoodsPrice = goodsInfo.get('enterPrisePrice');

    //秒杀
    let isFlashFlag = false;
    if (labels != null && labels.length > 0) {
      isFlashFlag =
      labels.filter((val) => val.marketingType === 5).length > 0;
    }

    //积分价商品
    let buyPoint = goodsInfo.get('buyPoint');

    // 商品展示价格
    let price = buyPoint
      ? goodsInfo.get('salePrice')
      : social
        ? goodsInfo.get('marketPrice')
        : iepShowFlag
          ? iepGoodsPrice
          : goodsInfo.get('priceType') == 1
            ? goodsInfo.get('intervalMinPrice')
            : goodsInfo.get('salePrice');

    //预约
    let isAppointmentSale = false;
    let appointmentItem = [];
    //预售
    let isBookingSale = false;
    // 是否是全款预售
    let isAllMoneySale = false;

    // 非积分商品
    if (!buyPoint) {
      appointmentSaleVOList &&
      appointmentSaleVOList.length > 0 &&
        appointmentSaleVOList.map((item) => {
          if (goodsInfo.get('goodsInfoId') == item.appointmentSaleGood.goodsInfoId) {
            price = item.appointmentSaleGood.price
              ? item.appointmentSaleGood.price
              : goodsInfo.get('marketPrice');
            isAppointmentSale = true;
            appointmentItem = item;
          }
        });

      bookingSaleVOList &&
      bookingSaleVOList.length > 0 &&
        bookingSaleVOList.map((item) => {
          if (goodsInfo.get('goodsInfoId') == item.bookingSaleGoods.goodsInfoId) {
            isBookingSale = this.isPresaleStatus(item) === '预售中';
            isAllMoneySale = item.bookingType == 1 ? false : true;
            // 全款预售
            if (isBookingSale) {
              price =
                item.bookingSaleGoods.bookingPrice ||
                  item.bookingSaleGoods.bookingPrice == 0
                  ? _.toFixed2(item.bookingSaleGoods.bookingPrice)
                  : _.toFixed2(goodsInfo.get('marketPrice'));
            }
          }
        });
    }

    // 商品划线价
    // 会员价生效时，已登录情况下，商品详情页、规格弹窗会员价划市场价展示
    // 拼团、秒杀、预约、全款预售活动生效时，已登录+未登录情况下，商品详情页、规格弹窗划线价按照需求展示
    let linePrice =
      isAppointmentSale || isAllMoneySale || isFlashFlag
        ? goodsInfo.get('marketPrice')
        : 0;

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.item}
        onPress={() =>
          msg.emit('router: goToNext', {
            routeName: 'GoodsDetail',
            skuId: id
          })
        }
      >
        <View style={styles.imgBox}>
          <View style={styles.imgContent}>
            <WMImage style={styles.img} src={goodsInfo.get('goodsInfoImg')} />
            {invalid && (
              <View style={styles.notGoods}>
                <View style={styles.whiteBox}>
                  <Text style={styles.notGoodsText} allowFontScaling={false}>
                    缺货
                  </Text>
                </View>
              </View>
            )}
          </View>
          {/* 预约 */}
          {appointmentSaleVOList &&
            !buyPoint &&
            appointmentSaleVOList.length > 0 &&
            appointmentSaleVOList.map((k) => {
              if (id == k.appointmentSaleGood.goodsInfoId) {
                return (
                  <View style={styles.perBuy} key={k}>
                    <Text style={styles.perBuyStatus}>
                      {this.isBuyStatus(k)}
                    </Text>
                  </View>
                );
              }
            })}
          {/* 预售 */}
          {bookingSaleVOList &&
            !buyPoint &&
            bookingSaleVOList.length > 0 &&
            bookingSaleVOList.map((k) => {
              if (
                id == k.bookingSaleGoods.goodsInfoId &&
                this.isPresaleStatus(k) == '预售中'
              ) {
                return (
                  <View style={styles.perBuy} key={k}>
                    <Text style={styles.perBuyStatus}>
                      {this.isPresaleStatus(k)}
                    </Text>
                  </View>
                );
              }
            })}
        </View>

        <View style={styles.content}>
          <Text
            style={[styles.title, invalid && { color: '#bcbcbc' }]}
            allowFontSacling={false}
            numberOfLines={2}
          >
            {goodsInfo.get('goodsInfoName')}
          </Text>
          <Text
            style={[styles.gec, invalid && { color: '#bcbcbc' }]}
            allowFontSacling={false}
            numberOfLines={1}
          >
            {goodsInfo.get('specText')}
          </Text>
          {this._saleInfo(goodsInfo)}
          <View style={styles.tagCon}>
            {(labels || couponLabels || grouponLabel) && (
              <MarketingLabel
                marketingLabels={labels}
                couponLabels={couponLabels}
                grouponLabel={grouponLabel}
                noneStock={invalid}
                isSocial={social}
              />
            )}
          </View>
          <View style={styles.row}>
            <View style={styles.tagCon}>
            <Price
                price={price}
                buyPoint={goodsInfo.buyPoint}
                linePrice={linePrice}
              />
              {social &&
                isDistributor && (
                  <Text
                    style={[styles.commission, invalid && { color: '#bcbcbc' }]}
                    allowFontScaling={false}
                  >
                    &nbsp;/&nbsp;赚
                    {_.addZero(goodsInfo.get('distributionCommission'))}
                  </Text>
                )}
              {iepShowFlag &&
                <View style={[styles.iepBoard, { backgroundColor: mainColor }]}>
                  <Text allowFontScaling={false} style={[styles.iepText, { backgroundColor: mainColor }]}>
                    {enterprisePriceName}
                  </Text>
                </View>}
            </View>
            {social && isDistributor ? (
              !invalid && (
                <View style={styles.socialBtn}>
                  <TouchableOpacity
                    style={[styles.btnBox1, { borderColor: mainColor }]}
                    activeOpacity={0.8}
                    onPress={() =>
                      msg.emit('router: goToNext', {
                        routeName: 'GraphicMaterial',
                        goodsInfoId: goodsInfo.get('goodsInfoId')
                      })
                    }
                  >
                    <Text style={[styles.btnText1, { color: mainColor }]}>发圈素材</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.btnBox2,
                      { backgroundColor: mainColor },
                      socialDisabled && styles.btnBoxDisabled
                    ]}
                    activeOpacity={0.8}
                    onPress={() => {
                      this.props.changeShowShare();
                      this.props.saveCheckedSku(goodsItem.get('goodsInfo'));
                    }}
                  >
                    <Text style={styles.btnText2}>分享赚</Text>
                  </TouchableOpacity>
                </View>
              )
            ) : (
                <GoodsNum
                  goodsInfoId={id}
                  value={buyCount}
                  max={stock}
                  disableNumberInput={invalid}
                />
              )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _saleInfo = (goodsInfo) => {
    const { isShow } = this.props;
    // sku信息
    //好评率
    let favorableRate = '100';
    if (
      goodsInfo.get('goodsEvaluateNum') &&
      goodsInfo.get('goodsEvaluateNum') != 0
    ) {
      favorableRate = _.mul(
        _.div(
          goodsInfo.get('goodsFavorableCommentNum'),
          goodsInfo.get('goodsEvaluateNum')
        ),
        100
      ).toFixed(0);
    }

    //评论数
    let evaluateNum = '暂无';
    const goodsEvaluateNum = goodsInfo.get('goodsEvaluateNum');
    if (goodsEvaluateNum) {
      if (goodsEvaluateNum < 10000) {
        evaluateNum = goodsEvaluateNum;
      } else {
        const i = _.div(goodsEvaluateNum, 10000).toFixed(1);
        evaluateNum = i + '万+';
      }
    }

    //销量
    let salesNum = '暂无';
    const goodsSalesNum = goodsInfo.get('goodsSalesNum');
    if (goodsSalesNum) {
      if (goodsSalesNum < 10000) {
        salesNum = goodsSalesNum;
      } else {
        const i = _.div(goodsSalesNum, 10000).toFixed(1);
        salesNum = i + '万+';
      }
    }

    return isShow ? (
      <View style={styles.assseTag}>
        <Text style={[styles.assseText, { paddingLeft: 0 }]}>
          {salesNum}
          销量
        </Text>
        <Text style={[styles.assseText, { paddingLeft: 20 }]}>
          {evaluateNum}
          评价
        </Text>
        <Text style={[styles.assseText, { paddingLeft: 20 }]}>
          {favorableRate}
          %好评
        </Text>
      </View>
    ) : (
        <View style={styles.assseTag}>
          <Text style={[styles.assseText, { paddingLeft: 0 }]}>
            {salesNum}
          销量
        </Text>
        </View>
      );
  };

  //判断当前的预约状态
  isBuyStatus = (status) => {
    let appointmentStartTime = status.appointmentStartTime;
    let appointmentEndTime = status.appointmentEndTime;
    let snapUpStartTime = status.snapUpStartTime;
    let snapUpEndTime = status.snapUpEndTime;
    //如果预约开始时间在当前时间之前则代表预约中
    let isAppointmentStart = moment(appointmentStartTime).isBefore(new Date());
    let isAppointmentEnd = moment(new Date()).isBefore(appointmentEndTime);

    let isSnapUpStartTime = moment(snapUpStartTime).isBefore(new Date());
    let isSnapUpEndTime = moment(new Date()).isBefore(snapUpEndTime);

    if (isAppointmentStart && isAppointmentEnd) return '预约中';
    if (!isAppointmentEnd && !isSnapUpStartTime) return '预约结束';
    if (isSnapUpStartTime && isSnapUpEndTime) return '抢购中';
    if (!isAppointmentEnd && !isSnapUpStartTime) return '预约结束';
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

    if (isBetween) return '预售中';
  };
}

const styles = StyleSheet.create({
  lack: {
    width: 35,
    height: 15,
    marginLeft: 5,
    backgroundColor: '#cccccc',
    borderRadius: 7.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  lackText: {
    fontSize: 10,
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  title: {
    color: '#000',
    fontSize: 14,
    //height: 32,
    lineHeight: 16,
    marginBottom: 5
  },
  gec: {
    color: '#333',
    fontSize: 13,
    marginBottom: 5,
    lineHeight: 15
  },
  img: {
    width: 100,
    height: 100
  },
  item: {
    padding: 10,
    paddingBottom: 0,
    paddingRight: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'flex-start',
    minHeight: 100,
    paddingBottom: 8,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  tagCon: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    marginTop: 2,
    marginBottom: 2
  },
  commission: {
    marginLeft: 3,
    color: '#333',
    fontSize: 12
  },
  socialBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  btnBox1: {
    height: 23,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11.5,
    backgroundColor: '#fff',
    borderWidth: 1
  },
  btnText1: {
    fontSize: 10
  },
  btnBox2: {
    marginLeft: 5,
    height: 23,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11.5
  },
  btnBoxDisabled: {
    backgroundColor: '#ddd'
  },
  btnText2: {
    color: '#fff',
    fontSize: 10
  },
  goodsEvaluate: {
    overflow: 'hidden',
    marginBottom: 4,
    marginRight: -50,
    flexDirection: 'row'
  },
  goodsEvaluateTxt: {
    fontSize: 12,
    color: '#999',
    paddingRight: 5
  },
  assseTag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 2,
    paddingBottom: 2
  },
  assseText: {
    color: '#999999',
    fontSize: 12
  },
  iepText: {
    fontSize: 10,
    color: '#ffffff'
  },
  iepBoard: {
    height: 15,
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  perBuy: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 24,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#ff8400',
    justifyContent: 'center',
    alignItems: 'center'
  },
  perBuyStatus: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center'
  }
});
