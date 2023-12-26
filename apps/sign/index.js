import React from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { StoreProvider } from 'plume2';
import AppStore from './store';
import Head from './components/header';
import DateSign from './components/date-sign';
import HotExchange from './components/hot-exchange';
import { screenWidth, screenHeight } from 'wmkit/styles/index';
import Header from 'wmkit/header';
@StoreProvider(AppStore, { debug: __DEV__ })
export default class Sign extends React.Component {
  store;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.store.init();
  }

  render() {
    return (
      <View style={styles.content}>
        <Header title="每日签到" />
        <ScrollView >
          <Head />
          <DateSign />
          {/*<HotExchange />*/}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  container: {
    width: screenWidth,
    minHeight: screenHeight,
    backgroundColor: '#fff'
  }
});
