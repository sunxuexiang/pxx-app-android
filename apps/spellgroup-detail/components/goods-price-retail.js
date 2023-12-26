import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, PixelRatio,TouchableOpacity,Image } from 'react-native';
import { Relax } from 'plume2';

import * as _ from 'wmkit/common/util';
import * as WMkit from 'wmkit/kit';
import { noop } from 'wmkit/noop';
import { priceColor } from 'wmkit/styles/index';

/**
 * 零售销售类型-价格展示
 */
@Relax
export default class GoodsPriceRetail extends Component {
  static relaxProps = {
    goodsInfo: 'goodsInfo',
    goodsInfos: 'goodsInfos',
    goods: 'goods',
    isDistributor:'isDistributor',
    follow: 'follow',
    changeFollow: noop,
    init: noop
  };

  render() {
    const { goodsInfo, goods,isDistributor,follow } = this.props.relaxProps;
    //划线价
    const lineShowPrice = this._originPriceInfo(
      goods.get('linePrice'),
      goodsInfo
    );
    return (
      <View style={styles.container}>
        <View
          style={styles.box}
        >
          <View style={styles.row}>
            <Text allowFontScaling={false} style={[styles.price, { color: priceColor }]}>
              <Text style={{fontSize:14}}>¥</Text>{_.addZero(goodsInfo.get('grouponPrice'))}
            </Text>
            {!!lineShowPrice && (
              <Text style={styles.linePrice} allowFontScaling={false}>
                ￥{_.addZero(lineShowPrice)}
              </Text>
            )}
          </View>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.barItem}
            onPress={() => this.collect()}
          >
            {follow ? (
              <Image style={styles.img} source={require('wmkit/theme/hert.png')} />
            ) : (
              <Image
                style={[styles.img, { tintColor: '#333' }]}
                source={require('../img/brokenheart.png')}
              />
            )}
            <Text
              allowFontScaling={false}
              style={[
                styles.barItemText,
                follow ? styles.barItemTextActive : {}
              ]}
            >
              {follow ? '已收藏' : '收藏'}
            </Text>
          </TouchableOpacity>
        </View>
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
    paddingVertical: 8,
    paddingBottom: 0,
    paddingHorizontal: 12,
    backgroundColor:"#fff"
  },
  box: {
    justifyContent: 'space-between'
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  linePrice: {
    paddingLeft: 5,
    color: '#999',
    fontSize: 10,
    textDecorationLine: 'line-through',
    top: 13
  },
  row:{
    flexDirection:'row'
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
});
