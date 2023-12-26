import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {mainColor} from '@/wmkit/styles';

export default class AddCart extends Component {
  static defaultProps = {
    style: {},
    skuId: '',
    disableAdd: true,
    spuAddCartFunc: () => {}
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {style, skuId, disableAdd, spuAddCartFunc} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.rightCon, style]}
        onPress={disableAdd ? () => {} : () => spuAddCartFunc(skuId)}
      >
        <Image source={!disableAdd ? require('wmkit/theme/add.png') : require('./img/plus-disable.png')} style={[styles.icon, !disableAdd ? {tintColor: mainColor} : {}]} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  rightCon: {
    padding: 10,
    margin: -10
  },
  navItem: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderRadius: 11,
    backgroundColor: '#ffffff',
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  disableItem: {
    borderColor: '#ececec'
  },
  icon: {
    width: 20,
    height: 20
  },
  disableColor: {
    tintColor: '#dddddd'
  }
});
