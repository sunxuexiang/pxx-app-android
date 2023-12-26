import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { fromJS } from 'immutable';
import { StoreProvider } from 'plume2';
import SkuList from './components/goods-list';
import Header from 'wmkit/header';
import GiftList from 'wmkit/gift-list';
import Loading from 'wmkit/loading';

import AppStore from './store';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class ReturnGoodsList extends React.Component {
  store;

  UNSAFE_componentWillMount() {
    const state = this.props.route;
    const { rid } = (state && state.params) || {};
    this.store.init(rid);
  }

  render() {
    const { totalPrice } = this.props.route.params;
    const skus = this.store
      .state()
      .get('returnSkus')
      .map((sku) => {
        return {
          id: sku.skuId,
          img: sku.pic,
          spec: sku.goodsSubtitle,
          name: sku.skuName,
          spec: sku.specDetails,
          price: sku.price,
          num: sku.num,
          unit: sku.unit,
          splitPrice: sku.splitPrice
        };
      });
    const giftList = this.store.state().get('returnGifts');
    const loading = this.store.state().get('loading');

    return loading ? (
      <Loading />
    ) : (
      <View style={styles.container}>
        <Header title="退货商品清单" />
        <ScrollView>
          <SkuList
            totalPrice={totalPrice}
            skus={fromJS(skus)}
            isSelf={this.store.state().get('isSelf')}
          />
          <GiftList gifts={giftList} />
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
