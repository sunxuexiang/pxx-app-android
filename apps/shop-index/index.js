import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native';
import { StoreProvider } from 'plume2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fromJS } from 'immutable';
import ShareModal from 'wmkit/goods-share-modal';
import * as _ from '../../wmkit/common/util'; // added by scx 
import { mainColor } from 'wmkit/styles/index';

import AppStore from './store';

import Head from './components/head';
import List from './components/goods-list';
import ShopShare from './components/shop-share';
import GoodsShare from './components/goods-share';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class DistributionShopIndex extends React.Component {
  store;
  componentDidMount() {
    this.store.init();
    this.store.fetchDistributionSetting();
  }

  render() {
    return (
      <View style={styles.container}>
        <Head />
        <Text style={styles.text} allowFontScaling={false}>
          店铺精选
        </Text>
        <List />
        <SafeAreaView style={styles.bottom}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.btn, { backgroundColor: mainColor }]}
            onPress={() => this.store.openShareVisible()}
          >
            <Text style={styles.btnText} allowFontScaling={false}>
              分享店铺
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
        <ShopShare />
        <GoodsShare />
        {this.store.state().get('checkedSku').size > 0 &&
          !!this.store.state().get('shareModalVisible') && (
            <ShareModal
              addSelfShop={false}
              //商品SKU信息
              goodsInfo={this.store.state().get('checkedSku')}
              goods={fromJS({})}
              //分享类型
              shareType={1}
              shareModalVisible={this.store.state().get('shareModalVisible')}
              //弹窗关闭
              closeVisible={this.store.toggleShareModal}
            />
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  text: {
    fontSize: 12,
    marginHorizontal: 10,
    marginVertical: 15,
    color: '#666'
  },
  bottom: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ebebeb'
  },
  btn: {
    ..._.ifIphoneX(
      {
        marginTop: 10
      },
      {
        marginVertical: 10
      }
    ),
    width: '80%',
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 16,
    color: '#fff'
  }
});
