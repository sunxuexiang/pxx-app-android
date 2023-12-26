import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, PixelRatio } from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import { mainColor } from 'wmkit/styles/index';

type ISalesTabProps = T.IProps & T.ISalesTabProps;

@connect<Partial<ISalesTabProps>, T.ISalesTabState>(
  store2Props,
  actions,
)
export default class SalesTab extends React.Component<
  Partial<ISalesTabProps>,
  T.ISalesTabState
> {
  constructor(props: ISalesTabProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      actions: {action},
      main: {
        tab
      },
    } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.nav, tab === 'inviteCount' && { borderBottomColor: mainColor }]}
          activeOpacity={0.8}
          onPress={() => {
            action.changeTab('inviteCount')
          }}
        >
          <Text
            style={[styles.text, tab === 'inviteCount' && { color: mainColor }]}
            allowFontScaling={false}
          >
            邀新人数
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nav, tab === 'inviteAvailableCount' && { borderBottomColor: mainColor }]}
          activeOpacity={0.8}
          onPress={() => {
            action.changeTab('inviteAvailableCount')
          }}
        >
          <Text
            style={[styles.text, tab === 'inviteAvailableCount' && { color: mainColor }]}
            allowFontScaling={false}
          >
            有效邀新
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nav, tab === 'saleAmount' && { borderBottomColor: mainColor }]}
          activeOpacity={0.8}
          onPress={() => {
            action.changeTab('saleAmount')
          }}
        >
          <Text
            style={[styles.text, tab === 'saleAmount' && { color: mainColor }]}
            allowFontScaling={false}
          >
            销售额
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nav, tab === 'commission' && { borderBottomColor: mainColor }]}
          activeOpacity={0.8}
          onPress={() => {
            action.changeTab('commission')
          }}
        >
          <Text
            style={[styles.text, tab === 'commission' && { color: mainColor }]}
            allowFontScaling={false}
          >
            预估收益
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 40,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    backgroundColor: '#fff'
  },
  nav: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderBottomWidth: 1.5,
    borderBottomColor: 'transparent'
  },
  text: {
    color: '#333',
    fontSize: 12
  }
});
