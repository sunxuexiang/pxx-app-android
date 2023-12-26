import React from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';

import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import { registerReducer } from '@/redux/store';
import ShareModal from 'wmkit/goods-share-modal';
import * as WMkit from 'wmkit/kit';

import StoreForbid from 'wmkit/biz/store-forbid/index';

import Head from './components/head';

import MySales from './components/my-sales';

import InvitFriend from './components/invit-friend';

import MyCustomer from './components/my-customer';

import ToolImg from './components/tool-img';

import SellwellGoods from './components/sellwell-goods';

import GoodsShare from './components/goods-share';

@connect<Partial<T.IProps>, any>(
  store2Props,
  actions
)
export default class DistributionCenter extends React.Component<
  Partial<T.IProps>,
  any
> {
  static navigationOptions = ({ navigation }) => ({
    title: '分销中心',
    tabBarVisible:
      navigation.state.params && navigation.state.params.tabBarVisible,
    tabBarIcon: ({ focused }) => (
      <Image
        source={focused ? require('./img/30.png') : require('./img/29.png')}
        style={{ width: 24, height: 24 }}
      />
    )
  });

  componentDidMount() {
    if (WMkit.isLoginOrNotOpen()) {
      this.props.actions.init();
    }
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: { action },
      main
    } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          automaticallyAdjustContentInsets={false}
        >
          <Head />
          <MySales />
          <InvitFriend />
          <MyCustomer />
          <ToolImg />
          <SellwellGoods />
        </ScrollView>
        <StoreForbid />
        <GoodsShare />
        {!!main.shareModalVisible &&
          Object.keys(main.checkedSku).length > 0 && (
            <ShareModal
              addSelfShop={main.addSelfShop}
              //商品SKU信息
              goodsInfo={fromJS(main.checkedSku)}
              goods={fromJS({})}
              //分享类型
              shareType={2}
              shareModalVisible={main.shareModalVisible}
              //弹窗关闭
              closeVisible={action.closeImgShare}
            />
          )}
      </View>
    );
  }
}

//==动态注入reducer===

import distributionCenterMain from './reducers/main';

registerReducer({ distributionCenterMain });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  }
});
