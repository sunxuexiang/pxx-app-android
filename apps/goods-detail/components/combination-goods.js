import React, { Component } from 'react';
import { Relax, msg } from 'plume2';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { _ } from 'wmkit';
import { mainColor, screenWidth } from 'styles';

@Relax
export default class CombinationGoods extends Component {
  static relaxProps = {
    marketingSuits: 'marketingSuits',
    goodsInfo: 'goodsInfo',

  };

  render() {
    const { marketingSuits, goodsInfo } = this.props.relaxProps;
    const skuId = goodsInfo ? goodsInfo.get('goodsInfoId') : '';
    const num = marketingSuits && marketingSuits.length;
    const suitInfo = num > 0 && marketingSuits[0].marketingSuitsGoodsInfoDetailVO;
    return (
      num > 0 && <TouchableOpacity style={styles.combinationGoods} activeOpacity={0.8}
        onPress={() => {
          msg.emit('router: goToNext', {
            routeName: 'CombinationGoods',
            skuId: skuId
          });
        }}>
        <View style={styles.combinationTitle}
        >
          <Text style={styles.titleText} >该商品有{num}个优惠套装</Text>
          <Image source={require('../img/more.png')} style={styles.moreIcon} />
        </View>
        <View style={styles.combinationBlock} >
          <Image
            source={suitInfo&&suitInfo.mainImage?{uri:suitInfo.mainImage}:require('../img/none.png')}
            style={styles.combinationImg}
          />
          <View style={styles.comInfo}>
            <Text style={styles.comInfoName} numberOfLines={2} allowFontScaling={false}>
              {suitInfo && suitInfo.marketingName} </Text>
            <Text style={[styles.price, { color: mainColor }]}>￥{_.addZero(suitInfo && suitInfo.suitsPrice)}</Text>
            <Text style={styles.bottomPrice}>
              最高省
              <Text style={[styles.yellow, { color: mainColor }]}>￥{_.addZero(suitInfo && suitInfo.suitsNoNeedPrice)}
              </Text>
            </Text> 
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  combinationGoods: {
    paddingHorizontal: 12,
    marginBottom: 10,
    borderBottomColor: '#EEE',
    borderBottomWidth: 0.5,
    paddingBottom: 16,
    backgroundColor: '#fff'
  },
  moreIcon: {
    width: 16,
    height: 16
  },
  combinationImg: {
    width: 72,
    height: 72,
    borderRadius: 6,
    marginRight: 12
  },
  comInfo: {
    flex: 1
  },
  comInfoName: {
    fontWeight: '500',
    fontSize: 12,
    marginBottom: 6,
    lineHeight: 16,
  },
  bottomPrice: {
    fontSize: 10,
    color: '#999',
    marginTop: 2
  },
  yellow: {
    fontSize: 10
  },
  combinationTitle: {
    paddingVertical: 16,
    fontSize: 14,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  combinationBlock: {
    flexDirection: 'row'
  },
  price: {
    fontSize: 16

  }

  //     .combination - block {
  //   flex- direction: row;

  //     .com - info {
  //   flex: 1;
  // }
  //       }
  // margin - bottom: 32px;
  //     }
  //   },

});
