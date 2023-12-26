import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, PixelRatio } from 'react-native';
import { Relax } from 'plume2';

import * as WMkit from 'wmkit/kit';
import * as _ from 'wmkit/common/util';

import { priceColor } from 'wmkit/styles/index';
import Price from '../../../wmkit/price';

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
    const { goodsInfo } = this.props.relaxProps;

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.box}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <Price
              buyPoint={goodsInfo.get('buyPoint')}
              price={goodsInfo.get('salePrice')}
          />
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
