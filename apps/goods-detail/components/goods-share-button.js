import React, { Component } from 'react';
import { TouchableOpacity, Image, Platform, Clipboard } from 'react-native';
import { Relax, msg } from 'plume2';

import { noop } from 'wmkit/noop';
import * as share from 'wmkit/share';

const isAndroid = Platform.OS === 'android';

@Relax
export default class GoodsShareButton extends Component {
  static relaxProps = {
    changeShareModal: noop,
    h5Url: 'h5Url',
    pointsGoodsId:'pointsGoodsId'
  };

  render() {
    const { h5Url, changeShareModal } = this.props.relaxProps;
    return (
      <TouchableOpacity onPress={() => changeShareModal()}>
        <Image
          style={{
            width: 28,
            height: 28,
            zIndex: 999
          }}
          source={require('../img/share.png')}
        />
      </TouchableOpacity>
    );
  }
}
