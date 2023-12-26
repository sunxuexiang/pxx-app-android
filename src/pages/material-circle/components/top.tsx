import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import * as WMkit from '../../../../wmkit/kit';

type ITopProps = T.IProps & T.ITopProps;

@connect<Partial<ITopProps>, T.ITopState>(
  store2Props,
  actions
)
export default class Top extends React.Component<Partial<ITopProps>,
  T.ITopState> {
  constructor(props: ITopProps) {
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
      <View style={styles.top}>
        <TouchableOpacity
          style={main.matterType == 0 ? [styles.bar, styles.cur] : styles.bar}
          onPress={
            WMkit.delayFunc(() => {
              main.matterType === 1 && this.props.actions.action.changeTab(0);
            }, 1000)
          }
        >
          <Text
            allowFontScaling={false}
            style={main.matterType == 0 ? styles.selectText : styles.text}
          >
            商品推荐
          </Text>
          {main.matterType == 0 && <View style={styles.line}/>}
        </TouchableOpacity>
        <TouchableOpacity
          style={main.matterType == 1 ? [styles.bar, styles.cur] : styles.bar}
          onPress={
            WMkit.delayFunc(() => {
              main.matterType === 0 && this.props.actions.action.changeTab(1);
            }, 1000)
          }
        >
          <Text
            allowFontScaling={false}
            style={main.matterType == 1 ? styles.selectText : styles.text}
          >
            素材推广
          </Text>
          {main.matterType == 1 && <View style={styles.line}/>}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff'
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb'
  },
  bar: {
    height: 49,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  cur: {
    // borderBottomWidth: 4 / PixelRatio.get(),
    // borderBottomColor: '#ff1f4e'
  },
  selectText: {
    color: '#ff6600',
    fontSize: 12
  },
  text: {
    color: '#333',
    fontSize: 12
  },
  line: {
    width: 24,
    height: 2,
    backgroundColor: '#ff6600',
    position: 'absolute',
    bottom: 4
  }
});
