import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, PixelRatio } from 'react-native';
import { Relax } from 'plume2';
import * as _ from 'wmkit/common/util';
import * as WMkit from 'wmkit/kit';
import LevelTag from 'wmkit/level-tag';
import { priceColor } from 'wmkit/styles/index';

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
    goodsSpecs: 'goodsSpecs'
  };

  render() {
    const {
      goods,
      goodsInfo,
      goodsInfos,
      goodsIntervalPrices,
      goodsSpecs
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
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.box}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {/*
            * 1.阶梯价 且 (不允许独立设价 或 无规格商品) => 展示阶梯价
            * 2.其他情况 => 展示min价格 或 min ~ max价格 或
            */}
          {priceType === 1 &&
          (allowPriceSet === 0 || (!goodsSpecs || goodsSpecs.size === 0)) ? (
            this._showSpuIntervalPrices(goodsInfo, goodsIntervalPrices)
              .toJS()
              .map((p, k) => {
                return (
                  <View key={k} style={styles.boxItem}>
                    <Text allowFontScaling={false} style={[styles.price, {color: priceColor}]}>
                      ¥{_.addZero(p.price)}
                    </Text>

                    <Text allowFontScaling={false} style={styles.unit}>
                      ≥ {p.count}
                      {unit}
                    </Text>
                  </View>
                );
              })
          ) : minPrice === maxPrice ? (
            <Text allowFontScaling={false} style={[styles.price, {color: priceColor}]}>
              ¥{_.addZero(minPrice)}
            </Text>
          ) : (
            <Text allowFontScaling={false} style={[styles.price, {color: priceColor}]}>
              <Text allowFontScaling={false}>¥{_.addZero(minPrice)}</Text>
              <Text allowFontScaling={false}>
                ~¥
                {_.addZero(maxPrice)}
              </Text>
            </Text>
          )}

          {/* 阶梯价且(不允许独立设价 或 无规格商品) 不展示划线价, 其他情况根据划线是否存在展示划线价*/}
          {priceType === 1 &&
          (allowPriceSet === 0 || (!goodsSpecs || goodsSpecs.size === 0))
            ? null
            : lineShowPrice && (
                <Text style={styles.linePrice} allowFontScaling={false}>
                  ￥{_.addZero(lineShowPrice)}
                </Text>
              )}
        </ScrollView>

        {priceType === 1 && (
          <View style={styles.tagCon}>
            <LevelTag style={{ marginTop: 8 }} text="阶梯价3" />
          </View>
        )}
      </View>
    );
  }

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
            maxMarketPrice = info.get('marketPrice');
          } else {
            maxMarketPrice =
              info.get('marketPrice') > maxMarketPrice
                ? info.get('marketPrice')
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
        if (index === 0) {
          minPrice = info.get('salePrice');
          maxPrice = info.get('salePrice');
        } else {
          minPrice =
            info.get('salePrice') < minPrice ? info.get('salePrice') : minPrice;
          maxPrice =
            info.get('salePrice') > maxPrice ? info.get('salePrice') : maxPrice;
        }
      });
    }
    return { minPrice, maxPrice };
  };
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    marginHorizontal: 8,
    borderBottomColor: '#ebebeb',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  box: {
    paddingTop: 8,
    borderTopColor: '#ebebeb',
    borderTopWidth: 1 / PixelRatio.get()
  },
  tagCon: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  price: {
    fontSize: 15
  },
  unit: {
    color: '#999',
    fontSize: 14
  },
  linePrice: {
    marginTop: 2,
    paddingLeft: 5,
    color: '#999',
    fontSize: 13,
    textDecorationLine: 'line-through'
  },
  boxItem: {
    marginRight: 30
  }
});
