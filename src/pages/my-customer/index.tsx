import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';

import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import { registerReducer } from '@/redux/store';

import Headers from './components/headers';
import Content from './components/content';
@connect<Partial<T.IProps>, any>(
  store2Props,
  actions
)
export default class MyCustomer extends React.Component<
  Partial<T.IProps>,
  any
> {
  componentDidMount() {
    // 解析url中的参数
    // 是否是编辑状态
    const state = this.props.route;
    const { tab } = (state && state.params) || { tab: '1' };
    this.props.actions.init(tab);
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
        <Headers />
        <Tab />
        <Content />
      </View>
    );
  }
}

//==动态注入reducer===

import myCustomerMain from './reducers/main';
import Tab from './components/tab';

registerReducer({ myCustomerMain });

const styles = StyleSheet.create({
  index: {},
  container: {
    backgroundColor: '#fafafa'
  }
});
