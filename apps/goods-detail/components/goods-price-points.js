import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, PixelRatio } from 'react-native';
import { Relax } from 'plume2';

import * as _ from 'wmkit/common/util';
import { priceColor } from 'wmkit/styles/index';

/**
 * 积分商品-价格展示
 */
@Relax
export default class GoodsDetailPricePoints extends Component {
  static relaxProps = {
    pointsGoods: 'pointsGoods'
  };

  render() {
    const { pointsGoods } = this.props.relaxProps;
    // 是否登录
    const loginFlag = window.token != undefined && window.token != '';

    return (
      <View style={styles.container}>
        {pointsGoods ? (
          <ScrollView style={styles.box} showsHorizontalScrollIndicator={false}>
            <Text allowFontScaling={false} style={[styles.price, { color: priceColor }]}>
              {pointsGoods.get('points')}
              积分
            </Text>
            <Text style={styles.linePrice} allowFontScaling={false}>
              市场价￥
              {pointsGoods.get('goodsInfo')
                ? _.addZero(pointsGoods.get('goodsInfo').get('marketPrice'))
                : '0.00'}
            </Text>
          </ScrollView>
        ) : (
          ''
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    marginHorizontal: 8,
    borderBottomColor: '#ebebeb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    borderTopColor: '#ebebeb',
    borderTopWidth: 1 / PixelRatio.get(),
    alignItems: 'center'
  },
  price: {
    fontSize: 15
  },
  linePrice: {
    color: '#999',
    fontSize: 13
  },
  distCommission: {
    color: '#333',
    fontSize: 12
  }
});
