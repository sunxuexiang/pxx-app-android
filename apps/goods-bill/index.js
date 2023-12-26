import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StoreProvider } from 'plume2';
import { fromJS } from 'immutable';
import { SafeAreaView } from 'react-native-safe-area-context';

import GiftList from 'wmkit/gift-list';
import SkuList from 'wmkit/goods-list';
import Header from 'wmkit/header';


import AppStore from './store';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class GoodsBill extends React.Component {
  UNSAFE_componentWillMount() {
    const state = this.props.route;
    const { storeId, isFlashSale = false } = (state && state.params) || {};
    this.store.fetchWillBuyGoodsList(storeId, isFlashSale);
  }

  render() {
    const skus = this.store
      .state()
      .get('orderSkus')
      .map((sku) => {
        let price = sku.get('levelPrice');
        if (sku.get('isFlashSaleGoods')) {
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
          distributionCommission: sku.get('distributionCommission'),
          distributionGoodsAudit: sku.get('distributionGoodsAudit'),
          buyPoint: sku.get('buyPoint')
        });
      });
    return (
      <View style={styles.container}>
        <Header title="商品清单" />
        <ScrollView>
          {/* <SafeAreaView> */}
            <SkuList
              skus={skus}
              isSelf={this.store.state().get('isSelf')}
              commissionStrType={1}
              isFlashSale={this.store.state().get('isFlashSale')}
              buyPoint={this.store.state().get('buyPoint')}
            />
            <GiftList gifts={this.store.state().get('gifts')} />
          {/* </SafeAreaView> */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  }
});
