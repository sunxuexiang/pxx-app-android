import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text, PixelRatio } from 'react-native';
import { StoreProvider } from 'plume2';
import { fromJS } from 'immutable';

import GiftList from 'wmkit/gift-list';
import SkuList from 'wmkit/goods-list';
import Header from 'wmkit/header';


import AppStore from './store';
import Status from './component/status';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class ShipList extends Component {
  store;

  UNSAFE_componentWillMount() {
    const state = this.props.route;
    const { orderId, deliverId, type } = (state && state.params) || {};
    this.store.init(orderId, deliverId, type);
  }

  render() {
    const skus = this.store
      .state()
      .getIn(['goodList', 'shippingItems'])
      .map((sku) => {
        return fromJS({
          id: sku.skuId,
          name: sku.itemName,
          img: sku.pic,
          spec: sku.specDetails,
          num: sku.itemNum,

          unit: sku.unit || '',
          price: sku.price || '',
          buyPoint: sku.buyPoint || ''
        });
      });

    return (
      <View style={styles.container}>
        <Header title="发货商品清单" />
        <Status />
        <View style={styles.header}>
          <Text allowFontScaling={false} style={styles.title}>
            商品清单
          </Text>
        </View>
        <ScrollView>
          <SkuList skus={fromJS(skus)} hidePrice={true} />
          <GiftList
            gifts={this.store.state().getIn(['goodList', 'giftItemList'])}
            shipMode={true}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  header: {
    height: 50,
    backgroundColor: '#fafafa',
    padding: 12,
    justifyContent: 'center',
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1 / PixelRatio.get()
  },
  title: {
    fontSize: 14,
    color: '#666'
  }
});
