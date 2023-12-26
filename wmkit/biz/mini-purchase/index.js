import React, { Component } from 'react';
import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { msg } from 'plume2';

import {mainColor, priceColor} from 'wmkit/styles/index';
import { cache } from 'wmkit/cache';

/**
 * 商品列表和收藏列表用到的mini购物车
 */
export default class MiniPurchase extends Component {
  static defaultProps = {
    bottom: 60
  };

  state = {
    purchaseNum: 0
  };

  componentDidMount() {
    // 初次加载，主动获取数量
    this._getPurchaseNum();

    msg.on('purchaseNum:num', this._getPurchaseNum);
  }

  componentWillUnmount() {
    msg.off('purchaseNum:num', this._getPurchaseNum);
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.miniCart, { bottom: this.props.bottom }]}
        onPress={() =>
          msg.emit('router: goToNext', { routeName: 'PurchaseOrderWithoutBottom' })
        }
      >
        <Image style={styles.img} source={require('./img/cart.png')} />

        <View style={[styles.circle, { backgroundColor: mainColor }]}>
          <Text allowFontScaling={false} style={styles.num}>
            {this.state.purchaseNum}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  /**
   * 获取购物车数量
   * @param purchaseNum
   * @returns {Promise.<void>}
   * @private
   */
  _getPurchaseNum = async (purchaseNum) => {
    let num = purchaseNum;
    if (isNaN(num)) {
      try {
        const numberJson = await AsyncStorage.getItem(cache.PURCHASE_NUM);
        num = (numberJson && JSON.parse(numberJson).purchaseNum) || 0;
      } catch (e) {
        if (__DEV__) {
          console.error('mini-purchase', e);
        }
        num = 0;
      }
    }
    this.setState({ purchaseNum: num });
  };
}

const styles = StyleSheet.create({
  miniCart: {
    position: 'absolute',
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 48,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    zIndex: 98,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 8
  },
  img: {
    width: 20,
    height: 20
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 8,
    top: 10
  },
  num: {
    color: '#ffffff',
    fontSize: 8
  }
});
