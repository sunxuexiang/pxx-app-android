import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
  TouchableOpacity,
  Image
} from 'react-native';
import { Relax, msg } from 'plume2';
import * as _ from 'wmkit/common/util';
import * as WMkit from 'wmkit/kit';
import LevelTag from 'wmkit/level-tag';
import WMImage from 'wmkit/image/index';
import { noop } from 'wmkit/noop'; 
import MarketingLabel from 'wmkit/biz/marketing-label';
import { marketOne } from '../kit';
import AsyncStorage from '@react-native-community/async-storage';
import { priceColor, mainColor } from 'wmkit/styles/index';

/**
 * 批发销售类型-价格展示
 */
@Relax
export default class GoodsPriceWholesale extends Component {
  static relaxProps = {
    goods: 'goods',
    goodsInfo: 'goodsInfo',
    goodsInfos: 'goodsInfos',
    goodsIntervalPrices: 'goodsIntervalPrices',
    goodsSpecs: 'goodsSpecs',
    follow: 'follow',
    changeFollow: noop
  };
  constructor(props) {
    super(props);
  }


  render() {
    const {
      goods,
      goodsInfo,
      goodsInfos,
      goodsIntervalPrices,
      goodsSpecs,
      follow
    } = this.props.relaxProps;

    //设价类型（0：客户，1：订货量 3：市场价）
    const priceType = goods.get('priceType');
    //是否允许独立设价
    const allowPriceSet = goods.get('allowPriceSet');
    //划线价
    const lineShowPrice = this._wholeSalePriceInfo(
      goods.get('linePrice'),
      goodsInfos
    );
    //最低,最高价格
    const { minPrice, maxPrice } = this._getMinMaxPrice(goods, goodsInfos);
    const unit = goods.get('goodsUnit');
    // 是否登录
    const loginFlag = window.token != undefined && window.token != '';
   const marketingLabels = goodsInfo.toJS().marketingLabels
    return (
      <View style={styles.container}>
        <View
          style={styles.box}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ flexDirection: 'row' }}>
            {/*
             * 1.阶梯价 且 (不允许独立设价 或 无规格商品) => 展示阶梯价
             * 2.其他情况 => 展示min价格 或 min ~ max价格 或
             */}
            {priceType === 1 &&
            (allowPriceSet === 0 || !goodsSpecs || goodsSpecs.size === 0) ? (
              this._showSpuIntervalPrices(goodsInfo, goodsIntervalPrices)
                .toJS()
                .map((p, k) => {
                  return (
                    <View key={k} style={styles.boxItem}>
                      <Text
                        allowFontScaling={false}
                        style={[styles.price, { color: priceColor }]}
                      >
                        <Text style={[styles.symbol, { color: priceColor }]}>
                          ¥
                        </Text>
                        {_.addZero(p.price)}
                      </Text>

                      <Text allowFontScaling={false} style={styles.unit}>
                        ≥ {p.count}
                        {unit}
                      </Text>
                    </View>
                  );
                })
            ) : minPrice === maxPrice ? (
              <Text
                allowFontScaling={false}
                style={[styles.price, { color: priceColor }]}
              >
                <Text style={[styles.symbol, { color: priceColor }]}>¥</Text>
                {_.addZero(minPrice)}
              </Text>
            ) : (
              <Text
                allowFontScaling={false}
                style={[styles.price, { color: priceColor }]}
              >
                <Text allowFontScaling={false}>¥{_.addZero(minPrice)}</Text>
                <Text allowFontScaling={false}>
                  ~¥
                  {_.addZero(maxPrice)}
                </Text>
              </Text>
            )}

            {/* 阶梯价且(不允许独立设价 或 无规格商品) 不展示划线价, 其他情况根据划线是否存在展示划线价*/}
            {priceType === 1 &&
            (allowPriceSet === 0 ||
              !goodsSpecs ||
              goodsSpecs.size === 0) ? null : lineShowPrice != null ? (
              <Text style={styles.linePrice} allowFontScaling={false}>
                ￥{_.addZero(lineShowPrice)}
              </Text>
            ) : null}
            {goods.get('goodsType') === 2 && (
              <Text style={styles.specialPrice}>特价</Text>
            )}
            {marketingLabels.length>0 && (
              <View style={styles.tagMain}>
              <MarketingLabel
                marketingLabels={ marketingLabels || []}
                isFlashFlag={false}
                isSocial={false}
                labelType={'goodsDetails'}
              />
              </View>
            )}
          </View>

          <TouchableOpacity
            activeOpacity={1}
            style={styles.barItem}
            onPress={() => this.collect()}
          >
            {follow ? (
              <Image
                style={[styles.img, { tintColor: mainColor }]}
                source={require('wmkit/theme/hert.png')}
              />
            ) : (
              <Image
                style={[styles.img, { tintColor: '#333' }]}
                source={require('../img/brokenheart.png')}
              />
            )}
            <Text
              allowFontScaling={false}
              style={[styles.barItemText, follow ? { color: mainColor} : {}]}
            >
              {follow ? '已收藏' : '收藏'}
            </Text>
          </TouchableOpacity>
        </View>

