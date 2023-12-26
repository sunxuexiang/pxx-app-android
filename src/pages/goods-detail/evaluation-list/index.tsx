import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { connect } from 'react-redux';

import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import { registerReducer } from '@/redux/store';

import Header from 'wmkit/header';

import goodsDetailEvaluationListMain from './reducers/main';
import Info from './components/info';
import Modal from './components/modal';

@connect<Partial<T.IProps>, any>(
  store2Props,
  actions
)
export default class GoodsDetailEvaluationList extends React.Component<
  Partial<T.IProps>,
  any
> {
  componentDidMount() {
    const state = this.props.route;
    const { goods } = (state && state.params) || {};
    this.props.actions.init(goods);
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: { action },
      main
    } = this.props;

    return (
      <View style={styles.container}>
        <Header title="全部评价" />
        <Info />
        {main.visible && <Modal />}
      </View>
    );
  }
}

//==动态注入reducer==
console.log('>>>>>11');
registerReducer({ goodsDetailEvaluationListMain });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
