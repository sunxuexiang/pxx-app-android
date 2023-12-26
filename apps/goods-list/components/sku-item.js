import React from 'react';
import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { fromJS } from 'immutable';
import { msg } from 'plume2';
import * as _ from 'wmkit/common/util';
import WMImage from 'wmkit/image/index';
import Price from 'wmkit/price';
import GoodsNum from 'wmkit/biz/goods-num';
import MarketingLabel from 'wmkit/biz/marketing-label';
import SelfSalesLabel from 'wmkit/biz/selfsales-label';
import { screenWidth, mainColor } from 'wmkit/styles/index';
import LinearGradient from 'react-native-linear-gradient';
import * as WMkit from 'wmkit/kit';
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
      isShow,
      // 是否是分销员
      isDistributor,
      iepInfo,
      iepSwitch
    } = this.state;

    // skuId
    const id = goodsItem.id;
    // sku信息
    const goodsInfo = goodsItem.goodsInfo;
    const goodsLabels = goodsItem.goodsLabels;
    const stock = goodsInfo.stock;
    // 起订量
    const count = goodsInfo.count || 0;
    // 库存等于0或者起订量大于剩余库存
    const noneStock = stock <= 0 || (count > 0 && count > stock);
    const buyCount = noneStock ? 0 : goodsInfo.buyCount || 0;

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

    //积分价商品
    let buyPoint = goodsInfo.buyPoint;

    // 社交电商相关内容显示与否
    const social = goodsInfo.distributionGoodsAudit == 2 ? true : false;

    //禁用分享赚
    const socialDisabled = false;

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

    // 商品划线价
    // 会员价生效时，已登录情况下，商品详情页、规格弹窗会员价划市场价展示
    // 拼团、秒杀、预约、全款预售活动生效时，已登录+未登录情况下，商品详情页、规格弹窗划线价按照需求展示
    let linePrice = isFlashFlag
        ? goodsInfo.marketPrice
        : 0;

    //是否展示营销活动标签
    let showFlag = true;
    let showMatketingFlag = true;
    if (buyPoint || isFlashFlag) {
      showFlag = false;
    }

    // 是否登录
    const loginFlag = window.token != undefined && window.token != '';

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
          <View style={styles.imgContent}>
            <WMImage style={styles.img} src={goodsInfo.goodsInfoImg && `${goodsInfo.goodsInfoImg}?x-oss-process=image/format,jpg/interlace,1,image/resize,m_mfit,w_200,h_200`} />
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
              {goodsInfo.goodsSubtitle || ''}
            </Text>
            {goodsLabels && (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  marginVertical:3
                }}
              >
                {goodsLabels.map((item) => {
                  return (
                    <WMImage
                      key={item.id}
                      style={{ width: 20, height: 20, marginHorizontal:3 }}
                      src={JSON.parse(item.image)[0].url}
                    />
                  );
                })}
              </View>
            )}
          </View>
          <View style={styles.tagCon}>
            {/* {goodsInfo.companyType == 0 && <SelfSalesLabel />} */}
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
                bigPriceStyle={{fontSize:16}}
              />
              {!buyPoint && iepShowFlag && (
                <View style={styles.iepBoard}>
                  <Text allowFontScaling={false} style={[styles.iepText, { backgroundColor: mainColor }]}>
                    {enterprisePriceName}
                  </Text>
                </View>
              )}
            </View>
            { social && isDistributor && !buyPoint ? (
              !noneStock &&
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
                      this.props.saveCheckedSku(goodsItem.goodsInfo);
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
              <GoodsNum
                goodsInfoId={id}
                value={buyCount}
                max={stock}
                addStep={1}
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
   * @param esGoodsItem
   * @returns {XML}
   */
  big = () => {
    const {
      goodsItem,
      // 是否是分销员
      isDistributor,
      isShow,
      iepSwitch,
      iepInfo
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
    // 营销标签
    const marketingLabels = goodsInfo.marketingLabels;
    const goodsLabels = goodsItem.goodsLabels
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
    //积分
    let buyPoint = goodsInfo.buyPoint;
    // 社交电商相关内容显示与否
    const social = goodsInfo.distributionGoodsAudit == 2 ? true : false;
    if (social) {
      goodsInfo.salePrice = goodsInfo.marketPrice;
      goodsInfo.priceType = 2;
    }

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

    // 商品划线价
    // 会员价生效时，已登录情况下，商品详情页、规格弹窗会员价划市场价展示
    // 拼团、秒杀、预约、全款预售活动生效时，已登录+未登录情况下，商品详情页、规格弹窗划线价按照需求展示
    let linePrice = isFlashFlag
        ? goodsInfo.marketPrice
        : 0;

    //是否展示拼团活动标签
    let showFlag = true;
    let showMatketingFlag = true;
    if (buyPoint || isFlashFlag) {
      showFlag = false;
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
            skuId: goodsInfo.goodsInfoId
          })
        }
      >
        <View style={styles.bigImgBox}>
          <WMImage style={styles.bigImg} src={goodsInfo.goodsInfoImg&&`${goodsInfo.goodsInfoImg}?x-oss-process=image/format,jpg/interlace,1,image/resize,m_mfit,w_300,h_300`} />
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

        <View style={styles.wrapper}>
          <View style={styles.selfSales}>
            <View style={styles.label}>
              {goodsInfo.companyType == 0 && <SelfSalesLabel />}
            </View>
            <Text
              style={styles.title}
              allowFontScaling={false}
              numberOfLines={1}
            >
              {goodsInfo.companyType == 0 && (
                <Text style={styles.words}>占位 </Text>
              )}
              {goodsInfo.goodsInfoName}
            </Text>
            <Text style={styles.gec} allowFontScaling={false} numberOfLines={1}>
              {goodsInfo.goodsSubtitle || ''}
            </Text>
            {goodsLabels && (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  marginVertical:3
                }}
              >
                {goodsLabels.map((item) => {
                  return (
                    <WMImage
                      key={item.id}
                      style={{ width: 20, height: 20, marginHorizontal:3 }}
                      src={JSON.parse(item.image)[0].url}
                    />
                  );
                })}
              </View>
            )}
          </View>
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
              bigPriceStyle={{fontSize:16}}
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
          {/* {this._saleInfo('big')} */}

          <View>
            {/*社交电商营销下大图列表不展示按钮*/}
            { social && isDistributor && !buyPoint ? (
              !noneStock &&
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
                      this.props.saveCheckedSku(goodsItem.goodsInfo);
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
              <View style={styles.socialBtn}>
                <GoodsNum
                  goodsInfoId={id}
                  value={buyCount}
                  max={stock}
                  addStep={1}
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

  /**
   * 数量修改后的方法,用于修改购买数量,响应变化对应的阶梯价格
   * @private
   */
  _afterChangeNum = (num) => {
    const goodsItem = this.state.goodsItem;
    goodsItem.goodsInfo.buyCount = num;
    this.setState({
      goodsItem: goodsItem
    });
  };
  /**
   * 存储推荐列表已阅读的商品信息
   *
   */
  saveRecomInfo = (item, buyCount) => {
    const goodsItem = this.state.goodsItem;
    let obj = {
      price: this._calShowPrice(goodsItem, buyCount),
      title: item.goodsInfoName,
      img: item.goodsInfoImg
    };

    //存储推荐列表已阅读的商品信息
    AsyncStorage.setItem('recomInfo', JSON.stringify(obj));
    msg.emit('router: goToNext', {
      routeName: 'GoodsDetail',
      skuId: item.goodsInfoId
    });
  };
}

const styles = StyleSheet.create({
  bigView: {
    width: (screenWidth - 30) / 2,
    marginVertical: 6,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 6
  },
  bigImgBox: {
    width: (screenWidth - 30) / 2,
    height: (screenWidth - 30) / 2,
    marginBottom: 5
  },
  bigImg: {
    width: (screenWidth - 30) / 2,
    height: (screenWidth - 30) / 2,
    borderRadius: 6
  },
  bignotGoods: {
    position: 'absolute',
    width: (screenWidth - 30) / 2,
    height: (screenWidth - 30) / 2,
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
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
    padding: 12,
    height: 145,
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
    padding: 12,
    paddingBottom: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#fff'
  },
  content: {
    height: 128,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingVertical: 8,
    paddingTop:10,
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
    fontSize: 12,
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
  titBox: {
    height: 40,
    flexDirection: 'row'
  },
  tagCon: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: 20,
    // marginTop: 2,
    // marginBottom: 2,
    // flexWrap:'wrap',
    overflow: 'hidden'
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
  commission: {
    marginLeft: 3,
    color: '#333',
    fontSize: 12
  },
  socialBtn: {
    position:'absolute',
    bottom:0,
    right:0,
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
  imgBox: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
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
  }
});
