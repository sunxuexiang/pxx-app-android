import React from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';

import { screenWidth } from 'wmkit/styles/index';

export default class NavItem extends React.Component {
  static defaultProps = {
    style: {},
    title: '',
    onPress: () => {}
  };

  constructor(props) {
    super(props);
  }
  render() {
    const { style, title, onPress } = this.props;

    return (
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text style={styles.title} allowFontScaling={false}>
          {title}
        </Text>
        {this._renderRight()}
      </TouchableOpacity>
    );
  }

  /**
   * 渲染右侧区域
   *
   * @returns {XML}
   * @private
   */
  _renderRight() {
    if (this.props.renderRight) {
      return <View style={styles.leftImg}>{this.props.renderRight()}</View>;
    } else {
      return (
        <Image
          source={require('../img/arrow-right.png')}
          style={styles.image}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height: screenWidth < 361 ? 46 : 50,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb',
  },
  title: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)'
  },
  image: {
    width: 12,
    height: 12
  }
});
