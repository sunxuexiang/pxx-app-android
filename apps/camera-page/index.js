'use strict';
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import ScanQRCode from './RNCamera-new';
import Header from 'wmkit/header';
export default class CameraComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      data: ''
    };
  }
  render() {
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <Header title="扫一扫" />
        <ScanQRCode/>
      </View>
    );
  }
}