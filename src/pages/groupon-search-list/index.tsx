import React from 'react';
import { StyleSheet, View } from 'react-native';

import { connect } from 'react-redux';
import Header from 'wmkit/header';
import WMGrouponFooter from 'wmkit/groupon-footer';

import GrouponSearch from 'wmkit/biz/groupon/groupon-search';

import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import { registerReducer } from '@/redux/store';

import Info from './components/info';

@connect<Partial<T.IProps>, any>(
  store2Props,
  actions
)
export default class GrouponSearchList extends React.Component<
Partial<T.IProps>,
any
> {
  UNSAFE_componentWillMount() {
    const state = this.props.route;
    const params = (state && state.params) || {};
    // 目录编号,目录名称,搜索关键字
    const { queryString, showGoBack } = params;
    this.props.actions.init({ queryString, showGoBack });
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      main: { keyWords }
    } = this.props;

    return (
      <View style={styles.index}>
        <Header title="拼购" style={{ zIndex: 1000 }} />
        <GrouponSearch queryString={keyWords} />
        <View style={{ height: 40, backgroundColor: '#fff' }} />
        <Info />
        <WMGrouponFooter currTab="热拼排行" />
      </View>
    );
  }
}

//==动态注入reducer===

import grouponSearchListMain from './reducers/main';

registerReducer({ grouponSearchListMain });

const styles = StyleSheet.create({
  index: {
    backgroundColor: '#fafafa',
    flex: 1
  }
});
