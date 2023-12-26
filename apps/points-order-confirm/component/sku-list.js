import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  PixelRatio
} from 'react-native';

import { Relax, msg } from 'plume2';
import SelfSalesLabel from 'wmkit/biz/selfsales-label';
import WMImage from 'wmkit/image/index';
import { noop } from 'wmkit/noop';


@Relax
export default class SkuList extends Component {
  static relaxProps = {
    saveSessionStorage: noop
  };

  render() {
    const { supplier, tradeItem } = this.props.store;

    return (
      <View style={{ paddingHorizontal: 12 }}>
        <View style={styles.header}>
          {/* <Text allowFontScaling={false} style={[styles.title, { paddingRight: 2 }]}>
            订单{1}:
          </Text> */}
          {supplier.isSelf == true && <SelfSalesLabel />}
          <Text allowFontScaling={false}>{supplier.storeName}</Text>
        </View>
        <TouchableOpacity
          style={styles.limitImg}
          onPress={() => this._goToNext()}
        >
          <View style={styles.imgContent}>
            <WMImage
              style={styles.imgItem}
              key={Math.random()}
              src={tradeItem.pic}
            />
          </View>
          <View style={styles.rightContext}>
            <View style={styles.totalNum}>
              <Text allowFontScaling={false} style={styles.totalText}>
                1
              </Text>
            </View>
            <Image style={styles.arrow} source={require('../img/arrow.png')} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  /**
   * 查看商品清单
   * @private
   */
  _goToNext = () => {
    const { tradeItem } = this.props.store;
    this.props.relaxProps.saveSessionStorage('sku-list');
    msg.emit('router: goToNext', {
      routeName: 'PointsGoodsBill',
      params: {
        pointsGoodsId: tradeItem.pointsGoodsId,
        num: tradeItem.num
      }
    });
  };
}

const styles = StyleSheet.create({
  limitImg: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    // borderStyle: 'solid',
    // borderTopWidth: 1 / PixelRatio.get(),
    // borderTopColor: '#ebebeb',
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  imgContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  imgItem: {
    width: 55,
    height: 55,
    marginRight: 10,
    borderColor: '#ebebeb',
    borderWidth: 1 / PixelRatio.get()
  },
  rightContext: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  totalNum: {
    marginRight: 5
  },
  totalText: {
    color: '#333',
    fontSize: 14
  },
  header: {
    height: 40,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  title: {
    color: '#333333',
    fontSize: 14
  },
  delivery: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#ffffff'
    // borderBottomColor: '#ebebeb',
    // borderBottomWidth: 1 / PixelRatio.get()
  },
  payText: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20
  },
  arrow: {
    width: 7,
    height: 13,
    tintColor: '#333'
  }
});
