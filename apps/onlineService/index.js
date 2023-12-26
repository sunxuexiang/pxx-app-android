'use strict';
import React, { Component } from 'react';
import { WebView, Dimensions, StyleSheet, View } from 'react-native';
import { Header } from '../../wmkit';
import AppStore from './store';
import { StoreProvider } from 'plume2';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

@StoreProvider(AppStore, { debug: __DEV__ })
export default class OnlineService extends Component {
  store;
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const state = this.props.route;
    const { aliChatUrl } = (state && state.params) || {};
    this.store.init(aliChatUrl);
  }

  render() {
    let url = this.store.state().get('aliChatUrl');
    return (
      <View style={{ flex: 1 }}>
        <Header title="在线客服" />
        <WebView
          useWebKit={true}
          style={styles.container}
          source={{ uri: `${url}` }}
          scalesPageToFit={true}
          bounces={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 20
  }
});
