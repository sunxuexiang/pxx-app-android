import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { StoreProvider } from 'plume2';

import SkuList from './components/goods-list';
import GiftList from 'wmkit/gift-list';
import Header from 'wmkit/header';

import { fromJS } from 'immutable';

import AppStore from './store';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class OrderDetailSkus extends React.Component {
  store;

  UNSAFE_componentWillMount() {
    const state = this.props.route;
    const { tId } = (state && state.params) || {};
    this.store.getTradeSkus(tId);
  }

  render() {
    const skus = this.store
      .state()
      .get('skus')
      .map((sku) => {
        let price = sku.get('levelPrice');
        if (sku.get('isFlashSaleGoods') || sku.get('isAppointmentSaleGoods')) {
          price = sku.get('price');
        }
        return fromJS({
          id: sku.get('skuId'),
          name: sku.get('skuName'),
          img: sku.get('pic'),
          spec: sku.get('goodsSubtitle'),
          price: price,
          num: sku.get('num'),
          unit: sku.get('unit'),
          sharePrice: sku.get('sharePrice')
        });
      });
    const gifts = this.store
      .state()
      .get('gifts')
      .toJS();

    return (
      <View style={styles.container}>
        <Header title="商品清单" />
        <ScrollView>
          <SkuList skus={skus} isSelf={this.store.state().get('isSelf')} />
          <GiftList gifts={gifts} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
