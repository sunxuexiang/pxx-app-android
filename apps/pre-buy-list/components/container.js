import React from 'react';
import { View, Platform } from 'react-native';
import { Relax } from 'plume2';

import List from './goods-list';

/**
 * 商品列表顶级组件
 */
@Relax
export default class Container extends React.Component {
  static relaxProps = {};

  render() {
    const {} = this.props.relaxProps;

    return (
      <View style={{ backgroundColor: '#fff', flex: 1, width: '100%' }}>
        <List />
      </View>
    );
  }
}
