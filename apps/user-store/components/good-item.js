import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { msg } from 'plume2';

import { fromJS } from 'immutable';
import WMImage from 'wmkit/image/index';
import * as _ from 'wmkit/common/util';
import Check from 'wmkit/check';
import Price from 'wmkit/price';

import GoodsNum from 'wmkit/biz/goods-num';
import MarketingLabel from 'wmkit/biz/marketing-label';
import SelfSalesLabel from 'wmkit/biz/selfsales-label';
import { screenWidth } from 'wmkit/styles/index';
import moment from 'moment';
import * as WMkit from 'wmkit/kit';
import Swipeout from 'react-native-swipeout';
import { mainColor } from 'wmkit/styles/index';

export default class GoodItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  render() {
    const {
      goodItem,
      isEdit,
      checkedBackFun,
      checked,
      iepFlag,
      deleteSku
    } = this.state;
    const id = goodItem.get('goodsInfoId');
    const stock = goodItem.get('stock');
    // 商品是否要设置成无效状态
    const invalid =
      goodItem.get('addedFlag') != 1 ||
      goodItem.get('delFlag') != 0 ||
      goodItem.get('goodsStatus') === 2;
    // 图片
    const goodsLabels = goodItem.get('goodsLabels')&&goodItem.get('goodsLabels').toJS() || [];
    console.warn("码农认证报错提示==================》",goodsLabels)
    const goodsInfoImg = goodItem.get('goodsInfoImg') || '';
    // 商品名称
    const goodsInfoName = goodItem.get('goodsInfoName') || 0;
    // 规格值
    const goodsSubtitle = goodItem.get('goodsSubtitle') || '';
    // 起订量
    const count = goodItem.get('count') || 0;
    // 库存等于0或者起订量大于剩余库存
    const noneStock = stock <= 0 || (count > 0 && count > stock);
    // 购物车数量
    const buyCount = noneStock ? 0 : goodItem.get('buyCount') || 0;
    //商家类型
    const companyType = goodItem.get('companyType');
    const labels = (goodItem.get('marketingLabels') || fromJS([])).toJS();
    const couponLabels = (goodItem.get('couponLabels') || fromJS([])).toJS();

    //企业价
    const iepShowFlag =
      iepFlag && !invalid && goodItem.get('enterPriseAuditState') == 2;
    // 企业价
    const iepGoodsPrice = goodItem.get('enterPrisePrice');

    //积分
    let buyPoint = goodItem.get('buyPoint');

    // 社交电商相关内容显示与否
    const social = goodItem.get('distributionGoodsAudit') == 2 ? true : false;

    // 商品展示价格
    let price = buyPoint
      ? goodItem.get('salePrice')
      : social
      ? goodItem.get('marketPrice')
      : iepShowFlag
      ? iepGoodsPrice
      : goodItem.get('priceType') == 1
      ? goodItem.get('intervalMinPrice')
      : goodItem.get('salePrice');

    //预约
    let isAppointmentSale = false;
    let appointmentItem = [];
    //预约
    let appoint = null;
    const appointmentSaleVOList = goodItem.getIn([
      '_otherProps',
      'appointmentSaleVOList'
    ]);
    if (appointmentSaleVOList) {
      appoint = appointmentSaleVOList
        .filter(
          (a) =>
            a.get('appointmentSaleGood').get('goodsInfoId') ===
            goodItem.get('goodsInfoId')
        )
        .first();
    }

    // 预售
    const bookingSaleVOList = goodItem.getIn([
      '_otherProps',
      'bookingSaleVOList'
    ]);

    //预售
    let isBookingSale = false;
    // 非积分商品
    if (!buyPoint) {
      appointmentSaleVOList &&
        appointmentSaleVOList.size > 0 &&
        appointmentSaleVOList.map((item) => {
          if (
            goodItem.get('goodsInfoId') ==
            item.get('appointmentSaleGood').get('goodsInfoId')
          ) {
            price = item.get('appointmentSaleGood').get('price')
              ? item.get('appointmentSaleGood').get('price')
              : goodItem.get('marketPrice');
            isAppointmentSale = true;
            appointmentItem = item;
          }
        });

      bookingSaleVOList &&
        bookingSaleVOList.size > 0 &&
        bookingSaleVOList.map((item) => {
          if (
            goodItem.get('goodsInfoId') ==
            item.get('bookingSaleGoods').get('goodsInfoId')
          ) {
            isBookingSale = this.isPresaleStatus(item.toJS()) == '预售中';
            // 全款预售
            if (isBookingSale) {
              
              price =
                item.get('bookingSaleGoods').get('bookingPrice') ||
                item.get('bookingSaleGoods').get('bookingPrice') == 0
                  ? _.toFixed2(item.get('bookingSaleGoods').get('bookingPrice'))
                  : _.toFixed2(goodItem.get('marketPrice'));
            }
          }
        });
    }
// 特价商品展示特价价格
price= goodItem.get('goodsInfoType') == 1 ? goodItem.get('specialPrice') : price
    // 商品划线价
    // 会员价生效时，已登录情况下，商品详情页、规格弹窗会员价划市场价展示
    // 拼团、秒杀、预约、预售活动生效时，已登录+未登录情况下，商品详情页、规格弹窗划线价按照需求展示
    let linePrice =
      isAppointmentSale || isBookingSale ? goodItem.get('marketPrice') : 0;

