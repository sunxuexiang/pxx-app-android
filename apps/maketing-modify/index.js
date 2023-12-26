import React, { Component } from 'react'
import { ScrollView, Platform, StatusBar, AppState, View, StyleSheet } from 'react-native';
import { StoreProvider, msg } from 'plume2';
import AppStore from './store';
import { screenHeight } from 'wmkit/styles/index';
import Header from 'wmkit/header';
import MarketingItem from './components/marketing-item'
import FailAmount from './components/fail-amount';
import FailGifts from './components/fail-gifts';
const isAndroid = Platform.OS === 'android';

@StoreProvider(AppStore, { debug: __DEV__ })
export default class MarketingModify extends Component {
  constructor(props) {
    super(props)
    
  }

  UNSAFE_componentWillMount() {
    const state = this.props.route;
    const { wareId, storeId } = (state && state.params) || {};
    //初始化
    this.store.init(wareId, storeId);
  }
  
  render() {
    return (
      <View style={{height:screenHeight}}>
        <StatusBar barStyle={isAndroid ? 'light-content' : 'dark-content'} />
        <Header
            title="优惠变更"
            onLeftMenuPress={() => {
              msg.emit('router: goToNext', {
                routeName: 'OrderConfirm'
              })
            }}
        />
        <ScrollView 
          style={{
            backgroundColor: '#f5f5f5',
            flex:1,
          }}
        >
          <MarketingItem />
          <FailAmount />
          <FailGifts />
        </ScrollView>
      </View>
    )
  }
}
