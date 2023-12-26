import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import CombinationItem from '../components/combination-item';

type ICombinationListProps = T.IProps & T.ICombinationListProps;

@connect<Partial<ICombinationListProps>, T.ICombinationListState>(
  store2Props,
  actions,
)
export default class CombinationList extends React.Component<
Partial<ICombinationListProps>,
T.ICombinationListState
> {
  constructor(props: ICombinationListProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: { action },
      main: { combinationList },
    } = this.props;

    return (
      <ScrollView style={styles.combinationList}>
        {combinationList.map((item) => {
          return (
            <CombinationItem orderItem={item} />
          )
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  combinationList: {
    flex: 1
  },
});
