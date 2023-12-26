import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import * as T from '../types';

import actions from '../actions';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import Product from './product'
type IProductListProps = T.IProps & T.IProductListProps;

@connect<Partial<IProductListProps>, T.IProductListState>(
  store2Props,
  actions
)
export default class ProductList extends React.Component<Partial<IProductListProps>,
  T.IProductListState> {
  constructor(props: IProductListProps) {
    super(props);
  }

  render() {
    let {
      actions: { action },
      main
    } = this.props;

    return (
      <View style={
        styles.container
      }>
         <Product/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor:'#fff',
    alignItems:'center',
    paddingHorizontal:12,
  },
  noGood:{
    flexDirection:'column',
    alignItems:'center'
  }
});
