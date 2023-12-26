import React from 'react';
import { StyleSheet, View, Text, PixelRatio } from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import SalesListItem from './sales-list-item';

type ISalesListMineProps = T.IProps & T.ISalesListMineProps;

@connect<Partial<ISalesListMineProps>, T.ISalesListMineState>(
  store2Props,
  actions,
)
export default class SalesListMine extends React.Component<
  Partial<ISalesListMineProps>,
  T.ISalesListMineState
> {
  constructor(props: ISalesListMineProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      rank
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.titleBox}>
          <Text allowFontScaling={false} style={styles.titleText}>
            我的排名
          </Text>
        </View>
        <SalesListItem rank={rank} hideDetail={true} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  titleBox: {
    paddingTop: 8,
    paddingLeft: 13,
    paddingBottom: 10,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    backgroundColor: '#fff'
  },
  titleText: {
    fontSize: 13,
    color: '#000'
  }
});
