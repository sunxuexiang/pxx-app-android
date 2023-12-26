import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, PixelRatio } from 'react-native';

import { connect } from 'react-redux';

import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import { registerReducer } from '@/redux/store';
// import HintBar from 'wmkit/hint-bar';
import * as _ from 'wmkit/common/util';

import SalesTab from './components/sales-tab';

import Months from './components/months';

import DateTab from './components/date-tab';

import SalesList from './components/sales-list';

import SalesHeader from './components/sales-header';

import DescModal from './components/rule-modal';

@connect<Partial<T.IProps>, any>(
  store2Props,
  actions
)
export default class SalesPerform extends React.Component<Partial<T.IProps>,
  any> {
  componentDidMount() {
    this.props.actions.init();
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: { action },
      main: {
        salesTab,
        ruleFlag
      }
    } = this.props;

    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <SalesHeader/>
        <SalesTab/>
        <Months/>
        {salesTab === 'day' && <DateTab/>}
        <SalesList/>
        {ruleFlag && <DescModal/>}
      </View>
    );
  }
}

//==动态注入reducer===

import salesPerformMain from './reducers/main';

registerReducer({ salesPerformMain });

