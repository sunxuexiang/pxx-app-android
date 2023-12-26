import React from 'react';
import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { msg } from 'plume2';
import { _, WMImage, AddCart, WMkit } from 'wmkit';
import { MarketingLabel, SelfSalesLabel } from 'wmkit/biz';
import { screenWidth, mainColor } from 'wmkit/styles';
import SpecialLabel from '../../../wmkit/biz/special-label';
import Price from 'wmkit/price';

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

    // 会员价
    const salePrice = goodsInfo.salePrice || 0;
    // 最低的区间价
    const intervalMinPrice = goodsInfo.intervalMinPrice || 0;

    //特价的区间
    let skuList = goods.get('goodsInfos').toJS().sort((a,b) => {
      return a.specialPrice - b.specialPrice;
    });
    const minPrice = skuList[0].specialPrice ? skuList[0].specialPrice : '0';
    const maxPrice = skuList[skuList.length -1].specialPrice ? skuList[skuList.length -1].specialPrice : '0';

    // 划线价
    const linePrice = this._originPriceInfo(goodsInfo.linePrice,goodsInfo);
    // 社交电商相关内容显示与否
    const social = goodsInfo.distributionGoodsAudit == 2 ? true : false;
    //禁用分享赚
    const socialDisabled = false;

    // iep属性
    const { isIepAuth: iepSwitch, iepInfo: info = {} } = iepInfo.toJS();
    // 企业价格名称
    const { enterprisePriceName } = info;
    // 企业购商品判断
    const iepShowFlag = iepSwitch && !noneStock && !social && goodsInfo.enterPriseAuditStatus == 2;
    // 是否登录
    const loginFlag = window.token != undefined && window.token != '';

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
              {goods.get('goodsSubtitle') || ''}
            </Text>
          </View>
          {/*销量 评价 好评率*/}
          {/* {this._saleInfo('small')} */}

          <View style={styles.tagCon}>
            {/* {goodsInfo.companyType === 0 && <SelfSalesLabel />} */}
            {/* {goodsInfo.goodsInfoType === 1 && <SpecialLabel/>} */}
            {!social && 
            // goodsInfo.goodsInfoType !==1 &&
              (marketingLabels || couponLabels || grouponLabel) && (
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
              { minPrice == maxPrice ? (
                <>
                <Price price={minPrice} bigPriceStyle={{fontSize:16}}/>
                {linePrice && <Text style={styles.linePrice} allowFontScaling={false}>
                  ￥{_.addZero(linePrice)}
                </Text>}</>
              ) : (
                <>
                  <Price price={minPrice} bigPriceStyle={{fontSize:16}}/>~<Price price={maxPrice} bigPriceStyle={{fontSize:16}}/>
                  <Text style={styles.linePrice} allowFontScaling={false}>
                    ￥{_.addZero(linePrice)}
                  </Text>
                </>
              ) }
              {social &&
                isDistributor && (
                  <Text
                    style={[
                      styles.commission,
                      noneStock && { color: '#bcbcbc' }
                    ]}
                    allowFontScaling={false}
                  >
                    /&nbsp;赚
                    {_.addZero(goodsInfo.distributionCommission)}
                  </Text>
                )}
              {iepShowFlag &&
              <View style={styles.iepBoard}>
                <Text allowFontScaling={false} style={[styles.iepText, { backgroundColor: mainColor }]}>
                  {enterprisePriceName}
                </Text>
              </View>}
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
                      this.props.saveCheckedSku(goodsInfo);
                    }}
                  >
                    <Text allowFontScaling={false} style={styles.btnText2}>分享赚</Text>
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
    const { goods, spuAddCartFunc, sortFlag, iepInfo } = this.props;

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

    // 显示价格: 最低区间价 或 会员价
    const price =
      goodsInfo.priceType === 1
        ? _.addZero(intervalMinPrice)
        : _.addZero(salePrice);
    // 划线价
    const linePrice = this._originPriceInfo(goodsInfo.linePrice,goodsInfo);
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
    const iepShowFlag = iepSwitch && !noneStock && !social && goodsInfo.enterPriseAuditStatus == 2;

    //特价的区间
    let skuList = goods.get('goodsInfos').toJS().sort((a,b) => {
      return a.specialPrice - b.specialPrice;
    });
    const minPrice = skuList[0].specialPrice ? skuList[0].specialPrice : '0';
    const maxPrice = skuList[skuList.length -1].specialPrice ? skuList[skuList.length -1].specialPrice : '0';


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
        <View style={styles.imgContentBig}>
          <WMImage style={styles.bigimg} src={goodsInfo.goodsInfoImg} />
          {WMkit.isInvalid(goodsInfo) && (
            <View style={styles.notGoodsBig}>
              <View style={styles.whiteBox}>
                <Text style={styles.notGoodsText} allowFontScaling={false}>
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
                {goods.get('goodsSubtitle') || ''}
              </Text>
            </View>

          {/*销量 评价 好评率*/}
          {/* {this._saleInfo('big')} */}

          <View style={styles.tagCon}>
            {/* {goodsInfo.companyType === 0 && <SelfSalesLabel />}
            {goodsInfo.goodsInfoType === 1 && <SpecialLabel/>} */}
            {(marketingLabels || couponLabels || grouponLabel) &&
            //  goodsInfo.goodsInfoType !==1 &&
             (
              <MarketingLabel
                marketingLabels={goodsInfo.marketingLabels}
                couponLabels={couponLabels}
                grouponLabel={grouponLabel}
                noneStock={noneStock}
              />
            )}
          </View>

          <View style={styles.row}>
            <View style={styles.tagCon}>
              { minPrice == maxPrice ? (
                <>
                <Price price={minPrice} bigPriceStyle={{fontSize:16}}/>
                {linePrice && <Text style={styles.linePrice} allowFontScaling={false}>
                  ￥{_.addZero(linePrice)}
                </Text>}</>
              ) : (
                <>
                  <Price price={minPrice} bigPriceStyle={{fontSize:16}}/>~<Price price={maxPrice} bigPriceStyle={{fontSize:16}}/>
                  <Text style={styles.linePrice} allowFontScaling={false}>
                    ￥{_.addZero(linePrice)}
                  </Text>
                </>
              ) }
              {social &&
                isDistributor && (
                  <Text
                    style={[
                      styles.commission,
                      noneStock && { color: '#bcbcbc' }
                    ]}
                    allowFontScaling={false}
                  >
                    /&nbsp;赚
                    {_.addZero(goodsInfo.distributionCommission)}
                  </Text>
                )}
              {iepShowFlag &&
              <View style={styles.iepBoard}>
                <Text allowFontScaling={false} style={[styles.iepText, { backgroundColor: mainColor }]}>
                  {enterprisePriceName}
                </Text>
              </View>
              }
            </View>
            {/*社交电商营销下大图列表不展示按钮*/}
            <View
                style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
              >
              <AddCart
                disableAdd={noneStock}
                skuId={goodsInfo.goodsInfoId}
                spuAddCartFunc={spuAddCartFunc}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
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
   * 获取是否展示划线价,以及划线价
   *   a.若划线价存在,则展示
   *   b.若划线价不存在
   *     b.1.登录前,不展示
   *     b.2.登陆后,展示sku市场价
   */
  _originPriceInfo = (linePrice, goodsInfoIm) => {
    if (linePrice) {
      return linePrice;
    } else {
      /*if (WMkit.isLoginOrNotOpen()) {
        return goodsInfoIm.marketPrice;
      } else {
        return null;
      }*/
      return null;
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
    height: (screenWidth - 30) / 2 - 2
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
    borderRadius:2,
    paddingHorizontal:4

  },
  iepText: {
    fontSize: 10,
    color: '#ffffff'
  },
  wrapper: {
    padding: 10
  },
  title: {
    color: '#333',
    fontSize: 14,
    lineHeight: 16,
    marginBottom: 5,
    flexWrap: 'wrap'
  },
  words: {
    color: 'rgba(255,255,255,0)'
  },
  gec: {
    color: '#999',
    fontSize: 12,
    marginBottom: 5
  },
  img: {
    width: 128,
    height: 128,
    borderRadius: 6
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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    alignItems: 'flex-start',
    minHeight: 128,
    paddingVertical: 8,
    paddingTop:10,
    backgroundColor: '#fff'
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb'
  },
  selfSales: {
    flexDirection: 'column',
    position: 'relative'
  },
  label: {
    position: 'absolute',
    left: 0,
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
    marginTop: 2
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
  linePrice: {
    fontSize: 10,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 10,
    textAlignVertical: 'center'
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
  imgContent: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  notGoodsBig: {
    position: 'absolute',
    width: (screenWidth - 30) / 2 - 2,
    height: (screenWidth - 30) / 2 - 2,
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(000,000,000,0.3)',
    borderRadius: 6
  },
  imgContentBig: {
    width: (screenWidth - 30) / 2 - 2,
    height: (screenWidth - 30) / 2 - 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  }

});
