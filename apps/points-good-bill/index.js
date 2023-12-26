import React, { useDebugValue } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StoreProvider } from 'plume2';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from 'wmkit/header';
import SkuList from 'wmkit/goods-list';

import AppStore from './store';
import { fromJS } from 'immutable';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class PointsGoodsBill extends React.Component {

  UNSAFE_componentWillMount() {
    const state = this.props.route;
    const { params } = (state && state.params) || {};
    this.store.getExchangeItem(params);
  }

  render() {
    const sku = this.store.state().get('orderSku');
    let skuList = fromJS([]);
    skuList= skuList.push({
      id: sku.get('skuId'),
      name: sku.get('skuName'),
      img: sku.get('pic'),
      spec: sku.get('specDetails'),
      points: sku.get('points'),
      num: sku.get('num'),
      unit: sku.get('unit'),
      pointsGoodsId: sku.get('pointsGoodsId')
    });

    return (
      <View style={styles.container}>
        <Header title="商品清单" />
        <ScrollView>
          <SafeAreaView>
            <SkuList
              skus={skuList}
              isSelf={this.store.state().get('isSelf')}
              commissionStrType={1}
            />
          </SafeAreaView>
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
