import React from 'react';
import { ScrollView, StyleSheet, View, Image, Text } from 'react-native';
import { StoreProvider } from 'plume2';

import { screenHeight } from 'wmkit/styles/index';
import Header from 'wmkit/header';

import Logistics from './component/logistics';
import AppStore from './store';
import Status from './component/status';

const NoneImg = require('./component/img/none.png');

@StoreProvider(AppStore, { debug: __DEV__ })
export default class LogisticInfo extends React.Component {
  store;

  UNSAFE_componentWillMount() {
    const state = this.props.route;
    const { orderId, deliverId, type } = (state && state.params) || {};
    this.store.fetchBasicInfo(orderId, deliverId, type);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="物流信息" />
        <ScrollView>
          <Status />
          {this.store.state().get('result') ? (
            <Logistics />
          ) : (
            <View style={styles.box}>
              <Image source={NoneImg} style={{ width: 104, height: 104 }} />
              <Text allowFontScaling={false} style={styles.dark}>
                暂无相关物流信息
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  dark: {
    color: '#666666',
    fontSize: 14
  },
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: screenHeight - 200
  }
});
