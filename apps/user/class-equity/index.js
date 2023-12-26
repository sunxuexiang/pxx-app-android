import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { StoreProvider } from 'plume2';

import CarouselHeader from './components/carousel-header';
import AppStore from './store';
import EquityList from './components/equity-list';

/**
 * 权益列表
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class ClassEquity extends React.Component {
  store;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const state = this.props.route;
    const params = (state && state.params) || {};
    const { id } = params;
    this.store.query(id);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <CarouselHeader />

        <EquityList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  }
});
