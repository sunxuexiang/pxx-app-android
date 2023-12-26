import React from 'react';
import {StyleSheet } from 'react-native';

import {connect} from 'react-redux';

import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import {registerReducer} from '@/redux/store';

import Info from './components/info';

@connect<Partial<T.IProps>, any>(
  store2Props,
  actions,
)
export default class DistributionRule extends React.Component<
  Partial<T.IProps>,
  any
> {
  componentDidMount() {
    this.props.actions.init();
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    return (
      <Info />
    );
  }
}

//==动态注入reducer===

import distributionRuleMain from './reducers/main';

registerReducer({distributionRuleMain});

const styles = StyleSheet.create({
  index: {},
});
