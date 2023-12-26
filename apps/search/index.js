import React from 'react';
import { View, StatusBar } from 'react-native';
import { StoreProvider } from 'plume2';
import AppStore from './store';
import SearchBar from './components/search-bar';
import History from './components/history';
import SearchTab from './components/tab';
import { isAndroid } from 'wmkit/styles/index';
import Hot from './components/hot';
import SearchResult from './components/search-result';
@StoreProvider(AppStore, { debug: __DEV__ })
export default class Search extends React.Component {
  store;

  componentDidMount() {
    const state = this.props.route;
    const params = (state && state.params) || {};
    const { key:initKey, queryString } = params;
    const key = initKey === 'home' ? 'goods' : initKey;
    if (key) {
      this.store.tabActive(key);
    }
    if (initKey !== 'home') {
      this.store.handleQueryString(queryString);
    }
    this.store.init(initKey, queryString);
  }

  render() {
    const key = this.store.state().get('key');
    const associationalWordList = this.store
      .state()
      .get('associationalWordList');
    const queryString = this.store.state().get('queryString');
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <StatusBar barStyle={isAndroid ? 'light-content' : 'dark-content'} />
        <SearchBar />
        {/*{key === 'distribute' || key === 'distributeGoods' || key === 'groupon'
          ? null
          : (key == 'supplier' || associationalWordList.length == 0) && (
              <SearchTab />
            )}*/}
        {!queryString ||
        associationalWordList.length == 0 ||
        key == 'supplier' ? (
          <View>
            {key == 'goods' || key == 'special' ? <Hot /> : null}
            <History />
          </View>
        ) : (
          key == 'goods' && <SearchResult />
        )}
      </View>
    );
  }
}
