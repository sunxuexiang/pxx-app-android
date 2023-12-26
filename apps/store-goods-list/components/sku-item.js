import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fromJS } from 'immutable';
import { msg } from 'plume2';
import WMImage from 'wmkit/image/index';
import * as _ from 'wmkit/common/util';
import Price from 'wmkit/price';
import GoodsNum from 'wmkit/biz/goods-num';
import MarketingLabel from 'wmkit/biz/marketing-label';
import { mainColor, priceColor, screenWidth } from 'wmkit/styles/index';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
/**
 * Sku列表的item
 */
export default class SkuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
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
      goodsItem,
      // 是否是分销员
      isDistributor,
      iepSwitch,
      iepInfo,
    } = this.state;
    // skuId
    const id = goodsItem.id;
    // sku信息
    const goodsInfo = goodsItem.goodsInfo;
    const stock = goodsInfo.stock;
    // 起订量
    const count = goodsInfo.count || 0;
    // 库存等于0或者起订量大于剩余库存
    const noneStock = stock <= 0 || (count > 0 && count > stock);
    const buyCount = noneStock ? 0 : goodsInfo.buyCount || 0;

    //积分
    let buyPoint = goodsInfo.buyPoint;

    // 营销标签
    const marketingLabels = goodsInfo.marketingLabels;
    // 优惠券标签
    const couponLabels = goodsInfo.couponLabels;
    // 拼团标签
    const grouponLabel = goodsInfo.grouponLabel;

    // 社交电商相关内容显示与否
    const social = goodsInfo.distributionGoodsAudit == 2 ? true : false;
    const marketPrice = goodsInfo.marketPrice;
    //禁用分享赚
    const socialDisabled = false;

    // 企业购商品判断
    // iep属性
    const { iepInfo: info = {} } = iepInfo.toJS();
    // 企业价格名称
    const { enterprisePriceName } = info;
    const iepShowFlag = iepSwitch && !noneStock && !social && goodsInfo.enterPriseAuditStatus == 2;
    // 企业价
    const iepGoodsPrice = goodsInfo.enterPrisePrice;

    //预约活动
    const appointmentSaleVOList = goodsItem._otherProps.appointmentSaleVOList;
    const bookingSaleVOList = goodsItem._otherProps.bookingSaleVOList;

    const isAppointmentArry =
      (appointmentSaleVOList &&
        appointmentSaleVOList.length > 0 &&
        appointmentSaleVOList.filter(
          (index) => id == index.appointmentSaleGood.goodsInfoId,
        )) ||
      [];

    // 商品展示价格
    let price = buyPoint
      ? goodsInfo.salePrice
      : social
        ? goodsInfo.marketPrice
        : iepShowFlag
          ? iepGoodsPrice
          : goodsInfo.priceType == 1
            ? goodsInfo.intervalMinPrice
            : goodsInfo.salePrice;

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
        if (goodsInfo.goodsInfoId == item.appointmentSaleGood.goodsInfoId) {
          price = item.appointmentSaleGood.price
            ? item.appointmentSaleGood.price
            : goodsInfo.marketPrice;
          isAppointmentSale = true;
          appointmentItem = item;
        }
      });

      bookingSaleVOList &&
      bookingSaleVOList.length > 0 &&
      bookingSaleVOList.map((item) => {
        if (goodsInfo.goodsInfoId == item.bookingSaleGoods.goodsInfoId) {
          isBookingSale = this.isPresaleStatus(item) === '预售中';
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

    //秒杀
    let isFlashFlag = false;
    if (marketingLabels != null && marketingLabels.length > 0) {
      isFlashFlag =
        marketingLabels.filter((val) => val.marketingType === 5).length > 0;
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
    if (isAppointmentSale || isBookingSale) {
      showMatketingFlag = false;
    }

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.item}
        onPress={() =>
          msg.emit('router: goToNext', {
            routeName: 'GoodsDetail',
            skuId: goodsInfo.goodsInfoId,
          })
        }
      >
        <View style={styles.imgBox}>
          <WMImage style={styles.img} src={goodsInfo.goodsInfoImg}/>
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
            style={[styles.title, noneStock && { color: '#bcbcbc' }]}
            allowFontSacling={false}
            numberOfLines={2}
          >
            {goodsInfo.goodsInfoName}
          </Text>
          <Text
            style={[styles.gec, noneStock && { color: '#bcbcbc' }]}
            allowFontSacling={false}
            numberOfLines={1}
          >
            {goodsInfo.specText}
          </Text>

          <View style={styles.tagCon}>
            {(marketingLabels || couponLabels || grouponLabel) && (
              <MarketingLabel
                marketingLabels={showMatketingFlag ? marketingLabels : []}
                couponLabels={couponLabels}
                grouponLabel={grouponLabel}
                noneStock={noneStock}
                isFlashFlag={isFlashFlag}
                isSocial={social}
              />
            )}
          </View>
          {/* 销量 */}
          {this._saleInfo(goodsInfo, 'small')}

          <View style={styles.row}>
            <View style={styles.tagCon}>
              <Price
                price={price}
                buyPoint={goodsInfo.buyPoint}
                linePrice={linePrice}
              />
              {/* <Text
                allowFontSacling={false}
                style={[styles.price, noneStock && { color: '#bcbcbc' }]}
              >
                ¥{' '}
                {social
                  ? _.addZero(marketPrice)
                  : iepShowFlag ? _.addZero(iepGoodsPrice)
                    : this._calShowPrice(goodsItem, buyCount)}
              </Text> */}
              {!isAppointmentSale &&
              !isBookingSale &&
              social &&
              isDistributor && (
                <Text
                  style={[
                    styles.commission,
                    noneStock && { color: '#bcbcbc' },
                  ]}
                  allowFontScaling={false}
                >
                  &nbsp;/&nbsp;赚
                  {_.addZero(goodsInfo.distributionCommission)}
                </Text>
              )}
              {!buyPoint && iepShowFlag &&
              <View style={styles.iepBoard}>
                <Text allowFontScaling={false} style={[styles.iepText, { backgroundColor: mainColor }]}>
                  {enterprisePriceName}
                </Text>
              </View>}
            </View>
            {!isAppointmentSale &&
            !isBookingSale &&
            social && isDistributor && !buyPoint ? (
              !noneStock &&
              isAppointmentArry.length < 1 &&
              !isBookingSale &&
              !iepShowFlag && (
                <View style={styles.socialBtn}>
                  <TouchableOpacity
                    style={styles.btnBox1}
                    activeOpacity={0.8}
                    onPress={() =>
                      msg.emit('router: goToNext', {
                        routeName: 'GraphicMaterial',
                        goodsInfoId: goodsInfo.goodsInfoId,
                      })
                    }
                  >
                    <Text style={[styles.btnText1, { color: mainColor }]}>发圈素材</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.btnBox2,
                      socialDisabled && styles.btnBoxDisabled,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => {
                      this.props.changeShowShare();
                      this.props.saveCheckedSku(goodsItem.goodsInfo);
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
                disableNumberInput={noneStock}
                onAfterClick={this._afterChangeNum}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  /**
   * 大图商品
   * @returns {XML}
   */
  big = () => {
    const { goodsItem, iepInfo, iepSwitch } = this.state;
    // skuId
    const id = goodsItem.id;
    // sku信息
    const goodsInfo = goodsItem.goodsInfo;
    const stock = goodsInfo.stock;
    // 起订量
    const count = goodsInfo.count || 0;
    // 库存等于0或者起订量大于剩余库存
    const noneStock = stock <= 0 || (count > 0 && count > stock);
    const buyCount = noneStock ? 0 : goodsInfo.buyCount || 0;

    const social = goodsInfo.distributionGoodsAudit == 2 ? true : false;

    // 企业购商品判断
    // iep属性
    const { iepInfo: info = {} } = iepInfo.toJS();
    // 企业价格名称
    const { enterprisePriceName } = info;
    const iepShowFlag = iepSwitch && !noneStock && !social && goodsInfo.enterPriseAuditStatus == 2;
    // 企业价
    const iepGoodsPrice = goodsInfo.enterPrisePrice;

    // 营销标签
    const marketingLabels = goodsInfo.marketingLabels;
    // 优惠券标签
    const couponLabels = goodsInfo.couponLabels;
    // 拼团标签
    const grouponLabel = goodsInfo.grouponLabel;

    //积分
    let buyPoint = goodsInfo.buyPoint;

    //预约活动
    const appointmentSaleVOList = goodsItem._otherProps.appointmentSaleVOList;
    const bookingSaleVOList = goodsItem._otherProps.bookingSaleVOList;

    const isAppointmentArry =
      (appointmentSaleVOList &&
        appointmentSaleVOList.length > 0 &&
        appointmentSaleVOList.filter(
          (index) => id == index.appointmentSaleGood.goodsInfoId,
        )) ||
      [];

    // 商品展示价格
    let price = buyPoint
      ? goodsInfo.salePrice
      : social
        ? goodsInfo.marketPrice
        : iepShowFlag
          ? iepGoodsPrice
          : goodsInfo.priceType == 1
            ? goodsInfo.intervalMinPrice
            : goodsInfo.salePrice;

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
        if (goodsInfo.goodsInfoId == item.appointmentSaleGood.goodsInfoId) {
          price = item.appointmentSaleGood.price
            ? item.appointmentSaleGood.price
            : goodsInfo.marketPrice;
          isAppointmentSale = true;
          appointmentItem = item;
        }
      });

      bookingSaleVOList &&
      bookingSaleVOList.length > 0 &&
      bookingSaleVOList.map((item) => {
        if (goodsInfo.goodsInfoId == item.bookingSaleGoods.goodsInfoId) {
          isBookingSale = this.isPresaleStatus(item) === '预售中';
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

    //是否展示拼团活动标签
    let showFlag = true;
    let showMatketingFlag = true;
    if (isAppointmentSale || isBookingSale || buyPoint || isFlashFlag) {
      showFlag = false;
    }
    if (isAppointmentSale || isBookingSale) {
      showMatketingFlag = false;
    }

    //秒杀
    let isFlashFlag = false;
    if (marketingLabels != null && marketingLabels.length > 0) {
      isFlashFlag =
        marketingLabels.filter((val) => val.marketingType === 5).length > 0;
    }
    //禁用分享赚
    const socialDisabled = false;
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.bigView}
        onPress={() =>
          msg.emit('router: goToNext', {
            routeName: 'GoodsDetail',
            skuId: goodsInfo.goodsInfoId,
          })
        }
      >
        <View style={styles.bigImgBox}>
          <WMImage style={styles.bigimg} src={goodsInfo.goodsInfoImg}/>
          {noneStock && (
            <View style={styles.bignotGoods}>
              <View style={styles.bigwhiteBox}>
                <Text style={styles.bignotGoodsText} allowFontScaling={false}>
                  缺货
                </Text>
              </View>
            </View>
          )}
          {appointmentSaleVOList &&
          !buyPoint &&
          appointmentSaleVOList.length > 0 &&
          appointmentSaleVOList.map((k) => {
            if (id == k.appointmentSaleGood.goodsInfoId) {
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
          !buyPoint &&
          bookingSaleVOList.length > 0 &&
          bookingSaleVOList.map((k) => {
            if (
              id == k.bookingSaleGoods.goodsInfoId &&
              this.isPresaleStatus(k) == '预售中'
            ) {
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
          <View style={styles.titBox}>
            <Text
              style={[styles.title, noneStock && { color: '#bcbcbc' }]}
              allowFontSacling={false}
              numberOfLines={2}
            >
              {goodsInfo.goodsInfoName}
            </Text>
          </View>
          <Text
            style={[styles.gec, noneStock && { color: '#bcbcbc' }]}
            allowFontSacling={false}
            numberOfLines={1}
          >
            {goodsInfo.specText}
          </Text>

          <View>
            <View style={styles.headerBox}>
              {(marketingLabels || couponLabels || grouponLabel) && (
                <MarketingLabel
                  marketingLabels={showMatketingFlag ? marketingLabels : []}
                  couponLabels={couponLabels}
                  grouponLabel={showFlag ? grouponLabel : []}
                  noneStock={noneStock}
                  style={{ marginBottom: 10 }}
                  isFlashFlag={isFlashFlag}
                  isSocial={social}
                />
              )}
            </View>
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

          {/*销量 评价 好评率*/}
          {this._saleInfo(goodsInfo, 'big')}

          <View>
            {/*社交电商营销下大图列表不展示按钮*/}
            {!isAppointmentSale &&
            !isBookingSale &&
            social && isDistributor && !buyPoint ? (
              !noneStock &&
              isAppointmentArry.length < 1 &&
              !isBookingSale &&
              !iepShowFlag && (
                <View style={styles.socialBtn}>
                  <TouchableOpacity
                    style={styles.btnBox1}
                    activeOpacity={0.8}
                    onPress={() =>
                      msg.emit('router: goToNext', {
                        routeName: 'GraphicMaterial',
                        goodsInfoId: goodsInfo.goodsInfoId,
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
                      this.props.saveCheckedSku(goodsItem.goodsInfo);
                    }}
                  >
                    <LinearGradient
                      colors={['#006cb6', '#006cb6']}
                      style={[
                        styles.btnBox2,
                        socialDisabled && styles.btnBoxDisabled,
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
              <View style={styles.socialBtn}>
                <GoodsNum
                  goodsInfoId={id}
                  value={buyCount}
                  max={stock}
                  disableNumberInput={noneStock}
                  onAfterClick={this._afterChangeNum}
                />
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  /**
   * 根据设价方式,计算显示的价格
   * @returns 显示的价格
   * @private
   */
  _calShowPrice = (goodsItem, buyCount) => {
    goodsItem = fromJS(goodsItem);
    const goodsInfo = goodsItem.get('goodsInfo');
    let showPrice;
    // 阶梯价,根据购买数量显示对应的价格
    if (goodsInfo.get('priceType') === 1 && goodsInfo.get('intervalPriceIds')) {
      const intervalPriceArr = goodsInfo
        .get('intervalPriceIds')
        .map((id) =>
          goodsItem
            .getIn(['_otherProps', 'goodsIntervalPrices'])
            .find((pri) => pri.get('intervalPriceId') === id),
        )
        .sort((a, b) => b.get('count') - a.get('count'));
      if (buyCount > 0) {
        // 找到sku的阶梯价,并按count倒序排列从而找到匹配的价格
        showPrice = intervalPriceArr
          .find((pri) => buyCount >= pri.get('count'))
          .get('price');
      } else {
        showPrice = goodsInfo.get('intervalMinPrice') || 0;
      }
    } else {
      showPrice = goodsInfo.get('salePrice') || 0;
    }
    return _.addZero(showPrice);
  };

  /**
   * 数量修改后的方法,用于修改购买数量,响应变化对应的阶梯价格
   * @private
   */
  _afterChangeNum = (num) => {
    const goodsItem = this.state.goodsItem;
    goodsItem.goodsInfo.buyCount = num;
    this.setState({
      goodsItem: goodsItem,
    });
  };

  _saleInfo = (flag) => {
    const { goodsItem, isShow } = this.state;
    // sku信息
    const goodsInfo = fromJS(goodsItem.goodsInfo);
    //好评率
    let favorableRate = '100';
    if (
      goodsInfo.get('goodsEvaluateNum') &&
      goodsInfo.get('goodsEvaluateNum') != 0
    ) {
      favorableRate = _.mul(
        _.div(
          goodsInfo.get('goodsFavorableCommentNum'),
          goodsInfo.get('goodsEvaluateNum'),
        ),
        100,
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
      );
    } else {
      html = (
        <View style={styles.assseTag}>
          <Text style={[styles.assseText, { paddingLeft: 0 }]}>
            {salesNum}
            销量
          </Text>
          <Text style={styles.assseText}>
            {evaluateNum}
            评价
          </Text>
          <Text style={styles.assseText}>
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

    if (isAppointmentStart && isAppointmentEnd) {
      return '预约中';
    }
    if (!isAppointmentEnd && !isSnapUpStartTime) {
      return '预约结束';
    }
    if (isSnapUpStartTime && isSnapUpEndTime) {
      return '抢购中';
    }
    if (!isAppointmentEnd && !isSnapUpStartTime) {
      return '预约结束';
    }
  };

  //判断当前的预售状态
  isPresaleStatus = (item) => {
    const {
      bookingStartTime,
      bookingEndTime,
      bookingType,
      handSelStartTime,
      handSelEndTime,
    } = item;
    let isBetween = false;

    //预售起止时间内 0:全款 1:定金
    if (bookingType == 0) {
      isBetween = moment(new Date()).isBetween(
        bookingStartTime,
        bookingEndTime,
      );
    }

    //定金支付起止时间内
    if (bookingType == 1) {
      isBetween = moment(new Date()).isBetween(
        handSelStartTime,
        handSelEndTime,
      );
    }

    if (isBetween) {
      return '预售中';
    }
  };
}

const styles = StyleSheet.create({
  bigBox: {
    paddingLeft: 5,
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  bigView: {
    width: (screenWidth - 30) / 2,
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 6,
    // borderWidth: 1 / PixelRatio.get(),
    // borderColor: '#ebebeb'
  },
  bigImgBox: {
    width: (screenWidth - 30) / 2 - 2,
    height: (screenWidth - 30) / 2 - 2,
    marginBottom: 5,
  },
  bigImgContent: {
    width: (screenWidth - 30) / 2 - 2,
    height: (screenWidth - 30) / 2 - 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bigImg: {
    width: (screenWidth - 30) / 2 - 2,
    height: (screenWidth - 30) / 2 - 2,
    borderRadius: 6,
  },
  bignotGoods: {
    position: 'absolute',
    width: (screenWidth - 30) / 2 - 2,
    height: (screenWidth - 30) / 2 - 2,
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(000,000,000,0.3)',
    borderRadius: 6,
  },
  bigwhiteBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bignotGoodsText: {
    fontSize: 14,
    color: '#fff',
  },

  lack: {
    width: 35,
    height: 15,
    marginLeft: 5,
    backgroundColor: '#cccccc',
    borderRadius: 7.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lackText: {
    fontSize: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  iepBoard: {
    height: 15,
    marginLeft: 5,
    backgroundColor: '#FF3333',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    paddingHorizontal: 4,
  },
  iepText: {
    fontSize: 10,
    color: '#ffffff'
  },
  wrapper: {
    padding: 10,
    height: 145,
    justifyContent: 'space-between',
  },
  price: {
    color: priceColor,
  },
  imgContent: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  img: {
    width: 128,
    height: 128,
    borderRadius: 6,
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
    borderRadius: 6,
  },
  whiteBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notGoodsText: {
    fontSize: 14,
    color: '#fff',
  },
  item: {
    padding: 10,
    paddingBottom: 0,
    paddingRight: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  content: {
    height: 128,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: 'flex-start',
    // minHeight: 100,
    // paddingBottom: 8,
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb'
  },
  selfSales: {
    flexDirection: 'column',
    position: 'relative',
  },
  label: {
    position: 'absolute',
    left: 0,
  },
  words: {
    color: 'rgba(255,255,255,0)',
  },
  title: {
    color: '#333',
    fontSize: 14,
    lineHeight: 16,
    //height: 32,
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  gec: {
    color: '#999',
    fontSize: 10,
    marginBottom: 5,
  },
  headerBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
    height: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  titBox: {
    height: 40,
    flexDirection: 'row',
  },
  tagCon: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: 20,
    marginTop: 2,
    marginBottom: 2,
    // flexWrap:'wrap',
    overflow: 'hidden',
  },
  assseTag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 2,
    paddingBottom: 2,
  },
  assseText: {
    color: '#999999',
    fontSize: 10,
  },
  commission: {
    marginLeft: 3,
    color: '#333',
    fontSize: 12,
  },
  socialBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnBox1: {
    height: 23,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11.5,
    backgroundColor: 'rgba(255,102,0,0.08);',
  },
  btnText1: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  btnBox2: {
    marginLeft: 5,
    height: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  btnBoxDisabled: {
    backgroundColor: '#ddd',
  },
  btnText2: {
    color: '#fff',
    fontSize: 10,
  },
  goodsEvaluate: {
    overflow: 'hidden',
    marginBottom: 4,
    marginRight: -50,
    flexDirection: 'row',
  },
  goodsEvaluateTxt: {
    fontSize: 12,
    color: '#999',
    paddingRight: 5,
  },
  imgBox: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    alignItems: 'center',
  },
  bigPerBuy: {
    width: (screenWidth - 30) / 2 - 2,
  },
  perBuyStatus: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
});
