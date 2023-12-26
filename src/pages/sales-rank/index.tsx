import React from 'react';
import {StyleSheet, View} from 'react-native';

import {connect} from 'react-redux';

import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import {registerReducer} from '@/redux/store';
import HintBar from 'wmkit/hint-bar';
import Header from 'wmkit/header';

import SalesList from './components/sales-list';
import SalesTab from './components/sales-tab';

@connect<Partial<T.IProps>, any>(
  store2Props,
  actions,
)
export default class SalesRank extends React.Component<Partial<T.IProps>, any> {
  componentDidMount() {
    this.props.actions.init();
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: {action},
      main: {
        range
      },
    } = this.props;

    return (
      <View style={styles.container}>
        <Header title="排行榜" />
        <HintBar text={`最近一周内的数据排行 ${range}`} />
        <SalesTab />
        <SalesList />
      </View>
    );
  }
}

//==动态注入reducer===

import salesRankMain from './reducers/main';

registerReducer({salesRankMain});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  }
});

