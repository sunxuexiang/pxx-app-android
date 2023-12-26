import React from 'react';
import { StyleSheet, View, ScrollView, PixelRatio } from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import SalesListItem from './sales-list-item';
import SalesListMine from './sales-list-mine';


type ISalesListProps = T.IProps & T.ISalesListProps;

@connect<Partial<ISalesListProps>, T.ISalesListState>(
  store2Props,
  actions,
)
export default class SalesList extends React.Component<
  Partial<ISalesListProps>,
  T.ISalesListState
> {
  constructor(props: ISalesListProps) {
    super(props);
  }

  /**

*/
  render() {
    let { main } = this.props;

    return (
      <ScrollView style={styles.container}>
        <SalesListMine rank={main.myRank} />
        <View style={styles.listBox}>
          {main.ranks.map((rank, index) =>
            <SalesListItem key={rank.id} index={index} rank={rank} />)
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#ebebeb'
  },
  listBox: {
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#ebebeb'
  }
});


