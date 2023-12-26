import React from 'react';
import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { msg } from 'plume2';
import * as _ from 'wmkit/common/util';
import WMImage from 'wmkit/image/index';
import AddCart from 'wmkit/add-cart';
import Price from 'wmkit/price';
import SelfSalesLabel from 'wmkit/biz/selfsales-label';
import MarketingLabel from 'wmkit/biz/marketing-label';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import { screenWidth, mainColor } from 'wmkit/styles/index';
import * as WMkit from 'wmkit/kit';

/**
 * Spu列表的item
 */
export default class SpuItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { listView } = this.props;
    return listView ? this.small() : this.big();
  }

  /**
   * 小图商品
   * @returns {XML}
   */
  small = () => {
    const {
      goods,
      spuAddCartFunc,
      sortFlag,
      // 是否是分销员
      isDistributor,
      iepInfo
    } = this.props;
    // spuId
    const id = goods.get('id');
    // spu下最低价格sku(价格倒序时取最高价，其他最低价)
    let goodsInfo = null;
    if (sortFlag === 2) {
      goodsInfo = goods
        .get('goodsInfos')
        .toJS()
        .sort((a, b) => {
          if (a.marketPrice < b.marketPrice) {
            return -1;
          }
          if (a.marketPrice > b.marketPrice) {
            return 1;
          }
          if (a.marketPrice === b.marketPrice) {
            return 0;
          }
        })
        .pop();
    } else {
      goodsInfo = goods
        .get('goodsInfos')
        .toJS()
        .sort((a, b) => {
          if (a.marketPrice < b.marketPrice) {
            return -1;
          }
          if (a.marketPrice > b.marketPrice) {
            return 1;
          }
          if (a.marketPrice === b.marketPrice) {
            return 0;
          }
        })
        .shift();
    }

    // 商品是否要设置成无效状态(spu下所有sku的库存等于0 或者 起订量大于剩余库存)
    const noneStock = goods.get('goodsInfos').every((sku) => {
      const stock = sku.get('stock'); // 库存
      const count = sku.get('count') || 0; // 起订量
      return stock <= 0 || (count > 0 && count > stock);
    });

    // 营销标签
    const marketingLabels = goodsInfo.marketingLabels;
    // 优惠券标签
    const couponLabels = goodsInfo.couponLabels;
    // 拼团标签
    const grouponLabel = goodsInfo.grouponLabel;
    //秒杀
    let isFlashFlag = false;
    if (marketingLabels != null && marketingLabels.length > 0) {
      isFlashFlag =
        marketingLabels.filter((val) => val.marketingType === 5).length > 0;
    }

    // 会员价
    const salePrice = goodsInfo.salePrice || 0;
    // 最低的区间价
    const intervalMinPrice = goodsInfo.intervalMinPrice || 0;

    // 社交电商相关内容显示与否
    const social = goodsInfo.distributionGoodsAudit == 2 ? true : false;

    //禁用分享赚
    const socialDisabled = false;

    // iep属性
    const { isIepAuth: iepSwitch, iepInfo: info = {} } = iepInfo.toJS();
    // 企业价格名称
    const { enterprisePriceName } = info;
    // 企业价
    const iepGoodsPrice = goodsInfo.enterPrisePrice;
    // 企业购商品判断
    const iepShowFlag =
      iepSwitch &&
      !noneStock &&
      !social &&
      goodsInfo.enterPriseAuditStatus == 2;
    //积分
    const buyPoint = goodsInfo.buyPoint;
    let price = buyPoint
      ? salePrice
      : social
      ? goodsInfo.marketPrice
      : iepShowFlag
      ? iepGoodsPrice
      : goodsInfo.priceType == 1
      ? intervalMinPrice
      : salePrice;

    //预约列表
    const { appointmentSaleVOList, bookingSaleVOList } = goods
      .get('_otherProps')
      .toJS();

    //预约
    let isAppointmentSale = false;
    //预售
    let isBookingSale = false;
    // 是否是全款预售
    let isAllMoneySale = false;

    // 非积分商品
    if (!buyPoint) {
      appointmentSaleVOList &&
      appointmentSaleVOList.length > 0 &&
        appointmentSaleVOList.map((item) => {
          if (goodsInfo.goodsInfoId == item.appointmentSaleGood.goodsInfoId) {
            price = item.appointmentSaleGood.price
              ? item.appointmentSaleGood.price
              : goodsInfo.marketPrice;
            isAppointmentSale = true;
          }
        });

      bookingSaleVOList &&
      bookingSaleVOList.length > 0 &&
        bookingSaleVOList.map((item) => {
          if (goodsInfo.goodsInfoId == item.bookingSaleGoods.goodsInfoId) {
            isBookingSale = this.isPresaleStatus(item) == '预售中';
            isAllMoneySale = item.bookingType == 1 ? false : true;
            // 全款预售
            if (isBookingSale) {
              price =
                item.bookingSaleGoods.bookingPrice ||
                item.bookingSaleGoods.bookingPrice == 0
                  ? _.toFixed2(item.bookingSaleGoods.bookingPrice)
                  : _.toFixed2(goodsInfo.marketPrice);
            }
          }
        });
    }

    // 商品划线价
    // 会员价生效时，已登录情况下，商品详情页、规格弹窗会员价划市场价展示
    // 拼团、秒杀、预约、全款预售活动生效时，已登录+未登录情况下，商品详情页、规格弹窗划线价按照需求展示
    let linePrice =
      isAppointmentSale || isAllMoneySale || isFlashFlag
        ? goodsInfo.marketPrice
        : 0;

    //是否展示营销活动标签
    let showFlag = true;
    let showMatketingFlag = true;
    if (isAppointmentSale || isBookingSale || buyPoint || isFlashFlag) {
      showFlag = false;
    }
    if(isAppointmentSale || isBookingSale ){
      showMatketingFlag = false;
    }
    console.log('goodsInfo',goodsInfo)
    return (
      <TouchableOpacity
        key={id}
        activeOpacity={0.6}
        style={styles.item}
        onPress={() =>
          msg.emit('router: goToNext', {
            routeName: 'GoodsDetail',
            skuId: goodsInfo.goodsInfoId
          })
        }
      >
        <View style={styles.imgBox}>
          <View style={styles.imgContent}>
            <WMImage style={styles.img} src={goodsInfo.goodsInfoImg} />
            {WMkit.isInvalid(goodsInfo) && (
              <View style={styles.notGoods}>
                <View style={styles.whiteBox}>
                  <Text style={styles.notGoodsText} allowFontScaling={false}>
                    等货中
                  </Text>
                </View>
              </View>
            )}
          </View>
          {appointmentSaleVOList &&
            !buyPoint &&
            appointmentSaleVOList.length > 0 &&
            appointmentSaleVOList.map((k) => {
              if (goodsInfo.goodsInfoId == k.appointmentSaleGood.goodsInfoId) {
                return (
                  <View style={styles.perBuy} key={k.id}>
                    <Text style={styles.perBuyStatus}>
                      {this.isBuyStatus(k)}
                    </Text>
                  </View>
                );
              }
            })}
          {bookingSaleVOList &&
            !buyPoint &&
            bookingSaleVOList.length > 0 &&
            bookingSaleVOList.map((k) => {
              if (
                goodsInfo.goodsInfoId == k.bookingSaleGoods.goodsInfoId &&
                this.isPresaleStatus(k) == '预售中'
              ) {
                return (
                  <View style={styles.perBuy} key={k.id}>
                    <Text style={styles.perBuyStatus}>
                      {this.isPresaleStatus(k)}
                    </Text>
                  </View>
                );
              }
            })}
        </View>

        <View style={styles.content}>
          <View style={styles.selfSales}>
            <View style={styles.label}>
              {goodsInfo.companyType == 0 && <SelfSalesLabel />}
            </View>
            <Text
              style={styles.title}
              allowFontScaling={false}
              numberOfLines={2}
            >
              {goodsInfo.companyType == 0 && (
                <Text style={styles.words}>占位 </Text>
              )}
              {goodsInfo.goodsInfoName}
            </Text>
            <Text style={styles.gec} allowFontScaling={false} numberOfLines={1}>
              {goods.get('goodsSubtitle') || ''}
            </Text>
          </View>

          <View style={styles.tagCon}>
            {(marketingLabels || couponLabels || grouponLabel) && (
              <MarketingLabel
                marketingLabels={showMatketingFlag ? marketingLabels : []}
                couponLabels={couponLabels}
                grouponLabel={showFlag ? grouponLabel : []}
                noneStock={noneStock}
                isFlashFlag={isFlashFlag}
                isSocial={social}
              />
            )}
          </View>

          {/*销量 评价 好评率*/}
          {/* {this._saleInfo('small')} */}

          <View style={styles.row}>
            <View style={styles.tagCon}>
              <Price
                price={price}
                buyPoint={goodsInfo.buyPoint}
                linePrice={linePrice}
              />
              {!buyPoint && iepShowFlag && (
                <View style={styles.iepBoard}>
                  <Text allowFontScaling={false} style={[styles.iepText, { backgroundColor: mainColor }]}>
                    {enterprisePriceName}
                  </Text>
                </View>
              )}
            </View>
            {!isAppointmentSale &&
              !isBookingSale &&
              social && isDistributor && !buyPoint ? (
              !noneStock &&
              !isAppointmentSale &&
              !isBookingSale &&
              !iepShowFlag && (
                <View style={styles.socialBtn}>
                  <TouchableOpacity
                    style={styles.btnBox1}
                    activeOpacity={0.8}
                    onPress={() =>
                      msg.emit('router: goToNext', {
                        routeName: 'GraphicMaterial',
                        goodsInfoId: goodsInfo.goodsInfoId
                      })
                    }
                  >
                    <Text allowFontScaling={false} style={[styles.btnText1, { color: mainColor }]}>
                      发圈
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      this.props.changeShowShare();
                      this.props.saveCheckedSku(goodsInfo);
                    }}
                  >
                    <LinearGradient
                      colors={[mainColor, mainColor]}
                      style={[
                        styles.btnBox2,
                        socialDisabled && styles.btnBoxDisabled
                      ]}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                    >
                      <Text allowFontScaling={false} style={styles.btnText2}>
                        分享赚
                        {_.addZero(goodsInfo.distributionCommission)}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )
            ) : (
              <AddCart
                disableAdd={noneStock}
                skuId={goodsInfo.goodsInfoId}
                spuAddCartFunc={spuAddCartFunc}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  /**
   * 大图商品
   * @param esGoodsItem
   * @returns {XML}
   */
  big = () => {
    const {
      goods,
      spuAddCartFunc,
      // 是否是分销员
      isDistributor,
      sortFlag,
      iepInfo
    } = this.props;

    // spuId
    const id = goods.get('id');
    const goodsLabels = goods.get('goodsLabels').toJS()
    // spu下最低价格sku(价格倒序时取最高价，其他最低价)
    let goodsInfo = null;
    if (sortFlag === 2) {
      goodsInfo = goods
        .get('goodsInfos')
        .toJS()
        .sort((a, b) => {
          if (a.marketPrice < b.marketPrice) {
            return -1;
          }
          if (a.marketPrice > b.marketPrice) {
            return 1;
          }
          if (a.marketPrice === b.marketPrice) {
            return 0;
          }
        })
        .pop();
    } else {
      goodsInfo = goods
        .get('goodsInfos')
        .toJS()
        .sort((a, b) => {
          if (a.marketPrice < b.marketPrice) {
            return -1;
          }
          if (a.marketPrice > b.marketPrice) {
            return 1;
          }
          if (a.marketPrice === b.marketPrice) {
            return 0;
          }
        })
        .shift();
    }

    // 商品是否要设置成无效状态(spu下所有sku的库存等于0 或者 起订量大于剩余库存)
    const noneStock = goods.get('goodsInfos').every((sku) => {
      const stock = sku.get('stock'); // 库存
      const count = sku.get('count') || 0; // 起订量
      return stock <= 0 || (count > 0 && count > stock);
    });
    // 会员价
    const salePrice = goodsInfo.salePrice || 0;
    // 最低的区间价
    const intervalMinPrice = goodsInfo.intervalMinPrice || 0;
    // 营销标签
    const marketingLabels = goodsInfo.marketingLabels;
    // 优惠券标签
    const couponLabels = goodsInfo.couponLabels;
    // 拼团标签
    const grouponLabel = goodsInfo.grouponLabel;
    //秒杀
    let isFlashFlag = false;
    if (marketingLabels != null && marketingLabels.length > 0) {
      isFlashFlag =
        marketingLabels.filter((val) => val.marketingType === 5).length > 0;
    }

    // 社交电商相关内容显示与否
    const social = goodsInfo.distributionGoodsAudit == 2 ? true : false;

    const marketPrice = goodsInfo.marketPrice;

    // 企业价
    const iepGoodsPrice = goodsInfo.enterPrisePrice;
    // iep属性
    const { isIepAuth: iepSwitch, iepInfo: info = {} } = iepInfo.toJS();
    // 企业价格名称
    const { enterprisePriceName } = info;
    // 企业购商品判断
    const iepShowFlag =
      iepSwitch &&
      !noneStock &&
      !social &&
      goodsInfo.enterPriseAuditStatus == 2;
    //积分
    const buyPoint = goodsInfo.buyPoint;

    let price = buyPoint
      ? salePrice
      : social
      ? goodsInfo.marketPrice
      : iepShowFlag
      ? iepGoodsPrice
      : goodsInfo.priceType == 1
      ? intervalMinPrice
      : salePrice;

    //预约列表
    const { appointmentSaleVOList, bookingSaleVOList } = goods
      .get('_otherProps')
      .toJS();

    //预约
    let isAppointmentSale = false;
    //预售
    let isBookingSale = false;
    // 是否是全款预售
    let isAllMoneySale = false;

    // 非积分商品
    if (!buyPoint) {
      appointmentSaleVOList &&
      appointmentSaleVOList.length > 0 &&
        appointmentSaleVOList.map((item) => {
          if (goodsInfo.goodsInfoId == item.appointmentSaleGood.goodsInfoId) {
            price = item.appointmentSaleGood.price
              ? item.appointmentSaleGood.price
              : goodsInfo.marketPrice;
            isAppointmentSale = true;
          }
        });

      bookingSaleVOList &&
      bookingSaleVOList.length > 0 &&
        bookingSaleVOList.map((item) => {
          if (goodsInfo.goodsInfoId == item.bookingSaleGoods.goodsInfoId) {
            isBookingSale = this.isPresaleStatus(item) == '预售中';
            isAllMoneySale = item.bookingType == 1 ? false : true;
            // 全款预售
            if (isBookingSale) {
              price =
                item.bookingSaleGoods.bookingPrice ||
                item.bookingSaleGoods.bookingPrice == 0
                  ? _.toFixed2(item.bookingSaleGoods.bookingPrice)
                  : _.toFixed2(goodsInfo.marketPrice);
            }
          }
        });
    }

    // 商品划线价
    // 会员价生效时，已登录情况下，商品详情页、规格弹窗会员价划市场价展示
    // 拼团、秒杀、预约、全款预售活动生效时，已登录+未登录情况下，商品详情页、规格弹窗划线价按照需求展示
    let linePrice =
      isAppointmentSale || isAllMoneySale || isFlashFlag
        ? goodsInfo.marketPrice
        : 0;

    //是否展示营销活动标签
    let showFlag = true;
    let showMatketingFlag = true;
    if (isAppointmentSale || isBookingSale || buyPoint || isFlashFlag) {
      showFlag = false;
    }
    if(isAppointmentSale || isBookingSale ){
      showMatketingFlag = false;
    }

    //禁用分享赚
    const socialDisabled = false;
    return (
      <TouchableOpacity
        key={id}
        activeOpacity={0.6}
        style={styles.bigView}
        onPress={() =>
          msg.emit('router: goToNext', {
            routeName: 'GoodsDetail',
            skuId: goodsInfo.goodsInfoId
          })
        }
      >
        <View style={styles.bigImgBox}>
          <View style={styles.bigImgContent}>
            <WMImage style={styles.bigImg} src={goodsInfo.goodsInfoImg} />
            {WMkit.isInvalid(goodsInfo) && (
              <View style={styles.bignotGoods}>
                <View style={styles.bigwhiteBox}>
                  <Text style={styles.bignotGoodsText} allowFontScaling={false}>
                    等货中
                  </Text>
                </View>
              </View>
            )}
          </View>
          {appointmentSaleVOList &&
          appointmentSaleVOList.length > 0 &&
            appointmentSaleVOList.map((k) => {
              if (goodsInfo.goodsInfoId == k.appointmentSaleGood.goodsInfoId) {
                return (
                  <View style={[styles.perBuy, styles.bigPerBuy]} key={k.id}>
                    <Text style={styles.perBuyStatus}>
                      {this.isBuyStatus(k)}
                    </Text>
                  </View>
                );
              }
            })}
          {bookingSaleVOList &&
            bookingSaleVOList.length > 0 &&
            bookingSaleVOList.map((k) => {
              if (goodsInfo.goodsInfoId == k.bookingSaleGoods.goodsInfoId) {
                return (
                  <View style={[styles.perBuy, styles.bigPerBuy]} key={k.id}>
                    <Text style={styles.perBuyStatus}>
                      {this.isPresaleStatus(k)}
                    </Text>
                  </View>
                );
              }
            })}
        </View>

        <View style={styles.wrapper}>
          <View style={styles.selfSales}>
            <View style={styles.label}>
              {goodsInfo.companyType == 0 && <SelfSalesLabel />}
            </View>
            <Text
              style={styles.title}
              allowFontScaling={false}
              numberOfLines={2}
            >
              {goodsInfo.companyType == 0 && (
                <Text style={styles.words}>占位 </Text>
              )}
              {goodsInfo.goodsInfoName}
            </Text>
            <Text style={styles.gec} allowFontScaling={false} numberOfLines={1}>
              {goods.get('goodsSubtitle') || ''}
            </Text>
            {goodsLabels && (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  marginVertical: 10
                }}
              >
                {goodsLabels.map((item) => {
                  return (
                    <WMImage
                      key={item.id}
                      style={{
                        width: 30,
                        height: 30,
                        marginHorizontal: 5
                      }}
                      src={JSON.parse(item.image)[0].url}
                    />
                  );
                })}
              </View>
            )}
          </View>

          <View style={styles.headerBox}>
            {(marketingLabels || couponLabels || grouponLabel) && (
              <MarketingLabel
                marketingLabels={showMatketingFlag ? marketingLabels : []}
                couponLabels={couponLabels}
                grouponLabel={showFlag ? grouponLabel : []}
                noneStock={noneStock}
                isFlashFlag={isFlashFlag}
                isSocial={social}
                style={{ marginBottom: 10 }}
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
              {!buyPoint && iepShowFlag && (
                <View style={styles.iepBoard}>
                  <Text allowFontScaling={false} style={[styles.iepText, { backgroundColor: mainColor }]}>
                    {enterprisePriceName}
                  </Text>
                </View>
              )}
            </View>
          </View>
          {/*销量 评价 好评率*/}
          {/* {this._saleInfo('big')} */}

          <View>
            {/*社交电商营销下大图列表不展示按钮*/}
            {social && isDistributor && !buyPoint ? (
              !noneStock &&
              !isAppointmentSale &&
              !isBookingSale &&
              !iepShowFlag && (
                <View style={styles.socialBtn}>
                  <TouchableOpacity
                    style={styles.btnBox1}
                    activeOpacity={0.8}
                    onPress={() =>
                      msg.emit('router: goToNext', {
                        routeName: 'GraphicMaterial',
                        goodsInfoId: goodsInfo.goodsInfoId
                      })
                    }
                  >
                    <Text allowFontScaling={false} style={[styles.btnText1, { color: mainColor }]}>
                      发圈
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      this.props.changeShowShare();
                      this.props.saveCheckedSku(goodsInfo);
                    }}
                  >
                    <LinearGradient
                      colors={[mainColor, mainColor]}
                      style={[
                        styles.btnBox2,
                        socialDisabled && styles.btnBoxDisabled
                      ]}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                    >
                      <Text allowFontScaling={false} style={styles.btnText2}>
                        分享赚
                        {_.addZero(goodsInfo.distributionCommission)}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )
            ) : (
              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
              >
                <AddCart
                  disableAdd={noneStock}
                  skuId={goodsInfo.goodsInfoId}
                  spuAddCartFunc={spuAddCartFunc}
                />
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
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

  _saleInfo = (flag) => {
    const { goods, isShow } = this.props;
    // spu下第一个上架的sku信息
    const goodsInfo = goods
      .get('goodsInfos')
      .find((skuInfo) => skuInfo.get('addedFlag') === 1);
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

    let html = null;
    if (flag === 'small') {
      html = (
        <View style={styles.assseTag}>
          <Text
            allowFontScaling={false}
            style={[styles.assseText, { paddingLeft: 0 }]}
          >
            {salesNum}
            销量
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.assseText, { paddingLeft: 20 }]}
          >
            {evaluateNum}
            评价
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.assseText, { paddingLeft: 20 }]}
          >
            {favorableRate}
            %好评
          </Text>
        </View>
      );
    } else {
      html = (
        <View style={styles.assseTag}>
          <Text
            allowFontScaling={false}
            style={[styles.assseText, { paddingLeft: 0 }]}
          >
            {salesNum}
            销量
          </Text>
          <Text allowFontScaling={false} style={styles.assseText}>
            {evaluateNum}
            评价
          </Text>
          <Text allowFontScaling={false} style={styles.assseText}>
            {favorableRate}
            %好评
          </Text>
        </View>
      );
    }

    return isShow ? (
      html
    ) : (
      <View style={styles.assseTag}>
        <Text
          allowFontScaling={false}
          style={[styles.assseText, { paddingLeft: 0 }]}
        >
          {salesNum}
          销量
        </Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  bigBox: {
    paddingLeft: 2,
    paddingTop: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  bigView: {
    width: (screenWidth - 98) / 2,
    marginVertical: 2,
    marginHorizontal: 2,
    backgroundColor: '#fff',
    borderRadius: 6
  },
  bigImgBox: {
    width: (screenWidth - 98) / 2 - 2,
    height: (screenWidth - 98) / 2 - 2,
    marginBottom: 5
  },
  bigImgContent: {
    width: (screenWidth - 98) / 2 - 2,
    height: (screenWidth - 98) / 2 - 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  bigImg: {
    width: (screenWidth - 98) / 2 - 2,
    height: (screenWidth - 98) / 2 - 2,
    borderRadius: 6
  },
  bignotGoods: {
    position: 'absolute',
    width: (screenWidth - 98) / 2 - 2,
    height: (screenWidth - 98) / 2 - 2,
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(000,000,000,0.3)',
    borderRadius: 6
  },
  bigwhiteBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bignotGoodsText: {
    fontSize: 14,
    color: '#fff'
  },
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
  iepBoard: {
    height: 14,
    marginLeft: 5,
    backgroundColor: '#FF3333',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    paddingHorizontal: 4
  },
  iepText: {
    fontSize: 10,
    color: '#ffffff'
  },
  wrapper: {
    padding: 10,
    // height: 145,
    justifyContent: 'space-between'
  },
  imgContent: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  img: {
    width: 128,
    height: 128,
    borderRadius: 6
  },
  notGoods: {
    position: 'absolute',
    width: 128,
    height: 128,
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(000,000,000,0.3)',
    borderRadius: 6
  },
  whiteBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  notGoodsText: {
    fontSize: 14,
    color: '#fff'
  },
  item: {
    padding: 10,
    paddingBottom: 0,
    paddingRight: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'flex-start',
    minHeight: 128,
    paddingBottom: 8,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb'
  },
  selfSales: {
    flexDirection: 'column',
    position: 'relative'
  },
  label: {
    position: 'absolute',
    left: 0,
    // top: 2
  },
  words: {
    color: 'rgba(255,255,255,0)'
  },
  title: {
    color: '#333',
    fontSize: 14,
    lineHeight: 16,
    // height: 32,
    marginBottom: 5,
    flexWrap: 'wrap'
  },
  gec: {
    color: '#999',
    fontSize: 10,
    marginBottom: 5
  },
  headerBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
    height: 20
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
    flex: 1,
    marginBottom: 2,
    overflow: 'hidden'
  },
  commission: {
    marginLeft: 3,
    color: '#333',
    fontSize: 12
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
    backgroundColor: 'rgba(255,102,0,0.08);'
  },
  btnText1: {
    fontSize: 10,
    fontWeight: 'bold'
  },
  btnBox2: {
    marginLeft: 5,
    height: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
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
  bigPerBuy: {
    width: (screenWidth - 98) / 2 - 2
  },
  perBuyStatus: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center'
  }
});
