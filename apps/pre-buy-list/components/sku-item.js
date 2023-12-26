import React from 'react';
import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { fromJS } from 'immutable';
import { msg } from 'plume2';
import * as _ from 'wmkit/common/util';
import WMImage from 'wmkit/image/index';
import { mainColor, screenWidth } from 'styles';
import moment from 'moment';
import CountDown from './count-down';
import Price from '../../../wmkit/price';
import * as WMkit from '../../../wmkit/kit';

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
    return this.small();
  }

  /**
   * 小图商品
   * @returns {XML}
   */
  small = () => {
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
    // 社交电商相关内容显示与否
    const social = goodsInfo.distributionGoodsAudit == 2 ? true : false;

    // 企业购商品判断
    // iep属性
    const { iepInfo: info = {} } = iepInfo.toJS();
    // 企业价格名称
    const { enterprisePriceName } = info;
    const iepShowFlag =
      iepSwitch &&
      !noneStock &&
      !social &&
      goodsInfo.enterPriseAuditStatus == 2;
    // 企业价
    const iepGoodsPrice = goodsInfo.enterPrisePrice;

    //积分价商品
    let buyPoint = goodsInfo.buyPoint;
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
    // 非积分商品
    if (!buyPoint && goodsItem.appointmentSaleGoodsInfo) {
      price = goodsItem.appointmentSaleGoodsInfo.price;
    }

    //预约
    let isAppointmentSale = false;
    //预售
    let isBookingSale = false;

    // 商品划线价
    // 会员价生效时，已登录情况下，商品详情页、规格弹窗会员价划市场价展示
    // 拼团、秒杀、预约、预售活动生效时，已登录+未登录情况下，商品详情页、规格弹窗划线价按照需求展示
    let linePrice =
      isAppointmentSale || isBookingSale ? goodsInfo.marketPrice : 0;
    return (
      <TouchableOpacity
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
          <WMImage style={styles.img} src={goodsInfo.goodsInfoImg} />
          {goodsInfo.goodsStatus != 0 && !buyPoint && (
            <View style={styles.notGoods}>
              <View style={styles.whiteBox}>
                <Text style={styles.notGoodsText} allowFontScaling={false}>
                  {goodsInfo.goodsStatus == 1 ? '缺货' : '失效'}
                </Text>
              </View>
            </View>
          )}
          {goodsItem.appointmentSaleInfo && !buyPoint && (
            <View
              style={[
                styles.perBuy,
                this.isBuyStatus(goodsItem.appointmentSaleInfo) == '活动已结束'
                  ? styles.preBuylistGray
                  : {}
              ]}
            >
              <Text style={styles.perBuyStatus}>
                {this.isBuyStatus(goodsItem.appointmentSaleInfo)}
              </Text>
            </View>
          )}
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

          <View style={styles.preBuystatus}>
            {this.isBuyStatus(goodsItem.appointmentSaleInfo) != '活动已结束' &&
              this.isBuyStatus(goodsItem.appointmentSaleInfo) != '抢购中' &&
              !buyPoint && (
                <View style={styles.timeFlex}>
                  <Text style={styles.saleType}>距开售</Text>
                  <CountDown
                    allowFontScaling={false}
                    numberOfLines={1}
                    groupFlag={false}
                    prelistFlag={true}
                    showTimeDays={true}
                    timeOffset={moment
                      .duration(
                        moment(
                          goodsItem.appointmentSaleInfo.snapUpStartTime
                        ).diff(moment(new Date()))
                      )
                      .asSeconds()
                      .toFixed(0)}
                  />
                </View>
              )}
          </View>
          {/*销量 评价 好评率*/}
          {this._saleInfo('small')}

          <View style={styles.row}>
            <View style={styles.tagCon}>
              <Price
                price={price}
                buyPoint={goodsInfo.buyPoint}
                linePrice={linePrice}
              />

              {iepShowFlag && (
                <View style={styles.iepBoard}>
                  <Text allowFontScaling={false} style={[styles.iepText, { backgroundColor: mainColor }]}>
                    {enterprisePriceName}
                  </Text>
                </View>
              )}
              {noneStock && (
                <View style={styles.lack}>
                  <Text allowFontScaling={false} style={styles.lackText}>
                    缺货
                  </Text>
                </View>
              )}
            </View>
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
    paddingLeft: 5,
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  bigView: {
    width: (screenWidth - 30) / 2,
    marginVertical: 5,
    marginHorizontal: 5,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#ebebeb'
  },
  bigimg: {
    width: (screenWidth - 30) / 2 - 2,
    height: (screenWidth - 30) / 2 - 2,
    marginBottom: 5
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
    height: 15,
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
    padding: 10
  },
  title: {
    color: '#000',
    fontSize: 14,
    lineHeight: 16,
    marginBottom: 3
  },
  gec: {
    color: '#333',
    fontSize: 13,
    marginBottom: 5,
    lineHeight: 15
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 8
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
  titBox: {
    height: 40
  },
  tagCon: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
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
    fontSize: 12
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
  imgBox: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  perBuy: {
    position: 'absolute',
    bottom: 0,
    width: 100,
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
  preBuylistGray: {
    backgroundColor: '#e2e2e2'
  },
  preBuystatus: {
    flexDirection: 'row'
  },
  timeFlex: {
    flexDirection: 'row',
    marginBottom: -7
  },
  saleType: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.4)',
    position: 'relative',
    top: 8,
    paddingRight: 8
  },
  notGoods: {
    position: 'absolute',
    width: 100,
    height: 100,
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(000,000,000,0.3)',
    borderRadius: 8
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
  }
});
