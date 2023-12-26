import React, { Component } from 'react';
import { TouchableOpacity, Image, Platform, View, Text } from 'react-native';
import { Relax, msg } from 'plume2';

import { noop, share } from 'wmkit';
const isAndroid = Platform.OS === 'android';

@Relax
export default class GoodsNav extends Component {
  static relaxProps = {
    menuList: 'menuList',
    handClick: noop,
    isMenuBoxFlag: 'isMenuBoxFlag'
  };
  constructor(props) {
    super(props);
    this.state = {
      isMenuBoxFlag: false
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      isMenuBoxFlag: nextProps.relaxProps.isMenuBoxFlag
    });
  }
  render() {
    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <TouchableOpacity onPress={this._handleModal}>
          <Image
            style={{
              width: 15,
              height: 13,
              tintColor: '#000'
            }}
            source={require('../img/more.png')}
          />
          <Text
            allowFontScaling={false}
            style={{
              color: '#999',
              fontSize: 10,
              marginTop: 2
            }}
          >
            导航
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  _handleModal = () => {
    let { isMenuBoxFlag } = this.state;
    let { handClick } = this.props.relaxProps;
    this.setState(
      {
        isMenuBoxFlag: !isMenuBoxFlag
      },
      () => {
        handClick(this.state.isMenuBoxFlag);
      }
    );
  };
}