    let showMatketingFlag = true;
    if (isAppointmentSale || isBookingSale) {
      showMatketingFlag = false;
    }

    return (
      <View style={styles.container}>
        <Swipeout
          key={Math.random()}
          buttonWidth={80}
          right={[
            {
              component: [
                <View style={[styles.swipeout, { backgroundColor: mainColor }]}>
                  <Text style={styles.swipeoutText}>删除</Text>
                </View>
              ],
              onPress: () => {
                deleteSku(id);
              }
            }
          ]}
          backgroundColor="#fff"
          autoClose={true}
        >
          <View style={styles.rowItem}>
            {isEdit ? (
              <Check
                checked={checked}
                onCheck={(checked) => checkedBackFun(checked, id)}
              />
            ) : null}
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.item}
              disabled={invalid}
              onPress={() =>
                msg.emit('router: goToNext', {
                  routeName: 'GoodsDetail',
                  skuId: id
                })
              }
            >
              <View style={styles.imgBox}>
                <WMImage style={styles.img} src={goodsInfoImg} />
                {!invalid && WMkit.isInvalid(goodItem.toJS()) && (
                  <View style={styles.notGoods}>
                    <View style={styles.whiteBox}>
                      <Text
                        style={styles.notGoodsText}
                        allowFontScaling={false}
                      >
                        等货中
                      </Text>
                    </View>
                  </View>
                )}
                {invalid && (
                  <View style={styles.notGoods}>
                    <View style={styles.whiteBox}>
                      <Text
                        style={styles.notGoodsText}
                        allowFontScaling={false}
                      >
                        失效
                      </Text>
                    </View>
                  </View>
                )}
                {/* 预约 */}
                {appoint && !buyPoint && (
                  <View style={styles.perBuy} key={appoint}>
                    <Text style={styles.perBuyStatus}>
                      {this.isBuyStatus(appoint.toJS())}
                    </Text>
                  </View>
                )}
                {/* 预售 */}
                {bookingSaleVOList &&
                  !buyPoint &&
                  bookingSaleVOList.map((k) => {
                    if (
                      id == k.get('bookingSaleGoods').get('goodsInfoId') &&
                      this.isPresaleStatus(k.toJS()) == '预售中'
                    ) {
                      return (
                        <View style={styles.perBuy} key={k}>
                          <Text style={styles.perBuyStatus}>
                            {this.isPresaleStatus(k.toJS())}
                          </Text>
                        </View>
                      );
                    }
                  })}
              </View>
              {invalid ? (
                <View style={styles.content}>
                  <View style={styles.selfSales}>
                    <View style={styles.label}>
                      {companyType == 0 && <SelfSalesLabel />}
                    </View>
                    <Text
                      style={styles.title}
                      allowFontScaling={false}
                      numberOfLines={2}
                    >
                      {companyType == 0 && (
                        <Text style={styles.words}>占位 </Text>
                      )}
                      {goodsInfoName}
                    </Text>
                    <Text
                      style={[styles.gec, { color: '#bcbcbc' }]}
                      allowFontSacling={false}
                      numberOfLines={1}
                    >
                      {goodsSubtitle || ''}
                    </Text>
                  </View>
                  <View style={styles.tagCon}>
                    {/* {companyType == 0 && <SelfSalesLabel />} */}
                    <MarketingLabel
                      marketingLabels={showMatketingFlag ? labels : []}
                      couponLabels={couponLabels}
                      noneStock={invalid}
                      isSocial={social}
                    />
                    {/* <View style={styles.lack}>
                    <Text allowFontScaling={false} style={styles.lackText}>
                      失效
                    </Text>
                  </View> */}
                  </View>
                  <View style={styles.goodsNum}>
                    <View style={styles.tagCon}>
                      <Price
                        price={price}
                        buyPoint={goodItem.get('buyPoint')}
                        linePrice={linePrice}
                      />
                    </View>
                    {!isEdit ? (
                      <GoodsNum
                        goodsInfoId={id}
                        value={buyCount}
                        max={0}
                        disableNumberInput={noneStock}
                        onAfterClick={this._afterChangeNum}
                      />
                    ) : null}
                  </View>
                </View>
              ) : (
                <View style={styles.content}>
                  <View style={styles.selfSales}>
                    <View style={styles.label}>
                      {companyType == 0 && <SelfSalesLabel />}
                    </View>
                    <Text
                      style={styles.title}
                      allowFontScaling={false}
                      numberOfLines={2}
                    >
                      {companyType == 0 && (
                        <Text style={styles.words}>占位 </Text>
                      )}
                      {goodsInfoName}
                    </Text>
                    <Text
                      style={styles.gec}
                      allowFontScaling={false}
                      numberOfLines={1}
                    >
                      {goodsSubtitle || ''}
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
                  <View style={styles.tagCon}>
                    {/* {companyType == 0 && <SelfSalesLabel />} */}
                    {
                      <MarketingLabel
                        marketingLabels={showMatketingFlag ? labels : []}
                        couponLabels={couponLabels}
                        noneStock={noneStock}
                        isSocial={social}
                      />
                    }
                  </View>
                  {/*销量、评价、好评*/}
                  {/* {this._saleInfo(goodItem)} */}

                  <View style={styles.goodsNum}>
                    <View style={styles.tagCon}>
                      <Price
                        price={price}
                        buyPoint={goodItem.get('buyPoint')}
                        linePrice={linePrice}
                      />
                    </View>
                    {!isEdit ? (
                      <GoodsNum
                        goodsInfoId={id}
                        value={buyCount}
                        max={stock}
                        disableNumberInput={noneStock}
                        onAfterClick={this._afterChangeNum}
                      />
                    ) : null}
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </Swipeout>
      </View>
    );
  }

