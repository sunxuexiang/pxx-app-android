import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';

import { msg } from 'plume2';
import * as WMkit from 'wmkit/kit';
import Header from 'wmkit/header';

type IHeadersProps = T.IProps & T.IHeadersProps;

@connect<Partial<IHeadersProps>, T.IHeadersState>(
  store2Props,
  actions
)
export default class Headers extends React.Component<
  Partial<IHeadersProps>,
  T.IHeadersState
> {
  constructor(props: IHeadersProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: { action },
      main
    } = this.props;
    return (
      <Header
        title="我的用户"
        renderTitle={() => {
          return (
            <Text allowFontScaling={false} style={{ fontSize: 16, color: '#000', marginRight: 5 }}>
              我的用户
            </Text>
          );
        }}
        renderRight={() => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ padding: 10 }}
              onPress={() => {
                if (!WMkit.isLoginOrNotOpen()) {
                  msg.emit('loginModal:toggleVisible', {
                    callBack: () => {
                      msg.emit('router: goToNext', { routeName: 'SalesRank' });
                    }
                  });
                } else {
                  msg.emit('router: goToNext', { routeName: 'SalesRank' });
                }
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: '#rgb(255, 31, 78)',
                  marginRight: 10
                }}
              >
                排行榜
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