        {priceType === 1 && (
          <View style={styles.tagCon}>
            <LevelTag style={{ marginTop: 8 }} text="阶梯价3" />
          </View>
        )}
      </View>
    );
  }


  collect = () => {
    const {
      follow,
      changeFollow,
      goodsInfo,
      init,
      goods,
      goodsInfos
    } = this.props.relaxProps;
    let saleType = goods.get('saleType');
    if (WMkit.isLoginOrNotOpen()) {
      changeFollow(
        !follow,
        saleType == 0
          ? goodsInfos.get(0).get('goodsInfoId')
          : goodsInfo.get('goodsInfoId')
      );
    } else {
      msg.emit('loginModal:toggleVisible', {
        callBack: () => init(goodsInfo.get('goodsInfoId'))
      });
    }
  };

  //批发销售类型，计算划线价
  _wholeSalePriceInfo = (linePrice, goodsInfos) => {
    if (linePrice) {
      return linePrice;
    } else {
      /*if (WMkit.isLoginOrNotOpen()) {
        // 已登录时,找出最高的市场价
        let maxMarketPrice = null;
        goodsInfos.forEach((info, index) => {
          if (index === 0) {
            maxMarketPrice = info.get('salePrice');
          } else {
            maxMarketPrice =
              info.get('salePrice') > maxMarketPrice
                ? info.get('salePrice')
                : maxMarketPrice;
          }
        });
        return maxMarketPrice;
      } else {
        return null;
      }*/
      return null;
    }
  };

  /**
   * 批发类型,订货量设价,不允许独立设价时展示spu统一的阶梯价格
   * @private
   */
  _showSpuIntervalPrices = (goodsInfo, goodsIntervalPrices) => {
    const prices = goodsIntervalPrices
      .filter((pri) => pri.get('type') === 0)
      .map((interPri) => {
        return {
          id: interPri.get('intervalPriceId'),
          price: interPri.get('price'),
          count: interPri.get('count')
        };
      })
      .sortBy((pri) => pri.count);
    return prices;
  };

  /**
   * 获取最低,最高价
   * @param goods
   * @param goodsInfos
   * @private
   */
  _getMinMaxPrice = (goods, goodsInfos) => {
    let minPrice = 0;
    let maxPrice = 0;
    if (goods.get('priceType') === 1) {
      //是否有按订货量区间设价
      goodsInfos.forEach((info, index) => {
        if (index === 0) {
          minPrice = info.get('intervalMinPrice');
          maxPrice = info.get('intervalMaxPrice');
        } else {
          minPrice =
            info.get('intervalMinPrice') < minPrice
              ? info.get('intervalMinPrice')
              : minPrice;
          maxPrice =
            info.get('intervalMaxPrice') > maxPrice
              ? info.get('intervalMaxPrice')
              : maxPrice;
        }
      });
    } else {
      goodsInfos.forEach((info, index) => {
        if (info.get('goodsInfoType') == 1) {
          if (index === 0) {
            minPrice = info.get('specialPrice');
            maxPrice = info.get('specialPrice');
          } else {
            minPrice =
              info.get('specialPrice') < minPrice
                ? info.get('specialPrice')
                : minPrice;
            maxPrice =
              info.get('specialPrice') > maxPrice
                ? info.get('specialPrice')
                : maxPrice;
          }
        } else {
          if (index === 0) {
            minPrice = info.get('salePrice');
            maxPrice = info.get('salePrice');
          } else {
            minPrice =
              info.get('salePrice') < minPrice
                ? info.get('salePrice')
                : minPrice;
            maxPrice =
              info.get('salePrice') > maxPrice
                ? info.get('salePrice')
                : maxPrice;
          }
        }
      });
    }
    return { minPrice, maxPrice };
  };
}

const styles = StyleSheet.create({
  tagMain: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    paddingVertical: 8,
    paddingBottom: 0,
    paddingHorizontal: 8,
    backgroundColor: '#fff'
  },
  box: {
    justifyContent: 'space-between'
  },
  tagCon: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  unit: {
    color: '#999',
    fontSize: 14
  },
  linePrice: {
    marginTop: 2,
    paddingLeft: 5,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 10,
    textDecorationLine: 'line-through',
    top: 13
  },
  specialPrice: {
    //    marginTop: 2,
    paddingLeft: 5,
    color: '#228B22',
    fontSize: 16,
    top: 10,
    fontWeight: 'bold'
  },
  boxItem: {
    marginRight: 30
  },
  barItem: {
    width: 68,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftColor: '#ebebeb',
    borderLeftWidth: 1 / PixelRatio.get(),
    flexDirection: 'row',
    backgroundColor: 'rgba(245, 245, 245, 1)',
    borderRadius: 13,
    height: 24,
    top: 5,
    position: 'absolute',
    right: 0
  },
  img: {
    width: 12,
    height: 12,
    marginRight: 4
  },
  barItemText: {
    color: '#333',
    fontSize: 12
  },
  symbol: {
    fontSize: 10
  },
  tag: {
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    marginRight: 8,
    marginLeft: 12,
    borderWidth: 1,
    borderRadius: 2
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500'
  }
});
