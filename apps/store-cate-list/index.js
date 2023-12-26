import React from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import { msg, StoreProvider } from 'plume2';

import AppStore from './store';
import SearchBar from './components/search-bar';
import List from './components/list';

const isAndroid = Platform.OS == 'android';

/**
 * 商品分类
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class StoreCateList extends React.Component {
  static defaultProps = {
    navigation: {
      state: {
        params: {}
      }
    }
  };

  componentDidMount() {
    const state = this.props.route;
    const { storeId } = (state && state.params) || {};
    this.store.init(storeId || this.props.sId);
  }

  render() {
    let sid;
    const state = this.props.route;
    const { storeId } = (state && state.params) || {};
    if (storeId) {
      sid = storeId;
    }

    const handleClick = this.props.handleClick
      ? this.props.handleClick
      : (storeCateId, cateName) =>
        msg.emit('router: goToNext', {
          routeName: 'StoreGoodsList',
          storeCateId,
          cateName,
          showGoBack: true,
          storeId: storeId || this.props.sId
        });

    // 商品列表的分类可以整个隐藏，在分类组件里而不是在列表里面直接返回null，保证分类只mount一次，避免在商品列表每次展开都获取一次分类数据
    const hide = this.props.hide;
    if (hide) {
      return null;
    }

    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <StatusBar barStyle={isAndroid ? 'light-content' : 'dark-content'} />
        {this.props.source !== 'goodsList' && (
          <SearchBar storeId={sid || this.props.storeId} />
        )}
        <View style={styles.content}>
          <List
            flag={sid ? true : false}
            storeId={sid || this.props.storeId}
            handleClick={handleClick}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flex: 1
  }
});
