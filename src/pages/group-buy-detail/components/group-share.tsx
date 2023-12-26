import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';

type IGroupShareProps = T.IProps & T.IGroupShareProps;

@connect<Partial<IGroupShareProps>, T.IGroupShareState>(
  store2Props,
  actions
)
export default class GroupShare extends React.Component<
  Partial<IGroupShareProps>,
  T.IGroupShareState
> {
  constructor(props: IGroupShareProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: { action },
      activity,

      goods,

      notice,

      otherGroup
    } = this.props;

    return (
      <View>
        <View />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
