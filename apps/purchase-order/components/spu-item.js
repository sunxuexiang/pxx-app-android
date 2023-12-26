import React from 'react';
import { Relax } from 'plume2';
import {
  StyleSheet,
  View,
} from 'react-native';

import { noop } from 'wmkit/noop';

import SpuSimpleList from './sku-simple-list';

@Relax
export default class SpuItem extends React.Component {
  static relaxProps = {
    skus: 'skus',
    edit: 'edit',
    init: noop
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { spu } = this.props;
    return (
      <View>
        <SpuSimpleList spu={spu} onSkuChange={this.props.onSkuChange}/>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff'
  },
});
