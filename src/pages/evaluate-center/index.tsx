import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';

import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import { registerReducer } from '@/redux/store';
import Header from 'wmkit/header';
import AsyncStorage from '@react-native-community/async-storage';
import Nav from './components/nav';

@connect<Partial<T.IProps>, any>(
  store2Props,
  actions
)
export default class EvaluateCenter extends React.Component<
  Partial<T.IProps>,
  any
> {
  async componentDidMount() {
    const state = this.props.route;
    let queryType = state.params.queryType;
    const param = await AsyncStorage.getItem('evaluateQueryType');
    if (!queryType && param) {
      queryType = JSON.parse(param).queryType;
    }
    console.log('aaaa21->mount', queryType)
    this.props.actions.init(queryType);
  }

  componentWillUnmount() {
    // this.props.actions.clean();
  }

  render() {
    let {
      actions: { action },
      main
    } = this.props;

    return (
      <View style={{ backgroundColor: '#f5f5f5', flex: 1 }}>
        <Header title={'评价中心'} />
        <Nav />
      </View>
    );
  }
}

//==动态注入reducer===

import evaluateCenterMain from './reducers/main';
import Good from '@/pages/flash-sale-goods-panic-buying/components/good';

registerReducer({ evaluateCenterMain });

const styles = StyleSheet.create({
  index: {}
});
