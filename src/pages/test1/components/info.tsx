import React from 'react';
import {StyleSheet, View} from 'react-native';

import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type IInfoProps = T.IProps & T.IInfoProps;

@connect<Partial<IInfoProps>, T.IInfoState>(
  store2Props,
  actions,
)
export default class Info extends React.Component<
  Partial<IInfoProps>,
  T.IInfoState
> {
  constructor(props: IInfoProps) {
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
      <View >
        <View />
      </View>
    );
  }
}
