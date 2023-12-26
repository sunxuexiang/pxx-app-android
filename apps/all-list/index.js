import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { msg, StoreProvider } from 'plume2';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppStore from './store';
import SearchBar from './components/search-bar';
import LeftMenu from './components/left-menu';
import List from './components/list';
import { isAndroid } from 'wmkit/styles/index';
import {Loading} from 'wmkit';

/**
 * 商品分类
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class AllList extends React.Component {
  store;

  UNSAFE_componentWillMount() {
    this.store.init(this.props.cateId);
  }

  render() {
    const { loadingVisible } = this.store.state().toJS();
    const source = this.props.source === 'goodsList' ? 'goodsList' : '';
    const handleClick = this.props.handleClick
      ? this.props.handleClick
      : (cateId, cateName) =>
          msg.emit('router: goToNext', {
            routeName: 'GoodsListWithoutBottom',
            cateId,
            cateName,
            showGoBack: true
          });

    // 商品列表的分类可以整个隐藏，在分类组件里而不是在列表里面直接返回null，保证分类只mount一次，避免在商品列表每次展开都获取一次分类数据
    const hide = this.props.hide;
    if (hide) {
      return null;
    }
    console.log('loadingVisible', loadingVisible)

    return (
      <View style={{ backgroundColor: '#f5f5f5', flex: 1 }}>
        <StatusBar barStyle={isAndroid ? 'light-content' : 'dark-content'} />
        {loadingVisible && <Loading />}
        {this.props.source !== 'goodsList' && <SearchBar />}
        {!loadingVisible && <View style={styles.content}>
          <LeftMenu source={source} />
          <List handleClick={handleClick} />
        </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#f5f5f5'
  }
});
