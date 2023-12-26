import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type ISearchProps = T.IProps & T.ISearchProps;

@connect<Partial<ISearchProps>, T.ISearchState>(
  store2Props,
  actions,
)
export default class Search extends React.Component<
  Partial<ISearchProps>,
  T.ISearchState
> {
  constructor(props: ISearchProps) {
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
  search: {},
});
