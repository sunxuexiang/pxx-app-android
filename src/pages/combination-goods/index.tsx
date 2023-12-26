import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';

import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import { registerReducer } from '@/redux/store';
import { Header, noop } from 'wmkit';

import CombinationList from './components/combination-list';


@connect<Partial<T.IProps>, any>(
  store2Props,
  actions,
)
export default class CombinationGoods extends React.Component<
Partial<T.IProps>,
any
> {
  componentDidMount() {
    const state = this.props.route;
    const { skuId } = (state && state.params) || {};
    this.props.actions.init(skuId);
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }


  render() {
    let {
      actions: { action },
      main: { combinationList },
    } = this.props;

    return (
      <View style={styles.container}>
        <Header title={`优惠套餐${combinationList.length}`} />
        <CombinationList />
      </View>
    );
  }
}

//==动态注入reducer===

import srcPagesCombinationGoodsMain from './reducers/main';

registerReducer({ srcPagesCombinationGoodsMain });

const styles = StyleSheet.create({
  container: { flex: 1 , backgroundColor:"#f5f5f5"},
  
});
