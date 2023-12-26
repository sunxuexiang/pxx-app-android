import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PixelRatio
} from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { mainColor } from 'wmkit/styles/index';

type ITabProps = T.IProps & T.ITabProps;

@connect<Partial<ITabProps>, T.ITabState>(
  store2Props,
  actions
)
export default class Tab extends React.Component<
  Partial<ITabProps>,
  T.ITabState
> {
  constructor(props: ITabProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      actions: { action },
      main: { tab, isDistributor }
    } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.nav, tab === '1' && { borderBottomColor: mainColor }]}
          activeOpacity={0.8}
          onPress={() => {
            action.changeTab('1');
          }}
        >
          <Text
            style={[styles.text, tab === '1' && { color: mainColor }]}
            allowFontScaling={false}
          >
            邀新人数
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nav, tab === '2' && { borderBottomColor: mainColor }]}
          activeOpacity={0.8}
          onPress={() => {
            action.changeTab('2');
          }}
        >
          <Text
            style={[styles.text, tab === '2' && { color: mainColor }]}
            allowFontScaling={false}
          >
            有效邀新
          </Text>
        </TouchableOpacity>
        {isDistributor && (
          <TouchableOpacity
            style={[styles.nav, tab === '3' && { borderBottomColor: mainColor }]}
            activeOpacity={0.8}
            onPress={() => {
              action.changeTab('3');
            }}
          >
            <Text
              style={[styles.text, tab === '3' && { color: mainColor }]}
              allowFontScaling={false}
            >
              我的顾客
            </Text>
          </TouchableOpacity>
        )}
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
