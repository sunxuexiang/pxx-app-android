import React, { Component } from 'react';
import { Image, PixelRatio, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { msg, Relax } from 'plume2';
import SelfSalesLabel from 'wmkit/biz/selfsales-label';

import { noop } from 'wmkit/noop';
import WMImage from 'wmkit/image/index';


@Relax
export default class SkuList extends Component {
  static relaxProps = {
    saveSessionStorage: noop,
    stores: 'stores',
  };

  render() {
    const { store } = this.props;
    const { stores } = this.props.relaxProps;
    const { supplier, tradeItems, gifts } = store;
    const allSkus = tradeItems.concat(gifts);
    const cartList = allSkus.filter((sku, index) => index < 4).map((sku) => {
      return {
        url: sku.pic,
      };
    });

    return (
      <View>
        <View style={styles.header}>
          {supplier.isSelf == true && <SelfSalesLabel />}
          <Text allowFontScaling={false} style={styles.title}>{supplier.storeName}</Text>
        </View>

        {/* 只有一个店铺显示明细 */}
        {stores.toJS() && stores.toJS().length == 1 ? (
          <TouchableOpacity
            style={styles.limitImg}
            onPress={() => this._goToNext()}
          >
            <View style={styles.middleDetail}>
              {allSkus
                .filter((val, index) => index < 4)
                .map((item) => {
                  return (
                    <View
                      style={styles.productItem}
                      key={Math.random().toString()}
                    >
                      <View style={styles.middleLeft}>
                        <Image
                          style={styles.img}
                          key={Math.random().toString()}
                          resizeMode={'contain'}
                          source={
                            item.pic
                              ? { uri: item.pic }
                              : require('../img/imgnone.png')
                          }
                        />
                      </View>
                      <View style={styles.rightContext}>
                        <View style={styles.totalNum}>
                          <Text allowFontScaling={false} style={styles.totalText}>
                            {item.num}
                          </Text>
                        </View>
                        <Image
                          style={styles.arrow}
                          source={require('../img/arrow.png')}
                        />
                      </View>
                    </View>
                  );
                })}
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.limitImg}
            onPress={() => this._goToNext()}
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
                <Text allowFontScaling={false} style={styles.totalText}>
                  {allSkus.length}
                </Text>
              </View>
              <Image
                style={styles.arrow}
                source={require('../img/arrow.png')}
              />
            </View>
          </TouchableOpacity>
        )}
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
      storeId: supplier.storeId,
      isFlashSale: true,
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
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  middleLeft: {
    flexDirection: 'row',
    width: '60%',
  },
  img: {
    width: 55,
    height: 55,
    marginRight: 10,
    borderColor: '#ebebeb',
    borderWidth: 1 / PixelRatio.get(),
  },
  middleDetail: {
    flex: 1,
  },
});
