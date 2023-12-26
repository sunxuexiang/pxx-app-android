import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type INoticeProps = T.IProps & T.INoticeProps;

@connect<Partial<INoticeProps>, T.INoticeState>(
  store2Props,
  actions,
)
export default class Notice extends React.Component<
  Partial<INoticeProps>,
  T.INoticeState
> {
  constructor(props: INoticeProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {action},
      activity,

      goods,

      notice,

      otherGroup,
    } = this.props;

    return (
      <View>
        <View />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  notice: {},
});