  /**
   * 根据设价方式,计算显示的价格
   * @returns 显示的价格
   * @private
   */
  _calShowPrice = (goodsInfo, buyCount) => {
    let showPrice;
    const appointmentSaleVOList = goodsInfo.getIn([
      '_otherProps',
      'appointmentSaleVOList'
    ]);
    if (appointmentSaleVOList) {
      const appoint = appointmentSaleVOList
        .filter(
          (a) =>
            a.get('appointmentSaleGood').get('goodsInfoId') ===
            goodsInfo.get('goodsInfoId')
        )
        .first();
      if (appoint) {
        return appoint.get('appointmentSaleGood').get('price');
      }
    }
    // 阶梯价,根据购买数量显示对应的价格
    if (goodsInfo.get('priceType') === 1 && goodsInfo.get('intervalPriceIds')) {
      const intervalPriceArr = goodsInfo
        .get('intervalPriceIds')
        .map((id) =>
          goodsInfo
            .getIn(['_otherProps', 'goodsIntervalPrices'])
            .find((pri) => pri.get('intervalPriceId') === id)
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
    this.setState({
      goodItem: this.state.goodItem.set('buyCount', num)
    });
  };

  _saleInfo = (goodsItem) => {
    const { isShow } = this.props;
    //好评率
    let favorableRate = '100';
    if (
      goodsItem.get('goodsEvaluateNum') &&
      goodsItem.get('goodsEvaluateNum') != 0
    ) {
      favorableRate = _.mul(
        _.div(
          goodsItem.get('goodsFavorableCommentNum'),
          goodsItem.get('goodsEvaluateNum')
        ),
        100
      ).toFixed(0);
    }

    //评论数
    let evaluateNum = '暂无';
    const goodsEvaluateNum = goodsItem.get('goodsEvaluateNum');
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
    const goodsSalesNum = goodsItem.get('goodsSalesNum');
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
    if (!isSnapUpEndTime) {
      return '活动已结束';
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingBottom: 8
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    paddingRight: 0,
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb',
    backgroundColor: '#ffffff'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    paddingLeft: 10
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginLeft: 10
  },
  titleBox: {
    height: 34,
    marginBottom: 3
  },
  selfSales: {
    flexDirection: 'column',
    position: 'relative'
  },
  label: {
    position: 'absolute',
    left: 0
  },
  words: {
    color: 'rgba(255,255,255,0)'
  },
  title: {
    color: '#333',
    fontSize: 14,
    lineHeight: 16,
    //height: 32,
    marginBottom: 5,
    flexWrap: 'wrap'
  },
  gec: {
    color: '#999',
    fontSize: 10,
    marginBottom: 5
  },
  price: {
    fontSize: 15
  },
  imgBox: {
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
  goodsNum: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10,
    alignSelf: 'flex-end'
  },
  tagCon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 20,
    flex: 1,
    marginTop: 2,
    marginBottom: 2
  },
  assseTag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 2,
    paddingBottom: 2
  },
  assseText: {
    color: '#999999',
    fontSize: 10
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
    width: (screenWidth - 30) / 2 - 2
  },
  perBuyStatus: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center'
  },
  swipeout: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  swipeoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500'
  }
});
