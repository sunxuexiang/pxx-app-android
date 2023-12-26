import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { StoreProvider } from 'plume2';
import AppStore from './store';
import SearchBar from './components/search-bar';
import History from './components/history';

const isAndroid = Platform.OS == 'android';
@StoreProvider(AppStore, { debug: __DEV__ })
export default class StoreSearch extends React.Component {
  componentDidMount() {
    const state = this.props.route;
    const params = (state && state.params) || {};
    const { storeId, queryString } = params;
    if (queryString) {
      this.store.handleQueryString(queryString);
    }
    this.store.init(storeId);
  }

  render() {
    const state = this.props.route;
    const params = (state && state.params) || {};
    const { storeId } = params;
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <StatusBar barStyle={isAndroid ? 'light-content' : 'dark-content'} />
        <SearchBar storeId={storeId} />
        <History storeId={storeId} />
      </View>
    );
  }
}
