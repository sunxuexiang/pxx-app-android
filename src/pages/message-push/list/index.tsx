import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

import {connect} from 'react-redux';

import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import {registerReducer} from '@/redux/store';
import Header from 'wmkit/header';
import Info from './components/info';

@connect<Partial<T.IProps>, any>(
  store2Props,
  actions,
)
export default class MessagePushList extends React.Component<
  Partial<T.IProps>,
  any
> {
  componentDidMount() {
    const state = this.props.route;
    const { messageType } = (state && state.params) || {};
    this.props.actions.init(messageType);
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <View style={styles.index}>
        <Header
          title={main.messageType ===0 ? '优惠促销' : '服务通知'}
          onLeftMenuPress={() =>
            msg.emit('router: goToNext', { routeName: 'PushCenter' })
          }
        />
        <Info />
      </View>
    );
  }
}

//==动态注入reducer===

import messagePushListMain from './reducers/main';
import { msg } from 'plume2';

registerReducer({messagePushListMain});

const styles = StyleSheet.create({
  index: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  iconBox: {
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  icon: {
    width: 20,
    height: 20
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8
  },
  round: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginLeft: 8,
    backgroundColor: '#fa0000',
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  roundText: {
    color: '#fff',
    fontSize: 10
  }
});
