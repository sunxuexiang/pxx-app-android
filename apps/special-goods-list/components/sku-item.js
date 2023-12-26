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
import { _, WMImage } from 'wmkit';
import { MarketingLabel, SelfSalesLabel, GoodsNum } from 'wmkit/biz';
import { priceColor, screenWidth, mainColor } from 'wmkit/styles';
import * as WMkit from 'wmkit/kit';
import SpecialLabel from '../../../wmkit/biz/special-label';
import Price from 'wmkit/price';

/**
 * Sku列表的item
 */
export default class SkuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  componentWillReceiveProps(nextProps) {
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

    // 社交电商相关内容显示与否
    const social = goodsInfo.distributionGoodsAudit == 2 ? true : false;
    const marketPrice = goodsInfo.specialPrice;
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
              {goodsInfo.goodsInfoType === 1 && <SpecialLabel/>}
            </View>
            <Text
              style={styles.title}
              allowFontSacling={false}
              numberOfLines={2}
            >
              {goodsInfo.companyType == 0 && (
                <Text style={styles.words}>占位 </Text>
              )}
              {goodsInfo.goodsInfoName}
            </Text>
            <Text style={styles.gec} allowFontSacling={false} numberOfLines={1}>
              {goodsInfo.goodsSubtitle || ''}
            </Text>
          </View>
          {/*销量 评价 好评率*/}
          {/* {this._saleInfo('small')} */}

          <View style={styles.tagCon}>
            {/* {goodsInfo.companyType == 0 && <SelfSalesLabel />} */}
            {!social &&
              (marketingLabels || couponLabels || grouponLabel) &&
              //  goodsInfo.goodsInfoType !==1 &&
               (
                <MarketingLabel
                  marketingLabels={marketingLabels}
                  couponLabels={couponLabels}
                  grouponLabel={grouponLabel}
                  noneStock={noneStock}
                />
              )}
          </View>
          <View style={styles.row}>
            <View style={styles.tagCon}>
              {social
                ? <Price price={marketPrice} bigPriceStyle={{fontSize:16}}/>
                : iepShowFlag ? <Price price={iepGoodsPrice} bigPriceStyle={{fontSize:16}}/>
                  : this._calShowPrice(goodsItem, buyCount)}
              {social &&
                isDistributor && (
                  <Text
                    style={[
                      styles.commission,
                      noneStock && { color: '#bcbcbc' }
                    ]}
                    allowFontScaling={false}
                  >
                    &nbsp;/&nbsp;赚
                    {_.addZero(goodsInfo.distributionCommission)}
                  </Text>
                )}
              {iepShowFlag &&
              <View style={styles.iepBoard}>
                <Text allowFontScaling={false} style={[styles.iepText, { backgroundColor: mainColor }]}>
                  {enterprisePriceName}
                </Text>
              </View>}
              {/* {noneStock && (
                <View style={styles.lack}>
                  <Text allowFontScaling={false} style={styles.lackText}>
                    缺货
                  </Text>
                </View>
              )} */}
            </View>
            {social && isDistributor ? (
              !noneStock && (
                <View style={styles.socialBtn}>
                  <TouchableOpacity
                    style={[styles.btnBox1, { borderColor: mainColor }]}
                    activeOpacity={0.8}
                    onPress={() =>
                      msg.emit('router: goToNext', {
                        routeName: 'GraphicMaterial',
                        goodsInfoId: goodsInfo.goodsInfoId
                      })
                    }
                  >
                    <Text allowFontScaling={false} style={[styles.btnText1, { color: mainColor }]}>发圈素材</Text>
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
                      this.props.saveCheckedSku(goodsItem.goodsInfo);
                    }}
                  >
                    <Text allowFontScaling={false} style={styles.btnText2}>分享赚</Text>
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
    const { goodsItem, isShow , iepSwitch,iepInfo} = this.state;
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

    // 社交电商相关内容显示与否
    const social = goodsInfo.distributionGoodsAudit == 2 ? true : false;
    const marketPrice = goodsInfo.specialPrice;

    // 企业购商品判断
    // iep属性
    const { iepInfo: info = {} } = iepInfo.toJS();
    // 企业价格名称
    const { enterprisePriceName } = info;
    const iepShowFlag = iepSwitch && !noneStock && !social && goodsInfo.enterPriseAuditStatus == 2;
    // 企业价
    const iepGoodsPrice = goodsInfo.enterPrisePrice;

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
              {goodsInfo.companyType == 0 && <SpecialLabel />}
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
          </View>

          {/*销量 评价 好评率*/}
          {/* {this._saleInfo('big')} */}

          <View style={styles.tagCon}>
            {/* {goodsInfo.companyType == 0 && <SelfSalesLabel />} */}
            {
            // goodsInfo.goodsInfoType !==1 &&
            (
              <MarketingLabel
                marketingLabels={goodsInfo.marketingLabels}
                couponLabels={goodsInfo.couponLabels}
                noneStock={noneStock}
              />
            )
            }
          </View>
          <View>
            <View style={styles.tagCon}>
              {social
                ? <Price price={marketPrice} bigPriceStyle={{fontSize:16}}/>
                : iepShowFlag ? <Price price={iepGoodsPrice} bigPriceStyle={{fontSize:16}}/>
                  : this._calShowPrice(goodsItem, buyCount)}
              {iepShowFlag &&
              <View style={styles.iepBoard}>
                <Text allowFontScaling={false} style={[styles.iepText, { backgroundColor: mainColor }]}>
                  {enterprisePriceName}
                </Text>
              </View>}
              {/* {noneStock && (
                <View style={styles.lack}>
                  <Text allowFontScaling={false} style={styles.lackText}>
                    缺货
                  </Text>
                </View>
              )} */}
            </View>
            {/*社交电商营销下大图列表不展示按钮*/}
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
      showPrice = goodsInfo.get('specialPrice') || 0;
    }
    return <Price price={showPrice} bigPriceStyle={{fontSize:16}}/>;
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
          <Text allowFontScaling={false} style={[styles.assseText, { paddingLeft: 0 }]}>
            {salesNum}
            销量
          </Text>
          <Text allowFontScaling={false} style={[styles.assseText, { paddingLeft: 20 }]}>
            {evaluateNum}
            评价
          </Text>
          <Text allowFontScaling={false} style={[styles.assseText, { paddingLeft: 20 }]}>
            {favorableRate}
            %好评
          </Text>
        </View>
      );
    } else {
      html = (
        <View style={styles.assseTag}>
          <Text allowFontScaling={false} style={[styles.assseText, { paddingLeft: 0 }]}>
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
        <Text allowFontScaling={false} style={[styles.assseText, { paddingLeft: 0 }]}>
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
    borderColor: '#ebebeb',
    borderRadius:7.5,
    backgroundColor:'#fff'
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
    borderRadius:2,
    paddingHorizontal:4,
  },
  iepText: {
    fontSize: 10,
    color: '#ffffff'
  },
  wrapper: {
    padding: 10
  },
  price: {
    color: priceColor
  },
  title: {
    color: '#333',
    fontSize: 14,
    lineHeight: 16,
    marginBottom: 5,
    flexWrap: 'wrap'
  },
  gec: {
    color: '#999',
    fontSize: 12,
    marginBottom: 5
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
});
