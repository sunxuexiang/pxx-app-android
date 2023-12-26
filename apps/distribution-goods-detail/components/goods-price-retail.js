import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, PixelRatio } from 'react-native';
import { Relax } from 'plume2';

import * as _ from 'wmkit/common/util';
import * as WMkit from 'wmkit/kit';

import { priceColor } from 'wmkit/styles/index';

/**
 * 零售销售类型-价格展示
 */
@Relax
export default class GoodsPriceRetail extends Component {
  static relaxProps = {
    goodsInfo: 'goodsInfo',
    goods: 'goods',
    isDistributor: 'isDistributor'
  };

  render() {
    const { goodsInfo, goods, isDistributor } = this.props.relaxProps;
    //划线价
    const lineShowPrice = this._originPriceInfo(
      goods.get('linePrice'),
      goodsInfo
    );
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.box}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <Text allowFontScaling={false} style={styles.price}>
            <Text allowFontScaling={false}>¥{_.addZero(goodsInfo.get('salePrice'))}</Text>
          </Text>
          {!!lineShowPrice && (
            <Text style={styles.linePrice} allowFontScaling={false}>
              ￥{_.addZero(lineShowPrice)}
            </Text>
          )}
          {isDistributor &&
            goodsInfo.get('distributionGoodsAudit') == '2' && (
              <Text allowFontScaling={false}>
                /赚
                {_.addZero(goodsInfo.get('distributionCommission'))}元
              </Text>
            )}
        </ScrollView>
      </View>
    );
  }

  _originPriceInfo = (linePrice, goodsInfoIm) => {
    if (linePrice) {
      return linePrice;
    } else {
      /*if (WMkit.isLoginOrNotOpen()) {
        return goodsInfoIm.get('marketPrice');
      } else {
        return null;
      }*/
      return null;
    }
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
  price: {
    color: priceColor,
    fontSize: 15
  },
  linePrice: {
    marginTop: 2,
    paddingLeft: 5,
    color: '#999',
    fontSize: 13,
    textDecorationLine: 'line-through'
  }
});
