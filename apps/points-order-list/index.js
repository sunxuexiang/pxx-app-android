import React from 'react';
import { StyleSheet, View, Image, AppState } from 'react-native';
import { StoreProvider } from 'plume2';

import Header from 'wmkit/header';

import RefundTab from './components/order-tab';
import Orders from './components/order-list';
import AppStore from './store';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class PointsOrderList extends React.Component {
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
    let state = this.props.route;
    if (state) {
      tabKey = (state && state.params && state.params.tabKey) || '';
    }
    this.store.init(tabKey);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="积分订单" />
        <RefundTab />
        <View style={{ flex: 1 }}>
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
