import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';

import { noop } from '../noop';

import {mainColor, screenWidth} from 'wmkit/styles/index';

export default class Check extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    checked: false,
    onCheck: noop,
    style: {},
    disable: false,
    disableUseSame: null
  };

  render() {
    const { checked, disable, onCheck, disableCheckImg } = this.props;
    let imgSrc;
    if (disable) {
      if (disableCheckImg) {
        // 自定义禁止选择图
        imgSrc = disableCheckImg || require('./img/disable-checked.png');
      } else {
        if (checked) {
          imgSrc = require('./img/disable-checked.png');
        } else {
          imgSrc = require('./img/disable.png');
        }
      }
    } else {
      if (checked) {
        imgSrc = require('wmkit/theme/check.png');
      } else {
        imgSrc = require('./img/uncheck.png');
      }
    }

    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={() => !disable && onCheck(!checked)}
      >
        <View style={{ padding: 10 }}>
          <Image source={imgSrc} style={[styles.img, ((!disable && checked) || (disable && disableCheckImg)) ? {tintColor: mainColor} : {}]} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth <= 320 ? 15 : 18,
    height: screenWidth <= 320 ? 15 : 18
  },
  img: {
    width: screenWidth <= 320 ? 15 : 18,
    height: screenWidth <= 320 ? 15 : 18
  }
});
