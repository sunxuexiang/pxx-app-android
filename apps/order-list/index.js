import React from 'react';
import { StyleSheet, View, Image, AppState } from 'react-native';
import { StoreProvider,msg } from 'plume2';

import Header from 'wmkit/header';

import RefundTab from './components/order-tab';
import Orders from './components/order-list';
import OrderCateMask from './components/order-cate-mask';
import AppStore from './store';
import SearchBar from './components/search-bar';
import {Loading} from '@/wmkit';
@StoreProvider(AppStore, { debug: __DEV__ })
export default class OrderList extends React.Component {
  store;

  constructor(props) {
    super(props);
    //debug
    if (__DEV__) {
      window._store = this;
    }
    this.state = {
      currentAppState: 'active'
    };
  }

  componentDidMount() {
    //监听状态改变事件
    AppState.addEventListener('change', this.handleAppStateChange.bind(this));
  }

  UNSAFE_componentWillUpdate(nextProps, nextStates) {
    if (this.state && AppState.currentState != this.state.currentAppState) {
      //重新获取服务时间
      this.store.getServerTime();
    }
  }

  componentWillUnMount() {
    //移除监听
    AppState.addEventListener('change', this.handleAppStateChange.bind(this));
  }

  static navigationOptions = {
    title: '订单',
    tabBarIcon: ({ focused }) => (
      <Image
        source={
          focused
            ? require('./img/order_focused.png')
            : require('./img/order.png')
        }
        style={{ width: 24, height: 24 }}
      />
    )
  };

  UNSAFE_componentWillMount() {
    let tabKey = '';
    const state = this.props.route;
    tabKey = (state && state.params && state.params.tabKey) || '';
    this.store.init(tabKey);
  }

  render() {
    const loadingStatus = this.store.state().get('loadingStatus');
    const state = this.props.route;
    return (
      <View style={styles.container}>
        {loadingStatus && <Loading />}
        <Header
          title="我的订单"
          onLeftMenuPress={() => {
            if (state.params.orderPay){
              msg.emit('router: goToNext', { routeName: 'UserCenter' })
            } else {
              msg.emit('router: back');
            }
          }}
        />
        {/* <SearchBar /> */}
        <RefundTab />
        {this.store.state().get('showCateMask') && <OrderCateMask />}
        <View style={{ padding: 12, flex: 1 }}>
          <Orders />
        </View>
      </View>
    );
  }

  //状态改变响应
  handleAppStateChange(nextAppState) {
    this.setState({ currentAppState: nextAppState });
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1
  }
});
