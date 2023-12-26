import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type IFooterProps = T.IProps & T.IFooterProps;

@connect<Partial<IFooterProps>, T.IFooterState>(
  store2Props,
  actions,
)
export default class Footer extends React.Component<
  Partial<IFooterProps>,
  T.IFooterState
> {
  constructor(props: IFooterProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <View>
        <View />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footer: {},
});
