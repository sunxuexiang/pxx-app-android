import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import { StoreProvider, msg } from 'plume2';
import AppStore from './store';
import Head from './components/head';
import ValueList from './components/value-list';
import ValueLayer from './components/value-layer';
import { screenWidth } from 'wmkit/styles/index';
import Header from 'wmkit/header';
/**
 * 成长值明细
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class PointsValue extends React.Component {
  store;

  componentDidMount() {
    this.store.init();
    this.store.rule();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="我的积分" />
        <Head />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          iosautomaticallyAdjustContentInsets={false}
        >
          <ValueList />
        </ScrollView>
        <ValueLayer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
