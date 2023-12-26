import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  PixelRatio,
  Alert
} from 'react-native';
import {debounce} from 'lodash';
import { Relax, msg } from 'plume2';
import SelfSalesLabel from 'wmkit/biz/selfsales-label';

import { noop } from 'wmkit/noop';
import WMImage from 'wmkit/image/index';


@Relax
export default class SkuList extends Component {
  static relaxProps = {
    saveSessionStorage: noop,
    stores: 'stores',
    goodsTotalNum: 'goodsTotalNum'
  };

  render() {
    const { store, index } = this.props;
    const { stores, goodsTotalNum } = this.props.relaxProps;
    const { supplier, tradeItems, gifts } = store;
    const allSkus = tradeItems.concat(gifts);
    const cartList = allSkus.filter((sku, index) => index < 4).map((sku) => {
      return {
        url: sku.pic
      };
    });

    return (
      <View>
        <View style={styles.header}>
          {supplier.isSelf == true && <SelfSalesLabel />}
          <Text allowFontScaling={false} style={styles.title}>{supplier.storeName}</Text>
        </View>
        <TouchableOpacity
          style={styles.limitImg}
          onPress={debounce(this._goToNext,500)}
        >
          <View style={styles.imgContent}>
            {cartList.map((v) => (
              <WMImage
                style={styles.imgItem}
                key={Math.random()}
                src={v.url}
              />
            ))}
          </View>
          <View style={styles.rightContext}>
            <View style={styles.totalNum}>
              <Text allowFontScaling={false} style={styles.totalText} numberOfLines={1}>
                {/* {allSkus.length} */}
                {goodsTotalNum}
              </Text>
            </View>
            <Image
              style={styles.arrow}
              source={require('../img/arrow.png')}
            />
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
    const { supplier } = this.props.store;
    this.props.relaxProps.saveSessionStorage('sku-list');
    msg.emit('router: goToNext', {
      routeName: 'GoodsBill',
      storeId: supplier.storeId
    });
  };
}

const styles = StyleSheet.create({
  header: {
    height: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 12
  },
  title: {
    paddingLeft: 4,
    color: 'rgba(0,0,0,0.8)',
    fontSize: 14,
    fontWeight: '500'
  },
  limitImg: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 76,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff'
  },
  imgContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  imgItem: {
    width: 56,
    height: 56,
    marginRight: 8,
    borderRadius: 6
  },
  rightContext: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1
  },
  totalNum: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    marginRight: 4
  },
  totalText: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 12,
    fontWeight: '500'
  },
  arrow: {
    width: 12,
    height: 12
  }
});
